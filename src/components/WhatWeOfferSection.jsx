import React from 'react';
import { Wand2, SlidersHorizontal, Volume2, Languages, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const icons = [Wand2, SlidersHorizontal, Volume2, Languages];

export default function WhatWeOfferSection() {
  const { t } = useLanguage();
  const offer = t.whatWeOffer;

  return (
    <section id="offer" className="py-16 sm:py-20 md:py-24 bg-slate-50/70 border-y border-slate-200/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 border border-indigo-200/80 px-3.5 py-1 rounded-full">
            {offer.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mt-3 font-heading">
            {offer.heading}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2.5">
            {offer.subheading}
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {offer.items.map((item, idx) => {
            const IconComponent = icons[idx] || Wand2;
            return (
              <div 
                key={item.id}
                className="group relative rounded-2xl border border-slate-200 bg-white p-7 transition-all duration-300 hover:border-indigo-400 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  {/* Badge & Icon Header */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider bg-slate-100 px-2.5 py-1 rounded-full">
                      {item.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-slate-900 leading-snug mb-3 group-hover:text-indigo-600 transition-colors font-heading">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Subtle bottom accent line */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-indigo-600">
                  <span>{offer.included}</span>
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
