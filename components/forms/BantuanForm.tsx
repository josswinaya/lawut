'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { bantuanSchema, type BantuanFormValues } from '@/lib/validations/bantuan.schema'
import { useState } from 'react'

export default function BantuanForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BantuanFormValues>({
    resolver: zodResolver(bantuanSchema),
  })

  const onSubmit = async (data: BantuanFormValues) => {
    setStatus('loading')
    try {
      const res = await fetch('/api/bantuan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (json.success) {
        setStatus('success')
        reset()
      } else {
        setErrorMsg(json.error?.message ?? 'Gagal mengirim pesan.')
        setStatus('error')
      }
    } catch {
      setErrorMsg('Terjadi kesalahan. Silakan coba lagi.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-[#d8f3dc] border border-[#52b788] rounded-xl p-6 text-center">
        <div className="text-4xl mb-3">✅</div>
        <h3 className="font-bold text-[#1a3a2a] mb-2">Pesan Berhasil Terkirim!</h3>
        <p className="text-[#2d6a4f] text-sm">Tim kami akan membalas dalam 1×24 jam kerja.</p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-4 px-4 py-2 bg-[#2d6a4f] text-white rounded-lg text-sm hover:bg-[#1a3a2a] transition-colors"
        >
          Kirim Pesan Lagi
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#1a2e22] mb-1">
            Nama <span className="text-red-500">*</span>
          </label>
          <input
            id="bantuan-nama"
            {...register('nama')}
            placeholder="Nama lengkap"
            className="w-full px-4 py-2.5 rounded-lg border border-[#e2ebe4] bg-white text-[#1a2e22] text-sm placeholder-[#aab5ad] focus:outline-none focus:ring-2 focus:ring-[#52b788] focus:border-transparent"
          />
          {errors.nama && <p className="text-red-500 text-xs mt-1">{errors.nama.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-[#1a2e22] mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="bantuan-email"
            type="email"
            {...register('email')}
            placeholder="email@example.com"
            className="w-full px-4 py-2.5 rounded-lg border border-[#e2ebe4] bg-white text-[#1a2e22] text-sm placeholder-[#aab5ad] focus:outline-none focus:ring-2 focus:ring-[#52b788] focus:border-transparent"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[#1a2e22] mb-1">
          Subjek <span className="text-red-500">*</span>
        </label>
        <input
          id="bantuan-subjek"
          {...register('subjek')}
          placeholder="Topik pertanyaan"
          className="w-full px-4 py-2.5 rounded-lg border border-[#e2ebe4] bg-white text-[#1a2e22] text-sm placeholder-[#aab5ad] focus:outline-none focus:ring-2 focus:ring-[#52b788] focus:border-transparent"
        />
        {errors.subjek && <p className="text-red-500 text-xs mt-1">{errors.subjek.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-[#1a2e22] mb-1">
          Pesan <span className="text-red-500">*</span>
        </label>
        <textarea
          id="bantuan-pesan"
          {...register('pesan')}
          rows={5}
          placeholder="Tuliskan pertanyaan atau kendala kamu di sini..."
          className="w-full px-4 py-2.5 rounded-lg border border-[#e2ebe4] bg-white text-[#1a2e22] text-sm placeholder-[#aab5ad] focus:outline-none focus:ring-2 focus:ring-[#52b788] focus:border-transparent resize-none"
        />
        {errors.pesan && <p className="text-red-500 text-xs mt-1">{errors.pesan.message}</p>}
      </div>

      {status === 'error' && (
        <p className="text-red-500 text-sm bg-red-50 px-4 py-2 rounded-lg">{errorMsg}</p>
      )}

      <button
        id="bantuan-submit"
        type="submit"
        disabled={status === 'loading'}
        className="w-full py-3 bg-[#2d6a4f] hover:bg-[#1a3a2a] text-white font-semibold rounded-xl transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? 'Mengirim...' : 'Kirim Pesan'}
      </button>
    </form>
  )
}
