import { analyzeHtml, analyzeURL } from "../utils/analyze.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { AccessibilityReport } from "../models/AccessebilityReport.js";
import mongoose from "mongoose";

const analyzeUrl = asyncHandler(async (req, res, next) => {
  const { url } = req.body;

  // FETCH RESULTS FROM AXE-CORE
  const results = await analyzeURL(url);

  if (!results) return next(new ApiError(400, "Unable to fetch result"));

  // SAVE RESULTS TO DB
  const report = await AccessibilityReport.create({
    userId: req.user?._id,
    inputType: "url",
    inputValue: url,
    url: url,
    summary: {
      totalViolations: results.violations.length,
      totalPasses: results.passes.length,
      totalIncomplete: results.incomplete.length,
      totalInapplicable: results.inapplicable.length,
    },
    violations: results.violations,
    passes: results.passes,
    incomplete: results.incomplete,
    inapplicable: results.inapplicable,
    environment: {
      userAgent: req.get("User-Agent"),
      windowWidth: results.viewport?.width || 1440,
      windowHeight: results.viewport?.height || 900,
    },
  });

  if(!report) return next(new ApiError(400,"Unable to generate Report... or We do not have access to analyze this URL"))

  return res
    .status(200)
    .json(new ApiResponse(200, report, "Url Analyzed Successfully"));
});

const analyzePdf = asyncHandler(async (req, res, next) => {
  const uplodedFile = req.file.path;
  if (!uplodedFile) return next(new ApiError(400, "No file uploaded"));

  // FETCHING RESULTS FROM AXE-CORE

  let results;

  try {
    results = await analyzeHtml(uplodedFile);
  } catch (error) {
    console.error("Error during analyzeHtml:", error);
    return next(new ApiError(500, `Error analyzing HTML: ${error.message}`));
  }

  if (!results) return next(new ApiError(400, "Unable to fetch result"));

  // SAVE RESULTS TO DB
  const report = await AccessibilityReport.create({
    userId: req.user?._id,
    inputType: "html",
    inputValue: uplodedFile,
    url: null,
    summary: {
      totalViolations: results.violations.length,
      totalPasses: results.passes.length,
      totalIncomplete: results.incomplete.length,
      totalInapplicable: results.inapplicable.length,
    },
    violations: results.violations,
    passes: results.passes,
    incomplete: results.incomplete,
    environment: {
      userAgent: req.get("User-Agent"),
      windowWidth: results.viewport?.width || 1440,
      windowHeight: results.viewport?.height || 900,
    },
  });

  if (!report) return next(new ApiError(400, "Unable to generate Report"));

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        report,
        "Accessebility Report generated successfully"
      )
    );
});

const getUserResults = asyncHandler(async (req, res, next) => {
  if (!req?.user?._id)
    return next(
      new ApiError(404, "User not logged in so unable to found user results")
    );

  const results = await AccessibilityReport.find({ userId: req?.user?._id });
  if (!results) return next(new ApiError(404, "No results found for user"));
  return res
    .status(200)
    .json(new ApiResponse(200, results, "User Results fetched successfully"));
});

const getResults = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next(new ApiError(404, "No id provided"));
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ApiError(400, "Invalid ID format"));
  }
  const results = await AccessibilityReport.findById(id);
  if (!results) return next(new ApiError(404, "No results found"));
  if (!results.userId.equals(req?.user?._id))
    return next(
      new ApiError(401, "You are not authorized to access this report")
    );
  return res
    .status(200)
    .json(new ApiResponse(200, results, "Report fetched successfully"));
});

const deleteReport = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next(new ApiError(404, "No id provided"));
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ApiError(400, "Invalid ID format"));
  }
  const report = await AccessibilityReport.findByIdAndDelete(id);
  if (!report) return next(new ApiError(404, "No report found"));
  return res
    .status(200)
    .json(new ApiResponse(200, report, "Report deleted successfully"));
});

export { analyzeUrl, analyzePdf, getUserResults, getResults, deleteReport };
