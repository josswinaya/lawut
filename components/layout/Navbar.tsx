'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const navLinks = [
  { href: '/', label: 'Beranda' },
  { href: '/informasi', label: 'Informasi' },
  { href: '/cek-status', label: 'Cek Status' },
  { href: '/bantuan', label: 'Bantuan' },
  { href: '/tentang-kami', label: 'Tentang Kami' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1a3a2a]/95 backdrop-blur-md border-b border-white/10">
      <div className="container-lawu">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <span className="text-white font-bold text-2xl tracking-tight">LawuT</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'text-[#52b788]'
                      : 'text-white/80 hover:text-[#52b788]'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
            <Link
              href="/pemesanan"
              className="ml-3 px-5 py-2 bg-[#52b788] hover:bg-[#74c69d] text-white font-semibold rounded-lg text-sm transition-all duration-200 hover:shadow-lg hover:shadow-[#52b788]/30"
            >
              Pesan Tiket
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white/80 hover:text-white p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`block h-0.5 bg-current transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-0.5 bg-current transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 bg-current transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-4 py-3 space-y-1 bg-[#1a3a2a] border-t border-white/10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                pathname === link.href ? 'text-[#52b788]' : 'text-white/80 hover:text-[#52b788]'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/pemesanan"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-3 bg-[#52b788] text-white font-semibold rounded-lg text-sm text-center mt-1"
          >
            Pesan Tiket
          </Link>
        </div>
      </div>
    </nav>
  )
}
