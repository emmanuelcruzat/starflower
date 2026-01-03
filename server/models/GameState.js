import mongoose from "mongoose";

const GameStateSchema = new mongoose.Schema({
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },

  nationName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },

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

  activeDecisionId: {
    type: String,
    default: null,
  },

  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("GameState", GameStateSchema);
