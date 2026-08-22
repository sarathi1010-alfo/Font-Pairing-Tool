import { chromium } from 'playwright';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

const newUrls = [
  '/',
  '/about',
  '/blog',
  '/blog/ultimate-guide-to-font-pairing-2026',
  '/blog/what-is-a-sans-serif-font',
  '/blog/what-is-a-serif-font',
  '/blog/what-is-contrast-in-typography',
  '/blog/what-is-font-pairing',
  '/blog/what-is-leading'
];

async function verifyUrls() {
  console.log(`🔍 Starting technical integrity verification on ${BASE_URL}...`);
  const browser = await chromium.launch();
  const page = await browser.newPage();
  let hasErrors = false;

  for (const urlPath of newUrls) {
    const url = `${BASE_URL}${urlPath}`;
    console.log(`
📄 Testing: ${urlPath}`);

    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    try {
      const response = await page.goto(url, { waitUntil: 'networkidle' });

      // 1. Check Status Code
      const status = response.status();
      if (status !== 200) {
        console.error(`❌ HTTP Status: ${status}`);
        hasErrors = true;
      } else {
        console.log(`✅ HTTP Status: 200`);
      }

      // 2. Check for Broken Images
      const brokenImages = await page.evaluate(() => {
        const images = Array.from(document.querySelectorAll('img'));
        return images.filter(img => !img.complete || img.naturalWidth === 0).map(img => img.src);
      });
      if (brokenImages.length > 0) {
        console.error(`❌ Broken Images: ${brokenImages.join(', ')}`);
        hasErrors = true;
      } else {
        console.log(`✅ No broken images found.`);
      }

      // 3. Check for JS Console Errors
      if (consoleErrors.length > 0) {
        console.error(`❌ Console Errors: ${consoleErrors.join(", ")}`);
        hasErrors = true;
      } else {
        console.log(`✅ No JS console errors.`);
      }

      // 4. Functional Test (Main Page Only)
      if (urlPath === '/') {
        console.log('🛠️ Testing core functionality on home page...');

        // Test Filters (Simplified check if buttons exist)
        const filtersExist = await page.isVisible('[role="tablist"]');
        if (!filtersExist) {
          console.warn('⚠️ Could not find filter tablist. Check selector.');
        } else {
          console.log('✅ Filter tabs found.');
        }

        // Test Live Preview (Check if fonts are applied to some elements)
        const fontsToLoad = await page.evaluate(() => {
          const elements = Array.from(document.querySelectorAll('[style*="font-family"]'));
          return elements.length;
        });
        console.log(`✅ Found ${fontsToLoad} elements with custom font-family styles.`);
      }

    } catch (error) {
      console.error(`❌ Error navigating to ${url}: ${error.message}`);
      hasErrors = true;
    }

    page.removeAllListeners('console');
  }

  await browser.close();

  if (hasErrors) {
    console.error('\n❌ Technical Integrity Check Failed!');
    process.exit(1);
  } else {
    console.log('\n✅ All technical integrity checks passed!');
  }
}

verifyUrls();
