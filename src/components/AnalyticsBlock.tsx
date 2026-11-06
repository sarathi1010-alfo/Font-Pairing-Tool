"use client";

import Script from "next/script";

interface AnalyticsBlockProps {
  gaId?: string;
}

export function AnalyticsBlock({ gaId = "G-HZQ3QT11QC" }: AnalyticsBlockProps) {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
            window['ga-disable-${gaId}'] = true;
          } else {
            gtag('config', '${gaId}', {
              cookie_domain: 'auto',
              linker: { domains: ['alfo.online', 'sm-clinics.vercel.app', 'pdfutility.app'] },
              cookie_flags: 'SameSite=None;Secure'
            });
          }
        `}
      </Script>
    </>
  );
}
