export interface MarketData {
  source: "polymarket" | "kalshi";
  question: string;
  category: string;
  yesProbability: number;
  volume24h: number;
  endDate: string;
  description: string;
  url: string;
}

export async function fetchPolymarketMarkets(): Promise<MarketData[]> {
  try {
    const res = await fetch(
      "https://gamma-api.polymarket.com/markets?active=true&closed=false&limit=20&order=volume24hr&ascending=false",
      { next: { revalidate: 0 } }
    );

    if (!res.ok) {
      console.error("Polymarket API error:", res.status);
      return [];
    }

    const data = await res.json();

    return data
      .filter((m: Record<string, unknown>) => m.question && m.outcomePrices)
      .map((m: Record<string, unknown>) => {
        let yesProbability = 0.5;
        try {
          const prices = JSON.parse(String(m.outcomePrices || "[]"));
          yesProbability = parseFloat(prices[0]) || 0.5;
        } catch {
          yesProbability = 0.5;
        }

        return {
          source: "polymarket" as const,
          question: String(m.question),
          category: String(m.category || "general").toLowerCase(),
          yesProbability,
          volume24h: Number(m.volume24hr || 0),
          endDate: String(m.endDate || ""),
          description: String(m.description || "").slice(0, 500),
          url: `https://polymarket.com/event/${m.conditionId || m.id}`,
        };
      })
      .slice(0, 15);
  } catch (err) {
    console.error("Failed to fetch Polymarket:", err);
    return [];
  }
}
