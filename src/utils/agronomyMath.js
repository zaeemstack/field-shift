/**
 * Field Shift: Agro-Climatic Mathematical & Telemetry Utilities
 * NASA Space Apps Challenge 2026
 * 
 * Authors & Engineers:
 * - Muhammad Zaeem (Lead Developer & System Architect)
 * - Muhammad Saifullah (Developer & WebGL Engineer)
 * - Ayisha Sajid (Lead NASA Earth Data Researcher)
 * - Abdul Rafay (NASA Earth Data Researcher)
 * - Fizza Saeed (Team Lead & Project Director)
 */

/**
 * Calculates Growing Degree Days (GDD) for a crop given daily temperature.
 * GDD = max(((Tmax + Tmin) / 2) - Tbase, 0)
 * For Sahelian Pearl Millet: Tbase = 10.0°C
 * For Sorghum: Tbase = 10.5°C
 * For Cowpea: Tbase = 8.5°C
 */
export function calculateGDD(t2m, tBase = 10.0) {
  if (typeof t2m !== 'number' || isNaN(t2m)) return 0;
  return Math.max(t2m - tBase, 0);
}

/**
 * Calculates Soil Water Deficit (SWD) based on MERRA-2 GWETTOP (Topsoil wetness index 0.0 - 1.0)
 * Field capacity (FC) in sandy Sahelian dunes ~ 0.35
 * Permanent wilting point (PWP) ~ 0.06
 */
export function calculateSoilWaterDeficit(gwettop, fieldCapacity = 0.35, wiltingPoint = 0.06) {
  if (gwettop <= wiltingPoint) {
    return {
      deficitRatio: 1.0,
      status: "Severe Moisture Stress (PWP)",
      riskLevel: "CRITICAL"
    };
  }
  if (gwettop >= fieldCapacity) {
    return {
      deficitRatio: 0.0,
      status: "Field Capacity / Saturated",
      riskLevel: "OPTIMAL"
    };
  }
  const ratio = (fieldCapacity - gwettop) / (fieldCapacity - wiltingPoint);
  return {
    deficitRatio: parseFloat(ratio.toFixed(3)),
    status: ratio > 0.5 ? "Sub-optimal Wetness" : "Adequate Root Moisture",
    riskLevel: ratio > 0.5 ? "WARNING" : "NORMAL"
  };
}

/**
 * Evaluates the Rapid Drydown velocity (Delta GWETTOP / Delta Days)
 * Detects monsoon retreat cutoff for Maradi Grids (Guidan Roumdji, Augie, Tessaoua, Madarounfa).
 */
export function evaluateDrydownVelocity(historicalGWETTOP) {
  if (!Array.isArray(historicalGWETTOP) || historicalGWETTOP.length < 14) {
    return { velocityPerDay: 0, flag: false };
  }
  const recent = historicalGWETTOP.slice(-14);
  const start = recent[0];
  const end = recent[recent.length - 1];
  const drop = start - end;
  const velocityPerDay = drop / 14;

  // Threshold: If soil loses > 0.015 wetness index per day post-monsoon
  return {
    velocityPerDay: parseFloat(velocityPerDay.toFixed(4)),
    isRapidDrydown: velocityPerDay > 0.012,
    advisory: velocityPerDay > 0.012
      ? "Rapid topsoil desiccation detected. Immediate crop mulching or residue retention required."
      : "Moisture decline within manageable transpiration parameters."
  };
}

/**
 * Bilinear spatial interpolation helper for 0.5° x 0.625° MERRA-2 grids.
 */
export function getGridBoundingBox(lat, lon) {
  const latStep = 0.5;
  const lonStep = 0.625;
  const minLat = Math.floor(lat / latStep) * latStep;
  const maxLat = minLat + latStep;
  const minLon = Math.floor(lon / lonStep) * lonStep;
  const maxLon = minLon + lonStep;

  return {
    southWest: { lat: minLat, lon: minLon },
    northEast: { lat: maxLat, lon: maxLon },
    gridResolution: "0.5° lat × 0.625° lon (~50 km × 69 km)",
    interpolationMethod: "Bilinear 4-Point Surface Smoothing"
  };
}

