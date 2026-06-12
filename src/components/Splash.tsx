"use client";

import { useEffect, useState } from "react";
import { Logo } from "./Logo";

/**
 * Splash overlay shown on app open. The logo starts small, enlarges centre
 * screen, then fades into whatever is behind it (~2.4s). Skippable on tap,
 * shown once per browser session, and respects prefers-reduced-motion. It sits
 * above the page but does NOT block load — the page renders behind it.
 */
export function Splash() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("dexy_splash_seen")) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setShow(true);
    sessionStorage.setItem("dexy_splash_seen", "1");
    const t = setTimeout(() => setShow(false), reduce ? 600 : 2400);
    return () => clearTimeout(t);
  }, []);

  if (!show) return null;

  return (
    <div
      onClick={() => setShow(false)}
      role="presentation"
      className="bg-dexy fixed inset-0 z-50 grid cursor-pointer place-items-center"
    >
      <div className="motion-safe:animate-splash-grow motion-reduce:animate-fade-in">
        <Logo size={72} />
      </div>
      <span className="absolute bottom-10 text-xs uppercase tracking-[0.3em] text-muted/60">
        tap to skip
      </span>
    </div>
  );
}
