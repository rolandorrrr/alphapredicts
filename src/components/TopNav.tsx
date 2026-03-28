"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

const navLinks = [
  { href: "/", label: "Markets" },
  { href: "/analysis", label: "Analysis" },
  { href: "/signals", label: "Signals" },
  { href: "/community", label: "Community" },
  { href: "/pro", label: "Pro" },
];

export default function TopNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  return (
    <header
      className="fixed top-0 w-full z-50 bg-[#0A192F] border-b border-[#2d3449]/30 font-[var(--font-inter)] antialiased tracking-tight text-sm"
      role="banner"
    >
      <div className="flex justify-between items-center px-6 py-4 max-w-[1440px] mx-auto">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="text-2xl font-black tracking-tighter text-primary uppercase"
            aria-label="AlphaPredicts Home"
          >
            AlphaPredicts
          </Link>
          <nav className="hidden lg:flex items-center gap-6" aria-label="Main navigation">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={
                    isActive
                      ? "text-tertiary font-bold border-b-2 border-tertiary pb-1"
                      : "text-primary/70 hover:text-primary transition-colors"
                  }
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative hidden lg:block">
            <label htmlFor="search-input" className="sr-only">Search assets</label>
            <input
              id="search-input"
              className="bg-surface-container-lowest border-none text-xs tracking-widest px-4 py-2 w-64 focus:ring-1 focus:ring-secondary text-on-surface"
              placeholder="SEARCH ASSETS..."
              type="text"
            />
          </div>
          <div className="flex items-center gap-2 text-primary">
            {user ? (
              <>
                <button
                  className="p-2 hover:bg-[#2d3449]/50 transition-all duration-200 active:scale-95 rounded-sm"
                  aria-label="Notifications"
                >
                  <span className="material-symbols-outlined">notifications</span>
                </button>
                <Link
                  href="/profile"
                  className="p-2 hover:bg-[#2d3449]/50 transition-all duration-200 active:scale-95 rounded-sm"
                  aria-label="Account profile"
                >
                  <span className="material-symbols-outlined">account_circle</span>
                </Link>
                <Link
                  href="/profile"
                  className="hidden sm:block px-4 py-2 text-sm font-bold text-primary hover:bg-[#16243d] transition-all duration-200 rounded-sm"
                >
                  Profile
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/auth"
                  className="hidden sm:block px-4 py-2 text-sm font-bold text-primary hover:bg-[#16243d] transition-all duration-200 rounded-sm"
                >
                  Login
                </Link>
              </>
            )}
            <Link
              href={user ? "/pro" : "/auth"}
              className="ml-2 bg-primary text-on-primary px-4 py-2 font-bold rounded-sm uppercase tracking-tighter hover:bg-white transition-colors active:scale-95"
            >
              Get Alpha
            </Link>
          </div>
          <button
            className="lg:hidden p-2 hover:bg-[#2d3449]/50 rounded-sm"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <span className="material-symbols-outlined">
              {mobileOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>
      {mobileOpen && (
        <nav className="lg:hidden border-t border-[#2d3449]/30 px-6 py-4 space-y-3" aria-label="Mobile navigation">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`block py-2 ${
                  isActive
                    ? "text-tertiary font-bold"
                    : "text-primary/70 hover:text-primary"
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}
          {!user && (
            <Link
              href="/auth"
              className="block py-2 text-secondary font-bold"
              onClick={() => setMobileOpen(false)}
            >
              Login / Register
            </Link>
          )}
          {user && (
            <Link
              href="/profile"
              className="block py-2 text-primary font-bold"
              onClick={() => setMobileOpen(false)}
            >
              Profile
            </Link>
          )}
        </nav>
      )}
    </header>
  );
}
