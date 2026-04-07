import { NextResponse } from "next/server";
import { fetchPolymarketPolitics, fetchKalshiPolitics } from "@/lib/markets/polymarket-politics";
import { formatValueSignal } from "@/lib/signals/value-price";
import { sendTelegramMessage } from "@/lib/telegram";

export const maxDuration = 60;

export async function GET() {
  try {
    const [polyMarkets, kalshiMarkets] = await Promise.allSettled([
      fetchPolymarketPolitics(),
      fetchKalshiPolitics(),
    ]);

    const allMarkets = [
      ...(polyMarkets.status === "fulfilled" ? polyMarkets.value : []),
      ...(kalshiMarkets.status === "fulfilled" ? kalshiMarkets.value : []),
    ].sort((a, b) => Math.abs(b.priceChange24h) - Math.abs(a.priceChange24h));

    const message = formatValueSignal(allMarkets);

    if (!message) {
      return NextResponse.json({ message: "No undervalued markets found", marketsChecked: allMarkets.length });
    }

    const result = await sendTelegramMessage(message);

    return NextResponse.json({
      message: result.ok ? "Value signal sent" : "Failed to send",
      marketsAnalyzed: allMarkets.length,
      error: result.error,
    });
  } catch (err) {
    console.error("Value signal error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
