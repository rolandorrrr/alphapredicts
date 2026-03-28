import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import SignOutButton from "./SignOutButton";

export const metadata = { title: "Profile" };

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const tier = profile?.subscription_tier ?? "free";
  const tierColors: Record<string, string> = {
    free: "text-on-surface-variant border-outline-variant",
    tactical: "text-primary border-primary",
    sovereign: "text-tertiary border-tertiary",
  };

  return (
    <div className="pt-24 pb-12 min-h-screen max-w-4xl mx-auto px-6">
      <div className="flex items-center gap-3 mb-8">
        <span className="w-2.5 h-2.5 rounded-full bg-secondary-container" />
        <h1 className="text-sm font-black uppercase tracking-widest text-on-surface-variant">Account Terminal</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="md:col-span-2 bg-surface-container-low border border-outline-variant/20 p-8">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-20 h-20 bg-surface-container-highest rounded-sm flex items-center justify-center">
              {profile?.avatar_url ? (
                <img src={profile.avatar_url} alt="Avatar" className="w-full h-full object-cover rounded-sm" />
              ) : (
                <span className="material-symbols-outlined text-4xl text-on-surface-variant">account_circle</span>
              )}
            </div>
            <div>
              <h2 className="text-2xl font-black uppercase tracking-tight">{profile?.display_name ?? "Analyst"}</h2>
              <p className="text-on-surface-variant text-sm">@{profile?.username ?? "unknown"}</p>
              <p className="text-on-surface-variant text-xs mt-1">{user.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-surface-container-lowest p-4 text-center">
              <div className="text-2xl font-black text-secondary">{profile?.accuracy_score ?? 0}%</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mt-1">Accuracy</div>
            </div>
            <div className="bg-surface-container-lowest p-4 text-center">
              <div className="text-2xl font-black text-tertiary">{profile?.reputation_tokens ?? 0}</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mt-1">Rep Tokens</div>
            </div>
            <div className="bg-surface-container-lowest p-4 text-center">
              <div className={`text-2xl font-black capitalize ${tier === "sovereign" ? "text-tertiary" : tier === "tactical" ? "text-primary" : "text-on-surface-variant"}`}>
                {tier}
              </div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mt-1">Tier</div>
            </div>
          </div>

          <SignOutButton />
        </div>

        {/* Subscription Status */}
        <div className="bg-surface-container-low border border-outline-variant/20 p-8">
          <h3 className="text-xs font-black uppercase tracking-widest text-on-surface-variant mb-6">Subscription</h3>

          <div className={`border ${tierColors[tier] ?? tierColors.free} px-4 py-3 mb-6`}>
            <div className="text-lg font-black uppercase tracking-tight capitalize">{tier}</div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mt-1">
              {tier === "free" ? "Limited access" : "Full Alpha access"}
            </div>
          </div>

          {tier === "free" && (
            <a
              href="/pro"
              className="block w-full py-4 premium-gradient text-on-tertiary-fixed font-black uppercase tracking-widest text-sm text-center hover:brightness-110 transition-all"
            >
              Upgrade to Pro
            </a>
          )}

          <div className="mt-6 space-y-3">
            <div className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Member Since</div>
            <div className="text-sm font-bold">
              {profile?.created_at
                ? new Date(profile.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
                : "Unknown"
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
