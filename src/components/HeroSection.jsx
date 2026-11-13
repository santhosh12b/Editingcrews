import React from 'react';
import { Play, Sparkles, ArrowRight, TrendingUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

// 1. Clapperboard with Play Button (matching PDF & Flaticon style)
const ClapperPlayIcon = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 4h16a2 2 0 0 1 2 2v2H2V6a2 2 0 0 1 2-2z" />
    <path d="M7 4l2 4" />
    <path d="M12 4l2 4" />
    <path d="M17 4l2 4" />
    <rect x="2" y="8" width="20" height="12" rx="2" />
    <polygon points="10 11.5 15 14 10 16.5 10 11.5" fill="currentColor" stroke="none" />
  </svg>
);

// 2. Angular Lightning Bolt (matching PDF & Flaticon style)
const BoltIcon = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="13 2 4 14 11 14 11 22 20 10 13 10 13 2" />
  </svg>
);

// 3. Stacked 3 Rhombus Layers (matching PDF & Flaticon style)
const Layers3Icon = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <path d="M2 12l10 5 10-5" />
    <path d="M2 17l10 5 10-5" />
  </svg>
);

// 4. Calendar with 6 dots & binder loops (matching PDF & Flaticon style)
const CalendarDotsIcon = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
    <circle cx="8" cy="13.5" r="1.1" fill="currentColor" stroke="none" />
    <circle cx="12" cy="13.5" r="1.1" fill="currentColor" stroke="none" />
    <circle cx="16" cy="13.5" r="1.1" fill="currentColor" stroke="none" />
    <circle cx="8" cy="17.5" r="1.1" fill="currentColor" stroke="none" />
    <circle cx="12" cy="17.5" r="1.1" fill="currentColor" stroke="none" />
    <circle cx="16" cy="17.5" r="1.1" fill="currentColor" stroke="none" />
  </svg>
);

const trustAvatars = [
  { url: "/avatars/unnamed.png", name: "Client" },
  { url: "/avatars/1.png", name: "Client" },
  { url: "/avatars/unnamed2.png", name: "Client" },
  { url: "/avatars/unnamed4.png", name: "Client" },
  { url: "/avatars/hello.png", name: "Client" },
];

const trustText = {
  en: {
    highlight: "Trusted by 100+ clients"
  },
  ta: {
    highlight: "100+ வாடிக்கையாளர்களால் நம்பப்படுகிறது"
  }
};

export default function HeroSection({ onOpenShowreel, onOpenInquiryModal }) {
  const { currentLang, t } = useLanguage();
  const hero = t.hero;
  const trust = trustText[currentLang] || trustText.en;

  // Ensure "Real Estate Businesses" pops in rich accent colour, and keep price tokens atomic
  const renderHeadline = (text) => {
    if (!text || typeof text !== 'string') return text;

    // Highlight "Real Estate Businesses" in vibrant Emerald Green (#059669)
    if (text.includes("Real Estate Businesses")) {
      const parts = text.split("Real Estate Businesses");
      return (
        <>
          {parts[0]}
          <span className="text-[#059669] inline-block">Real Estate Businesses</span>
          {parts[1]}
        </>
      );
    }

    // Highlight "ரியல் எஸ்டேட் நிறுவனங்களுக்கான" in Tamil
    if (text.includes("ரியல் எஸ்டேட் நிறுவனங்களுக்கான")) {
      const parts = text.split("ரியல் எஸ்டேட் நிறுவனங்களுக்கான");
      return (
        <>
          <span className="text-[#059669] inline-block">ரியல் எஸ்டேட் நிறுவனங்களுக்கான</span>
          {parts[1]}
        </>
      );
    }

    const priceRegex = /(?:₹[\s\u00A0]*2,500|₹[\s\u00A0]*2500|₹[\s\u00A0]*2,999|₹[\s\u00A0]*2999)(?:[\s\u00A0]*(?:\/|முதல்|லிருந்து)?[\s\u00A0]*(?:Minute|minute|நிமிடத்தில்|நிமிடம்)?)?\.?/i;
    const match = text.match(priceRegex);

    if (match) {
      const idx = text.indexOf(match[0]);
      const before = text.substring(0, idx);
      const after = text.substring(idx + match[0].length);
      return (
        <>
          {before}
          <span className="inline-block whitespace-nowrap">
            {match[0].replace(/[\s\u00A0]+/g, '\u00A0')}
          </span>
          {after}
        </>
      );
    }
    return text;
  };

  return (
    <section className="relative overflow-hidden pt-20 pb-10 sm:pt-24 sm:pb-14 lg:pt-28 lg:pb-16 bg-white">
      
      {/* Background Soft Gradients & Pattern */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-70"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[650px] h-[380px] bg-gradient-to-tr from-emerald-100/40 via-slate-100/30 to-emerald-50/20 rounded-full blur-3xl -z-10"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl text-center">
        
        {/* Social Proof Trust Badge */}
        <div className="inline-flex items-center gap-2 sm:gap-3 px-3 py-1 sm:px-3.5 sm:py-1 rounded-full bg-white border border-slate-200/90 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all duration-200 mb-3 sm:mb-4 max-w-full">
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

          {/* Emerald Trend Icon */}
          <TrendingUp className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 text-emerald-600 stroke-[2.5] shrink-0" />

          {/* Trust Text */}
          <div className="text-[11px] sm:text-sm text-slate-800 flex items-center leading-none">
            <span className="font-extrabold text-slate-900 truncate">
              {trust.highlight}
            </span>
          </div>
        </div>

        {/* Headline */}
        <h1 className={`font-extrabold text-slate-950 mb-2 sm:mb-2.5 font-heading ${
          currentLang === 'ta' 
            ? 'text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-snug sm:leading-tight max-w-4xl mx-auto' 
            : 'text-[28px] xs:text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-tight sm:leading-[1.1]'
        }`}>
          {renderHeadline(hero.headline)}
        </h1>

        {/* Subheading */}
        <p className={`font-bold text-slate-700 mb-2.5 sm:mb-3.5 font-heading max-w-3xl mx-auto ${
          currentLang === 'ta'
            ? 'text-sm xs:text-base sm:text-xl md:text-2xl leading-relaxed'
            : 'text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight'
        }`}>
          {hero.subheading}
        </p>

        {/* Description */}
        <p className="text-xs xs:text-sm sm:text-base md:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed mb-5 sm:mb-6">
          {hero.description}
        </p>

        {/* Single Call To Action: Sleek Black CTA Button */}
        <div className="flex items-center justify-center mb-6 sm:mb-8">
          <button
            onClick={onOpenInquiryModal}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-2xl bg-black hover:bg-neutral-800 text-white font-black text-sm sm:text-base md:text-lg px-7 py-3.5 sm:px-9 sm:py-4 shadow-xl shadow-black/25 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <span>{hero.primaryCta}</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-white stroke-[3]" />
          </button>
        </div>

        {/* 3 Value Badges */}
        <div className="pt-5 sm:pt-6 border-t border-slate-200/80 max-w-3xl mx-auto">
          <div className="grid grid-cols-3 divide-x divide-slate-200/80 text-center items-start">
            
            {/* Badge 1: Packages Starting at ₹2,500 */}
            <div className="flex flex-col items-center justify-start px-1.5 xs:px-3 sm:px-4 py-1 group">
              <div className="w-10 h-10 xs:w-11 xs:h-11 rounded-xl xs:rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-center mb-1.5 xs:mb-2 sm:mb-2.5 shadow-2xs group-hover:scale-105 group-hover:bg-emerald-100 transition-all duration-200">
                <ClapperPlayIcon className="w-5 h-5 xs:w-6 xs:h-6 text-emerald-600" />
              </div>
              <span className="text-[11px] xs:text-xs sm:text-sm font-bold text-slate-900 leading-tight sm:leading-snug">
                {hero.badge1}
              </span>
            </div>

            {/* Badge 2: 48–72h Turnaround */}
            <div className="flex flex-col items-center justify-start px-1.5 xs:px-3 sm:px-4 py-1 group">
              <div className="w-10 h-10 xs:w-11 xs:h-11 rounded-xl xs:rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-center mb-1.5 xs:mb-2 sm:mb-2.5 shadow-2xs group-hover:scale-105 group-hover:bg-emerald-100 transition-all duration-200">
                <BoltIcon className="w-5 h-5 xs:w-6 xs:h-6 text-emerald-600" />
              </div>
              <span className="text-[11px] xs:text-xs sm:text-sm font-bold text-slate-900 leading-tight sm:leading-snug">
                {hero.badge2}
              </span>
            </div>

            {/* Badge 3: 100% Commercial Ad Rights */}
            <div className="flex flex-col items-center justify-start px-1.5 xs:px-3 sm:px-4 py-1 group">
              <div className="w-10 h-10 xs:w-11 xs:h-11 rounded-xl xs:rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-center mb-1.5 xs:mb-2 sm:mb-2.5 shadow-2xs group-hover:scale-105 group-hover:bg-emerald-100 transition-all duration-200">
                <Layers3Icon className="w-5 h-5 xs:w-6 xs:h-6 text-emerald-600" />
              </div>
              <span className="text-[11px] xs:text-xs sm:text-sm font-bold text-slate-900 leading-tight sm:leading-snug">
                {hero.badge3}
              </span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
