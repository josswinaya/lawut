import { createClient } from '@supabase/supabase-js'

/**
 * Service role client — bypass RLS.
 * HANYA boleh dipakai di server (Route Handler / Server Action).
 * JANGAN pernah di-import di Client Component.
 */
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  )
}
