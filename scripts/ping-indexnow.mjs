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
  `${SITE_URL}/blog/data-visualization-typography-guide`,
  `${SITE_URL}/blog/what-is-a-sans-serif-font`,
  `${SITE_URL}/blog/what-is-a-serif-font`,
  `${SITE_URL}/blog/what-is-contrast-in-typography`,
  `${SITE_URL}/blog/what-is-font-pairing`,
  `${SITE_URL}/blog/what-is-leading`,
  `${SITE_URL}/about`,
  `${SITE_URL}/blog`,
  `${SITE_URL}/blog/accessibility-first-typography-guide`,
  `${SITE_URL}/pairings/accessible-ai-typography`,
  `${SITE_URL}/pairings/accessible-data-visualization`,
  `${SITE_URL}/pairings/accessible-ecommerce-typography`,
  `${SITE_URL}/pairings/accessible-fluid-typography`,
  `${SITE_URL}/pairings/accessible-sans-serifs`,
  `${SITE_URL}/pairings/dyslexia-friendly-fonts`,
  `${SITE_URL}/pairings/inclusive-editorial-design`,
  `${SITE_URL}/pairings/low-vision-pairings`,
  `${SITE_URL}/pairings/ui-accessibility-fonts`,
  `${SITE_URL}/pairings/variable-fonts-accessibility`,
  `${SITE_URL}/blog/variable-fonts-guide`,
  `${SITE_URL}/pairings/adaptable-variable-fonts-for-ecommerce`,
  `${SITE_URL}/pairings/condensed-variable-fonts-for-ui`,
  `${SITE_URL}/pairings/expressive-variable-display-fonts`,
  `${SITE_URL}/pairings/fluid-typography-pairings`,
  `${SITE_URL}/pairings/high-legibility-variable-fonts`,
  `${SITE_URL}/pairings/multilingual-variable-fonts`,
  `${SITE_URL}/pairings/responsive-variable-mobile-pairings`,
  `${SITE_URL}/pairings/variable-fonts-for-digital-editorial`,
  `${SITE_URL}/pairings/variable-fonts-for-e-commerce`,
  `${SITE_URL}/blog/dark-mode-typography-guide`,
  `${SITE_URL}/pairings/dark-mode-typography-pairings`,
  `${SITE_URL}/pairings/dark-mode-ai-typography`,
  `${SITE_URL}/pairings/accessible-sans-serifs`,
  `${SITE_URL}/pairings/dyslexia-friendly-fonts`,
  `${SITE_URL}/pairings/innovative-tech-fonts`,
  `${SITE_URL}/pairings/ui-accessibility-fonts`,
  `${SITE_URL}/pairings/mobile-checkout-fonts`,
  `${SITE_URL}/pairings/calming-wellness-fonts`,
  `${SITE_URL}/pairings/generative-ui-fonts`,
  `${SITE_URL}/pairings/minimalist-ui-fonts`
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
