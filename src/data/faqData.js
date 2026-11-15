export const faqData = {
  en: [
    {
      q: "Which NASA datasets and timeframes does this tool use?",
      a: "This tool analyzes a continuous 2-year archive (January 1, 2025 through November 2026) from NASA POWER native resolution MERRA-2 daily data. Parameters include T2M (Daily mean 2m air temperature), GWETTOP (MERRA-2 surface soil wetness fraction 0-1), and PRECTOTCORR (Corrected total precipitation mm/day)."
    },
    {
      q: "Why were the 4 grids in the Maradi Region selected?",
      a: "The study focuses on the semi-arid Sahelo-Sudan agricultural belt across Guidan Roumdji (13.657°N, 6.6957°E), Augie LGA (12.8903°N, 4.5996°E), Tessaoua (13.7569°N, 7.9881°E), and Madarounfa (13.305°N, 7.1619°E). These 4 sites represent diverse Sahelian conditions—from sandy upland dunes with under 0.6% organic carbon to seasonal Goulbi/Fadama valley floodplains."
    },
    {
      q: "What do the RAPID_DRYDOWN and WEAK_ONSET risk flags mean?",
      a: "RAPID_DRYDOWN triggers when topsoil wetness collapses below 0.15 within 30 days after the monsoon ends, alerting farmers to maintain surface mulch and harvest promptly. WEAK_ONSET flags unreliable early rains (<30 mm in April–May), warning farmers against premature sowing that leads to seed loss."
    },
    {
      q: "Why does the tool recommend replacing Rice, Banana, and Mango?",
      a: "NASA satellite telemetry reveals a severe 7-month dry season with near-zero rain from November to May. Irrigated rice, banana, and upland mango demand excessive year-round water, depleting water tables and risking soil salinization in valley basins. The tool proposes locally adapted cereal-legume rotations (Millet, Sorghum, Cowpea, Groundnuts, Sesame) and native agroforestry."
    },
    {
      q: "How does intercropping with native trees increase millet yields?",
      a: "Empirical studies in Guidan Roumdji (AFR100) demonstrate that pearl millet planted near native shrubs (like Guiera senegalensis) and trees yields 937 kg/ha compared to 547 kg/ha in bare fields, due to hydraulic redistribution and wind erosion shielding."
    },
    {
      q: "Why must farmers confirm recommendations with a local extension office?",
      a: "The NASA MERRA-2 grid resolution is 0.5° × 0.625° (regional average). While it accurately models macro-climatic stressors, micro-topography, exact soil salinity, and seed availability vary by village. Farmers should verify advice with their local agricultural extension office."
    }
  ],
  ur: [
    {
      q: "یہ ٹول ناسا کے کون سے ڈیٹا سیٹس اور کون سا دورانیہ استعمال کرتا ہے؟",
      a: "یہ سسٹم 2 سالہ مکمل ریکارڈ (1 جنوری 2025 تا نومبر 2026) استعمال کرتا ہے جو ناسا پاور (MERRA-2 ڈیلی ماڈل) سے لیا گیا ہے۔ اس میں ہوا کا درجہ حرارت (T2M)، مٹی کی اوپری نمی (GWETTOP)، اور روزانہ بارش کی درست پیمائش (PRECTOTCORR) شامل ہیں۔"
    },
    {
      q: "مرادی ریجن کے 4 گرڈز (Guidan, Augie, Tessaoua, Madarounfa) کیوں منتخب کیے گئے؟",
      a: "یہ چاروں مقامات ساہیل کے خشک زرعی بیلٹ کی نمائندگی کرتے ہیں: گائیڈان رومجی، اوگی (کبی)، تیساوا، اور مادارونفا۔ ان علاقوں میں مٹی میں صرف 0.6% نامیاتی مادہ ہے اور سال کے 7 ماہ شدید خشکی رہتی ہے، جس کی وجہ سے ناسا ڈیٹا کا استعمال ناگزیر ہے۔"
    },
    {
      q: "ریپڈ ڈرائی ڈاؤن (RAPID_DRYDOWN) اور ویک آن سیٹ (WEAK_ONSET) وارننگز کیا ہیں؟",
      a: "ریپڈ ڈرائی ڈاؤن اس وقت وارننگ دیتا ہے جب مون سون کے فوری بعد مٹی کی نمی تیزی سے 0.15 سے نیچے گر جائے، جس سے فصل کی باقیات زمین پر رکھنے کی ہدایت ملتی ہے۔ ویک آن سیٹ اپریل اور مئی کی غیر معتبر بارشوں پر کسان کو قبل از وقت بوائی سے روکتا ہے۔"
    },
    {
      q: "چاول، کیلا اور آم کی جگہ متبادل فصلوں کی سفارش کیوں کی گئی ہے؟",
      a: "ناسا سیٹلائٹ کے مطابق نومبر سے مئی تک بارش صفر رہتی ہے۔ چاول اور کیلے جیسی فصلیں بے تحاشہ زیرِ زمین پانی ضائع کرتی ہیں اور زمین میں نمکیات بڑھاتی ہیں۔ اس لیے مقامی باجرہ، جوار، لوبیا اور مونگ پھلی کی موسمی گردش تجویز کی گئی ہے۔"
    },
    {
      q: "مقامی درختوں کے ساتھ باجرے کی پیداوار میں کیسے اضافہ ہوتا ہے؟",
      a: "گائیڈان رومجی کے زمینی سروے (AFR100) کے مطابق عام کھیت میں باجرے کی پیداوار 547 کلو فی ہیکٹر تھی جبکہ مقامی درختوں اور جھاڑیوں کے قریب باجرے کی پیداوار بڑھ کر 937 کلو فی ہیکٹر ریکارڈ کی گئی۔"
    },
    {
      q: "مقامی زرعی دفتر (Extension Office) سے تصدیق کیوں ضروری ہے؟",
      a: "ناسا کا سیٹلائٹ ڈیٹا علاقائی سطح (0.5 ڈگری گرڈ) کا جائزہ پیش کرتا ہے۔ ہر کھیت کی مٹی اور بیج کی مقامی قسمیں مختلف ہو سکتی ہیں، لہٰذا حتمی فیصلے سے قبل مقامی زرعی ماہرین سے مشاورت ضروری ہے۔"
    }
  ]
};
