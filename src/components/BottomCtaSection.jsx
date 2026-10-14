import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Clock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function BottomCtaSection({ onOpenInquiryModal }) {
  const { t } = useLanguage();
  const cta = t.bottomCta;

  return (
    <section className="py-20 sm:py-28 bg-white relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        
        {/* Banner Card */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 px-8 py-14 sm:px-14 sm:py-20 text-center text-white shadow-2xl">
          
          {/* Ambient Lighting & Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(129,140,248,0.35),transparent_70%)] pointer-events-none"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>

          <div className="relative z-10 max-w-2xl mx-auto">
            
            {/* Pill */}
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold text-indigo-200 mb-6 border border-white/15 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
              <span>{cta.pill}</span>
            </span>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-5 leading-tight font-heading">
              {cta.heading}
            </h2>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8 max-w-xl mx-auto">
              {cta.description}
            </p>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <button
                onClick={onOpenInquiryModal}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-2xl bg-white text-indigo-950 hover:bg-slate-100 px-9 py-4 text-base sm:text-lg font-extrabold shadow-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>{cta.buttonText}</span>
                <ArrowRight className="w-5 h-5 text-indigo-600" />
              </button>
            </div>

            {/* Trust highlights */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm font-semibold text-slate-300 pt-4 border-t border-white/10">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{cta.badge1}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-300" />
                <span>{cta.badge2}</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>{cta.badge3}</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
