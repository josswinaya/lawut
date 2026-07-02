'use client'

import { useState } from 'react'
import { generateWhatsAppLink } from '@/lib/services/whatsapp.service'

type StatusResult = {
  kode_booking: string
  nama_jalur: string
  tanggal: string
  jumlah_pendaki: number
  total_biaya: number
  status: 'menunggu_konfirmasi' | 'terkonfirmasi' | 'dibatalkan' | 'selesai'
  catatan_admin: string | null
}

const statusConfig = {
  menunggu_konfirmasi: { label: 'Menunggu Konfirmasi', icon: '⏳', color: 'bg-amber-100 text-amber-700 border-amber-200' },
  terkonfirmasi: { label: 'Terkonfirmasi', icon: '✅', color: 'bg-green-100 text-green-700 border-green-200' },
  dibatalkan: { label: 'Dibatalkan', icon: '❌', color: 'bg-red-100 text-red-700 border-red-200' },
  selesai: { label: 'Selesai', icon: '🏆', color: 'bg-blue-100 text-blue-700 border-blue-200' },
}

export default function CekStatusForm() {
  const [kodeBooking, setKodeBooking] = useState('')
  const [noHp, setNoHp] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<StatusResult | null>(null)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!kodeBooking.trim() || !noHp.trim()) return

    setLoading(true)
    setError('')
    setResult(null)

    try {
      const res = await fetch('/api/cek-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kode_booking: kodeBooking, no_hp: noHp }),
      })
      const json = await res.json()
      if (json.success) {
        setResult(json.data)
      } else {
        setError(json.error?.message ?? 'Data tidak ditemukan.')
      }
    } catch {
      setError('Terjadi kesalahan. Silakan coba lagi.')
    } finally {
      setLoading(false)
    }
  }

  const tanggalFormatted = (tgl: string) =>
    new Date(tgl).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })

  const hargaFormatted = (n: number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(n)

  return (
    <div className="space-y-6">
      {/* Form */}
      <form id="cek-status-form" onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[#1a2e22] mb-1">
            Kode Booking <span className="text-red-500">*</span>
          </label>
          <input
            id="cek-kode-booking"
            value={kodeBooking}
            onChange={(e) => setKodeBooking(e.target.value.toUpperCase())}
            placeholder="Contoh: LAWU-20260702-001"
            className="w-full px-4 py-2.5 rounded-lg border border-[#e2ebe4] bg-[#f8faf9] text-[#1a2e22] text-sm placeholder-[#aab5ad] focus:outline-none focus:ring-2 focus:ring-[#52b788] focus:border-transparent font-mono"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#1a2e22] mb-1">
            Nomor HP Pemesan <span className="text-red-500">*</span>
          </label>
          <input
            id="cek-no-hp"
            value={noHp}
            onChange={(e) => setNoHp(e.target.value)}
            placeholder="Nomor HP yang digunakan saat memesan"
            className="w-full px-4 py-2.5 rounded-lg border border-[#e2ebe4] bg-[#f8faf9] text-[#1a2e22] text-sm placeholder-[#aab5ad] focus:outline-none focus:ring-2 focus:ring-[#52b788] focus:border-transparent"
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <button
          id="cek-status-submit"
          type="submit"
          disabled={loading || !kodeBooking || !noHp}
          className="w-full py-3 bg-[#2d6a4f] hover:bg-[#1a3a2a] text-white font-semibold rounded-xl transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? 'Mencari...' : 'Cek Status Pemesanan'}
        </button>
      </form>

      {/* Result */}
      {result && (() => {
        const cfg = statusConfig[result.status]
        const waLink = result.status === 'menunggu_konfirmasi'
          ? generateWhatsAppLink({
              kode_booking: result.kode_booking,
              nama_pemesan: '',
              jalur_nama: result.nama_jalur,
              tanggal: result.tanggal,
              jumlah_pendaki: result.jumlah_pendaki,
              total_biaya: result.total_biaya,
            })
          : null

        return (
          <div className="border border-[#e2ebe4] rounded-xl overflow-hidden">
            {/* Status header */}
            <div className={`px-6 py-4 border-b ${cfg.color.includes('amber') ? 'bg-amber-50 border-amber-200' : cfg.color.includes('green') ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
              <div className="flex items-center gap-3">
                <span className="text-2xl">{cfg.icon}</span>
                <div>
                  <p className="text-xs text-[#6b7c70]">Status Pemesanan</p>
                  <p className={`font-bold text-lg ${cfg.color.includes('amber') ? 'text-amber-700' : cfg.color.includes('green') ? 'text-green-700' : 'text-red-700'}`}>
                    {cfg.label}
                  </p>
                </div>
              </div>
            </div>

            {/* Detail */}
            <div className="p-6 space-y-3 bg-white">
              <div className="font-mono text-xs text-[#6b7c70] bg-[#f8faf9] px-3 py-2 rounded-lg">
                Kode Booking: <span className="font-bold text-[#1a2e22]">{result.kode_booking}</span>
              </div>
              {[
                { label: 'Jalur', value: result.nama_jalur },
                { label: 'Tanggal Pendakian', value: tanggalFormatted(result.tanggal) },
                { label: 'Jumlah Pendaki', value: `${result.jumlah_pendaki} orang` },
                { label: 'Total Biaya', value: hargaFormatted(result.total_biaya) },
              ].map((item) => (
                <div key={item.label} className="flex justify-between text-sm">
                  <span className="text-[#6b7c70]">{item.label}</span>
                  <span className="font-medium text-[#1a2e22]">{item.value}</span>
                </div>
              ))}

              {result.catatan_admin && (
                <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-xs text-red-600 font-semibold mb-1">Catatan Admin:</p>
                  <p className="text-sm text-red-700">{result.catatan_admin}</p>
                </div>
              )}
            </div>

            {/* Actions */}
            {waLink && (
              <div className="px-6 pb-6 bg-white">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="cek-status-wa-button"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-[#25D366] hover:bg-[#1ebe57] text-white font-semibold rounded-xl transition-colors text-sm"
                >
                  💬 Konfirmasi Pembayaran via WhatsApp
                </a>
                <p className="text-xs text-center text-[#6b7c70] mt-2">
                  Klik untuk melanjutkan konfirmasi pembayaran ke admin
                </p>
              </div>
            )}
          </div>
        )
      })()}
    </div>
  )
}
