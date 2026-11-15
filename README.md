# Field Shift: Adapting Farms with NASA Data

> **NASA Space Apps Challenge 2026**  
> **Challenge:** *Field Shift: Adapting Farms with NASA Data*  
> **Study Region:** Maradi Region (Niger) & Trans-Sahelian Agro-Ecological Corridor

---

## 🌍 Executive Summary

**Field Shift (Orbit Fields)** is an advanced, climate-resilient agricultural decision platform engineered for smallholder farmers, agronomists, and policy researchers in arid and semi-arid drylands. Built specifically for the extreme conditions of the **Sahel (Maradi Region, Niger)**, the platform ingests **2 years of continuous NASA Earth observation daily telemetry (January 1, 2025 to November 2026)** to turn remote satellite reanalysis into ground-level crop rotation and irrigation decisions.

The portal combines:
1. **Photorealistic 3D WebGL Earth-to-Field Zoom**: Continuous descent from deep orbit (12,742 km) down through the Terra satellite orbit (705 km) to field-level resolution (3.3 km).
2. **2-Year NASA POWER MERRA-2 Telemetry Archive**: Daily observations of `T2M` (Air Temperature), `GWETTOP` (Topsoil Wetness), `PRECTOTCORR` (Precipitation), and `ALLSKY_SFC_SW_DWN` (Solar Flux).
3. **Automated Agro-Climatic Risk Detection**: Identifies `RAPID_DRYDOWN` (soil desiccation post-monsoon), `WEAK_ONSET` (unreliable early rains), and `HEAT_SPELL` risks.
4. **Field Shift Decision Engine**: Recommends resilient rotation sequences (e.g. `Wheat → Chickpea → Maize` or `Pearl Millet → Cowpea → Groundnuts`), backed by 4 status cards and 3 alternative replacement strategies (S1, S2, S3).
5. **Interactive Maradi Researched Area Map**: Vector GIS mapping highlighting the 4 primary study grids.
6. **Multi-Language Internationalization**: Global language dropdown with Google Translate engine and native English / Urdu / French / Hausa localization.

---

## 👥 The Team

| # | Name | Role | GitHub | LinkedIn | Email |
|---|------|------|--------|----------|-------|
| 1 | **Fizza Saeed** | **Team Lead & Project Director** | [@fizzaelle](https://github.com/fizzaelle) | [LinkedIn](https://www.linkedin.com/in/fizza-saeed-9b0270438/) | `fizzaprof@gmail.com` |
| 2 | **Muhammad Zaeem** | **Lead Developer & System Architect** | [@zaeemstack](https://github.com/zaeemstack) | [LinkedIn](https://www.linkedin.com/in/muhammad-zaeem-b691012b3/) | `zaeemstack@gmail.com` |
| 3 | **Ayisha Sajid** | **Lead NASA Earth Data Researcher** | [@ayishasajid9-bot](https://github.com/ayishasajid9-bot) | [LinkedIn](https://www.linkedin.com/in/ayisha-sajid-1354b7433) | `ayishasajid9@gmail.com` |
| 4 | **Muhammad Saifullah** | **Fullstack & 3D WebGL Developer** | [@MSaifullah-dev](https://github.com/MSaifullah-dev) | [LinkedIn](https://www.linkedin.com/in/muhammad-saifullah-0b9066443) | `saifullahstack@gmail.com` |
| 5 | **Abdul Rafay** | **NASA Earth Data Researcher** | — | [LinkedIn](https://www.linkedin.com/in/rafay-jatt-94775b44b) | `Rafayjatt4212@gmail.com` |

---

## 📍 4 Primary Study Grids (Maradi Region & Sahel Corridor)

Our agronomic research directly models 4 distinct micro-climatic zones across **672+ daily observation points** from **Jan 1, 2025 to Nov 2026**:

### 1. Guidan Roumdji Department (Maradi, Niger — Grid 1)
* **Coordinates:** `13.6570° N, 6.6957° E` | Elevation: `371.85 m`
* **Agro-Ecological Zone:** Sahelo-Sudan Upland Dune & Goulbi Valley
* **Cumulative Rainfall (2-Yr):** `1,198.2 mm` (2025: 561.3 mm, 2026: 637.0 mm)
* **Mean Temperature:** `28.85 °C` (Peak: 35.89 °C on May 5, 2026)
* **Zero-Rain Days:** 431 days (64% of observation period)
* **Risk Flags:** `RAPID_DRYDOWN` (GWETTOP drops to 0.08 within 30 days of retreat), `WEAK_ONSET` (Apr–May rain < 10 mm).

### 2. Augie Local Government Area (Kebbi/Sahel Border — Grid 2)
* **Coordinates:** `12.8903° N, 4.5996° E` | Elevation: `247.31 m`
* **Agro-Ecological Zone:** Upland Sandy Loam & Lowland Fadama Clay
* **Cumulative Rainfall (2-Yr):** `1,775.8 mm` (2025: 836.1 mm, 2026: 939.7 mm)
* **Mean Topsoil Wetness:** `0.301` (Peak: 0.77 on Aug 31, 2025)
* **Risk Flags:** `RAPID_DRYDOWN` (Oct drydown from 0.70 to 0.11), `LONG_DRY_WINDOW` (394 dry days).

### 3. Tessaoua Department (Maradi, Niger — Grid 3)
* **Coordinates:** `13.7569° N, 7.9881° E` | Elevation: `434.04 m`
* **Agro-Ecological Zone:** Sahelian Arid Dryland & Dune Complex
* **Cumulative Rainfall:** `674.8 mm` (Extreme drought-prone sandy dune complex)
* **Topsoil Wetness:** Stays between `0.04 - 0.08` for 7+ consecutive months per year.

### 4. Madarounfa Department (Maradi, Niger — Grid 4)
* **Coordinates:** `13.3050° N, 7.1619° E` | Elevation: `389.12 m`
* **Agro-Ecological Zone:** Goulbi de Maradi River Basin & Transitional Sahel
* **Characteristics:** Micro-irrigation potential along alluvial riverbeds, with high seasonal flash-runoff variance.

---

## 🛠️ System Architecture & Engineering

```
orbit-fields/
├── src/
│   ├── components/
│   │   ├── RealisticEarthHero.jsx       # 60fps Three.js scroll-driven camera zoom
│   │   ├── GeospatialDataSection.jsx    # MERRA-2 Telemetry cards & monthly breakdown
│   │   ├── FieldAnalysisEngine.jsx      # Farmer input & crop rotation engine
│   │   ├── MaradiResearchMap.jsx        # SVG GIS interactive radar map
│   │   ├── LiveBlogsSection.jsx         # Field telemetry bulletins & NDVI reports
│   │   ├── FaqSection.jsx               # Searchable FAQ
│   │   ├── TeamSection.jsx              # Team presentation (centered 2+3 layout)
│   │   ├── Footer.jsx                   # Section 13 citations & official disclaimer
│   │   └── Navbar.jsx                   # Multi-language internationalization
│   ├── services/
│   │   ├── nasaPowerService.js          # NASA POWER API query & fallback cache
│   │   └── recommendationEngine.js      # Climate-resilient rotation decision rules
│   ├── utils/
│   │   └── agronomyMath.js              # GDD, Soil Water Deficit, Bounding Box math
│   ├── hooks/
│   │   └── useNASAData.js               # Reactive custom hook for MERRA-2 data
│   ├── data/
│   │   ├── maradiData.js                # 2-Year NASA POWER daily records (4 Grids)
│   │   ├── blogData.js                  # Agro-intelligence publications
│   │   └── faqData.js                   # Dryland farming documentation
│   └── translations.js                  # Bilingual translation dictionaries
```

### Key Technical Implementations:
* **Custom React Hooks (`useNASAData`)**: Decouples UI from telemetry fetching with in-memory caching and AbortController lifecycle safety.
* **Mathematical Utilities (`agronomyMath.js`)**:
  * Growing Degree Days (GDD): $\max\left(\frac{T_{\max} + T_{\min}}{2} - T_{\text{base}}, 0\right)$
  * Soil Water Deficit (SWD): $\frac{\theta_{FC} - \theta}{\theta_{FC} - \theta_{PWP}}$
  * Bilinear spatial interpolation over native $0.5^\circ \times 0.625^\circ$ MERRA-2 cells.
* **Zero-Lag Three.js Canvas**: Mounted once on lifecycle mount; camera altitude and satellite trajectory lerp on `requestAnimationFrame` using immutable refs rather than React state triggers.

---

## 🌾 Strategic Replacement Guidelines (Section 8.5)

| ID | Vulnerable Baseline Crop | Resilient Alternative Sequence | Climate Justification |
|----|--------------------------|--------------------------------|-----------------------|
| **S1** | Flood-Irrigated Rice (Fadama) | **Sorghum / Maize → Cowpea → Fallow / Mulch** | Jul–Sep rain (494–771 mm) carries rain-fed cereal/legume without wasteful dry-season flood pumping. Saves 60% water. |
| **S2** | Year-Round High-Water Crops (Banana) | **Sweet Potato / Groundnuts → Pearl Millet → Sesame** | Respects the 3-month rain window instead of fighting the 7-month dry season (where rain is 0.36–4.4 mm). |
| **S3** | Vulnerable Sand Orchards (Mango) | **Native Agroforestry (*Guiera senegalensis*) + Intercropped Millet & Cowpea** | Empirical AFR100 trials in Guidan Roumdji show millet yield increases from 547 kg/ha to 937 kg/ha near native shrubs. |

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

## ⚖️ Official Extension Office Disclaimer

> **IMPORTANT NOTICE:**  
> All crop rotation sequences, water demand metrics, and agro-climatic advisories generated by Field Shift are derived from **2-year remote satellite telemetry (NASA POWER Daily MERRA-2 Reanalysis, January 1, 2025 to November 2026)**.  
> Satellite observations provide regional macro-indicators and cannot account for local pest outbreaks, proprietary seed varieties, or sub-plot soil anomalies. **Farmers and field practitioners MUST validate all recommendations with their local agricultural extension office (Direction Départementale de l'Agriculture) or certified agronomist before sowing.**

---

## 🚀 Getting Started

### Prerequisites
* Node.js 18+ (tested on Node v20 and v24)
* npm or pnpm

### Installation
```bash
# Clone the repository
git clone https://github.com/zaeemstack/NASA.git
cd NASA

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

© 2026 **NASA Space Apps Challenge** • Field Shift (Orbit Fields Team). Developed with pride by Muhammad Zaeem, Muhammad Saifullah, Ayisha Sajid, Abdul Rafay, and Fizza Saeed.

