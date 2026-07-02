import type { Metadata } from 'next'
import CekStatusForm from '@/components/forms/CekStatusForm'

export const metadata: Metadata = {
  title: 'Cek Status Pemesanan',
  description: 'Cek status pemesanan tiket pendakian Gunung Lawu menggunakan kode booking dan nomor HP.',
}

export default function CekStatusPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative py-24 bg-[#1a3a2a] overflow-hidden">
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=60')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="container-lawu relative z-10 text-center">
          <p className="text-[#52b788] text-sm font-semibold tracking-widest uppercase mb-3">PANTAU PESANANMU</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Cek Status Pemesanan</h1>
          <p className="text-white/70 max-w-lg mx-auto text-lg">
            Masukkan kode booking dan nomor HP untuk melihat status terkini pemesanan tiket kamu.
          </p>
        </div>
      </section>

      <section className="py-20 bg-[#f8faf9]">
        <div className="container-lawu max-w-2xl">
          <div className="bg-white rounded-2xl border border-[#e2ebe4] p-8 shadow-sm">
            <h2 className="text-xl font-bold text-[#1a2e22] mb-6">Masukkan Data Pemesanan</h2>
            <CekStatusForm />
          </div>

          {/* Info */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: '⏳', label: 'Menunggu Konfirmasi', desc: 'Pemesanan diterima, menunggu verifikasi pembayaran oleh admin.' },
              { icon: '✅', label: 'Terkonfirmasi', desc: 'Pembayaran diverifikasi. E-tiket siap diunduh.' },
              { icon: '❌', label: 'Dibatalkan', desc: 'Pemesanan dibatalkan. Hubungi admin untuk info lebih lanjut.' },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-xl border border-[#e2ebe4] p-4 text-center">
                <div className="text-2xl mb-2">{s.icon}</div>
                <p className="font-semibold text-[#1a2e22] text-sm">{s.label}</p>
                <p className="text-[#6b7c70] text-xs mt-1 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
