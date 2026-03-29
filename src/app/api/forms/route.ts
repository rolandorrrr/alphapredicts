import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { contactSchema } from "@/lib/validations";
import { resend, NOTIFICATION_EMAIL } from "@/lib/resend";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { form_type, ...data } = body;

    if (!form_type) {
      return NextResponse.json(
        { error: "form_type is required" },
        { status: 400 }
      );
    }

    if (form_type === "contact" || form_type === "support") {
      const parsed = contactSchema.safeParse(data);
      if (!parsed.success) {
        return NextResponse.json(
          { error: parsed.error.issues[0].message },
          { status: 400 }
        );
      }
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

    const { error } = await supabase.from("form_submissions").insert({
      form_type,
      data,
    });

    if (error) throw error;

    // Send email notification
    try {
      await resend?.emails.send({
        from: "AlphaPredicts <onboarding@resend.dev>",
        to: NOTIFICATION_EMAIL,
        subject: `[AlphaPredicts] New ${form_type} form submission`,
        html: `
          <div style="font-family: system-ui, sans-serif; max-width: 600px;">
            <h2 style="color: #0b1326; border-bottom: 2px solid #c8a93e; padding-bottom: 8px;">
              New ${form_type.charAt(0).toUpperCase() + form_type.slice(1)} Submission
            </h2>
            <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
              ${Object.entries(data)
                .map(
                  ([key, value]) => `
                <tr style="border-bottom: 1px solid #eee;">
                  <td style="padding: 8px 12px; font-weight: bold; color: #555; text-transform: capitalize; width: 120px;">${key.replace(/_/g, " ")}</td>
                  <td style="padding: 8px 12px; color: #222;">${String(value)}</td>
                </tr>`
                )
                .join("")}
            </table>
            <p style="margin-top: 24px; font-size: 12px; color: #999;">
              Submitted at ${new Date().toISOString()} via alphapredicts.com
            </p>
          </div>
        `,
      });
    } catch (emailErr) {
      // Log but don't fail the request if email fails
      console.error("Failed to send email notification:", emailErr);
    }

    return NextResponse.json({ message: "Form submitted successfully" });
  } catch {
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
