"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getListing, priceBracket, DEFAULT_CRITERIA } from "@/lib/mock-data";
import { analyseListing } from "@/lib/analysis";
import { RankBadge } from "@/components/RankBadge";
import type { RankedListing, SearchCriteria } from "@/lib/types";
import { clsx } from "@/lib/cx";

export default function ListingDetailPage() {
  const { id } = useParams<{ id: string }>();
  const listing = getListing(id);
  const [analysis, setAnalysis] = useState<RankedListing | null>(null);
  const [photo, setPhoto] = useState(0);

  useEffect(() => {
    if (!listing) return;
    let criteria: SearchCriteria = DEFAULT_CRITERIA;
    try {
      const raw = localStorage.getItem("dexy_criteria");
      if (raw) criteria = JSON.parse(raw);
    } catch {}
    setAnalysis(analyseListing(listing, criteria));
  }, [listing]);

  if (!listing) {
    return (
      <div className="py-20 text-center">
        <p className="font-serif text-2xl text-cream">Listing not found</p>
        <Link href="/listings" className="link-orange mt-3 inline-block">
          Back to feed
        </Link>
      </div>
    );
  }

  const pros = analysis?.factors.filter((f) => f.verdict === "pro") ?? [];
  const cons = analysis?.factors.filter((f) => f.verdict !== "pro") ?? [];

  return (
    <div className="animate-fade-in pb-10">
      <Link
        href="/listings"
        className="mb-4 inline-block text-sm text-muted hover:text-cream"
      >
        ← Back to feed
      </Link>

      {/* Gallery */}
      <div className="card-dexy overflow-hidden">
        <div className="relative h-64 w-full bg-forest-raised sm:h-80">
          <Image
            src={listing.photos[photo]}
            alt={`${listing.suburb} property photo ${photo + 1}`}
            fill
            sizes="(max-width: 640px) 100vw, 672px"
            className="object-cover"
            priority
          />
          {analysis && (
            <div className="absolute left-4 top-4">
              <RankBadge rank={analysis.rank} score={analysis.score} />
            </div>
          )}
        </div>
        {listing.photos.length > 1 && (
          <div className="flex gap-2 p-3">
            {listing.photos.map((p, i) => (
              <button
                key={p}
                onClick={() => setPhoto(i)}
                className={clsx(
                  "relative h-14 w-20 overflow-hidden rounded-lg border",
                  i === photo ? "border-orange" : "border-border",
                )}
              >
                <Image src={p} alt="" fill sizes="80px" className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Headline facts */}
      <div className="mt-5">
        <p className="font-serif text-3xl text-cream">
          {priceBracket(listing.priceLow, listing.priceHigh)}
        </p>
        <p className="mt-1 text-lg text-cream">{listing.address}</p>
        <p className="text-sm text-muted">
          {listing.suburb}, {listing.state} · {listing.status}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Fact n={listing.beds} l="Beds" />
          <Fact n={listing.baths} l="Baths" />
          <Fact n={listing.cars} l="Cars" />
          {listing.landSize > 0 && <Fact n={`${listing.landSize}m²`} l="Land" />}
          <Fact n={`${listing.capitalGrowth}%`} l="Growth" />
          <Fact n={`${listing.rentalYield}%`} l="Yield" />
        </div>
      </div>

      {/* Property intel */}
      <Section title="Property intel">
        <p className="text-sm leading-relaxed text-muted">{listing.intel}</p>
      </Section>

      {/* Founder commentary */}
      <Section title="Founder commentary">
        <div className="rounded-xl border border-border bg-forest-deep/40 p-4">
          <p className="text-sm italic leading-relaxed text-cream/90">
            “{listing.founderNote}”
          </p>
        </div>
      </Section>

      {/* Analysis — the transparent decision-making */}
      <Section title="How this scores against your plan">
        {analysis && (
          <>
            <div className="mb-4 flex items-center gap-3">
              <RankBadge rank={analysis.rank} />
              <span className="text-sm text-muted">
                Match score {analysis.score}/100
              </span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <FactorList
                title="What works"
                tone="pro"
                factors={pros}
              />
              <FactorList
                title="Watch-outs"
                tone="con"
                factors={cons}
              />
            </div>
            <p className="mt-4 text-xs text-muted/70">
              Dexy ranks automatically — this breakdown shows the reasoning so
              you can make the call yourself.
            </p>
          </>
        )}
      </Section>

      {/* Enquiry */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <a
          href={`mailto:hello@dexyapp.ai?subject=Enquiry: ${encodeURIComponent(listing.address)}`}
          className="btn-primary flex-1"
        >
          Enquire about this property
        </a>
        <Link href="/savings" className="btn-ghost">
          Check my deposit
        </Link>
      </div>

      {/* Later-date widgets — visible as roadmap placeholders */}
      <Section title="Coming soon">
        <div className="grid gap-3 sm:grid-cols-2">
          <Placeholder
            title="Renovation preview"
            body="See what this property could look like after a cosmetic or structural reno (Propfile)."
          />
          <Placeholder
            title="Recommended trades"
            body="Vetted builders, trades and products for this project."
          />
        </div>
      </Section>
    </div>
  );
}

function Fact({ n, l }: { n: React.ReactNode; l: string }) {
  return (
    <div className="rounded-xl border border-border bg-forest-surface px-3 py-2 text-center">
      <p className="font-serif text-lg text-cream">{n}</p>
      <p className="text-[11px] uppercase tracking-wide text-muted">{l}</p>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-7">
      <h2 className="mb-3 font-serif text-xl text-cream">{title}</h2>
      {children}
    </section>
  );
}

function FactorList({
  title,
  tone,
  factors,
}: {
  title: string;
  tone: "pro" | "con";
  factors: { label: string; detail: string }[];
}) {
  return (
    <div className="card-dexy p-4">
      <p
        className={clsx(
          "mb-3 text-sm font-semibold",
          tone === "pro" ? "text-orange" : "text-orange-soft",
        )}
      >
        {title}
      </p>
      <ul className="space-y-3">
        {factors.map((f) => (
          <li key={f.label} className="flex items-start gap-2">
            <span className={tone === "pro" ? "text-orange" : "text-maroon"}>
              {tone === "pro" ? "✓" : "!"}
            </span>
            <div>
              <p className="text-sm text-cream">{f.label}</p>
              <p className="text-xs text-muted">{f.detail}</p>
            </div>
          </li>
        ))}
        {factors.length === 0 && (
          <li className="text-xs text-muted">Nothing flagged.</li>
        )}
      </ul>
    </div>
  );
}

function Placeholder({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl border border-dashed border-border bg-forest-deep/30 p-4">
      <p className="text-sm font-medium text-cream">{title}</p>
      <p className="mt-1 text-xs text-muted">{body}</p>
      <span className="mt-2 inline-block rounded-full bg-forest-raised px-2 py-0.5 text-[10px] uppercase tracking-wide text-muted">
        Roadmap
      </span>
    </div>
  );
}
