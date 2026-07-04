import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Tentang Kami',
  description: 'Mengenal lebih dekat LawuT - platform resmi pemesanan tiket pendakian Gunung Lawu yang dikelola langsung oleh pengelola basecamp.',
}

const values = [
  {
    title: 'Safety First',
    desc: 'Keselamatan pendaki adalah prioritas utama kami. Setiap pemesanan dicatat dan dipantau untuk memastikan semua pendaki kembali dengan selamat.',
  },
  {
    title: 'Sustainability',
    desc: 'Kami berkomitmen pada pendakian yang bertanggung jawab dan ramah lingkungan. Kuota harian dijaga ketat untuk menjaga ekosistem Gunung Lawu.',
  },
  {
    title: 'Resilience',
    desc: 'Kami mempersiapkan kamu untuk menghadapi alam yang tidak terduga, membangun kesiapan fisik dan mental untuk pendakian yang sukses.',
  },
  {
    title: 'Community',
    desc: 'Kami percaya bahwa mendaki bukan hanya soal puncak, tetapi juga tentang membangun komunitas yang saling mendukung.',
  },
]

export default function TentangKamiPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative py-24 bg-[#1a3a2a] overflow-hidden">
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: "url('/images/bg_lawu.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="container-lawu relative z-10 text-center">
          <p className="text-[#52b788] text-sm font-semibold tracking-widest uppercase mb-3">MENGENAL KAMI</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Tentang LawuT</h1>
          <p className="text-white/70 max-w-xl mx-auto text-lg">
            Platform resmi yang dikelola langsung oleh pengelola basecamp pendakian Gunung Lawu.
          </p>
        </div>
      </section>

      {/* Sejarah & Visi */}
      <section className="py-20 bg-[#f8faf9]">
        <div className="container-lawu">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[#52b788] text-sm font-semibold tracking-widest uppercase mb-3">SIAPA KAMI</p>
              <h2 className="text-3xl font-bold text-[#1a2e22] mb-6">Dibangun oleh Pengelola Basecamp</h2>
              <p className="text-[#6b7c70] leading-relaxed mb-4">
                LawuT adalah platform digital yang diinisiasi oleh pengelola basecamp pendakian Gunung Lawu
                untuk mengatasi masalah pendaftaran manual yang selama ini menyebabkan antrean panjang
                dan kesulitan pencatatan data pendaki.
              </p>
              <p className="text-[#6b7c70] leading-relaxed mb-4">
                Sejak diluncurkan, kami telah membantu ribuan pendaki dari seluruh Indonesia untuk
                memesan tiket dengan mudah, cepat, dan transparan.
              </p>
              <p className="text-[#6b7c70] leading-relaxed">
                Kami bekerja sama langsung dengan Taman Nasional Gunung Lawu (TNGL) untuk memastikan
                kuota pendakian terkontrol demi menjaga kelestarian alam.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { val: '2026', label: 'Tahun Berdiri' },
                { val: '10.000+', label: 'Tiket Terproses' },
                { val: '3', label: 'Jalur Aktif' },
                { val: '99%', label: 'Kepuasan Pendaki' },
              ].map((s) => (
                <div key={s.label} className="bg-white p-6 rounded-2xl border border-[#e2ebe4] text-center">
                  <p className="text-3xl font-bold text-[#2d6a4f]">{s.val}</p>
                  <p className="text-[#6b7c70] text-sm mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Visi & Misi */}
      <section className="py-20 bg-white">
        <div className="container-lawu max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 bg-[#1a3a2a] rounded-2xl text-white">
              <h3 className="text-xl font-bold mb-3">Visi</h3>
              <p className="text-white/80 leading-relaxed">
                Menjadi platform pemesanan tiket pendakian gunung terpercaya di Indonesia,
                mengedepankan keselamatan, kemudahan, dan kelestarian alam.
              </p>
            </div>
            <div className="p-8 bg-[#f0f4f1] rounded-2xl">
              <h3 className="text-xl font-bold text-[#1a2e22] mb-3">Misi</h3>
              <ul className="space-y-2 text-[#6b7c70] text-sm">
                <li className="flex items-start gap-2"><span className="text-[#52b788]">✓</span> Menyederhanakan proses pendaftaran pendakian</li>
                <li className="flex items-start gap-2"><span className="text-[#52b788]">✓</span> Memastikan data pendaki tercatat secara digital</li>
                <li className="flex items-start gap-2"><span className="text-[#52b788]">✓</span> Menjaga kuota demi kelestarian Gunung Lawu</li>
                <li className="flex items-start gap-2"><span className="text-[#52b788]">✓</span> Memfasilitasi komunikasi pendaki dan pengelola</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Nilai-nilai */}
      <section className="py-20 bg-[#f8faf9]">
        <div className="container-lawu">
          <div className="text-center mb-12">
            <p className="text-[#52b788] text-sm font-semibold tracking-widest uppercase mb-2">NILAI KAMI</p>
            <h2 className="text-3xl font-bold text-[#1a2e22]">Yang Kami Junjung Tinggi</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-white p-6 rounded-2xl border border-[#e2ebe4] text-center hover:shadow-md transition-shadow">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="w-5 h-5 rounded-full bg-[#52b788] flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <h3 className="font-bold text-[#1a2e22]">{v.title}</h3>
                </div>
                <p className="text-[#6b7c70] text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* CTA */}
      <section className="py-16 bg-[#1a3a2a] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "url('/images/bg_lawu.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="container-lawu relative z-10 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Siap Memulai Petualangan?</h2>
          <p className="text-white/70 mb-6">Pesan tiket sekarang dan buat kenangan tak terlupakan di puncak Gunung Lawu.</p>
          <Link href="/pemesanan" className="inline-flex items-center gap-2 px-8 py-3 bg-[#52b788] hover:bg-[#74c69d] text-white font-semibold rounded-xl transition-all">
            Pesan Tiket →
          </Link>
        </div>
      </section>
    </div>
  )
}
