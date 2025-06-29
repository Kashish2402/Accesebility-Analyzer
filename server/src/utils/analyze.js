import puppeteer from "puppeteer-core";
import { readFile } from "fs/promises";
import { axeCorePath } from "../app.js"; // Ensure axeCorePath is correctly defined elsewhere
import chromium from '@sparticuz/chromium';

const commonPuppeteerArgs = [
  ...chromium.args,
  '--hide-scrollbars',
  '--disable-web-security',
  '--no-sandbox',
  '--disable-setuid-sandbox',
  '--disable-dev-shm-usage',
  '--disable-accelerated-2d-canvas',
  '--no-first-run',
  '--no-zygote',
  '--single-process',
  '--disable-gpu',
];

export const analyzeURL = async (url) => {
  if (!url) throw new Error("URL is required");

  const browser = await puppeteer.launch({
    headless: chromium.headless,
    args: commonPuppeteerArgs,
    executablePath: await chromium.executablePath(),
  });
  console.log("Using Chrome from:", await chromium.executablePath());

  try {
    const page = await browser.newPage();
    await page.goto(url);

    await page.addScriptTag({
      path: axeCorePath,
    });

    const results = await page.evaluate(async () => {
      if (typeof window.axe !== 'undefined') {
        return await window.axe.run();
      } else {
        console.error("Axe Core not loaded on the page.");
        return null;
      }
    });

    return results;
  } catch (error) {
    console.error("Accessibility analysis failed for URL:", error);
    throw error;
  } finally {
    await browser.close();
  }
};

export const analyzeHtml = async (htmlFilePath) => {
  if (!htmlFilePath || typeof htmlFilePath !== 'string') {
    throw new Error("HTML FILE PATH REQUIRED and must be a string");
  }

  let htmlContent;
  try {
    htmlContent = await readFile(htmlFilePath, "utf-8");
  } catch (error) {
    console.error(`Error reading HTML file from path: ${htmlFilePath}`, error);
    throw new Error(`Failed to read HTML file: ${error.message}`);
  }

  const browser = await puppeteer.launch({
    headless: chromium.headless,
    args: commonPuppeteerArgs,
    executablePath: await chromium.executablePath(),
  });
  console.log("Using Chrome from:", await chromium.executablePath());

  try {
    const page = await browser.newPage();
    await page.setContent(htmlContent);
    await page.addScriptTag({
        path: axeCorePath,
    });

    const results = await page.evaluate(async () => {
        if (typeof window.axe !== 'undefined') {
            return await window.axe.run();
        } else {
            console.error("Axe Core not loaded on the page for HTML analysis.");
            return null;
        }
    });
    return results;
  } catch (error) {
    console.error("Accessibility analysis failed for HTML:", error.message);
    throw error;
  } finally {
    await browser.close();
  }
};