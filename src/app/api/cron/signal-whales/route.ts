import { NextResponse } from "next/server";
import { fetchPolymarketWhaleTrades, fetchKalshiRecentLargeTrades } from "@/lib/markets/polymarket-data";
import { formatWhaleSignal } from "@/lib/signals/whale-scanner";
import { sendTelegramMessage } from "@/lib/telegram";

export const maxDuration = 60;

export async function GET() {
  try {
    const [polyWhales, kalshiWhales] = await Promise.allSettled([
      fetchPolymarketWhaleTrades(10000, 10),
      fetchKalshiRecentLargeTrades(500, 10),
    ]);

    const allWhales = [
      ...(polyWhales.status === "fulfilled" ? polyWhales.value : []),
      ...(kalshiWhales.status === "fulfilled" ? kalshiWhales.value : []),
    ].sort((a, b) => b.size - a.size);

    const message = formatWhaleSignal(allWhales);

    if (!message) {
      return NextResponse.json({ message: "No whale trades detected" });
    }

    const result = await sendTelegramMessage(message);

    return NextResponse.json({
      message: result.ok ? "Whale signal sent" : "Failed to send",
      whaleTradesFound: allWhales.length,
      error: result.error,
    });
  } catch (err) {
    console.error("Whale signal error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
