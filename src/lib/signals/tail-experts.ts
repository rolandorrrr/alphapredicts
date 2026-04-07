import type { LeaderboardEntry, TraderTrade } from "../markets/polymarket-data";

export function formatExpertSignal(
  leaderboard: LeaderboardEntry[],
  recentTrades: TraderTrade[]
): string {
  if (leaderboard.length === 0 && recentTrades.length === 0) return "";

  let msg = "🧠 <b>ALPHAPREDICTS EXPERT TRACKER</b>\n\n";

  // Show top recent trades from experts
  const topTrades = recentTrades
    .filter((t) => t.size > 100)
    .slice(0, 3);

  if (topTrades.length > 0) {
    for (const t of topTrades) {
      const action = t.side === "BUY" ? "bought" : "sold";
      const sizeStr = t.size >= 1000
        ? `$${(t.size / 1000).toFixed(1)}K`
        : `$${Math.round(t.size).toLocaleString()}`;

      msg += `👤 Trader "<b>${t.traderUsername}</b>" ${action} ${sizeStr} of "${t.title}"\n`;
      msg += `Learn more at <a href="https://www.alphapredicts.com">alphapredicts.com</a>\n\n`;
    }
  }

  // Show leaderboard
  if (leaderboard.length > 0) {
    msg += "📊 <b>Top Politics Traders This Week:</b>\n";
    for (const entry of leaderboard.slice(0, 5)) {
      const pnlStr = entry.pnl >= 1000
        ? `$${(entry.pnl / 1000).toFixed(0)}K`
        : `$${Math.round(entry.pnl).toLocaleString()}`;
      const emoji = entry.rank === 1 ? "🥇" : entry.rank === 2 ? "🥈" : entry.rank === 3 ? "🥉" : "▪️";
      msg += `${emoji} ${entry.username} — ${pnlStr} profit\n`;
    }
    msg += "\n";
  }

  msg += `⚡ Upgrade for real-time alerts → <a href="https://www.alphapredicts.com/pro">alphapredicts.com/pro</a>`;

  return msg;
}
