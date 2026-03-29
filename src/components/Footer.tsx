import Link from "next/link";
import CookiePrefsButton from "./CookiePrefsButton";

export default function Footer() {
  return (
    <footer className="w-full border-t border-[#16243d] bg-[#0b1326] font-[var(--font-inter)] text-sm leading-relaxed text-primary">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-12 py-16 w-full max-w-[1440px] mx-auto">
        <div className="col-span-1">
          <div className="text-lg font-bold text-primary mb-4 uppercase tracking-tighter">
            AlphaPredicts
          </div>
          <p className="text-slate-400 mb-6">
            High-stakes logic for the sovereign analyst. Deciphering the world
            through the lens of probability.
          </p>
          <div className="flex space-x-4">
            <span className="material-symbols-outlined text-slate-400 cursor-pointer hover:text-tertiary transition-colors">
              terminal
            </span>
            <span className="material-symbols-outlined text-slate-400 cursor-pointer hover:text-tertiary transition-colors">
              rss_feed
            </span>
            <span className="material-symbols-outlined text-slate-400 cursor-pointer hover:text-tertiary transition-colors">
              share
            </span>
          </div>
        </div>
        <div>
          <h6 className="text-white font-bold uppercase tracking-widest mb-6">
            Analysis
          </h6>
          <ul className="space-y-4">
            <li>
              <Link
                className="text-slate-400 hover:text-primary hover:underline decoration-tertiary transition-opacity duration-300"
                href="/analysis"
              >
                Market Directory
              </Link>
            </li>
            <li>
              <Link
                className="text-slate-400 hover:text-primary hover:underline decoration-tertiary transition-opacity duration-300"
                href="/signals"
              >
                Signal Archive
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h6 className="text-white font-bold uppercase tracking-widest mb-6">
            Community
          </h6>
          <ul className="space-y-4">
            <li>
              <Link
                className="text-slate-400 hover:text-primary hover:underline decoration-tertiary transition-opacity duration-300"
                href="/community"
              >
                Forums
              </Link>
            </li>
            <li>
              <Link
                className="text-slate-400 hover:text-primary hover:underline decoration-tertiary transition-opacity duration-300"
                href="/community"
              >
                Member Directory
              </Link>
            </li>
            <li>
              <Link
                className="text-slate-400 hover:text-primary hover:underline decoration-tertiary transition-opacity duration-300"
                href="/community"
              >
                Events
              </Link>
            </li>
            <li>
              <Link
                className="text-slate-400 hover:text-primary hover:underline decoration-tertiary transition-opacity duration-300"
                href="/support"
              >
                Support
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h6 className="text-white font-bold uppercase tracking-widest mb-6">
            Legal
          </h6>
          <ul className="space-y-4">
            <li>
              <Link
                className="text-slate-400 hover:text-primary hover:underline decoration-tertiary transition-opacity duration-300"
                href="/legal#privacy-policy"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                className="text-slate-400 hover:text-primary hover:underline decoration-tertiary transition-opacity duration-300"
                href="/legal#risk-disclosure"
              >
                Risk Disclosure
              </Link>
            </li>
            <li>
              <Link
                className="text-slate-400 hover:text-primary hover:underline decoration-tertiary transition-opacity duration-300"
                href="/legal#terms-of-service"
              >
                Terms of Service
              </Link>
            </li>
            <li>
              <Link
                className="text-slate-400 hover:text-primary hover:underline decoration-tertiary transition-opacity duration-300"
                href="/legal#electronic-communications"
              >
                Electronic Communications Policy
              </Link>
            </li>
            <li>
              <Link
                className="text-slate-400 hover:text-primary hover:underline decoration-tertiary transition-opacity duration-300"
                href="/legal#electronic-signature"
              >
                Consent to Electronic Signature
              </Link>
            </li>
            <li>
              <CookiePrefsButton />
            </li>
          </ul>
        </div>
      </div>
      <div className="px-12 py-8 border-t border-[#16243d] text-center text-xs text-slate-400">
        &copy; {new Date().getFullYear()} AlphaPredicts. High-stakes logic for
        the sovereign analyst. All rights reserved. Financial data is for
        informational purposes only.
      </div>
    </footer>
  );
}

