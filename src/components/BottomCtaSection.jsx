import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function BottomCtaSection({ onOpenInquiryModal }) {
  const { t } = useLanguage();
  const cta = t?.bottomCta || {};

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-white relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        
        {/* Banner Card Matching User Screenshot */}
        <div className="relative rounded-2xl sm:rounded-3xl bg-[#ebedf3] border border-slate-200/90 p-5 sm:p-8 md:p-12 lg:p-14 shadow-sm flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-8 md:gap-10">
          
          {/* Left Column: Heading & Description */}
          <div className="max-w-2xl text-center md:text-left">
            <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 font-heading mb-2 sm:mb-3 leading-tight">
              {cta.heading || "Bereit für dein erstes KI-Video?"}
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed">
              {cta.description || "Gib deinen Produkten mehr Möglichkeiten, sich mit hochwertigen Videos von der Masse abzuheben."}
            </p>
          </div>

          {/* Right Column: CTA Button & Subtext */}
          <div className="flex flex-col items-center md:items-end shrink-0 w-full md:w-auto">
            <button
              onClick={onOpenInquiryModal}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-9 py-3.5 sm:py-4 rounded-full bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white font-bold text-sm sm:text-base shadow-lg shadow-indigo-600/25 transition-all duration-200 cursor-pointer"
            >
              <span>{cta.buttonText || "Jetzt Video anfragen"}</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-0.5" />
            </button>
            
            <p className="text-[11px] sm:text-xs text-slate-500 font-medium text-center md:text-right mt-2 sm:mt-2.5">
              {cta.subtext || "Nur 69 € pro Minute. Alles inklusive."}
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
