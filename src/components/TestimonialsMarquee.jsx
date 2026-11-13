import React, { useState } from 'react';
import { LayoutGrid, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

// Official multi-color Google G Logo SVG
function GoogleIcon({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={`${className} shrink-0`} aria-label="Google Review">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
    </svg>
  );
}

// 5 Star Rating SVG Component
function StarRating({ count = 5 }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${count} out of 5 stars`}>
      {[...Array(count)].map((_, i) => (
        <svg key={i} className="w-4 h-4 fill-[#FABB05] text-[#FABB05]" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

// Single Google Review Card
function ReviewCard({ rev, idx, isExpanded, onToggleExpand, tText }) {
  const isLong = rev.quote && rev.quote.length > 140;

  return (
    <div className="bg-[#FFFFFF] rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs hover:shadow-lg hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between h-full min-h-[260px]">
      <div>
        {/* Reviewer Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3 min-w-0">
            {/* Avatar image with fallback initials */}
            {rev.avatarImg && (
              <img
                src={rev.avatarImg}
                alt={rev.name}
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full object-cover shrink-0 select-none shadow-xs border border-slate-200"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  const fallback = e.currentTarget.nextElementSibling;
                  if (fallback) fallback.style.display = "flex";
                }}
              />
            )}
            <div
              style={{
                backgroundColor: rev.avatarBg || "#E8F0FE",
                color: rev.avatarColor || "#1A73E8",
                display: rev.avatarImg ? "none" : "flex"
              }}
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full items-center justify-center font-bold text-sm sm:text-base shrink-0 select-none shadow-xs border border-white"
              aria-hidden="true"
            >
              {rev.initials || rev.name?.slice(0, 2).toUpperCase()}
            </div>

            <div className="min-w-0">
              <h3 className="font-bold text-[15px] sm:text-base text-slate-900 truncate leading-snug">
                {rev.name}
              </h3>
              <div className="text-xs text-[#70757A] flex items-center gap-1.5 flex-wrap mt-0.5">
                {rev.reviewCount && <span>{rev.reviewCount} •</span>}
                <span>{rev.date}</span>
                {rev.isNew && (
                  <span className="text-[10px] font-semibold text-[#1a73e8] bg-[#e8f0fe] px-1.5 py-0.5 rounded border border-[#d2e3fc]">
                    New
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Google G logo on top right of card */}
          <div className="p-1 rounded-full text-slate-400 hover:text-slate-600 transition-colors shrink-0" title="Google Review">
            <GoogleIcon className="w-5 h-5" />
          </div>
        </div>

        {/* 5-Star Rating */}
        <div className="mb-3">
          <StarRating count={rev.rating || 5} />
        </div>

        {/* Review Quote text with Read More */}
        <div className="text-[14px] sm:text-[15px] text-[#3c4043] leading-relaxed font-normal">
          <p className={!isExpanded && isLong ? "line-clamp-3" : ""}>
            "{rev.quote}"
          </p>
          {isLong && (
            <button
              type="button"
              onClick={() => onToggleExpand(idx)}
              className="text-xs font-semibold text-[#1A73E8] hover:text-[#174EA6] hover:underline mt-1.5 inline-block cursor-pointer focus:outline-none"
            >
              {isExpanded ? (tText.showLess || "Show less") : (tText.readMore || "Read more")}
            </button>
          )}
        </div>
      </div>

      {/* Card Footer */}
      <div className="mt-4 pt-3 border-t border-[#F1F3F4] text-[11px] text-[#70757A]">
        {tText.verifiedClient || "Verified Client • "}
        <span className="text-[#202124] font-medium">{rev.role}</span>
      </div>
    </div>
  );
}

export default function TestimonialsMarquee() {
  const { t } = useLanguage();
  const testInfo = t.testimonials || {};
  const allReviews = testInfo.items || [];

  const [isAllVisible, setIsAllVisible] = useState(false);
  const [expandedCards, setExpandedCards] = useState({});

  const handleToggleCard = (index) => {
    setExpandedCards((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const displayedReviews = isAllVisible ? allReviews : allReviews.slice(0, 3);

  return (
    <section id="testimonials" className="py-20 sm:py-24 bg-slate-50/70 border-t border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-6 mb-12 sm:mb-14">
          <div className="text-center md:text-left space-y-3 max-w-2xl">
            
            {/* Pill: GOOGLE REVIEWS */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-800 font-semibold text-xs tracking-wider uppercase shadow-2xs">
              <GoogleIcon className="w-3.5 h-3.5" />
              <span>{testInfo.badge || "GOOGLE REVIEWS"}</span>
            </div>

            {/* Title */}
            <h2 className="text-[28px] sm:text-[34px] md:text-[40px] font-extrabold text-slate-950 tracking-tight leading-tight font-heading">
              {testInfo.heading || "What Our Clients Say"}
            </h2>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {testInfo.subheading || "Honest feedback from founders, builders, and businesses who work with The Editing Crew."}
            </p>

            {/* Rating Summary Bar */}
            <div className="inline-flex items-center gap-2 pt-1 text-xs text-slate-600 flex-wrap justify-center md:justify-start">
              <span className="font-bold text-slate-950 text-sm">
                {testInfo.rating || "5.0"}
              </span>
              <StarRating count={5} />
              <span className="text-slate-400">•</span>
              <span>{testInfo.basedOn || "Based on verified Google reviews"}</span>
              <span className="text-slate-400">•</span>
              <span className="text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-300/60 shadow-2xs">
                {allReviews.length} {testInfo.verifiedBadge || "Verified Reviews"}
              </span>
            </div>
          </div>

          {/* View All Button (only if more than 3 reviews) */}
          {allReviews.length > 3 && (
            <button
              onClick={() => setIsAllVisible(!isAllVisible)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-xs sm:text-sm font-bold text-slate-900 shadow-xs transition-all cursor-pointer active:scale-95 shrink-0"
            >
              <LayoutGrid className="w-3.5 h-3.5 text-emerald-600" />
              <span>
                {isAllVisible 
                  ? (testInfo.showFirst3 || "Show First 3") 
                  : `${testInfo.viewAll || "View All"} (${allReviews.length})`}
              </span>
            </button>
          )}
        </div>

        {/* 3-Column Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {displayedReviews.map((rev, idx) => (
            <ReviewCard
              key={rev.id || idx}
              rev={rev}
              idx={idx}
              isExpanded={!!expandedCards[idx]}
              onToggleExpand={handleToggleCard}
              tText={testInfo}
            />
          ))}
        </div>

        {/* Bottom Trust & Verification Footer */}
        <div className="mt-10 sm:mt-12 pt-8 border-t border-[#F1F3F4] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-[#70757A]">
            <GoogleIcon className="w-4 h-4" />
            <span>{testInfo.sourceText || "Reviews sourced directly from verified Google clients"}</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://www.google.com/search?q=the+editing+crew+coimbatore"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-[#DADCE0] bg-[#FFFFFF] hover:bg-[#F8F9FA] text-xs sm:text-sm font-semibold text-[#202124] shadow-xs transition-all"
            >
              <span>{testInfo.writeReview || "Write a Review"}</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
