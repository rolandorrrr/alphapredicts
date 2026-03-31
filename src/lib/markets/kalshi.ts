import type { MarketData } from "./polymarket";

export async function fetchKalshiMarkets(): Promise<MarketData[]> {
  try {
    const res = await fetch(
      "https://api.elections.kalshi.com/trade-api/v2/events?status=open&limit=20&with_nested_markets=true",
      {
        headers: { Accept: "application/json" },
        next: { revalidate: 0 },
      }
    );

    if (!res.ok) {
      console.error("Kalshi API error:", res.status);
      return [];
    }

    const data = await res.json();
    const events = data.events || [];

    return events
      .filter((e: Record<string, unknown>) => e.title)
      .map((e: Record<string, unknown>) => {
        // Get probability from nested markets if available
        let yesProbability = 0.5;
        const markets = e.markets as Array<Record<string, unknown>> | undefined;
        if (markets && markets.length > 0) {
          const topMarket = markets[0];
          yesProbability = Number(topMarket.last_price || topMarket.yes_ask || 0.5);
          if (yesProbability > 1) yesProbability = yesProbability / 100;
        }

        return {
          source: "kalshi" as const,
          question: String(e.title),
          category: String(e.category || "general").toLowerCase(),
          yesProbability,
          volume24h: Number(e.volume_24h || e.volume || 0),
          endDate: String(e.close_date || e.expected_expiration_date || ""),
          description: String(e.sub_title || e.title || "").slice(0, 500),
          url: `https://kalshi.com/markets/${e.event_ticker || ""}`,
        };
      })
      .slice(0, 15);
  } catch (err) {
    console.error("Failed to fetch Kalshi:", err);
    return [];
  }
}
