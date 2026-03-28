"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        router.push("/");
        router.refresh();
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        });
        if (error) throw error;
        setSuccess("Check your email for a confirmation link to complete registration.");
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "An error occurred";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = async (provider: "google" | "github") => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) setError(error.message);
  };

  return (
    <div className="pt-24 pb-12 min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="bg-surface-container-low border border-outline-variant/20 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <Link href="/" className="text-2xl font-black tracking-tighter text-primary uppercase">
              AlphaPredicts
            </Link>
            <h1 className="text-3xl font-black uppercase tracking-tight mt-4">
              {mode === "login" ? "Access Terminal" : "Create Account"}
            </h1>
            <p className="text-on-surface-variant text-sm mt-2">
              {mode === "login"
                ? "Enter your credentials to access the Alpha feed."
                : "Join 5,000+ sovereign analysts."
              }
            </p>
          </div>

          {/* Error / Success */}
          {error && (
            <div className="bg-error-container/20 border border-error/30 text-error px-4 py-3 text-sm mb-6" role="alert">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-secondary/10 border border-secondary/30 text-secondary px-4 py-3 text-sm mb-6" role="status">
              {success}
            </div>
          )}

          {/* OAuth */}
          <div className="space-y-3 mb-6">
            <button
              onClick={() => handleOAuth("google")}
              className="w-full py-3 border border-outline-variant hover:bg-surface-container-highest transition-colors font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Continue with Google
            </button>
            <button
              onClick={() => handleOAuth("github")}
              className="w-full py-3 border border-outline-variant hover:bg-surface-container-highest transition-colors font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              Continue with GitHub
            </button>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="h-px flex-1 bg-outline-variant/30" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">or</span>
            <div className="h-px flex-1 bg-outline-variant/30" />
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-surface-container-lowest border border-outline-variant/30 px-4 py-3 text-sm text-on-surface focus:ring-1 focus:ring-secondary focus:border-secondary outline-none"
                placeholder="analyst@alphapredicts.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-surface-container-lowest border border-outline-variant/30 px-4 py-3 text-sm text-on-surface focus:ring-1 focus:ring-secondary focus:border-secondary outline-none"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-primary text-on-primary font-black uppercase tracking-widest text-sm hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading
                ? "Processing..."
                : mode === "login"
                  ? "Access Alpha"
                  : "Create Account"
              }
            </button>
          </form>

          {/* Toggle */}
          <div className="text-center mt-6">
            <button
              onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(null); setSuccess(null); }}
              className="text-sm text-on-surface-variant hover:text-primary transition-colors"
            >
              {mode === "login"
                ? "Don't have an account? Register"
                : "Already have an account? Login"
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
