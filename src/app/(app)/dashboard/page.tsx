"use client";

import { useState } from "react";
import { Questionnaire } from "@/components/Questionnaire";
import { SwipeDeck } from "@/components/SwipeDeck";
import { Logo } from "@/components/Logo";
import { buildShortlist } from "@/lib/analysis";
import { MOCK_LISTINGS } from "@/lib/mock-data";
import type { RankedListing, SearchCriteria } from "@/lib/types";

type Phase = "form" | "loading" | "results";

export default function DashboardPage() {
  const [phase, setPhase] = useState<Phase>("form");
  const [results, setResults] = useState<RankedListing[]>([]);

  function analyse(c: SearchCriteria) {
    setPhase("loading");
    // Simulated analysis pass — replace with a server call once intel is live.
    const shortlist = buildShortlist(MOCK_LISTINGS, c);
    setTimeout(() => {
      setResults(shortlist);
      setPhase("results");
    }, 1800);
  }

  if (phase === "loading") {
    return (
      <div className="grid min-h-[60vh] place-items-center text-center">
        <div>
          <div className="mx-auto w-fit animate-pulse motion-safe:[animation:spin_1.4s_linear_infinite]">
            <Logo size={56} wordmark={false} />
          </div>
          <p className="mt-6 font-serif text-xl text-cream">
            Analysing the market…
          </p>
          <p className="mt-1 text-sm text-muted">
            Scoring off-market properties against your criteria
          </p>
        </div>
      </div>
    );
  }

  if (phase === "results") {
    return (
      <div className="animate-fade-in">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h1 className="font-serif text-2xl text-cream">Your shortlist</h1>
            <p className="text-sm text-muted">
              Top {results.length} matches, ranked
            </p>
          </div>
          <button
            onClick={() => setPhase("form")}
            className="text-sm text-orange hover:text-orange-soft"
          >
            Edit search
          </button>
        </div>
        {results.length > 0 ? (
          <SwipeDeck items={results} />
        ) : (
          <div className="card-dexy p-8 text-center">
            <p className="font-serif text-xl text-cream">No strong matches</p>
            <p className="mt-2 text-sm text-muted">
              Nothing currently off-market fits these criteria closely. Widen
              your budget or suburbs and analyse again.
            </p>
            <button
              onClick={() => setPhase("form")}
              className="btn-primary mt-5"
            >
              Adjust search
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <Questionnaire onAnalyse={analyse} />
    </div>
  );
}
