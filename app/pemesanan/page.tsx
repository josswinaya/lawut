import type { Metadata } from 'next'
import { createAdminClient } from '@/lib/supabase/admin'
import BookingForm from '@/components/forms/BookingForm'
import type { JalurRow } from '@/lib/types/shared.types'

export const metadata: Metadata = {
  title: 'Pesan Tiket',
  description: 'Pesan tiket pendakian Gunung Lawu secara online. Pilih jalur, tanggal, dan isi data pendaki.',
}

type JalurListItem = Pick<JalurRow, 'id' | 'nama' | 'slug' | 'harga_tiket' | 'tingkat_kesulitan' | 'estimasi_waktu_jam' | 'jarak_km' | 'kuota_harian_default'>

async function getJalurList(): Promise<JalurListItem[]> {
  try {
    const supabase = createAdminClient()
    const { data } = await supabase
      .from('jalur')
      .select('id, nama, slug, harga_tiket, tingkat_kesulitan, estimasi_waktu_jam, jarak_km, kuota_harian_default')
      .eq('is_active', true)
      .order('nama')
    return (data as JalurListItem[] | null) ?? []
  } catch {
    return []
  }
}

export default async function PemesananPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const initialJalurId = typeof params.jalur_id === 'string' ? params.jalur_id : undefined
  const jalurList = await getJalurList()

  return (
    <div>
      {/* Hero kecil */}
      <section className="relative py-16 bg-[#1a3a2a] overflow-hidden">
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: "url('/images/bg%20lawu.jpg')", backgroundSize: 'cover', backgroundPosition: 'center bottom' }} />
        <div className="container-lawu relative z-10">
          <p className="text-[#52b788] text-sm font-semibold tracking-widest uppercase mb-2">PEMESANAN TIKET</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white">Pemesanan Tiket - Gunung Lawu</h1>
          <p className="text-white/70 mt-2">Isi data dengan benar dan pastikan semua informasi sudah sesuai.</p>
        </div>
      </section>

      <section className="py-12 bg-[#f8faf9]">
        <div className="container-lawu">
          <BookingForm jalurList={jalurList} initialJalurId={initialJalurId} />
        </div>
      </section>
    </div>
  )
}
