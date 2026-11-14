import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

export default function Navbar({ onOpenInquiryModal }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
      scrolled 
        ? 'bg-black/90 backdrop-blur-md border-b border-white/15 shadow-xl' 
        : 'bg-black/60 backdrop-blur-md border-b border-white/10'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex h-16 sm:h-20 items-center justify-between">
          
          {/* Logo */}
          <a 
            href="/" 
            className="flex items-center space-x-2.5 sm:space-x-3 group"
          >
            <img 
              src="/logo.png" 
              alt="The Editing Crew Logo" 
              className="w-9 h-9 sm:w-10 sm:h-10 object-contain drop-shadow-[0_4px_12px_rgba(52,211,153,0.35)] group-hover:scale-105 transition-transform duration-200" 
            />
            <span 
              className="text-xl sm:text-2xl font-bold text-white font-heading tracking-tight drop-shadow-md"
            >
              The Editing Crew
            </span>
          </a>

          {/* Right: Enquire CTA Button */}
          <div className="flex items-center">
            <button
              type="button"
              onClick={onOpenInquiryModal}
              className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all duration-200 active:scale-95 group cursor-pointer"
            >
              <span>Enquire Now</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
