import React, { useState } from 'react';
import Navbar from './components/Navbar';
import RealisticEarthHero from './components/RealisticEarthHero';
import GeospatialDataSection from './components/GeospatialDataSection';
import FieldAnalysisEngine from './components/FieldAnalysisEngine';
import MaradiResearchMap from './components/MaradiResearchMap';
import FaqSection from './components/FaqSection';
import TeamSection from './components/TeamSection';
import Footer from './components/Footer';
import { translations } from './translations';
import { MARADI_GRIDS } from './data/maradiData';

export default function App() {
  const [lang, setLang] = useState('en');
  const [activeGrid, setActiveGrid] = useState(MARADI_GRIDS[0]); // Default: 1. Augie Region
  const t = translations[lang] || translations['en'];

  const handleAnalyzeClick = () => {
    const el = document.getElementById('analyze');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectGrid = (grid) => {
    setActiveGrid(grid);
  };

  return (
    <div className={`min-h-screen bg-[#080d19] text-white ${lang === 'ur' ? 'font-urdu' : ''}`}>
      {/* Navbar with Multi-Language Selector Dropdown */}
      <Navbar lang={lang} setLang={setLang} t={t} />

      <main>
        {/* 1. Realistic 3D Earth to Sahel Field Zoom Hero */}
        <RealisticEarthHero 
          lang={lang} 
          t={t} 
          onAnalyzeClick={handleAnalyzeClick}
          activeGrid={activeGrid} 
        />

        {/* 2. Geospatial Satellite Telemetry & Agro-Metrics (4 Grids) */}
        <GeospatialDataSection 
          lang={lang} 
          t={t} 
          activeGrid={activeGrid}
          onSelectGrid={handleSelectGrid}
        />

        {/* 3. Field Shift: Farm Input & Crop Rotation Recommendation Engine */}
        <FieldAnalysisEngine 
          lang={lang} 
          t={t} 
          activeGrid={activeGrid} 
        />

        {/* 4. Researched Area Map: 4 Target Grids (Augie, Guidan, Madarounfa, Tessaoua) */}
        <MaradiResearchMap 
          lang={lang} 
          t={t} 
          onSelectGrid={handleSelectGrid} 
        />

        {/* 5. Frequently Asked Questions */}
        <FaqSection lang={lang} t={t} />

        {/* 6. Space Apps Challenge Team Section */}
        <TeamSection lang={lang} t={t} />
      </main>

      {/* 7. Footer (With Sources, Data Specs, and Mandatory Extension Office Disclaimer) */}
      <Footer lang={lang} t={t} />
    </div>
  );
}
