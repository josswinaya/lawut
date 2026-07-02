/**
 * Generate link WhatsApp pre-filled sesuai format PM-08 PRD Bagian 6.3.
 * Pesan disusun di sisi server/client, di-encode dengan encodeURIComponent.
 */
export interface WhatsAppBookingData {
  kode_booking: string
  nama_pemesan: string
  jalur_nama: string
  tanggal: string
  jumlah_pendaki: number
  total_biaya: number
}

export function generateWhatsAppLink(data: WhatsAppBookingData): string {
  const adminNumber = process.env.NEXT_PUBLIC_WA_ADMIN_NUMBER ?? '62XXXXXXXXXX'

  const tanggalFormatted = new Date(data.tanggal).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const totalFormatted = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(data.total_biaya)

  const pesan = `Halo, saya ingin konfirmasi pembayaran tiket pendakian Gunung Lawu.
Kode Booking: ${data.kode_booking}
Nama: ${data.nama_pemesan}
Jalur: ${data.jalur_nama}
Tanggal Pendakian: ${tanggalFormatted}
Jumlah Pendaki: ${data.jumlah_pendaki} orang
Total Biaya: ${totalFormatted}`

  return `https://wa.me/${adminNumber}?text=${encodeURIComponent(pesan)}`
}
