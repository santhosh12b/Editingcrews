import React, { useRef, useEffect } from 'react';
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
  const videoRef = useRef(null);

  // Guarantee autoplay on mount across all mobile & desktop browsers
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }
  }, []);

  // Ensure "Real Estate Businesses" pops in rich accent colour, and keep price tokens atomic
  const renderHeadline = (text) => {
    if (!text || typeof text !== 'string') return text;

    // Highlight "Real Estate Businesses" in vibrant glowing Emerald Green (#34D399)
    if (text.includes("Real Estate Businesses")) {
      const parts = text.split("Real Estate Businesses");
      return (
        <>
          {parts[0]}
          <span className="text-emerald-400 inline-block drop-shadow-[0_2px_14px_rgba(52,211,153,0.45)]">Real Estate Businesses</span>
          {parts[1]}
        </>
      );
    }

    // Highlight "ரியல் எஸ்டேட் நிறுவனங்களுக்கான" in Tamil
    if (text.includes("ரியல் எஸ்டேட் நிறுவனங்களுக்கான")) {
      const parts = text.split("ரியல் எஸ்டேட் நிறுவனங்களுக்கான");
      return (
        <>
          <span className="text-emerald-400 inline-block drop-shadow-[0_2px_14px_rgba(52,211,153,0.45)]">ரியல் எஸ்டேட் நிறுவனங்களுக்கான</span>
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
    <section className="relative overflow-hidden min-h-screen min-h-[100dvh] w-full flex flex-col justify-between text-white bg-slate-950 pt-20 sm:pt-24 lg:pt-28 pb-4 sm:pb-6">
      
      {/* Background Autoplay Loop Video (Full bleed 100vw × 100vh) */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        webkit-playsinline="true"
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
      >
        <source src="/video/hero-estate.mp4" type="video/mp4" />
      </video>

      {/* Black Overlay Layers (Balanced 60% tint so video is actively visible in motion) */}
      <div className="absolute inset-0 bg-black/60 z-[1] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/85 z-[2] pointer-events-none" />

      {/* Main Center Content (Vertically centered in viewport) */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl text-center relative z-10 my-auto flex flex-col items-center justify-center py-4 sm:py-6">
        
        {/* Social Proof Trust Badge */}
        <div className="inline-flex items-center gap-2 sm:gap-3 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-xs hover:border-emerald-400/50 hover:bg-white/15 transition-all duration-200 mb-3 sm:mb-4 max-w-full">
          {/* Overlapping Avatars Stack */}
          <div className="flex -space-x-1.5 sm:-space-x-2 overflow-hidden shrink-0">
            {trustAvatars.map((avatar, idx) => (
              <img
                key={idx}
                src={avatar.url}
                alt={avatar.name}
                loading="eager"
                className="inline-block h-6 w-6 sm:h-7 sm:w-7 rounded-full ring-2 ring-white/20 object-cover bg-slate-800 shadow-xs"
              />
            ))}
          </div>

          {/* Emerald Trend Icon */}
          <TrendingUp className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 text-emerald-400 stroke-[2.5] shrink-0" />

          {/* Trust Text */}
          <div className="text-[11px] sm:text-sm text-white flex items-center leading-none">
            <span className="font-extrabold text-white truncate">
              {trust.highlight}
            </span>
          </div>
        </div>

        {/* Headline */}
        <h1 className={`font-extrabold text-white mb-2.5 sm:mb-3 font-heading tracking-tight ${
          currentLang === 'ta' 
            ? 'text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-snug sm:leading-tight max-w-4xl mx-auto' 
            : 'text-[28px] xs:text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight sm:leading-[1.1]'
        }`}>
          {renderHeadline(hero.headline)}
        </h1>

        {/* Subheading in Clean Crisp White */}
        <p className={`font-bold text-white mb-2 sm:mb-3 font-heading max-w-3xl mx-auto drop-shadow-sm ${
          currentLang === 'ta'
            ? 'text-sm xs:text-base sm:text-xl md:text-2xl leading-relaxed'
            : 'text-base xs:text-lg sm:text-2xl md:text-3xl tracking-tight'
        }`}>
          {hero.subheading}
        </p>

        {/* Description in Light Silver */}
        <p className="text-xs xs:text-sm sm:text-base md:text-lg text-slate-200/90 max-w-3xl mx-auto leading-relaxed mb-5 sm:mb-7 font-normal">
          {hero.description}
        </p>

        {/* Single Call To Action: Clean White Button with Black Text */}
        <div className="flex items-center justify-center">
          <button
            onClick={onOpenInquiryModal}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full bg-white hover:bg-slate-100 text-slate-950 font-bold text-sm sm:text-base md:text-lg px-8 py-3.5 sm:px-10 sm:py-4 shadow-xl transition-all duration-200 transform hover:scale-[1.03] active:scale-[0.98] cursor-pointer group"
          >
            <span>{hero.primaryCta}</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-slate-950 stroke-[2.5] group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </div>

      </div>

      {/* Bottom Tier (Anchored cleanly at bottom of viewport) */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center relative z-10 pb-2 sm:pb-3">
        {/* 3 Value Badges: Glass Card Styling */}
        <div className="pt-4 sm:pt-5 border-t border-white/15">
          <div className="grid grid-cols-3 divide-x divide-white/15 text-center items-start">
            
            {/* Badge 1: Packages Starting at ₹2,500 */}
            <div className="flex flex-col items-center justify-start px-1.5 xs:px-3 sm:px-4 py-0.5 group">
              <div className="w-9 h-9 xs:w-10 xs:h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center mb-1 xs:mb-1.5 shadow-2xs group-hover:scale-105 group-hover:bg-white/15 transition-all duration-200">
                <ClapperPlayIcon className="w-4.5 h-4.5 xs:w-5 xs:h-5 text-emerald-400" />
              </div>
              <span className="text-[11px] xs:text-xs sm:text-sm font-bold text-white leading-tight sm:leading-snug">
                {hero.badge1}
              </span>
            </div>

            {/* Badge 2: 48–72h Turnaround */}
            <div className="flex flex-col items-center justify-start px-1.5 xs:px-3 sm:px-4 py-0.5 group">
              <div className="w-9 h-9 xs:w-10 xs:h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center mb-1 xs:mb-1.5 shadow-2xs group-hover:scale-105 group-hover:bg-white/15 transition-all duration-200">
                <BoltIcon className="w-4.5 h-4.5 xs:w-5 xs:h-5 text-emerald-400" />
              </div>
              <span className="text-[11px] xs:text-xs sm:text-sm font-bold text-white leading-tight sm:leading-snug">
                {hero.badge2}
              </span>
            </div>

            {/* Badge 3: 100% Commercial Ad Rights */}
            <div className="flex flex-col items-center justify-start px-1.5 xs:px-3 sm:px-4 py-0.5 group">
              <div className="w-9 h-9 xs:w-10 xs:h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center mb-1 xs:mb-1.5 shadow-2xs group-hover:scale-105 group-hover:bg-white/15 transition-all duration-200">
                <Layers3Icon className="w-4.5 h-4.5 xs:w-5 xs:h-5 text-emerald-400" />
              </div>
              <span className="text-[11px] xs:text-xs sm:text-sm font-bold text-white leading-tight sm:leading-snug">
                {hero.badge3}
              </span>
            </div>

          </div>
        </div>
      </div>

    </section>
  );
}
