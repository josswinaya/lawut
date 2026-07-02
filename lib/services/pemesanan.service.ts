import { createAdminClient } from '@/lib/supabase/admin'
import type { Database } from '@/lib/types/database.types'

type PemesananInsert = Database['public']['Tables']['pemesanan']['Insert']
type PendakiInsert = Database['public']['Tables']['pendaki']['Insert']

// Explicit row types untuk hasil query (menghindari Supabase JS v2.110+ type inference issue)
type PemesananRow = {
  id: string
  kode_booking: string
  nama_pemesan: string
  tanggal: string
  jumlah_pendaki: number
  total_biaya: number
  no_hp_pemesan: string
  jalur: { nama: string } | { nama: string }[] | null
}

export interface CreatePemesananPayload {
  jalur_id: string
  tanggal: string
  jumlah_pendaki: number
  total_biaya: number
  nama_pemesan: string
  no_hp_pemesan: string
  pendaki: Omit<PendakiInsert, 'pemesanan_id'>[]
}

export interface CreatePemesananResult {
  success: boolean
  data?: {
    id: string
    kode_booking: string
    nama_pemesan: string
    jalur_nama: string
    tanggal: string
    jumlah_pendaki: number
    total_biaya: number
    no_hp_pemesan: string
  }
  error?: {
    code: string
    message: string
  }
}

/**
 * Insert pemesanan baru ke database.
 * Kode booking & kuota dihandle sepenuhnya oleh trigger database
 * (generate_kode_booking & update_kuota_on_pemesanan) — sesuai AGENT.md Bagian 8.1 & 8.2.
 */
export async function createPemesanan(
  payload: CreatePemesananPayload
): Promise<CreatePemesananResult> {
  // Gunakan admin client agar bisa insert + langsung select balik (bypass RLS select)
  const supabase = createAdminClient()

  // 1. Insert pemesanan — kode_booking digenerate trigger, kuota dicek trigger
  const pemesananInsert: PemesananInsert = {
    jalur_id: payload.jalur_id,
    tanggal: payload.tanggal,
    jumlah_pendaki: payload.jumlah_pendaki,
    total_biaya: payload.total_biaya,
    nama_pemesan: payload.nama_pemesan,
    no_hp_pemesan: payload.no_hp_pemesan,
  }

  const { data: pemesananRaw, error: pemesananError } = await supabase
    .from('pemesanan')
    .insert(pemesananInsert)
    .select('id, kode_booking')
    .single()

  if (pemesananError) {
    // Trigger kuota penuh melempar exception dengan pesan spesifik
    if (pemesananError.message.includes('Kuota pendakian')) {
      return {
        success: false,
        error: {
          code: 'KUOTA_PENUH',
          message: pemesananError.message,
        },
      }
    }
    return {
      success: false,
      error: {
        code: 'INSERT_FAILED',
        message: 'Gagal membuat pemesanan. Silakan coba lagi.',
      },
    }
  }

  const pemesanan = pemesananRaw as { id: string; kode_booking: string }

  // 2. Insert data pendaki (rombongan)
  const pendakiInserts = payload.pendaki.map((p) => ({
    ...p,
    pemesanan_id: pemesanan.id,
  }))

  const { error: pendakiError } = await supabase
    .from('pendaki')
    .insert(pendakiInserts)

  if (pendakiError) {
    // Rollback: hapus pemesanan jika pendaki gagal diinsert
    await supabase.from('pemesanan').delete().eq('id', pemesanan.id)
    return {
      success: false,
      error: {
        code: 'INSERT_PENDAKI_FAILED',
        message: 'Gagal menyimpan data pendaki. Silakan coba lagi.',
      },
    }
  }

  // 3. Ambil detail untuk WhatsApp redirect
  const { data: detailRaw, error: detailError } = await supabase
    .from('pemesanan')
    .select('id, kode_booking, nama_pemesan, tanggal, jumlah_pendaki, total_biaya, no_hp_pemesan, jalur(nama)')
    .eq('id', pemesanan.id)
    .single()

  if (detailError || !detailRaw) {
    return {
      success: false,
      error: {
        code: 'FETCH_FAILED',
        message: 'Pemesanan berhasil tetapi gagal mengambil detail.',
      },
    }
  }

  const detail = detailRaw as PemesananRow
  const jalurData = Array.isArray(detail.jalur)
    ? detail.jalur[0]
    : (detail.jalur as { nama: string } | null)

  return {
    success: true,
    data: {
      id: detail.id,
      kode_booking: detail.kode_booking,
      nama_pemesan: detail.nama_pemesan,
      jalur_nama: jalurData?.nama ?? '-',
      tanggal: detail.tanggal,
      jumlah_pendaki: detail.jumlah_pendaki,
      total_biaya: detail.total_biaya,
      no_hp_pemesan: detail.no_hp_pemesan,
    },
  }
}

/**
 * Ambil sisa kuota untuk jalur & tanggal tertentu.
 * Data dari tabel jadwal_kuota yang bisa di-select publik.
 */
export async function getKuotaByJalurAndTanggal(
  jalur_id: string,
  tanggal: string
): Promise<{ sisa: number; maksimal: number } | null> {
  const supabase = createAdminClient()

  const { data: raw, error } = await supabase
    .from('jadwal_kuota')
    .select('kuota_terpakai, kuota_maksimal')
    .eq('jalur_id', jalur_id)
    .eq('tanggal', tanggal)
    .single()

  if (error || !raw) return null

  const data = raw as { kuota_terpakai: number; kuota_maksimal: number }

  return {
    sisa: data.kuota_maksimal - data.kuota_terpakai,
    maksimal: data.kuota_maksimal,
  }
}

/**
 * Update timestamp wa_redirected_at saat pengunjung menekan tombol WA (PM-08).
 */
export async function updateWaRedirectedAt(pemesanan_id: string): Promise<void> {
  const supabase = createAdminClient()
  await supabase
    .from('pemesanan')
    .update({ wa_redirected_at: new Date().toISOString() })
    .eq('id', pemesanan_id)
}
