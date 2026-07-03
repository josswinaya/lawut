import type { Metadata } from 'next'
import BantuanForm from '@/components/forms/BantuanForm'

export const metadata: Metadata = {
  title: 'Pusat Bantuan',
  description: 'Hubungi tim LawuT untuk pertanyaan, kendala pemesanan, atau bantuan darurat. Tersedia via WhatsApp dan email.',
}

const kontak = [
  {
    type: 'darurat',
    icon: '🚨',
    label: 'HOTLINE DARURAT 24/7',
    value: '112',
    desc: 'Hanya untuk kondisi darurat medis atau evakuasi di jalur pendakian.',
    bg: 'bg-red-50 border-red-200',
    iconBg: 'bg-red-500',
    textColor: 'text-red-700',
    href: 'tel:112',
  },
  {
    type: 'wa',
    icon: '💬',
    label: 'LAYANAN PELANGGAN',
    value: 'WhatsApp Kami',
    desc: 'Senin – Minggu, 08:00 – 20:00 WIB',
    bg: 'bg-[#f0f4f1] border-[#e2ebe4]',
    iconBg: 'bg-[#2d6a4f]',
    textColor: 'text-[#1a2e22]',
    href: `https://wa.me/${process.env.NEXT_PUBLIC_WA_ADMIN_NUMBER ?? '62XXXXXXXXXX'}`,
  },
  {
    type: 'email',
    icon: '✉️',
    label: 'PERTANYAAN UMUM & KERJASAMA',
    value: 'support@gununglawu.id',
    desc: 'Balasan dalam 1×24 jam kerja.',
    bg: 'bg-[#f0f4f1] border-[#e2ebe4]',
    iconBg: 'bg-[#2d6a4f]',
    textColor: 'text-[#1a2e22]',
    href: 'mailto:support@gununglawu.id',
  },
]

const faqList = [
  { q: 'Bagaimana cara memesan tiket pendakian?', a: 'Buka halaman Pemesanan, pilih jalur dan tanggal, isi data diri pendaki, lalu klik "Lanjutkan ke Pembayaran". Setelah muncul kode booking, klik tombol "Bayar via WhatsApp" untuk konfirmasi pembayaran ke admin.' },
  { q: 'Apakah ada pengembalian dana (Refund)?', a: 'Pembatalan pemesanan dapat dilakukan dengan menghubungi admin melalui WhatsApp. Kebijakan refund tergantung pada H- berapa pembatalan dilakukan.' },
  { q: 'Perlengkapan cuaca apa yang wajib dibawa?', a: 'Wajib membawa jaket tebal, jas hujan, dan alas kaki yang sesuai. Gunung Lawu memiliki suhu yang bisa turun drastis, terutama di malam hari.' },
  { q: 'Apakah ada layanan porter tersedia?', a: 'Tersedia layanan porter lokal yang bisa dipesan langsung di basecamp. Hubungi kami melalui WhatsApp untuk informasi harga dan ketersediaan.' },
  { q: 'Berapa lama proses konfirmasi pembayaran?', a: 'Konfirmasi pembayaran oleh admin biasanya dilakukan dalam 1-3 jam pada hari kerja (08:00–20:00 WIB). Kamu bisa cek status di halaman Cek Status Pemesanan.' },
]

const posKontak = [
  { nama: 'Basecamp Cemoro Sewu', telp: '+62 812-3456-7890', jam: '05:00 – 22:00 WIB' },
  { nama: 'Basecamp Cemoro Kandang', telp: '+62 812-9876-5432', jam: '05:00 – 22:00 WIB' },
  { nama: 'Basecamp Candi Cetho', telp: '+62 813-1122-3344', jam: '06:00 – 20:00 WIB' },
  { nama: 'Layanan Darurat Nasional', telp: '112', jam: '24 jam' },
]

export default function BantuanPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative py-24 bg-[#1a3a2a] overflow-hidden">
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: "url('/images/bg%20lawu.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="container-lawu relative z-10 text-center">
          <p className="text-[#52b788] text-sm font-semibold tracking-widest uppercase mb-3">BANTUAN & DUKUNGAN</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Pusat Bantuan</h1>
          <p className="text-white/70 max-w-xl mx-auto text-lg">
            Tim kami siap membantu kamu — baik untuk pertanyaan pemesanan maupun bantuan darurat di jalur.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-[#f8faf9]">
        <div className="container-lawu">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Kiri — FAQ + Form */}
            <div className="lg:col-span-3 space-y-10">
              {/* FAQ */}
              <div>
                <h2 className="text-2xl font-bold text-[#1a2e22] mb-6">Pertanyaan Umum (FAQ)</h2>
                <div className="space-y-3">
                  {faqList.map((item, i) => (
                    <details key={i} className="group bg-white rounded-xl border border-[#e2ebe4] overflow-hidden">
                      <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                        <span className="font-medium text-[#1a2e22] text-sm pr-4">{item.q}</span>
                        <span className="text-[#6b7c70] transition-transform group-open:rotate-180 shrink-0">▾</span>
                      </summary>
                      <div className="px-5 pb-5">
                        <p className="text-[#6b7c70] text-sm leading-relaxed">{item.a}</p>
                      </div>
                    </details>
                  ))}
                </div>
              </div>

              {/* Form Kontak */}
              <div>
                <h2 className="text-2xl font-bold text-[#1a2e22] mb-2">Kirim Pesan</h2>
                <p className="text-[#6b7c70] text-sm mb-6">Punya pertanyaan lain? Kirim pesan dan kami akan balas dalam 1×24 jam.</p>
                <BantuanForm />
              </div>
            </div>

            {/* Kanan — Kontak */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-2xl font-bold text-[#1a2e22]">Hubungi Kami Langsung</h2>
              
              {kontak.map((k) => (
                <div key={k.type} className={`p-5 rounded-xl border ${k.bg}`}>
                  <div className="flex gap-4">
                    <div>
                      <p className={`text-xs font-semibold tracking-widest uppercase ${k.type === 'darurat' ? 'text-red-500' : 'text-[#52b788]'} mb-1`}>
                        {k.label}
                      </p>
                      {k.href ? (
                        <a href={k.href} className={`font-bold text-lg ${k.textColor} hover:underline`}>
                          {k.value}
                        </a>
                      ) : (
                        <p className={`font-bold text-lg ${k.textColor}`}>{k.value}</p>
                      )}
                      <p className="text-xs text-[#6b7c70] mt-1">{k.desc}</p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Jam Operasional */}
              <div className="bg-white rounded-xl border border-[#e2ebe4] p-5">
                <h3 className="font-bold text-[#1a2e22] mb-3">Jam Operasional</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#6b7c70]">Senin – Jumat</span>
                    <span className="text-[#1a2e22] font-medium">08:00 – 20:00 WIB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6b7c70]">Sabtu – Minggu</span>
                    <span className="text-[#1a2e22] font-medium">07:00 – 21:00 WIB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6b7c70]">Darurat</span>
                    <span className="text-red-600 font-medium">24 Jam</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Kontak per Basecamp */}
      <section className="py-16 bg-white">
        <div className="container-lawu">
          <h2 className="text-2xl font-bold text-[#1a2e22] mb-8">Kontak per Basecamp</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {posKontak.map((p) => (
              <div key={p.nama} className="p-5 rounded-xl border border-[#e2ebe4] bg-[#f8faf9]">
                <p className="font-semibold text-[#1a2e22] text-sm mb-1">{p.nama}</p>
                <a href={`tel:${p.telp.replace(/\s/g, '')}`} className="text-[#2d6a4f] font-bold text-base hover:underline block">
                  {p.telp}
                </a>
                <p className="text-xs text-[#6b7c70] mt-1">{p.jam}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
