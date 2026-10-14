import React from 'react';
import { Clapperboard } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  const f = t.footer;

  return (
    <footer className="border-t border-slate-200/80 bg-white py-10 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
          
          {/* Logo & Brand Tagline */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <a href="#" className="flex items-center space-x-2.5 group">
              <div className="p-2 rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-600/20 group-hover:bg-indigo-700 transition-colors">
                <Clapperboard className="w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold tracking-tight font-heading text-slate-900">
                EDITING <span className="text-indigo-600">CREW</span>
              </span>
            </a>
            <span className="hidden sm:inline text-slate-300">|</span>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              AI Video Production for Businesses & Brands
            </p>
          </div>

          {/* Copyright Notice */}
          <p className="text-xs sm:text-sm text-slate-500">
            {f.rights}
          </p>

        </div>
      </div>
    </footer>
  );
}
