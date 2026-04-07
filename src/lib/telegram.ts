const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHANNEL_ID = process.env.TELEGRAM_CHANNEL_ID;

export async function sendTelegramMessage(text: string, chatId?: string | number): Promise<{ ok: boolean; error?: string }> {
  if (!BOT_TOKEN) return { ok: false, error: "TELEGRAM_BOT_TOKEN not set" };

  const target = chatId || CHANNEL_ID;
  if (!target) return { ok: false, error: "No chat_id or TELEGRAM_CHANNEL_ID set" };

  try {
    const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: target,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });

    const data = await res.json();

    if (!data.ok) {
      console.error("Telegram API error:", data.description);
      return { ok: false, error: data.description };
    }

    return { ok: true };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("Telegram send error:", msg);
    return { ok: false, error: msg };
  }
}
