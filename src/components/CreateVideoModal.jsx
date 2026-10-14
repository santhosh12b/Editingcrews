import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function CreateVideoModal({ isOpen, onClose, initialService }) {
  const { currentLang, t } = useLanguage();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState(initialService || '');
  const [duration, setDuration] = useState(1);
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (initialService) {
      setProjectType(initialService);
    }
  }, [initialService]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClose = () => {
    setIsSubmitting(false);
    setIsSuccess(false);
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 500);
  };

  const calculatedTotal = (parseInt(duration) || 1) * 69;

  // Localized texts based on current language
  const isGerman = currentLang === 'de';

  const strings = {
    title: isGerman ? "Starten Sie Ihr Videoprojekt" : "Start Your Video Project",
    subtitle: isGerman 
      ? "Erzählen Sie uns von Ihrem Produkt, Ihrer Dienstleistung oder Ihrer Idee. Wir verwandeln sie in ein überzeugendes Video für Ihr Unternehmen."
      : "Tell us about your product, service or creative idea. We'll help turn it into a compelling video for your business.",
    nameLabel: isGerman ? "Ihr Name *" : "Your Name *",
    namePlaceholder: "e.g. Elena Rostova",
    emailLabel: isGerman ? "E-Mail-Adresse *" : "Email Address *",
    emailPlaceholder: "name@company.com",
    projectTypeLabel: isGerman ? "Projekttyp" : "Project Type",
    projectTypePlaceholder: isGerman ? "Videokategorie auswählen" : "Select a video category",
    durationLabel: isGerman ? "Zieldauer (Minuten)" : "Target Duration (minutes)",
    estimatedTotalLabel: isGerman ? "Geschätzte Gesamtsumme (@ 69 €/Min.):" : "Estimated Total (@ €69/min):",
    descLabel: isGerman ? "Erzählen Sie uns von Ihrem Produkt oder Ihrer Idee" : "Tell us about your product or idea",
    descPlaceholder: isGerman 
      ? "Beschreiben Sie das Produkt, die gewünschte Stimmung, Ihr Branding oder konkrete Szenen, die Sie sich vorstellen..."
      : "Tell us about the product, mood, branding, or specific scenes you envision...",
    submitBtn: isGerman ? "Projektanfrage absenden" : "Submit Project Enquiry",
    submitting: isGerman ? "Wird gesendet..." : "Submitting Enquiry...",
    successTitle: isGerman ? "Vielen Dank für Ihre Anfrage!" : "Enquiry Received Successfully!",
    successDesc: isGerman 
      ? `Danke, ${name || 'Kunde'}. Unser Produktionsteam wird sich innerhalb von 12 Stunden mit den ersten Vorschlägen bei Ihnen melden.`
      : `Thank you, ${name || 'there'}. Our video production directors will reach out within 12 hours with script & storyboard previews.`,
    successClose: isGerman ? "Schließen" : "Close"
  };

  // Video categories from services
  const categories = [
    { value: 'product-ads', label: isGerman ? 'Produkt-Videoanzeigen' : 'Product Video Ads' },
    { value: 'explainers', label: isGerman ? 'Service-Erklärvideos' : 'Service Explainer Videos' },
    { value: 'animated-stories', label: isGerman ? 'Animierte Geschichten' : 'Animated Stories' },
    { value: 'cinematic-vfx', label: isGerman ? 'Cinematische Ads & VFX' : 'Cinematic Ads & VFX' },
    { value: 'promotional', label: isGerman ? 'Unternehmens- & Promotion-Videos' : 'Business Promotional Videos' },
    { value: 'multilingual', label: isGerman ? 'Mehrsprachige Videos (Europa)' : 'Multilingual Videos (European Markets)' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* Backdrop overlay */}
      <div className="absolute inset-0" onClick={handleClose}></div>

      {/* Modal Dialog Card */}
      <div className="relative z-10 w-full max-w-[620px] rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 md:p-9 shadow-2xl text-slate-900 overflow-hidden max-h-[92vh] overflow-y-auto">
        
        {/* Close Button (Circular, matching screenshot) */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-5 right-5 sm:top-6 sm:right-6 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors z-20 focus:outline-none"
          aria-label="Close modal"
        >
          <X className="w-4 h-4 stroke-[2.5]" />
        </button>

        {!isSuccess ? (
          <div>
            {/* Modal Header */}
            <div className="pr-10 mb-6">
              <h3 className="text-2xl sm:text-[26px] font-extrabold text-slate-900 tracking-tight font-heading mb-1.5">
                {strings.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                {strings.subtitle}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              
              {/* Row 1: Your Name & Email Address (2 columns) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-1.5">
                    {strings.nameLabel}
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={strings.namePlaceholder}
                    className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600/30 focus:border-indigo-600 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-1.5">
                    {strings.emailLabel}
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={strings.emailPlaceholder}
                    className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600/30 focus:border-indigo-600 transition-all"
                  />
                </div>
              </div>

              {/* Row 2: Project Type & Target Duration (2 columns) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-1.5">
                    {strings.projectTypeLabel}
                  </label>
                  <select
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600/30 focus:border-indigo-600 transition-all cursor-pointer"
                  >
                    <option value="">{strings.projectTypePlaceholder}</option>
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.label}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-1.5">
                    {strings.durationLabel}
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="60"
                    value={duration}
                    onChange={(e) => setDuration(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600/30 focus:border-indigo-600 transition-all"
                  />
                </div>
              </div>

              {/* Row 3: Estimated Total Highlight Box (Styled in Brand Indigo instead of orange) */}
              <div className="rounded-2xl border border-indigo-100 bg-indigo-50/70 p-4 sm:p-4.5 flex items-center justify-between transition-colors">
                <span className="text-xs sm:text-sm font-bold text-slate-700">
                  {strings.estimatedTotalLabel}
                </span>
                <span className="text-xl sm:text-2xl font-black text-indigo-600 font-heading tracking-tight">
                  €{calculatedTotal}
                </span>
              </div>

              {/* Row 4: Tell us about your product or idea (Textarea) */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-1.5">
                  {strings.descLabel}
                </label>
                <textarea
                  rows="3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={strings.descPlaceholder}
                  className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600/30 focus:border-indigo-600 transition-all resize-none"
                ></textarea>
              </div>

              {/* Row 5: Submit Project Enquiry Button (Brand Indigo instead of orange) */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 sm:py-4 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white font-extrabold text-sm sm:text-base shadow-lg shadow-indigo-600/25 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <span>{strings.submitting}</span>
                  ) : (
                    <span>{strings.submitBtn}</span>
                  )}
                </button>
              </div>

            </form>
          </div>
        ) : (
          /* Success State */
          <div className="py-8 sm:py-10 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-5 shadow-sm">
              <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900 font-heading mb-3">
              {strings.successTitle}
            </h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto mb-8 leading-relaxed">
              {strings.successDesc}
            </p>
            <button
              type="button"
              onClick={handleClose}
              className="px-8 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
            >
              {strings.successClose}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
