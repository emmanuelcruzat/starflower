import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import GameState from "./models/GameState.js";
//import decision templates
import { DECISIONS } from "./decisions/starter.js";
dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:4200",
  })
);
app.use(express.json());

const PORT = 5000;

app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-store");
  next();
});

/* ---------- Routes ---------- */

app.get("/api/health", (req, res) => {
  res.json({ status: "Starflower backend online" });
});

app.all("/api/game/start", async (req, res) => {
  try {
    const game = new GameState();
    await game.save();
    res.json(game);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create game" });
  }
});

app.get("/api/game/:id", async (req, res) => {
  try {
    const game = await GameState.findById(req.params.id);

    if (!game) {
      return res.status(404).json({ error: "Game not found" });
    }

    res.json(game);
  } catch (err) {
    res.status(400).json({ error: "Invalid game ID" });
  }
});

app.post("/api/game/:id/advance", async (req, res) => {
  try {
    const game = await GameState.findById(req.params.id);

    if (!game) {
      return res.status(404).json({ error: "Game not found" });
    }

    //change game state
    game.turn += 1;
    game.economy += 1;
    game.stability -= 1;

    //adds new journal entry (hard coded for now)
    game.journal.push({
      turn: game.turn,
      text: "The government advanced the national agenda.",
      timestamp: new Date(),
    });

    await game.save();
    res.json(game);
  } catch (err) {
    res.status(400).json({ error: "Invalid game ID" });
  }
});

//decision engine
app.post("/api/game/:id/decide", async (req, res) => {
  try {
    const game = await GameState.findById(req.params.id);
    if (!game) return res.status(404).json({ error: "Game not found" });

    const { decisionId, optionId } = req.body;
    const decision = DECISIONS.find((d) => d.id === decisionId);
    if (!decision) return res.status(400).json({ error: "Invalid decision" });

    const option = decision.options.find((o) => o.id === optionId);
    if (!option) return res.status(400).json({ error: "Invalid option" });

    // apply effects (generic)
    for (const [key, value] of Object.entries(option.effects)) {
      if (typeof game[key] === "number") {
        game[key] += value;
      }
    }

    game.turn += 1;
    game.activeDecisionId = null;

    game.journal.push({
      turn: game.turn,
      text: option.log,
      timestamp: new Date(),
    });

    await game.save();
    res.json({ game, decision });
  } catch (err) {
    res.status(400).json({ error: "Decision failed" });
  }
});

app.get("/api/game/:id/decision", async (req, res) => {
  const game = await GameState.findById(req.params.id);
  if (!game) return res.status(404).json({ error: "Game not found" });

  // If a decision is already active, return it
  if (game.activeDecisionId) {
    const decision = DECISIONS.find((d) => d.id === game.activeDecisionId);
    return res.json(decision);
  }

  // Otherwise, roll a new one
  const decision = DECISIONS[Math.floor(Math.random() * DECISIONS.length)];

  game.activeDecisionId = decision.id;
  await game.save();

  res.json(decision);
});

/* ---------- Start Server AFTER Mongo ---------- */

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Mongo connection error:", err);
  });
