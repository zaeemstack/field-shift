import React, { useState, useEffect } from 'react';
import { 
  Sprout, MapPin, Droplets, Thermometer, Satellite, CheckCircle2, 
  Sparkles, Layers, ShieldCheck, ArrowRight, Loader2, RefreshCw 
} from 'lucide-react';
import { generateRecommendation } from '../services/recommendationEngine';
import { MARADI_GRIDS } from '../data/maradiData';

export default function FieldAnalysisEngine({ lang, t, currentTelemetry, activeGrid }) {
  const [location, setLocation] = useState(activeGrid?.name || 'Guidan Roumdji');
  const [zone, setZone] = useState('Upland');
  const [crop, setCrop] = useState('Wheat');
  const [waterAvailability, setWaterAvailability] = useState('Medium');
  const [priority, setPriority] = useState('Save water & improve soil health');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recommendation, setRecommendation] = useState(null);
  const isUrdu = lang === 'ur';

  // Strictly the 4 Maradi study grids from research
  const locationPresets = [
    { name: "Guidan Roumdji", sub: "Maradi, Niger (Grid 1)" },
    { name: "Augie LGA", sub: "Kebbi/Sahel (Grid 2)" },
    { name: "Tessaoua", sub: "Maradi, Niger (Grid 3)" },
    { name: "Madarounfa", sub: "Maradi, Niger (Grid 4)" }
  ];

  // Modern, clean, recognized crops categorized logically
  const categorizedCrops = [
    {
      category: isUrdu ? "اناج اور بنیادی غذائی فصلیں" : "Cereals & Staples",
      items: [
        { name: "Wheat", icon: "🌾", urdu: "گندم" },
        { name: "Maize (Corn)", icon: "🌽", urdu: "مکئی" },
        { name: "Rice", icon: "🌾", urdu: "چاول" },
        { name: "Barley", icon: "🌾", urdu: "جَو" },
        { name: "Pearl Millet", icon: "🌾", urdu: "باجرہ" },
        { name: "Sorghum", icon: "🌾", urdu: "جوار" }
      ]
    },
    {
      category: isUrdu ? "نقد آور اور روغنی فصلیں" : "Cash Crops & Oilseeds",
      items: [
        { name: "Cotton", icon: "☁️", urdu: "کپاس" },
        { name: "Sugarcane", icon: "🍬", urdu: "کماد / گنا" },
        { name: "Sunflower", icon: "🌻", urdu: "سورج مکھی" },
        { name: "Soybean", icon: "🫘", urdu: "سویابین" },
        { name: "Mustard / Canola", icon: "🌿", urdu: "سرسوں" }
      ]
    },
    {
      category: isUrdu ? "دالیں اور زرخیز پھلی دار فصلیں" : "Legumes & Pulses",
      items: [
        { name: "Chickpea (Gram)", icon: "🫘", urdu: "چنا" },
        { name: "Groundnuts (Peanuts)", icon: "🥜", urdu: "مونگ پھلی" },
        { name: "Cowpea", icon: "🫘", urdu: "لوبیا" },
        { name: "Lentils", icon: "🫘", urdu: "دالیں" }
      ]
    },
    {
      category: isUrdu ? "سبزیاں اور ترکاریاں" : "Vegetables & Tubers",
      items: [
        { name: "Potato", icon: "🥔", urdu: "آلو" },
        { name: "Tomato", icon: "🍅", urdu: "ٹماٹر" },
        { name: "Onion", icon: "🧅", urdu: "پیاز" },
        { name: "Chili", icon: "🌶️", urdu: "مرچ" }
      ]
    }
  ];

  // Quick 1-click popular crops
  const popularPills = [
    { name: "Wheat", icon: "🌾", label: isUrdu ? "گندم" : "Wheat" },
    { name: "Maize (Corn)", icon: "🌽", label: isUrdu ? "مکئی" : "Maize" },
    { name: "Rice", icon: "🌾", label: isUrdu ? "چاول" : "Rice" },
    { name: "Cotton", icon: "☁️", label: isUrdu ? "کپاس" : "Cotton" },
    { name: "Chickpea (Gram)", icon: "🫘", label: isUrdu ? "چنا" : "Chickpea" },
    { name: "Pearl Millet", icon: "🌾", label: isUrdu ? "باجرہ" : "Millet" },
    { name: "Potato", icon: "🥔", label: isUrdu ? "آلو" : "Potato" }
  ];

  // Initialize with initial recommendation so user sees results instantly
  useEffect(() => {
    const initialRec = generateRecommendation({
      location,
      zone,
      crop,
      waterAvailability,
      priority,
      telemetry: currentTelemetry,
      lang
    });
    setRecommendation(initialRec);
  }, [lang]);

  const handleRunAnalysis = (e) => {
    if (e) e.preventDefault();
    setIsAnalyzing(true);

    setTimeout(() => {
      const rec = generateRecommendation({
        location,
        zone,
        crop,
        waterAvailability,
        priority,
        telemetry: currentTelemetry,
        lang
      });
      setRecommendation(rec);
      setIsAnalyzing(false);
    }, 700);
  };

  return (
    <section id="analyze" className="py-20 px-6 sm:px-10 lg:px-16 bg-[#0a0f1d] border-t border-white/10 relative">
      <div className="max-w-6xl mx-auto">
        
        {/* Top Banner (Matching User's Photo "FIELD SHIFT - Smart farming decisions powered by NASA") */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider mb-2">
            <Satellite className="w-3.5 h-3.5" />
            <span>NASA SPACE APPS 2026 • FIELD SHIFT</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            FIELD SHIFT
          </h2>
          <p className="mt-2 text-slate-400 text-base sm:text-lg max-w-xl mx-auto">
            {isUrdu 
              ? "ناسا کے ارتھ آبزرویشن سیٹلائٹ ڈیٹا سے چلنے والے اسمارٹ زرعی فیصلے"
              : "Smart farming decisions powered by NASA Earth observation data."}
          </p>
        </div>

        {/* Two Column Layout: Form Left, Result Card Right (Matching User's Photos Exactly) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Input Form (Matching User's Photos) */}
          <div className="lg:col-span-5 bg-[#0e1628] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <div className="mb-6">
              <span className="text-[11px] font-mono text-emerald-400 tracking-wider uppercase font-bold block mb-1">
                FIELD SHIFT
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {isUrdu ? "اپنے فارم کی تفصیلات بتائیں" : "Tell us about your farm"}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
                {isUrdu 
                  ? "چند بنیادی تفصیلات درج کریں۔ ہمارا نظام 2 سالہ ناسا ڈیٹا کے تحت بہترین کراپ روٹیشن تیار کرے گا۔"
                  : "Give us a few basic details. Our system will analyze the conditions and generate a recommendation."}
              </p>
            </div>

            <form onSubmit={handleRunAnalysis} className="space-y-5">
              {/* Farm Location */}
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-rose-400" />
                  <span>{isUrdu ? "کھیت کا مقام" : "FARM LOCATION"}</span>
                </label>
                <div className="relative">
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
              </div>

              {/* Field Agro-Zone */}
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-blue-400" />
                  <span>{isUrdu ? "زمینی زون" : "FIELD ZONE"}</span>
                </label>
                <div className="grid grid-cols-2 gap-2 bg-black/40 border border-white/10 p-1 rounded-xl">
                  {['Upland', 'Lowland (Valley)'].map((z) => (
                    <button
                      type="button"
                      key={z}
                      onClick={() => setZone(z)}
                      className={`py-2 text-xs font-semibold rounded-lg transition-all ${
                        zone === z
                          ? 'bg-yellow-400 text-black shadow-md font-bold'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {z === 'Upland' ? (isUrdu ? 'ریتلی بارانی زمین (Upland)' : 'Upland Dryland') : (isUrdu ? 'وادی/نشیبی زمین (Lowland)' : 'Lowland / Valley')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Current Crop (Completely Revamped with Real Crops & 1-Click Quick Pills) */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                    <Sprout className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{isUrdu ? "موجودہ یا آخری فصل" : "CURRENT CROP"}</span>
                  </label>
                  <span className="text-[10px] text-slate-400 font-mono">Popular & Sahel</span>
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

              {/* Water Availability */}
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Droplets className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{isUrdu ? "پانی کی دستیابی" : "WATER AVAILABILITY"}</span>
                </label>
                <div className="grid grid-cols-3 gap-2 bg-black/40 border border-white/10 p-1.5 rounded-xl">
                  {['Low', 'Medium', 'High'].map((w) => (
                    <button
                      type="button"
                      key={w}
                      onClick={() => setWaterAvailability(w)}
                      className={`py-2 text-xs font-semibold rounded-lg transition-all ${
                        waterAvailability === w
                          ? 'bg-yellow-400 text-black font-bold shadow'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {w === 'Low' ? (isUrdu ? 'کم' : 'Low') : w === 'Medium' ? (isUrdu ? 'درمیانی' : 'Medium') : (isUrdu ? 'زیادہ' : 'High')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Farm Priority */}
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-yellow-400" />
                  <span>{isUrdu ? "بنیادی ترجیح" : "FARM PRIORITY"}</span>
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full bg-white/5 border border-white/15 focus:border-yellow-400 text-white rounded-xl px-4 py-2.5 text-xs sm:text-sm appearance-none cursor-pointer"
                >
                  <option value="Save water & improve soil health" className="bg-slate-900">
                    🛡️ {isUrdu ? "پانی کی بچت اور مٹی کی صحت" : "Save water & improve soil health"}
                  </option>
                  <option value="Maximize Yield" className="bg-slate-900">
                    📈 {isUrdu ? "زیادہ سے زیادہ پیداوار" : "Maximize Yield"}
                  </option>
                  <option value="Income & Cash Resilience" className="bg-slate-900">
                    💰 {isUrdu ? "آمدنی اور مارکیٹ نقد آور فصلیں" : "Income & Cash Resilience"}
                  </option>
                </select>
              </div>

              {/* Action CTA: "Analyze My Farm" (Exact button from photo) */}
              <button
                type="submit"
                disabled={isAnalyzing}
                className="w-full py-4 rounded-2xl bg-[#2a6f68] hover:bg-[#235c56] active:scale-[0.98] text-white font-extrabold text-sm sm:text-base transition-all shadow-xl shadow-teal-900/30 flex items-center justify-center gap-2 mt-4"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>{isUrdu ? "ناسا ڈیٹا سے موازنہ جاری ہے..." : "Analyzing 2-Year NASA Data..."}</span>
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

          {/* Right Column: Output Card (Exact Replica of User's Uploaded Photos!) */}
          <div className="lg:col-span-7 bg-[#0f172a] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl min-h-[520px] flex flex-col justify-between">
            
            {/* Initial Loading Spinner */}
            {isAnalyzing && (
              <div className="h-full my-auto flex flex-col items-center justify-center text-center p-8 space-y-4">
                <Loader2 className="w-12 h-12 text-yellow-400 animate-spin" />
                <h4 className="text-xl font-bold text-white">
                  {isUrdu ? "ناسا ٹیلیمیٹری کا تجزیہ جاری ہے..." : "Querying 2-Year NASA POWER Telemetry..."}
                </h4>
                <p className="text-xs text-slate-400 max-w-sm">
                  {isUrdu 
                    ? "مرادی ریجن کے 2025 تا 2026 کے MERRA-2 مٹی اور بارش کے اشاریے لوڈ ہو رہے ہیں۔"
                    : "Calibrating 0.5° × 0.625° daily MERRA-2 grid observations and precipitation retreat timing."}
                </p>
              </div>
            )}

            {/* Generated Recommendation (Matching Uploaded Photos Exactly) */}
            {recommendation && !isAnalyzing && (
              <div className="space-y-8 animate-fade-in">
                
                {/* Result Header */}
                <div>
                  <span className="text-[11px] font-mono tracking-widest text-emerald-400 uppercase font-bold block mb-1">
                    FIELD SHIFT ANALYSIS
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                    {isUrdu ? "آپ کے فارم کی تجویز" : "Your farm's recommendation"}
                  </h3>
                </div>

                {/* Recommended Rotation Box (With green curved brace like in the photo) */}
                <div className="relative pl-6 py-2 border-l-4 border-emerald-400 bg-emerald-500/5 rounded-r-2xl pr-4">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    RECOMMENDED ROTATION
                  </span>
                  
                  <div className="text-2xl sm:text-3xl font-black text-white tracking-tight flex flex-wrap items-center gap-2">
                    {recommendation.rotationSequence.map((step, idx) => (
                      <React.Fragment key={idx}>
                        <span className="text-yellow-400">{step}</span>
                        {idx < recommendation.rotationSequence.length - 1 && (
                          <span className="text-slate-500 font-normal">→</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>

                  <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {recommendation.rotationExplanation}
                  </p>
                </div>

                {/* 4 Feature Badges (Matching User's Photo EXACTLY):
                    1. Water Demand
                    2. Soil Support
                    3. Climate Fit
                    4. NASA Data Source */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  
                  {/* 1. Water Demand */}
                  <div className="bg-[#1e293b]/70 border border-white/10 rounded-2xl p-4 flex flex-col items-center text-center">
                    <Droplets className="w-6 h-6 text-cyan-400 mb-2" />
                    <span className="text-base font-bold text-white leading-tight">
                      {recommendation.badges.waterDemand}
                    </span>
                    <span className="text-[10px] text-slate-400 uppercase font-mono mt-1">
                      Water Demand
                    </span>
                  </div>

                  {/* 2. Soil Support */}
                  <div className="bg-[#1e293b]/70 border border-white/10 rounded-2xl p-4 flex flex-col items-center text-center">
                    <Sprout className="w-6 h-6 text-emerald-400 mb-2" />
                    <span className="text-base font-bold text-white leading-tight">
                      {recommendation.badges.soilSupport}
                    </span>
                    <span className="text-[10px] text-slate-400 uppercase font-mono mt-1">
                      Soil Support
                    </span>
                  </div>

                  {/* 3. Climate Fit */}
                  <div className="bg-[#1e293b]/70 border border-white/10 rounded-2xl p-4 flex flex-col items-center text-center">
                    <Thermometer className="w-6 h-6 text-rose-400 mb-2" />
                    <span className="text-base font-bold text-white leading-tight">
                      {recommendation.badges.climateFit}
                    </span>
                    <span className="text-[10px] text-slate-400 uppercase font-mono mt-1">
                      Climate Fit
                    </span>
                  </div>

                  {/* 4. NASA Data Source */}
                  <div className="bg-[#1e293b]/70 border border-white/10 rounded-2xl p-4 flex flex-col items-center text-center">
                    <Satellite className="w-6 h-6 text-yellow-400 mb-2" />
                    <span className="text-base font-bold text-white leading-tight">
                      {recommendation.badges.dataSource}
                    </span>
                    <span className="text-[10px] text-slate-400 uppercase font-mono mt-1">
                      Data Source
                    </span>
                  </div>

                </div>

                {/* WHY THIS RECOMMENDATION? (Matching User's Photo Checklist) */}
                <div className="border-t border-white/10 pt-6">
                  <h4 className="text-xs font-mono font-bold tracking-wider uppercase text-slate-400 mb-3">
                    WHY THIS RECOMMENDATION?
                  </h4>
                  <p className="text-xs text-slate-400 mb-4">
                    {isUrdu 
                      ? "یہ تجویز فارم کے مقام، منتخب کردہ فصل، پانی کی دستیابی اور ناسا ارتھ آبزرویشن ڈیٹا کی بنیاد پر تیار کی گئی ہے۔"
                      : "The recommendation considers the farm location, selected crop, water availability and relevant Earth-observation information."}
                  </p>

                  <div className="space-y-2">
                    {recommendation.whyRecommendation.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs text-slate-300 py-1 border-b border-white/5">
                        <span className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          <span>{item.text}</span>
                        </span>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3 Replacement Strategies (Section 8.5 of Project Report) */}
                <div className="border-t border-white/10 pt-6">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xs font-mono font-bold tracking-wider uppercase text-yellow-400 flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Alternative Strategies Replacing High-Water Crops:</span>
                    </h4>
                    <span className="text-[10px] font-mono text-slate-400">Maradi Adaptation S1–S3</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {recommendation.replacementStrategies.map((strat) => (
                      <div key={strat.id} className="bg-black/30 border border-white/10 rounded-xl p-3 text-xs flex flex-col justify-between hover:border-yellow-400/40 transition-colors">
                        <div>
                          <div className="flex items-center justify-between font-mono font-bold text-emerald-400 text-[10px] mb-1">
                            <span>{strat.id}</span>
                            <span className="text-rose-400 line-through text-[9px]">{strat.replaces}</span>
                          </div>
                          <div className="font-semibold text-white text-[11px] mb-1 leading-snug">
                            {strat.title}
                          </div>
                          <p className="text-[10px] text-slate-300 mb-2 leading-relaxed">
                            {strat.sequence}
                          </p>
                        </div>
                        <div className="pt-2 border-t border-white/5 text-[9px] text-slate-400 font-mono">
                          💧 {strat.waterEffect}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* Bottom Meta */}
            <div className="pt-4 border-t border-white/10 mt-6 flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <span>Grid: {location}</span>
              <span>NASA POWER Daily MERRA-2 (2025–2026)</span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
