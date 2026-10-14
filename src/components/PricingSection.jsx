import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function PricingSection({ onOpenInquiryModal }) {
  const { t } = useLanguage();
  const pricing = t.pricing;

  return (
    <section id="pricing" className="py-20 sm:py-28 bg-white relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        
        {/* Focused Pricing Card */}
        <div className="relative rounded-3xl border border-slate-200/90 bg-white p-8 sm:p-12 md:p-16 shadow-xl text-center max-w-2xl mx-auto overflow-hidden">
          
          {/* Subtle top accent bar */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600"></div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 font-heading mb-6">
            {pricing.heading}
          </h2>

          {/* Price: Just €69 per finished minute */}
          <div className="my-8">
            <div className="inline-flex flex-wrap items-baseline justify-center gap-2">
              <span className="text-5xl sm:text-6xl font-black tracking-tight text-indigo-600 font-heading">
                {pricing.price}
              </span>
              <span className="text-lg sm:text-xl font-bold text-slate-600">
                {pricing.unit}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mx-auto mb-10">
            {pricing.description}
          </p>

          {/* CTA Button */}
          <div className="flex justify-center">
            <button
              onClick={onOpenInquiryModal}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base sm:text-lg px-8 py-4 shadow-xl shadow-indigo-600/25 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] glow-primary"
            >
              <span>{pricing.cta}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
