import { MOCK_LISTINGS } from "@/lib/mock-data";
import { ListingDetailClient } from "./ListingDetailClient";

// Pre-render every listing to static HTML for `output: export`.
export function generateStaticParams() {
  return MOCK_LISTINGS.map((l) => ({ id: l.id }));
}

export default function ListingDetailPage() {
  return <ListingDetailClient />;
}
