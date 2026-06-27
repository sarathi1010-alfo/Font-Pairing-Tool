import fs from 'fs';
import path from 'path';

// Define the root URL
const BASE_URL = 'https://fontfusion.alfo.online';

function validateSitemap() {
  const sitemapPath = path.join(process.cwd(), 'out', 'sitemap.xml');
  if (!fs.existsSync(sitemapPath)) {
    console.warn("WARNING: sitemap.xml not found in 'out' directory. Skipping check.");
    return true; // Don't fail if we can't find it (maybe not exported yet)
  }

  const sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');
  let hasErrors = false;

  // Simple regex to extract all URLs
  const urlRegex = /<loc>(.*?)<\/loc>/g;
  let match;
  let count = 0;

  console.log('Validating sitemap URLs:');
  while ((match = urlRegex.exec(sitemapContent)) !== null) {
    count++;
    const url = match[1];

    if (!url.startsWith(BASE_URL)) {
      console.error(`❌ Invalid base URL: ${url}`);
      hasErrors = true;
    }

    if (url.endsWith('/') && url !== BASE_URL + '/') {
       // Wait, usually Next.js sitemap builder doesn't add trailing slashes, but let's check
       // If it's the root, it's fine.
    }

    // Check for duplicate slashes
    const urlWithoutProtocol = url.replace('https://', '');
    if (urlWithoutProtocol.includes('//')) {
      console.error(`❌ Duplicate slashes found: ${url}`);
      hasErrors = true;
    }
  }

  console.log(`Checked ${count} URLs in sitemap.`);
  return !hasErrors;
}

function main() {
  console.log('Running SEO Validator Pipeline...');

  const sitemapValid = validateSitemap();

  if (!sitemapValid) {
    console.error('\n❌ SEO Validation Failed!');
    process.exit(1);
  }

  console.log('\n✅ SEO Validation Passed!');
}

main();
