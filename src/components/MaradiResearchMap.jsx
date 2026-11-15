import React, { useState } from 'react';
import { MapPin, Navigation, Droplets, Thermometer, Wind, AlertTriangle, ArrowRight, Layers, Globe, ShieldCheck, Calendar, Activity } from 'lucide-react';
import { MARADI_GRIDS, SEASONAL_PHASES } from '../data/maradiData';

export default function MaradiResearchMap({ lang, t, onSelectGrid }) {
  const [selectedGrid, setSelectedGrid] = useState(MARADI_GRIDS[0]); // 1. Augie LGA
  const [activeTab, setActiveTab] = useState('telemetry'); // 'telemetry' | 'monthly' | 'phases' | 'thresholds'
  const isUrdu = lang === 'ur';

  // Relative coordinate mapping on 1000x560 canvas representation
  // Longitude range: 4.0°E to 8.5°E -> X: 80 to 920
  // Latitude range: 12.5°N to 14.2°N -> Y: 480 to 80 (inverted for screen)
  const getCanvasCoords = (lat, lon) => {
    const minLon = 4.2;
    const maxLon = 8.4;
    const minLat = 12.6;
    const maxLat = 14.1;

    const x = ((lon - minLon) / (maxLon - minLon)) * 760 + 100;
    const y = 460 - ((lat - minLat) / (maxLat - minLat)) * 360;
    return { x, y };
  };

  return (
    <section id="research-map" className="py-20 px-6 sm:px-10 lg:px-16 bg-[#080d19] border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-10 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold tracking-wider mb-3">
            <Globe className="w-3.5 h-3.5" />
            <span>
              {isUrdu ? "تحقیقی علاقائی نقشہ • 4 گرڈز" : "RESEARCH REGION MAP • 4 TARGET GRIDS"}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            {isUrdu 
              ? "مرادی ریجن اور ساہیل کاریڈور: 4 تحقیقی گرڈز کا نقشہ"
              : "Maradi Ag-Ecological Corridor: 4 Researched Grids"}
          </h2>

          <p className="mt-3 text-slate-400 text-base max-w-3xl leading-relaxed">
            {isUrdu
              ? "ناسا پاور کے 2 سالہ سیٹلائٹ ڈیٹا (1 جنوری 2025 تا نومبر 2026) کی بنیاد پر اوگی، گائیڈان، مادارونفا اور تیساوا کے زرعی خطوں کا موازنہ۔"
              : "Geospatial telemetry across the 4 study grids evaluated with continuous 2-year NASA POWER daily data (Jan 1, 2025 – Nov 2026) across the Sahelian agricultural belt."}
          </p>
        </div>

        {/* Map & Grid Details Card Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left/Main Column: Interactive Graphical Map Canvas (lg:col-span-7) */}
          <div className="lg:col-span-7 bg-[#0b1222] border border-white/15 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
              <span className="text-xs font-mono text-yellow-400 flex items-center gap-1.5">
                <Navigation className="w-3.5 h-3.5" />
                <span>Sahel Semi-Arid Ag-Belt (Lat 12.8°N–13.8°N / Lon 4.5°E–8.0°E)</span>
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                MERRA-2 Grid: 0.5° × 0.625°
              </span>
            </div>

            {/* SVG Visual Map */}
            <div className="relative aspect-[16/10] w-full bg-[#050811] rounded-2xl border border-white/10 overflow-hidden p-2">
              <svg className="w-full h-full" viewBox="0 0 960 540">
                {/* Lat/Lon Grid Lines */}
                <defs>
                  <pattern id="gridPattern" width="60" height="60" patternUnits="userSpaceOnUse">
                    <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                  </pattern>
                  <radialGradient id="radarGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#facc15" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#facc15" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <rect width="960" height="540" fill="url(#gridPattern)" />

                {/* Agro-Corridor Boundary Line */}
                <path
                  d="M 60 320 C 240 310, 420 330, 600 290 S 840 270, 920 280"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="2"
                  strokeDasharray="6 4"
                  opacity="0.4"
                />
                <text x="120" y="270" fill="#94a3b8" fontSize="13" fontFamily="monospace" opacity="0.6">NIGER (Maradi Region)</text>
                <text x="120" y="380" fill="#94a3b8" fontSize="13" fontFamily="monospace" opacity="0.6">NIGER (Sahel Agro-Corridor)</text>

                {/* Connective Telemetry Polygon between the 4 Grids */}
                {(() => {
                  const pAugie = getCanvasCoords(12.8903, 4.5996);
                  const pGuidan = getCanvasCoords(13.657, 6.6957);
                  const pMadarounfa = getCanvasCoords(13.305, 7.1619);
                  const pTessaoua = getCanvasCoords(13.7569, 7.9881);

                  return (
                    <>
                      <polygon
                        points={`${pAugie.x},${pAugie.y} ${pGuidan.x},${pGuidan.y} ${pTessaoua.x},${pTessaoua.y} ${pMadarounfa.x},${pMadarounfa.y}`}
                        fill="rgba(234, 179, 8, 0.08)"
                        stroke="#eab308"
                        strokeWidth="1.5"
                        strokeDasharray="4 4"
                      />
                      {/* Corridors */}
                      <line x1={pGuidan.x} y1={pGuidan.y} x2={pMadarounfa.x} y2={pMadarounfa.y} stroke="#facc15" strokeWidth="1" strokeOpacity="0.5" />
                      <line x1={pAugie.x} y1={pAugie.y} x2={pGuidan.x} y2={pGuidan.y} stroke="#facc15" strokeWidth="1" strokeOpacity="0.5" />
                      <line x1={pMadarounfa.x} y1={pMadarounfa.y} x2={pTessaoua.x} y2={pTessaoua.y} stroke="#facc15" strokeWidth="1" strokeOpacity="0.5" />
                    </>
                  );
                })()}

                {/* Draw 4 Grids on Map */}
                {MARADI_GRIDS.map((grid) => {
                  const pos = getCanvasCoords(grid.lat, grid.lon);
                  const isSelected = selectedGrid.id === grid.id;

                  return (
                    <g
                      key={grid.id}
                      className="cursor-pointer transition-all"
                      onClick={() => {
                        setSelectedGrid(grid);
                        onSelectGrid?.(grid);
                      }}
                    >
                      {/* Concentric selection pulse */}
                      {isSelected && (
                        <>
                          <circle cx={pos.x} cy={pos.y} r="38" fill="url(#radarGlow)" />
                          <circle cx={pos.x} cy={pos.y} r="28" fill="none" stroke="#facc15" strokeWidth="1.5" opacity="0.8" className="animate-ping" style={{ transformOrigin: `${pos.x}px ${pos.y}px` }} />
                          <circle cx={pos.x} cy={pos.y} r="18" fill="none" stroke="#facc15" strokeWidth="2" opacity="0.9" />
                        </>
                      )}

                      {/* Station Reticle Pin */}
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r={isSelected ? "9" : "6"}
                        fill={isSelected ? "#facc15" : "#38bdf8"}
                        stroke="#ffffff"
                        strokeWidth="2"
                        className="transition-all"
                      />

                      {/* Grid Name Label */}
                      <rect
                        x={pos.x + 14}
                        y={pos.y - 18}
                        width={grid.name.length * 9 + 20}
                        height="24"
                        rx="6"
                        fill="rgba(11, 18, 34, 0.9)"
                        stroke={isSelected ? "#facc15" : "rgba(255,255,255,0.2)"}
                        strokeWidth={isSelected ? "1.5" : "1"}
                      />
                      <text
                        x={pos.x + 24}
                        y={pos.y - 2}
                        fill={isSelected ? "#facc15" : "#ffffff"}
                        fontSize="12"
                        fontWeight="bold"
                        fontFamily="monospace"
                      >
                        {grid.name}
                      </text>

                      {/* Coordinates tag */}
                      <text
                        x={pos.x + 16}
                        y={pos.y + 18}
                        fill="#94a3b8"
                        fontSize="9"
                        fontFamily="monospace"
                      >
                        {grid.lat}°N, {grid.lon}°E
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Map Footer Legend */}
              <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between text-[11px] font-mono bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-slate-300">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 inline-block" />
                  <span>Click any of the 4 Grids to inspect 2-year NASA Telemetry</span>
                </span>
                <span className="text-emerald-400 font-bold">
                  2-Year Archive: Jan 2025 – Nov 2026
                </span>
              </div>
            </div>

            {/* Quick 4 Grid Switcher Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
              {MARADI_GRIDS.map((g) => {
                const isSelected = selectedGrid.id === g.id;
                return (
                  <button
                    key={g.id}
                    onClick={() => {
                      setSelectedGrid(g);
                      onSelectGrid?.(g);
                    }}
                    className={`py-2 px-3 rounded-xl border text-xs font-mono font-bold transition-all text-left flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-yellow-400 text-black border-yellow-400 shadow-lg'
                        : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/10'
                    }`}
                  >
                    <span>{g.name}</span>
                    <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-black' : 'text-yellow-400'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Active Grid 2-Year Scientific Telemetry Details (lg:col-span-5) */}
          <div className="lg:col-span-5 bg-[#0e1628] border border-white/15 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5">
            <div>
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-yellow-400 text-black uppercase tracking-wider">
                  NASA POWER Grid Cell
                </span>
                <span className="text-[11px] font-mono text-emerald-400">
                  Verified NASA Telemetry
                </span>
              </div>

              <h3 className="text-2xl font-black text-white mt-2">
                {selectedGrid.fullName}
              </h3>

              <p className="text-xs text-slate-400 font-mono mt-1">
                📍 Lat: {selectedGrid.lat}° N • Lon: {selectedGrid.lon}° E • Elev: {selectedGrid.elevation}
              </p>
            </div>

            {/* View Tabs: Telemetry | Monthly Table | Seasonal Phases | Thresholds */}
            <div className="flex border-b border-white/10 gap-2 overflow-x-auto pb-1">
              <button
                onClick={() => setActiveTab('telemetry')}
                className={`pb-2 text-xs font-mono font-bold transition-all border-b-2 cursor-pointer shrink-0 ${
                  activeTab === 'telemetry' ? 'border-yellow-400 text-yellow-400' : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                Telemetry Data
              </button>
              <button
                onClick={() => setActiveTab('monthly')}
                className={`pb-2 text-xs font-mono font-bold transition-all border-b-2 cursor-pointer shrink-0 ${
                  activeTab === 'monthly' ? 'border-yellow-400 text-yellow-400' : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                📊 Monthly Climate Table
              </button>
              <button
                onClick={() => setActiveTab('phases')}
                className={`pb-2 text-xs font-mono font-bold transition-all border-b-2 cursor-pointer shrink-0 ${
                  activeTab === 'phases' ? 'border-yellow-400 text-yellow-400' : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                6 Seasonal Phases
              </button>
              <button
                onClick={() => setActiveTab('thresholds')}
                className={`pb-2 text-xs font-mono font-bold transition-all border-b-2 cursor-pointer shrink-0 ${
                  activeTab === 'thresholds' ? 'border-yellow-400 text-yellow-400' : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                Tunable Thresholds
              </button>
            </div>

            {/* Tab 1: Telemetry Data */}
            {activeTab === 'telemetry' && (
              <div className="space-y-4">
                {/* 4 Key Measured Metrics Cards */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/5 border border-white/10 p-3.5 rounded-2xl">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                      Cumulative Rainfall (2-Yr)
                    </span>
                    <span className="text-xl sm:text-2xl font-mono font-extrabold text-cyan-400">
                      {selectedGrid.stats.cumRain}
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      2025: {selectedGrid.stats.rain2025} | 2026: {selectedGrid.stats.rain2026}
                    </span>
                  </div>

                  <div className="bg-white/5 border border-white/10 p-3.5 rounded-2xl">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                      Mean Surface Wetness
                    </span>
                    <span className="text-xl sm:text-2xl font-mono font-extrabold text-blue-400">
                      {selectedGrid.stats.meanGWETTOP}
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      GWETTOP (Peak: {selectedGrid.stats.peakGWETTOP})
                    </span>
                  </div>

                  <div className="bg-white/5 border border-white/10 p-3.5 rounded-2xl">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                      Mean Temperature (T2M)
                    </span>
                    <span className="text-xl sm:text-2xl font-mono font-extrabold text-amber-400">
                      {selectedGrid.stats.meanT2M.split('(')[0]}
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      Peak: {selectedGrid.stats.peakT2M.split('/')[0]}
                    </span>
                  </div>

                  <div className="bg-white/5 border border-white/10 p-3.5 rounded-2xl">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                      Zero-Rain Exposure
                    </span>
                    <span className="text-xl sm:text-2xl font-mono font-extrabold text-rose-400">
                      {selectedGrid.stats.zeroRainDays}
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      {selectedGrid.stats.validDays ? `${selectedGrid.stats.validDays} valid daily records` : 'Jan 2025 - Nov 2026'}
                    </span>
                  </div>
                </div>

                {/* Environmental Stress Risk Flags Triggered */}
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-yellow-400 mb-2 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-yellow-400" />
                    <span>Computed Environmental Stressors:</span>
                  </h4>
                  <div className="space-y-1.5">
                    {selectedGrid.riskFlags.map((rf) => (
                      <div key={rf.id} className="p-2.5 rounded-xl bg-yellow-400/10 border border-yellow-400/25 text-xs text-slate-200">
                        <span className="font-bold text-yellow-400 font-mono block">{rf.name}:</span>
                        <span className="text-slate-300 text-[11px]">{rf.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Soil & Crop Zone Info */}
                <div className="pt-3 border-t border-white/10 space-y-1.5 text-xs text-slate-300">
                  <p>
                    <strong className="text-white">Upland Dryland:</strong> {selectedGrid.soilUpland}
                  </p>
                  <p>
                    <strong className="text-white">Valley Basin:</strong> {selectedGrid.soilValley}
                  </p>
                </div>
              </div>
            )}

            {/* Tab 2: Exact Monthly Climate Table (From Uploaded Research Report Tables) */}
            {activeTab === 'monthly' && (
              <div className="space-y-3 max-h-[440px] overflow-y-auto pr-1">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-yellow-400 font-bold">
                    {selectedGrid.name} • 2-Year Monthly Climate Table
                  </span>
                  <span className="text-slate-400 text-[10px]">
                    NASA POWER MERRA-2 Daily Assimilation
                  </span>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-white/10 bg-black/40 shadow-inner">
                  <table className="w-full text-left border-collapse text-[11px] font-mono whitespace-nowrap">
                    <thead>
                      <tr className="bg-white/10 text-slate-300 border-b border-white/10 text-[10px] uppercase tracking-wider">
                        <th className="py-2.5 px-3">Month</th>
                        <th className="py-2.5 px-2.5 text-amber-300">Mean °C</th>
                        <th className="py-2.5 px-2.5 text-slate-400">Min °C</th>
                        <th className="py-2.5 px-2.5 text-slate-400">Max °C</th>
                        <th className="py-2.5 px-2.5 text-blue-300">GWETTOP</th>
                        <th className="py-2.5 px-2.5 text-cyan-300">Rain (mm)</th>
                        <th className="py-2.5 px-2.5 text-emerald-300">Rain Days</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {selectedGrid.monthlySummary.map((m, idx) => (
                        <tr key={idx} className="hover:bg-white/5 transition-colors">
                          <td className="py-2 px-3 font-bold text-white">{m.month}</td>
                          <td className="py-2 px-2.5 text-amber-300 font-bold">{m.t2m}°</td>
                          <td className="py-2 px-2.5 text-slate-400">{m.minT ? `${m.minT}°` : '—'}</td>
                          <td className="py-2 px-2.5 text-slate-400">{m.maxT ? `${m.maxT}°` : '—'}</td>
                          <td className="py-2 px-2.5 text-blue-300">{m.soil}</td>
                          <td className="py-2 px-2.5 text-cyan-300 font-bold">{m.rain}</td>
                          <td className="py-2 px-2.5 text-emerald-300 text-center">{m.rainyDays}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <p className="text-[10px] text-slate-400 italic">
                  *Daily observations filtered from NASA POWER MERRA-2. Unavailable dates omitted without skewing monthly means.
                </p>
              </div>
            )}

            {/* Tab 2: 6 Seasonal Phases (Section 7) */}
            {activeTab === 'phases' && (
              <div className="space-y-2.5 max-h-[420px] overflow-y-auto pr-1">
                <span className="text-[11px] font-mono text-emerald-400 block mb-1">
                  CALENDAR PHASES DRIVING TOOL DECISION LOGIC (SECTION 7)
                </span>
                {SEASONAL_PHASES.map((p) => (
                  <div key={p.phase} className="bg-white/5 border border-white/10 rounded-xl p-3 text-xs space-y-1">
                    <div className="flex items-center justify-between font-bold">
                      <span className="text-yellow-400">{p.phase}. {p.name} ({p.months})</span>
                      <span className="text-[10px] text-slate-400 font-mono">{p.urduName}</span>
                    </div>
                    <p className="text-[11px] text-slate-300">
                      <strong>Data Proof:</strong> {p.dataProof}
                    </p>
                    <p className="text-[11px] text-emerald-300 font-mono">
                      ⚡ <strong>Tool Action:</strong> {p.toolBehavior}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 3: Tunable Thresholds (Section 5) */}
            {activeTab === 'thresholds' && (
              <div className="space-y-2.5 text-xs">
                <span className="text-[11px] font-mono text-cyan-400 block mb-1">
                  LOCATION-SPECIFIC TUNABLE SETTINGS (SECTIONS 5 & 8.2)
                </span>
                <div className="space-y-2 font-mono">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/5">
                    <span className="text-slate-400">Wet Topsoil Day:</span>
                    <span className="text-cyan-300 font-bold">{selectedGrid.thresholds.wetTopsoil}</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/5">
                    <span className="text-slate-400">Planting Trigger:</span>
                    <span className="text-emerald-300 font-bold">{selectedGrid.thresholds.plantingTrigger}</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/5">
                    <span className="text-slate-400">Rapid Drydown Rule:</span>
                    <span className="text-amber-300 font-bold">{selectedGrid.thresholds.rapidDrydownRule}</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/5">
                    <span className="text-slate-400">Heat Spell Threshold:</span>
                    <span className="text-rose-300 font-bold">{selectedGrid.thresholds.heatSpell}</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/5">
                    <span className="text-slate-400">Heavy / Extreme Rain:</span>
                    <span className="text-blue-300 font-bold">{selectedGrid.thresholds.heavyRain} / {selectedGrid.thresholds.extremeRain}</span>
                  </div>
                </div>
                <p className="text-[10px] text-slate-400 italic pt-2">
                  *Thresholds are configured individually per location to account for regional moisture dynamics (e.g. 0.40 wetness for Guidan Roumdji vs 0.60 for Augie).
                </p>
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}
