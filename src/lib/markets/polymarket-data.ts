export interface LeaderboardEntry {
  rank: number;
  username: string;
  wallet: string;
  pnl: number;
  volume: number;
}

export interface TraderTrade {
  side: string; // BUY or SELL
  size: number;
  price: number;
  title: string;
  outcome: string;
  timestamp: string;
  traderUsername: string;
}

export interface WhaleTrade {
  side: string;
  size: number;
  price: number;
  title: string;
  outcome: string;
  timestamp: string;
  source: "polymarket" | "kalshi";
}

export async function fetchPolymarketLeaderboard(limit = 5): Promise<LeaderboardEntry[]> {
  try {
    const res = await fetch(
      `https://data-api.polymarket.com/v1/leaderboard?category=POLITICS&timePeriod=WEEK&orderBy=PNL&limit=${limit}`,
      { next: { revalidate: 0 } }
    );
    if (!res.ok) return [];
    const data = await res.json();

    return (data || []).map((entry: Record<string, unknown>, i: number) => ({
      rank: i + 1,
      username: String(entry.userName || entry.proxyWallet || `trader_${i}`),
      wallet: String(entry.proxyWallet || ""),
      pnl: Number(entry.pnl || 0),
      volume: Number(entry.vol || 0),
    }));
  } catch (err) {
    console.error("Polymarket leaderboard error:", err);
    return [];
  }
}

export async function fetchTraderTrades(wallet: string, username: string, limit = 5): Promise<TraderTrade[]> {
  try {
    const res = await fetch(
      `https://data-api.polymarket.com/trades?user=${wallet}&limit=${limit}`,
      { next: { revalidate: 0 } }
    );
    if (!res.ok) return [];
    const data = await res.json();

    return (data || []).map((t: Record<string, unknown>) => ({
      side: String(t.side || "BUY"),
      size: Number(t.size || 0),
      price: Number(t.price || 0),
      title: String(t.title || t.name || "Unknown Market"),
      outcome: String(t.outcome || ""),
      timestamp: String(t.timestamp || new Date().toISOString()),
      traderUsername: username,
    }));
  } catch (err) {
    console.error("Trader trades error:", err);
    return [];
  }
}

export async function fetchPolymarketWhaleTrades(minAmount = 10000, limit = 10): Promise<WhaleTrade[]> {
  try {
    const res = await fetch(
      `https://data-api.polymarket.com/trades?filterType=CASH&filterAmount=${minAmount}&limit=${limit}`,
      { next: { revalidate: 0 } }
    );
    if (!res.ok) return [];
    const data = await res.json();

    return (data || []).map((t: Record<string, unknown>) => ({
      side: String(t.side || "BUY"),
      size: Number(t.size || 0),
      price: Number(t.price || 0),
      title: String(t.title || t.name || "Unknown Market"),
      outcome: String(t.outcome || ""),
      timestamp: String(t.timestamp || new Date().toISOString()),
      source: "polymarket" as const,
    }));
  } catch (err) {
    console.error("Polymarket whale trades error:", err);
    return [];
  }
}

export async function fetchKalshiRecentLargeTrades(minContracts = 500, limit = 10): Promise<WhaleTrade[]> {
  try {
    const oneHourAgo = Math.floor((Date.now() - 3600000 * 24) / 1000);
    const res = await fetch(
      `https://api.elections.kalshi.com/trade-api/v2/markets/trades?limit=100&min_ts=${oneHourAgo}`,
      { headers: { Accept: "application/json" }, next: { revalidate: 0 } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    const trades = data.trades || [];

    return trades
      .filter((t: Record<string, unknown>) => Number(t.count || t.count_fp || 0) >= minContracts)
      .slice(0, limit)
      .map((t: Record<string, unknown>) => ({
        side: String(t.taker_side || "yes").toUpperCase() === "YES" ? "BUY" : "SELL",
        size: Number(t.count || t.count_fp || 0),
        price: Number(t.yes_price || t.yes_price_dollars || 0.5),
        title: String(t.ticker || ""),
        outcome: String(t.taker_side || ""),
        timestamp: String(t.created_time || new Date().toISOString()),
        source: "kalshi" as const,
      }));
  } catch (err) {
    console.error("Kalshi large trades error:", err);
    return [];
  }
}
