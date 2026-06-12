import Image from "next/image";
import type { Listing } from "@/lib/types";
import { priceBracket } from "@/lib/mock-data";

/**
 * Public teaser card for the landing page. Shows ONLY photo, suburb and price
 * bracket — never the address or intel. That content is gated behind an active
 * subscription.
 */
export function TeaserCard({ listing }: { listing: Listing }) {
  return (
    <div className="card-dexy w-64 shrink-0 overflow-hidden">
      <div className="relative h-40 w-full bg-forest-raised">
        <Image
          src={listing.photos[0]}
          alt={`Off-market property in ${listing.suburb}`}
          fill
          sizes="256px"
          className="object-cover"
        />
        <span className="absolute left-3 top-3 rounded-full bg-forest-deep/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-orange backdrop-blur">
          {listing.status}
        </span>
      </div>
      <div className="p-4">
        <p className="font-serif text-lg text-cream">
          {listing.suburb}, {listing.state}
        </p>
        <p className="mt-1 text-sm text-muted">
          {priceBracket(listing.priceLow, listing.priceHigh)}
        </p>
        <p className="mt-3 text-xs text-muted/70">
          Address &amp; full intel unlock with a subscription
        </p>
      </div>
    </div>
  );
}
