import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'LawuT - Pemesanan Tiket Pendakian Gunung Lawu',
    template: '%s | LawuT',
  },
  description:
    'Platform resmi pemesanan tiket pendakian Gunung Lawu. Pilih jalur Cemoro Sewu, Cemoro Kandang, atau Candi Cetho. Cepat, transparan, dan mudah.',
  keywords: ['Gunung Lawu', 'pendakian', 'tiket', 'Cemoro Sewu', 'Cemoro Kandang', 'Candi Cetho'],
  openGraph: {
    siteName: 'LawuT',
    locale: 'id_ID',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#f8faf9] text-[#1a2e22]">
        <Navbar />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

