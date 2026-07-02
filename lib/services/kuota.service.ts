import { createClient } from '@/lib/supabase/server'

type KuotaRow = {
  kuota_terpakai: number
  kuota_maksimal: number
  jalur_id?: string
}

type JalurKuotaRow = {
  id: string
  nama: string
  slug: string
  harga_tiket: number
  kuota_harian_default: number
  tingkat_kesulitan: string
}

/**
 * Ambil kuota yang tersedia untuk jalur & tanggal tertentu.
 * Jika baris jadwal_kuota belum ada (belum ada pemesanan di tanggal itu),
 * kembalikan kuota_harian_default dari tabel jalur.
 */
export async function getAvailableKuota(
  jalur_id: string,
  tanggal: string
): Promise<{ sisa: number; maksimal: number; jalur_nama?: string }> {
  const supabase = await createClient()

  // Cek apakah baris jadwal_kuota sudah ada
  const { data: kuotaRaw } = await supabase
    .from('jadwal_kuota')
    .select('kuota_terpakai, kuota_maksimal')
    .eq('jalur_id', jalur_id)
    .eq('tanggal', tanggal)
    .single()

  const kuota = kuotaRaw as KuotaRow | null

  if (kuota) {
    return {
      sisa: kuota.kuota_maksimal - kuota.kuota_terpakai,
      maksimal: kuota.kuota_maksimal,
    }
  }

  // Jika belum ada, ambil default dari tabel jalur
  const { data: jalurRaw } = await supabase
    .from('jalur')
    .select('kuota_harian_default, nama')
    .eq('id', jalur_id)
    .single()

  const jalur = jalurRaw as { kuota_harian_default: number; nama: string } | null

  return {
    sisa: jalur?.kuota_harian_default ?? 0,
    maksimal: jalur?.kuota_harian_default ?? 0,
    jalur_nama: jalur?.nama,
  }
}

/**
 * Ambil semua jalur aktif beserta info kuota untuk tanggal tertentu.
 * Digunakan di form pemesanan untuk menampilkan sisa kuota real-time.
 */
export async function getJalurWithKuota(tanggal?: string) {
  const supabase = await createClient()

  const { data: jalurRaw, error } = await supabase
    .from('jalur')
    .select('id, nama, slug, harga_tiket, kuota_harian_default, tingkat_kesulitan')
    .eq('is_active', true)
    .order('nama')

  if (error || !jalurRaw) return []

  const jalurList = jalurRaw as JalurKuotaRow[]

  if (!tanggal) return jalurList.map((j) => ({ ...j, sisa_kuota: j.kuota_harian_default }))

  // Ambil kuota aktual untuk tanggal yang dipilih
  const { data: kuotaRaw } = await supabase
    .from('jadwal_kuota')
    .select('jalur_id, kuota_terpakai, kuota_maksimal')
    .eq('tanggal', tanggal)
    .in('jalur_id', jalurList.map((j) => j.id))

  const kuotaList = (kuotaRaw as KuotaRow[] | null) ?? []

  return jalurList.map((jalur) => {
    const kuota = kuotaList.find((k) => k.jalur_id === jalur.id)
    const sisa = kuota
      ? kuota.kuota_maksimal - kuota.kuota_terpakai
      : jalur.kuota_harian_default
    return { ...jalur, sisa_kuota: sisa }
  })
}
