import puppeteer from "puppeteer";
import { readFile } from "fs/promises";
import { read } from "fs";
import { axeCorePath } from "../app.js";

export const analyzeURL = async (url) => {
  if (!url) throw new Error("URL is required");

  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  try {
    const page = await browser.newPage();
    await page.goto(url);

    await page.addScriptTag({
      path: axeCorePath,
    });

    const results = await page.evaluate(async () => {
      return await window.axe.run();
    });

    return results;
  } catch (error) {
    console.error("Accessibility analysis failed:", error.message);
    throw error;
  } finally {
    await browser.close();
  }
};

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
