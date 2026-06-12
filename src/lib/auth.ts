"use client";

/**
 * Lightweight client-side auth stub for the MVP scaffold. It fakes a logged-in
 * session with a cookie + localStorage so every screen and the gated navigation
 * are demonstrable end-to-end. Replace the bodies with Supabase auth calls once
 * the project is provisioned — the surface (signIn/signOut/useSession) stays.
 */

const COOKIE = "dexy_session";
const STORE = "dexy_user";

export interface DexyUser {
  email: string;
  name: string;
  isAdmin: boolean;
}

export function signIn(email: string): DexyUser {
  const user: DexyUser = {
    email,
    name: email.split("@")[0].replace(/[.\-_]/g, " "),
    // founder/admin convenience for the demo
    isAdmin: email.toLowerCase().startsWith("admin"),
  };
  document.cookie = `${COOKIE}=1; path=/; max-age=${60 * 60 * 24 * 30}; samesite=lax`;
  localStorage.setItem(STORE, JSON.stringify(user));
  return user;
}

export function signOut() {
  document.cookie = `${COOKIE}=; path=/; max-age=0`;
  localStorage.removeItem(STORE);
}

export function getUser(): DexyUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORE);
    return raw ? (JSON.parse(raw) as DexyUser) : null;
  } catch {
    return null;
  }
}

export function isAuthed(): boolean {
  if (typeof document === "undefined") return false;
  return document.cookie.includes(`${COOKIE}=1`);
}
