"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/Logo";
import { MOCK_LISTINGS, priceBracket } from "@/lib/mock-data";
import { getUser, isAuthed } from "@/lib/auth";
import type { Listing } from "@/lib/types";

type Row = Pick<
  Listing,
  "id" | "suburb" | "state" | "priceLow" | "priceHigh" | "status" | "type"
> & { published: boolean };

const seed: Row[] = MOCK_LISTINGS.map((l) => ({
  id: l.id,
  suburb: l.suburb,
  state: l.state,
  priceLow: l.priceLow,
  priceHigh: l.priceHigh,
  status: l.status,
  type: l.type,
  published: true,
}));

const blank = (): Row => ({
  id: `dexy-${Math.random().toString(36).slice(2, 6)}`,
  suburb: "",
  state: "QLD",
  priceLow: 500000,
  priceHigh: 550000,
  status: "off-market",
  type: "house",
  published: false,
});

export default function AdminPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [rows, setRows] = useState<Row[]>(seed);
  const [editing, setEditing] = useState<Row | null>(null);

  // Founder-only gate.
  useEffect(() => {
    if (!isAuthed()) {
      router.replace("/login");
      return;
    }
    setReady(true);
  }, [router]);

  if (!ready)
    return (
      <div className="grid min-h-screen place-items-center text-muted">Loading…</div>
    );

  const isAdmin = getUser()?.isAdmin;

  function save(row: Row) {
    setRows((prev) => {
      const exists = prev.some((r) => r.id === row.id);
      return exists ? prev.map((r) => (r.id === row.id ? row : r)) : [row, ...prev];
    });
    setEditing(null);
  }
  function remove(id: string) {
    setRows((prev) => prev.filter((r) => r.id !== id));
  }
  function togglePublish(id: string) {
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, published: !r.published } : r)),
    );
  }

  return (
    <div className="min-h-screen">
      <header className="border-b border-border bg-forest/80 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <Logo size={24} />
            <span className="rounded-full border border-border px-2 py-0.5 text-xs text-muted">
              Admin
            </span>
          </div>
          <Link href="/dashboard" className="text-sm text-muted hover:text-cream">
            ← App
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-6">
        {!isAdmin && (
          <div className="mb-5 rounded-lg border border-maroon/40 bg-maroon/10 px-4 py-3 text-sm text-orange-soft">
            You&apos;re viewing the admin panel in demo mode. Sign in with an
            email starting <code>admin</code> for the founder view.
          </div>
        )}

        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif text-2xl text-cream">Listings</h1>
            <p className="text-sm text-muted">
              Create, edit and publish off-market properties.
            </p>
          </div>
          <button onClick={() => setEditing(blank())} className="btn-primary">
            + New listing
          </button>
        </div>

        <div className="card-dexy mt-5 divide-y divide-border">
          {rows.map((r) => (
            <div
              key={r.id}
              className="flex items-center justify-between gap-3 p-4"
            >
              <div className="min-w-0">
                <p className="truncate font-medium text-cream">
                  {r.suburb || "Untitled"}, {r.state}{" "}
                  <span className="text-muted">· {r.type}</span>
                </p>
                <p className="text-sm text-muted">
                  {priceBracket(r.priceLow, r.priceHigh)} · {r.status}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <button
                  onClick={() => togglePublish(r.id)}
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                    r.published
                      ? "bg-orange/15 text-orange"
                      : "bg-forest-raised text-muted"
                  }`}
                >
                  {r.published ? "Published" : "Draft"}
                </button>
                <button
                  onClick={() => setEditing(r)}
                  className="text-sm text-muted hover:text-cream"
                >
                  Edit
                </button>
                <button
                  onClick={() => remove(r.id)}
                  className="text-sm text-muted hover:text-orange-soft"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-4 text-xs text-muted/70">
          Changes are in-memory for the scaffold. Wired to Supabase, this becomes
          live CRUD the founder can run without a developer.
        </p>
      </main>

      {/* Editor modal */}
      {editing && (
        <EditModal
          row={editing}
          onCancel={() => setEditing(null)}
          onSave={save}
        />
      )}
    </div>
  );
}

function EditModal({
  row,
  onCancel,
  onSave,
}: {
  row: Row;
  onCancel: () => void;
  onSave: (r: Row) => void;
}) {
  const [draft, setDraft] = useState<Row>(row);
  function set<K extends keyof Row>(k: K, v: Row[K]) {
    setDraft((d) => ({ ...d, [k]: v }));
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-end bg-black/50 p-0 sm:place-items-center sm:p-4">
      <div className="card-dexy w-full max-w-md p-5 sm:rounded-2xl">
        <h2 className="font-serif text-xl text-cream">
          {row.suburb ? "Edit listing" : "New listing"}
        </h2>
        <div className="mt-4 space-y-3">
          <label className="block text-sm text-muted">
            Suburb
            <input
              className="input-dexy mt-1"
              value={draft.suburb}
              onChange={(e) => set("suburb", e.target.value)}
            />
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="block text-sm text-muted">
              State
              <input
                className="input-dexy mt-1"
                value={draft.state}
                onChange={(e) => set("state", e.target.value)}
              />
            </label>
            <label className="block text-sm text-muted">
              Type
              <select
                className="input-dexy mt-1"
                value={draft.type}
                onChange={(e) => set("type", e.target.value as Row["type"])}
              >
                <option value="house">House</option>
                <option value="townhouse">Townhouse</option>
                <option value="apartment">Apartment</option>
                <option value="land">Land</option>
              </select>
            </label>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <label className="block text-sm text-muted">
              Price low
              <input
                type="number"
                className="input-dexy mt-1"
                value={draft.priceLow}
                onChange={(e) => set("priceLow", Number(e.target.value))}
              />
            </label>
            <label className="block text-sm text-muted">
              Price high
              <input
                type="number"
                className="input-dexy mt-1"
                value={draft.priceHigh}
                onChange={(e) => set("priceHigh", Number(e.target.value))}
              />
            </label>
          </div>
          <label className="block text-sm text-muted">
            Status
            <select
              className="input-dexy mt-1"
              value={draft.status}
              onChange={(e) => set("status", e.target.value as Row["status"])}
            >
              <option value="off-market">Off-market</option>
              <option value="pre-market">Pre-market</option>
            </select>
          </label>
        </div>
        <div className="mt-5 flex gap-3">
          <button onClick={onCancel} className="btn-ghost flex-1">
            Cancel
          </button>
          <button onClick={() => onSave(draft)} className="btn-primary flex-1">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
