import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Member Directory",
  description: "Browse AlphaPredicts community members, top analysts, and prediction market strategists.",
};

interface Profile {
  id: string;
  username: string | null;
  display_name: string | null;
  avatar_url: string | null;
  subscription_tier: string;
  accuracy_score: number;
  reputation_tokens: number;
  created_at: string;
}

const tierConfig: Record<string, { label: string; color: string; border: string; bg: string }> = {
  sovereign: { label: "Sovereign", color: "text-tertiary", border: "border-tertiary", bg: "bg-tertiary/10" },
  tactical: { label: "Tactical", color: "text-primary", border: "border-primary", bg: "bg-primary/10" },
  free: { label: "Free", color: "text-on-surface-variant", border: "border-outline-variant", bg: "bg-surface-container" },
};

export default async function MemberDirectoryPage() {
  const supabase = await createClient();

  const { data: members, error } = await supabase
    .from("profiles")
    .select("id, username, display_name, avatar_url, subscription_tier, accuracy_score, reputation_tokens, created_at")
    .order("reputation_tokens", { ascending: false });

  const profiles: Profile[] = members ?? [];

  return (
    <div className="pt-24 px-6 max-w-[1440px] mx-auto w-full pb-20">
      {/* Header */}
      <header className="mb-12">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-2.5 h-2.5 rounded-full bg-secondary-container signal-dot" />
          <span className="text-secondary font-[var(--font-label)] text-xs tracking-widest uppercase font-bold">
            {profiles.length} Registered {profiles.length === 1 ? "Analyst" : "Analysts"}
          </span>
        </div>
        <h1 className="text-5xl font-extrabold tracking-tighter mb-4 text-on-surface">MEMBER DIRECTORY</h1>
        <p className="text-on-primary-container max-w-2xl">
          The complete roster of AlphaPredicts analysts. Ranked by reputation tokens earned through verified predictions and community contribution.
        </p>
      </header>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-1 mb-12">
        <div className="bg-surface-container-low p-6 text-center">
          <div className="text-3xl font-black text-secondary">{profiles.length}</div>
          <div className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mt-1">Total Members</div>
        </div>
        <div className="bg-surface-container-low p-6 text-center">
          <div className="text-3xl font-black text-tertiary">
            {profiles.filter((p) => p.subscription_tier === "sovereign" || p.subscription_tier === "tactical").length}
          </div>
          <div className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mt-1">Pro Members</div>
        </div>
        <div className="bg-surface-container-low p-6 text-center">
          <div className="text-3xl font-black text-primary">
            {profiles.length > 0 ? (profiles.reduce((sum, p) => sum + (p.accuracy_score || 0), 0) / profiles.length).toFixed(1) : "0"}%
          </div>
          <div className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mt-1">Avg Accuracy</div>
        </div>
        <div className="bg-surface-container-low p-6 text-center">
          <div className="text-3xl font-black text-on-surface">
            {profiles.reduce((sum, p) => sum + (p.reputation_tokens || 0), 0).toLocaleString()}
          </div>
          <div className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mt-1">Total Rep Tokens</div>
        </div>
      </div>

      {error && (
        <div className="bg-error/10 border border-error/30 text-error px-6 py-4 text-sm font-bold uppercase tracking-widest mb-8">
          Failed to load member data. Please try again later.
        </div>
      )}

      {/* Member Grid */}
      {profiles.length === 0 && !error ? (
        <div className="text-center py-20">
          <span className="material-symbols-outlined text-6xl text-on-surface-variant/30 mb-4 block">group</span>
          <p className="text-on-surface-variant text-sm uppercase tracking-widest">No members yet. Be the first to join.</p>
          <Link href="/auth" className="inline-block mt-6 px-8 py-3 bg-tertiary text-on-tertiary font-bold text-sm uppercase tracking-widest hover:scale-105 transition-transform">
            Create Account
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
          {profiles.map((member, index) => {
            const tier = tierConfig[member.subscription_tier] ?? tierConfig.free;
            const initials = (member.display_name || member.username || "?")
              .split(" ")
              .map((w) => w[0])
              .join("")
              .toUpperCase()
              .slice(0, 2);
            const joinDate = new Date(member.created_at).toLocaleDateString("en-US", {
              month: "short",
              year: "numeric",
            });

            return (
              <div
                key={member.id}
                className={`bg-surface-container-low p-6 border-l-4 ${tier.border} hover:bg-surface-container-high transition-all duration-300 group`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    {/* Rank */}
                    <span className="text-2xl font-black text-on-surface-variant/20 italic">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {/* Avatar */}
                    {member.avatar_url ? (
                      <img
                        src={member.avatar_url}
                        alt={member.display_name || ""}
                        className="w-12 h-12 rounded-sm grayscale group-hover:grayscale-0 transition-all object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-sm bg-surface-container-highest flex items-center justify-center text-tertiary font-black text-sm">
                        {initials}
                      </div>
                    )}
                    {/* Name */}
                    <div>
                      <div className="font-bold text-on-surface group-hover:text-primary transition-colors">
                        {member.display_name || "Analyst"}
                      </div>
                      <div className="text-xs text-on-surface-variant">
                        @{member.username || "unknown"}
                      </div>
                    </div>
                  </div>
                  {/* Tier Badge */}
                  <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 ${tier.bg} ${tier.color}`}>
                    {tier.label}
                  </span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 mt-4">
                  <div className="text-center p-2 bg-surface-container-lowest">
                    <div className="text-lg font-black text-secondary">{member.accuracy_score?.toFixed(1) ?? "0.0"}%</div>
                    <div className="text-[8px] uppercase tracking-widest text-on-surface-variant font-bold">Accuracy</div>
                  </div>
                  <div className="text-center p-2 bg-surface-container-lowest">
                    <div className="text-lg font-black text-on-surface">{(member.reputation_tokens ?? 0).toLocaleString()}</div>
                    <div className="text-[8px] uppercase tracking-widest text-on-surface-variant font-bold">Rep</div>
                  </div>
                  <div className="text-center p-2 bg-surface-container-lowest">
                    <div className="text-lg font-black text-on-surface-variant">{joinDate}</div>
                    <div className="text-[8px] uppercase tracking-widest text-on-surface-variant font-bold">Joined</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Back to Community */}
      <div className="mt-12 text-center">
        <Link href="/community" className="text-tertiary hover:underline text-sm font-bold uppercase tracking-widest">
          &larr; Back to Community Hub
        </Link>
      </div>
    </div>
  );
}
