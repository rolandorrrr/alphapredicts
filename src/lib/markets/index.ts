import { fetchPolymarketMarkets, type MarketData } from "./polymarket";
import { fetchKalshiMarkets } from "./kalshi";

export type { MarketData };

const SPORTS_CATEGORIES = ["sports", "entertainment", "pop_culture", "culture", "nfl", "nba", "mlb", "soccer", "mma", "esports"];
const GENZ_CATEGORIES = ["crypto", "tech", "technology", "ai", "trending", "social", "meme", "viral"];
// Everything else goes to Dr. Vance (finance, politics, economics, geopolitics, etc.)

export interface GroupedMarkets {
  sports: MarketData[];   // Marcus Cole
  genz: MarketData[];     // Zara Vibe
  finance: MarketData[];  // Dr. Elias Vance
}

export async function fetchAllMarkets(): Promise<{ markets: MarketData[]; grouped: GroupedMarkets }> {
  const [polyResult, kalshiResult] = await Promise.allSettled([
    fetchPolymarketMarkets(),
    fetchKalshiMarkets(),
  ]);

  const polyMarkets = polyResult.status === "fulfilled" ? polyResult.value : [];
  const kalshiMarkets = kalshiResult.status === "fulfilled" ? kalshiResult.value : [];

  const allMarkets = [...polyMarkets, ...kalshiMarkets]
    .sort((a, b) => b.volume24h - a.volume24h);

  const grouped: GroupedMarkets = { sports: [], genz: [], finance: [] };

  for (const market of allMarkets) {
    const cat = market.category.toLowerCase();
    if (SPORTS_CATEGORIES.some((s) => cat.includes(s))) {
      if (grouped.sports.length < 4) grouped.sports.push(market);
    } else if (GENZ_CATEGORIES.some((g) => cat.includes(g))) {
      if (grouped.genz.length < 4) grouped.genz.push(market);
    } else {
      if (grouped.finance.length < 4) grouped.finance.push(market);
    }
  }

  // If any group is empty, fill from overflow
  const overflow = allMarkets.filter(
    (m) => !grouped.sports.includes(m) && !grouped.genz.includes(m) && !grouped.finance.includes(m)
  );

  if (grouped.sports.length === 0 && overflow.length > 0) grouped.sports.push(overflow.shift()!);
  if (grouped.genz.length === 0 && overflow.length > 0) grouped.genz.push(overflow.shift()!);
  if (grouped.finance.length === 0 && overflow.length > 0) grouped.finance.push(overflow.shift()!);

  return { markets: allMarkets, grouped };
}
