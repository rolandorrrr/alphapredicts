import type { WhaleTrade } from "../markets/polymarket-data";

function timeAgo(timestamp: string): string {
  const diff = Date.now() - new Date(timestamp).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} minutes ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hour${hrs > 1 ? "s" : ""} ago`;
  return `${Math.floor(hrs / 24)} day${hrs >= 48 ? "s" : ""} ago`;
}

export function formatWhaleSignal(trades: WhaleTrade[]): string {
  if (trades.length === 0) return "";

  const sorted = trades
    .sort((a, b) => b.size - a.size)
    .slice(0, 5);

  let msg = "🐋 <b>ALPHAPREDICTS WHALE ALERT</b>\n\n";

  for (const t of sorted) {
    const action = t.side === "BUY" ? "BUY" : "SELL";
    const actionEmoji = t.side === "BUY" ? "🟢" : "🔴";
    const sizeStr = t.size >= 1000000
      ? `$${(t.size / 1000000).toFixed(1)}M`
      : t.size >= 1000
        ? `$${(t.size / 1000).toFixed(0)}K`
        : `$${Math.round(t.size).toLocaleString()}`;
    const priceStr = t.price < 1 ? `${Math.round(t.price * 100)}¢` : `$${t.price.toFixed(2)}`;
    const sourceTag = t.source === "polymarket" ? "Polymarket" : "Kalshi";
    const ago = timeAgo(t.timestamp);

    msg += `${actionEmoji} <b>${sizeStr} ${action}</b> on "${t.title}" @ ${priceStr}\n`;
    msg += `⏰ ${ago} on ${sourceTag}\n\n`;
  }

  msg += `🔍 Track whale movements → <a href="https://www.alphapredicts.com/signals">alphapredicts.com/signals</a>`;

  return msg;
}
