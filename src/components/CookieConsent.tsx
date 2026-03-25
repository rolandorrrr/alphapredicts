"use client";

import { useState, useEffect } from "react";

interface CookiePreferences {
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
}

const defaultPrefs: CookiePreferences = {
  functional: true,
  analytics: false,
  marketing: false,
};

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [prefs, setPrefs] = useState<CookiePreferences>(defaultPrefs);

  useEffect(() => {
    const stored = localStorage.getItem("cookie-consent");
    if (!stored) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const handler = () => {
      const stored = localStorage.getItem("cookie-consent");
      if (stored) {
        setPrefs(JSON.parse(stored));
      }
      setShowDetails(true);
      setVisible(true);
    };
    window.addEventListener("open-cookie-preferences", handler);
    return () => window.removeEventListener("open-cookie-preferences", handler);
  }, []);

  const save = (p: CookiePreferences) => {
    localStorage.setItem("cookie-consent", JSON.stringify(p));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6 animate-[slideUp_0.4s_ease-out]"
      role="dialog"
      aria-label="Cookie consent"
    >
      <div className="glass-panel max-w-3xl mx-auto border border-outline-variant/20 rounded-sm p-6 md:p-8 shadow-2xl">
        <div className="flex items-start justify-between mb-4">
          <h2 className="text-lg font-bold text-on-surface">Cookie Preferences</h2>
          <button
            onClick={() => setVisible(false)}
            className="text-on-surface-variant hover:text-on-surface"
            aria-label="Close"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <p className="text-sm text-on-surface-variant mb-6">
          We use cookies to enhance your experience, analyze site traffic, and
          for marketing purposes. You can customize your preferences below.
        </p>

        {showDetails && (
          <div className="space-y-4 mb-6">
            <label className="flex items-center justify-between p-3 bg-surface-container-low rounded-sm">
              <div>
                <span className="text-sm font-bold text-on-surface">Functional</span>
                <p className="text-xs text-on-surface-variant">Required for the site to work</p>
              </div>
              <input type="checkbox" checked disabled className="accent-secondary" />
            </label>
            <label className="flex items-center justify-between p-3 bg-surface-container-low rounded-sm cursor-pointer">
              <div>
                <span className="text-sm font-bold text-on-surface">Analytics</span>
                <p className="text-xs text-on-surface-variant">Help us understand how visitors use the site</p>
              </div>
              <input
                type="checkbox"
                checked={prefs.analytics}
                onChange={(e) => setPrefs({ ...prefs, analytics: e.target.checked })}
                className="accent-secondary"
              />
            </label>
            <label className="flex items-center justify-between p-3 bg-surface-container-low rounded-sm cursor-pointer">
              <div>
                <span className="text-sm font-bold text-on-surface">Marketing</span>
                <p className="text-xs text-on-surface-variant">Personalized ads and retargeting</p>
              </div>
              <input
                type="checkbox"
                checked={prefs.marketing}
                onChange={(e) => setPrefs({ ...prefs, marketing: e.target.checked })}
                className="accent-secondary"
              />
            </label>
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => save({ functional: true, analytics: true, marketing: true })}
            className="px-6 py-2.5 bg-primary text-on-primary font-bold text-xs uppercase tracking-widest rounded-sm hover:bg-white transition-colors"
          >
            Accept All
          </button>
          {!showDetails ? (
            <button
              onClick={() => setShowDetails(true)}
              className="px-6 py-2.5 border border-outline-variant text-on-surface font-bold text-xs uppercase tracking-widest rounded-sm hover:bg-surface-container-high transition-colors"
            >
              Customize
            </button>
          ) : (
            <button
              onClick={() => save(prefs)}
              className="px-6 py-2.5 border border-outline-variant text-on-surface font-bold text-xs uppercase tracking-widest rounded-sm hover:bg-surface-container-high transition-colors"
            >
              Save Preferences
            </button>
          )}
          <button
            onClick={() => save(defaultPrefs)}
            className="px-6 py-2.5 text-on-surface-variant font-bold text-xs uppercase tracking-widest hover:text-on-surface transition-colors"
          >
            Reject Non-Essential
          </button>
        </div>
      </div>
      <style jsx>{`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
