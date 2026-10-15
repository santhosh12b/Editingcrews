import React, { useState, useEffect, useRef } from 'react';
import { X, CheckCircle2, ArrowRight, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { GOOGLE_SHEETS_SCRIPT_URL } from '../config/googleSheets';

const countryList = [
  { code: 'DE', dialCode: '+49', name: 'Germany (Deutschland)' },
  { code: 'AT', dialCode: '+43', name: 'Austria (Österreich)' },
  { code: 'CH', dialCode: '+41', name: 'Switzerland (Schweiz)' },
  { code: 'GB', dialCode: '+44', name: 'United Kingdom' },
  { code: 'US', dialCode: '+1', name: 'United States' },
  { code: 'FR', dialCode: '+33', name: 'France' },
  { code: 'ES', dialCode: '+34', name: 'Spain (España)' },
  { code: 'IT', dialCode: '+39', name: 'Italy (Italia)' },
  { code: 'NL', dialCode: '+31', name: 'Netherlands' },
  { code: 'BE', dialCode: '+32', name: 'Belgium' },
  { code: 'PL', dialCode: '+48', name: 'Poland' },
  { code: 'SE', dialCode: '+46', name: 'Sweden' },
  { code: 'NO', dialCode: '+47', name: 'Norway' },
  { code: 'DK', dialCode: '+45', name: 'Denmark' },
  { code: 'FI', dialCode: '+358', name: 'Finland' },
  { code: 'IE', dialCode: '+353', name: 'Ireland' },
  { code: 'PT', dialCode: '+351', name: 'Portugal' },
  { code: 'IN', dialCode: '+91', name: 'India' },
  { code: 'AE', dialCode: '+971', name: 'UAE (Dubai)' }
];

export default function CreateVideoModal({ isOpen, onClose, initialService }) {
  const { currentLang, t } = useLanguage();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(countryList[0]);
  const [phone, setPhone] = useState('');
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [projectType, setProjectType] = useState(initialService || '');
  const [duration, setDuration] = useState(1);
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const countryDropdownRef = useRef(null);

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

  // Handle click outside country dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target)) {
        setIsCountryDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!isOpen) return null;

  const handleClose = () => {
    setIsSubmitting(false);
    setIsSuccess(false);
    setName('');
    setEmail('');
    setPhone('');
    setSelectedCountry(countryList[0]);
    setIsCountryDropdownOpen(false);
    setDescription('');
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const now = new Date();
    const formattedDate = now.toLocaleDateString('de-DE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });

    const fullPhone = phone.trim() ? `${selectedCountry.dialCode} ${phone.trim()}` : '';

    const payload = {
      date: formattedDate,
      name: name.trim(),
      email: email.trim(),
      phone: fullPhone,
      phoneNumber: fullPhone,
      countryCode: selectedCountry.dialCode,
      country: selectedCountry.code,
      projectType: projectType || (currentLang === 'de' ? 'Allgemeine Anfrage' : 'General Enquiry'),
      duration: duration || 1,
      totalPrice: `€${calculatedTotal}`,
      description: description.trim()
    };

    if (GOOGLE_SHEETS_SCRIPT_URL) {
      try {
        await fetch(GOOGLE_SHEETS_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'text/plain;charset=utf-8'
          },
          body: JSON.stringify(payload)
        });
      } catch (err) {
        console.error('Failed to submit to Google Sheets:', err);
      }
    } else {
      // Simulate brief network delay if no URL is configured yet
      await new Promise((resolve) => setTimeout(resolve, 600));
    }

    setIsSubmitting(false);
    setIsSuccess(true);
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
    phoneLabel: isGerman ? "Telefon / WhatsApp *" : "Phone / WhatsApp *",
    phonePlaceholder: isGerman ? "0170 1234567" : "170 1234567",
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
      <div className="relative z-10 w-full max-w-[620px] rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-8 md:p-9 shadow-2xl text-slate-900 overflow-hidden max-h-[92vh] overflow-y-auto">
        
        {/* Close Button (Circular, matching screenshot) */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors z-20 focus:outline-none cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4 stroke-[2.5]" />
        </button>

        {!isSuccess ? (
          <div>
            {/* Modal Header */}
            <div className="pr-10 mb-5 sm:mb-6">
              <h3 className="text-xl sm:text-2xl md:text-[26px] font-extrabold text-slate-900 tracking-tight font-heading mb-1.5">
                {strings.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                {strings.subtitle}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
              
              {/* Row 1: Your Name & Email Address (2 columns) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
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

              {/* Row 2: Phone Number (with Country Code) & Project Type (2 columns) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-1.5 whitespace-nowrap">
                    {strings.phoneLabel}
                  </label>
                  <div className="relative flex rounded-xl border border-slate-200 bg-slate-50/50 focus-within:ring-2 focus-within:ring-indigo-600/30 focus-within:border-indigo-600 transition-all">
                    
                    {/* Country Code Trigger Button */}
                    <div className="relative shrink-0" ref={countryDropdownRef}>
                      <button
                        type="button"
                        onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                        className="h-full flex items-center gap-1.5 px-2.5 sm:px-3 py-2.5 sm:py-3 bg-slate-100/80 hover:bg-slate-200/80 text-slate-900 font-bold text-xs sm:text-sm border-r border-slate-200 rounded-l-xl transition-colors cursor-pointer select-none"
                        aria-label="Select Country Code"
                        aria-expanded={isCountryDropdownOpen}
                      >
                        <span className="text-[10px] sm:text-xs font-black text-indigo-700 bg-indigo-50 border border-indigo-200 px-1.5 py-0.5 rounded tracking-wide">
                          {selectedCountry.code}
                        </span>
                        <span className="font-extrabold text-slate-800 tracking-tight">
                          {selectedCountry.dialCode}
                        </span>
                        <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-150 ${isCountryDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>

                      {/* Dropdown Popover */}
                      {isCountryDropdownOpen && (
                        <div className="absolute top-full left-0 mt-1.5 w-60 sm:w-64 max-h-56 overflow-y-auto rounded-2xl border border-slate-200 bg-white p-1.5 shadow-2xl z-50 animate-in fade-in-50 zoom-in-95 duration-150">
                          <div className="space-y-0.5">
                            {countryList.map((c) => {
                              const isSelected = selectedCountry.code === c.code;
                              return (
                                <button
                                  key={c.code}
                                  type="button"
                                  onClick={() => {
                                    setSelectedCountry(c);
                                    setIsCountryDropdownOpen(false);
                                  }}
                                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                                    isSelected 
                                      ? 'bg-indigo-50 text-indigo-700 font-bold' 
                                      : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                                  }`}
                                >
                                  <div className="flex items-center gap-2 truncate">
                                    <span className="text-[10px] font-black text-slate-600 bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded">
                                      {c.code}
                                    </span>
                                    <span className="truncate">{c.name}</span>
                                  </div>
                                  <span className="text-slate-500 font-bold text-xs ml-2 shrink-0">
                                    {c.dialCode}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Phone Number Input */}
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={strings.phonePlaceholder}
                      className="w-full bg-transparent px-3 py-2.5 sm:py-3 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none rounded-r-xl"
                    />
                  </div>
                </div>

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
              </div>

              {/* Row 3: Target Duration & Estimated Total (2 columns) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 items-center">
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

                <div>
                  <span className="block text-xs sm:text-sm font-bold text-transparent select-none mb-1.5 hidden sm:block">
                    Total
                  </span>
                  <div className="rounded-xl border border-indigo-100 bg-indigo-50/80 px-3.5 py-2.5 sm:py-3 flex items-center justify-between transition-colors">
                    <span className="text-xs sm:text-sm font-bold text-slate-700">
                      {strings.estimatedTotalLabel}
                    </span>
                    <span className="text-lg sm:text-xl font-black text-indigo-600 font-heading tracking-tight">
                      €{calculatedTotal}
                    </span>
                  </div>
                </div>
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
