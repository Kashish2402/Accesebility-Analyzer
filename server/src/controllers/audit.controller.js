import { analyzeHtml, analyzeURL } from "../utils/analyze.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { AccessibilityReport } from "../models/AccessebilityReport.js";
import {getReportHtml} from '../utils/reportTemplate.js'
import { generatePdf } from "../utils/pdfGenerator.js";
import fs from 'fs/promises'

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
    pdfUrl: null,
  });

  // GENERATING REPORT AND SAVING ITS URL TO DATABASE
  const html=getReportHtml(report)
  const pdf = await generatePdf(html, `report - ${report._id}`);
  report.pdfUrl = pdf;
  await report.save();

  if(!results) return next(400,'unable to generate reports')
  return res
    .status(200)
    .json(new ApiResponse(200, results, "Url Analyzed Successfully"));
});

const analyzePdf = asyncHandler(async (req, res, next) => {
  const uplodedFile = req.file.path;
  console.log("HTML File: ",uplodedFile)
  if(!uplodedFile)new ApiError(400, "No file uploaded");

  // FETCHING RESULTS FROM AXE-CORE
  
  let results 
  
  
  try {   
    results = await analyzeHtml(uplodedFile);
  } catch (error) {
    console.error("Error during analyzeHtml:", error);
    return next(new ApiError(500, `Error analyzing HTML: ${error.message}`));
  }

  if (!results) return next(new ApiError(400, "Unable to fetch result"));
  console.log("Results: ",results)
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
    pdfUrl: null,
  });

  if (!report) return next(new ApiError(400, "Unable to generate Report"));

  // GENERATING REPORT AND SAVING ITS URL TO DATABASE
  const html=getReportHtml(report)
  const pdfUrl = await generatePdf(html, `report - ${report._id}`);
  report.pdfUrl = pdfUrl;
  await report.save();

  await fs.unlink(uplodedFile)

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
export { analyzeUrl , analyzePdf};
