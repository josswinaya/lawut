'use client'

import { useRef, useEffect } from 'react'

const reviewsData = [
  { name: 'Rangga Dwi Saputra', role: 'Pendaki via Cemoro Sewu', text: 'Pemesanan tiket via LawuT sangat mudah dan cepat. Tidak perlu repot antre berjam-jam di basecamp lagi.', rating: 5 },
  { name: 'Nadya Putri Maharani', role: 'Pendaki via Candi Cetho', text: 'Sistemnya transparan. Informasi kuota pendakian sangat akurat sehingga rombongan kami bisa merencanakan pendakian dengan baik.', rating: 5 },
  { name: 'Fikri Aditya', role: 'Pendaki via Cemoro Kandang', text: 'Sangat terbantu dengan website ini. Terutama panduan perlengkapan wajib dan detail rute yang sangat lengkap.', rating: 4 },
  { name: 'Dewi Lestari', role: 'Pendaki via Cemoro Sewu', text: 'Admin WhatsApp sangat responsif ketika saya mengalami sedikit kendala konfirmasi pembayaran. Terima kasih LawuT!', rating: 5 },
  { name: 'Reza Ardiansyah', role: 'Pendaki via Candi Cetho', text: 'Website ini membuat manajemen pendakian Gunung Lawu menjadi lebih modern, terorganisir, dan tertib.', rating: 5 },
  { name: 'Sarah Aulia', role: 'Pendaki via Cemoro Kandang', text: 'Desain webnya bagus dan sangat mudah digunakan bahkan lewat HP. Sukses terus untuk inovasi LawuT.', rating: 5 },
]

export default function TestimonialSlider() {
  const containerRef = useRef<HTMLDivElement>(null)

  // Duplicate arrays to create a long scrollable list (3 sets = 18 items)
  const allReviews = [...reviewsData, ...reviewsData, ...reviewsData]

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Set initial scroll position to the middle set
    // so user can swipe left or right immediately
    // For mobile it's 300px + 24px gap, for desktop 350px + 24px
    const isMobile = window.innerWidth < 640
    const itemWidth = (isMobile ? 300 : 350) + 24 
    const middleIndex = reviewsData.length
    container.scrollLeft = middleIndex * itemWidth

    const handleScroll = () => {
      const scrollPos = container.scrollLeft
      const maxScroll = container.scrollWidth - container.clientWidth
      const singleSetWidth = reviewsData.length * itemWidth

      // If scrolled too far left, jump back to middle set
      if (scrollPos <= 0) {
        container.scrollLeft = singleSetWidth
      } 
      // If scrolled too far right, jump back to middle set
      else if (scrollPos >= maxScroll - 5) {
        container.scrollLeft = scrollPos - singleSetWidth
      }
    }

    container.addEventListener('scroll', handleScroll, { passive: true })
    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div 
      ref={containerRef}
      className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0" 
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      {allReviews.map((review, i) => (
        <div key={i} className="min-w-[300px] sm:min-w-[350px] max-w-[350px] bg-white p-6 rounded-2xl border border-[#e2ebe4] shadow-sm snap-start shrink-0 flex flex-col hover:border-[#52b788]/50 hover:shadow-md transition-all duration-300">
          <div className="flex gap-1 mb-4">
            {[...Array(review.rating)].map((_, idx) => (
              <span key={idx} className="text-amber-400 text-lg">★</span>
            ))}
            {[...Array(5 - review.rating)].map((_, idx) => (
              <span key={idx} className="text-gray-200 text-lg">★</span>
            ))}
          </div>
          <p className="text-[#6b7c70] text-sm leading-relaxed mb-6 flex-grow">
            "{review.text}"
          </p>
          <div className="mt-auto">
            <p className="font-bold text-[#1a2e22]">{review.name}</p>
            <p className="text-[#52b788] text-xs">{review.role}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
