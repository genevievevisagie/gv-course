# Dexy — _Investing with a plan_

Mobile-first web app for off-market property investing. Tell Dexy what you're
looking for and get a ranked, swipeable shortlist of pre-market and off-market
properties — with the intel and the reasoning behind every score.

This is the **MVP scaffold**: every page from the product spec is built and
navigable with mock data and a stubbed auth session. Supabase (auth + data) and
Stripe (subscriptions) are wired in as env-guarded stubs ready to switch on.

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** with a custom Dexy design system
- **Supabase** (`@supabase/ssr`) — auth + database _(stub until env is set)_
- **Stripe** — subscriptions _(stub until env is set)_
- Fonts: **Fraunces** (serif display) + **Inter** (body)

## Brand

Sampled from the sign-in mock:

| Token            | Hex       | Use                    |
| ---------------- | --------- | ---------------------- |
| `forest`         | `#192A1F` | App background         |
| `forest.deep`    | `#132018` | Gradient base / inputs |
| `forest.surface` | `#16241B` | Cards                  |
| `border`         | `#2C4233` | Hairlines              |
| `orange`         | `#F08C4F` | Primary CTA / accents  |
| `maroon`         | `#9F2A2C` | Logo badge             |
| `cream`          | `#F5F1E8` | Primary text           |
| `muted`          | `#9DB0A2` | Secondary text         |

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

The app runs out of the box in **demo mode**: any email signs you in (use one
starting with `admin` for the founder/admin view), and listings come from
`src/lib/mock-data.ts`.

## Pages

**Public**

- `/` — Landing: splash animation, value prop, social proof, pricing, teaser
  strip (photo + suburb + price bracket only)
- `/login`, `/signup` — Email/password + social buttons (matches the brand mock)
- `/legal/terms`, `/legal/privacy` — placeholder legal copy

**Subscriber area** (behind the auth gate, shared header + menu)

- `/dashboard` — Saveable property questionnaire → **Analyse** (spinning logo) →
  Tinder-style swipe deck of the top 20 ranked matches
- `/listings` — Off-market feed with suburb / type / price filters
- `/listings/[id]` — Full rundown (realestate.com-style) + transparent pros/cons
  analysis against your criteria + enquiry button + roadmap widgets
- `/savings` — Deposit-goal tracker with a progress ring and manual updates
- `/account` — Profile, subscription (Stripe portal), notification preferences

**Founder**

- `/admin` — Listings CRUD (create / edit / publish / delete)

## The analysis engine

`src/lib/analysis.ts` is a transparent, rule-based scorer. It ranks each listing
0–100 (`excellent` / `good` / `lots of work`) and emits every factor as a
pro/con so the investor can see the decision-making — not just the score. Swap
the internals for a richer model later without touching the UI.

## Going to production — next steps

1. **Supabase** — create a project, set `NEXT_PUBLIC_SUPABASE_URL` /
   `NEXT_PUBLIC_SUPABASE_ANON_KEY`. The clients in `src/lib/supabase/` activate
   automatically. Replace the stub in `src/lib/auth.ts` with
   `signInWithPassword` / `signUp`, and move listings into a `listings` table.
2. **Stripe** — create products + prices, set the keys in `.env.local`, and add
   `/api/checkout` + `/api/portal` + webhook route handlers (`src/lib/stripe.ts`
   is ready).
3. **Gating** — add middleware to enforce the auth cookie + active subscription
   on the subscriber routes.
4. **Email** — transactional email for sign-up confirmation, password reset, and
   notifications.
5. **Real listings** — upload photos + intel through the admin panel.

Copy `.env.example` → `.env.local` and fill in as you go. Everything runs
without these (demo mode) until then.

## Out of scope for MVP

Native apps, saved-search alerts, multi-region, map view, the renovation-preview
(Propfile) and recommended-trades widgets (shown as roadmap placeholders).
