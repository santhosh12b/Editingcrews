import React from 'react';
import { 
  Smartphone, 
  ShoppingBag, 
  Package, 
  Lightbulb, 
  Layers, 
  Sparkles, 
  ArrowRight, 
  ArrowUpRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const iconMap = {
  Smartphone,
  ShoppingBag,
  Package,
  Lightbulb,
  Layers,
  Sparkles,
  ugc: Smartphone,
  showcase: ShoppingBag,
  unboxing: Package,
  concept: Lightbulb,
  animation: Layers,
  cinematic: Sparkles,
};

const colorStyles = {
  violet: {
    iconBg: "bg-violet-50 text-violet-600 border border-violet-100 group-hover:bg-violet-600 group-hover:text-white",
    badge: "bg-violet-50 text-violet-700 border border-violet-200/80",
    hoverBorder: "hover:border-violet-400/80 hover:shadow-violet-500/10",
    glow: "bg-violet-500/10"
  },
  indigo: {
    iconBg: "bg-indigo-50 text-indigo-600 border border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white",
    badge: "bg-indigo-50 text-indigo-700 border border-indigo-200/80",
    hoverBorder: "hover:border-indigo-400/80 hover:shadow-indigo-500/10",
    glow: "bg-indigo-500/10"
  },
  emerald: {
    iconBg: "bg-emerald-50 text-emerald-600 border border-emerald-100 group-hover:bg-emerald-600 group-hover:text-white",
    badge: "bg-emerald-50 text-emerald-700 border border-emerald-200/80",
    hoverBorder: "hover:border-emerald-400/80 hover:shadow-emerald-500/10",
    glow: "bg-emerald-500/10"
  },
  amber: {
    iconBg: "bg-amber-50 text-amber-600 border border-amber-100 group-hover:bg-amber-600 group-hover:text-white",
    badge: "bg-amber-50 text-amber-700 border border-amber-200/80",
    hoverBorder: "hover:border-amber-400/80 hover:shadow-amber-500/10",
    glow: "bg-amber-500/10"
  },
  rose: {
    iconBg: "bg-rose-50 text-rose-600 border border-rose-100 group-hover:bg-rose-600 group-hover:text-white",
    badge: "bg-rose-50 text-rose-700 border border-rose-200/80",
    hoverBorder: "hover:border-rose-400/80 hover:shadow-rose-500/10",
    glow: "bg-rose-500/10"
  },
  fuchsia: {
    iconBg: "bg-fuchsia-50 text-fuchsia-600 border border-fuchsia-100 group-hover:bg-fuchsia-600 group-hover:text-white",
    badge: "bg-fuchsia-50 text-fuchsia-700 border border-fuchsia-200/80",
    hoverBorder: "hover:border-fuchsia-400/80 hover:shadow-fuchsia-500/10",
    glow: "bg-fuchsia-500/10"
  }
};

export default function WhatWeOfferSection({ onOpenInquiryModal }) {
  const { currentLang, t } = useLanguage();
  const offer = t.whatWeOffer;

  return (
    <section id="what-we-create" className="py-20 sm:py-24 md:py-28 bg-gradient-to-b from-white via-slate-50/50 to-white relative overflow-hidden border-b border-slate-200/80">
      
      {/* Background Soft Ambient Light */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-indigo-100/40 via-purple-100/30 to-pink-100/20 rounded-full blur-3xl -z-10"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-indigo-700 bg-indigo-50 border border-indigo-200 px-4 py-1.5 rounded-full mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>{offer.badge}</span>
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight font-heading">
            {offer.heading}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base md:text-lg mt-3 sm:mt-4 leading-relaxed max-w-2xl mx-auto">
            {offer.subheading}
          </p>
        </div>

        {/* 6 Video Styles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {offer.items.map((item) => {
            const IconComponent = iconMap[item.id] || iconMap[item.icon] || Sparkles;
            const theme = colorStyles[item.color] || colorStyles.indigo;

            return (
              <div 
                key={item.id}
                onClick={() => onOpenInquiryModal && onOpenInquiryModal()}
                className={`group relative rounded-3xl border border-slate-200/90 bg-white p-7 sm:p-8 transition-all duration-300 ${theme.hoverBorder} hover:shadow-2xl hover:-translate-y-2 flex flex-col justify-between cursor-pointer overflow-hidden`}
              >
                {/* Subtle Hover Radial Mesh Glow */}
                <div className={`absolute top-0 right-0 w-36 h-36 rounded-bl-full ${theme.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}></div>

                <div>
                  {/* Top Bar: Icon + Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-12 h-12 sm:w-13 sm:h-13 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-sm ${theme.iconBg} group-hover:scale-105`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-2xs ${theme.badge}`}>
                      {item.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-extrabold text-slate-900 leading-snug mb-2.5 group-hover:text-indigo-600 transition-colors font-heading">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Interactive Action */}
                <div className="mt-7 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-500 group-hover:text-indigo-600 transition-colors">
                  <span>{offer.cta || "Video anfragen"}</span>
                  <div className="w-7 h-7 rounded-full bg-slate-100 group-hover:bg-indigo-600 group-hover:text-white flex items-center justify-center transition-all duration-200">
                    <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* 7th Feature Banner: Have another idea? Tell us what you have in mind. */}
        <div className="mt-10 sm:mt-12 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-7 sm:p-9 shadow-xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          
          {/* Subtle Ambient Mesh */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.25),transparent_50%)] pointer-events-none"></div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 max-w-2xl">
            <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-2xl bg-indigo-600/30 border border-indigo-400/30 text-indigo-300 flex items-center justify-center shrink-0 shadow-inner">
              <Lightbulb className="w-6 h-6 text-indigo-300" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-indigo-300 bg-indigo-950/80 border border-indigo-500/30 px-3 py-0.5 rounded-full mb-2">
                <Sparkles className="w-3 h-3 text-indigo-400" />
                <span>{offer.customIdeaBadge}</span>
              </div>
              <h4 className="text-xl sm:text-2xl font-extrabold text-white font-heading">
                {offer.customIdeaHeading}
              </h4>
              <p className="text-slate-300 text-xs sm:text-sm mt-1.5 leading-relaxed">
                {offer.customIdeaSub}
              </p>
            </div>
          </div>

          <div className="relative z-10 shrink-0 w-full sm:w-auto">
            <button
              onClick={() => onOpenInquiryModal && onOpenInquiryModal()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm sm:text-base px-6 py-3.5 shadow-lg shadow-indigo-600/30 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>{offer.customIdeaBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
