import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

import { constructMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = constructMetadata({
  title: "FontPair - Best Font Combinations for Designers",
  description: "Find font pairs that look premium, readable, and ready to ship. A fast, beautiful font pairing tool that helps designers and founders discover, compare, and save the perfect typography combinations.",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": siteConfig.name,
              "url": siteConfig.url,
              "description": siteConfig.description,
              "applicationCategory": "DesignApplication",
              "operatingSystem": "All",
            }),
          }}
        />

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-HZQ3QT11QC"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-HZQ3QT11QC');
          `}
        </Script>
      </head>
      <body className={`${inter.className} min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 flex flex-col`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="flex-1 flex flex-col">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
        {/* Placeholder for future lightweight analytics like Plausible or Umami */}
        {/* <Script defer data-domain="fontpairing.com" src="https://plausible.io/js/script.js" strategy="afterInteractive" /> */}
      </body>
    </html>
  );
}
