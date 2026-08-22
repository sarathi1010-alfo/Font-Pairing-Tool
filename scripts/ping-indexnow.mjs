import fetch from 'node-fetch';

/**
 * Ping IndexNow API for the given URLs.
 * This script notifies Bing, Yandex, and other supporting search engines
 * about new or updated content.
 */

const SITE_URL = 'https://fontfusion.alfo.online';
// In a real environment, this key would be stored in a file at the root (e.g., /e146ebfe7c264a28b577bd51da603a1d.txt)
const API_KEY = 'e146ebfe7c264a28b577bd51da603a1d';
// [YOUR_INDEXNOW_KEY] has been updated

const newUrls = [
  `${SITE_URL}/blog/ultimate-guide-to-font-pairing-2026`,
  `${SITE_URL}/blog/what-is-a-sans-serif-font`,
  `${SITE_URL}/blog/what-is-a-serif-font`,
  `${SITE_URL}/blog/what-is-contrast-in-typography`,
  `${SITE_URL}/blog/what-is-font-pairing`,
  `${SITE_URL}/blog/what-is-leading`,
  `${SITE_URL}/about`,
  `${SITE_URL}/blog`
];

async function pingIndexNow() {
  console.log('🚀 Pinging IndexNow API for new URLs...');

  const payload = {
    host: 'fontfusion.alfo.online',
    key: API_KEY,
    keyLocation: `${SITE_URL}/${API_KEY}.txt`,
    urlList: newUrls
  };

  try {
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      console.log('✅ IndexNow ping successful!');
    } else {
      console.error(`❌ IndexNow ping failed with status: ${response.status}`);
      const text = await response.text();
      console.error(text);
    }
  } catch (error) {
    console.error('❌ Error pinging IndexNow:', error.message);
  }
}

pingIndexNow();
