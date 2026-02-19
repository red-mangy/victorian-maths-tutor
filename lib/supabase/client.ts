/**
 * Supabase Client - Browser Side
 *
 * This file creates a Supabase client for use in client components and browser contexts.
 * It uses the @supabase/ssr package for better session management with Next.js App Router.
 */

import { createBrowserClient } from '@supabase/ssr';
import { Database } from '@/types/database';

// Singleton client instance for browser
let client: ReturnType<typeof createBrowserClient<Database>> | undefined;

/**
 * Get or create the Supabase browser client
 * This is used in Client Components
 */
export function createClient() {
  if (client) {
    return client;
  }

  client = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  return client;
}

// Export a default instance for convenience
export const supabase = createClient();
