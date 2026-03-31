import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { fetchAllMarkets } from "@/lib/markets";
import { generateArticle } from "@/lib/ai/generate-article";
import { PERSONAS } from "@/lib/ai/personas";

export const maxDuration = 300;

export async function GET(request: Request) {
  // Verify authorization
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { cookies: { getAll: () => [], setAll: () => {} } }
    );

    // Check if we already generated today
    const today = new Date().toISOString().split("T")[0];
    const { data: existing } = await supabase
      .from("articles")
      .select("id")
      .gte("published_at", `${today}T00:00:00Z`)
      .lte("published_at", `${today}T23:59:59Z`)
      .limit(1);

    if (existing && existing.length > 0) {
      return NextResponse.json({
        message: "Articles already generated today",
        date: today,
      });
    }

    // Fetch market data
    const { grouped } = await fetchAllMarkets();

    // Generate articles for each persona in parallel
    const [marcusArticle, zaraArticle, vanceArticle] = await Promise.allSettled([
      generateArticle(PERSONAS.marcus, grouped.sports.length > 0 ? grouped.sports : grouped.finance.slice(0, 2)),
      generateArticle(PERSONAS.zara, grouped.genz.length > 0 ? grouped.genz : grouped.finance.slice(0, 2)),
      generateArticle(PERSONAS.vance, grouped.finance.length > 0 ? grouped.finance : grouped.sports.slice(0, 2)),
    ]);

    const articles = [marcusArticle, zaraArticle, vanceArticle]
      .filter((r) => r.status === "fulfilled" && r.value !== null)
      .map((r) => (r as PromiseFulfilledResult<NonNullable<Awaited<ReturnType<typeof generateArticle>>>>).value);

    if (articles.length === 0) {
      return NextResponse.json({ error: "Failed to generate any articles" }, { status: 500 });
    }

    // Insert articles (first one is featured)
    const { data: inserted, error } = await supabase
      .from("articles")
      .insert(
        articles.map((a, i) => ({
          title: a.title,
          slug: a.slug,
          body: a.body,
          excerpt: a.excerpt,
          category: a.category,
          author_id: a.author_id,
          read_time_minutes: a.read_time_minutes,
          published_at: a.published_at,
          is_featured: i === 0,
        }))
      )
      .select("id, title, slug, author_id");

    if (error) {
      console.error("Failed to insert articles:", error);
      return NextResponse.json({ error: "Failed to save articles" }, { status: 500 });
    }

    return NextResponse.json({
      message: `Generated ${inserted.length} articles`,
      date: today,
      articles: inserted.map((a) => ({
        id: a.id,
        title: a.title,
        slug: a.slug,
      })),
    });
  } catch (err) {
    console.error("Cron error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
