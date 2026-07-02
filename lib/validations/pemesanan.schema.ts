import { z } from 'zod'

// ── Schema untuk satu pendaki (dipakai dalam array) ──────────────────────────
export const pendakiSchema = z.object({
  nama: z.string().min(2, 'Nama minimal 2 karakter').max(100),
  nik: z
    .string()
    .length(16, 'NIK harus 16 digit')
    .regex(/^\d{16}$/, 'NIK hanya boleh berisi angka'),
  no_hp: z
    .string()
    .min(10, 'Nomor HP minimal 10 digit')
    .max(15)
    .regex(/^[0-9+\-\s]+$/, 'Format nomor HP tidak valid'),
  kontak_darurat: z
    .string()
    .min(10, 'Nomor kontak darurat minimal 10 digit')
    .max(15)
    .regex(/^[0-9+\-\s]+$/, 'Format nomor tidak valid'),
  dokumen_url: z.string().url().optional().or(z.literal('')),
})

// ── Schema utama form pemesanan (PM-01 s/d PM-07) ───────────────────────────
export const pemesananSchema = z.object({
  jalur_id: z.string().uuid('Pilih jalur pendakian'),
  tanggal: z
    .string()
    .min(1, 'Pilih tanggal pendakian')
    .refine((val) => {
      const selected = new Date(val)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      return selected >= today
    }, 'Tanggal pendakian tidak boleh di masa lalu'),
  nama_pemesan: z.string().min(2, 'Nama pemesan minimal 2 karakter').max(100),
  no_hp_pemesan: z
    .string()
    .min(10, 'Nomor HP minimal 10 digit')
    .max(15)
    .regex(/^[0-9+\-\s]+$/, 'Format nomor HP tidak valid'),
  jumlah_pendaki: z
    .number({ message: 'Jumlah pendaki harus berupa angka' })
    .int()
    .min(1, 'Minimal 1 pendaki'),
  pendaki: z
    .array(pendakiSchema)
    .min(1, 'Data pendaki wajib diisi')
    .max(20, 'Maksimal 20 pendaki per pemesanan'),
})

export type PemesananFormValues = z.infer<typeof pemesananSchema>
export type PendakiFormValues = z.infer<typeof pendakiSchema>
