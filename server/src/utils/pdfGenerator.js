import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";


export const generatePdf = async (htmlContent, fileName) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  
  await page.setContent(htmlContent, { waitUntil: "load" });

  const outputDir = path.resolve("generated-reports");
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

  const filePath = path.join(outputDir, `${fileName}.pdf`);
  await page.pdf({ path: filePath, format: "A4" });

  await browser.close();
  return filePath;
};
