"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const router = useRouter();
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
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
