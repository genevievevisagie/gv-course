"use client";

import { useEffect, useState } from "react";
import { ProgressRing } from "@/components/ProgressRing";

interface Savings {
  goal: number;
  current: number;
}
const KEY = "dexy_savings";
const DEFAULT: Savings = { goal: 120000, current: 38500 };

export default function SavingsPage() {
  const [s, setS] = useState<Savings>(DEFAULT);
  const [add, setAdd] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setS(JSON.parse(raw));
    } catch {}
  }, []);

  function persist(next: Savings) {
    setS(next);
    localStorage.setItem(KEY, JSON.stringify(next));
  }

  const pct = s.goal > 0 ? (s.current / s.goal) * 100 : 0;
  const remaining = Math.max(0, s.goal - s.current);

  function applyAdd(sign: 1 | -1) {
    const amt = Number(add);
    if (!amt) return;
    persist({ ...s, current: Math.max(0, s.current + sign * amt) });
    setAdd("");
  }

  return (
    <div className="animate-fade-in">
      <h1 className="font-serif text-2xl text-cream">Savings tracker</h1>
      <p className="text-sm text-muted">
        Set a deposit goal and update your balance as you save.
      </p>

      {/* Ring */}
      <div className="card-dexy mt-5 flex flex-col items-center p-6">
        <ProgressRing pct={pct} />
        <p className="mt-4 font-serif text-2xl text-cream">
          ${s.current.toLocaleString()}
          <span className="text-base text-muted"> / ${s.goal.toLocaleString()}</span>
        </p>
        <p className="mt-1 text-sm text-muted">
          {remaining > 0
            ? `$${remaining.toLocaleString()} to your deposit goal`
            : "Goal reached — time to invest 🎉"}
        </p>
      </div>

      {/* Update balance */}
      <div className="card-dexy mt-5 p-5">
        <p className="text-sm font-medium text-cream">Update balance</p>
        <div className="mt-3 flex gap-2">
          <input
            type="number"
            inputMode="numeric"
            className="input-dexy"
            placeholder="Amount"
            value={add}
            onChange={(e) => setAdd(e.target.value)}
          />
          <button onClick={() => applyAdd(1)} className="btn-primary px-4">
            + Add
          </button>
          <button onClick={() => applyAdd(-1)} className="btn-ghost px-4">
            − Withdraw
          </button>
        </div>
        <p className="mt-2 text-xs text-muted">Manual entry only.</p>
      </div>

      {/* Edit goal */}
      <div className="card-dexy mt-5 p-5">
        <label className="text-sm font-medium text-cream">Deposit goal</label>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-muted">$</span>
          <input
            type="number"
            inputMode="numeric"
            className="input-dexy"
            value={s.goal}
            onChange={(e) =>
              persist({ ...s, goal: Math.max(0, Number(e.target.value)) })
            }
          />
        </div>
        <p className="mt-2 text-xs text-muted">
          Tip: a 20% deposit on a $600k property is $120,000.
        </p>
      </div>
    </div>
  );
}
