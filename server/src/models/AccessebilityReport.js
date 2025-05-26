import mongoose, { Schema } from "mongoose";

const accesebilityReportSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    inputType: {
      type: String,
      enums: ["html", "url"],
      required: true,
    },
    inputValue: {
      type: "String",
      required: true,
    },
    url: String,
    summary: {
      type: Schema.Types.ObjectId,
      ref: "Summary",
    },
    violations: {
      type: [Schema.Types.ObjectId],
      ref: "Violation",
    },
    incomplete: {
      type: [Schema.Types.ObjectId],
      ref: "Violation",
    },
    inapplicable: {
      type: [Schema.Types.ObjectId],
      ref: "Violation",
    },
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

export const AccesebilityReport = mongoose.model("AccesebilityReport",accesebilityReportSchema)
