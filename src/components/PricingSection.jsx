import React from 'react';
import { 
  Image, 
  Scissors, 
  Volume2, 
  Music, 
  Lightbulb, 
  CheckCircle2, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const featureIcons = [
  Image,
  Scissors,
  Volume2,
  Music,
  Lightbulb,
  CheckCircle2
];

export default function PricingSection({ onOpenInquiryModal }) {
  const { t } = useLanguage();
  const pricing = t.pricing;

  return (
    <section id="pricing" className="py-20 sm:py-24 md:py-28 bg-[#FAFAFC] relative overflow-hidden border-b border-slate-200/80 scroll-mt-20">
      
      {/* Background Soft Mesh Ambient Lighting */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-gradient-to-tr from-indigo-50/60 via-purple-50/40 to-pink-50/20 rounded-full blur-3xl -z-10"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs sm:text-[13px] font-bold uppercase tracking-widest text-indigo-600 mb-3 block">
            {pricing.badge || "What You Get for €69/Minute"}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight font-heading">
            {pricing.heading || "Complete Video Production. One Simple Price."}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base md:text-lg mt-3 sm:mt-4 leading-relaxed max-w-2xl mx-auto">
            {pricing.subheading || "No need to manage different creators, editors, or production teams. We take care of the entire process."}
          </p>
        </div>

        {/* Focused All-Inclusive Pricing Container */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-100 shadow-[0_4px_30px_-5px_rgba(0,0,0,0.05)] max-w-5xl mx-auto flex flex-col md:flex-row items-stretch gap-8 lg:gap-10">
          
          {/* Left Price Box: "Nur 69 € pro Videominute" */}
          <div className="w-full md:w-[280px] lg:w-[320px] rounded-2xl sm:rounded-3xl bg-[#F8FAFC] border border-slate-100 p-8 sm:p-10 flex flex-col items-center justify-center text-center shrink-0">
            <span className="text-base sm:text-lg font-bold text-indigo-600 mb-1">
              {pricing.pricePrefix || "Just"}
            </span>
            <span className="text-6xl sm:text-7xl font-extrabold text-[#4F46E5] tracking-tight leading-none my-2 font-heading">
              {pricing.price || "€69"}
            </span>
            <span className="text-base sm:text-lg font-bold text-indigo-600/90 mt-1">
              {pricing.priceSuffix || "per finished minute"}
            </span>
          </div>

          {/* Right: 6 Feature Highlights Grid */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-7 lg:gap-x-10 lg:gap-y-8 py-2 md:py-3">
            {pricing.features && pricing.features.map((item, idx) => {
              const IconComponent = featureIcons[idx] || Sparkles;
              return (
                <div key={idx} className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50/80 flex items-center justify-center shrink-0 mt-0.5 text-indigo-600">
                    <IconComponent className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug font-heading mb-1">
                      {item.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Bottom CTA Action Button: [Let's Create Your Video] */}
        <div className="mt-10 sm:mt-12 text-center flex flex-col items-center justify-center">
          <button
            onClick={() => onOpenInquiryModal && onOpenInquiryModal()}
            className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base sm:text-lg shadow-xl shadow-indigo-600/25 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>{pricing.cta || "Let's Create Your Video"}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
          <p className="text-xs sm:text-sm text-slate-500 mt-3 font-medium">
            {pricing.subnote || "Starting at just €69 per finished minute. No expensive video shoots required."}
          </p>
        </div>

      </div>
    </section>
  );
}
