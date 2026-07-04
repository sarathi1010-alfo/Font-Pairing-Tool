import { chromium } from 'playwright';
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const urls = ['/blog', '/about'];
async function verify() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  for (const urlPath of urls) {
    const url = `${BASE_URL}${urlPath}`;
    console.log(`Testing: ${urlPath}`);
    const response = await page.goto(url);
    if (response.status() === 200) console.log(`✅ ${urlPath} OK`);
    else console.error(`❌ ${urlPath} FAILED: ${response.status()}`);
  }
  await browser.close();
}
verify();
