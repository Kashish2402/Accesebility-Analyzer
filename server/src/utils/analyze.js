import puppeteer from "puppeteer";
import { readFile } from "fs/promises";
import { read } from "fs";
import { axeCorePath } from "../app.js";

export const analyzeURL = asyncHandler(async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) throw new ApiError(400, "URL is required");

    const results = await analyzeURL(url); // may fail

    return res
      .status(200)
      .json(new ApiResponse(200, results, "Analysis complete"));
  } catch (err) {
    console.error("Analyze URL failed:", err); // FULL stack trace
    res
      .status(500)
      .json(new ApiResponse(500, null, err.message || "Internal Server Error"));
  }
});


export const analyzeHtml = async (html) => {
  if (!html) throw new Error("HTML CONTENT REQUIRED");

  const htmlFile = await readFile(html, "utf-8");

  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  try {
    const page = await browser.newPage();
    await page.setContent(htmlFile);
    await page.addScriptTag({
      path: axeCorePath,
    });
    const results = await page.evaluate(async () => {
      return await window.axe.run();
    });
    return results;
  } catch (error) {
    console.error("Accessibility analysis failed for HTML:", error.message);
    throw error;
  } finally {
    await browser.close();
  }
};
