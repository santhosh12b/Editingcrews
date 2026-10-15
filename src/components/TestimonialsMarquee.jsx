import React from 'react';
import { Star } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const originalReviews = [
  {
    id: 1,
    src: "/review.png",
    author: "Ronnie T (Big Friendly Guy)",
    role: "Local Guide · 156 reviews",
    alt: "Google review by Ronnie T: Fantastic guys love working with them !! excellent service"
  },
  {
    id: 2,
    src: "/review2.png",
    author: "S Sujin",
    role: "Verified Google Reviewer · 5 reviews",
    alt: "Google review by S Sujin: Good AI provides excellent video-making services for branding, product promotions, and conceptual videos"
  },
  {
    id: 3,
    src: "/review3.png",
    author: "Bijoy Cherian",
    role: "Verified Google Reviewer · 10 reviews",
    alt: "Google review by Bijoy Cherian: Very understanding and creative team. Keep up the good work."
  },
  {
    id: 4,
    src: "/review4.png",
    author: "Rok Hrastnik",
    role: "Verified Google Reviewer · 4 reviews",
    alt: "Google review by Rok Hrastnik: Really happy with them! Did my ad request for a few complex ads in a few days. Great service, great price, fast."
  }
];

export default function TestimonialsMarquee() {
  const { currentLang, t } = useLanguage();
  const testimonials = t?.testimonials || {};

  // Localized badge text for Google verification
  const googleLabel = {
    de: "Google Bewertung",
    en: "Google Review",
    fr: "Avis Google",
    es: "Reseña de Google",
    it: "Recensione Google"
  }[currentLang] || "Google Review";

  return (
    <section id="testimonials" className="pt-8 pb-8 sm:pt-14 sm:pb-14 md:pt-18 md:pb-18 bg-white relative border-t border-slate-100 scroll-mt-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        
        {/* Section Header (Matching User Design) */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16 max-w-3xl mx-auto">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.22em] text-indigo-600 block mb-2 sm:mb-2.5">
            {testimonials.badge || "KUNDENSTIMMEN"}
          </span>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-[42px] font-extrabold tracking-tight text-slate-900 font-heading leading-tight mb-2 sm:mb-3">
            {testimonials.heading || "Das sagen unsere Kunden"}
          </h2>
          <p className="text-slate-500 text-xs sm:text-base leading-relaxed max-w-xl mx-auto">
            {testimonials.subheading || "Marken aus verschiedenen Branchen vertrauen auf unsere KI-Videos."}
          </p>
        </div>

        {/* 2x2 Grid of Embedded Original Review Screenshot Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-5xl mx-auto">
          {originalReviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 p-4 sm:p-6 lg:p-8 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.04)] hover:shadow-xl hover:border-slate-300 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Header: Google verified badge & 5 stars */}
              <div className="flex items-center justify-between pb-3 mb-3 sm:pb-3.5 sm:mb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5 shrink-0" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span className="text-xs font-bold text-slate-700 tracking-tight">
                    {googleLabel}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-400 text-amber-400" 
                    />
                  ))}
                </div>
              </div>

              {/* Embedded Original Review Image */}
              <div className="bg-slate-50/70 rounded-xl sm:rounded-2xl p-3 sm:p-5 flex items-center justify-center border border-slate-100/90 overflow-hidden min-h-[90px] sm:min-h-[110px]">
                <img
                  src={review.src}
                  alt={review.alt}
                  className="w-full h-auto max-h-[120px] sm:max-h-[140px] object-contain select-none pointer-events-none transition-transform duration-300 group-hover:scale-[1.02]"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
