import React from 'react';
import { Star } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function TestimonialsMarquee() {
  const { t } = useLanguage();
  const testimonials = t?.testimonials || {};

  const defaultItems = [
    {
      quote: "Die Videos haben unsere Werbeanzeigen auf ein neues Level gebracht. Schnelle Umsetzung und tolle Qualität!",
      author: "Sophie K.",
      role: "D2C Beauty Brand",
      rating: 5
    },
    {
      quote: "Genau das, was wir für unsere Social Media Kampagnen gebraucht haben. Kreativ, professionell und einfach in der Zusammenarbeit.",
      author: "Lukas M.",
      role: "E-Commerce Brand",
      rating: 5
    },
    {
      quote: "Wir sind begeistert von den kreativen Möglichkeiten mit KI. Die Videos sehen hochwertig aus und performen sehr gut in unseren Ads.",
      author: "Laura S.",
      role: "Lifestyle Brand",
      rating: 5
    }
  ];

  const items = testimonials.items && testimonials.items.length > 0 ? testimonials.items : defaultItems;

  return (
    <section id="testimonials" className="py-20 sm:py-24 md:py-28 bg-white relative border-t border-slate-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        
        {/* Header (Matching User Screenshot) */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20 max-w-3xl mx-auto">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.22em] text-indigo-600 block mb-2.5">
            {testimonials.badge || "KUNDENSTIMMEN"}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-[42px] font-extrabold tracking-tight text-slate-900 font-heading leading-tight mb-3">
            {testimonials.heading || "Das sagen unsere Kunden"}
          </h2>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            {testimonials.subheading || "Marken aus verschiedenen Branchen vertrauen auf unsere KI-Videos."}
          </p>
        </div>

        {/* 3 Review Cards Grid (1 column on mobile, 3 columns on tablet/desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 lg:gap-8 max-w-6xl mx-auto">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl border border-slate-100 p-7 sm:p-8 lg:p-9 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.04)] flex flex-col justify-between hover:shadow-xl hover:border-slate-200/90 hover:-translate-y-1 transition-all duration-300"
            >
              {/* Quote */}
              <div>
                <p className="text-slate-700 text-sm sm:text-[15px] lg:text-base font-normal leading-relaxed">
                  "{item.quote}"
                </p>
              </div>

              {/* Author & Rating Stars at bottom */}
              <div className="mt-8 pt-2">
                <span className="block text-slate-300 font-light text-sm my-3 select-none">—</span>
                <h4 className="font-bold text-slate-900 text-base sm:text-lg font-heading tracking-tight">
                  {item.author}
                </h4>
                <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5 mb-3.5">
                  {item.role}
                </p>
                <div className="flex items-center gap-1.5 text-amber-400">
                  {[...Array(item.rating || 5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="w-4 h-4 sm:w-4.5 sm:h-4.5 fill-amber-400 text-amber-400" 
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
