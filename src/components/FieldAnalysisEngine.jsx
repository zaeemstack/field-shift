import React, { useState, useEffect } from 'react';
import { 
  Sprout, MapPin, Droplets, Thermometer, Satellite, CheckCircle2, 
  Sparkles, Layers, ShieldCheck, ArrowRight, Loader2, RefreshCw, AlertTriangle, Info
} from 'lucide-react';
import { generateRecommendation } from '../services/recommendationEngine';
import { MARADI_GRIDS, SEASONAL_PHASES } from '../data/maradiData';

export default function FieldAnalysisEngine({ lang, t, currentTelemetry, activeGrid }) {
  const [location, setLocation] = useState(activeGrid?.name || 'Augie LGA');
  const [zone, setZone] = useState('Upland');
  const [waterAccess, setWaterAccess] = useState('Rain only');
  const [crop, setCrop] = useState('Pearl Millet');
  const [waterAvailability, setWaterAvailability] = useState('Medium');
  const [priority, setPriority] = useState('Soil health');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recommendation, setRecommendation] = useState(null);
  const isUrdu = lang === 'ur';

  // Strictly the 4 target grids ordered: 1. Augie, 2. Guidan Roumdji, 3. Madarounfa, 4. Tessaoua
  const locationPresets = [
    { name: "Augie LGA", sub: "1. Kebbi State, Nigeria • Ayisha Sajid" },
    { name: "Guidan Roumdji", sub: "2. Maradi, Niger • Ayisha Sajid" },
    { name: "Madarounfa", sub: "3. Maradi, Niger • Abdul Rafay" },
    { name: "Tessaoua", sub: "4. Maradi, Niger • Abdul Rafay" }
  ];

  // Specific crops from local knowledge base (Section 3 of reports)
  const categorizedCrops = [
    {
      category: isUrdu ? "ساہیل کے اہم اناج اور بنیادی خوراک" : "Sahelian Staples & Cereals",
      items: [
        { name: "Pearl Millet", icon: "🌾", urdu: "باجرہ (اہم غذا)" },
        { name: "Sorghum", icon: "🌾", urdu: "جوار" },
        { name: "Wheat", icon: "🌾", urdu: "گندم" },
        { name: "Maize (Corn)", icon: "🌽", urdu: "مکئی" }
      ]
    },
    {
      category: isUrdu ? "پھلی دار فصلیں (نائٹروجن بحالی)" : "Legumes & Nitrogen-Fixing Pulses",
      items: [
        { name: "Cowpea (Niébé)", icon: "🫘", urdu: "لوبیا (نائٹروجن فکسنگ)" },
        { name: "Groundnuts (Peanuts)", icon: "🥜", urdu: "مونگ پھلی" },
        { name: "Chickpea (Gram)", icon: "🫘", urdu: "چنا" }
      ]
    },
    {
      category: isUrdu ? "نقد آور اور روغنی فصلیں" : "Cash Crops & Oilseeds",
      items: [
        { name: "Sesame", icon: "🌿", urdu: "تل (کم لاگت نقد آور)" },
        { name: "Valley Vegetables", icon: "🥬", urdu: "وادی کی ترکاریاں (پیاز، ٹماٹر)" },
        { name: "Sugarcane", icon: "🍬", urdu: "کماد / گنا" }
      ]
    },
    {
      category: isUrdu ? "تبدیل کی جانے والی زیادہ پانی کی فصلیں (S1–S3)" : "High-Water Target Crops (Replaced by S1–S3)",
      items: [
        { name: "Rice (Irrigated Paddy)", icon: "🌾", urdu: "سیلابی چاول (زیادہ پانی)" },
        { name: "Banana Orchard", icon: "🍌", urdu: "کیلا (بارہ ماہی پانی)" },
        { name: "Mango Orchard", icon: "🥭", urdu: "آم کے باغات (ریت پر کمزور)" }
      ]
    }
  ];

  // Quick 1-click popular pills
  const popularPills = [
    { name: "Pearl Millet", icon: "🌾", label: isUrdu ? "باجرہ" : "Millet" },
    { name: "Cowpea (Niébé)", icon: "🫘", label: isUrdu ? "لوبیا" : "Cowpea" },
    { name: "Groundnuts (Peanuts)", icon: "🥜", label: isUrdu ? "مونگ پھلی" : "Groundnut" },
    { name: "Sorghum", icon: "🌾", label: isUrdu ? "جوار" : "Sorghum" },
    { name: "Wheat", icon: "🌾", label: isUrdu ? "گندم" : "Wheat" },
    { name: "Rice (Irrigated Paddy)", icon: "🌾", label: isUrdu ? "چاول" : "Rice" },
    { name: "Banana Orchard", icon: "🍌", label: isUrdu ? "کیلا" : "Banana" }
  ];

  // Initialize initial recommendation
  useEffect(() => {
    const initialRec = generateRecommendation({
      location,
      zone,
      crop,
      waterAccess,
      waterAvailability,
      priority,
      telemetry: currentTelemetry,
      lang
    });
    setRecommendation(initialRec);
  }, [lang, location, zone]);

  const handleRunAnalysis = (e) => {
    if (e) e.preventDefault();
    setIsAnalyzing(true);

    setTimeout(() => {
      const rec = generateRecommendation({
        location,
        zone,
        crop,
        waterAccess,
        waterAvailability,
        priority,
        telemetry: currentTelemetry,
        lang
      });
      setRecommendation(rec);
      setIsAnalyzing(false);
    }, 600);
  };

  return (
    <section id="analyze" className="py-20 px-6 sm:px-10 lg:px-16 bg-[#0a0f1d] border-t border-white/10 relative">
      <div className="max-w-6xl mx-auto">
        
        {/* Top Banner */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider mb-2">
            <Satellite className="w-3.5 h-3.5" />
            <span>NASA SPACE APPS 2026 • FIELD SHIFT DECISION SUPPORT</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            FIELD SHIFT
          </h2>
          <p className="mt-2 text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
            {isUrdu 
              ? "ناسا کے 2 سالہ MERRA-2 سیٹلائٹ ڈیٹا کی بنیاد پر بنا سمارٹ کراپ روٹیشن ماڈل"
              : "Smart farming decisions powered by 2-year NASA Earth observation data & local agronomic knowledge."}
          </p>
        </div>

        {/* Two Column Layout: Form Left, Result Card Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Input Form */}
          <div className="lg:col-span-5 bg-[#0e1628] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <div className="mb-6">
              <span className="text-[11px] font-mono text-emerald-400 tracking-wider uppercase font-bold block mb-1">
                INPUT PARAMETERS (SECTION 8.1)
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {isUrdu ? "اپنے فارم کی تفصیلات بتائیں" : "Tell us about your farm"}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
                {isUrdu 
                  ? "مقام، مٹی کا زون اور سابقہ فصل منتخب کریں۔ سسٹم ناسا ڈیٹا کے تحت لچکدار روٹیشن تجویز کرے گا۔"
                  : "Specify field zone, previous crop, and management priorities to trigger location-specific rotation rules."}
              </p>
            </div>

            <form onSubmit={handleRunAnalysis} className="space-y-5">
              {/* Farm Location */}
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-rose-400" />
                  <span>{isUrdu ? "کھیت کا مقام" : "FARM LOCATION"}</span>
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-white/5 border border-white/15 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 text-white rounded-xl px-4 py-3 text-sm appearance-none transition-all cursor-pointer font-medium"
                >
                  {locationPresets.map((loc) => (
                    <option key={loc.name} value={loc.name} className="bg-slate-900 text-white py-1">
                      📍 {loc.name} ({loc.sub})
                    </option>
                  ))}
                </select>
              </div>

              {/* Field Agro-Zone */}
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-blue-400" />
                  <span>{isUrdu ? "زمینی زون (FIELD ZONE)" : "FIELD ZONE (SECTION 3.1)"}</span>
                </label>
                <div className="grid grid-cols-2 gap-2 bg-black/40 border border-white/10 p-1 rounded-xl">
                  {[
                    { id: 'Upland', label: isUrdu ? 'ریتلی بارانی زمین (Upland)' : 'Upland Dune / Sand' },
                    { id: 'Valley bottom', label: isUrdu ? 'وادی/نشیبی زمین (Goulbi / Fadama)' : 'Valley Bottom (Goulbi)' }
                  ].map((z) => (
                    <button
                      type="button"
                      key={z.id}
                      onClick={() => setZone(z.id)}
                      className={`py-2 px-2 text-xs font-semibold rounded-lg transition-all text-center leading-snug ${
                        zone === z.id
                          ? 'bg-yellow-400 text-black shadow-md font-bold'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {z.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Water Access Selector (Conditioned on Valley Bottom) */}
              {!zone.toLowerCase().includes("upland") && (
                <div className="p-3 bg-blue-950/30 border border-blue-500/20 rounded-xl space-y-1.5 animate-fade-in">
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
                    <Droplets className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{isUrdu ? "وادی میں پانی کی فراہمی" : "WATER ACCESS (VALLEY BOTTOM)"}</span>
                  </label>
                  <select
                    value={waterAccess}
                    onChange={(e) => setWaterAccess(e.target.value)}
                    className="w-full bg-slate-900 border border-blue-400/30 text-white rounded-lg px-3 py-2 text-xs"
                  >
                    <option value="Rain only">🌧️ Rain only (Monsoon seasonal moisture)</option>
                    <option value="Irrigated in wet season only">💧 Irrigated in wet season only</option>
                    <option value="Irrigated in dry season">⚠️ Irrigated in dry season (Salinity Risk)</option>
                  </select>
                </div>
              )}

              {/* Current Crop */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                    <Sprout className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{isUrdu ? "موجودہ یا آخری فصل" : "LAST SEASON CROP"}</span>
                  </label>
                  <span className="text-[10px] text-slate-400 font-mono">Sahel Knowledge Base</span>
                </div>

                {/* 1-Click Fast Selection Pills */}
                <div className="flex flex-wrap gap-1.5 mb-2.5">
                  {popularPills.map((pill) => {
                    const isSelected = crop === pill.name;
                    return (
                      <button
                        type="button"
                        key={pill.name}
                        onClick={() => setCrop(pill.name)}
                        className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all flex items-center gap-1 ${
                          isSelected
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400 font-bold shadow-sm'
                            : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                        }`}
                      >
                        <span>{pill.icon}</span>
                        <span>{pill.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Categorized Clean Select Dropdown */}
                <select
                  value={crop}
                  onChange={(e) => setCrop(e.target.value)}
                  className="w-full bg-white/5 border border-white/15 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 text-white rounded-xl px-4 py-3 text-sm appearance-none transition-all cursor-pointer font-medium"
                >
                  {categorizedCrops.map((cat) => (
                    <optgroup key={cat.category} label={cat.category} className="bg-slate-950 text-slate-400 font-bold">
                      {cat.items.map((c) => (
                        <option key={c.name} value={c.name} className="bg-slate-900 text-white py-1 font-normal">
                          {c.icon} {c.name} {isUrdu ? `(${c.urdu})` : ''}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>

              {/* Farmer Priority (Section 8.4) */}
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-yellow-400" />
                  <span>{isUrdu ? "کسان کی بنیادی ترجیح" : "FARMER PRIORITY (SECTION 8.4)"}</span>
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full bg-white/5 border border-white/15 focus:border-yellow-400 text-white rounded-xl px-4 py-2.5 text-xs sm:text-sm appearance-none cursor-pointer"
                >
                  <option value="Soil health" className="bg-slate-900">
                    🌱 {isUrdu ? "مٹی کی زرخیزی اور تحفظ (Legumes & Mulch)" : "Soil health (Legume years & residue cover first)"}
                  </option>
                  <option value="Water saving" className="bg-slate-900">
                    💧 {isUrdu ? "پانی کی بچت (Drought-hardy crops)" : "Water saving (Cut dry irrigation, favour millet & cowpea)"}
                  </option>
                  <option value="Income" className="bg-slate-900">
                    💰 {isUrdu ? "نقد آمدنی (Groundnut/Sesame with trade-offs)" : "Income (Cash crops with sustainability safeguards)"}
                  </option>
                </select>
              </div>

              {/* Action CTA */}
              <button
                type="submit"
                disabled={isAnalyzing}
                className="w-full py-4 rounded-2xl bg-[#2a6f68] hover:bg-[#235c56] active:scale-[0.98] text-white font-extrabold text-sm sm:text-base transition-all shadow-xl shadow-teal-900/30 flex items-center justify-center gap-2 mt-4 cursor-pointer"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>{isUrdu ? "ناسا ڈیٹا سے موازنہ جاری ہے..." : "Evaluating NASA Decision Logic..."}</span>
                  </>
                ) : (
                  <>
                    <Satellite className="w-5 h-5 text-yellow-300" />
                    <span>{isUrdu ? "میرے فارم کا تجزیہ کریں" : "Analyze My Farm"}</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Column: Output Card */}
          <div className="lg:col-span-7 bg-[#0f172a] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl min-h-[560px] flex flex-col justify-between">
            
            {/* Loading Spinner */}
            {isAnalyzing && (
              <div className="h-full my-auto flex flex-col items-center justify-center text-center p-8 space-y-4">
                <Loader2 className="w-12 h-12 text-yellow-400 animate-spin" />
                <h4 className="text-xl font-bold text-white">
                  {isUrdu ? "ناسا ٹیلیمیٹری کا تجزیہ جاری ہے..." : "Parsing 2-Year NASA POWER Telemetry..."}
                </h4>
                <p className="text-xs text-slate-400 max-w-sm">
                  {isUrdu 
                    ? "مرادی ریجن کے 2025 تا 2026 کے MERRA-2 مٹی اور بارش کے اشاریے لوڈ ہو رہے ہیں۔"
                    : "Calibrating grid thresholds (GWETTOP wet soil, 3-day planting trigger, rapid drydown)..."}
                </p>
              </div>
            )}

            {/* Generated Recommendation */}
            {recommendation && !isAnalyzing && (
              <div className="space-y-6 animate-fade-in">
                
                {/* Result Header & Researcher Attribution */}
                <div className="flex items-start justify-between flex-wrap gap-2">
                  <div>
                    <span className="text-[11px] font-mono tracking-widest text-emerald-400 uppercase font-bold block mb-1">
                      FIELD SHIFT ANALYSIS • {recommendation.location}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      {isUrdu ? "آپ کے فارم کی تجویز" : "Recommended Rotation Plan"}
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/5 border border-white/15 text-slate-300">
                    🔬 {recommendation.researcherCredit}
                  </span>
                </div>

                {/* Recommended Rotation Box */}
                <div className="relative pl-5 py-3 border-l-4 border-emerald-400 bg-emerald-500/5 rounded-r-2xl pr-4">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    RECOMMENDED ADAPTIVE SEQUENCE
                  </span>
                  
                  <div className="text-xl sm:text-2xl font-black text-white tracking-tight flex flex-wrap items-center gap-2">
                    {recommendation.rotationSequence.map((step, idx) => (
                      <React.Fragment key={idx}>
                        <span className="text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded-lg border border-yellow-400/20">{step}</span>
                        {idx < recommendation.rotationSequence.length - 1 && (
                          <span className="text-slate-500 font-normal">→</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>

                  <p className="mt-2.5 text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                    {recommendation.rotationExplanation}
                  </p>

                  {/* Surface Residue & Soil Protection Alert */}
                  {recommendation.residueAdvice && (
                    <div className="mt-3 pt-2.5 border-t border-emerald-500/20 text-xs text-amber-300 flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
                      <span>{recommendation.residueAdvice}</span>
                    </div>
                  )}
                </div>

                {/* Grid-Specific NASA Tunable Thresholds Pill Bar (Section 5) */}
                <div className="bg-[#141f36] border border-white/10 rounded-2xl p-3 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono">
                  <div className="flex items-center gap-1.5 text-cyan-300">
                    <Droplets className="w-3.5 h-3.5" />
                    <span>Wet Topsoil: <strong>{recommendation.wetSoilThreshold}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-300">
                    <Sprout className="w-3.5 h-3.5" />
                    <span>Planting Trigger: <strong>{recommendation.plantingTrigger}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5 text-amber-300">
                    <Thermometer className="w-3.5 h-3.5" />
                    <span>Drydown Rule: <strong>{recommendation.rapidDrydownRule}</strong></span>
                  </div>
                </div>

                {/* 4 Feature Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-[#1e293b]/70 border border-white/10 rounded-xl p-3 flex flex-col items-center text-center">
                    <Droplets className="w-5 h-5 text-cyan-400 mb-1" />
                    <span className="text-xs font-bold text-white">{recommendation.badges.waterDemand}</span>
                    <span className="text-[9px] text-slate-400 uppercase font-mono mt-0.5">Water Demand</span>
                  </div>
                  <div className="bg-[#1e293b]/70 border border-white/10 rounded-xl p-3 flex flex-col items-center text-center">
                    <Sprout className="w-5 h-5 text-emerald-400 mb-1" />
                    <span className="text-xs font-bold text-white">{recommendation.badges.soilSupport}</span>
                    <span className="text-[9px] text-slate-400 uppercase font-mono mt-0.5">Soil Support</span>
                  </div>
                  <div className="bg-[#1e293b]/70 border border-white/10 rounded-xl p-3 flex flex-col items-center text-center">
                    <Thermometer className="w-5 h-5 text-rose-400 mb-1" />
                    <span className="text-xs font-bold text-white">{recommendation.badges.climateFit}</span>
                    <span className="text-[9px] text-slate-400 uppercase font-mono mt-0.5">Climate Fit</span>
                  </div>
                  <div className="bg-[#1e293b]/70 border border-white/10 rounded-xl p-3 flex flex-col items-center text-center">
                    <Satellite className="w-5 h-5 text-yellow-400 mb-1" />
                    <span className="text-xs font-bold text-white">{recommendation.badges.dataSource}</span>
                    <span className="text-[9px] text-slate-400 uppercase font-mono mt-0.5">Data Source</span>
                  </div>
                </div>

                {/* Environmental Stress Flags (Section 8.2) */}
                {recommendation.riskFlags && recommendation.riskFlags.length > 0 && (
                  <div className="border-t border-white/10 pt-4">
                    <h4 className="text-[11px] font-mono font-bold tracking-wider uppercase text-slate-400 mb-2 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                      <span>DETECTED CLIMATE STRESSORS (SECTION 8.2)</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {recommendation.riskFlags.map((flag) => (
                        <div key={flag.id} className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-2.5 text-xs">
                          <span className="font-bold text-amber-300 block text-[11px] mb-0.5">{flag.name}</span>
                          <span className="text-[10px] text-slate-300 leading-snug block">{flag.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3 Core Replacement Strategies (Section 8.5) */}
                <div className="border-t border-white/10 pt-4">
                  <div className="flex items-center justify-between mb-2.5">
                    <h4 className="text-xs font-mono font-bold tracking-wider uppercase text-yellow-400 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>ROTATION STRATEGIES REPLACING HIGH-WATER CROPS (SECTION 8.5)</span>
                    </h4>
                    <span className="text-[10px] font-mono text-slate-400">S1 • S2 • S3 Ranked</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {recommendation.replacementStrategies.map((strat) => (
                      <div key={strat.id} className="bg-black/30 border border-white/10 rounded-xl p-3 text-xs flex flex-col justify-between hover:border-yellow-400/40 transition-colors">
                        <div>
                          <div className="flex items-center justify-between font-mono font-bold text-emerald-400 text-[10px] mb-1">
                            <span>{strat.id}</span>
                            <span className="text-rose-400 text-[9px]">Replaces: {strat.replaces}</span>
                          </div>
                          <div className="font-semibold text-white text-[11px] mb-1 leading-snug">
                            {strat.name}
                          </div>
                          <p className="text-[10px] text-slate-300 mb-1.5 leading-relaxed font-mono">
                            {strat.alternativeSequence}
                          </p>
                        </div>
                        <div className="pt-2 border-t border-white/5 space-y-1 text-[9px] text-slate-400">
                          <div>💧 <strong>Water:</strong> {strat.waterEffect}</div>
                          <div>🌱 <strong>Soil:</strong> {strat.soilEffect}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* Bottom Meta */}
            <div className="pt-4 border-t border-white/10 mt-6 flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <span>{recommendation?.gridFullName || location}</span>
              <span>NASA POWER MERRA-2 (Jan 1, 2025 – Nov 2026)</span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
