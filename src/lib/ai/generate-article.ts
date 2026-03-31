import { GoogleGenerativeAI } from "@google/generative-ai";
import type { PersonaConfig } from "./personas";
import type { MarketData } from "../markets";

const genAI = process.env.GEMINI_API_KEY
  ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  : null;

export interface GeneratedArticle {
  title: string;
  slug: string;
  body: string;
  excerpt: string;
  category: string;
  author_id: string;
  read_time_minutes: number;
  published_at: string;
}

function generateSlug(title: string): string {
  const dateStr = new Date().toISOString().split("T")[0];
  return (
    title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .slice(0, 60)
      .replace(/-$/, "") +
    "-" +
    dateStr
  );
}

function estimateReadTime(text: string): number {
  const words = text.split(/\s+/).length;
  return Math.max(1, Math.round(words / 250));
}

export async function generateArticle(
  persona: PersonaConfig,
  markets: MarketData[]
): Promise<GeneratedArticle | null> {
  if (!genAI || markets.length === 0) return null;

  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const marketDataStr = markets
    .map(
      (m, i) =>
        `Market ${i + 1}:
  Question: ${m.question}
  Source: ${m.source === "polymarket" ? "Polymarket" : "Kalshi"}
  Yes Probability: ${(m.yesProbability * 100).toFixed(1)}%
  24h Volume: $${m.volume24h.toLocaleString()}
  End Date: ${m.endDate || "TBD"}
  Description: ${m.description}`
    )
    .join("\n\n");

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const prompt = `${persona.systemPrompt}

Today is ${today}.

Here is live prediction market data for you to analyze and write about:

${marketDataStr}

Write a compelling article analyzing these prediction markets. You can focus on 1-3 of the markets above — pick the most interesting angles.

IMPORTANT: Respond ONLY with valid JSON in exactly this format, no markdown code fences:
{
  "title": "Your article title here",
  "excerpt": "A 1-2 sentence compelling summary (max 200 characters)",
  "body": "The full article body in Markdown format. Use ## for section headers. 600-1200 words.",
  "category": "One of: finance, politics, sports, entertainment, crypto, tech, geopolitics"
}`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();

    // Extract JSON — handle potential markdown code fences
    let jsonStr = text;
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      jsonStr = jsonMatch[0];
    }

    const parsed = JSON.parse(jsonStr);

    if (!parsed.title || !parsed.body) {
      console.error("Missing required fields in Gemini response");
      return null;
    }

    return {
      title: parsed.title,
      slug: generateSlug(parsed.title),
      body: parsed.body,
      excerpt: (parsed.excerpt || parsed.title).slice(0, 200),
      category: parsed.category || persona.category,
      author_id: persona.id,
      read_time_minutes: estimateReadTime(parsed.body),
      published_at: new Date().toISOString(),
    };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`Failed to generate article for ${persona.name}:`, msg);
    throw new Error(`${persona.name}: ${msg}`);
  }
}
