import mongoose, { Schema } from "mongoose";

const nodeSchema = new Schema(
  {
    html: String,
    target: [String],
    failureSummary: String,
  },
  { timestamps: true }
);

export const Node = new mongoose.model("Node", nodeSchema);
