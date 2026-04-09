import type { PoliticsMarket } from "../markets/polymarket-politics";

export function formatValueSignal(markets: PoliticsMarket[]): string {
  if (markets.length === 0) return "";

  // Primary: meaningful volume + meaningful price movement
  let undervalued = markets
    .filter(
      (m) =>
        m.volume24h > 500 &&
        m.yesProbability > 0.05 &&
        m.yesProbability < 0.95 &&
        Math.abs(m.priceChange24h) > 0.5
    )
    .sort((a, b) => Math.abs(b.priceChange24h) - Math.abs(a.priceChange24h))
    .slice(0, 4);

  // Fallback: if no movers, just pick the top 3 by volume
  if (undervalued.length === 0) {
    undervalued = markets
      .filter((m) => m.yesProbability > 0.05 && m.yesProbability < 0.95)
      .sort((a, b) => b.volume24h - a.volume24h)
      .slice(0, 3);
  }

  if (undervalued.length === 0) return "";

  let msg = "🎯 <b>ALPHAPREDICTS VALUE SCANNER</b>\n\n";

  for (const m of undervalued) {
    const payout = Math.round(100 / m.yesProbability);
    const volumeStr = m.volume24h >= 1000000
      ? `$${(m.volume24h / 1000000).toFixed(1)}M`
      : `$${Math.round(m.volume24h).toLocaleString()}`;
    const changeEmoji = m.priceChange24h >= 0 ? "📈" : "📉";
    const changeStr = m.priceChange24h >= 0
      ? `+${m.priceChange24h.toFixed(1)}%`
      : `${m.priceChange24h.toFixed(1)}%`;
    const sourceTag = m.source === "polymarket" ? "Polymarket" : "Kalshi";

    msg += `💰 $100 on "<b>${m.question}</b>" gets you <b>$${payout}</b>\n`;
    msg += `📊 ${volumeStr} traded in the past 24 hours\n`;
    msg += `${changeEmoji} Probability changed <b>${changeStr}</b> in the past 24 hours\n`;
    msg += `🏷️ ${sourceTag}\n\n`;
  }

  msg += `📖 Get deeper analysis → <a href="https://www.alphapredicts.com/analysis">alphapredicts.com/analysis</a>`;

  return msg;
}
