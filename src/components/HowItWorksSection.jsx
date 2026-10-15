import React from 'react';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function HowItWorksSection() {
  const { t } = useLanguage();
  const hiw = t?.howItWorks || {};

  const steps = [
    {
      num: hiw.step1?.num || "1",
      title: hiw.step1?.title || "Teile deine Idee",
      desc: hiw.step1?.desc || "Schick uns dein Produkt, dein Skript oder eine grobe Idee."
    },
    {
      num: hiw.step2?.num || "2",
      title: hiw.step2?.title || "Wir erstellen dein Video",
      desc: hiw.step2?.desc || "Unser Team übernimmt die KI-Produktion, den Schnitt, die Soundeffekte und die Hintergrundmusik."
    },
    {
      num: hiw.step3?.num || "3",
      title: hiw.step3?.title || "Du erhältst dein fertiges Video",
      desc: hiw.step3?.desc || "Ein professionelles Video, bereit für deine Ads und Social Media."
    }
  ];

  return (
    <section id="how-it-works" className="py-14 sm:py-20 md:py-28 bg-white relative border-t border-slate-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        
        {/* Section Header (Matching Screenshot) */}
        <div className="text-center mb-10 sm:mb-16 md:mb-20 max-w-3xl mx-auto">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.22em] text-indigo-600 block mb-2 sm:mb-2.5">
            {hiw.badge || "SO FUNKTIONIERT'S"}
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-[42px] font-extrabold tracking-tight text-slate-900 font-heading leading-tight mb-2 sm:mb-3">
            {hiw.heading || "In 3 einfachen Schritten zu deinem Video"}
          </h2>
          <p className="text-slate-500 text-xs sm:text-base leading-relaxed max-w-xl mx-auto">
            {hiw.subheading || "Einfach, schnell und unkompliziert."}
          </p>
        </div>

        {/* 3 Steps Flow: Compact row on mobile, horizontal flow on tablet/desktop */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-6 lg:gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              {/* Step Card */}
              <div className="flex-1 bg-slate-50/70 hover:bg-slate-50 rounded-2xl sm:rounded-3xl border border-slate-200/80 p-4 sm:p-6 md:p-8 flex flex-row md:flex-col items-start gap-4 md:gap-0 transition-all duration-300 hover:shadow-lg hover:border-slate-300 hover:-translate-y-1">
                {/* Step Number Circle */}
                <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center font-black text-sm sm:text-base md:text-lg shadow-md shadow-indigo-600/25 md:mb-5 shrink-0 font-heading">
                  {step.num}
                </div>

                {/* Content */}
                <div className="flex-1">
                  {/* Step Title */}
                  <h3 className="font-extrabold text-slate-900 text-sm sm:text-lg md:text-xl font-heading mb-1 sm:mb-2 leading-snug">
                    {step.title}
                  </h3>

                  {/* Step Description */}
                  <p className="text-slate-600 text-xs sm:text-sm md:text-[15px] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>

              {/* Connecting Arrows between steps */}
              {index < steps.length - 1 && (
                <>
                  {/* Desktop Right Arrow */}
                  <div className="hidden md:flex items-center justify-center text-indigo-400 shrink-0 px-1 lg:px-2">
                    <ArrowRight className="w-6 h-6 stroke-[2.5] text-indigo-400/80" />
                  </div>
                  {/* Mobile Down Arrow */}
                  <div className="flex md:hidden items-center justify-center py-0.5 text-indigo-400">
                    <ArrowDown className="w-4 h-4 stroke-[2.5] text-indigo-400/80" />
                  </div>
                </>
              )}
            </React.Fragment>
          ))}
        </div>

      </div>
    </section>
  );
}
