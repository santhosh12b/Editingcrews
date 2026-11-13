import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function BottomCtaSection({ onOpenInquiryModal }) {
  const { t, priceFormatted } = useLanguage();
  const cta = t?.bottomCta || {};

  return (
    <section className="pt-0 pb-10 sm:pt-2 sm:pb-14 md:pt-4 md:pb-20 bg-white relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        
        {/* Banner Card */}
        <div className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white border border-slate-800 p-6 sm:p-8 md:p-10 lg:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 md:gap-10 text-center md:text-left overflow-hidden">
          
          {/* Subtle Ambient Background Mesh */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

          {/* Left Column: Heading & Description */}
          <div className="flex-1 min-w-0 max-w-xl relative z-10">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-white font-heading mb-2 sm:mb-2.5 leading-snug sm:leading-tight">
              {cta.heading || "Ready to Accelerate Your Property Sales?"}
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed">
              {cta.description || "Give your apartment, villa, or plotting project the visual impact it deserves. Generate high-intent buyer inquiries and increase site visits with high-converting 3D property videos."}
            </p>
          </div>

          {/* Right Column: CTA Button & Subtext */}
          <div className="flex flex-col items-center justify-center shrink-0 w-full md:w-auto text-center relative z-10">
            <button
              onClick={onOpenInquiryModal}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 sm:px-9 py-3.5 sm:py-4 rounded-full bg-black hover:bg-neutral-800 active:scale-[0.98] text-white font-black text-sm sm:text-base shadow-xl shadow-black/40 transition-all duration-200 cursor-pointer whitespace-nowrap border border-white/20"
            >
              <span>{cta.buttonText || "Book your AI video Today"}</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-0.5 shrink-0 stroke-[3] text-white" />
            </button>
            
            <p className="text-xs sm:text-sm font-bold text-emerald-400 text-center mt-2.5 sm:mt-3 leading-relaxed">
              {cta.subtext || `Your first property video starts at just ${priceFormatted}.`}
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
