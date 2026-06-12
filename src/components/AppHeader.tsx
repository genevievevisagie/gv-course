"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Logo } from "./Logo";
import { signOut } from "@/lib/auth";
import { clsx } from "@/lib/cx";

const NAV = [
  { href: "/dashboard", label: "Dashboard", desc: "Analyse & shortlist" },
  { href: "/listings", label: "Listings feed", desc: "Browse off-market" },
  { href: "/savings", label: "Savings tracker", desc: "Deposit goal" },
  { href: "/account", label: "Account", desc: "Profile & billing" },
];

/** Persistent header for the subscriber area + slide-in menu. */
export function AppHeader() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  function handleSignOut() {
    signOut();
    router.push("/");
  }

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-border bg-forest/80 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-2xl items-center justify-between px-4">
          <Link href="/dashboard" aria-label="Dexy home">
            <Logo size={26} />
          </Link>
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="grid h-9 w-9 place-items-center rounded-lg border border-border text-cream transition hover:bg-forest-raised"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </header>

      {/* Menu overlay */}
      <div
        className={clsx(
          "fixed inset-0 z-40 transition",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!open}
      >
        <div
          onClick={() => setOpen(false)}
          className={clsx(
            "absolute inset-0 bg-black/50 transition-opacity",
            open ? "opacity-100" : "opacity-0",
          )}
        />
        <nav
          className={clsx(
            "absolute right-0 top-0 flex h-full w-72 max-w-[85%] flex-col border-l border-border bg-forest-surface p-5 transition-transform",
            open ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="flex items-center justify-between">
            <Logo size={24} />
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="grid h-8 w-8 place-items-center rounded-lg text-muted hover:text-cream"
            >
              ✕
            </button>
          </div>
          <div className="mt-6 flex flex-col gap-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 transition hover:bg-forest-raised"
              >
                <p className="font-medium text-cream">{item.label}</p>
                <p className="text-xs text-muted">{item.desc}</p>
              </Link>
            ))}
            <Link
              href="/admin"
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-3 transition hover:bg-forest-raised"
            >
              <p className="font-medium text-cream">Admin panel</p>
              <p className="text-xs text-muted">Founder only</p>
            </Link>
          </div>
          <button
            onClick={handleSignOut}
            className="btn-ghost mt-auto w-full"
          >
            Sign out
          </button>
        </nav>
      </div>
    </>
  );
}
