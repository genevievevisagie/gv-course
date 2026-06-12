import { createBrowserClient } from "@supabase/ssr";

/**
 * Browser Supabase client. Returns null until env vars are set so the MVP
 * scaffold runs (with the auth stub) before the founder provisions Supabase.
 * Once NEXT_PUBLIC_SUPABASE_URL / ANON_KEY are present this becomes the real
 * auth + data client.
 */
export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createBrowserClient(url, key);
}

export const isSupabaseConfigured = () =>
  Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
