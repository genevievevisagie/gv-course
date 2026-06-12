// Shared domain types for the Dexy MVP.

export type PropertyType = "house" | "apartment" | "townhouse" | "land";
export type RenoLevel = "none" | "cosmetic" | "structural";
export type Rank = "excellent" | "good" | "lots-of-work";

export interface Listing {
  id: string;
  /** Public teaser fields — safe to show before subscription */
  suburb: string;
  state: string;
  priceLow: number;
  priceHigh: number;
  photos: string[];
  /** Gated intel — only for subscribers */
  address: string;
  type: PropertyType;
  beds: number;
  baths: number;
  cars: number;
  landSize: number; // m²
  status: "off-market" | "pre-market";
  renoNeeded: RenoLevel;
  /** Estimated annualised capital growth for the area, % */
  capitalGrowth: number;
  /** Gross rental yield, % */
  rentalYield: number;
  founderNote: string;
  intel: string;
}

/** The saved questionnaire — "what they're looking for in a property" */
export interface SearchCriteria {
  state: string;
  suburbs: string; // free text, comma separated
  budgetMax: number;
  propertyTypes: PropertyType[];
  minBeds: number;
  renoAppetite: RenoLevel;
  /** What the investor optimises for */
  priority: "capital-growth" | "rental-yield" | "balanced";
}

/** A single graded factor shown in the pros/cons analysis */
export interface AnalysisFactor {
  label: string;
  verdict: "pro" | "con" | "neutral";
  detail: string;
}

export interface RankedListing {
  listing: Listing;
  score: number; // 0–100
  rank: Rank;
  factors: AnalysisFactor[];
}
