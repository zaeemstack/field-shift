import React, { useState, useEffect, useRef } from 'react';
import { Globe2, Menu, X, Satellite, Languages, ChevronDown, Check } from 'lucide-react';

export default function Navbar({ lang, setLang, t }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [currentLangCode, setCurrentLangCode] = useState(lang || 'en');
  const dropdownRef = useRef(null);

  const isUrdu = lang === 'ur';

  // Multi-language registry with flags, native names, and regional context
  const supportedLanguages = [
    { code: 'en', name: 'English', native: 'English', flag: '🌐', sub: 'Global' },
    { code: 'fr', name: 'French', native: 'Français', flag: '🇳🇪', sub: 'Niger / Sahel' },
    { code: 'ha', name: 'Hausa', native: 'Harshen Hausa', flag: '🇳🇪', sub: 'Maradi Region' },
    { code: 'ur', name: 'Urdu', native: 'اردو', flag: '🇵🇰', sub: 'پاکستان' },
    { code: 'ar', name: 'Arabic', native: 'العربية', flag: '🇸🇦', sub: 'الشرق الأوسط' },
    { code: 'es', name: 'Spanish', native: 'Español', flag: '🇪🇸', sub: 'Global' },
    { code: 'de', name: 'German', native: 'Deutsch', flag: '🇩🇪', sub: 'Europe' },
    { code: 'zh-CN', name: 'Chinese', native: '中文', flag: '🇨🇳', sub: 'Asia' },
    { code: 'hi', name: 'Hindi', native: 'हिन्दी', flag: '🇮🇳', sub: 'South Asia' }
  ];

  const currentLangObj = supportedLanguages.find(l => l.code === currentLangCode) || supportedLanguages[0];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectLanguage = (langCode) => {
    setCurrentLangCode(langCode);
    setLangDropdownOpen(false);

    // If Urdu, activate native Urdu typography & layout
    if (langCode === 'ur') {
      setLang('ur');
    } else {
      setLang('en');
    }

    // Trigger Google Translate if loaded
    try {
      const select = document.querySelector('.goog-te-combo');
      if (select) {
        select.value = langCode;
        select.dispatchEvent(new Event('change'));
      }
    } catch (err) {
      console.warn('Translate trigger:', err);
    }
  };

  const navLinks = [
    { href: '#data', label: t.nav.data },
    { href: '#analyze', label: t.nav.analyze },
    { href: '#blogs', label: t.nav.blogs },
    { href: '#research-map', label: isUrdu ? "علاقائی نقشہ" : "Research Map" },
    { href: '#faq', label: t.nav.faq },
    { href: '#team', label: t.nav.team },
  ];

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-[#080d19]/90 backdrop-blur-md border-b border-white/10 py-3 shadow-xl' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex items-center justify-between">
        
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 via-blue-600 to-yellow-500 p-0.5 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#080d19] rounded-full flex items-center justify-center">
              <Globe2 className="w-5 h-5 text-emerald-400 group-hover:rotate-45 transition-transform duration-500" />
            </div>
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-yellow-400 rounded-full animate-ping" />
          </div>
          <div>
            <span className="text-lg font-black tracking-tight text-white group-hover:text-yellow-400 transition-colors">
              Field Shift
            </span>
            <span className="hidden sm:block text-[9px] font-mono tracking-widest text-emerald-400 uppercase -mt-1 font-bold">
              NASA Space Apps 2026 • Maradi Study
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                link.href === '#research-map' 
                  ? 'text-emerald-400 hover:text-emerald-300 font-semibold' 
                  : 'text-slate-300 hover:text-yellow-400'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Actions: Multi-Language Selector Dropdown */}
        <div className="flex items-center gap-3" ref={dropdownRef}>
          {/* Universal Language Dropdown Button */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-white font-medium text-xs sm:text-sm backdrop-blur-md transition-all shadow-md active:scale-95 group"
              title="Select Language / زبان تبدیل کریں"
            >
              <Languages className="w-3.5 h-3.5 text-yellow-400 group-hover:rotate-12 transition-transform" />
              <span className="text-base leading-none">{currentLangObj.flag}</span>
              <span className="font-semibold text-xs sm:text-sm">{currentLangObj.native}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${langDropdownOpen ? 'rotate-180 text-yellow-400' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {langDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-[#0e1628]/95 backdrop-blur-xl border border-white/15 rounded-2xl p-2 shadow-2xl z-50 animate-fade-in space-y-1">
                <div className="px-3 py-1.5 border-b border-white/10 text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold flex items-center justify-between">
                  <span>Select Language</span>
                  <span className="text-emerald-400">9 Available</span>
                </div>

                <div className="max-h-64 overflow-y-auto space-y-0.5 custom-scrollbar pr-1">
                  {supportedLanguages.map((l) => {
                    const isSelected = l.code === currentLangCode;
                    return (
                      <button
                        key={l.code}
                        type="button"
                        onClick={() => handleSelectLanguage(l.code)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all ${
                          isSelected
                            ? 'bg-yellow-400/15 text-yellow-300 font-bold border border-yellow-400/30'
                            : 'text-slate-300 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-base">{l.flag}</span>
                          <div className="text-left">
                            <span className="block font-medium">{l.native}</span>
                            <span className="block text-[9px] text-slate-400">{l.name} • {l.sub}</span>
                          </div>
                        </div>

                        {isSelected && <Check className="w-3.5 h-3.5 text-yellow-400" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-white md:hidden"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#080d19]/95 backdrop-blur-xl border-b border-white/10 px-6 py-6 space-y-4 animate-fade-in">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-semibold text-slate-200 hover:text-yellow-400 py-1"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
