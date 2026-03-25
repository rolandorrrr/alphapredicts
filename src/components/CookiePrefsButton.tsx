"use client";

export default function CookiePrefsButton() {
  return (
    <button
      className="text-slate-500 hover:text-primary hover:underline decoration-tertiary transition-opacity duration-300"
      onClick={() => {
        window.dispatchEvent(new CustomEvent("open-cookie-preferences"));
      }}
    >
      Cookie Preferences
    </button>
  );
}
