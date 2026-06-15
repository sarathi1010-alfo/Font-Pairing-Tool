require('dotenv').config();
const { google } = require('googleapis');

/**
 * GSC API Sitemap Submission Script
 * Submits the sitemap index to Google Search Console programmatically.
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://fontpair.alfo.online';
const SITEMAP_URLS = [
  `${SITE_URL}/sitemap.xml`,
];

async function submitSitemaps() {
  if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    console.warn('⚠️ GOOGLE_APPLICATION_CREDENTIALS not set. Skipping sitemap submission.');
    return;
  }

  try {
    const auth = new google.auth.GoogleAuth({
      scopes: ['https://www.googleapis.com/auth/webmasters'],
    });

    const webmasters = google.webmasters({
      version: 'v3',
      auth: await auth.getClient(),
    });

    for (const sitemapUrl of SITEMAP_URLS) {
      console.log(`Submitting sitemap: ${sitemapUrl} to property: ${SITE_URL}`);

      await webmasters.sitemaps.submit({
        siteUrl: SITE_URL,
        feedpath: sitemapUrl,
      });

      console.log(`✅ Successfully submitted: ${sitemapUrl}`);
    }
  } catch (error) {
    console.error('❌ Error submitting sitemap:', error.message);
  }
}

submitSitemaps();
