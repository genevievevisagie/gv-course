import Link from "next/link";
import { Splash } from "@/components/Splash";
import { Logo } from "@/components/Logo";
import { TeaserCard } from "@/components/TeaserCard";
import { MOCK_LISTINGS } from "@/lib/mock-data";
import { PLANS } from "@/lib/stripe";

export default function LandingPage() {
  return (
    <main className="relative">
      <Splash />

      {/* Top bar */}
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-5">
        <Logo size={28} />
        <div className="flex items-center gap-3">
          <Link href="/login" className="text-sm text-muted hover:text-cream">
            Log in
          </Link>
          <Link href="/signup" className="btn-primary px-4 py-2 text-sm">
            Get started
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-3xl px-5 pb-12 pt-8 text-center">
        <p className="text-sm font-medium uppercase tracking-[0.25em] text-orange">
          Off-market property intelligence
        </p>
        <h1 className="mt-4 font-serif text-4xl leading-tight text-cream sm:text-5xl">
          Investing with a plan
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-balance text-muted">
          Tell Dexy what you&apos;re looking for. Get a ranked shortlist of
          pre-market and off-market properties — with the intel and the
          reasoning behind every score.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/signup" className="btn-primary w-full sm:w-auto">
            Start your search
          </Link>
          <Link href="/listings" className="btn-ghost w-full sm:w-auto">
            Preview the feed
          </Link>
        </div>

        {/* Social proof */}
        <div className="mt-12 grid grid-cols-3 gap-4 text-center">
          {[
            ["1,200+", "investors planning"],
            ["$0", "in buyer's agent fees"],
            ["20", "ranked matches / search"],
          ].map(([n, l]) => (
            <div key={l} className="card-dexy px-3 py-4">
              <p className="font-serif text-2xl text-orange">{n}</p>
              <p className="mt-1 text-xs text-muted">{l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Teaser strip — photo, suburb, price bracket only */}
      <section className="py-6">
        <div className="mx-auto max-w-5xl px-5">
          <div className="flex items-end justify-between">
            <h2 className="font-serif text-2xl text-cream">
              Currently off-market
            </h2>
            <span className="text-xs text-muted">Addresses hidden</span>
          </div>
        </div>
        <div className="no-scrollbar mt-5 flex gap-4 overflow-x-auto px-5 pb-2">
          {MOCK_LISTINGS.slice(0, 6).map((l) => (
            <TeaserCard key={l.id} listing={l} />
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="mx-auto max-w-3xl px-5 py-14">
        <h2 className="text-center font-serif text-3xl text-cream">
          One subscription. Every off-market deal.
        </h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`card-dexy relative p-6 ${
                plan.highlighted ? "ring-1 ring-orange/40" : ""
              }`}
            >
              {plan.highlighted && (
                <span className="absolute -top-3 left-6 rounded-full bg-orange px-3 py-1 text-xs font-semibold text-forest-deep">
                  Most popular
                </span>
              )}
              <p className="font-serif text-xl text-cream">{plan.name}</p>
              <p className="mt-2">
                <span className="font-serif text-4xl text-cream">
                  {plan.price}
                </span>
                <span className="text-muted">{plan.cadence}</span>
              </p>
              <p className="mt-2 text-sm text-muted">{plan.blurb}</p>
              <ul className="mt-5 space-y-2 text-sm">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-cream/90">
                    <span className="mt-0.5 text-orange">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/signup" className="btn-primary mt-6 w-full">
                Choose {plan.name.split(" ")[0]}
              </Link>
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-muted">
          All listing intel sits behind an active subscription. Cancel anytime
          from your account.
        </p>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-5 py-8 sm:flex-row">
          <Logo size={22} />
          <p className="text-xs text-muted">
            By continuing you agree to our{" "}
            <Link href="/legal/terms" className="link-orange">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/legal/privacy" className="link-orange">
              Privacy Policy
            </Link>
            .
          </p>
          <p className="text-xs text-muted/60">
            © {new Date().getFullYear()} Dexy
          </p>
        </div>
      </footer>
    </main>
  );
}
