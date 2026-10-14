import React from 'react';
import { Play, Sparkles, ArrowRight, ShieldCheck, Clock, CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function HeroSection({ onOpenShowreel, onOpenInquiryModal }) {
  const { t } = useLanguage();
  const hero = t.hero;

  return (
    <section className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24 lg:pt-44 lg:pb-28 bg-white">
      
      {/* Background Soft Gradients & Pattern */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] opacity-70 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-indigo-100/60 via-purple-100/40 to-pink-100/30 rounded-full blur-3xl -z-10"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl text-center">
        
        {/* Eyebrow Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs sm:text-sm font-semibold mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600 fill-indigo-600/30" />
          <span>{hero.eyebrow}</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1] mb-4 font-heading">
          {hero.headline}
        </h1>

        {/* Subheading */}
        <p className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-indigo-600 mb-6 font-heading">
          {hero.subheading}
        </p>

        {/* Description */}
        <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-10">
          {hero.description}
        </p>

        {/* Dual Call To Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          
          {/* Primary CTA: Watch Showreel */}
          <button
            onClick={onOpenShowreel}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base sm:text-lg px-8 py-4 shadow-xl shadow-indigo-600/25 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] glow-primary"
          >
            <Play className="w-5 h-5 fill-white" />
            <span>{hero.primaryCta}</span>
          </button>

          {/* Secondary CTA: Get Your Video Today */}
          <button
            onClick={onOpenInquiryModal}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-white hover:bg-slate-50 text-slate-900 font-bold text-base sm:text-lg px-7 py-4 border-2 border-slate-200 transition-all duration-200 shadow-sm hover:border-slate-300"
          >
            <span>{hero.secondaryCta}</span>
            <ArrowRight className="w-5 h-5 text-indigo-600" />
          </button>

        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm font-semibold text-slate-500 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>{hero.badge1}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-indigo-600" />
            <span>{hero.badge2}</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>{hero.badge3}</span>
          </div>
        </div>

      </div>
    </section>
  );
}
