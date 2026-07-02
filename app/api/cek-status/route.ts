import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { kode_booking, no_hp } = body

    if (!kode_booking || !no_hp) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Kode booking dan nomor HP wajib diisi.',
          },
        },
        { status: 400 }
      )
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !serviceKey) {
      throw new Error('Konfigurasi server tidak lengkap.')
    }

    // Panggil RPC SECURITY DEFINER via REST API — tidak membuka akses select langsung ke
    // tabel pemesanan/pendaki (AGENT.md 8.3). Menggunakan raw fetch untuk menghindari
    // type inference issue Supabase JS v2.110+ dengan manual Database types.
    const rpcResponse = await fetch(`${supabaseUrl}/rest/v1/rpc/cek_status_pemesanan`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
        Prefer: 'return=representation',
      },
      body: JSON.stringify({
        p_kode_booking: String(kode_booking).trim().toUpperCase(),
        p_no_hp: String(no_hp).trim(),
      }),
    })

    if (!rpcResponse.ok) {
      const errBody = await rpcResponse.json().catch(() => ({}))
      console.error('[cek-status] RPC error:', errBody)
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'RPC_ERROR',
            message: 'Gagal mengambil data pemesanan. Silakan coba lagi.',
          },
        },
        { status: 500 }
      )
    }

    const rows = (await rpcResponse.json()) as Array<{
      kode_booking: string
      nama_jalur: string
      tanggal: string
      jumlah_pendaki: number
      total_biaya: number
      status: string
      catatan_admin: string | null
    }>

    if (!rows || rows.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'NOT_FOUND',
            message: 'Pemesanan tidak ditemukan. Periksa kembali kode booking dan nomor HP.',
          },
        },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: rows[0] }, { status: 200 })
  } catch (err) {
    console.error('[cek-status] error:', err)
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
