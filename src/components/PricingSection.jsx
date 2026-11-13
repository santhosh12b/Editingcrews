import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

// 5 Custom Icons matching Page 4 of the brochure
function AiVideoIcon(props) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M7 3l1 2.5L10.5 6.5 8 7.5 7 10 6 7.5 3.5 6.5 6 5.5z" fill="currentColor" stroke="none" />
      <path d="M12 2l.5 1.5L14 4l-1.5.5L12 6l-.5-1.5L10 4l1.5-.5z" fill="currentColor" stroke="none" />
      <rect x="3" y="10" width="18" height="15" rx="3" />
      <polygon points="10,14.5 15,17.5 10,20.5" fill="currentColor" stroke="none" />
      <path d="M21 14l6-3.5v14l-6-3.5" />
    </svg>
  );
}

function VoiceoverIcon(props) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="11" y="4" width="10" height="15" rx="5" />
      <line x1="14" y1="9" x2="18" y2="9" />
      <line x1="13" y1="12" x2="19" y2="12" />
      <line x1="14" y1="15" x2="18" y2="15" />
      <path d="M7 13a9 9 0 0 0 18 0" />
      <line x1="16" y1="22" x2="16" y2="28" />
      <line x1="11" y1="28" x2="21" y2="28" />
    </svg>
  );
}

function EditingIcon(props) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M14 6H7a3 3 0 0 0-3 3v16a3 3 0 0 0 3 3h16a3 3 0 0 0 3-3v-7" />
      <path d="M24.5 4.5a2.5 2.5 0 0 1 3.5 3.5L15 21l-5 1 1-5z" />
      <line x1="21.5" y1="7.5" x2="25" y2="11" />
    </svg>
  );
}

function RevisionsIcon(props) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M26 12A10 10 0 0 0 7.5 9.5" />
      <polyline points="7 4 7 10 13 10" />
      <path d="M6 20a10 10 0 0 0 18.5 2.5" />
      <polyline points="25 28 25 22 19 22" />
    </svg>
  );
}

function DeliveryIcon(props) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <line x1="2" y1="12" x2="6" y2="12" />
      <line x1="1" y1="16" x2="5" y2="16" />
      <line x1="3" y1="20" x2="7" y2="20" />
      <path d="M8 8h12v14H8z" />
      <path d="M20 12h4.5l3.5 4v6h-8z" />
      <circle cx="12" cy="24" r="2.5" />
      <circle cx="24" cy="24" r="2.5" />
    </svg>
  );
}

const packages = [
  {
    id: '30s',
    durationEn: '30 seconds',
    durationTa: '30 வினாடிகள்',
    rateEn: '₹5,000/min',
    rateTa: '₹5,000/நிமிடம்',
    price: '₹2,500'
  },
  {
    id: '1m',
    durationEn: '1 minute',
    durationTa: '1 நிமிடம்',
    rateEn: '₹4,000/min',
    rateTa: '₹4,000/நிமிடம்',
    price: '₹4,000'
  },
  {
    id: '2m',
    durationEn: '2 minutes',
    durationTa: '2 நிமிடங்கள்',
    rateEn: '₹3,500/min',
    rateTa: '₹3,500/நிமிடம்',
    price: '₹7,000'
  },
  {
    id: '5m',
    durationEn: '5 minutes',
    durationTa: '5 நிமிடங்கள்',
    rateEn: '₹3,200/min',
    rateTa: '₹3,200/நிமிடம்',
    price: '₹16,000'
  },
  {
    id: '10m',
    durationEn: '10 minutes',
    durationTa: '10 நிமிடங்கள்',
    rateEn: '₹3,000/min',
    rateTa: '₹3,000/நிமிடம்',
    price: '₹30,000'
  }
];

export default function PricingSection({ onOpenInquiryModal }) {
  const { currentLang } = useLanguage();
  const isTa = currentLang === 'ta';

  const inclusionFeatures = [
    {
      icon: AiVideoIcon,
      line1: isTa ? "AI வீடியோ" : "AI Video",
      line2: isTa ? "உருவாக்கம்" : "Generation"
    },
    {
      icon: VoiceoverIcon,
      line1: isTa ? "பின்னணி குரல்" : "Voiceover",
      line2: isTa ? "(தமிழ் / ஆங்கிலம்)" : "(Tamil / English)"
    },
    {
      icon: EditingIcon,
      line1: isTa ? "எடிட்டிங் &" : "Editing &",
      line2: isTa ? "மோஷன் டிசைன்" : "Motion Design"
    },
    {
      icon: RevisionsIcon,
      line1: isTa ? "திருத்தங்கள்" : "Revisions",
      line2: isTa ? "(ஒப்பந்தப்படி)" : "(As Agreed)"
    },
    {
      icon: DeliveryIcon,
      line1: isTa ? "இறுதி டெலிவரி" : "Final Delivery",
      line2: isTa ? "(HD தரத்தில்)" : "(HD Formats)"
    }
  ];

  return (
    <section id="pricing" className="py-16 sm:py-20 md:py-24 bg-[#F7F5EE] relative overflow-hidden border-b border-amber-200/60 scroll-mt-20">
      
      {/* Background Soft Mesh Ambient Lighting */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-gradient-to-tr from-emerald-100/40 via-amber-100/30 to-yellow-100/20 rounded-full blur-3xl -z-10"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        
        {/* Section Header matching Page 4 of Brochure */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#064E3B] font-heading leading-tight">
            AI Video Production{' '}
            <span className="font-serif italic text-[#D97706] font-normal">
              Packages
            </span>
          </h2>
          <p className="text-slate-700 text-base sm:text-lg md:text-xl font-medium mt-3 leading-relaxed">
            {isTa 
              ? "எளிமையான, வெளிப்படையான மற்றும் நெகிழ்வான கட்டணம்." 
              : "Simple, transparent and flexible pricing."}
          </p>
        </div>

        {/* The White Pricing Table Card (Exact match of Image 2) */}
        <div className="bg-white rounded-3xl border border-amber-200/80 shadow-[0_4px_30px_rgba(6,95,70,0.06)] overflow-hidden">
          <div className="divide-y divide-amber-200/50">
            {packages.map((pkg) => (
              <div 
                key={pkg.id}
                onClick={() => onOpenInquiryModal && onOpenInquiryModal(pkg)}
                className="px-6 py-4 sm:px-10 sm:py-5 flex items-center justify-between hover:bg-emerald-50/50 transition-colors cursor-pointer group"
              >
                {/* Left: Duration + Rate */}
                <div className="flex-1">
                  <h3 className="text-lg sm:text-2xl font-extrabold text-[#064E3B] font-heading tracking-tight group-hover:text-emerald-700 transition-colors">
                    {isTa ? pkg.durationTa : pkg.durationEn}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-semibold mt-0.5">
                    {isTa ? pkg.rateTa : pkg.rateEn}
                  </p>
                </div>

                {/* Center Divider: Vertical line */}
                <div className="h-10 w-px bg-amber-200/60 mx-4 sm:mx-8 shrink-0"></div>

                {/* Right: Large Bold Green Price */}
                <div className="w-32 sm:w-44 text-right shrink-0">
                  <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#047857] tracking-tight font-heading">
                    {pkg.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5-Feature Inclusions Card (Matching bottom of Image 2 with exact icons) */}
        <div className="mt-6 sm:mt-8 bg-white rounded-2xl sm:rounded-3xl border border-amber-200/80 shadow-md p-4 sm:p-5">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-2 items-center">
            {inclusionFeatures.map((feat, idx) => {
              const IconComp = feat.icon;
              return (
                <div 
                  key={idx} 
                  className={`flex flex-col items-center text-center px-2 py-1 ${
                    idx !== inclusionFeatures.length - 1 ? 'sm:border-r sm:border-amber-200/70' : ''
                  }`}
                >
                  <div className="text-[#047857] mb-2 shrink-0">
                    <IconComp className="w-7 h-7 sm:w-8 sm:h-8" />
                  </div>
                  <div className="font-bold text-[#064E3B] text-xs sm:text-[13px] leading-tight font-heading">
                    <div>{feat.line1}</div>
                    <div>{feat.line2}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Choose Package Call to Action Button */}
        <div className="mt-8 sm:mt-10 text-center">
          <button
            type="button"
            onClick={() => onOpenInquiryModal && onOpenInquiryModal()}
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-slate-950 font-black text-sm sm:text-base shadow-xl shadow-amber-500/30 transition-all cursor-pointer active:scale-95"
          >
            <span>{isTa ? "உங்கள் பேக்கேஜை தேர்வு செய்யவும்" : "Choose Your Video Package"}</span>
            <ArrowRight className="w-4 h-4 text-slate-950 stroke-[3]" />
          </button>
        </div>

      </div>
    </section>
  );
}
