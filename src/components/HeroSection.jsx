import React from 'react';
import { Play, Sparkles, ArrowRight, ShieldCheck, Clock, CheckCircle, TrendingUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const trustAvatars = [
  { url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80", name: "User 1" },
  { url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80", name: "User 2" },
  { url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80", name: "User 3" },
  { url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80", name: "User 4" },
  { url: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80", name: "User 5" },
];

const trustText = {
  de: {
    highlight: "20+ Nutzer vertrauen uns",
    sub: "99M+ Views letzte Woche"
  },
  en: {
    highlight: "Trusted by 20+ users",
    sub: "99M+ views last week"
  },
  fr: {
    highlight: "Approuvé par 20+ utilisateurs",
    sub: "99M+ vues générées"
  },
  es: {
    highlight: "20+ usuarios confían en nosotros",
    sub: "99M+ vistas generadas"
  },
  it: {
    highlight: "Scelto da 20+ utenti",
    sub: "99M+ visualizzazioni"
  }
};

export default function HeroSection({ onOpenShowreel, onOpenInquiryModal }) {
  const { currentLang, t } = useLanguage();
  const hero = t.hero;
  const trust = trustText[currentLang] || trustText.en;

  return (
    <section className="relative overflow-hidden pt-24 pb-12 sm:pt-36 sm:pb-24 lg:pt-44 lg:pb-28 bg-white">
      
      {/* Background Soft Gradients & Pattern */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] opacity-70 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-indigo-100/60 via-purple-100/40 to-pink-100/30 rounded-full blur-3xl -z-10"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl text-center">
        
        {/* Social Proof Trust Badge */}
        <div className="inline-flex items-center gap-2 sm:gap-3 px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-full bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow duration-200 mb-5 sm:mb-6 max-w-full">
          {/* Overlapping Avatars Stack */}
          <div className="flex -space-x-1.5 sm:-space-x-2 overflow-hidden shrink-0">
            {trustAvatars.map((avatar, idx) => (
              <img
                key={idx}
                src={avatar.url}
                alt={avatar.name}
                loading="eager"
                className="inline-block h-6 w-6 sm:h-7 sm:w-7 rounded-full ring-2 ring-white object-cover bg-slate-100 shadow-xs"
              />
            ))}
          </div>

          {/* Purple Trend Icon */}
          <TrendingUp className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 text-indigo-600 stroke-[2.5] shrink-0" />

          {/* Trust Text */}
          <div className="text-[11px] sm:text-sm text-slate-800 flex items-center gap-1.5 leading-none">
            <span className="font-extrabold text-slate-900 truncate">
              {trust.highlight}
            </span>
            <span className="text-slate-500 font-medium hidden sm:inline">
              • {trust.sub}
            </span>
          </div>
        </div>

        {/* Headline */}
        <h1 className="text-[28px] xs:text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-tight sm:leading-[1.1] mb-3 sm:mb-4 font-heading">
          {hero.headline}
        </h1>

        {/* Subheading */}
        <p className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-indigo-600 mb-4 sm:mb-6 font-heading">
          {hero.subheading}
        </p>

        {/* Description */}
        <p className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8 sm:mb-10">
          {hero.description}
        </p>

        {/* Single Call To Action: Get Your First Video */}
        <div className="flex items-center justify-center mb-8 sm:mb-12">
          <button
            onClick={onOpenInquiryModal}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm sm:text-base md:text-lg px-7 py-3.5 sm:px-9 sm:py-4 shadow-xl shadow-indigo-600/25 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] glow-primary cursor-pointer"
          >
            <span>{hero.primaryCta}</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-white stroke-[2.5]" />
          </button>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-6 lg:gap-10 text-[11px] sm:text-sm font-semibold text-slate-500 pt-4 border-t border-slate-100">
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
