"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { isAuthed } from "@/lib/auth";

/**
 * Client-side gate for the subscriber area. Redirects to /login when there's no
 * session. Once Supabase is wired this is replaced (or backed) by middleware
 * that checks the real auth cookie + active subscription.
 */
export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (isAuthed()) {
      setOk(true);
    } else {
      router.replace("/login");
    }
  }, [router]);

  if (!ok) {
    return (
      <div className="grid min-h-[60vh] place-items-center">
        <span className="text-sm text-muted">Loading…</span>
      </div>
    );
  }
  return <>{children}</>;
}
