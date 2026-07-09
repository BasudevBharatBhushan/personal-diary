import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// SERVER ONLY. Never import this from a "use client" module — it uses the
// Supabase service role key, which must never reach the browser bundle.
//
// The client is created lazily on first use (not at module load) so that
// `next build`'s page-data collection can import route modules without needing
// the env vars present, and so a missing var fails a request rather than the
// whole build.

export const JOURNAL_BUCKET = "journal-photos";

let client: SupabaseClient | null = null;

function getClient(): SupabaseClient {
  if (client) return client;
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error(
      "Supabase is not configured: set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local",
    );
  }
  client = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return client;
}

/**
 * Lazy service-role Supabase client. Behaves like a normal `SupabaseClient`
 * (`supabaseAdmin.from(...)`, `supabaseAdmin.storage...`) but defers creation
 * until the first property access at runtime.
 */
export const supabaseAdmin = new Proxy({} as SupabaseClient, {
  get(_target, prop, receiver) {
    const c = getClient();
    const value = Reflect.get(c, prop, c);
    return typeof value === "function" ? value.bind(c) : value;
  },
});
