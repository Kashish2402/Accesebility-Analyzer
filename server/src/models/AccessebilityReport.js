import mongoose from "mongoose";

const NodeSchema = new mongoose.Schema(
  {
    html: String,
    target: [String],
    failureSummary: String,
  },
  { _id: false }
);

const ResultSchema = new mongoose.Schema(
  {
    id: String,
    impact: {
      type: String,
      enum: ["minor", "moderate", "serious", "critical", null],
      default: null,
    },
    description: String,
    help: String,
    helpUrl: String,
    tags: [String],
    nodes: [NodeSchema],
  },
  { _id: false }
);

const SummarySchema = new mongoose.Schema(
  {
    totalViolations: Number,
    totalPasses: Number,
    totalIncomplete: Number,
    totalInapplicable: Number,
  },
  { _id: false }
);

const AccessibilityReportSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    inputType: {
      type: String,
      enum: ["url", "html"],
      required: true,
    },
    inputValue: {
      type: String,
      required: true,
    },
    url: String, 
    summary: SummarySchema,
    violations: [ResultSchema],
    passes: [ResultSchema],
    incomplete: [ResultSchema],
    inapplicable: [ResultSchema],
    environment: {
      userAgent: String,
      windowWidth: Number,
      windowHeight: Number,
    },
    pdfUrl: String,
   
  },
  {
    timestamps: true, 
  }
);

export const AccessibilityReport = mongoose.model(
  "AccessibilityReport",
  AccessibilityReportSchema
);
