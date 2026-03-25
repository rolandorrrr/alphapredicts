import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { contactSchema } from "@/lib/validations";

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

    return NextResponse.json({ message: "Form submitted successfully" });
  } catch {
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
