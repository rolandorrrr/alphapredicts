import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Analysis",
  description: "Live analysis feed with deep dives into prediction markets, politics, finance, and pop culture.",
};

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  category: string | null;
  read_time_minutes: number | null;
  is_featured: boolean;
  published_at: string;
  author: {
    display_name: string | null;
    username: string | null;
  } | null;
}

const CATEGORY_COLORS: Record<string, string> = {
  finance: "text-tertiary bg-tertiary/10",
  politics: "text-primary bg-primary/10",
  sports: "text-secondary bg-secondary/10",
  entertainment: "text-error bg-error/10",
  crypto: "text-tertiary bg-tertiary/10",
  tech: "text-primary bg-primary/10",
  geopolitics: "text-on-surface-variant bg-surface-variant",
};

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const hrs = Math.floor(diff / 3600000);
  if (hrs < 1) return "just now";
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days === 1) return "yesterday";
  return `${days}d ago`;
}

export default async function AnalysisPage() {
  const supabase = await createClient();

  const { data: articles } = await supabase
    .from("articles")
    .select("id, title, slug, excerpt, category, read_time_minutes, is_featured, published_at, author:profiles(display_name, username)")
    .not("published_at", "is", null)
    .order("published_at", { ascending: false })
    .limit(30);

  const allArticles: Article[] = ((articles || []) as unknown as Article[]).map((a) => ({
    ...a,
    author: Array.isArray(a.author) ? a.author[0] || null : a.author,
  }));
  const featured = allArticles.find((a) => a.is_featured) || allArticles[0];
  const rest = allArticles.filter((a) => a.id !== featured?.id);

  return (
    <div className="pt-24 pb-12 max-w-[1440px] mx-auto px-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-2 h-2 rounded-full bg-secondary-container animate-pulse shadow-[0_0_8px_#00c705]" />
        <h1 className="text-xs font-black uppercase tracking-[0.3em] text-on-surface-variant">
          Live Analysis Feed
        </h1>
      </div>

      {allArticles.length === 0 ? (
        <div className="text-center py-32">
          <span className="material-symbols-outlined text-6xl text-on-surface-variant/30 mb-4 block">article</span>
          <p className="text-on-surface-variant text-sm uppercase tracking-widest mb-2">No articles published yet</p>
          <p className="text-on-surface-variant/50 text-xs">Articles are generated daily from live prediction market data.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Featured Article */}
          {featured && (
            <Link href={`/analysis/${featured.slug}`} className="block group">
              <section className="relative overflow-hidden bg-surface-container-low p-8 md:p-12 min-h-[300px] flex flex-col justify-end">
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent pointer-events-none" />
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="px-2 py-0.5 bg-tertiary text-on-tertiary text-[10px] font-bold uppercase tracking-widest">
                      Featured Report
                    </span>
                    <span className="text-[10px] text-on-surface-variant font-medium uppercase tracking-widest">
                      {featured.read_time_minutes || 5} MIN READ // BY {(featured.author?.display_name || "AlphaPredicts").toUpperCase()}
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black text-on-surface tracking-tighter leading-none mb-4 max-w-3xl group-hover:text-primary transition-colors">
                    {featured.title.toUpperCase()}
                  </h2>
                  {featured.excerpt && (
                    <p className="text-on-surface-variant text-lg max-w-xl line-clamp-2 font-light">
                      {featured.excerpt}
                    </p>
                  )}
                </div>
              </section>
            </Link>
          )}

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
            {rest.map((article) => {
              const catColor = CATEGORY_COLORS[article.category || ""] || CATEGORY_COLORS.geopolitics;
              return (
                <Link
                  key={article.id}
                  href={`/analysis/${article.slug}`}
                  className="bg-surface-container-low p-6 hover:bg-surface-container-high transition-all duration-300 group flex flex-col justify-between min-h-[220px]"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className={`text-[10px] font-bold tracking-[0.2em] uppercase px-2 py-1 ${catColor}`}>
                        {article.category || "Analysis"}
                      </span>
                      <span className="text-[10px] text-on-surface-variant">{timeAgo(article.published_at)}</span>
                    </div>
                    <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors leading-tight">
                      {article.title}
                    </h3>
                    {article.excerpt && (
                      <p className="text-sm text-on-surface-variant line-clamp-2">{article.excerpt}</p>
                    )}
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-outline-variant/10">
                    <span className="text-xs text-on-surface-variant">
                      By <span className="font-bold text-on-surface">@{article.author?.username || "alpha"}</span>
                    </span>
                    <span className="text-[10px] text-on-surface-variant uppercase tracking-widest">
                      {article.read_time_minutes || 5} min read
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
