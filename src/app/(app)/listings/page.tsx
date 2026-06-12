"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { MOCK_LISTINGS, priceBracket } from "@/lib/mock-data";
import type { PropertyType } from "@/lib/types";
import { clsx } from "@/lib/cx";

const TYPE_FILTERS: { value: PropertyType | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "house", label: "Houses" },
  { value: "townhouse", label: "Townhouses" },
  { value: "apartment", label: "Apartments" },
];

export default function ListingsPage() {
  const [suburb, setSuburb] = useState("");
  const [type, setType] = useState<PropertyType | "all">("all");
  const [maxPrice, setMaxPrice] = useState(2000000);

  const filtered = useMemo(
    () =>
      MOCK_LISTINGS.filter(
        (l) =>
          (type === "all" || l.type === type) &&
          l.priceLow <= maxPrice &&
          (suburb.trim() === "" ||
            l.suburb.toLowerCase().includes(suburb.trim().toLowerCase())),
      ),
    [suburb, type, maxPrice],
  );

  return (
    <div className="animate-fade-in">
      <h1 className="font-serif text-2xl text-cream">Off-market feed</h1>
      <p className="text-sm text-muted">
        Browse every pre-market and off-market property — no analysis, just
        scrolling.
      </p>

      {/* Filters */}
      <div className="card-dexy mt-5 space-y-4 p-4">
        <input
          className="input-dexy"
          placeholder="Filter by suburb…"
          value={suburb}
          onChange={(e) => setSuburb(e.target.value)}
        />
        <div className="flex flex-wrap gap-2">
          {TYPE_FILTERS.map((t) => (
            <button
              key={t.value}
              onClick={() => setType(t.value)}
              className={clsx(
                "rounded-full border px-3 py-1.5 text-sm transition",
                type === t.value
                  ? "border-orange bg-orange/15 text-orange"
                  : "border-border text-muted hover:text-cream",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div>
          <p className="mb-1.5 text-sm text-muted">
            Max price — ${maxPrice.toLocaleString()}
          </p>
          <input
            type="range"
            min={400000}
            max={2000000}
            step={50000}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full accent-orange"
          />
        </div>
      </div>

      {/* Results */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {filtered.map((l) => (
          <Link
            key={l.id}
            href={`/listings/${l.id}`}
            className="card-dexy group overflow-hidden transition hover:border-orange/40"
          >
            <div className="relative h-44 w-full bg-forest-raised">
              <Image
                src={l.photos[0]}
                alt={`${l.suburb} property`}
                fill
                sizes="(max-width: 640px) 100vw, 320px"
                className="object-cover transition group-hover:scale-[1.03]"
              />
              <span className="absolute left-3 top-3 rounded-full bg-forest-deep/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-orange backdrop-blur">
                {l.status}
              </span>
            </div>
            <div className="p-4">
              <p className="font-serif text-lg text-cream">
                {l.suburb}, {l.state}
              </p>
              <p className="text-sm text-orange">
                {priceBracket(l.priceLow, l.priceHigh)}
              </p>
              <p className="mt-2 text-sm text-muted">
                {l.beds} bed · {l.baths} bath · {l.cars} car
                {l.landSize ? ` · ${l.landSize}m²` : ""}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-10 text-center text-sm text-muted">
          No properties match these filters.
        </p>
      )}
    </div>
  );
}
