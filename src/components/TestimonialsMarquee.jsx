import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export const reviewImages = [
  {
    id: 1,
    src: "/review.png",
    author: "Vignesh Natarajan",
    alt: "Google review by Vignesh Natarajan - 5 stars: Excellent work ethics! Outstanding customer satisfaction"
  },
  {
    id: 2,
    src: "/review2.png",
    author: "S Sujin",
    alt: "Google review by S Sujin - 5 stars: Good AI provides excellent video-making services"
  },
  {
    id: 3,
    src: "/review3.png",
    author: "Bijoy Cherian",
    alt: "Google review by Bijoy Cherian - 5 stars: Very understanding and creative team"
  },
  {
    id: 4,
    src: "/review4.png",
    author: "Salem SS Travel",
    alt: "Google review by Salem SS Travel - 5 stars: Superb Creativity. Very Good Work."
  }
];

export default function TestimonialsMarquee() {
  const { t } = useLanguage();
  const heading = t?.testimonials?.heading || "Hear what they say about us";
  const subheading = t?.testimonials?.subheading || "See what our clients have to say about Editing Crew.";

  // Duplicate for smooth, continuous loop
  const row1 = [...reviewImages, ...reviewImages, ...reviewImages, ...reviewImages];
  const row2 = [
    ...reviewImages.slice().reverse(),
    ...reviewImages.slice().reverse(),
    ...reviewImages.slice().reverse(),
    ...reviewImages.slice().reverse()
  ];

  return (
    <section className="py-12 sm:py-20 md:py-28 bg-white overflow-hidden relative border-t border-slate-100">
      <div className="container mx-auto px-4 sm:px-6 mb-8 sm:mb-12 md:mb-16 text-center">
        <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 font-heading">
          {heading}
        </h2>
        <p className="text-slate-500 text-xs xs:text-sm sm:text-base max-w-xl mx-auto mt-2 sm:mt-3">
          {subheading}
        </p>
      </div>

      {/* Marquee Wrapper with side fade gradients */}
      <div className="relative w-full overflow-hidden">
        
        {/* Left & Right Subtle Fade Masks (compact on mobile so cards are fully visible) */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-6 xs:w-10 sm:w-24 md:w-40 z-20 bg-gradient-to-r from-white via-white/80 to-transparent"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-6 xs:w-10 sm:w-24 md:w-40 z-20 bg-gradient-to-l from-white via-white/80 to-transparent"></div>

        {/* Row 1 - Leftward scrolling */}
        <div 
          className="group flex overflow-hidden py-1.5 sm:py-3 [gap:var(--gap)] flex-row"
          style={{ '--gap': '1rem', '--duration': '85s' }}
        >
          <div className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row group-hover:[animation-play-state:paused]">
            {row1.map((item, idx) => (
              <ReviewImageCard key={`row1-${item.id}-${idx}`} review={item} />
            ))}
          </div>
          <div 
            aria-hidden="true" 
            className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row group-hover:[animation-play-state:paused]"
          >
            {row1.map((item, idx) => (
              <ReviewImageCard key={`row1-clone-${item.id}-${idx}`} review={item} />
            ))}
          </div>
        </div>

        {/* Row 2 - Rightward reverse scrolling */}
        <div 
          className="group flex overflow-hidden py-1.5 sm:py-3 [gap:var(--gap)] flex-row"
          style={{ '--gap': '1rem', '--duration': '85s' }}
        >
          <div 
            className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row group-hover:[animation-play-state:paused]"
            style={{ animationDirection: 'reverse' }}
          >
            {row2.map((item, idx) => (
              <ReviewImageCard key={`row2-${item.id}-${idx}`} review={item} />
            ))}
          </div>
          <div 
            aria-hidden="true" 
            className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row group-hover:[animation-play-state:paused]"
            style={{ animationDirection: 'reverse' }}
          >
            {row2.map((item, idx) => (
              <ReviewImageCard key={`row2-clone-${item.id}-${idx}`} review={item} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

function ReviewImageCard({ review }) {
  return (
    <div className="relative w-[300px] xs:w-[330px] sm:w-[480px] md:w-[560px] lg:w-[620px] h-[135px] xs:h-[145px] sm:h-[185px] md:h-[205px] shrink-0 rounded-2xl border border-slate-200/90 bg-white p-2 xs:p-2.5 sm:p-4 md:p-5 shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex items-center justify-center">
      <img
        src={review.src}
        alt={review.alt}
        className="w-full h-full object-contain select-none pointer-events-none"
        loading="lazy"
      />
    </div>
  );
}
