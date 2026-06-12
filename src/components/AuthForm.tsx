"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Logo } from "./Logo";
import { signIn } from "@/lib/auth";
import { isSupabaseConfigured } from "@/lib/supabase/client";

/**
 * Sign in / Sign up screen, modelled on the brand mock: serif heading, dark
 * inputs, orange CTA, social providers. Uses the auth stub for the scaffold;
 * swap `signIn` for Supabase `signInWithPassword` / `signUp` once configured.
 */
export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const isSignup = mode === "signup";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    // TODO: replace with Supabase auth + Stripe checkout for paid tiers.
    signIn(email || "investor@example.com");
    router.push(isSignup ? "/dashboard?welcome=1" : "/dashboard");
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-5 py-10">
      <div className="card-dexy p-6 sm:p-8">
        <div className="flex justify-center">
          <Logo size={30} />
        </div>
        <h1 className="mt-6 text-center font-serif text-3xl text-cream">
          {isSignup ? "Create account" : "Sign in"}
        </h1>

        <form onSubmit={onSubmit} className="mt-7 space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-cream">
              Email address
            </label>
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tony.stark@example.com"
              className="input-dexy"
            />
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label className="text-sm font-medium text-cream">Password</label>
              {!isSignup && (
                <Link href="/login" className="link-orange text-sm">
                  Forgot password?
                </Link>
              )}
            </div>
            <input
              type="password"
              required
              minLength={8}
              autoComplete={isSignup ? "new-password" : "current-password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 8 characters"
              className="input-dexy"
            />
          </div>

          <button type="submit" disabled={busy} className="btn-primary w-full">
            {busy ? "One moment…" : "Continue"}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-muted">
          {isSignup ? "Already have an account? " : "Don't have an account? "}
          <Link
            href={isSignup ? "/login" : "/signup"}
            className="link-orange"
          >
            {isSignup ? "Sign in" : "Create account"}
          </Link>
        </p>

        <div className="my-6 flex items-center gap-3">
          <span className="h-px flex-1 bg-border" />
          <span className="text-xs uppercase tracking-widest text-muted">or</span>
          <span className="h-px flex-1 bg-border" />
        </div>

        <div className="space-y-3">
          {["Google", "Apple", "Microsoft"].map((p) => (
            <button
              key={p}
              type="button"
              onClick={onSubmit}
              className="btn-ghost w-full justify-center"
            >
              Continue with {p}
            </button>
          ))}
        </div>

        {!isSupabaseConfigured() && (
          <p className="mt-5 rounded-lg border border-border bg-forest-deep/50 px-3 py-2 text-center text-xs text-muted">
            Demo mode — any email signs you in. Connect Supabase to enable real
            accounts.
          </p>
        )}

        <p className="mt-5 text-center text-xs text-muted/70">
          By continuing, you agree to the{" "}
          <Link href="/legal/terms" className="underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/legal/privacy" className="underline">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
