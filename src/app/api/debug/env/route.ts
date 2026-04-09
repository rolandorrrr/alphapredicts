import { NextResponse } from "next/server";

export async function GET() {
  // Return presence (not values) of specific env vars for debugging
  const envKeys = Object.keys(process.env)
    .filter((k) => k.startsWith("TELEGRAM") || k.startsWith("GEMINI") || k.startsWith("NEXT_PUBLIC") || k.includes("SUPABASE") || k.includes("STRIPE"))
    .sort();

  const telegramStatus = {
    TELEGRAM_BOT_TOKEN_set: !!process.env.TELEGRAM_BOT_TOKEN,
    TELEGRAM_BOT_TOKEN_length: process.env.TELEGRAM_BOT_TOKEN?.length || 0,
    TELEGRAM_BOT_TOKEN_prefix: process.env.TELEGRAM_BOT_TOKEN?.slice(0, 10) || "none",
    TELEGRAM_CHANNEL_ID_set: !!process.env.TELEGRAM_CHANNEL_ID,
    TELEGRAM_CHANNEL_ID_value: process.env.TELEGRAM_CHANNEL_ID || "none",
  };

  return NextResponse.json({
    runtime: "nodejs",
    nodeEnv: process.env.NODE_ENV,
    vercelEnv: process.env.VERCEL_ENV,
    telegramStatus,
    matchingEnvKeys: envKeys,
  });
}
