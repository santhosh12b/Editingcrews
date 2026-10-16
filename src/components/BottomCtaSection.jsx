import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function BottomCtaSection({ onOpenInquiryModal }) {
  const { currentLang, t, priceFormatted } = useLanguage();
  const cta = t?.bottomCta || {};
  const isGerman = currentLang === 'de';

  return (
    <section className="pt-0 pb-10 sm:pt-2 sm:pb-14 md:pt-4 md:pb-20 bg-white relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        
        {/* Banner Card Matching User Design */}
        <div className="relative rounded-2xl sm:rounded-3xl bg-[#ebedf3] border border-slate-200/90 p-5 sm:p-8 md:p-10 lg:p-12 shadow-sm flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-8 md:gap-10 text-center md:text-left">
          
          {/* Left Column: Heading & Description & Price Highlight */}
          <div className="max-w-2xl">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 font-heading mb-2 sm:mb-2.5 leading-tight">
              {cta.heading || (isGerman ? "Bereit für dein erstes KI-Video?" : "Ready to Create Videos for Your Brand?")}
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed mb-2.5 sm:mb-3">
              {cta.description || (isGerman 
                ? "Gib deinen Produkten mehr Möglichkeiten, sich mit hochwertigen Videos von der Masse abzuheben."
                : "Give your products more ways to stand out with high-quality AI videos. Whether you need product ads, UGC-style content, animations, or creative concepts, we're ready to help.")}
            </p>
            <p className="text-xs sm:text-sm font-extrabold text-indigo-600 tracking-tight">
              {cta.priceHighlight || (isGerman ? `Dein erstes Video schon ab ${priceFormatted} pro Minute.` : `Your first video starts at just ${priceFormatted} per minute.`)}
            </p>
          </div>

          {/* Right Column: CTA Button & Subtext */}
          <div className="flex flex-col items-center md:items-end shrink-0 w-full md:w-auto">
            <button
              onClick={onOpenInquiryModal}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-9 py-3.5 sm:py-4 rounded-full bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white font-bold text-sm sm:text-base shadow-lg shadow-indigo-600/25 transition-all duration-200 cursor-pointer"
            >
              <span>{cta.buttonText || (isGerman ? "Jetzt Video anfragen" : "Get Started Today")}</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-0.5" />
            </button>
            
            <p className="text-[11px] sm:text-xs text-slate-500 font-medium text-center md:text-right mt-2 sm:mt-2.5">
              {cta.subtext || (isGerman ? "Teile dein Produkt oder deine Idee und lass sie uns zum Leben erwecken." : "Share your product or idea, and let's bring it to life.")}
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
