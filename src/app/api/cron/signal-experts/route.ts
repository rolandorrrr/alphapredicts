import { NextResponse } from "next/server";
import { fetchPolymarketLeaderboard, fetchTraderTrades } from "@/lib/markets/polymarket-data";
import { formatExpertSignal } from "@/lib/signals/tail-experts";
import { sendTelegramMessage } from "@/lib/telegram";

export const maxDuration = 120;

export async function GET() {
  try {
    // Get top 5 politics traders this week
    const leaderboard = await fetchPolymarketLeaderboard(5);

    // Get recent trades from top 3 traders
    const allTrades = [];
    for (const trader of leaderboard.slice(0, 3)) {
      if (!trader.wallet) continue;
      const trades = await fetchTraderTrades(trader.wallet, trader.username, 3);
      allTrades.push(...trades);
      // Brief pause to avoid rate limits
      await new Promise((r) => setTimeout(r, 1000));
    }

    const message = formatExpertSignal(leaderboard, allTrades);

    if (!message) {
      return NextResponse.json({ message: "No expert data available" });
    }

    const result = await sendTelegramMessage(message);

    return NextResponse.json({
      message: result.ok ? "Expert signal sent" : "Failed to send",
      tradersTracked: leaderboard.length,
      tradesFound: allTrades.length,
      error: result.error,
    });
  } catch (err) {
    console.error("Expert signal error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
