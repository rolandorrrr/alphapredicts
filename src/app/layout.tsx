import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TopNav from "@/components/TopNav";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "AlphaPredicts | High-Stakes Logic",
    template: "%s | AlphaPredicts",
  },
  description:
    "High-stakes logic for the sovereign analyst. Deciphering the world through the lens of probability with real-time prediction market intelligence.",
  keywords: [
    "prediction markets",
    "Polymarket",
    "Kalshi",
    "market analysis",
    "trading signals",
  ],
  openGraph: {
    type: "website",
    siteName: "AlphaPredicts",
    title: "AlphaPredicts | High-Stakes Logic",
    description:
      "Sovereign market intelligence for prediction market analysts.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AlphaPredicts | High-Stakes Logic",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${inter.variable}`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-on-surface font-[var(--font-inter)] antialiased selection:bg-tertiary selection:text-on-tertiary min-h-screen flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-20 focus:left-4 focus:z-[60] focus:bg-primary focus:text-on-primary focus:px-4 focus:py-2 focus:rounded-sm"
        >
          Skip to main content
        </a>
        <TopNav />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
