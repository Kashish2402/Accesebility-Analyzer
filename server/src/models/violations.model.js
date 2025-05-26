import mongoose, { Schema } from "mongoose";

const violationSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    impact: {
      type: String,
      enum: ["minor", "moderate", "serious", "critical", null],
      default: null,
    },
    description: {
      type: String,
      required: true,
    },
    help: String,
    helpUrl: String,
    tags: [String],
    nodes: {
      type: [Schema.Types.ObjectId],
      ref: "Node",
    },
  },
  {
    timestamps: true,
  }
);

export const Violation=new mongoose.model('Violation',violationSchema);