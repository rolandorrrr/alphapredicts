export interface PoliticsMarket {
  question: string;
  yesProbability: number;
  volume24h: number;
  priceChange24h: number;
  url: string;
  source: "polymarket" | "kalshi";
}

export async function fetchPolymarketPolitics(): Promise<PoliticsMarket[]> {
  try {
    const res = await fetch(
      "https://gamma-api.polymarket.com/events?tag=politics&closed=false&active=true&order=volume24hr&ascending=false&limit=15",
      { next: { revalidate: 0 } }
    );
    if (!res.ok) return [];
    const events = await res.json();

    const markets: PoliticsMarket[] = [];

    for (const event of events) {
      const eventMarkets = event.markets || [event];
      for (const m of eventMarkets) {
        if (!m.question) continue;
        let yesProbability = 0.5;
        try {
          const prices = typeof m.outcomePrices === "string" ? JSON.parse(m.outcomePrices) : m.outcomePrices;
          if (prices && prices[0]) yesProbability = parseFloat(prices[0]);
        } catch { /* default */ }

        markets.push({
          question: m.question || event.title || "",
          yesProbability,
          volume24h: Number(m.volume24hr || m.volume || 0),
          priceChange24h: Number(m.oneDayPriceChange || 0) * 100,
          url: `https://polymarket.com/event/${event.slug || m.conditionId || ""}`,
          source: "polymarket",
        });
      }
    }

    return markets.sort((a, b) => b.volume24h - a.volume24h).slice(0, 10);
  } catch (err) {
    console.error("Polymarket politics fetch error:", err);
    return [];
  }
}

export async function fetchKalshiPolitics(): Promise<PoliticsMarket[]> {
  try {
    const res = await fetch(
      "https://api.elections.kalshi.com/trade-api/v2/events?status=open&limit=20&with_nested_markets=true",
      { headers: { Accept: "application/json" }, next: { revalidate: 0 } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    const events = (data.events || []).filter(
      (e: Record<string, unknown>) =>
        String(e.category || "").toLowerCase().includes("politic") ||
        String(e.category || "").toLowerCase().includes("government") ||
        String(e.category || "").toLowerCase().includes("election")
    );

    const markets: PoliticsMarket[] = [];

    for (const event of events) {
      const nested = (event.markets as Array<Record<string, unknown>>) || [];
      const topMarket = nested[0] || {};

      const lastPrice = Number(topMarket.last_price || topMarket.yes_ask || 0.5);
      const prevPrice = Number(topMarket.previous_price || topMarket.previous_yes_bid || lastPrice);
      const priceChange = (lastPrice - prevPrice) * 100;

      markets.push({
        question: String(event.title),
        yesProbability: lastPrice > 1 ? lastPrice / 100 : lastPrice,
        volume24h: Number(event.volume_24h || topMarket.volume_24h || 0),
        priceChange24h: priceChange,
        url: `https://kalshi.com/markets/${event.event_ticker || ""}`,
        source: "kalshi",
      });
    }

    return markets.sort((a, b) => b.volume24h - a.volume24h).slice(0, 10);
  } catch (err) {
    console.error("Kalshi politics fetch error:", err);
    return [];
  }
}
