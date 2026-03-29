import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { forumReplySchema } from "@/lib/validations";

// GET replies for a topic
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const topicId = searchParams.get("topic_id");

    if (!topicId) {
      return NextResponse.json({ error: "topic_id is required" }, { status: 400 });
    }

    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll: () => cookieStore.getAll(),
          setAll: () => {},
        },
      }
    );

    const { data, error } = await supabase
      .from("forum_replies")
      .select("*, author:profiles(username, display_name, avatar_url, subscription_tier)")
      .eq("topic_id", topicId)
      .order("created_at", { ascending: true });

    if (error) throw error;

    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Failed to fetch replies" }, { status: 500 });
  }
}

// POST new reply
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = forumReplySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
    }

    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll: () => cookieStore.getAll(),
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              );
            } catch { /* Server Component */ }
          },
        },
      }
    );

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { data, error } = await supabase
      .from("forum_replies")
      .insert({
        topic_id: parsed.data.topic_id,
        body: parsed.data.body,
        author_id: user.id,
      })
      .select()
      .single();

    if (error) throw error;

    // Count replies and update reply_count using service role to bypass RLS
    const adminSupabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { cookies: { getAll: () => [], setAll: () => {} } }
    );

    const { count } = await adminSupabase
      .from("forum_replies")
      .select("*", { count: "exact", head: true })
      .eq("topic_id", parsed.data.topic_id);

    if (count !== null) {
      await adminSupabase
        .from("forum_topics")
        .update({ reply_count: count })
        .eq("id", parsed.data.topic_id);
    }

    return NextResponse.json(data, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create reply" }, { status: 500 });
  }
}
