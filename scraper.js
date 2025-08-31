const puppeteer = require("puppeteer");
const fs = require("fs-extra");
const path = require("path");
const axios = require("axios");
const { URL } = require("url");

const BASE_URL = "https://mont-fort.com";
const OUTPUT_DIR = path.join(__dirname, "cloned-site");
const visited = new Set();

async function downloadAsset(assetUrl, basePath) {
  try {
    const parsed = new URL(assetUrl);
    const filePath = path.join(basePath, parsed.pathname);
    await fs.ensureDir(path.dirname(filePath));

    const response = await axios.get(assetUrl, { responseType: "arraybuffer" });
    await fs.writeFile(filePath, response.data);
    console.log(`📥 Downloaded asset: ${assetUrl}`);
  } catch (error) {
    console.warn(`⚠️ Failed to download asset: ${assetUrl}`);
  }
}

async function scrapePage(browser, pageUrl) {
  if (visited.has(pageUrl)) return;
  visited.add(pageUrl);

  const page = await browser.newPage();
  await page.goto(pageUrl, { waitUntil: "networkidle2", timeout: 60000 });

  // Get page content
  const html = await page.content();

  // Save rendered HTML
  const parsedUrl = new URL(pageUrl);
  let filePath = path.join(OUTPUT_DIR, parsedUrl.pathname);
  if (filePath.endsWith("/")) filePath += "index.html";
  if (!filePath.endsWith(".html")) filePath += ".html";
  await fs.ensureDir(path.dirname(filePath));
  await fs.writeFile(filePath, html);
  console.log(`✅ Saved page: ${pageUrl}`);

  // Download assets: img, link (CSS), script (JS)
  const assetUrls = await page.$$eval(
    'img[src], link[rel="stylesheet"], script[src]',
    (elements) => elements.map((el) => el.src || el.href),
  );

  for (const asset of assetUrls) {
    if (asset.startsWith(BASE_URL)) {
      await downloadAsset(asset, OUTPUT_DIR);
    }
  }

  // Get and follow internal links
  const internalLinks = await page.$$eval("a[href]", (anchors) =>
    anchors
      .map((a) => a.href)
      .filter(
        (href) =>
          href.startsWith("https://mont-fort.com") &&
          !href.includes("#") &&
          !href.includes("mailto:") &&
          !href.includes("tel:"),
      ),
  );

  await page.close();

  for (const link of internalLinks) {
    await scrapePage(browser, link);
  }
}

(async () => {
  await fs.remove(OUTPUT_DIR);
  const browser = await puppeteer.launch({ headless: true });

  try {
    await scrapePage(browser, BASE_URL);
    console.log("🎉 Site cloned successfully into ./cloned-site");
  } catch (err) {
    console.error("❌ Scraping failed:", err);
  } finally {
    await browser.close();
  }
})();
