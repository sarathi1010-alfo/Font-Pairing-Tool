import fetch from 'node-fetch';

/**
 * Ping IndexNow API for the given URLs.
 * This script notifies Bing, Yandex, and other supporting search engines
 * about new or updated content.
 */

const SITE_URL = 'https://fontfusion.alfo.online';
// In a real environment, this key would be stored in a file at the root (e.g., /86950f5308b2a836fd804730ef0e5e7d.txt)
const API_KEY = '86950f5308b2a836fd804730ef0e5e7d';

const newUrls = [
  `${SITE_URL}/blog/professional-font-pairing-guide`,
  `${SITE_URL}/pairings/modern-serif-sans-serif`,
  `${SITE_URL}/pairings/vintage-typography`,
  `${SITE_URL}/pairings/minimalist-fonts`,
  `${SITE_URL}/pairings/body-text-headings`,
  `${SITE_URL}/pairings/script-display`,
  `${SITE_URL}/pairings/monospace-sans`,
  `${SITE_URL}/pairings/elegant-wedding`,
  `${SITE_URL}/pairings/tech-startup`,
  `${SITE_URL}/pairings/luxury-brand`,
  `${SITE_URL}/pairings/editorial-magazine`
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
