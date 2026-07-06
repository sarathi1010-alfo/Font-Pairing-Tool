import fs from 'fs';
import path from 'path';

// Define the root URL
const BASE_URL = 'https://fontfusion.alfo.online';

function validateSitemap(filename) {
  let sitemapPath = path.join(process.cwd(), 'out', filename);
  if (!fs.existsSync(sitemapPath)) {
    // If it's a dynamic sitemap it might be exported to an individual directory
    if (filename === 'sitemap.xml') {
      const sitemapIndexDir = path.join(process.cwd(), 'out', 'sitemap');
      if (fs.existsSync(sitemapIndexDir)) {
          let hasErrors = false;
          let totalCount = 0;
          const files = fs.readdirSync(sitemapIndexDir);
          for (const file of files) {
              if (file.endsWith('.xml')) {
                  const content = fs.readFileSync(path.join(sitemapIndexDir, file), 'utf-8');
                  const urlRegex = /<loc>(.*?)<\/loc>/g;
                  let match;
                  let count = 0;
                  while ((match = urlRegex.exec(content)) !== null) {
                    count++;
                    totalCount++;
                    const url = match[1];

                    if (!url.startsWith(BASE_URL)) {
                      console.error(`❌ Invalid base URL in sitemap/${file}: ${url}`);
                      hasErrors = true;
                    }

                    // Check for duplicate slashes
                    const urlWithoutProtocol = url.replace('https://', '');
                    if (urlWithoutProtocol.includes('//')) {
                      console.error(`❌ Duplicate slashes found in sitemap/${file}: ${url}`);
                      hasErrors = true;
                    }
                  }
              }
          }
          console.log(`Checked ${totalCount} URLs in sitemap/*.xml.`);
          return !hasErrors;
      }
    }

    console.warn(`WARNING: ${filename} not found in 'out' directory. Skipping check.`);
    return true; // Don't fail if we can't find it (maybe not exported yet)
  }

  const sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');
  let hasErrors = false;

  // Simple regex to extract all URLs
  const urlRegex = /<loc>(.*?)<\/loc>/g;
  let match;
  let count = 0;

  console.log(`Validating ${filename} URLs:`);
  while ((match = urlRegex.exec(sitemapContent)) !== null) {
    count++;
    const url = match[1];

    if (!url.startsWith(BASE_URL)) {
      console.error(`❌ Invalid base URL in ${filename}: ${url}`);
      hasErrors = true;
    }

    // Check for duplicate slashes
    const urlWithoutProtocol = url.replace('https://', '');
    if (urlWithoutProtocol.includes('//')) {
      console.error(`❌ Duplicate slashes found in ${filename}: ${url}`);
      hasErrors = true;
    }
  }

  console.log(`Checked ${count} URLs in ${filename}.`);
  return !hasErrors;
}

function main() {
  console.log('Running SEO Validator Pipeline...');

  const sitemaps = ['sitemap.xml', 'sitemap-articles.xml', 'sitemap-products.xml'];
  let allValid = true;

  for (const sitemap of sitemaps) {
    const isValid = validateSitemap(sitemap);
    if (!isValid) {
      allValid = false;
    }
  }

  if (!allValid) {
    console.error('\n❌ SEO Validation Failed!');
    process.exit(1);
  }

  console.log('\n✅ SEO Validation Passed!');
}

main();
