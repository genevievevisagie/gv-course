"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUser, signOut, type DexyUser } from "@/lib/auth";

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<DexyUser | null>(null);
  const [prefs, setPrefs] = useState({
    newListings: true,
    priceDrops: true,
    weeklyDigest: false,
  });

  useEffect(() => {
    setUser(getUser());
    try {
      const raw = localStorage.getItem("dexy_prefs");
      if (raw) setPrefs(JSON.parse(raw));
    } catch {}
  }, []);

  function togglePref(k: keyof typeof prefs) {
    const next = { ...prefs, [k]: !prefs[k] };
    setPrefs(next);
    localStorage.setItem("dexy_prefs", JSON.stringify(next));
  }

  function handleSignOut() {
    signOut();
    router.push("/");
  }

  return (
    <div className="animate-fade-in space-y-5">
      <h1 className="font-serif text-2xl text-cream">Account</h1>

      {/* Profile */}
      <section className="card-dexy p-5">
        <h2 className="font-serif text-lg text-cream">Profile</h2>
        <div className="mt-4 space-y-3">
          <div>
            <label className="text-sm text-muted">Name</label>
            <input
              className="input-dexy mt-1 capitalize"
              defaultValue={user?.name ?? ""}
            />
          </div>
          <div>
            <label className="text-sm text-muted">Email</label>
            <input
              className="input-dexy mt-1"
              defaultValue={user?.email ?? ""}
              readOnly
            />
          </div>
          <button className="btn-ghost">Save profile</button>
        </div>
      </section>

      {/* Subscription */}
      <section className="card-dexy p-5">
        <h2 className="font-serif text-lg text-cream">Subscription</h2>
        <div className="mt-3 flex items-center justify-between rounded-xl border border-border bg-forest-deep/40 px-4 py-3">
          <div>
            <p className="text-sm font-medium text-cream">Investor — Monthly</p>
            <p className="text-xs text-muted">Renews 12 Jul 2026 · $49/mo</p>
          </div>
          <span className="rounded-full bg-orange/15 px-3 py-1 text-xs font-semibold text-orange">
            Active
          </span>
        </div>
        <button className="btn-primary mt-4 w-full">
          Manage billing in Stripe
        </button>
        <p className="mt-2 text-xs text-muted">
          Opens the Stripe customer portal once billing is connected.
        </p>
      </section>

      {/* Notifications */}
      <section className="card-dexy p-5">
        <h2 className="font-serif text-lg text-cream">Notifications</h2>
        <div className="mt-3 divide-y divide-border">
          <Toggle
            label="New off-market listings"
            on={prefs.newListings}
            onToggle={() => togglePref("newListings")}
          />
          <Toggle
            label="Price changes on saved areas"
            on={prefs.priceDrops}
            onToggle={() => togglePref("priceDrops")}
          />
          <Toggle
            label="Weekly market digest"
            on={prefs.weeklyDigest}
            onToggle={() => togglePref("weeklyDigest")}
          />
        </div>
      </section>

      <button onClick={handleSignOut} className="btn-ghost w-full">
        Sign out
      </button>
    </div>
  );
}

function Toggle({
  label,
  on,
  onToggle,
}: {
  label: string;
  on: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center justify-between py-3">
      <span className="text-sm text-cream">{label}</span>
      <button
        onClick={onToggle}
        role="switch"
        aria-checked={on}
        className={`relative h-6 w-11 rounded-full transition ${
          on ? "bg-orange" : "bg-forest-raised"
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-cream transition-all ${
            on ? "left-[22px]" : "left-0.5"
          }`}
        />
      </button>
    </div>
  );
}
