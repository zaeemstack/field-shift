import React from 'react';
import { Globe2, ExternalLink, AlertTriangle, Database, BookOpen, ShieldAlert } from 'lucide-react';
import { OFFICIAL_RESEARCH_SOURCES, NASA_DATASET_SPEC } from '../data/maradiData';

export default function Footer({ lang, t }) {
  const isUrdu = lang === 'ur';

  return (
    <footer className="bg-[#050811] text-slate-400 py-16 px-6 sm:px-10 lg:px-16 border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* MANDATORY OFFICIAL DISCLAIMER BOX (As requested: "or disclaimer ka yeh jo prediction ha yeh based on 2 yr data ha jo ka remote stallites sa fetch kiya gaya ha. or ap local agricultural office sa iss ko confirm zarror kar la") */}
        <div className="p-6 rounded-3xl bg-amber-500/10 border-2 border-amber-500/30 text-amber-200">
          <div className="flex items-start gap-4">
            <div className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex-shrink-0 mt-0.5">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h4 className="text-base sm:text-lg font-black text-white uppercase tracking-wider font-mono">
                {isUrdu ? "اہم انتباہ اور قانونی وضاحتی بیان (DISCLAIMER)" : "OFFICIAL DATA DISCLAIMER & EXTENSION NOTICE"}
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {isUrdu
                  ? "یہ تمام پیش گوئیاں اور فصلوں کی گردش کی تجاویز 2 سالہ ریموٹ سیٹلائٹ ڈیٹا (1 جنوری 2025 تا نومبر 2026، ناسا پاور / MERRA-2) پر مبنی ہیں۔ کسی بھی زرعی فیصلے یا بوائی سے قبل اپنے مقامی زرعی دفتر (Local Agricultural Extension Office) سے اس کی باضابطہ تصدیق ضرور کر لیں۔"
                  : "These crop rotation predictions and agro-climatic advisories are based on a 2-year remote sensing archive (January 1, 2025 through November 2026) fetched from NASA POWER / MERRA-2 reanalysis satellites. Field conditions may vary by micro-topography. Always confirm final planting, seed varieties, and irrigation plans with your local agricultural extension office."}
              </p>
            </div>
          </div>
        </div>

        {/* 4 Column Layout: Brand, Data Specs, Research Sources, Links */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1: Brand & Project Summary (md:col-span-4) */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                <Globe2 className="w-5 h-5" />
              </div>
              <span className="text-2xl font-black text-white">
                Orbit Fields / Field Shift
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              2026 NASA International Space Apps Challenge — "Field Shift: Adapting Farms with NASA Data". 
              Synthesizing 2-year NASA Earth observations into actionable smallholder rotation strategies for the Maradi Region (Niger) and Sahel corridor.
            </p>

            <div className="pt-2 text-xs font-mono text-slate-500">
              © {new Date().getFullYear()} Field Shift Initiative. Open Satellite Telemetry.
            </div>
          </div>

          {/* Col 2: NASA Data Source Specifications (md:col-span-4) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-yellow-400" />
              <span>NASA Data Source (Section 4)</span>
            </h4>
            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl text-xs space-y-2">
              <p className="font-semibold text-slate-200">
                {NASA_DATASET_SPEC.source}
              </p>
              <p className="text-slate-400">
                <strong>Archive:</strong> {NASA_DATASET_SPEC.coverage}
              </p>
              <p className="text-slate-400">
                <strong>Resolution:</strong> {NASA_DATASET_SPEC.resolution}
              </p>
              <div className="pt-2 border-t border-white/10 space-y-1">
                {NASA_DATASET_SPEC.parameters.map((p) => (
                  <div key={p.code} className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-yellow-400 font-bold">{p.code}:</span>
                    <span className="text-slate-300">{p.name} ({p.unit})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Col 3: Official Research Sources (Section 13) (md:col-span-4) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
              <span>Research Sources (Section 13)</span>
            </h4>
            <ul className="space-y-2 text-xs">
              {OFFICIAL_RESEARCH_SOURCES.slice(0, 5).map((src, i) => (
                <li key={i}>
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-yellow-400 transition-colors flex items-start gap-1.5 group"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span>{src.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Complete Section 13 Source Directory List */}
        <div>
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3">
            Complete Scientific Reference Directory (Section 13 — Field Shift Report):
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-[11px] text-slate-400 font-mono">
            {OFFICIAL_RESEARCH_SOURCES.map((s, idx) => (
              <div key={idx} className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                <span className="text-slate-200 font-bold block">{idx + 1}. {s.title}</span>
                <span className="text-slate-500 text-[10px] mt-0.5 block">{s.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>
            Prepared for the 2026 NASA Space Apps Challenge | Four Study Grids: Guidan Roumdji, Augie, Tessaoua, Madarounfa.
          </p>
          <p className="font-mono text-slate-400">
            {t.footer.disclaimer}
          </p>
        </div>
      </div>
    </footer>
  );
}
