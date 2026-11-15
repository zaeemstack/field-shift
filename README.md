# Field Shift: Adapting Farms with NASA Data

> **NASA Space Apps Challenge 2026**  
> **Challenge Track:** *Field Shift: Adapting Farms with NASA Data*  
> **Target Agro-Ecological Corridor:** Maradi Region (Niger) & Augie LGA (Kebbi State, Nigeria)  
> **Research Reports Prepared By:** **Ayisha Sajid** (Guidan Roumdji & Augie LGA) & **Abdul Rafay** (Madarounfa & Tessaoua)

---

## 🌍 Executive Summary

**Field Shift (Orbit Fields)** is an advanced, climate-resilient agricultural decision-support platform engineered for smallholder farmers, agronomists, and extension policy makers in arid and semi-arid drylands. Built specifically to tackle the extreme climatic stressors of the **Sahel (Maradi Region, Niger & northern Nigeria)**, the platform ingests **2 years of continuous NASA Earth observation daily telemetry (January 1, 2025 to November 2026)** to convert remote satellite observations into operational, field-level crop rotation and water-conservation roadmaps.

### The Four Required Inputs Combined:
1. **NASA Earth Observations**: Daily MERRA-2 assimilation archive (`T2M`, `GWETTOP`, `PRECTOTCORR`).
2. **Local Soil Information**: Sandy dune soils (*Jigawa* uplands) and hydromorphic fossil valleys (*Goulbi / Fadama* alluvial loams).
3. **Crop Characteristics**: Pearl millet, sorghum, cowpea (*niébé*), groundnut, sesame, valley vegetables, and high-water vulnerable crops (rice, banana, mango).
4. **Farmer Priorities**: Soil health (nitrogen & cover), Water saving (drought hardiness), Income (cash crop optimization with risk buffering).

---

## 👥 The Team

| # | Name | Role | GitHub | LinkedIn | Email |
|---|------|------|--------|----------|-------|
| 1 | **Fizza Saeed** | **Team Lead & Project Director** | [@fizzaelle](https://github.com/fizzaelle) | [LinkedIn](https://www.linkedin.com/in/fizza-saeed-9b0270438/) | `fizzaprof@gmail.com` |
| 2 | **Muhammad Zaeem** | **Lead Developer & System Architect** | [@zaeemstack](https://github.com/zaeemstack) | [LinkedIn](https://www.linkedin.com/in/muhammad-zaeem-b691012b3/) | `zaeemstack@gmail.com` |
| 3 | **Ayisha Sajid** | **Lead NASA Earth Data Researcher & Agronomist** | [@ayishasajid9-bot](https://github.com/ayishasajid9-bot) | [LinkedIn](https://www.linkedin.com/in/ayisha-sajid-1354b7433) | `ayishasajid9@gmail.com` |
| 4 | **Muhammad Saifullah** | **Fullstack & 3D WebGL Developer** | [@MSaifullah-dev](https://github.com/MSaifullah-dev) | [LinkedIn](https://www.linkedin.com/in/muhammad-saifullah-0b9066443) | `saifullahstack@gmail.com` |
| 5 | **Abdul Rafay** | **NASA Earth Data Researcher** | — | [LinkedIn](https://www.linkedin.com/in/rafay-jatt-94775b44b) | `Rafayjatt4212@gmail.com` |

---

## 📊 Comprehensive 4-Grid NASA POWER Telemetry & Reference Benchmarks

Data sourced from **NASA POWER Daily MERRA-2 assimilation (0.5° × 0.625° native resolution)** covering Jan 1, 2025 to Nov 2026. Missing values (`-999`) strictly filtered out before calculation.

### 1. Guidan Roumdji Department (Maradi, Niger — Grid 1)
* **Researcher:** Prepared by Ayisha Sajid (Nov 7, 2026)
* **Coordinates:** `13.6570° N, 6.6957° E` | Elevation: `371.85 m` | **Valid Days:** 673 (Jan 1, 2025 – Nov 4, 2026)
* **Soil Profile:** Upland sandy dune soils (*Jigawa*, rain-fed millet/sorghum/legumes) & *Goulbi de Maradi* fossil valley basin.
* **Core Insight:** Rain falls on roughly 3 months/year. Topsoil wetness ≥ 0.30 on only 100 days in 2025 and 90 days in 2026. In 2026, wetness collapsed from 0.44 on Sep 30 to 0.17 on Oct 5 and 0.08 by Nov 4.
* **Tunable Thresholds:**
  * Wet topsoil threshold calibrated to **`0.40`** (Augie used 0.60, but Guidan never exceeded 0.57).
  * Rapid drydown flag: **`GWETTOP ≤ 0.15` at 30 days after last rain ≥ 1 mm**.
  * Planting trigger: **First day when 3-day rainfall totals ≥ 20.0 mm** (Met on Jun 29, 2025 and Jun 9, 2026).
* **Reference Unit-Test Metrics:**
  * Cumulative Rainfall: `1,198.2 mm` (2025: 561.3 mm, 2026: 637.0 mm)
  * Mean GWETTOP: `0.192` (Min: 0.04 on May 10, 2025 / 0.03 on May 14, 2026)
  * Mean T2M: `28.85 °C` (Peak: 35.84 °C on Apr 30, 2025 / 35.89 °C on May 5, 2026)
  * Zero-Rain Days: 431 days (64% of total record)
  * Longest Dry Spell: **192 consecutive days** with 0.0 mm rain (Oct 12, 2025 – Apr 21, 2026)

### 2. Augie Local Government Area (Kebbi State, Nigeria — Grid 2)
* **Researcher:** Prepared by Ayisha Sajid (Nov 6, 2026)
* **Coordinates:** `12.8903° N, 4.5996° E` | Elevation: `247.31 m` | **Valid Days:** 672 (Jan 1, 2025 – Nov 3, 2026)
* **Soil Profile:** Upland sandy loam (71.5% sand, 0.6% organic carbon) & Lowland *Fadama* clay loam.
* **Core Insight:** In 2026, wetness dropped from 0.70 on Sep 30 to 0.28 on Oct 5 and 0.11 by Oct 30.
* **Reference Unit-Test Metrics:**
  * Cumulative Rainfall: `1,775.8 mm` (2025: 836.1 mm, 2026: 939.7 mm)
  * Mean GWETTOP: `0.301` (Peak: 0.77 on Aug 31, 2025 / 0.73 on Aug 16, 2026)
  * Mean T2M: `29.05 °C` (Peak: 36.20 °C on May 27, 2025 / 36.69 °C on May 6, 2026)
  * Zero-Rain Days: 394 days (59% of record)
  * Apr–May Rainfall: 45.2 mm (2025), 23.4 mm (2026 — triggered `WEAK_ONSET`)

### 3. Madarounfa Local Government Area (Maradi, Niger — Grid 3)
* **Researcher:** Prepared by Abdul Rafay (Roll No: BS-PHY-M25-1)
* **Coordinates:** `13.3050° N, 7.1619° E` | Elevation: `371.85 m`
* **Soil Profile:** Upland Sandy Loam (porous, low organic carbon, high wind erosion risk) & Lowland *Fadama* / Lake Basin alluvium.
* **Reference Metrics:**
  * 2025 Rainfall: `836.1 mm` | 2026 Rainfall (to Nov 3): `939.7 mm`
  * Mean GWETTOP: `0.313` (2025) / `0.287` (2026)
  * Mean T2M: `28.42 °C` (2025) / `29.79 °C` (2026)
  * Rapid Drydown: GWETTOP collapses from 0.66 down to 0.16 within 60 days post-peak.

### 4. Tessaoua Local Government Area (Maradi, Niger — Grid 4)
* **Researcher:** Prepared by Abdul Rafay (Roll No: BS-PHY-M25-1)
* **Coordinates:** `13.7569° N, 7.9881° E` | Elevation: `434.04 m`
* **Soil Profile:** Upland Sandy Loam (topsoil wetness 0.04–0.08 for over 7 months/year) & Lowland depression basins.
* **Reference Metrics:**
  * 2025 Rainfall: `454.5 mm` | 2026 Rainfall (to Sep 1): `220.3 mm`
  * Mean GWETTOP: `0.190` (2025) / `0.120` (2026)
  * Mean T2M: `27.92 °C` (2025) / `29.62 °C` (2026)
  * Days with GWETTOP ≤ 0.15: 209 days (2025) / 181 days (2026)
  * April–May Rainfall: Only 0.3 mm (2025) and 6.5 mm (2026)

---

## 🗓️ 6 Seasonal Phases Driving the Tool Calendar Logic (Section 7)

| Phase | Months | NASA Data Evidence | Tool Automated Behavior |
|-------|--------|--------------------|-------------------------|
| **1. Cool dry** | Nov to Feb | 0.0 mm rain, monthly mean 22–26 °C, wetness falls from 0.14 to 0.06. | Soil cover and erosion alerts; dry-season water/salinity warnings for valley plots. |
| **2. Hot dry** | Mar to Apr | 0 to 0.4 mm rain, mean 29–33 °C, wetness 0.04–0.06. | Highest wind erosion exposure. Strict advisory: **DO NOT recommend sowing.** |
| **3. Pre-onset heat** | May | Hottest month (34.05–34.3 °C), 1.6–45 mm erratic rain, wetness 0.06. | Warn that sowing is a gamble; detect and monitor 7+ day heat spells. |
| **4. Onset** | Jun | 33.5–178 mm rain, 31–33 °C, wetness 0.12–0.33. | Planting window opens **only when 3-day rainfall totals ≥ 20 mm**. |
| **5. Peak rains** | Jul to Sep | 13–29 rainy days/month, 26–30 °C, wetness 0.34–0.68, ~494–901 mm. | Heavy rain alerts; main crop growth period; flushing window for valley salts. |
| **6. Retreat** | Oct | 4.9–31.1 mm rain, wetness drops sharply (e.g. 0.44 to 0.17 in 5 days). | Harvest timing alerts and rapid drydown warning; mandate surface stover mulch. |

---

## 🌾 Strategic Replacement Guidelines (Section 8.5)

The platform evaluates the user's current crop and outputs three alternative rotation strategies:

| Strategy | Replaces | Data Evidence from NASA Telemetry | Alternative Sequence (All Locally Grown) | Soil & Water Impact |
|----------|----------|-----------------------------------|------------------------------------------|---------------------|
| **S1: Rain-fed Valley Cereal and Legume** | Irrigated Rice (*Fadama*) | Jul–Sep rain is 494–771 mm, wetness ≥ 0.30 on only 90–100 days. Flooded rice requires unsustainable diesel pumping. | **Year 1 Wet: Sorghum or Maize → Year 2 Wet: Cowpea → Dry: Fallow / Mulch** | Eliminates flood pumping; reduces salinity & sodicity build-up; cowpea fixes organic nitrogen. Saves ~60% water. |
| **S2: Seasonal Legumes, Cereal and Oilseed** | Banana Orchards | Banana requires year-round moisture. Nov–Apr rain totaled 0.36–4.4 mm with wetness at 0.03–0.14 under 31–34 °C heat. | **Year 1: Groundnut or Sweet Potato → Year 2: Pearl Millet → Year 3: Sesame or Cowpea** | Follows the 3-month rainy season instead of fighting the 7-month dry season. Stops regional water-table collapse. |
| **S3: Native Shrub-and-Crop Agroforestry** | Mango Orchards on Sand | Upland dune soil is 71.5% sand with 0.6% organic carbon; 192 consecutive dry days run from Oct to Apr. | **Native Shrub Rows (*Guiera senegalensis*) / Moringa + Intercropped Millet (Yr A) & Cowpea/Groundnut (Yr B)** | Shrubs stop wind erosion; hydraulic lift by deep roots redistributes water. **AFR100 trials in Guidan Roumdji show millet yield jumps from 547 to 937 kg/ha.** |

---

## 🛠️ System Architecture & Engineering

```
orbit-fields/
├── src/
│   ├── components/
│   │   ├── RealisticEarthHero.jsx       # 60fps Three.js scroll-driven camera zoom
│   │   ├── GeospatialDataSection.jsx    # MERRA-2 Telemetry cards & monthly breakdown
│   │   ├── FieldAnalysisEngine.jsx      # Farmer input & Section 8 crop rotation engine
│   │   ├── MaradiResearchMap.jsx        # SVG GIS interactive radar map with 3 tabs
│   │   ├── LiveBlogsSection.jsx         # Field telemetry bulletins & NDVI reports
│   │   ├── FaqSection.jsx               # Searchable dryland farming FAQ
│   │   ├── TeamSection.jsx              # Team presentation (centered 2+3 layout)
│   │   ├── Footer.jsx                   # Section 13 citations & official disclaimer
│   │   └── Navbar.jsx                   # 9-Language Google Translate dropdown
│   ├── services/
│   │   ├── nasaPowerService.js          # NASA POWER API query & fallback cache
│   │   └── recommendationEngine.js      # Section 8 climate-resilient rotation engine
│   ├── utils/
│   │   └── agronomyMath.js              # GDD, Soil Water Deficit, Bounding Box math
│   ├── hooks/
│   │   └── useNASAData.js               # Reactive custom hook for MERRA-2 data
│   ├── data/
│   │   ├── maradiData.js                # Full 2-Year NASA POWER daily records (4 Grids)
│   │   ├── blogData.js                  # Agro-intelligence publications
│   │   └── faqData.js                   # Dryland farming documentation
│   └── translations.js                  # Bilingual translation dictionaries
```

---

## 📚 Section 13 Research Citations

1. **Global Yield Gap Atlas (GYGA):** Niger Crop Overview — Pearl millet, sorghum, and cowpea rain-fed intercropping practices.
2. **AFR100:** Agroforestry trial in Guidan Roumdji department (*Guiera senegalensis* raising millet yield from 547 to 937 kg/ha).
3. **MDPI Agriculture:** Adoption survey in Maradi & Guidan Roumdji on cowpea, sorghum, and groundnut rotations.
4. **FAO Niger:** Dosso and Maradi sustainable dryland project (groundnut, cowpea, sesame, millet).
5. **CARE Hamzari:** Learning brief on Guidan Roumdji soil degradation, sandy dune erosion, and community mitigation.
6. **CIRAD:** Article on Maradi Jigawa dune soils and Goulbi de Maradi river valley alluvial soils.
7. **Cogent Food & Agriculture (2020):** Sahelo-Sudan zone valley market gardening and water table variance.
8. **Agroforestry Research Network:** Hydraulic lift and redistribution by *Guiera senegalensis* shrubs in Sahelian millet fields.

---

## ⚖️ Official Extension Office Disclaimer & Limits (Section 11)

> **IMPORTANT NOTICE:**  
> All crop rotation sequences, water demand metrics, and agro-climatic advisories generated by Field Shift are derived from **2-year remote satellite telemetry (NASA POWER Daily MERRA-2 Reanalysis, January 1, 2025 to November 2026)**.  
> * Daily mean temperature (`T2M`), not maximum, was used in the current dataset.  
> * Coarse MERRA-2 resolution (0.5° × 0.625°) describes regional grid areas, not individual sub-plots.  
> * Soil salinity in lowlands is inferred from water-budgeting patterns, not direct sensor measurement.  
> **Farmers and field practitioners MUST validate all recommendations with their local agricultural extension office (*Direction Départementale de l'Agriculture*) or certified agronomist before sowing.**

---

## 🚀 Getting Started

### Prerequisites
* Node.js 18+ (tested on Node v20 and v22)
* npm or pnpm

### Installation
```bash
# Clone the repository
git clone https://github.com/zaeemstack/field-shift.git
cd field-shift

# Install dependencies
npm install

# Start local development server
npm run dev
```

Open `http://localhost:5173` in your browser.

### Production Build
```bash
npm run build
npm run preview
```

---

© 2026 **NASA Space Apps Challenge** • Field Shift (Orbit Fields Team). Developed by Muhammad Zaeem, Muhammad Saifullah, Ayisha Sajid, Abdul Rafay, and Fizza Saeed.
