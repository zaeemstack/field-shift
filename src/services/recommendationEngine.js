// NASA Field Shift: Climate-Resilient Crop Rotation Decision Engine
// Tailored for Maradi Region (Guidan Roumdji, Augie LGA, Tessaoua, Madarounfa) & Global Drylands
// Based on Reports Prepared by Ayisha Sajid & Abdul Rafay (2026 NASA Space Apps Challenge)

import { MARADI_GRIDS, REPLACEMENT_STRATEGIES } from '../data/maradiData';

export function generateRecommendation({
  location = "Guidan Roumdji",
  zone = "Upland",
  crop = "Wheat",
  waterAccess = "Rain only", // 'Rain only' | 'Irrigated in wet season only' | 'Irrigated in dry season'
  waterAvailability = "Medium",
  priority = "Soil health", // 'Soil health' | 'Water saving' | 'Income'
  telemetry,
  lang = 'en'
}) {
  const isUrdu = lang === 'ur';

  // Find matching grid data
  const grid = MARADI_GRIDS.find(g => 
    g.name.toLowerCase().includes(location.toLowerCase()) || 
    location.toLowerCase().includes(g.name.toLowerCase())
  ) || MARADI_GRIDS[0];

  const cropLower = (crop || "").toLowerCase();
  const isUpland = zone.toLowerCase().includes("upland");
  const isValley = !isUpland;

  // Active Environmental Stress Flags calculated from NASA dataset
  const flags = [];
  if (grid.id === "guidan") {
    flags.push({ id: "RAPID_DRYDOWN", name: "Rapid Drydown", desc: "GWETTOP collapsed to 0.08 within 30 days post-rain in 2026." });
    flags.push({ id: "LONG_DRY_WINDOW", name: "Long Dry Window", desc: "431 zero-rain days (64% of record). Wind erosion danger." });
    flags.push({ id: "WEAK_ONSET", name: "Weak Onset", desc: "Apr–May rain totaled only 1.7 mm in 2025 and 7.6 mm in 2026." });
    flags.push({ id: "HEAT_SPELL", name: "Heat Spell", desc: "Extended runs of T2M ≥ 33.5°C in May before monsoons." });
  } else if (grid.id === "augie") {
    flags.push({ id: "RAPID_DRYDOWN", name: "Rapid Drydown", desc: "GWETTOP fell from 0.70 to 0.11 within 30 days after rains in 2026." });
    flags.push({ id: "LONG_DRY_WINDOW", name: "Long Dry Window", desc: "394 zero-rain days across 22-month window." });
    flags.push({ id: "WEAK_ONSET", name: "Weak Onset", desc: "Apr–May 2026 rain was only 23.4 mm (below 30 mm safe onset)." });
    flags.push({ id: "HEAT_SPELL", name: "Heat Spell", desc: "Two 10-day heat spells in 2025 and one 14-day heat spell in 2026." });
  } else if (grid.id === "tessaoua") {
    flags.push({ id: "RAPID_DRYDOWN", name: "Rapid Drydown", desc: "Topsoil collapses to 0.04–0.05 right after brief monsoon." });
    flags.push({ id: "WEAK_ONSET", name: "Weak Onset", desc: "Apr–May rain totaled only 0.3 mm in 2025 and 6.5 mm in 2026." });
    flags.push({ id: "HEAT_SPELL", name: "Heat Spell", desc: "Peak daily temperature reached 35.96°C in May before rains." });
  } else {
    flags.push({ id: "RAPID_DRYDOWN", name: "Rapid Drydown", desc: "Surface wetness collapses quickly from 0.66 down to 0.16 post-peak." });
    flags.push({ id: "HEAT_SPELL", name: "Heat Spell", desc: "May temperature peaks of 36.2°C to 36.69°C." });
    flags.push({ id: "WEAK_ONSET", name: "Weak Onset", desc: "Erratic early April-May rain pulses." });
  }

  if (isValley && waterAccess.toLowerCase().includes("dry season")) {
    flags.push({ id: "DRY_SEASON_IRRIGATION", name: "Salinity Risk", desc: "Dry-season irrigation in lowlands concentrates soil salinity & sodicity." });
  }

  // -------------------------------------------------------------
  // Decision Logic Matrix (Section 8.3 of Research Reports)
  // -------------------------------------------------------------
  let rotationSequence = [];
  let rotationExplanation = "";
  let residueAdvice = "";
  let waterDemandBadge = "Moderate";
  let soilSupportBadge = "Good";
  let climateFitBadge = "Optimal";

  if (isUpland) {
    // Upland Sandy Dune / Loam Soil Logic (Section 8.3)
    if (cropLower.includes("millet") || cropLower.includes("باجرہ")) {
      if (priority.toLowerCase().includes("income")) {
        rotationSequence = ["Pearl Millet", "Groundnuts (Cash)", "Cowpea"];
        rotationExplanation = isUrdu 
          ? "باجرے کے بعد مونگ پھلی نقد آمدنی فراہم کرتی ہے اور زمین میں نائٹروجن شامل کرتی ہے۔"
          : "Following Pearl Millet with Groundnuts generates cash income while naturally replenishing biological nitrogen.";
      } else {
        rotationSequence = ["Pearl Millet", "Cowpea (Niébé)", "Groundnuts"];
        rotationExplanation = isUrdu
          ? "باجرے کے بعد لوبیا یا مونگ پھلی لگائیں (پلانٹنگ ٹریگر 20 ملی میٹر بارش کے بعد)۔ کٹائی کے بعد ڈنٹھل زمین پر رہنے دیں تاکہ ریتلی مٹی ہوا کے کٹاؤ سے محفوظ رہے۔"
          : "Rotate Pearl Millet with nitrogen-fixing Cowpea or Groundnuts once the 20 mm 3-day planting trigger is met. Retain surface stalks as windbreak mulch.";
      }
      residueAdvice = "Rainfall is near zero from Nov to May. Keep millet stalks on the surface and protect native shrubs (Guiera senegalensis) to avoid bare-soil desertification.";
      waterDemandBadge = "Low-Water";
      soilSupportBadge = "High Fixation";
    }
    else if (cropLower.includes("sorghum") || cropLower.includes("جوار")) {
      rotationSequence = ["Sorghum", "Cowpea (Short-Cycle)", "Pearl Millet"];
      rotationExplanation = isUrdu
        ? "جوار کے بعد مختصر دورانیے کا لوبیا لگائیں۔ لوبیا زمین کی نائٹروجن بحال کرتا ہے اور ساہیل کے مختصر مون سون سے فائدہ اٹھاتا ہے۔"
        : "Rotate Sorghum with a short-cycle Cowpea variety, then return to Pearl Millet. Cowpea restores degraded soil nitrogen and matures before rapid drydown.";
      residueAdvice = "Prompt harvest is critical. In 2026, soil wetness fell from 0.44 to 0.17 within five days post-monsoon.";
      waterDemandBadge = "Low";
      soilSupportBadge = "Restorative";
    }
    else if (cropLower.includes("cowpea") || cropLower.includes("groundnut") || cropLower.includes("لوبیا") || cropLower.includes("مونگ پھلی") || cropLower.includes("chickpea") || cropLower.includes("چنا")) {
      rotationSequence = [crop, "Pearl Millet", "Cowpea / Sesame"];
      rotationExplanation = isUrdu
        ? "پھلی دار فصل کے بعد مٹی میں قدرتی نائٹروجن کی بھرپور مقدار موجود ہے۔ اب قبل از وقت باجرہ لگائیں جو بارشوں کے آغاز سے بہترین پیداوار دے گا۔"
        : "The soil holds peak biological nitrogen fixed by legumes. Follow with drought-hardy Pearl Millet sown early to leverage baseline rain onset.";
      residueAdvice = "Avoid back-to-back cereal crops; always alternate with legumes to protect organic carbon levels (currently at ~0.6%).";
      waterDemandBadge = "Low to Mod";
      soilSupportBadge = "Nitrogen Rich";
    }
    else if (cropLower.includes("sesame") || cropLower.includes("تل")) {
      rotationSequence = ["Sesame", "Pearl Millet", "Cowpea"];
      rotationExplanation = isUrdu
        ? "تل کے بعد باجرہ اور پھر پھلی دار فصل لگائیں تاکہ مٹی کی زرخیزی برقرار رہے۔"
        : "Follow low-input cash crop Sesame with stabilizing Pearl Millet, followed by a nitrogen-fixing legume.";
      residueAdvice = "Sesame leaves minimal biomass. Apply crop residue mulch immediately to prevent wind blowing loose topsoil.";
      waterDemandBadge = "Low";
      soilSupportBadge = "Balanced";
    }
    else if (cropLower.includes("wheat") || cropLower.includes("گندم")) {
      rotationSequence = ["Wheat", "Chickpea", "Maize"];
      rotationExplanation = isUrdu
        ? "گندم کے بعد نائٹروجن فکس کرنے والا چنا لگائیں، جس کے بعد مکئی کم کھاد اور کم پانی میں بھی بہترین پیداوار دے گی۔"
        : "Following wheat with nitrogen-fixing chickpea builds soil organic matter, preparing the field for high-efficiency maize.";
      residueAdvice = "Maintain wheat stubble on the soil surface to reduce evaporation under intense pre-onset radiation.";
      waterDemandBadge = "Moderate";
      soilSupportBadge = "Good";
    }
    else if (cropLower.includes("maize") || cropLower.includes("corn") || cropLower.includes("مکئی")) {
      rotationSequence = ["Maize", "Cowpea / Chickpea", "Wheat / Millet"];
      rotationExplanation = isUrdu
        ? "مکئی کے بعد لوبیا یا چنا مٹی میں نائٹروجن بحال کرتا ہے تاکہ اگلی فصل صحت مند رہے۔"
        : "Maize heavily depletes soil nutrients. A legume intercrop breaks pest cycles and restores topsoil fertility.";
      residueAdvice = "Incorporate maize stover as organic mulch to counter Sahel wind erosion.";
      waterDemandBadge = "Moderate";
      soilSupportBadge = "High Fixation";
    }
    else {
      // Fallow or Unknown or General Upland
      rotationSequence = ["Pearl Millet", "Cowpea", "Groundnuts"];
      rotationExplanation = isUrdu
        ? "زمین کی بحالی کے لیے پہلے باجرہ لگائیں اور اگلے سیزن میں نائٹروجن فکس کرنے والا لوبیا یا مونگ پھلی شامل کریں۔"
        : "Plant Pearl Millet first to stabilize the loose sandy soil, then follow with Cowpea to regenerate nitrogen.";
      residueAdvice = "Retain all organic stalks to buffer against the 7-month dry season (over 192 days with zero rain).";
      waterDemandBadge = "Low";
      soilSupportBadge = "Regenerative";
    }
  } else {
    // Valley Bottom (Goulbi / Lowland Fadama) Logic (Section 8.3)
    if (waterAccess.toLowerCase().includes("rain only")) {
      rotationSequence = ["Wet Season Sorghum", "Wet Season Cowpea", "Dry Season Fallow / Rest"];
      rotationExplanation = isUrdu
        ? "صرف بارش پر منحصر وادی میں: جولائی تا ستمبر مون سون میں جوار لگائیں، اور اگلے سال لوبیا۔ خشک موسم میں زمین کو آرام دیں۔"
        : "Rain-fed Valley Bottom: Sorghum in the wet season (Jul–Sep), then Cowpea the next wet season. Rest the field during the dry season.";
      residueAdvice = "Natural monsoonal rains (494–771 mm) support rain-fed cereals without costly groundwater pumping.";
      waterDemandBadge = "Rain-Fed";
      soilSupportBadge = "Salinity Safe";
    } else if (waterAccess.toLowerCase().includes("wet season only")) {
      rotationSequence = ["Wet Season Cereal / Vegetables", "Cowpea", "Dry Season Rest"];
      rotationExplanation = isUrdu
        ? "مون سون میں اناج یا سبزیاں لگائیں اور خشک سیزن میں کھیت کو آرام دیں تاکہ نمکیات جمع نہ ہوں۔"
        : "Cereal or market vegetables in the wet season, followed by a legume. Rest the field in the dry season to prevent salt accumulation.";
      residueAdvice = "Flooding in wet season naturally leaches soil salts down the profile.";
      waterDemandBadge = "Moderate";
      soilSupportBadge = "Balanced";
    } else {
      // Irrigated in Dry Season
      rotationSequence = ["Limited Vegetables (Partial Plot)", "Cowpea", "Rest Period"];
      rotationExplanation = isUrdu
        ? "خشک موسم میں آبپاشی نمکیات اور کلر پیدا کر سکتی ہے۔ صرف محدود رقبے پر ترکاریاں اگائیں اور دالوں کے ساتھ روٹیشن کریں۔"
        : "High water demand and severe salinity risk! Limit vegetables to a portion of the plot, rotate strictly with Cowpea, and maintain open drainage.";
      residueAdvice = "Monitor soil electrical conductivity (EC). Rest blocks alternatively to let natural monsoon rains flush salts.";
      waterDemandBadge = "High-Care";
      soilSupportBadge = "Salinity Alert";
    }
  }

  // -------------------------------------------------------------
  // Dynamic Priority Reordering (Section 8.4)
  // -------------------------------------------------------------
  if (priority.toLowerCase().includes("water")) {
    waterDemandBadge = "Water-Saver";
    rotationExplanation += isUrdu 
      ? " پانی کی بچت کے تحت باجرے اور لوبیا کو ترجیح دی گئی ہے تاکہ خشک سالی میں بھی فصل سلامت رہے۔"
      : " Prioritizing water conservation: Drought-hardy crops maximize water productivity per mm of rain.";
  } else if (priority.toLowerCase().includes("income")) {
    rotationExplanation += isUrdu
      ? " مارکیٹ آمدنی کے تحت نقد آور پھلیوں اور ترکاریوں کو ماحولیاتی تحفظ کے ساتھ متوازن کیا گیا ہے۔"
      : " Cash optimization: High-value oilseeds & pulses are prioritized with safety buffers against drydown.";
  }

  // -------------------------------------------------------------
  // S1, S2, S3 Dynamic Strategy Ranking (Section 8.5)
  // -------------------------------------------------------------
  let rankedStrategies = [...REPLACEMENT_STRATEGIES];

  // Specific crop trigger
  if (cropLower.includes("rice") || cropLower.includes("چاول") || cropLower.includes("paddy")) {
    // S1 first
    rankedStrategies.sort((a, b) => (a.id === "S1" ? -1 : b.id === "S1" ? 1 : 0));
  } else if (cropLower.includes("banana") || cropLower.includes("کیلا")) {
    // S2 first
    rankedStrategies.sort((a, b) => (a.id === "S2" ? -1 : b.id === "S2" ? 1 : 0));
  } else if (cropLower.includes("mango") || cropLower.includes("آم") || isUpland) {
    // S3 first
    rankedStrategies.sort((a, b) => (a.id === "S3" ? -1 : b.id === "S3" ? 1 : 0));
  }

  // Flag weighting
  if (flags.some(f => f.id === "DRY_SEASON_IRRIGATION")) {
    // Boost S1 and S2
    rankedStrategies.sort((a, b) => (a.id === "S1" || a.id === "S2" ? -1 : 1));
  }
  if (flags.some(f => f.id === "RAPID_DRYDOWN" || f.id === "LONG_DRY_WINDOW")) {
    // Boost S3 for agroforestry & windbreaks
    rankedStrategies.sort((a, b) => (a.id === "S3" ? -1 : 1));
  }

  return {
    rotationSequence,
    rotationStr: rotationSequence.join(" → "),
    rotationExplanation,
    residueAdvice,
    badges: {
      waterDemand: waterDemandBadge,
      soilSupport: soilSupportBadge,
      climateFit: climateFitBadge,
      dataSource: "NASA POWER MERRA-2"
    },
    plantingTrigger: grid.thresholds.plantingTrigger,
    wetSoilThreshold: grid.thresholds.wetTopsoil,
    rapidDrydownRule: grid.thresholds.rapidDrydownRule,
    riskFlags: flags,
    replacementStrategies: rankedStrategies,
    location: grid.name,
    gridFullName: grid.fullName,
    researcherCredit: grid.researcher,
    zone,
    waterAccess,
    crop,
    priority,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };
}
