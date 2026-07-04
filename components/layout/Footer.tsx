import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#1a3a2a] text-white">
      <div className="container-lawu py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-bold text-lg">LawuT</span>
            </div>
            <p className="text-[#a8c5b0] text-sm leading-relaxed max-w-xs">
              Platform resmi pemesanan tiket pendakian Gunung Lawu. Aman, transparan, dan mudah.
            </p>
            <p className="text-[#a8c5b0] text-xs mt-4">
              © {new Date().getFullYear()} LawuT. Hak cipta dilindungi.
            </p>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xs font-semibold tracking-widest text-[#52b788] uppercase mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              {[
                { label: 'Syarat & Ketentuan', href: '/informasi' },
                { label: 'Kebijakan Privasi', href: '#' },
                { label: 'Peta Situs', href: '/informasi' },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[#a8c5b0] hover:text-white text-sm transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-xs font-semibold tracking-widest text-[#52b788] uppercase mb-4">
              Social
            </h3>
            <ul className="space-y-3">
              {[
                { label: 'Instagram', href: '#' },
                { label: 'Facebook', href: '#' },
                { label: 'YouTube', href: '#' },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[#a8c5b0] hover:text-white text-sm transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
