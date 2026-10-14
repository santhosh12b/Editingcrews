import React, { useState } from 'react';
import { CirclePlay, SquarePen, Rocket, Check, Play } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function HowItWorksSection() {
  const [selectedVoice, setSelectedVoice] = useState('adam');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const { t } = useLanguage();
  const hiw = t.howItWorks;

  const toggleAudio = (voice) => {
    setSelectedVoice(voice);
    setIsPlayingAudio(!isPlayingAudio);
  };

  return (
    <section id="how-it-works" className="py-20 sm:py-28 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20 md:mb-24">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-3 font-heading">
            {hiw.heading}
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-base sm:text-lg">
            {hiw.subheading}
          </p>
        </div>

        {/* STEP 1: Content & Script (Mobile: Copy First, Visual Down | Desktop: Visual Left, Copy Right) */}
        <div className="flex flex-col lg:flex-row items-center mb-16 sm:mb-24 lg:mb-32 gap-8 sm:gap-10 lg:gap-16">
          
          {/* Step 1 Copy (Top on mobile, Right on desktop) */}
          <div className="w-full lg:w-2/5 max-w-xl mx-auto order-1 lg:order-2">
            <div className="inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-600 mb-4">
              {hiw.step1.badge}
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold mb-3 flex items-center gap-2.5 text-slate-900 font-heading">
              <CirclePlay className="w-6 h-6 text-indigo-600 shrink-0" />
              <span>{hiw.step1.title}</span>
            </h3>

            <p className="text-slate-600 text-sm sm:text-base mb-6 leading-relaxed">
              {hiw.step1.description}
            </p>

            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </span>
                <span>{hiw.step1.bullet1}</span>
              </li>
              <li className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </span>
                <span>{hiw.step1.bullet2}</span>
              </li>
            </ul>
          </div>

          {/* Step 1 Visual Mockup (Down on mobile, Left on desktop) */}
          <div className="w-full lg:w-3/5 order-2 lg:order-1">
            <div className="relative rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xl shadow-slate-100/80 max-w-xl mx-auto">
              
              {/* Voice Style Header */}
              <div className="mb-4">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                  {hiw.step1.voiceStyle}
                </span>
              </div>

              {/* Voice List Items */}
              <div className="space-y-3 relative">
                
                {/* Voice Option 1: Adam (Selected) */}
                <div 
                  onClick={() => setSelectedVoice('adam')}
                  className={`p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between cursor-pointer ${
                    selectedVoice === 'adam'
                      ? 'border-indigo-600 bg-indigo-50/40 ring-1 ring-indigo-600/30'
                      : 'border-slate-200/80 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    {/* Circle Radio Indicator */}
                    <div className="w-5 h-5 rounded-full border border-indigo-600 flex items-center justify-center shrink-0">
                      {selectedVoice === 'adam' && (
                        <div className="w-2.5 h-2.5 rounded-full bg-indigo-600"></div>
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900">{hiw.step1.adamName}</span>
                        <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-1.5 py-0.5 rounded">
                          {hiw.step1.adamTag}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {hiw.step1.adamDesc}
                      </p>
                    </div>
                  </div>

                  {/* Play audio button */}
                  <button 
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleAudio('adam');
                    }}
                    className="w-8 h-8 rounded-full bg-slate-100 hover:bg-indigo-600 hover:text-white flex items-center justify-center text-slate-700 transition-colors shrink-0 ml-2 shadow-sm"
                    aria-label="Play sample"
                  >
                    <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                  </button>
                </div>

                {/* Voice Option 2: Alex */}
                <div 
                  onClick={() => setSelectedVoice('alex')}
                  className={`p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between cursor-pointer ${
                    selectedVoice === 'alex'
                      ? 'border-indigo-600 bg-indigo-50/40 ring-1 ring-indigo-600/30'
                      : 'border-slate-200/80 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    {/* Circle Radio Indicator */}
                    <div className="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center shrink-0">
                      {selectedVoice === 'alex' && (
                        <div className="w-2.5 h-2.5 rounded-full bg-indigo-600"></div>
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900">{hiw.step1.alexName}</span>
                        <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-1.5 py-0.5 rounded">
                          {hiw.step1.alexTag}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {hiw.step1.alexDesc}
                      </p>
                    </div>
                  </div>

                  {/* Play audio button */}
                  <button 
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleAudio('alex');
                    }}
                    className="w-8 h-8 rounded-full bg-slate-100 hover:bg-indigo-600 hover:text-white flex items-center justify-center text-slate-700 transition-colors shrink-0 ml-2 shadow-sm"
                    aria-label="Play sample"
                  >
                    <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                  </button>
                </div>

                {/* Illustrated Hand Clicking Cursor */}
                <div className="pointer-events-none absolute top-10 right-1/4 sm:right-1/3 transform translate-x-4 translate-y-1 z-10 drop-shadow-lg">
                  <svg className="w-8 h-8 text-slate-800" viewBox="0 0 24 24" fill="white" stroke="currentColor" strokeWidth="1.5">
                    <path d="M9 11V4a1 1 0 0 1 2 0v7.5l1.2-.8a1.5 1.5 0 0 1 2 .2l.5.5a1.5 1.5 0 0 1 0 2.1L12.5 16a4 4 0 0 1-2.8 1.2H8a4 4 0 0 1-4-4V9.5a1 1 0 0 1 2 0V11h1V4a1 1 0 0 1 1-1h1v8z" />
                  </svg>
                </div>

              </div>

              {/* Bottom Action Buttons */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 bg-white hover:bg-slate-50 transition-colors shadow-sm"
                >
                  ← {hiw.step1.back}
                </button>
                <button
                  type="button"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/30 transition-all"
                >
                  {hiw.step1.continue} &gt;
                </button>
              </div>

            </div>
          </div>

        </div>

        {/* STEP 2: Generate the Storyboard (Mobile: Copy First, Visual Down | Desktop: Copy Left, Visual Right) */}
        <div className="flex flex-col lg:flex-row items-center mb-16 sm:mb-24 lg:mb-32 gap-8 sm:gap-10 lg:gap-16">
          
          {/* Step 2 Copy (Top on mobile, Left on desktop) */}
          <div className="w-full lg:w-2/5 max-w-xl mx-auto order-1 lg:order-1">
            <div className="inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-600 mb-4">
              {hiw.step2.badge}
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold mb-3 flex items-center gap-2.5 text-slate-900 font-heading">
              <SquarePen className="w-6 h-6 text-indigo-600 shrink-0" />
              <span>{hiw.step2.title}</span>
            </h3>

            <p className="text-slate-600 text-sm sm:text-base mb-6 leading-relaxed">
              {hiw.step2.description}
            </p>

            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </span>
                <span>{hiw.step2.bullet1}</span>
              </li>
              <li className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </span>
                <span>{hiw.step2.bullet2}</span>
              </li>
            </ul>
          </div>

          {/* Step 2 Visual Mockup (Down on mobile, Right on desktop) */}
          <div className="w-full lg:w-3/5 order-2 lg:order-2">
            <div className="relative rounded-3xl border border-slate-200/90 bg-white p-3 sm:p-5 shadow-xl shadow-slate-100/80 max-w-xl mx-auto group">
              <div className="relative rounded-2xl overflow-hidden bg-slate-100/50 border border-slate-200/60 shadow-sm">
                <img
                  src="/storyboard.jpeg"
                  alt="Generate the Storyboard"
                  className="w-full h-auto object-cover rounded-xl transition-transform duration-500 group-hover:scale-[1.02]"
                  loading="eager"
                />
              </div>
            </div>
          </div>

        </div>

        {/* STEP 3: Watch your socials grow (Mobile: Copy First, Visual Down | Desktop: Visual Left, Copy Right) */}
        <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-10 lg:gap-16">
          
          {/* Step 3 Copy (Top on mobile, Right on desktop) */}
          <div className="w-full lg:w-2/5 max-w-xl mx-auto order-1 lg:order-2">
            <div className="inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-600 mb-4">
              {hiw.step3.badge}
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold mb-3 flex items-center gap-2.5 text-slate-900 font-heading">
              <Rocket className="w-6 h-6 text-indigo-600 shrink-0" />
              <span>{hiw.step3.title}</span>
            </h3>

            <p className="text-slate-600 text-sm sm:text-base mb-6 leading-relaxed">
              {hiw.step3.description}
            </p>

            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </span>
                <span>{hiw.step3.bullet1}</span>
              </li>
              <li className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </span>
                <span>{hiw.step3.bullet2}</span>
              </li>
            </ul>
          </div>

          {/* Step 3 Visual Illustration (Down on mobile, Left on desktop) */}
          <div className="w-full lg:w-3/5 order-2 lg:order-1">
            <div className="relative rounded-3xl bg-gradient-to-b from-slate-50/50 to-white p-4 sm:p-8 flex items-center justify-center max-w-xl mx-auto">
              <img
                src="/how-it-works-3.png"
                alt="Watch your socials grow with auto-posting to TikTok, Instagram and YouTube"
                className="w-full h-auto max-h-[380px] object-contain drop-shadow-xl transform hover:scale-105 transition-transform duration-500"
                loading="eager"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
