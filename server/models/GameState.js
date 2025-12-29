import mongoose from "mongoose";

const GameStateSchema = new mongoose.Schema({
  stability: { type: Number, default: 50 },
  economy: { type: Number, default: 50 },
  legitimacy: { type: Number, default: 50 },

  turn: { type: Number, default: 1 },

  journal: {
    type: [
      {
        turn: Number,
        text: String,
        timestamp: Date,
      },
    ],
    default: [],
  },

  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("GameState", GameStateSchema);
