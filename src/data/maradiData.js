// Comprehensive 2-Year NASA POWER Dataset (Jan 1, 2025 – Nov 2026) for the 4 Maradi Region Grids
// Event: 2026 NASA Space Apps Challenge — "Field Shift: Adapting Farms with NASA Data"

export const MARADI_GRIDS = [
  {
    id: "guidan",
    name: "Guidan Roumdji",
    fullName: "Guidan Roumdji Department, Maradi Region, Niger",
    lat: 13.657,
    lon: 6.6957,
    elevation: "371.85 m",
    period: "Jan 1, 2025 – Nov 4, 2026 (673 valid days)",
    zoneType: "Sahelo-Sudan Upland Dune & Goulbi Valley",
    soilUpland: "Sandy dune soils (0.6% organic carbon, highly porous)",
    soilValley: "Valley bottom (Goulbi) temporary runoff alluvial soils",
    crops: ["Pearl Millet", "Sorghum", "Cowpea (Niébé)", "Groundnuts", "Sesame", "Valley Vegetables"],
    stats: {
      cumRain: "1,198.2 mm",
      rain2025: "561.3 mm",
      rain2026: "637.0 mm",
      meanGWETTOP: "0.192",
      meanT2M: "28.85 °C",
      peakT2M: "35.89 °C (May 5, 2026)",
      minGWETTOP: "0.03 (May 14, 2026)",
      peakGWETTOP: "0.57 (Aug 31, 2025)",
      zeroRainDays: "431 days (64%)",
      dryTopsoilDays: "227 days (2025) / 189 days (2026)",
      heatSpellRuns: "5 major runs (7+ days ≥ 33.5°C)",
      longDrySpell: "192 days (Oct 12, 2025 – Apr 21, 2026)"
    },
    riskFlags: [
      { id: "RAPID_DRYDOWN", name: "Rapid Drydown Flag", active: true, desc: "GWETTOP collapsed to 0.08 within 30 days after last rain in 2026." },
      { id: "LONG_DRY_WINDOW", name: "Long Dry Window Flag", active: true, desc: "431 zero-rain days (64% of 2-year record). Wind erosion risk." },
      { id: "WEAK_ONSET", name: "Weak Onset Flag", active: true, desc: "Apr–May rainfall under 10 mm (1.7 mm in 2025, 7.6 mm in 2026)." },
      { id: "HEAT_SPELL", name: "Heat Spell Flag", active: true, desc: "Extended runs of T2M ≥ 33.5°C during pre-onset in May." }
    ],
    monthlySummary: [
      { month: "Jan 25", t2m: 22.3, soil: 0.13, rain: 0.0, rainyDays: 0 },
      { month: "Feb 25", t2m: 25.7, soil: 0.09, rain: 0.0, rainyDays: 0 },
      { month: "Mar 25", t2m: 30.9, soil: 0.06, rain: 0.0, rainyDays: 0 },
      { month: "Apr 25", t2m: 32.7, soil: 0.05, rain: 0.1, rainyDays: 0 },
      { month: "May 25", t2m: 34.1, soil: 0.06, rain: 1.6, rainyDays: 0 },
      { month: "Jun 25", t2m: 32.7, soil: 0.12, rain: 33.5, rainyDays: 7 },
      { month: "Jul 25", t2m: 28.5, soil: 0.34, rain: 183.5, rainyDays: 21 },
      { month: "Aug 25", t2m: 26.8, soil: 0.45, rain: 233.8, rainyDays: 25 },
      { month: "Sep 25", t2m: 27.5, soil: 0.46, rain: 77.7, rainyDays: 14 },
      { month: "Oct 25", t2m: 27.4, soil: 0.30, rain: 31.1, rainyDays: 3 },
      { month: "Nov 25", t2m: 25.7, soil: 0.14, rain: 0.0, rainyDays: 0 },
      { month: "Dec 25", t2m: 25.2, soil: 0.10, rain: 0.0, rainyDays: 0 },
      { month: "Jan 26", t2m: 24.7, soil: 0.08, rain: 0.0, rainyDays: 0 },
      { month: "Feb 26", t2m: 26.3, soil: 0.06, rain: 0.0, rainyDays: 0 },
      { month: "Mar 26", t2m: 29.2, soil: 0.05, rain: 0.0, rainyDays: 0 },
      { month: "Apr 26", t2m: 32.4, soil: 0.04, rain: 0.4, rainyDays: 0 },
      { month: "May 26", t2m: 34.1, soil: 0.06, rain: 7.2, rainyDays: 1 },
      { month: "Jun 26", t2m: 31.1, soil: 0.23, rain: 130.7, rainyDays: 14 },
      { month: "Jul 26", t2m: 29.6, soil: 0.34, rain: 223.3, rainyDays: 17 },
      { month: "Aug 26", t2m: 27.9, soil: 0.49, rain: 195.6, rainyDays: 20 },
      { month: "Sep 26", t2m: 28.0, soil: 0.45, rain: 74.9, rainyDays: 13 },
      { month: "Oct 26", t2m: 31.2, soil: 0.12, rain: 4.9, rainyDays: 2 }
    ]
  },
  {
    id: "augie",
    name: "Augie LGA",
    fullName: "Augie Local Government Area, Kebbi State (Maradi Corridor)",
    lat: 12.8903,
    lon: 4.5996,
    elevation: "247.31 m",
    period: "Jan 1, 2025 – Nov 3, 2026 (672 valid days)",
    zoneType: "Upland Sandy Loam & Lowland Fadama Clay",
    soilUpland: "Sandy loam, 71.5% sand, 0.6% organic carbon (fast drainage)",
    soilValley: "Lowland Fadama (clay loam, high moisture retention, salinity risk)",
    crops: ["Millet", "Groundnuts", "Sorghum", "Irrigated Rice", "Sugarcane", "Cowpea"],
    stats: {
      cumRain: "1,775.8 mm",
      rain2025: "836.1 mm",
      rain2026: "939.7 mm",
      meanGWETTOP: "0.301",
      meanT2M: "29.05 °C",
      peakT2M: "36.69 °C (May 6, 2026)",
      minGWETTOP: "0.06 (Apr 6, 2026)",
      peakGWETTOP: "0.77 (Aug 31, 2025)",
      zeroRainDays: "394 days (59%)",
      dryTopsoilDays: "108 days (2025) / 154 days (2026)",
      heatSpellRuns: "3 major runs (7+ days ≥ 34.1°C)",
      longDrySpell: "119 days (Jan 1 – Apr 29, 2025)"
    },
    riskFlags: [
      { id: "RAPID_DRYDOWN", name: "Rapid Drydown Flag", active: true, desc: "GWETTOP dropped from 0.70 to 0.11 within 30 days after rains in Oct 2026." },
      { id: "LONG_DRY_WINDOW", name: "Long Dry Window Flag", active: true, desc: "394 zero-rain days across 22-month window." },
      { id: "WEAK_ONSET", name: "Weak Onset Flag", active: true, desc: "Apr–May rainfall 23.4 mm in 2026 (below 30 mm threshold)." },
      { id: "HEAT_SPELL", name: "Heat Spell Flag", active: true, desc: "Two 10-day heat spells in 2025 and one 14-day heat spell in 2026." }
    ],
    monthlySummary: [
      { month: "Jan 25", t2m: 23.5, soil: 0.21, rain: 0.0, rainyDays: 0 },
      { month: "Feb 25", t2m: 26.9, soil: 0.14, rain: 0.0, rainyDays: 0 },
      { month: "Mar 25", t2m: 31.9, soil: 0.11, rain: 0.0, rainyDays: 0 },
      { month: "Apr 25", t2m: 33.7, soil: 0.08, rain: 0.0, rainyDays: 0 },
      { month: "May 25", t2m: 34.3, soil: 0.13, rain: 45.1, rainyDays: 3 },
      { month: "Jun 25", t2m: 32.2, soil: 0.24, rain: 72.7, rainyDays: 10 },
      { month: "Jul 25", t2m: 28.0, soil: 0.48, rain: 215.3, rainyDays: 20 },
      { month: "Aug 25", t2m: 26.4, soil: 0.62, rain: 350.7, rainyDays: 26 },
      { month: "Sep 25", t2m: 26.8, soil: 0.67, rain: 132.7, rainyDays: 18 },
      { month: "Oct 25", t2m: 26.5, soil: 0.54, rain: 19.7, rainyDays: 2 },
      { month: "Nov 25", t2m: 25.0, soil: 0.33, rain: 0.0, rainyDays: 0 },
      { month: "Dec 25", t2m: 25.8, soil: 0.19, rain: 0.0, rainyDays: 0 },
      { month: "Jan 26", t2m: 25.2, soil: 0.14, rain: 0.0, rainyDays: 0 },
      { month: "Feb 26", t2m: 27.5, soil: 0.11, rain: 0.0, rainyDays: 0 },
      { month: "Mar 26", t2m: 30.6, soil: 0.09, rain: 0.0, rainyDays: 0 },
      { month: "Apr 26", t2m: 33.1, soil: 0.07, rain: 4.3, rainyDays: 1 },
      { month: "May 26", t2m: 34.3, soil: 0.13, rain: 19.1, rainyDays: 4 },
      { month: "Jun 26", t2m: 31.0, soil: 0.33, rain: 177.5, rainyDays: 17 },
      { month: "Jul 26", t2m: 29.0, soil: 0.49, rain: 215.9, rainyDays: 19 },
      { month: "Aug 26", t2m: 27.7, soil: 0.65, rain: 338.4, rainyDays: 29 },
      { month: "Sep 26", t2m: 27.6, soil: 0.68, rain: 169.3, rainyDays: 19 },
      { month: "Oct 26", t2m: 31.6, soil: 0.18, rain: 15.1, rainyDays: 5 }
    ]
  },
  {
    id: "tessaoua",
    name: "Tessaoua",
    fullName: "Tessaoua Local Government Area, Maradi Region, Niger",
    lat: 13.7569,
    lon: 7.9881,
    elevation: "434.04 m",
    period: "Jan 1, 2025 – Sep 1, 2026",
    zoneType: "Sahelian Arid Dryland & Dune Complex",
    soilUpland: "Sandy dryland soil (topsoil wetness 0.04-0.08 for 7+ months/year)",
    soilValley: "Depression basins (temporary water ponding)",
    crops: ["Pearl Millet", "Cowpea (Niébé)", "Groundnuts", "Sorghum"],
    stats: {
      cumRain: "674.8 mm",
      rain2025: "454.5 mm",
      rain2026: "220.3 mm (to Sep)",
      meanGWETTOP: "0.190 (2025) / 0.120 (2026)",
      meanT2M: "27.92 °C (2025) / 29.62 °C (2026)",
      peakT2M: "35.96 °C (May 15, 2025)",
      minGWETTOP: "0.03 (May 11, 2026)",
      peakGWETTOP: "0.56 (Jul 24, 2025)",
      zeroRainDays: "209 days ≤ 0.15 GWETTOP (2025)",
      dryTopsoilDays: "209 days (2025) / 181 days (2026)",
      heatSpellRuns: "Pre-monsoon heat peaks in May",
      longDrySpell: "Severe 7-month dry season"
    },
    riskFlags: [
      { id: "RAPID_DRYDOWN", name: "Rapid Drydown Flag", active: true, desc: "Topsoil collapses to 0.04–0.05 right after brief monsoon." },
      { id: "WEAK_ONSET", name: "Weak Onset Flag", active: true, desc: "Apr–May rain totaled only 0.3 mm in 2025 and 6.5 mm in 2026." },
      { id: "HEAT_SPELL", name: "Heat Spell Flag", active: true, desc: "Peak daily temperature reached 35.96°C in May before rains." }
    ],
    monthlySummary: [
      { month: "Jan 25", t2m: 21.0, soil: 0.17, rain: 0.0, rainyDays: 0 },
      { month: "Feb 25", t2m: 24.4, soil: 0.10, rain: 0.0, rainyDays: 0 },
      { month: "Mar 25", t2m: 29.8, soil: 0.07, rain: 0.0, rainyDays: 0 },
      { month: "Apr 25", t2m: 31.8, soil: 0.05, rain: 0.0, rainyDays: 0 },
      { month: "May 25", t2m: 34.0, soil: 0.05, rain: 0.4, rainyDays: 0 },
      { month: "Jun 25", t2m: 33.3, soil: 0.10, rain: 16.5, rainyDays: 4 },
      { month: "Jul 25", t2m: 29.1, soil: 0.32, rain: 185.4, rainyDays: 15 },
      { month: "Aug 25", t2m: 27.1, soil: 0.46, rain: 186.2, rainyDays: 22 },
      { month: "Sep 25", t2m: 28.0, soil: 0.42, rain: 45.3, rainyDays: 11 },
      { month: "Oct 25", t2m: 27.4, soil: 0.27, rain: 20.8, rainyDays: 2 },
      { month: "Nov 25", t2m: 24.8, soil: 0.15, rain: 0.0, rainyDays: 0 },
      { month: "Dec 25", t2m: 24.2, soil: 0.10, rain: 0.0, rainyDays: 0 },
      { month: "Jan 26", t2m: 23.6, soil: 0.08, rain: 0.0, rainyDays: 0 },
      { month: "Feb 26", t2m: 25.1, soil: 0.06, rain: 0.0, rainyDays: 0 },
      { month: "Mar 26", t2m: 28.1, soil: 0.05, rain: 0.0, rainyDays: 0 },
      { month: "Apr 26", t2m: 31.6, soil: 0.04, rain: 0.0, rainyDays: 0 },
      { month: "May 26", t2m: 34.1, soil: 0.05, rain: 6.4, rainyDays: 2 },
      { month: "Jun 26", t2m: 33.0, soil: 0.13, rain: 26.4, rainyDays: 6 },
      { month: "Jul 26", t2m: 31.6, soil: 0.19, rain: 97.6, rainyDays: 11 },
      { month: "Aug 26", t2m: 29.6, soil: 0.34, rain: 89.8, rainyDays: 17 }
    ]
  },
  {
    id: "madarounfa",
    name: "Madarounfa",
    fullName: "Madarounfa Local Government Area, Maradi Region, Niger",
    lat: 13.305,
    lon: 7.1619,
    elevation: "371.85 m",
    period: "Jan 1, 2025 – Nov 3, 2026",
    zoneType: "South Maradi Agricultural & Lake Basin",
    soilUpland: "Sandy loam, loose topsoil, vulnerable to post-harvest drydown",
    soilValley: "Fadama / Lake basin alluvium (higher organic carbon)",
    crops: ["Pearl Millet", "Cowpea (Niébé)", "Groundnuts", "Sesame", "Irrigated Rice"],
    stats: {
      cumRain: "1,775.8 mm",
      rain2025: "836.1 mm",
      rain2026: "939.7 mm",
      meanGWETTOP: "0.313 (2025) / 0.287 (2026)",
      meanT2M: "28.42 °C (2025) / 29.79 °C (2026)",
      peakT2M: "36.69 °C (May 6, 2026)",
      minGWETTOP: "0.06 (Apr 6, 2026)",
      peakGWETTOP: "0.77 (Aug 31, 2025)",
      zeroRainDays: "108 days ≤ 0.15 (2025) / 154 days (2026)",
      dryTopsoilDays: "108 days (2025) / 154 days (2026)",
      heatSpellRuns: "18 days ≥ 35°C in 2025, 13 days in 2026",
      longDrySpell: "Rapid collapse 60 days post-peak"
    },
    riskFlags: [
      { id: "RAPID_DRYDOWN", name: "Rapid Drydown Flag", active: true, desc: "Surface wetness collapses quickly from 0.66 down to 0.16 within 60 days post-peak." },
      { id: "HEAT_SPELL", name: "Heat Spell Flag", active: true, desc: "May temperature peaks of 36.2°C to 36.69°C." },
      { id: "WEAK_ONSET", name: "Weak Onset Flag", active: true, desc: "Erratic early April-May rain pulses." }
    ],
    monthlySummary: [
      { month: "Jan 25", t2m: 23.4, soil: 0.21, rain: 0.0, rainyDays: 0 },
      { month: "Feb 25", t2m: 26.8, soil: 0.14, rain: 0.0, rainyDays: 0 },
      { month: "Mar 25", t2m: 31.8, soil: 0.11, rain: 0.0, rainyDays: 0 },
      { month: "Apr 25", t2m: 33.6, soil: 0.08, rain: 0.0, rainyDays: 0 },
      { month: "May 25", t2m: 34.2, soil: 0.13, rain: 44.5, rainyDays: 3 },
      { month: "Jun 25", t2m: 32.1, soil: 0.24, rain: 71.2, rainyDays: 10 },
      { month: "Jul 25", t2m: 27.9, soil: 0.48, rain: 210.5, rainyDays: 19 },
      { month: "Aug 25", t2m: 26.3, soil: 0.62, rain: 345.2, rainyDays: 25 },
      { month: "Sep 25", t2m: 26.7, soil: 0.67, rain: 130.4, rainyDays: 18 },
      { month: "Oct 25", t2m: 26.4, soil: 0.54, rain: 18.5, rainyDays: 2 },
      { month: "Nov 25", t2m: 24.9, soil: 0.33, rain: 0.0, rainyDays: 0 },
      { month: "Dec 25", t2m: 25.7, soil: 0.19, rain: 0.0, rainyDays: 0 },
      { month: "Jan 26", t2m: 25.1, soil: 0.14, rain: 0.0, rainyDays: 0 },
      { month: "Feb 26", t2m: 27.4, soil: 0.11, rain: 0.0, rainyDays: 0 },
      { month: "Mar 26", t2m: 30.5, soil: 0.09, rain: 0.0, rainyDays: 0 },
      { month: "Apr 26", t2m: 33.0, soil: 0.07, rain: 4.2, rainyDays: 1 },
      { month: "May 26", t2m: 34.2, soil: 0.13, rain: 18.8, rainyDays: 4 },
      { month: "Jun 26", t2m: 30.9, soil: 0.33, rain: 175.0, rainyDays: 17 },
      { month: "Jul 26", t2m: 28.9, soil: 0.49, rain: 212.0, rainyDays: 19 },
      { month: "Aug 26", t2m: 27.6, soil: 0.65, rain: 335.0, rainyDays: 28 },
      { month: "Sep 26", t2m: 27.5, soil: 0.68, rain: 167.0, rainyDays: 19 },
      { month: "Oct 26", t2m: 31.5, soil: 0.18, rain: 14.8, rainyDays: 5 }
    ]
  }
];

// Official Research Citations (Section 13 of Report)
export const OFFICIAL_RESEARCH_SOURCES = [
  {
    title: "Niger Crop Overview — Global Yield Gap Atlas",
    desc: "Millet, sorghum and cowpea as main staples and intercropping practices across Maradi Region.",
    url: "https://www.yieldgap.org/niger"
  },
  {
    title: "Millet Yield Near Native Trees in Guidan-Roumdji (AFR100)",
    desc: "Empirical field records showing 547 kg/ha baseline vs 937 kg/ha yield near native agroforestry trees.",
    url: "https://afr100.org/"
  },
  {
    title: "Cowpea Adoption Survey: Maradi & Guidan Roumdji (MDPI)",
    desc: "Evaluation of nitrogen-fixing cowpea cultivars and peanut rotations in sandy Sahelian soils.",
    url: "https://www.mdpi.com/"
  },
  {
    title: "FAO Regional Agro-Climatology Project in Dosso & Maradi",
    desc: "Strategic groundnut, cowpea, sesame and pearl millet seed distribution in dryland zones.",
    url: "https://www.fao.org/"
  },
  {
    title: "CARE Hamzari Learning Brief — Guidan Roumdji Department",
    desc: "Analysis of soil degradation, erosion mitigation, and overexploitation in rural Maradi.",
    url: "https://www.care.org/"
  },
  {
    title: "CIRAD Research on Maradi Dune Soils & Goulbi de Maradi",
    desc: "Dune soil mechanics, hydromorphic fossil valley soils, and market gardening water tables.",
    url: "https://www.cirad.fr/"
  },
  {
    title: "Goulbi Valleys & Market Gardening in the Sahelo-Sudan Zone (Cogent 2020)",
    desc: "Hydro-agricultural development and dry-season vegetable cultivation along valley flows.",
    url: "https://www.tandfonline.com/"
  },
  {
    title: "Guiera senegalensis Shrub Ecology & Millet Yield Enhancement",
    desc: "Hydraulic redistribution by native shrubs preventing topsoil desiccations during pre-onset heat.",
    url: "https://www.sciencedirect.com/"
  }
];

// Official NASA Satellite Telemetry Specification
export const NASA_DATASET_SPEC = {
  source: "NASA POWER Native Resolution Daily Data (MERRA-2 Model Assimilation)",
  coverage: "January 1, 2025 through November 2026 (Continuous 2-Year Archive)",
  parameters: [
    { code: "T2M", name: "Temperature at 2 Meters", unit: "°C", note: "Daily MEAN air temperature" },
    { code: "GWETTOP", name: "Surface Soil Wetness", unit: "0.0 to 1.0 (fraction)", note: "Topsoil moisture layer (MERRA-2)" },
    { code: "PRECTOTCORR", name: "Corrected Total Precipitation", unit: "mm/day", note: "Bias-corrected daily satellite radar rainfall" }
  ],
  resolution: "0.5° × 0.625° native latitude/longitude grid cell"
};

