import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import GameState from "./models/GameState.js";

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
