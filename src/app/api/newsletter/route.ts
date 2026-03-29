import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { newsletterSchema } from "@/lib/validations";
import { resend, NOTIFICATION_EMAIL } from "@/lib/resend";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = newsletterSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        cookies: {
          getAll: () => [],
          setAll: () => {},
        },
      }
    );

    const { error } = await supabase.from("newsletter_subscribers").insert({
      email: parsed.data.email,
      source: body.source || "homepage",
    });

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "This email is already subscribed" },
          { status: 409 }
        );
      }
      throw error;
    }

    // Notify about new subscriber
    try {
      await resend?.emails.send({
        from: "AlphaPredicts <onboarding@resend.dev>",
        to: NOTIFICATION_EMAIL,
        subject: `[AlphaPredicts] New newsletter subscriber`,
        html: `
          <div style="font-family: system-ui, sans-serif; max-width: 600px;">
            <h2 style="color: #0b1326; border-bottom: 2px solid #c8a93e; padding-bottom: 8px;">
              New Newsletter Subscriber
            </h2>
            <p style="font-size: 16px; margin-top: 16px;">
              <strong>Email:</strong> ${parsed.data.email}
            </p>
            <p style="font-size: 14px; color: #666;">
              <strong>Source:</strong> ${body.source || "homepage"}
            </p>
            <p style="margin-top: 24px; font-size: 12px; color: #999;">
              Subscribed at ${new Date().toISOString()} via alphapredicts.com
            </p>
          </div>
        `,
      });
    } catch (emailErr) {
      console.error("Failed to send email notification:", emailErr);
    }

    return NextResponse.json({ message: "Subscribed successfully" });
  } catch {
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
