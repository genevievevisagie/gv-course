import Stripe from "stripe";

/**
 * Server-side Stripe instance. Lazily created and env-guarded so the scaffold
 * builds before keys exist. Used by the (future) checkout + customer-portal
 * route handlers.
 */
let _stripe: Stripe | null = null;

export function getStripe(): Stripe | null {
  if (_stripe) return _stripe;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  _stripe = new Stripe(key); // use the account's pinned API version
  return _stripe;
}

export const isStripeConfigured = () => Boolean(process.env.STRIPE_SECRET_KEY);

// Subscription tiers shown on the landing page. Wire `priceId` to real Stripe
// Price IDs once products are created in the dashboard.
export interface Plan {
  id: string;
  name: string;
  price: string;
  cadence: string;
  blurb: string;
  features: string[];
  highlighted?: boolean;
  priceId?: string;
}

export const PLANS: Plan[] = [
  {
    id: "monthly",
    name: "Investor",
    price: "$49",
    cadence: "/month",
    blurb: "Full access to off-market intel and ranked shortlists.",
    features: [
      "Unlimited property analysis",
      "Ranked Tinder-style shortlist",
      "Full off-market listing feed",
      "Savings goal tracker",
      "Cancel anytime",
    ],
    highlighted: true,
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_MONTHLY,
  },
  {
    id: "annual",
    name: "Investor — Annual",
    price: "$490",
    cadence: "/year",
    blurb: "Two months free. For investors building a multi-property plan.",
    features: [
      "Everything in monthly",
      "Two months free",
      "Priority on new off-market briefs",
    ],
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ANNUAL,
  },
];
