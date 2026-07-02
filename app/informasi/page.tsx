import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import type { JalurRow } from '@/lib/types/shared.types'

export const metadata: Metadata = {
  title: 'Informasi Jalur Pendakian',
  description: 'Informasi lengkap jalur pendakian Gunung Lawu — Cemoro Sewu, Cemoro Kandang, dan Candi Cetho. Termasuk syarat, perlengkapan, dan tarif tiket.',
}

const jalurDetail = [
  {
    slug: 'cemoro-sewu',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
    asal: 'Magetan, Jawa Timur',
    elevasi: '1.900 mdpl',
    highlight: 'Trek anak tangga batu yang tertata rapi, cocok untuk semua kalangan.',
    pos: ['Pos 1 - Watu Jolotundo', 'Pos 2 - Kaliber', 'Pos 3 - Gupak Menjangan', 'Pos 4 - Hargo Dumilah'],
    icon: '🪨',
  },
  {
    slug: 'cemoro-kandang',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80',
    asal: 'Karanganyar, Jawa Tengah',
    elevasi: '1.820 mdpl',
    highlight: 'Medan tanah landai dengan pemandangan sabana yang luas dan spektakuler.',
    pos: ['Pos 1 - Penggik', 'Pos 2 - Pemantapan', 'Pos 3 - Pasar Setan', 'Pos 4 - Puncak Hargo Dumilah'],
    icon: '⛰️',
  },
  {
    slug: 'candi-cetho',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    asal: 'Karanganyar, Jawa Tengah',
    elevasi: '1.495 mdpl',
    highlight: 'Melewati Candi Cetho bersejarah dengan tanjakan menantang dan suasana mistis.',
    pos: ['Pos 1 - Candi Cetho', 'Pos 2 - Candi Kethek', 'Pos 3 - Bumi Perkemahan', 'Pos 4 - Puncak Hargo Dumilah'],
    icon: '🏛️',
  },
]

const syaratKetentuan = [
  'Minimal usia 10 tahun (pendaki di bawah 17 tahun wajib didampingi orang tua/wali)',
  'Wajib membawa KTP/Kartu Pelajar yang masih berlaku',
  'Surat keterangan sehat dari dokter (opsional, sangat dianjurkan)',
  'Tidak diperbolehkan mendaki saat sakit atau dalam kondisi tubuh tidak prima',
  'Wajib mengisi data diri lengkap saat pemesanan tiket',
  'Pendaki wajib kembali turun dalam waktu yang ditentukan',
]

const perlengkapan = [
  { nama: 'Jaket tebal / windbreaker', wajib: true },
  { nama: 'Sepatu gunung / hiking', wajib: true },
  { nama: 'Jas hujan / ponco', wajib: true },
  { nama: 'Headlamp + baterai cadangan', wajib: true },
  { nama: 'Air minum minimal 2 liter', wajib: true },
  { nama: 'P3K dasar', wajib: true },
  { nama: 'Tenda & sleeping bag', wajib: false },
  { nama: 'Kompor portable + nesting', wajib: false },
  { nama: 'Gaiter / pelindung kaki', wajib: false },
  { nama: 'Kacamata UV protection', wajib: false },
]

const faqList = [
  {
    q: 'Apakah bisa mendaki tanpa pemandu?',
    a: 'Ya, pendakian mandiri diperbolehkan selama sudah mendaftar dan memiliki kode booking yang valid.',
  },
  {
    q: 'Berapa lama waktu rata-rata pendakian?',
    a: 'Tergantung jalur. Cemoro Sewu 6-7 jam, Cemoro Kandang 8-9 jam, Candi Cetho 10-12 jam (pulang pergi).',
  },
  {
    q: 'Apakah ada fasilitas shelter di jalur?',
    a: 'Tersedia pos peristirahatan di setiap jalur, namun disarankan membawa tenda sendiri untuk bermalam.',
  },
  {
    q: 'Kapan waktu terbaik mendaki Gunung Lawu?',
    a: 'Musim kemarau (April–Oktober) adalah waktu terbaik. Hindari pendakian saat musim hujan deras.',
  },
]

async function getJalurData(): Promise<JalurRow[]> {
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('jalur')
      .select('*')
      .eq('is_active', true)
      .order('nama')
    return (data as JalurRow[] | null) ?? []
  } catch {
    return []
  }
}

export default async function InformasiPage() {
  const jalurDB = await getJalurData()

  return (
    <div>
      {/* Hero */}
      <section className="relative py-24 bg-[#1a3a2a] overflow-hidden">
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=60')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="container-lawu relative z-10 text-center">
          <p className="text-[#52b788] text-sm font-semibold tracking-widest uppercase mb-3">PANDUAN PENDAKIAN</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Informasi Jalur Pendakian</h1>
          <p className="text-white/70 max-w-2xl mx-auto text-lg">
            Semua yang perlu kamu ketahui sebelum mendaki Gunung Lawu — jalur, syarat, perlengkapan, dan tarif.
          </p>
        </div>
      </section>

      {/* Jalur Cards */}
      <section className="py-20 bg-[#f8faf9]">
        <div className="container-lawu">
          <h2 className="text-3xl font-bold text-[#1a2e22] mb-10">Pilihan Jalur Pendakian</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {jalurDetail.map((jalur) => {
              const db = jalurDB.find((d) => d.slug === jalur.slug)
              const harga = db
                ? new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(db.harga_tiket)
                : '-'

              return (
                <div key={jalur.slug} id={jalur.slug} className="bg-white rounded-2xl overflow-hidden border border-[#e2ebe4] hover:shadow-lg transition-shadow duration-300">
                  <div className="relative h-48 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={jalur.image} alt={db?.nama ?? jalur.slug} className="w-full h-full object-cover" />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium">
                        {jalur.icon} {jalur.asal}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-xl font-bold text-[#1a2e22]">{db?.nama ?? jalur.slug}</h3>
                      {db && (
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          db.tingkat_kesulitan === 'sulit' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {db.tingkat_kesulitan.charAt(0).toUpperCase() + db.tingkat_kesulitan.slice(1)}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-3 text-xs text-[#6b7c70] mb-3">
                      <span>📍 {jalur.elevasi}</span>
                      <span>⏱ {db?.estimasi_waktu_jam} jam</span>
                      <span>📏 {db?.jarak_km} km</span>
                    </div>

                    <p className="text-[#6b7c70] text-sm mb-4">{jalur.highlight}</p>

                    {/* Pos */}
                    <div className="space-y-1 mb-4">
                      {jalur.pos.map((p, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-[#3a4f40]">
                          <div className="w-5 h-5 rounded-full bg-[#d8f3dc] flex items-center justify-center text-[#2d6a4f] font-bold shrink-0">
                            {i + 1}
                          </div>
                          {p}
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-[#e2ebe4] flex items-center justify-between">
                      <div>
                        <p className="text-xs text-[#6b7c70]">Harga tiket</p>
                        <p className="font-bold text-[#2d6a4f]">{harga}</p>
                      </div>
                      <Link
                        href="/pemesanan"
                        className="px-4 py-2 bg-[#2d6a4f] hover:bg-[#1a3a2a] text-white text-sm font-semibold rounded-lg transition-colors"
                      >
                        Pesan Sekarang
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Syarat & Perlengkapan */}
      <section className="py-20 bg-white">
        <div className="container-lawu">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Syarat */}
            <div>
              <h2 className="text-2xl font-bold text-[#1a2e22] mb-6">Syarat & Ketentuan</h2>
              <ul className="space-y-3">
                {syaratKetentuan.map((s, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#3a4f40]">
                    <div className="w-5 h-5 rounded-full bg-[#d8f3dc] flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-[#2d6a4f] text-xs">✓</span>
                    </div>
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            {/* Perlengkapan */}
            <div>
              <h2 className="text-2xl font-bold text-[#1a2e22] mb-6">Daftar Perlengkapan</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {perlengkapan.map((p) => (
                  <div key={p.nama} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
                    p.wajib ? 'bg-[#d8f3dc] text-[#1a3a2a]' : 'bg-[#f0f4f1] text-[#6b7c70]'
                  }`}>
                    <span>{p.wajib ? '✅' : '🔵'}</span>
                    <span>{p.nama}</span>
                    {p.wajib && <span className="ml-auto text-xs text-[#2d6a4f] font-semibold">Wajib</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-[#f8faf9]">
        <div className="container-lawu max-w-3xl">
          <h2 className="text-2xl font-bold text-[#1a2e22] mb-8">Pertanyaan Umum</h2>
          <div className="space-y-4">
            {faqList.map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-6 border border-[#e2ebe4]">
                <h3 className="font-semibold text-[#1a2e22] mb-2">{item.q}</h3>
                <p className="text-[#6b7c70] text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
