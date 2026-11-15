import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Plus, Minus, Search } from 'lucide-react';
import { faqData } from '../data/faqData';

export default function FaqSection({ lang, t }) {
  const [openIndex, setOpenIndex] = useState(0); // first open by default
  const [searchQuery, setSearchQuery] = useState('');
  const isUrdu = lang === 'ur';

  const faqs = isUrdu ? faqData.ur : faqData.en;

  const filteredFaqs = faqs.filter(f => 
    f.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
    f.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleAccordion = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 px-6 sm:px-10 lg:px-16 bg-[#080d19] border-t border-white/10 relative">
      <div className="max-w-4xl mx-auto">
        {/* Section Header (Matching video timestamp 00:27) */}
        <div className="text-left mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-xs font-mono font-bold tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{t.faq.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            {t.faq.title}
          </h2>
          <p className="mt-3 text-slate-400 text-base">
            {t.faq.subtitle}
          </p>

          {/* Quick Search */}
          <div className="mt-6 relative max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isUrdu ? "سوالات تلاش کریں..." : "Search questions or NASA datasets..."}
              className="w-full bg-white/5 border border-white/15 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 text-white rounded-xl px-4 py-2.5 pl-10 text-xs sm:text-sm placeholder:text-slate-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          </div>
        </div>

        {/* FAQ Accordion List (Matching video styling) */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-[#0e1628] border border-white/10 hover:border-white/20 rounded-2xl overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  className="w-full py-5 px-6 flex items-center justify-between text-left gap-4 focus:outline-none"
                >
                  <span className="text-base sm:text-lg font-bold text-white leading-snug">
                    {faq.q}
                  </span>
                  <span className={`p-1.5 rounded-lg text-yellow-400 bg-yellow-400/10 border border-yellow-400/20 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-slate-300 text-sm sm:text-base leading-relaxed border-t border-white/5 animate-fade-in">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

