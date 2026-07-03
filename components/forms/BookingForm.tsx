'use client'

import { useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { pemesananSchema, type PemesananFormValues } from '@/lib/validations/pemesanan.schema'
import { generateWhatsAppLink } from '@/lib/services/whatsapp.service'

type Jalur = {
  id: string
  nama: string
  slug: string
  harga_tiket: number
  tingkat_kesulitan: string
  estimasi_waktu_jam: number | null
  jarak_km: number | null
  kuota_harian_default: number
}

type BookingResult = {
  id: string
  kode_booking: string
  nama_pemesan: string
  jalur_nama: string
  tanggal: string
  jumlah_pendaki: number
  total_biaya: number
  no_hp_pemesan: string
}

const STEPS = ['Pilih Jalur & Tanggal', 'Jalur & Data Diri', 'Konfirmasi & Pembayaran']

export default function BookingForm({ jalurList, initialJalurId }: { jalurList: Jalur[], initialJalurId?: string }) {
  const [step, setStep] = useState(0)
  const [selectedJalur, setSelectedJalur] = useState<Jalur | null>(
    initialJalurId ? jalurList.find(j => j.id === initialJalurId) || null : null
  )
  const [bookingResult, setBookingResult] = useState<BookingResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState('')

  const today = new Date().toISOString().split('T')[0]

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    trigger,
  } = useForm<PemesananFormValues>({
    resolver: zodResolver(pemesananSchema),
    defaultValues: {
      jalur_id: initialJalurId,
      jumlah_pendaki: 1,
      pendaki: [{ nama: '', nik: '', no_hp: '', kontak_darurat: '' }],
    },
  })

  const { fields, append, remove } = useFieldArray({ control, name: 'pendaki' })

  const jumlahPendaki = watch('jumlah_pendaki')
  const jalurId = watch('jalur_id')
  const tanggal = watch('tanggal')

  // Sinkronkan jumlah pendaki dengan array fields
  const handleJumlahChange = (val: number) => {
    const n = Math.max(1, Math.min(20, val))
    setValue('jumlah_pendaki', n)
    const current = fields.length
    if (n > current) {
      for (let i = 0; i < n - current; i++)
        append({ nama: '', nik: '', no_hp: '', kontak_darurat: '' })
    } else {
      for (let i = current - 1; i >= n; i--) remove(i)
    }
  }

  const totalBiaya = selectedJalur ? selectedJalur.harga_tiket * (jumlahPendaki || 1) : 0

  const hargaFmt = (n: number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(n)

  const tanggalFmt = (t: string) =>
    new Date(t).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })

  // Step 1 → 2
  const goToStep2 = async () => {
    const valid = await trigger(['jalur_id', 'tanggal', 'nama_pemesan', 'no_hp_pemesan'])
    if (valid) setStep(1)
  }

  // Step 2 → 3
  const goToStep3 = async () => {
    const valid = await trigger(['pendaki'])
    if (valid) setStep(2)
  }

  const onSubmit = async (data: PemesananFormValues) => {
    setLoading(true)
    setServerError('')
    try {
      const res = await fetch('/api/pemesanan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, total_biaya: totalBiaya }),
      })
      const json = await res.json()
      if (json.success) {
        setBookingResult(json.data)
        setStep(3)
      } else {
        setServerError(json.error?.message ?? 'Gagal membuat pemesanan.')
      }
    } catch {
      setServerError('Terjadi kesalahan. Silakan coba lagi.')
    } finally {
      setLoading(false)
    }
  }

  const inputClass = 'w-full px-4 py-2.5 rounded-lg border border-[#e2ebe4] bg-white text-[#1a2e22] text-sm placeholder-[#aab5ad] focus:outline-none focus:ring-2 focus:ring-[#52b788] focus:border-transparent'
  const labelClass = 'block text-sm font-medium text-[#1a2e22] mb-1'
  const errClass = 'text-red-500 text-xs mt-1'

  // ── SUKSES ──────────────────────────────────────────────────────────────
  if (step === 3 && bookingResult) {
    const waLink = generateWhatsAppLink({
      kode_booking: bookingResult.kode_booking,
      nama_pemesan: bookingResult.nama_pemesan,
      jalur_nama: bookingResult.jalur_nama,
      tanggal: bookingResult.tanggal,
      jumlah_pendaki: bookingResult.jumlah_pendaki,
      total_biaya: bookingResult.total_biaya,
    })

    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl border border-[#e2ebe4] overflow-hidden shadow-sm">
          {/* Header sukses */}
          <div className="bg-[#d8f3dc] p-8 text-center border-b border-[#b7e4c7]">
            <div className="w-16 h-16 bg-[#52b788] rounded-full flex items-center justify-center text-white text-3xl mx-auto mb-4">✓</div>
            <h2 className="text-2xl font-bold text-[#1a3a2a]">Pemesanan Berhasil!</h2>
            <p className="text-[#2d6a4f] mt-2">Kode booking kamu sudah dibuat. Lanjutkan konfirmasi pembayaran via WhatsApp.</p>
          </div>

          {/* Detail */}
          <div className="p-8">
            <div className="bg-[#f8faf9] rounded-xl p-4 font-mono text-center mb-6">
              <p className="text-xs text-[#6b7c70] mb-1">Kode Booking</p>
              <p className="text-2xl font-bold text-[#1a3a2a] tracking-widest">{bookingResult.kode_booking}</p>
            </div>

            <div className="space-y-3 text-sm mb-6">
              {[
                { label: 'Nama Pemesan', value: bookingResult.nama_pemesan },
                { label: 'Jalur', value: bookingResult.jalur_nama },
                { label: 'Tanggal', value: tanggalFmt(bookingResult.tanggal) },
                { label: 'Jumlah Pendaki', value: `${bookingResult.jumlah_pendaki} orang` },
                { label: 'Total Biaya', value: hargaFmt(bookingResult.total_biaya) },
              ].map((item) => (
                <div key={item.label} className="flex justify-between">
                  <span className="text-[#6b7c70]">{item.label}</span>
                  <span className="font-semibold text-[#1a2e22]">{item.value}</span>
                </div>
              ))}
            </div>

            <a
              id="booking-wa-button"
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-4 bg-[#25D366] hover:bg-[#1ebe57] text-white font-bold rounded-xl text-lg transition-colors shadow-lg shadow-[#25D366]/30"
            >
              💬 Bayar via WhatsApp
            </a>
            <p className="text-xs text-center text-[#6b7c70] mt-3">
              Klik tombol di atas untuk membuka WhatsApp dengan pesan yang sudah terisi otomatis
            </p>

            <div className="mt-6 pt-6 border-t border-[#e2ebe4] text-center">
              <a href="/cek-status" className="text-[#2d6a4f] font-semibold text-sm hover:underline">
                Pantau status pemesanan →
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Step indicator */}
      <div className="flex items-center justify-center gap-0 mb-10">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center">
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                i < step ? 'bg-[#52b788] text-white' : i === step ? 'bg-[#1a3a2a] text-white' : 'bg-[#e2ebe4] text-[#6b7c70]'
              }`}>
                {i < step ? '✓' : i + 1}
              </div>
              <span className={`text-xs mt-1.5 hidden sm:block ${i === step ? 'text-[#1a2e22] font-medium' : 'text-[#6b7c70]'}`}>
                {s}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`h-0.5 w-16 sm:w-24 mx-2 mb-4 transition-colors ${i < step ? 'bg-[#52b788]' : 'bg-[#e2ebe4]'}`} />
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form utama */}
          <div className="lg:col-span-2">
            {/* ── STEP 0: Pilih Jalur & Tanggal ── */}
            {step === 0 && (
              <div className="bg-white rounded-2xl border border-[#e2ebe4] p-6 shadow-sm space-y-6">
                <h2 className="text-xl font-bold text-[#1a2e22]">Pilih Rombongan & Jalur</h2>

                {/* Jalur */}
                <div>
                  <label className={labelClass}>Pilih Jalur Pendakian <span className="text-red-500">*</span></label>
                  <div className="space-y-3">
                    {jalurList.map((jalur) => (
                      <label
                        key={jalur.id}
                        className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          jalurId === jalur.id
                            ? 'border-[#2d6a4f] bg-[#f0f4f1]'
                            : 'border-[#e2ebe4] hover:border-[#52b788]/50'
                        }`}
                      >
                        <input
                          type="radio"
                          value={jalur.id}
                          {...register('jalur_id')}
                          onChange={() => {
                            setValue('jalur_id', jalur.id)
                            setSelectedJalur(jalur)
                          }}
                          className="sr-only"
                        />
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${jalurId === jalur.id ? 'border-[#2d6a4f]' : 'border-[#e2ebe4]'}`}>
                          {jalurId === jalur.id && <div className="w-3 h-3 rounded-full bg-[#2d6a4f]" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-[#1a2e22]">{jalur.nama}</span>
                            <span className="font-bold text-[#2d6a4f]">{hargaFmt(jalur.harga_tiket)}/orang</span>
                          </div>
                          <p className="text-xs text-[#6b7c70] mt-0.5">
                            {jalur.estimasi_waktu_jam} jam · {jalur.jarak_km} km · Elevasi: {jalur.slug === 'cemoro-sewu' ? '1.900' : jalur.slug === 'cemoro-kandang' ? '1.820' : '1.495'} mdpl
                          </p>
                        </div>
                      </label>
                    ))}
                  </div>
                  {errors.jalur_id && <p className={errClass}>{errors.jalur_id.message}</p>}
                </div>

                {/* Tanggal */}
                <div>
                  <label htmlFor="tanggal-pendakian" className={labelClass}>
                    Tanggal Pendakian <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="tanggal-pendakian"
                    type="date"
                    min={today}
                    {...register('tanggal')}
                    className={inputClass}
                  />
                  {errors.tanggal && <p className={errClass}>{errors.tanggal.message}</p>}
                </div>

                {/* Jumlah Pendaki */}
                <div>
                  <label htmlFor="jumlah-pendaki" className={labelClass}>
                    Jumlah Pendaki <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleJumlahChange((jumlahPendaki || 1) - 1)}
                      className="w-10 h-10 rounded-lg border border-[#e2ebe4] bg-white text-[#1a2e22] font-bold text-lg hover:border-[#52b788] transition-colors"
                    >−</button>
                    <input
                      id="jumlah-pendaki"
                      type="number"
                      min={1}
                      max={20}
                      {...register('jumlah_pendaki', { valueAsNumber: true })}
                      onChange={(e) => handleJumlahChange(parseInt(e.target.value) || 1)}
                      className="w-20 text-center px-3 py-2.5 rounded-lg border border-[#e2ebe4] bg-white text-[#1a2e22] font-semibold focus:outline-none focus:ring-2 focus:ring-[#52b788]"
                    />
                    <button
                      type="button"
                      onClick={() => handleJumlahChange((jumlahPendaki || 1) + 1)}
                      className="w-10 h-10 rounded-lg border border-[#e2ebe4] bg-white text-[#1a2e22] font-bold text-lg hover:border-[#52b788] transition-colors"
                    >+</button>
                    <span className="text-sm text-[#6b7c70]">orang (maks. 20)</span>
                  </div>
                  {errors.jumlah_pendaki && <p className={errClass}>{errors.jumlah_pendaki.message}</p>}
                </div>

                {/* Data Pemesan */}
                <div className="border-t border-[#e2ebe4] pt-6">
                  <h3 className="font-semibold text-[#1a2e22] mb-4">Data Pemesan (Penanggungjawab)</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="nama-pemesan" className={labelClass}>Nama Lengkap <span className="text-red-500">*</span></label>
                      <input id="nama-pemesan" {...register('nama_pemesan')} placeholder="Sesuai KTP" className={inputClass} />
                      {errors.nama_pemesan && <p className={errClass}>{errors.nama_pemesan.message}</p>}
                    </div>
                    <div>
                      <label htmlFor="no-hp-pemesan" className={labelClass}>Nomor HP/WhatsApp <span className="text-red-500">*</span></label>
                      <input id="no-hp-pemesan" {...register('no_hp_pemesan')} placeholder="08XXXXXXXXXX" className={inputClass} />
                      {errors.no_hp_pemesan && <p className={errClass}>{errors.no_hp_pemesan.message}</p>}
                    </div>
                  </div>
                </div>

                <button
                  id="next-to-step2"
                  type="button"
                  onClick={goToStep2}
                  className="w-full py-3 bg-[#2d6a4f] hover:bg-[#1a3a2a] text-white font-semibold rounded-xl transition-colors"
                >
                  Lanjutkan ke Data Pendaki →
                </button>
              </div>
            )}

            {/* ── STEP 1: Data Pendaki ── */}
            {step === 1 && (
              <div className="bg-white rounded-2xl border border-[#e2ebe4] p-6 shadow-sm space-y-6">
                <h2 className="text-xl font-bold text-[#1a2e22]">Data Setiap Pendaki</h2>
                <p className="text-sm text-[#6b7c70] -mt-4">Isi data lengkap untuk semua {jumlahPendaki} pendaki.</p>

                {fields.map((field, i) => (
                  <div key={field.id} className="border border-[#e2ebe4] rounded-xl p-5 space-y-4">
                    <h3 className="font-semibold text-[#1a2e22] flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#d8f3dc] text-[#2d6a4f] text-xs font-bold flex items-center justify-center">
                        {i + 1}
                      </span>
                      Pendaki ke-{i + 1}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>Nama Lengkap (KTP) <span className="text-red-500">*</span></label>
                        <input
                          {...register(`pendaki.${i}.nama`)}
                          placeholder="Nama Lengkap"
                          className={inputClass}
                        />
                        {errors.pendaki?.[i]?.nama && <p className={errClass}>{errors.pendaki[i].nama?.message}</p>}
                      </div>
                      <div>
                        <label className={labelClass}>NIK (16 digit) <span className="text-red-500">*</span></label>
                        <input
                          {...register(`pendaki.${i}.nik`)}
                          placeholder="Nomor Induk Kependudukan"
                          maxLength={16}
                          className={inputClass}
                        />
                        {errors.pendaki?.[i]?.nik && <p className={errClass}>{errors.pendaki[i].nik?.message}</p>}
                      </div>
                      <div>
                        <label className={labelClass}>No. HP <span className="text-red-500">*</span></label>
                        <input
                          {...register(`pendaki.${i}.no_hp`)}
                          placeholder="08XXXXXXXXXX"
                          className={inputClass}
                        />
                        {errors.pendaki?.[i]?.no_hp && <p className={errClass}>{errors.pendaki[i].no_hp?.message}</p>}
                      </div>
                      <div>
                        <label className={labelClass}>Kontak Darurat <span className="text-red-500">*</span></label>
                        <input
                          {...register(`pendaki.${i}.kontak_darurat`)}
                          placeholder="No. HP keluarga/teman"
                          className={inputClass}
                        />
                        {errors.pendaki?.[i]?.kontak_darurat && <p className={errClass}>{errors.pendaki[i].kontak_darurat?.message}</p>}
                      </div>
                    </div>
                  </div>
                ))}

                <div className="flex gap-3">
                  <button type="button" onClick={() => setStep(0)} className="flex-1 py-3 border border-[#e2ebe4] text-[#3a4f40] font-semibold rounded-xl hover:bg-[#f0f4f1] transition-colors">
                    ← Kembali
                  </button>
                  <button
                    id="next-to-step3"
                    type="button"
                    onClick={goToStep3}
                    className="flex-1 py-3 bg-[#2d6a4f] hover:bg-[#1a3a2a] text-white font-semibold rounded-xl transition-colors"
                  >
                    Lanjutkan ke Pembayaran →
                  </button>
                </div>
              </div>
            )}

            {/* ── STEP 2: Review & Konfirmasi ── */}
            {step === 2 && (
              <div className="bg-white rounded-2xl border border-[#e2ebe4] p-6 shadow-sm space-y-6">
                <h2 className="text-xl font-bold text-[#1a2e22]">Ringkasan Pemesanan</h2>

                <div className="bg-[#f8faf9] rounded-xl p-5 space-y-3 text-sm">
                  {[
                    { label: 'Jalur', value: selectedJalur?.nama },
                    { label: 'Tanggal', value: tanggal ? tanggalFmt(tanggal) : '-' },
                    { label: 'Jumlah Pendaki', value: `${jumlahPendaki} orang` },
                    { label: 'Harga per Orang', value: selectedJalur ? hargaFmt(selectedJalur.harga_tiket) : '-' },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between">
                      <span className="text-[#6b7c70]">{item.label}</span>
                      <span className="font-medium text-[#1a2e22]">{item.value}</span>
                    </div>
                  ))}
                  <div className="border-t border-[#e2ebe4] pt-3 flex justify-between">
                    <span className="font-bold text-[#1a2e22]">Total Biaya</span>
                    <span className="font-bold text-xl text-[#2d6a4f]">{hargaFmt(totalBiaya)}</span>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
                  <strong>ℹ️ Cara Pembayaran:</strong> Setelah konfirmasi, kamu akan diarahkan ke WhatsApp admin.
                  Transfer ke rekening yang diinfokan admin, kirim bukti transfer, lalu admin akan mengkonfirmasi status tiketmu.
                </div>

                {serverError && (
                  <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg">
                    {serverError}
                  </div>
                )}

                <div className="flex gap-3">
                  <button type="button" onClick={() => setStep(1)} className="flex-1 py-3 border border-[#e2ebe4] text-[#3a4f40] font-semibold rounded-xl hover:bg-[#f0f4f1] transition-colors">
                    ← Kembali
                  </button>
                  <button
                    id="booking-submit"
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-3 bg-[#2d6a4f] hover:bg-[#1a3a2a] text-white font-bold rounded-xl transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Memproses...' : 'Konfirmasi Pemesanan'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar info */}
          <div className="space-y-4">
            {/* Ringkasan jalur */}
            {selectedJalur && (
              <div className="bg-white rounded-2xl border border-[#e2ebe4] p-5 shadow-sm">
                <h3 className="font-bold text-[#1a2e22] mb-3">Jalur Terpilih</h3>
                <p className="font-semibold text-[#2d6a4f]">{selectedJalur.nama}</p>
                <div className="text-xs text-[#6b7c70] space-y-1 mt-2">
                  <p>⏱ ±{selectedJalur.estimasi_waktu_jam} jam</p>
                  <p>📏 {selectedJalur.jarak_km} km</p>
                  <p>🎯 Kuota harian: {selectedJalur.kuota_harian_default} pendaki</p>
                </div>
                {tanggal && jumlahPendaki && (
                  <div className="mt-4 pt-4 border-t border-[#e2ebe4]">
                    <div className="flex justify-between text-sm">
                      <span className="text-[#6b7c70]">Subtotal</span>
                      <span className="font-bold text-[#2d6a4f]">{hargaFmt(totalBiaya)}</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Tips */}
            <div className="bg-[#f0f4f1] rounded-2xl p-5">
              <h3 className="font-bold text-[#1a2e22] mb-3 text-sm">💡 Tips Pendakian</h3>
              <ul className="space-y-2 text-xs text-[#3a4f40]">
                <li>• Bawa jaket tebal, suhu puncak bisa di bawah 5°C</li>
                <li>• Minimal 2 liter air minum per orang</li>
                <li>• Mulai pendakian pagi hari (sebelum jam 6)</li>
                <li>• Jangan tinggalkan sampah di jalur</li>
              </ul>
            </div>

            {/* Persiapan Matang */}
            <div className="relative rounded-2xl overflow-hidden h-36">
              <div className="absolute inset-0 bg-[#1a3a2a] opacity-80" />
              <div
                className="absolute inset-0"
                style={{ backgroundImage: "url('/images/bg%20lawu.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.4 }}
              />
              <div className="relative z-10 p-5 flex flex-col justify-end h-full">
                <p className="text-white font-bold">Persiapan Matang</p>
                <p className="text-white/70 text-xs">Kunci Keselamatan</p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
