import React, { useState, useEffect } from 'react';
import { 
  Droplets, Thermometer, CloudRain, Sun, Leaf, Wind, 
  MapPin, RefreshCw, X, TrendingUp, Download, Layers, BarChart3, Activity 
} from 'lucide-react';
import { REGIONS, fetchNasaTelemetry } from '../services/nasaPowerService';
import { MARADI_GRIDS } from '../data/maradiData';

export default function GeospatialDataSection({ lang, t, activeGrid, onSelectGrid }) {
  const [selectedRegion, setSelectedRegion] = useState(
    REGIONS.find(r => r.id === activeGrid?.id) || REGIONS[0]
  );
  const [telemetry, setTelemetry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeModalMetric, setActiveModalMetric] = useState(null);
  const [viewMode, setViewMode] = useState('graphs'); // 'graphs' | 'map'
  const isUrdu = lang === 'ur';

  // Sync when activeGrid changes from external click (e.g. from the map)
  useEffect(() => {
    if (activeGrid) {
      const match = REGIONS.find(r => r.id === activeGrid.id);
      if (match && match.id !== selectedRegion.id) {
        setSelectedRegion(match);
      }
    }
  }, [activeGrid]);

  const loadData = async (region) => {
    setLoading(true);
    const data = await fetchNasaTelemetry(region.lat, region.lon);
    setTelemetry(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData(selectedRegion);
  }, [selectedRegion]);

  const cards = telemetry ? [
    {
      id: 'soilMoisture',
      icon: Droplets,
      iconColor: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
      label: isUrdu ? "سطحی مٹی کی نمی" : "Surface Soil Wetness",
      source: "MERRA-2 Surface Wetness (0–1 fraction)",
      sourceTag: "NASA POWER",
      paramTag: "GWETTOP",
      val: `${telemetry.soilMoisture.value}%`,
      status: telemetry.soilMoisture.status,
      trend: telemetry.soilMoisture.trend,
      strokeColor: '#38bdf8',
      fillColor: 'rgba(56, 189, 248, 0.15)',
      data: telemetry.soilMoisture
    },
    {
      id: 'temperature',
      icon: Thermometer,
      iconColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      label: isUrdu ? "ہوا کا اوسط درجہ حرارت" : "Air Temperature (2m Mean)",
      source: "MERRA-2 Daily Mean Air Temperature",
      sourceTag: "NASA POWER",
      paramTag: "T2M",
      val: `${telemetry.temperature.value} °C`,
      status: telemetry.temperature.status,
      trend: telemetry.temperature.trend,
      strokeColor: '#f59e0b',
      fillColor: 'rgba(245, 158, 11, 0.15)',
      data: telemetry.temperature
    },
    {
      id: 'rainfall',
      icon: CloudRain,
      iconColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
      label: isUrdu ? "روزانہ بارش کی درست مقدار" : "Precipitation Corrected",
      source: "Daily Bias-Corrected Rain (PRECTOTCORR)",
      sourceTag: "GPM IMERG",
      paramTag: "PRECTOTCORR",
      val: `${telemetry.rainfall.value} mm`,
      status: telemetry.rainfall.status,
      trend: telemetry.rainfall.trend,
      strokeColor: '#06b6d4',
      fillColor: 'rgba(6, 182, 212, 0.15)',
      data: telemetry.rainfall
    },
    {
      id: 'ndviIndex',
      icon: Leaf,
      iconColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      label: isUrdu ? "ہریالی کا انڈیکس" : "Vegetation Index",
      source: "MODIS 250m Surface Reflectance",
      sourceTag: "TERRA MODIS",
      paramTag: "NDVI",
      val: telemetry.ndviIndex.value,
      status: telemetry.ndviIndex.status,
      trend: telemetry.ndviIndex.trend,
      strokeColor: '#10b981',
      fillColor: 'rgba(16, 185, 129, 0.15)',
      data: telemetry.ndviIndex
    },
    {
      id: 'solarRadiation',
      icon: Sun,
      iconColor: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
      label: isUrdu ? "سورج کی شعاعیں" : "Solar Insolation",
      source: "Surface All-Sky Solar Flux",
      sourceTag: "CERES",
      paramTag: "ALLSKY_SW",
      val: `${telemetry.solarRadiation.value} MJ`,
      status: telemetry.solarRadiation.status,
      trend: telemetry.solarRadiation.trend,
      strokeColor: '#eab308',
      fillColor: 'rgba(234, 179, 8, 0.15)',
      data: telemetry.solarRadiation
    },
    {
      id: 'humidity',
      icon: Wind,
      iconColor: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
      label: isUrdu ? "ہوا میں نمی" : "Relative Humidity",
      source: "2m Relative Humidity",
      sourceTag: "AIRS AQUA",
      paramTag: "RH2M",
      val: `${telemetry.humidity.value}%`,
      status: telemetry.humidity.status,
      trend: telemetry.humidity.trend,
      strokeColor: '#818cf8',
      fillColor: 'rgba(129, 140, 248, 0.15)',
      data: telemetry.humidity
    }
  ] : [];

  const renderSparkline = (dataArray, strokeColor, fillColor, height = 65) => {
    if (!dataArray || dataArray.length === 0) return null;
    const min = Math.min(...dataArray);
    const max = Math.max(...dataArray);
    const range = max - min || 1;
    const w = 300;
    const padding = 10;

    const points = dataArray.map((val, idx) => {
      const x = padding + (idx / (dataArray.length - 1)) * (w - padding * 2);
      const y = height - padding - ((val - min) / range) * (height - padding * 2);
      return `${x},${y}`;
    }).join(' ');

    const fillPath = `${points} ${w - padding},${height} ${padding},${height}`;

    return (
      <svg className="w-full overflow-visible" height={height} viewBox={`0 0 ${w} ${height}`}>
        <polygon points={fillPath} fill={fillColor} />
        <polyline
          fill="none"
          stroke={strokeColor}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
        />
        {dataArray.map((val, idx) => {
          const x = padding + (idx / (dataArray.length - 1)) * (w - padding * 2);
          const y = height - padding - ((val - min) / range) * (height - padding * 2);
          return (
            <circle
              key={idx}
              cx={x}
              cy={y}
              r={idx === dataArray.length - 1 ? 4 : 2}
              fill={idx === dataArray.length - 1 ? strokeColor : '#ffffff'}
              stroke={strokeColor}
              strokeWidth="1.5"
            />
          );
        })}
      </svg>
    );
  };

  const handleExportCSV = (metricData) => {
    if (!metricData) return;
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Day,Value\n" 
      + metricData.trend.map((v, i) => `${metricData.days[i] || `Day ${i+1}`},${v}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `NASA_Telemetry_${selectedRegion.id}_2025_2026.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="data" className="py-20 px-6 sm:px-10 lg:px-16 bg-[#080d19] border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-xs font-mono font-bold tracking-wider mb-3">
              <Activity className="w-3.5 h-3.5" />
              <span>{isUrdu ? "ناسا پاور 2 سالہ ٹیلی میٹری (1 جنوری 2025 تا نومبر 2026)" : "NASA POWER 2-YEAR TELEMETRY (JAN 2025 – NOV 2026)"}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              {isUrdu ? "مرادی 4 گرڈز: سیٹلائٹ زرعی اشاریے اور گراف" : "Maradi 4 Grids: Satellite Agro-Metrics & Graphs"}
            </h2>
            <p className="mt-3 text-slate-400 text-base max-w-2xl">
              {isUrdu
                ? "گائیڈان، اوگی، تیساوا اور مادارونفا کے لیے MERRA-2 اور GPM IMERG سے حاصل کردہ درجہ حرارت، مٹی کی نمی اور بارش کا ریکارڈ۔"
                : "Continuous daily telemetry from NASA POWER native resolution MERRA-2 assimilation for Guidan Roumdji, Augie, Tessaoua, and Madarounfa."}
            </p>
          </div>

          {/* Region Selector & View Toggle */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <select
                value={selectedRegion.id}
                onChange={(e) => {
                  const reg = REGIONS.find(r => r.id === e.target.value);
                  if (reg) {
                    setSelectedRegion(reg);
                    onSelectGrid?.(reg.gridData);
                  }
                }}
                className="appearance-none bg-white/5 hover:bg-white/10 border border-white/15 text-white text-sm font-medium py-2.5 pl-4 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 cursor-pointer backdrop-blur-md font-mono"
              >
                {REGIONS.map((r) => (
                  <option key={r.id} value={r.id} className="bg-slate-900 text-white">
                    📍 {r.name} ({r.lat}°N, {r.lon}°E)
                  </option>
                ))}
              </select>
              <MapPin className="w-4 h-4 text-yellow-400 absolute right-3 top-3 pointer-events-none" />
            </div>

            {/* Switch: Graphs vs Monthly Matrix */}
            <div className="flex items-center bg-black/40 border border-white/15 rounded-xl p-1">
              <button
                onClick={() => setViewMode('graphs')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  viewMode === 'graphs'
                    ? 'bg-yellow-400 text-black font-semibold shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>{t.geo.viewGraphs}</span>
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  viewMode === 'map'
                    ? 'bg-yellow-400 text-black font-semibold shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>{isUrdu ? "ماہانہ سمری میٹرکس" : "Monthly Table (6.5)"}</span>
              </button>
            </div>

            <button
              onClick={() => loadData(selectedRegion)}
              disabled={loading}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-slate-300 hover:text-white transition-all"
              title="Refresh Telemetry"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-yellow-400' : ''}`} />
            </button>
          </div>
        </div>

        {/* View Mode 1: Graphical Cards Grid */}
        {viewMode === 'graphs' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.id}
                  className="bg-[#0e1628]/90 hover:bg-[#121c33] border border-white/10 hover:border-yellow-400/40 rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between group shadow-xl relative overflow-hidden"
                >
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2.5 rounded-xl border ${card.iconColor}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white group-hover:text-yellow-400 transition-colors">
                            {card.label}
                          </h3>
                          <p className="text-xs text-slate-400">
                            {card.source}
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/10 font-bold">
                        {card.paramTag}
                      </span>
                    </div>

                    <div className="my-3">
                      <span className="text-4xl sm:text-5xl font-mono font-extrabold text-white tracking-tight">
                        {card.val}
                      </span>
                    </div>

                    <div className="py-2">
                      {renderSparkline(card.trend, card.strokeColor, card.fillColor, 75)}
                    </div>

                    <p className="text-xs text-slate-300 mt-2 line-clamp-2">
                      {card.status}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-slate-400 border border-white/5">
                        {card.sourceTag}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-yellow-400/10 text-yellow-300 border border-yellow-400/20">
                        {selectedRegion.name}
                      </span>
                    </div>

                    <button
                      onClick={() => setActiveModalMetric(card)}
                      className="text-xs font-semibold text-yellow-400 hover:text-yellow-300 flex items-center gap-1 transition-colors"
                    >
                      <span>{isUrdu ? "تفصیلات دیکھیں" : "View details"}</span>
                      <span>→</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* View Mode 2: Official Month-by-Month Summary Table (Section 6.5 of Report) */}
        {viewMode === 'map' && selectedRegion.gridData && (
          <div className="bg-[#0e1628] border border-white/10 rounded-3xl p-6 shadow-2xl overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-yellow-400" />
                  <span>{selectedRegion.fullName} — Monthly Climate Record (Jan 2025 – Nov 2026)</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Source: NASA POWER MERRA-2 Daily Resolution • Elevation: {selectedRegion.elevation}
                </p>
              </div>

              <button
                onClick={() => handleExportCSV({ trend: selectedRegion.gridData.monthlySummary.map(m => m.rain), days: selectedRegion.gridData.monthlySummary.map(m => m.month) })}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-mono transition-all"
              >
                <Download className="w-3.5 h-3.5 text-yellow-400" />
                <span>Export Monthly CSV</span>
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400 uppercase text-[10px]">
                    <th className="py-2.5 px-3">Month</th>
                    <th className="py-2.5 px-3">Mean Temp (°C)</th>
                    <th className="py-2.5 px-3">Soil Wetness (GWETTOP)</th>
                    <th className="py-2.5 px-3">Rainfall (mm)</th>
                    <th className="py-2.5 px-3">Rainy Days (≥1mm)</th>
                    <th className="py-2.5 px-3">Sahelian Phase</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-200">
                  {selectedRegion.gridData.monthlySummary.map((m, idx) => {
                    const isMonsoon = m.month.includes('Jul') || m.month.includes('Aug') || m.month.includes('Sep');
                    const isHotPreOnset = m.month.includes('Apr') || m.month.includes('May');
                    const phase = isMonsoon ? "Peak Monsoon (Crop Growth)" : isHotPreOnset ? "Pre-Onset Extreme Heat" : "Cool / Hot Dry Season";

                    return (
                      <tr key={idx} className={isMonsoon ? 'bg-emerald-500/5' : isHotPreOnset ? 'bg-amber-500/5' : ''}>
                        <td className="py-2.5 px-3 font-bold text-white">{m.month}</td>
                        <td className="py-2.5 px-3 text-amber-400">{m.t2m} °C</td>
                        <td className="py-2.5 px-3 text-blue-400">{m.soil}</td>
                        <td className="py-2.5 px-3 text-cyan-400">{m.rain} mm</td>
                        <td className="py-2.5 px-3">{m.rainyDays}</td>
                        <td className="py-2.5 px-3 text-slate-400 text-[11px]">{phase}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Note below section */}
        <div className="mt-8 p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-400 flex items-center justify-between flex-wrap gap-2">
          <span>
            {isUrdu 
              ? "ناسا پاور اور MERRA-2 ماڈل کا 2 سالہ تصدیق شدہ ڈیٹا: 1 جنوری 2025 تا نومبر 2026 کے 673 یومیہ مشاہدات۔"
              : "NASA POWER MERRA-2 2-Year Archive: 673 continuous daily rows validated from January 1, 2025 to November 2026."}
          </span>
          <span className="font-mono text-emerald-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            2-YEAR ARCHIVE ACTIVE
          </span>
        </div>
      </div>

      {/* Modal Detail Popup */}
      {activeModalMetric && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="bg-[#111928] border border-white/20 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-2xl border ${activeModalMetric.iconColor}`}>
                  <activeModalMetric.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    {activeModalMetric.label}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {selectedRegion.fullName} • {activeModalMetric.source}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveModalMetric(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="my-6">
              <div className="text-5xl sm:text-6xl font-mono font-black text-white mb-4">
                {activeModalMetric.val}
              </div>

              <div className="bg-black/40 rounded-2xl p-4 border border-white/10 my-4">
                <p className="text-xs font-mono text-slate-400 mb-2 uppercase tracking-wider">
                  Recent Daily Trend (NASA POWER)
                </p>
                {renderSparkline(activeModalMetric.trend, activeModalMetric.strokeColor, activeModalMetric.fillColor, 120)}
              </div>

              <div className="grid grid-cols-3 gap-4 text-center my-6">
                <div className="bg-white/5 border border-white/10 p-3 rounded-2xl">
                  <div className="text-lg sm:text-xl font-mono font-bold text-white">
                    {activeModalMetric.data.avg} {activeModalMetric.data.unit}
                  </div>
                  <div className="text-[11px] uppercase tracking-wider text-slate-400 mt-0.5">Average</div>
                </div>
                <div className="bg-white/5 border border-white/10 p-3 rounded-2xl">
                  <div className="text-lg sm:text-xl font-mono font-bold text-emerald-400">
                    {activeModalMetric.data.max} {activeModalMetric.data.unit}
                  </div>
                  <div className="text-[11px] uppercase tracking-wider text-slate-400 mt-0.5">Highest</div>
                </div>
                <div className="bg-white/5 border border-white/10 p-3 rounded-2xl">
                  <div className="text-lg sm:text-xl font-mono font-bold text-blue-400">
                    {activeModalMetric.data.min} {activeModalMetric.data.unit}
                  </div>
                  <div className="text-[11px] uppercase tracking-wider text-slate-400 mt-0.5">Lowest</div>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-white/10">
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-yellow-400 mb-1">
                  WHAT IT MEANS FOR SAHELIAN DRYLAND CROPS
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {activeModalMetric.data.meaning}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400 mb-1">
                  HOW NASA MEASURES IT (MERRA-2 REANALYSIS)
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {activeModalMetric.data.measurement}
                </p>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={() => handleExportCSV(activeModalMetric.data)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-all"
              >
                <Download className="w-3.5 h-3.5 text-yellow-400" />
                <span>{t.geo.exportData}</span>
              </button>

              <button
                onClick={() => setActiveModalMetric(null)}
                className="px-6 py-2 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black text-xs font-bold transition-all"
              >
                {t.geo.modalClose}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
