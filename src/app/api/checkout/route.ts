import { NextResponse } from "next/server";
import { stripe, PLANS } from "@/lib/stripe";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const { tier, trial } = await request.json();

    if (!tier || !(tier in PLANS)) {
      return NextResponse.json({ error: "Invalid tier" }, { status: 400 });
    }

    const plan = PLANS[tier as keyof typeof PLANS];

    // Get current user
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              );
            } catch {
              // Server Component
            }
          },
        },
      }
    );

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    // Create Stripe Checkout Session
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sessionConfig: any = {
      mode: "subscription",
      payment_method_types: ["card"],
      customer_email: user.email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `AlphaPredicts ${plan.name}`,
              description: `${plan.name} subscription — institutional intelligence for prediction market analysts.`,
            },
            unit_amount: plan.price,
            recurring: {
              interval: plan.interval,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        user_id: user.id,
        tier: tier,
        trial: trial ? "true" : "false",
      },
      success_url: `${siteUrl}/pro?success=true`,
      cancel_url: `${siteUrl}/pro?canceled=true`,
    };

    // Add 7-day free trial if requested
    if (trial) {
      sessionConfig.subscription_data = {
        trial_period_days: 7,
      };
      // Payment method is still collected by default in subscription mode
      sessionConfig.payment_method_collection = "always";
    }

    const session = await stripe.checkout.sessions.create(sessionConfig);

    return NextResponse.json({ url: session.url });
  } catch (err: unknown) {
    console.error("Checkout error:", err);
    const message = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
