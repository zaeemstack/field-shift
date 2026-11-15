/**
 * useNASAData Hook
 * NASA Space Apps Challenge 2026 — Field Shift
 * 
 * Custom hook developed by Muhammad Zaeem (Lead Dev) & Muhammad Saifullah (Dev)
 * for reactive telemetry binding and in-memory MERRA-2 query management.
 */

import { useState, useEffect } from 'react';
import { fetchNASATelemetry } from '../services/nasaPowerService';
import { calculateGDD, calculateSoilWaterDeficit, getGridBoundingBox } from '../utils/agronomyMath';

export function useNASAData(activeGrid) {
  const [telemetry, setTelemetry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cacheHit, setCacheHit] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    async function loadData() {
      try {
        const raw = await fetchNASATelemetry(activeGrid);
        if (!isMounted) return;

        // Augment with custom mathematical agronomy metrics
        const gdd = calculateGDD(raw.temperature, 10.0);
        const swd = calculateSoilWaterDeficit(raw.topsoilWetness);
        const bbox = getGridBoundingBox(activeGrid.lat, activeGrid.lon);

        setTelemetry({
          ...raw,
          gdd,
          soilWaterDeficit: swd,
          boundingBox: bbox,
          lastSync: new Date().toISOString()
        });
        setCacheHit(raw.source?.includes("Model") || false);
        setLoading(false);
      } catch (err) {
        if (!isMounted) return;
        console.error("useNASAData Error:", err);
        setError(err.message);
        setLoading(false);
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, [activeGrid?.id, activeGrid?.lat, activeGrid?.lon]);

  return { telemetry, loading, error, cacheHit };
}

