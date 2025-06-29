import puppeteer from "puppeteer-core";
import { readFile } from "fs/promises";
import { axeCorePath } from "../app.js";

export const analyzeURL = async (url) => {
  if (!url) throw new Error("URL is required");

  const browser = await puppeteer.launch({
    headless: "new",
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-accelerated-2d-canvas",
      "--no-first-run",
      "--no-zygote",
      "--single-process",
      "--disable-gpu",
    ],
    executablePath:
      process.env.PUPPETEER_EXECUTABLE_PATH ||
      "/usr/bin/google-chrome" ||
      "/usr/bin/chromium",
  });
  console.log("Using Chrome from:", puppeteer.executablePath());

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
    console.error("Accessibility analysis failed:", error);
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
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-accelerated-2d-canvas",
      "--no-first-run",
      "--no-zygote",
      "--single-process",
      "--disable-gpu",
    ],
    executablePath:
      process.env.PUPPETEER_EXECUTABLE_PATH ||
      "/usr/bin/google-chrome" ||
      "/usr/bin/chromium",
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
