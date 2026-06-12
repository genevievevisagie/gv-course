"use client";

import { useEffect, useState } from "react";
import type { PropertyType, RenoLevel, SearchCriteria } from "@/lib/types";
import { DEFAULT_CRITERIA } from "@/lib/mock-data";
import { clsx } from "@/lib/cx";

const STATES = ["QLD", "VIC", "NSW", "SA", "WA", "TAS", "ACT", "NT"];
const TYPES: { value: PropertyType; label: string }[] = [
  { value: "house", label: "House" },
  { value: "townhouse", label: "Townhouse" },
  { value: "apartment", label: "Apartment" },
  { value: "land", label: "Land" },
];
const RENO: { value: RenoLevel; label: string }[] = [
  { value: "none", label: "Move-in ready" },
  { value: "cosmetic", label: "Cosmetic" },
  { value: "structural", label: "Structural" },
];
const PRIORITY: { value: SearchCriteria["priority"]; label: string }[] = [
  { value: "capital-growth", label: "Capital growth" },
  { value: "balanced", label: "Balanced" },
  { value: "rental-yield", label: "Rental yield" },
];

const STORAGE_KEY = "dexy_criteria";

/** Saveable property questionnaire that feeds the analysis engine. */
export function Questionnaire({
  onAnalyse,
}: {
  onAnalyse: (c: SearchCriteria) => void;
}) {
  const [c, setC] = useState<SearchCriteria>(DEFAULT_CRITERIA);
  const [saved, setSaved] = useState(false);

  // Load any previously saved search.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setC(JSON.parse(raw));
    } catch {}
  }, []);

  function update<K extends keyof SearchCriteria>(k: K, v: SearchCriteria[K]) {
    setC((prev) => ({ ...prev, [k]: v }));
    setSaved(false);
  }
  function toggleType(t: PropertyType) {
    update(
      "propertyTypes",
      c.propertyTypes.includes(t)
        ? c.propertyTypes.filter((x) => x !== t)
        : [...c.propertyTypes, t],
    );
  }
  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(c));
    setSaved(true);
  }

  return (
    <div className="card-dexy p-5 sm:p-6">
      <h2 className="font-serif text-2xl text-cream">
        What are you looking for?
      </h2>
      <p className="mt-1 text-sm text-muted">
        Set your criteria and Dexy ranks every off-market property against it.
      </p>

      <div className="mt-6 space-y-6">
        {/* State */}
        <Field label="State">
          <div className="flex flex-wrap gap-2">
            {STATES.map((s) => (
              <Chip
                key={s}
                active={c.state === s}
                onClick={() => update("state", s)}
              >
                {s}
              </Chip>
            ))}
          </div>
        </Field>

        {/* Suburbs */}
        <Field label="Preferred suburbs (optional)">
          <input
            className="input-dexy"
            placeholder="e.g. Coorparoo, New Farm, Thornbury"
            value={c.suburbs}
            onChange={(e) => update("suburbs", e.target.value)}
          />
        </Field>

        {/* Budget */}
        <Field label={`Max budget — $${c.budgetMax.toLocaleString()}`}>
          <input
            type="range"
            min={300000}
            max={2000000}
            step={25000}
            value={c.budgetMax}
            onChange={(e) => update("budgetMax", Number(e.target.value))}
            className="w-full accent-orange"
          />
        </Field>

        {/* Property types */}
        <Field label="Property type">
          <div className="flex flex-wrap gap-2">
            {TYPES.map((t) => (
              <Chip
                key={t.value}
                active={c.propertyTypes.includes(t.value)}
                onClick={() => toggleType(t.value)}
              >
                {t.label}
              </Chip>
            ))}
          </div>
        </Field>

        {/* Min beds */}
        <Field label="Minimum bedrooms">
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((n) => (
              <Chip
                key={n}
                active={c.minBeds === n}
                onClick={() => update("minBeds", n)}
              >
                {n}+
              </Chip>
            ))}
          </div>
        </Field>

        {/* Reno appetite */}
        <Field label="Renovation appetite">
          <div className="flex flex-wrap gap-2">
            {RENO.map((r) => (
              <Chip
                key={r.value}
                active={c.renoAppetite === r.value}
                onClick={() => update("renoAppetite", r.value)}
              >
                {r.label}
              </Chip>
            ))}
          </div>
        </Field>

        {/* Priority */}
        <Field label="Optimise for">
          <div className="flex flex-wrap gap-2">
            {PRIORITY.map((p) => (
              <Chip
                key={p.value}
                active={c.priority === p.value}
                onClick={() => update("priority", p.value)}
              >
                {p.label}
              </Chip>
            ))}
          </div>
        </Field>
      </div>

      <div className="mt-7 flex items-center gap-3">
        <button onClick={() => onAnalyse(c)} className="btn-primary flex-1">
          Analyse
        </button>
        <button onClick={save} className="btn-ghost">
          {saved ? "Saved ✓" : "Save search"}
        </button>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="mb-2 text-sm font-medium text-cream">{label}</p>
      {children}
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "rounded-full border px-4 py-2 text-sm transition",
        active
          ? "border-orange bg-orange/15 text-orange"
          : "border-border bg-forest-deep/50 text-muted hover:border-muted/50 hover:text-cream",
      )}
    >
      {children}
    </button>
  );
}
