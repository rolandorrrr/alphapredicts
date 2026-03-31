import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: article } = await supabase
    .from("articles")
    .select("title, excerpt")
    .eq("slug", slug)
    .not("published_at", "is", null)
    .single();

  if (!article) return { title: "Article Not Found" };

  return {
    title: article.title,
    description: article.excerpt || article.title,
    openGraph: {
      title: article.title,
      description: article.excerpt || article.title,
      type: "article",
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: article } = await supabase
    .from("articles")
    .select("*, author:profiles(display_name, username, avatar_url, subscription_tier, accuracy_score)")
    .eq("slug", slug)
    .not("published_at", "is", null)
    .single();

  if (!article) notFound();

  // Fetch related articles
  const { data: related } = await supabase
    .from("articles")
    .select("title, slug, category, published_at, author:profiles(display_name, username)")
    .not("published_at", "is", null)
    .neq("id", article.id)
    .eq("category", article.category || "")
    .order("published_at", { ascending: false })
    .limit(3);

  const publishDate = new Date(article.published_at).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Simple Markdown-to-HTML (handles headers, bold, italic, paragraphs, lists)
  const bodyHtml = (article.body || "")
    .split("\n")
    .map((line: string) => {
      if (line.startsWith("### ")) return `<h3 class="text-lg font-bold text-on-surface mt-8 mb-3 uppercase tracking-tight">${line.slice(4)}</h3>`;
      if (line.startsWith("## ")) return `<h2 class="text-2xl font-black text-on-surface mt-10 mb-4 uppercase tracking-tighter">${line.slice(3)}</h2>`;
      if (line.startsWith("# ")) return `<h1 class="text-3xl font-black text-on-surface mt-10 mb-4 uppercase tracking-tighter">${line.slice(2)}</h1>`;
      if (line.startsWith("- ") || line.startsWith("* ")) return `<li class="ml-4 text-on-surface-variant">${formatInline(line.slice(2))}</li>`;
      if (line.match(/^\d+\. /)) return `<li class="ml-4 text-on-surface-variant list-decimal">${formatInline(line.replace(/^\d+\. /, ""))}</li>`;
      if (line.startsWith("> ")) return `<blockquote class="border-l-4 border-tertiary pl-4 italic text-on-surface-variant my-4">${formatInline(line.slice(2))}</blockquote>`;
      if (line.trim() === "") return `<div class="h-4"></div>`;
      return `<p class="text-on-surface-variant leading-relaxed mb-4">${formatInline(line)}</p>`;
    })
    .join("\n");

  return (
    <div className="pt-24 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-xs text-on-surface-variant">
          <Link href="/analysis" className="hover:text-primary transition-colors">Analysis</Link>
          <span>/</span>
          <span className="text-primary">{article.category || "General"}</span>
        </div>

        {/* Article Header */}
        <header className="mb-12">
          {article.category && (
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase px-2 py-1 bg-tertiary/10 text-tertiary inline-block mb-4">
              {article.category}
            </span>
          )}
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter leading-[0.95] mb-6">
            {article.title}
          </h1>
          {article.excerpt && (
            <p className="text-xl text-on-surface-variant font-light leading-relaxed mb-8">
              {article.excerpt}
            </p>
          )}
          <div className="flex items-center gap-4 pb-8 border-b border-outline-variant/20">
            <div className="w-12 h-12 rounded-sm bg-surface-container-highest flex items-center justify-center text-tertiary font-black text-sm">
              {(article.author?.display_name || "A").split(" ").map((w: string) => w[0]).join("").toUpperCase().slice(0, 2)}
            </div>
            <div>
              <div className="font-bold text-on-surface">{article.author?.display_name || "AlphaPredicts"}</div>
              <div className="text-xs text-on-surface-variant">
                {publishDate} &bull; {article.read_time_minutes || 5} min read
              </div>
            </div>
          </div>
        </header>

        {/* Article Body */}
        <article
          className="article-body text-base leading-relaxed"
          dangerouslySetInnerHTML={{ __html: bodyHtml }}
        />

        {/* Author Card */}
        <div className="mt-16 bg-surface-container-low p-8 border-l-4 border-tertiary">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 rounded-sm bg-surface-container-highest flex items-center justify-center text-tertiary font-black text-lg flex-shrink-0">
              {(article.author?.display_name || "A").split(" ").map((w: string) => w[0]).join("").toUpperCase().slice(0, 2)}
            </div>
            <div>
              <div className="text-lg font-bold text-on-surface mb-1">{article.author?.display_name}</div>
              <div className="text-xs text-on-surface-variant mb-2">@{article.author?.username} &bull; {article.author?.accuracy_score?.toFixed(1)}% Accuracy</div>
              <div className="text-sm text-on-surface-variant">
                {article.author?.subscription_tier === "sovereign" && (
                  <span className="text-[9px] font-black uppercase tracking-widest px-2 py-1 bg-tertiary/10 text-tertiary mr-2">Sovereign</span>
                )}
                AlphaPredicts Staff Analyst
              </div>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        {related && related.length > 0 && (
          <div className="mt-16">
            <h3 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant mb-6">Related Analysis</h3>
            <div className="grid gap-1">
              {related.map((r: Record<string, unknown>) => (
                <Link
                  key={r.slug as string}
                  href={`/analysis/${r.slug}`}
                  className="bg-surface-container-low p-4 hover:bg-surface-container-high transition-colors flex justify-between items-center"
                >
                  <div>
                    <span className="text-sm font-bold text-on-surface hover:text-primary transition-colors">{r.title as string}</span>
                    <span className="text-xs text-on-surface-variant ml-2">by @{(r.author as Record<string, string>)?.username}</span>
                  </div>
                  <span className="material-symbols-outlined text-on-surface-variant text-sm">arrow_forward</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Back */}
        <div className="mt-12 text-center">
          <Link href="/analysis" className="text-tertiary hover:underline text-sm font-bold uppercase tracking-widest">
            &larr; All Analysis
          </Link>
        </div>
      </div>
    </div>
  );
}

function formatInline(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-on-surface font-bold">$1</strong>')
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, '<code class="bg-surface-container-highest px-1 py-0.5 text-xs text-tertiary">$1</code>');
}
