"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import type { RankedListing } from "@/lib/types";
import { priceBracket } from "@/lib/mock-data";
import { RankBadge } from "./RankBadge";
import { clsx } from "@/lib/cx";

/**
 * Swipe through the ranked shortlist like Tinder. Drag (or use the buttons) to
 * move through cards. Tap a card to open the full property rundown.
 */
export function SwipeDeck({ items }: { items: RankedListing[] }) {
  const [index, setIndex] = useState(0);
  const [dx, setDx] = useState(0);
  const start = useRef<number | null>(null);

  const remaining = items.length - index;

  function onPointerDown(e: React.PointerEvent) {
    start.current = e.clientX;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }
  function onPointerMove(e: React.PointerEvent) {
    if (start.current === null) return;
    setDx(e.clientX - start.current);
  }
  function onPointerUp() {
    if (Math.abs(dx) > 90) advance();
    setDx(0);
    start.current = null;
  }
  function advance() {
    setIndex((i) => Math.min(i + 1, items.length));
    setDx(0);
  }

  if (remaining <= 0) {
    return (
      <div className="card-dexy mx-auto max-w-sm p-8 text-center">
        <p className="font-serif text-2xl text-cream">That&apos;s the shortlist</p>
        <p className="mt-2 text-sm text-muted">
          You&apos;ve been through all {items.length} matches. Re-run your search
          or browse the full feed.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <button onClick={() => setIndex(0)} className="btn-ghost">
            Start over
          </button>
          <Link href="/listings" className="btn-primary">
            Listings feed
          </Link>
        </div>
      </div>
    );
  }

  const top = items[index];
  const next = items[index + 1];
  const rot = dx / 18;

  return (
    <div className="mx-auto max-w-sm">
      <div className="relative h-[460px] select-none">
        {next && (
          <DeckCard item={next} className="scale-[0.95] opacity-60" />
        )}
        <DeckCard
          item={top}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          style={{
            transform: `translateX(${dx}px) rotate(${rot}deg)`,
            transition: start.current === null ? "transform 0.25s ease" : "none",
          }}
          interactive
          hint={dx > 40 ? "keep" : dx < -40 ? "pass" : undefined}
        />
      </div>

      <div className="mt-5 flex items-center justify-center gap-4">
        <button
          onClick={advance}
          aria-label="Pass"
          className="grid h-14 w-14 place-items-center rounded-full border border-border bg-forest-surface text-xl text-muted transition hover:border-maroon hover:text-orange-soft"
        >
          ✕
        </button>
        <Link
          href={`/listings/${top.listing.id}`}
          aria-label="View details"
          className="grid h-12 w-12 place-items-center rounded-full border border-border bg-forest-surface text-cream transition hover:bg-forest-raised"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </Link>
        <button
          onClick={advance}
          aria-label="Keep"
          className="grid h-14 w-14 place-items-center rounded-full bg-orange text-xl text-forest-deep transition hover:bg-orange-hover"
        >
          ♥
        </button>
      </div>
      <p className="mt-3 text-center text-xs text-muted">
        {remaining} of {items.length} · swipe or tap the eye for the full rundown
      </p>
    </div>
  );
}

function DeckCard({
  item,
  className,
  interactive,
  hint,
  ...rest
}: {
  item: RankedListing;
  className?: string;
  interactive?: boolean;
  hint?: "keep" | "pass";
} & React.HTMLAttributes<HTMLDivElement>) {
  const { listing, rank, score } = item;
  return (
    <div
      {...rest}
      className={clsx(
        "card-dexy absolute inset-0 overflow-hidden shadow-deck",
        interactive && "cursor-grab touch-none active:cursor-grabbing",
        className,
      )}
    >
      <div className="relative h-[64%] w-full bg-forest-raised">
        <Image
          src={listing.photos[0]}
          alt={`${listing.suburb} property`}
          fill
          sizes="384px"
          className="object-cover"
          priority={interactive}
        />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-forest-deep to-transparent" />
        <div className="absolute left-4 top-4">
          <RankBadge rank={rank} score={score} />
        </div>
        {hint && (
          <span
            className={clsx(
              "absolute top-4 right-4 rounded-lg border-2 px-3 py-1 text-sm font-bold uppercase tracking-wide",
              hint === "keep"
                ? "border-orange text-orange"
                : "border-maroon text-orange-soft",
            )}
          >
            {hint}
          </span>
        )}
      </div>
      <div className="p-5">
        <p className="font-serif text-2xl text-cream">
          {listing.suburb}, {listing.state}
        </p>
        <p className="mt-1 text-orange">
          {priceBracket(listing.priceLow, listing.priceHigh)}
        </p>
        <p className="mt-2 text-sm text-muted">
          {listing.beds} bed · {listing.baths} bath · {listing.cars} car
          {listing.landSize ? ` · ${listing.landSize}m²` : ""}
        </p>
      </div>
    </div>
  );
}
