import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import GameState from "./models/GameState.js";
//import decision templates
import { DECISIONS } from "./decisions/starter.js";

//for handling users and password encryption
import bcrypt from "bcrypt";
import User from "./models/User.js";
import jwt from "jsonwebtoken";

//auth.js middleware
import auth from "./middleware/auth.js";

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

//Register accounts
app.post("/api/auth/register", async (req, res) => {
  try {
    const { email, password, nationName } = req.body;

    if (!email || !password || !nationName) {
      return res.status(400).json({
        error: "Email, password, and nation name are required",
      });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    // Check if nation name already exists (case-insensitive)
    const existingNation = await GameState.findOne({
      nationName: new RegExp(`^${nationName}$`, "i"),
    });

    if (existingNation) {
      return res.status(400).json({
        error: "Nation name already exists",
      });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      email,
      passwordHash,
    });

    // Create nation (GameState)
    const game = await GameState.create({
      nationName,
      ownerId: user._id,
    });

    res.status(201).json({
      message: "Account created",
      userId: user._id,
      nationId: game._id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create account" });
  }
});

//login
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Login failed" });
  }
});

//lets the frontend ask if its logged in, and who owns the logged in account
app.get("/api/auth/me", auth, async (req, res) => {
  const game = await GameState.findOne({ ownerId: req.userId });

  if (!game) {
    return res.status(404).json({ error: "Nation not found" });
  }

  res.json({
    nationId: game._id,
    nationName: game.nationName,
  });
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
