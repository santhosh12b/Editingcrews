import React from 'react';
import { 
  UserRound, 
  Palmtree, 
  HardHat, 
  ArrowRight 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const iconMap = {
  Layers: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
      <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" />
      <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" />
    </svg>
  ),
  Video: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="4" width="14" height="16" rx="2" />
      <path d="m16 9 6-4v14l-6-4" />
      <polygon points="7,9 11,12 7,15" fill="currentColor" stroke="none" />
    </svg>
  ),
  UserRound: (props) => <UserRound {...props} strokeWidth={2.2} />,
  Palmtree: (props) => <Palmtree {...props} strokeWidth={2.2} />,
  HardHat: (props) => <HardHat {...props} strokeWidth={2.2} />
};

export default function WhatWeOfferSection({ onOpenInquiryModal }) {
  const { t } = useLanguage();
  const offer = t.whatWeOffer;

  return (
    <section id="what-we-create" className="py-14 sm:py-20 md:py-24 bg-[#F7F5EE] relative overflow-hidden border-b border-amber-200/60">
      
      {/* Background Soft Glow */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-gradient-to-tr from-emerald-100/50 via-amber-100/40 to-teal-100/20 rounded-full blur-3xl -z-10"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1240px]">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#064E3B] font-heading leading-tight">
            {offer.heading}
          </h2>
          
          {/* Brand Turmeric Gold Accent Underline */}
          <div className="w-16 h-1.5 bg-[#F59E0B] rounded-full mx-auto my-3 sm:my-3.5"></div>
          
          <p className="text-slate-700 text-sm sm:text-base md:text-lg font-medium max-w-2xl mx-auto">
            {offer.subheading}
          </p>
        </div>

        {/* 6 Video Type Cards (Mobile: 2 columns [Left & Right], Desktop: 3 columns) */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-7 items-stretch">
          {offer.items?.map((item) => {
            const IconComponent = iconMap[item.icon] || iconMap.Layers;

            return (
              <div 
                key={item.id}
                onClick={() => onOpenInquiryModal && onOpenInquiryModal(item)}
                className="group bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-5 border border-amber-200/70 shadow-[0_4px_20px_-4px_rgba(6,95,70,0.06)] hover:shadow-xl hover:border-emerald-300 hover:-translate-y-1 sm:hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col justify-between active:scale-[0.98]"
              >
                <div>
                  {/* Video Category Thumbnail */}
                  <div className="relative rounded-xl sm:rounded-2xl overflow-hidden aspect-[4/3] w-full bg-slate-100 mb-2.5 sm:mb-4">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      loading="lazy"
                    />
                    {/* Subtle hover gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />
                  </div>

                  {/* Green Icon + Bold Title Row */}
                  <div className="flex items-start gap-1.5 sm:gap-2.5 md:gap-3">
                    <div className="text-[#047857] shrink-0 mt-0.5">
                      <IconComponent className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                    </div>
                    <h3 className="text-xs xs:text-sm sm:text-base md:text-[18px] font-extrabold text-[#064E3B] leading-snug font-heading group-hover:text-emerald-700 transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-[11px] xs:text-xs sm:text-[13px] md:text-[14px] text-slate-700 font-medium leading-relaxed mt-1.5 sm:mt-2.5 line-clamp-3 sm:line-clamp-none">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Suitable For Banner */}
        <div className="mt-10 sm:mt-14 relative rounded-3xl overflow-hidden shadow-xl bg-gradient-to-br from-[#0c4a32] via-[#083825] to-[#042417] p-4 sm:p-6 md:p-8">
          {/* Nature Landscape Overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-overlay pointer-events-none"
            style={{ backgroundImage: `url('/services/page_3_bot.jpg')` }}
          />
          
          {/* White Capsule Container */}
          <div className="relative z-10 bg-white/95 backdrop-blur-md rounded-2xl md:rounded-full p-3 sm:p-3.5 md:pr-8 shadow-2xl border border-white/80 max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-4 sm:gap-6">
            
            {/* Yellow Badge with Pin */}
            <div className="w-full md:w-auto bg-[#FFCC00] text-slate-950 font-black px-6 py-3 rounded-xl md:rounded-full flex items-center justify-center gap-3 shrink-0 shadow-sm">
              <div className="w-6 h-6 rounded-full bg-slate-950 flex items-center justify-center shrink-0">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FFCC00]"></div>
              </div>
              <span className="text-sm sm:text-base tracking-wide uppercase">
                {offer.suitableFor?.badge || "Suitable For"}
              </span>
            </div>

            {/* 3 Columns */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 w-full text-slate-900 py-1">
              {/* Column 1 */}
              <div className="border-b sm:border-b-0 sm:border-r border-slate-200/90 pb-2.5 sm:pb-0 sm:pr-4 text-center sm:text-left">
                <div className="font-bold text-slate-900 text-xs sm:text-sm md:text-[14px] leading-tight">
                  {offer.suitableFor?.col1?.[0] || "Plot Developments"}
                </div>
                <div className="font-bold text-slate-800 text-xs sm:text-sm md:text-[14px] leading-tight mt-1">
                  {offer.suitableFor?.col1?.[1] || "Independent Houses"}
                </div>
              </div>

              {/* Column 2 */}
              <div className="border-b sm:border-b-0 sm:border-r border-slate-200/90 pb-2.5 sm:pb-0 sm:pr-4 text-center sm:text-left">
                <div className="font-bold text-slate-900 text-xs sm:text-sm md:text-[14px] leading-tight">
                  {offer.suitableFor?.col2?.[0] || "Apartments"}
                </div>
                <div className="font-bold text-slate-800 text-xs sm:text-sm md:text-[14px] leading-tight mt-1">
                  {offer.suitableFor?.col2?.[1] || "Commercial Projects"}
                </div>
              </div>

              {/* Column 3 */}
              <div className="text-center sm:text-left">
                <div className="font-bold text-slate-900 text-xs sm:text-sm md:text-[14px] leading-tight">
                  {offer.suitableFor?.col3?.[0] || "Villas"}
                </div>
                <div className="font-bold text-slate-800 text-xs sm:text-sm md:text-[14px] leading-tight mt-1">
                  {offer.suitableFor?.col3?.[1] || "Farm Land"}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Custom Idea Banner */}
        <div className="mt-8 sm:mt-10 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-5 p-3 sm:p-2.5 sm:px-6 bg-white rounded-2xl sm:rounded-full border border-amber-200/80 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all max-w-full">
            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 font-medium text-center sm:text-left">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
              <span className="font-bold text-[#064E3B]">
                {offer.customIdeaHeading || "Have a large township, villa community, or commercial project?"}
              </span>
            </div>
            <button
              onClick={() => onOpenInquiryModal && onOpenInquiryModal()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-black text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 px-5 py-2.5 rounded-xl sm:rounded-full transition-all shadow-md shadow-amber-500/30 active:scale-95 shrink-0"
            >
              <span>{offer.customIdeaBtn || "Discuss Your Project"}</span>
              <ArrowRight className="w-4 h-4 text-slate-950 stroke-[3]" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
