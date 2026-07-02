import { NextRequest, NextResponse } from 'next/server'
import { bantuanSchema } from '@/lib/validations/bantuan.schema'
import { createPesanBantuan } from '@/lib/services/pesan-bantuan.service'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validasi server-side dengan Zod (sesuai AGENT.md Bagian 6)
    const parsed = bantuanSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: parsed.error.issues[0]?.message ?? 'Data tidak valid.',
          },
        },
        { status: 400 }
      )
    }

    const result = await createPesanBantuan(parsed.data)

    if (!result.success) {
      return NextResponse.json(result, { status: 500 })
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Pesan berhasil dikirim. Kami akan segera merespons dalam 1×24 jam.',
      },
      { status: 201 }
    )
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Terjadi kesalahan pada server. Silakan coba lagi.',
        },
      },
      { status: 500 }
    )
  }
}
