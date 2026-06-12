import type {
  AnalysisFactor,
  Listing,
  Rank,
  RankedListing,
  RenoLevel,
  SearchCriteria,
} from "./types";

const RENO_ORDER: Record<RenoLevel, number> = {
  none: 0,
  cosmetic: 1,
  structural: 2,
};

/**
 * Transparent scoring engine. The product ranks automatically, but every
 * factor is surfaced so the investor can see the decision-making (pros/cons).
 * This is intentionally simple/rule-based for the MVP — it can be swapped for
 * a richer model later without changing the UI contract.
 */
export function analyseListing(
  listing: Listing,
  c: SearchCriteria,
): RankedListing {
  const factors: AnalysisFactor[] = [];
  let score = 50;

  // --- Budget ---
  if (listing.priceLow <= c.budgetMax) {
    const headroom = (c.budgetMax - listing.priceLow) / c.budgetMax;
    score += 12;
    factors.push({
      label: "Within budget",
      verdict: "pro",
      detail:
        headroom > 0.2
          ? `Comfortably under your ${money(c.budgetMax)} ceiling, leaving room for buying costs.`
          : `Sits just inside your ${money(c.budgetMax)} budget.`,
    });
  } else {
    score -= 18;
    factors.push({
      label: "Over budget",
      verdict: "con",
      detail: `Entry price is above your ${money(c.budgetMax)} ceiling.`,
    });
  }

  // --- Property type ---
  if (c.propertyTypes.includes(listing.type)) {
    score += 8;
    factors.push({
      label: `${cap(listing.type)} — matches your type`,
      verdict: "pro",
      detail: `You're looking for ${c.propertyTypes.join(", ")}.`,
    });
  } else {
    score -= 6;
    factors.push({
      label: `${cap(listing.type)} — outside your selected types`,
      verdict: "con",
      detail: `You asked for ${c.propertyTypes.join(", ")}.`,
    });
  }

  // --- Bedrooms ---
  if (listing.beds >= c.minBeds) {
    score += 6;
    factors.push({
      label: `${listing.beds} bedrooms`,
      verdict: "pro",
      detail: `Meets your minimum of ${c.minBeds}.`,
    });
  } else {
    score -= 8;
    factors.push({
      label: `Only ${listing.beds} bedrooms`,
      verdict: "con",
      detail: `Below your minimum of ${c.minBeds}.`,
    });
  }

  // --- Renovation appetite ---
  const need = RENO_ORDER[listing.renoNeeded];
  const appetite = RENO_ORDER[c.renoAppetite];
  if (need <= appetite) {
    score += 10;
    factors.push({
      label: renoLabel(listing.renoNeeded),
      verdict: "pro",
      detail:
        need === appetite
          ? "Matches the level of work you're prepared to take on."
          : "Needs less work than you're willing to do.",
    });
  } else {
    score -= 16;
    factors.push({
      label: renoLabel(listing.renoNeeded),
      verdict: "con",
      detail: `You preferred ${c.renoAppetite === "none" ? "nothing to do" : c.renoAppetite + " work"} — this needs more.`,
    });
  }

  // --- Growth vs yield, weighted by the investor's priority ---
  const growthGood = listing.capitalGrowth >= 6;
  const yieldGood = listing.rentalYield >= 4.5;
  const wGrowth = c.priority === "capital-growth" ? 14 : c.priority === "balanced" ? 8 : 4;
  const wYield = c.priority === "rental-yield" ? 14 : c.priority === "balanced" ? 8 : 4;

  score += growthGood ? wGrowth : -wGrowth / 2;
  factors.push({
    label: `${listing.capitalGrowth}% capital growth (area)`,
    verdict: growthGood ? "pro" : "neutral",
    detail: growthGood
      ? "Strong long-term growth corridor."
      : "Modest growth — better suited to a yield-focused plan.",
  });

  score += yieldGood ? wYield : -wYield / 2;
  factors.push({
    label: `${listing.rentalYield}% gross rental yield`,
    verdict: yieldGood ? "pro" : "neutral",
    detail: yieldGood
      ? "Healthy cash flow to help hold the asset."
      : "Lower yield — leans on capital growth to perform.",
  });

  score = Math.max(0, Math.min(100, Math.round(score)));
  return { listing, score, rank: rankFor(score), factors };
}

export function rankFor(score: number): Rank {
  if (score >= 75) return "excellent";
  if (score >= 55) return "good";
  return "lots-of-work";
}

export const RANK_META: Record<
  Rank,
  { label: string; className: string; dot: string }
> = {
  excellent: {
    label: "Excellent",
    className: "bg-orange/15 text-orange border-orange/30",
    dot: "bg-orange",
  },
  good: {
    label: "Good",
    className: "bg-emerald-400/10 text-emerald-300 border-emerald-400/30",
    dot: "bg-emerald-400",
  },
  "lots-of-work": {
    label: "Lots of work",
    className: "bg-maroon/20 text-orange-soft border-maroon/40",
    dot: "bg-maroon",
  },
};

/** Rank every listing, drop the clearly-unsuitable, cap at 20. */
export function buildShortlist(
  listings: Listing[],
  c: SearchCriteria,
): RankedListing[] {
  return listings
    .map((l) => analyseListing(l, c))
    .filter((r) => r.score >= 35)
    .sort((a, b) => b.score - a.score)
    .slice(0, 20);
}

function money(n: number) {
  return n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(1)}M` : `$${Math.round(n / 1000)}k`;
}
function cap(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
function renoLabel(level: RenoLevel) {
  return level === "none"
    ? "Nothing to do — move-in ready"
    : level === "cosmetic"
      ? "Cosmetic renovation"
      : "Structural renovation required";
}
