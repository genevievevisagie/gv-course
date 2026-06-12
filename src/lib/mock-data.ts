import type { Listing, SearchCriteria } from "./types";

// Placeholder imagery (Unsplash) until the founder uploads real listing photos
// via the admin panel. Swapped for Supabase storage URLs once wired up.
const img = (id: string, sig: number) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=70&sig=${sig}`;

export const MOCK_LISTINGS: Listing[] = [
  {
    id: "dexy-001",
    suburb: "Coorparoo",
    state: "QLD",
    priceLow: 850000,
    priceHigh: 950000,
    photos: [img("1568605114967-8130f3a36994", 1), img("1572120360610-d971b9d7767c", 2)],
    address: "14 Kirkland Ave, Coorparoo QLD 4151",
    type: "house",
    beds: 3,
    baths: 1,
    cars: 2,
    landSize: 607,
    status: "off-market",
    renoNeeded: "cosmetic",
    capitalGrowth: 6.8,
    rentalYield: 3.9,
    founderNote:
      "Tightly held pocket, walk to Coorparoo Square. Owner relocating — open to a pre-market deal before it lists.",
    intel:
      "Post-war timber on a 607m² block zoned for a future duplex. Kitchen and bathroom are original but structurally sound. Comparable renos in the street have resold 18% above purchase within 12 months.",
  },
  {
    id: "dexy-002",
    suburb: "Thornbury",
    state: "VIC",
    priceLow: 1100000,
    priceHigh: 1250000,
    photos: [img("1570129477492-45c003edd2be", 3), img("1576941089067-2de3c901e126", 4)],
    address: "8 Hutton St, Thornbury VIC 3071",
    type: "house",
    beds: 4,
    baths: 2,
    cars: 1,
    landSize: 418,
    status: "pre-market",
    renoNeeded: "none",
    capitalGrowth: 5.4,
    rentalYield: 3.1,
    founderNote: "Renovated California bungalow, nothing to spend. Premium street, deep buyer pool.",
    intel:
      "Fully renovated four-bedroom with a north-facing rear. Move-in ready. Lower yield but strong, stable capital growth corridor along the 86 tram.",
  },
  {
    id: "dexy-003",
    suburb: "Elizabeth",
    state: "SA",
    priceLow: 420000,
    priceHigh: 470000,
    photos: [img("1512917774080-9991f1c4c750", 5), img("1605276374104-dee2a0ed3cd6", 6)],
    address: "22 Goyder Ave, Elizabeth SA 5112",
    type: "house",
    beds: 3,
    baths: 1,
    cars: 1,
    landSize: 720,
    status: "off-market",
    renoNeeded: "structural",
    capitalGrowth: 8.2,
    rentalYield: 6.1,
    founderNote:
      "High-yield play. Needs restumping and a rewire but the numbers stack for a cash-flow investor.",
    intel:
      "720m² corner block in a gentrifying growth suburb. Requires structural work (restumping, electrical). Strong rental demand — currently leased at 6.1% gross yield.",
  },
  {
    id: "dexy-004",
    suburb: "New Farm",
    state: "QLD",
    priceLow: 680000,
    priceHigh: 740000,
    photos: [img("1502672260266-1c1ef2d93688", 7), img("1493809842364-78817add7ffb", 8)],
    address: "5/19 Browne St, New Farm QLD 4005",
    type: "apartment",
    beds: 2,
    baths: 2,
    cars: 1,
    landSize: 0,
    status: "pre-market",
    renoNeeded: "cosmetic",
    capitalGrowth: 5.9,
    rentalYield: 4.6,
    founderNote: "Boutique block of 6, no lifts/pools = low body corp. Walk to the river and Mertons.",
    intel:
      "Two-bed, two-bath in a small 1980s block. Cosmetic update (paint, kitchen benchtops) would lift rent ~15%. Low strata, blue-chip riverside suburb.",
  },
  {
    id: "dexy-005",
    suburb: "Frankston",
    state: "VIC",
    priceLow: 640000,
    priceHigh: 700000,
    photos: [img("1564013799919-ab600027ffc6", 9), img("1554995207-c18c203602cb", 10)],
    address: "31 Olympic Ave, Frankston VIC 3199",
    type: "townhouse",
    beds: 3,
    baths: 2,
    cars: 2,
    landSize: 210,
    status: "off-market",
    renoNeeded: "none",
    capitalGrowth: 6.2,
    rentalYield: 4.2,
    founderNote: "Near-new townhouse, depreciation benefits intact. Bayside infrastructure spend underway.",
    intel:
      "Three-bed townhouse built 2021. Full depreciation schedule available. Balanced growth/yield profile in a suburb benefiting from the rail extension.",
  },
  {
    id: "dexy-006",
    suburb: "Logan Central",
    state: "QLD",
    priceLow: 510000,
    priceHigh: 560000,
    photos: [img("1605146769289-440113cc3d00", 11), img("1583608205776-bfd35f0d9f83", 12)],
    address: "47 Wembley Rd, Logan Central QLD 4114",
    type: "house",
    beds: 4,
    baths: 2,
    cars: 2,
    landSize: 645,
    status: "pre-market",
    renoNeeded: "cosmetic",
    capitalGrowth: 7.5,
    rentalYield: 5.4,
    founderNote: "Granny-flat potential on a 645m² block. Dual-income upside for the right buyer.",
    intel:
      "Brick-and-tile four-bedroom with side access and room for a secondary dwelling. Cosmetic refresh only. Strong yield now with a clear value-add path.",
  },
];

export const DEFAULT_CRITERIA: SearchCriteria = {
  state: "QLD",
  suburbs: "",
  budgetMax: 900000,
  propertyTypes: ["house", "townhouse"],
  minBeds: 3,
  renoAppetite: "cosmetic",
  priority: "balanced",
};

export function getListing(id: string): Listing | undefined {
  return MOCK_LISTINGS.find((l) => l.id === id);
}

export function priceBracket(low: number, high: number): string {
  const fmt = (n: number) =>
    n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(2)}M` : `$${Math.round(n / 1000)}k`;
  return `${fmt(low)} – ${fmt(high)}`;
}
