import React, { useState } from 'react';
import { MapPin, Navigation, Droplets, Thermometer, Wind, AlertTriangle, ArrowRight, Layers, Globe, ShieldCheck } from 'lucide-react';
import { MARADI_GRIDS } from '../data/maradiData';

export default function MaradiResearchMap({ lang, t, onSelectGrid }) {
  const [selectedGrid, setSelectedGrid] = useState(MARADI_GRIDS[0]);
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
              ? "ناسا پاور کے 2 سالہ سیٹلائٹ ڈیٹا (1 جنوری 2025 تا نومبر 2026) کی بنیاد پر گائیڈان، اوگی، تیساوا اور مادارونفا کے زرعی خطوں کا موازنہ۔"
              : "Geospatial mapping of the four target study grids evaluated using continuous 2-year NASA POWER daily telemetry (Jan 1, 2025 – Nov 2026) across the Niger-Nigeria Sahelian agricultural belt."}
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
                  {/* Glowing Radar Gradient */}
                  <radialGradient id="radarGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#facc15" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#facc15" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <rect width="960" height="540" fill="url(#gridPattern)" />

                {/* Country Border (Niger - Nigeria boundary line) */}
                <path
                  d="M 60 320 C 240 310, 420 330, 600 290 S 840 270, 920 280"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="2"
                  strokeDasharray="6 4"
                  opacity="0.4"
                />
                <text x="120" y="270" fill="#94a3b8" fontSize="13" fontFamily="monospace" opacity="0.6">NIGER (Maradi Region)</text>
                <text x="120" y="380" fill="#94a3b8" fontSize="13" fontFamily="monospace" opacity="0.6">NIGERIA (Kebbi State)</text>

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
                    className={`py-2 px-3 rounded-xl border text-xs font-mono font-bold transition-all text-left flex items-center justify-between ${
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
          <div className="lg:col-span-5 bg-[#0e1628] border border-white/15 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-yellow-400 text-black uppercase tracking-wider">
                  NASA POWER Grid Point
                </span>
                <span className="text-xs font-mono text-slate-400">
                  Elevation: {selectedGrid.elevation}
                </span>
              </div>

              <h3 className="text-2xl font-black text-white mt-2">
                {selectedGrid.fullName}
              </h3>

              <p className="text-xs text-slate-400 font-mono mt-1">
                📍 Latitude: {selectedGrid.lat}° N • Longitude: {selectedGrid.lon}° E
              </p>
            </div>

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
                  GWETTOP (Min: {selectedGrid.stats.minGWETTOP})
                </span>
              </div>

              <div className="bg-white/5 border border-white/10 p-3.5 rounded-2xl">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                  Mean Temperature (T2M)
                </span>
                <span className="text-xl sm:text-2xl font-mono font-extrabold text-amber-400">
                  {selectedGrid.stats.meanT2M}
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  Peak: {selectedGrid.stats.peakT2M}
                </span>
              </div>

              <div className="bg-white/5 border border-white/10 p-3.5 rounded-2xl">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                  Dry Season Exposure
                </span>
                <span className="text-xl sm:text-2xl font-mono font-extrabold text-rose-400">
                  {selectedGrid.stats.zeroRainDays}
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  Consecutive dry spell: {selectedGrid.stats.longDrySpell.split('(')[0]}
                </span>
              </div>
            </div>

            {/* Environmental Stress Risk Flags Triggered */}
            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-yellow-400 mb-2 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-yellow-400" />
                <span>Computed Environmental Triggers:</span>
              </h4>
              <div className="space-y-2">
                {selectedGrid.riskFlags.map((rf) => (
                  <div key={rf.id} className="p-2.5 rounded-xl bg-yellow-400/10 border border-yellow-400/25 text-xs text-slate-200">
                    <span className="font-bold text-yellow-400 font-mono block">{rf.name}:</span>
                    <span className="text-slate-300">{rf.desc}</span>
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
        </div>
      </div>
    </section>
  );
}

