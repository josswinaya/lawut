import { createAdminClient } from '@/lib/supabase/admin'

export interface CreatePesanBantuanPayload {
  nama: string
  email: string
  subjek: string
  pesan: string
}

/**
 * Insert pesan bantuan baru (BT-03).
 * Menggunakan admin client karena RLS select publik ditutup,
 * namun insert diizinkan oleh policy publik.
 */
export async function createPesanBantuan(
  payload: CreatePesanBantuanPayload
): Promise<{ success: boolean; error?: { code: string; message: string } }> {
  const supabase = createAdminClient()

  const { error } = await supabase.from('pesan_bantuan').insert(payload)

  if (error) {
    return {
      success: false,
      error: {
        code: 'INSERT_FAILED',
        message: 'Gagal mengirim pesan. Silakan coba lagi atau hubungi kami via WhatsApp.',
      },
    }
  }

  return { success: true }
}
