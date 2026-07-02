import { NextRequest, NextResponse } from 'next/server'
import { pemesananSchema } from '@/lib/validations/pemesanan.schema'
import { createPemesanan } from '@/lib/services/pemesanan.service'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validasi server-side dengan Zod (sesuai AGENT.md Bagian 6)
    const parsed = pemesananSchema.safeParse(body)

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

    const { jalur_id, tanggal, jumlah_pendaki, nama_pemesan, no_hp_pemesan, pendaki } =
      parsed.data

    // Hitung total biaya dari service (dikirim dari client setelah preview)
    // total_biaya sudah dihitung di client berdasarkan jalur × jumlah_pendaki
    const total_biaya = body.total_biaya as number
    if (!total_biaya || total_biaya <= 0) {
      return NextResponse.json(
        {
          success: false,
          error: { code: 'VALIDATION_ERROR', message: 'Total biaya tidak valid.' },
        },
        { status: 400 }
      )
    }

    const result = await createPemesanan({
      jalur_id,
      tanggal,
      jumlah_pendaki,
      total_biaya,
      nama_pemesan,
      no_hp_pemesan,
      pendaki,
    })

    if (!result.success) {
      const statusCode = result.error?.code === 'KUOTA_PENUH' ? 409 : 500
      return NextResponse.json(result, { status: statusCode })
    }

    return NextResponse.json(result, { status: 201 })
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
