/**
 * Shared types untuk data yang di-fetch dari Supabase.
 * Digunakan sebagai explicit return type pada Server Components.
 * Menghindari type inference issue Supabase JS v2.110+ dengan manual Database types.
 */

export type JalurRow = {
  id: string
  nama: string
  slug: string
  harga_tiket: number
  tingkat_kesulitan: string
  estimasi_waktu_jam: number | null
  jarak_km: number | null
  kuota_harian_default: number
  is_active: boolean
  deskripsi: string | null
  created_at: string
  updated_at: string
}

export type KuotaRow = {
  id: string
  jalur_id: string
  tanggal: string
  kuota_tersedia: number
  kuota_terisi: number
  is_tutup: boolean
}
