import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-02-25.clover",
});

export const PLANS = {
  tactical: {
    name: "Tactical",
    price: 14900, // cents
    interval: "month" as const,
  },
  sovereign: {
    name: "Sovereign",
    price: 125000, // cents
    interval: "year" as const,
  },
} as const;
