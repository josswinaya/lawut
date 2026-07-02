import { z } from 'zod'

// ── Schema form bantuan (BT-03) ──────────────────────────────────────────────
export const bantuanSchema = z.object({
  nama: z.string().min(2, 'Nama minimal 2 karakter').max(100),
  email: z.string().email('Format email tidak valid'),
  subjek: z.string().min(5, 'Subjek minimal 5 karakter').max(200),
  pesan: z.string().min(10, 'Pesan minimal 10 karakter').max(2000),
})

export type BantuanFormValues = z.infer<typeof bantuanSchema>
