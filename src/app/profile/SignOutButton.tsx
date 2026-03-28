"use client";

import { createClient } from "@/lib/supabase/client";

export default function SignOutButton() {
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    // Force full page reload to clear all cached server state
    window.location.href = "/";
  };

  return (
    <button
      onClick={handleSignOut}
      className="w-full py-3 border border-error/30 text-error hover:bg-error/10 transition-colors font-bold uppercase tracking-widest text-xs"
    >
      Sign Out
    </button>
  );
}
