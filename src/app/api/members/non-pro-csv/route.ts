import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function GET() {
  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { cookies: { getAll: () => [], setAll: () => {} } }
    );

    // Get all free-tier users with their auth email
    const { data: profiles, error } = await supabase
      .from("profiles")
      .select("id, username, display_name, subscription_tier, accuracy_score, reputation_tokens, created_at")
      .eq("subscription_tier", "free");

    if (error) throw error;

    // Get emails from auth.users via admin API
    const { data: authData } = await supabase.auth.admin.listUsers({ perPage: 1000 });
    const emailMap = new Map<string, string>();
    for (const user of authData?.users || []) {
      if (user.email) emailMap.set(user.id, user.email);
    }

    // Build CSV
    const headers = ["email", "username", "display_name", "accuracy_score", "reputation_tokens", "joined"];
    const rows = (profiles || [])
      .filter((p) => emailMap.has(p.id))
      .map((p) => [
        emailMap.get(p.id) || "",
        p.username || "",
        p.display_name || "",
        String(p.accuracy_score || 0),
        String(p.reputation_tokens || 0),
        new Date(p.created_at).toISOString().split("T")[0],
      ]);

    const csv = [headers.join(","), ...rows.map((r) => r.map((v) => `"${v}"`).join(","))].join("\n");

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="alphapredicts-free-members-${new Date().toISOString().split("T")[0]}.csv"`,
      },
    });
  } catch (err) {
    console.error("CSV export error:", err);
    return NextResponse.json({ error: "Failed to export" }, { status: 500 });
  }
}
