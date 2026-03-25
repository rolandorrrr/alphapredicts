"use client";

import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function AnalyticsProvider() {
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    const checkConsent = () => {
      const stored = localStorage.getItem("cookie-consent");
      if (stored) {
        const prefs = JSON.parse(stored);
        setHasConsent(prefs.analytics === true);
      }
    };

    checkConsent();

    // Re-check when consent changes
    const handler = () => {
      setTimeout(checkConsent, 100);
    };
    window.addEventListener("storage", handler);
    // Also listen for our custom cookie consent save
    const consentHandler = () => setTimeout(checkConsent, 100);
    window.addEventListener("cookie-consent-updated", consentHandler);

    return () => {
      window.removeEventListener("storage", handler);
      window.removeEventListener("cookie-consent-updated", consentHandler);
    };
  }, []);

  if (!hasConsent) return null;

  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
