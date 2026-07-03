import type { Metadata } from 'next'
import Link from 'next/link'
import { createAdminClient } from '@/lib/supabase/admin'
import type { JalurRow } from '@/lib/types/shared.types'

export const metadata: Metadata = {
  title: 'LawuT — Pemesanan Tiket Pendakian Gunung Lawu',
  description: 'Platform resmi pemesanan tiket pendakian Gunung Lawu. Pilih jalur favoritmu, cek kuota, dan pesan tiket online dengan mudah.',
}

const jalurInfo = [
  {
    slug: 'cemoro-sewu',
    image: '/images/jalur%20c.sewu.jpg',
    tingkat: 'Menengah',
    tingkatColor: 'bg-amber-100 text-amber-700',
    estimasi: '± 6-7 Jam',
    description: 'Jalur favorit via Magetan dengan trek anak tangga batu yang tertata rapi. Cocok untuk pendaki pemula hingga profesional.',
  },
  {
    slug: 'cemoro-kandang',
    image: '/images/jalur%20c.kandang.jpg',
    tingkat: 'Menengah',
    tingkatColor: 'bg-amber-100 text-amber-700',
    estimasi: '± 8-9 Jam',
    description: 'Jalur via Karanganyar dengan medan tanah yang lebih landai namun berliku. Menyuguhkan pemandangan sabana yang luas.',
  },
  {
    slug: 'candi-cetho',
    image: '/images/jalur%20c.cetho.jpg',
    tingkat: 'Sulit',
    tingkatColor: 'bg-red-100 text-red-600',
    estimasi: '± 10-12 Jam',
    description: 'Jalur paling menantang dan mistis. Melewati situs sejarah Candi Cetho dan Candi Kethek dengan tanjakan yang ikonik.',
  },
]

const stats = [
  { value: '3', label: 'Jalur Pendakian' },
  { value: '3.265', label: 'Mdpl Puncak' },
  { value: '10K+', label: 'Pendaki Setahun' },
  { value: '99%', label: 'Kepuasan' },
]

async function getJalurList(): Promise<Pick<JalurRow, 'id' | 'nama' | 'slug' | 'harga_tiket' | 'tingkat_kesulitan' | 'estimasi_waktu_jam'>[]> {
  try {
    const supabase = createAdminClient()
    const { data } = await supabase
      .from('jalur')
      .select('id, nama, slug, harga_tiket, tingkat_kesulitan, estimasi_waktu_jam')
      .eq('is_active', true)
      .order('nama')
    return (data as Pick<JalurRow, 'id' | 'nama' | 'slug' | 'harga_tiket' | 'tingkat_kesulitan' | 'estimasi_waktu_jam'>[] | null) ?? []
  } catch {
    return []
  }
}

export default async function BerandaPage() {
  const jalurDB = await getJalurList()

  return (
    <div className="min-h-screen">
      {/* ── HERO ──────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/images/gununglawu.webp')`,
          }}
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />

        <div className="container-lawu relative z-10">
          <div className="max-w-2xl">
            <p className="text-[#52b788] text-sm font-semibold tracking-widest uppercase mb-4">
              MULAI PETUALANGANMU
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Destinasi Utama<br />Pendakian Lawu
            </h1>
            <p className="text-white/80 text-lg leading-relaxed mb-8 max-w-xl">
              Gunung Lawu memiliki karakteristik unik, mulai dari anak tangga batu yang tersusun rapi
              hingga pemandangan sabana yang menantang.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/pemesanan"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#52b788] hover:bg-[#74c69d] text-white font-semibold rounded-xl text-base transition-all duration-200 hover:shadow-xl hover:shadow-[#52b788]/30 hover:-translate-y-0.5"
              >
                Pesan Tiket Sekarang
                <span>→</span>
              </Link>
              <Link
                href="/informasi"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl text-base border border-white/30 backdrop-blur-sm transition-all duration-200"
              >
                Lihat Informasi Jalur
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50">
          <span className="text-xs">Scroll</span>
          <div className="w-0.5 h-8 bg-white/30 rounded-full animate-pulse" />
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────── */}
      <section className="bg-[#1a3a2a] py-10">
        <div className="container-lawu">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold text-[#52b788]">{stat.value}</p>
                <p className="text-white/60 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3 JALUR ───────────────────────────────────────── */}
      <section className="py-20 bg-[#f8faf9]">
        <div className="container-lawu">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[#52b788] text-sm font-semibold tracking-widest uppercase mb-2">
                PILIH RUTE TERBAIKMU
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1a2e22]">
                Jalur Utama Pendakian Lawu
              </h2>
              <p className="text-[#6b7c70] mt-3 max-w-xl">
                Setiap jalur memiliki karakteristik unik, mulai dari anak tangga batu yang tersusun rapi
                hingga pemandangan sabana yang menantang.
              </p>
            </div>
            <Link
              href="/informasi"
              className="hidden md:flex items-center gap-1 text-[#2d6a4f] font-semibold hover:text-[#52b788] transition-colors"
            >
              Lihat Semua Jalur <span>›</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {jalurInfo.map((jalur, i) => {
              const dbData = jalurDB.find((d) => d.slug === jalur.slug)
              const harga = dbData?.harga_tiket
                ? new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(dbData.harga_tiket)
                : null

              return (
                <div
                  key={jalur.slug}
                  className="bg-white rounded-2xl overflow-hidden border border-[#e2ebe4] hover:border-[#52b788]/50 hover:shadow-xl hover:shadow-[#52b788]/10 transition-all duration-300 hover:-translate-y-1 group"
                >
                  {/* Foto */}
                  <div className="relative h-52 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={jalur.image}
                      alt={`Jalur ${dbData?.nama ?? jalur.slug}`}
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${jalur.tingkatColor}`}>
                        {jalur.tingkat}
                      </span>
                      <span className="text-[#6b7c70] text-xs">{jalur.estimasi}</span>
                    </div>

                    <h3 className="text-xl font-bold text-[#1a2e22] mb-2">
                      {dbData?.nama ?? jalur.slug}
                    </h3>

                    <p className="text-[#6b7c70] text-sm leading-relaxed mb-4">
                      {jalur.description}
                    </p>

                    <div className="flex items-center justify-between pt-3 border-t border-[#e2ebe4]">
                      <span className="text-xs text-[#6b7c70] flex items-center gap-1">
                        {harga && <span className="text-[#2d6a4f] font-semibold">{harga}</span>}
                      </span>
                      <Link
                        href={`/informasi#${jalur.slug}`}
                        className="text-[#2d6a4f] font-semibold text-sm hover:text-[#52b788] transition-colors"
                      >
                        Detail Jalur
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── KENAPA MEMILIH KAMI ───────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="container-lawu">
          <div className="text-center mb-12">
            <p className="text-[#52b788] text-sm font-semibold tracking-widest uppercase mb-2">KEUNGGULAN</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1a2e22]">
              Kenapa Pesan di LawuT?
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '⚡', title: 'Cepat & Mudah', desc: 'Proses pemesanan hanya beberapa menit tanpa perlu datang ke basecamp.' },
              { icon: '🔒', title: 'Aman & Terpercaya', desc: 'Data pribadi kamu dijaga ketat. Sistem kami menggunakan enkripsi modern.' },
              { icon: '📋', title: 'Transparan', desc: 'Kuota dan harga tiket ditampilkan secara real-time, tanpa biaya tersembunyi.' },
              { icon: '💬', title: 'Dukungan WhatsApp', desc: 'Konfirmasi pembayaran langsung lewat WhatsApp dengan admin kami yang responsif.' },
            ].map((item) => (
              <div key={item.title} className="p-6 rounded-2xl border border-[#e2ebe4] hover:border-[#52b788]/50 hover:bg-[#f8faf9] transition-all duration-200">
                <h3 className="font-bold text-[#1a2e22] mb-2">{item.title}</h3>
                <p className="text-[#6b7c70] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ────────────────────────────────────── */}
      <section className="py-20 bg-[#1a3a2a] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=60')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="container-lawu relative z-10 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Siap Menaklukkan Puncak Lawu?
          </h2>
          <p className="text-white/70 mb-8 max-w-lg mx-auto">
            Pesan tiket sekarang dan pastikan tempat kamu sebelum kuota habis.
          </p>
          <Link
            href="/pemesanan"
            className="inline-flex items-center gap-2 px-10 py-4 bg-[#52b788] hover:bg-[#74c69d] text-white font-bold rounded-xl text-lg transition-all duration-200 hover:shadow-xl hover:shadow-[#52b788]/30 hover:-translate-y-0.5"
          >
            Pesan Tiket Sekarang →
          </Link>
        </div>
      </section>
    </div>
  )
}
