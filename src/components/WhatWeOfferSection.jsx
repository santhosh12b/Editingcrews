import React from 'react';
import { 
  Users, 
  Package, 
  ShoppingCart, 
  ShoppingBag,
  Lightbulb, 
  Layers, 
  Sparkles, 
  Smartphone,
  ArrowRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const iconMap = {
  ugc: Users,
  Users: Users,
  Smartphone: Users,
  unboxing: Package,
  Package: Package,
  showcase: ShoppingCart,
  ShoppingCart: ShoppingCart,
  ShoppingBag: ShoppingCart,
  concept: Lightbulb,
  Lightbulb: Lightbulb,
  animation: Layers,
  Layers: Layers,
  cinematic: Sparkles,
  Sparkles: Sparkles,
};

const colorStyles = {
  violet: {
    iconBg: "bg-[#EEF0FF] text-[#5046E5]",
    hoverBorder: "hover:border-indigo-200 hover:shadow-indigo-500/10"
  },
  rose: {
    iconBg: "bg-[#FFF0F2] text-[#F43F5E]",
    hoverBorder: "hover:border-rose-200 hover:shadow-rose-500/10"
  },
  emerald: {
    iconBg: "bg-[#E8FAF3] text-[#10B981]",
    hoverBorder: "hover:border-emerald-200 hover:shadow-emerald-500/10"
  },
  amber: {
    iconBg: "bg-[#FFF9E6] text-[#F59E0B]",
    hoverBorder: "hover:border-amber-200 hover:shadow-amber-500/10"
  },
  blue: {
    iconBg: "bg-[#EEF5FF] text-[#3B82F6]",
    hoverBorder: "hover:border-blue-200 hover:shadow-blue-500/10"
  },
  pink: {
    iconBg: "bg-[#FFF0F5] text-[#EC4899]",
    hoverBorder: "hover:border-pink-200 hover:shadow-pink-500/10"
  },
  indigo: {
    iconBg: "bg-[#EEF0FF] text-[#5046E5]",
    hoverBorder: "hover:border-indigo-200 hover:shadow-indigo-500/10"
  },
  fuchsia: {
    iconBg: "bg-[#FFF0F5] text-[#EC4899]",
    hoverBorder: "hover:border-pink-200 hover:shadow-pink-500/10"
  }
};

export default function WhatWeOfferSection({ onOpenInquiryModal }) {
  const { currentLang, t } = useLanguage();
  const offer = t.whatWeOffer;

  return (
    <section id="what-we-create" className="py-20 sm:py-24 md:py-28 bg-[#FAFAFC] relative overflow-hidden border-b border-slate-200/80">
      
      {/* Background Subtle Gradient Atmosphere */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-gradient-to-tr from-indigo-50/50 via-purple-50/30 to-pink-50/20 rounded-full blur-3xl -z-10"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-indigo-600 mb-3 block font-mono">
            {offer.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight font-heading">
            {offer.heading}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base md:text-lg mt-3 sm:mt-4 leading-relaxed max-w-2xl mx-auto">
            {offer.subheading}
          </p>
        </div>

        {/* 6 Video Format Cards in a Single Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4 lg:gap-3 xl:gap-4">
          {offer.items.map((item) => {
            const IconComponent = iconMap[item.id] || iconMap[item.icon] || Sparkles;
            const theme = colorStyles[item.color] || colorStyles.indigo;

            return (
              <div 
                key={item.id}
                onClick={() => onOpenInquiryModal && onOpenInquiryModal()}
                className={`group relative bg-white rounded-3xl p-6 sm:p-7 flex flex-col items-center text-center border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-xl hover:-translate-y-1.5 ${theme.hoverBorder} transition-all duration-300 cursor-pointer`}
              >
                {/* Centered Soft Icon Container */}
                <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-5 sm:mb-6 transition-all duration-300 group-hover:scale-110 shadow-xs ${theme.iconBg}`}>
                  <IconComponent className="w-7 h-7 sm:w-8 sm:h-8" />
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 leading-snug group-hover:text-indigo-600 transition-colors">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* 7th Feature Banner: Have another idea? Tell us what you have in mind. */}
        <div className="mt-12 sm:mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-5 p-2.5 sm:p-2 sm:px-6 bg-white rounded-3xl sm:rounded-full border border-slate-200/80 shadow-xs hover:shadow-md hover:border-indigo-200 transition-all max-w-full">
            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-600 font-medium text-center sm:text-left">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
              <span className="font-bold text-slate-900">
                {offer.customIdeaHeading || "Have another idea? Tell us what you have in mind."}
              </span>
            </div>
            <button
              onClick={() => onOpenInquiryModal && onOpenInquiryModal()}
              className="inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 px-5 py-2.5 rounded-xl sm:rounded-full transition-all shadow-md shadow-indigo-600/20 active:scale-95 shrink-0"
            >
              <span>{offer.customIdeaBtn || "Tell Us Your Idea"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
