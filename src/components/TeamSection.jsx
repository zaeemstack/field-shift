import React from 'react';
import { Users, Github, Linkedin, Mail, Crown, Code, BookOpen, ExternalLink, Sparkles } from 'lucide-react';

export default function TeamSection({ lang, t }) {
  const isUrdu = lang === 'ur';

  const teamMembers = [
    {
      num: 1,
      name: "Fizza Saeed",
      role: isUrdu ? "ٹیم لیڈ اور پروجیکٹ ڈائریکٹر" : "Team Lead & Project Director",
      roleBadge: isUrdu ? "ٹیم لیڈ" : "Team Lead",
      badgeIcon: Crown,
      photo: "/team/fizza.png",
      photoFallback: "/team/fizza.jpg",
      bio: isUrdu
        ? "ناسا اسپیس ایپس چیلنج کی مجموعی قیادت، ریموٹ سینسنگ اور ایگریکلچرل سسٹم آرکیٹیکچر کی کوآرڈینیشن۔"
        : "Leading NASA Space Apps project execution, bridging satellite remote sensing with farmer-first software architecture.",
      github: "https://github.com/fizzaelle",
      linkedin: "https://www.linkedin.com/in/fizza-saeed-9b0270438/",
      email: "fizzaprof@gmail.com",
      accentColor: "border-purple-500/40 hover:border-purple-400 group-hover:shadow-purple-500/25",
      badgeColor: "bg-purple-500/15 text-purple-300 border-purple-500/40 font-bold",
      numBg: "bg-purple-600 text-white"
    },
    {
      num: 2,
      name: "Muhammad Zaeem",
      role: isUrdu ? "لیڈ ڈویلپر اور سافٹ ویئر آرکیٹیکٹ" : "Lead Developer & System Architect",
      roleBadge: isUrdu ? "لیڈ ڈویلپر" : "Lead Developer",
      badgeIcon: Code,
      photo: "/team/zaeem.png",
      photoFallback: "/team/zaeem.jpg",
      bio: isUrdu
        ? "لیڈ ڈویلپر اور سسٹم انجینئر، کسان دوست انٹرفیس، ساہیل جیو اسپیشل میپس اور اینالیٹکس کے چیف آرکیٹیکٹ۔"
        : "Lead Developer architecting farmer-first interfaces, interactive Sahel GIS maps, and seamless real-time responsive analytics.",
      github: "https://github.com/zaeemstack",
      linkedin: "https://www.linkedin.com/in/muhammad-zaeem-b691012b3/",
      email: "zaeemstack@gmail.com",
      accentColor: "border-emerald-500/40 hover:border-emerald-400 group-hover:shadow-emerald-500/25",
      badgeColor: "bg-emerald-500/15 text-emerald-300 border-emerald-500/40 font-bold",
      numBg: "bg-emerald-600 text-white"
    },
    {
      num: 3,
      name: "Ayisha Sajid",
      role: isUrdu ? "لیڈ ریسرچر اور ایگرونومی اسپیشلسٹ" : "Lead Researcher & Agronomy Specialist",
      roleBadge: isUrdu ? "لیڈ ریسرچر" : "Lead Researcher",
      badgeIcon: BookOpen,
      photo: "/team/ayesha.png",
      photoFallback: "/team/ayesha.jpg",
      bio: isUrdu
        ? "مرادی اور اوگی ریجن کی بارش اور نمی کے اشاریوں کا 2 سالہ تجزیہ اور فصلوں کے متبادل دورانیے کی سائنسی تحقیق۔"
        : "Lead researcher analyzing 2-year NASA POWER MERRA-2 precipitation telemetry, Sahelian root-zone moisture, and rotation models.",
      github: "https://github.com/ayishasajid9-bot",
      linkedin: "https://www.linkedin.com/in/ayisha-sajid-1354b7433",
      email: "ayishasajid9@gmail.com",
      accentColor: "border-cyan-500/40 hover:border-cyan-400 group-hover:shadow-cyan-500/25",
      badgeColor: "bg-cyan-500/15 text-cyan-300 border-cyan-500/40 font-bold",
      numBg: "bg-cyan-600 text-white"
    },
    {
      num: 4,
      name: "Muhammad Saifullah",
      role: isUrdu ? "فل اسٹیک ڈویلپر اور تھری ڈی ویب جی ایل انجینئر" : "Fullstack & 3D WebGL Developer",
      roleBadge: isUrdu ? "ڈویلپر" : "Developer",
      badgeIcon: Code,
      photo: "/team/saifullah.png",
      photoFallback: "/team/saifullah.jpg",
      bio: isUrdu
        ? "تھری ڈی ویب جی ایل اسپیشل رینڈرنگ، ری ایکٹ کمپوننٹس اور ناسا پاور اے پی آئی انٹیگریشن۔"
        : "Developer specialized in 3D Three.js WebGL rendering, React frontend architecture, and NASA POWER telemetry pipelines.",
      github: "https://github.com/MSaifullah-dev",
      linkedin: "https://www.linkedin.com/in/muhammad-saifullah-0b9066443",
      email: "saifullahstack@gmail.com",
      accentColor: "border-blue-500/30 hover:border-blue-400 group-hover:shadow-blue-500/20",
      badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/30",
      numBg: "bg-blue-600 text-white"
    },
    {
      num: 5,
      name: "Abdul Rafay",
      role: isUrdu ? "ناسا ارتھ ڈیٹا محقق اور ایگرونومی اینالسٹ" : "NASA Earth Data Researcher",
      roleBadge: isUrdu ? "ریسرچر" : "Researcher",
      badgeIcon: BookOpen,
      photo: "/team/rafay.png",
      photoFallback: "/team/rafay.jpg",
      bio: isUrdu
        ? "مرادی ریجن (نائجر) کے 2 سالہ MERRA-2 ڈیٹا، خشک سالی کے اشاریوں اور کراپ روٹیشن ماڈل کے مصنف۔"
        : "Researcher evaluating Sahel drought indices, Maradi 4-grid climate variance, and agronomic rotation validation.",
      github: null,
      linkedin: "https://www.linkedin.com/in/rafay-jatt-94775b44b",
      email: "Rafayjatt4212@gmail.com",
      accentColor: "border-yellow-500/30 hover:border-yellow-400 group-hover:shadow-yellow-500/20",
      badgeColor: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
      numBg: "bg-yellow-500 text-black"
    }
  ];

  // Group 1: Leadership (Top Row - 2 Centered Cards)
  const leaders = teamMembers.slice(0, 2);
  // Group 2: Core Engineering & Research (Bottom Row - 3 Centered Cards: Ayisha Sajid, Saifullah, Rafay)
  const coreTeam = teamMembers.slice(2, 5);

  const renderCard = (member) => {
    const BadgeIcon = member.badgeIcon || Users;
    return (
      <div
        key={member.num}
        className={`bg-[#0e1628]/95 hover:bg-[#121c33] border ${member.accentColor} rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between group shadow-xl relative overflow-hidden backdrop-blur-sm`}
      >
        <div>
          {/* Top Badge & Number */}
          <div className="flex items-center justify-between mb-4">
            <span className={`inline-flex items-center gap-1.5 text-[11px] font-mono px-3 py-1 rounded-full border uppercase tracking-wider ${member.badgeColor}`}>
              <BadgeIcon className="w-3.5 h-3.5" />
              <span>{member.roleBadge}</span>
            </span>

            <span className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shadow-md font-mono ${member.numBg}`}>
              {member.num}
            </span>
          </div>

          {/* Crisp, Sharp Cutout Container (Zero Blurriness, 100% Solid Opaque Subject) */}
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden mb-5 bg-[#080d19] border border-white/10 group-hover:border-white/20 transition-all flex items-center justify-center">
            <img
              src={member.photo}
              alt={member.name}
              onError={(e) => {
                if (member.photoFallback && e.target.src !== member.photoFallback) {
                  e.target.src = member.photoFallback;
                }
              }}
              className="w-full h-full object-contain object-bottom relative z-10 transition-transform duration-300 group-hover:scale-105"
            />
            {/* Crisp base fade to seamlessly blend into bottom of container */}
            <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#080d19] to-transparent pointer-events-none z-20" />
          </div>

          {/* Info */}
          <div className="space-y-1.5 mb-5">
            <h3 className="text-xl font-black text-white group-hover:text-yellow-400 transition-colors tracking-tight">
              {member.name}
            </h3>

            <p className="text-xs font-semibold text-emerald-400 font-mono leading-tight">
              {member.role}
            </p>

            <p className="text-xs text-slate-300 leading-relaxed pt-1.5">
              {member.bio}
            </p>
          </div>
        </div>

        {/* Social Contacts & Links */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            {member.github && (
              <a
                href={member.github}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-white/5 hover:bg-slate-700 text-slate-300 hover:text-white transition-all border border-white/5 hover:border-white/20"
                title="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
            )}

            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-white/5 hover:bg-blue-600 text-slate-300 hover:text-white transition-all border border-white/5 hover:border-blue-400/40"
                title="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}

            {member.email && (
              <a
                href={`mailto:${member.email}`}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-yellow-500 hover:text-black text-slate-300 transition-all border border-white/5 hover:border-yellow-400/40"
                title={`Send email to ${member.email}`}
              >
                <Mail className="w-4 h-4" />
              </a>
            )}
          </div>

          <a
            href={member.linkedin || member.github || `mailto:${member.email}`}
            target="_blank"
            rel="noreferrer"
            className="text-slate-400 hover:text-yellow-400 font-mono text-[11px] flex items-center gap-1 transition-colors"
          >
            <span>Connect</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    );
  };

  return (
    <section id="team" className="py-20 px-4 sm:px-8 lg:px-12 bg-[#060a14] border-t border-white/10 relative">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-xs font-mono font-bold tracking-wider mb-3">
            <Users className="w-3.5 h-3.5" />
            <span>{isUrdu ? "ناسا اسپیس ایپس ٹیم" : "NASA SPACE APPS CHALLENGE 2026"}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            {isUrdu ? "ہماری ماہر ٹیم سے ملیں" : "Meet Our Team"}
          </h2>

          <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
            {isUrdu 
              ? "ناسا ارتھ آبزرویشن ڈیٹا، زرعی تحقیق اور جدید ٹیکنالوجی کو یکجا کر کے کسانوں کے لیے آسان فیصلے تیار کرنے والے نوجوان محققین اور ڈویلپرز۔"
              : "Engineers and researchers transforming NASA satellite observations and Sahelian climate telemetry into resilient farm decisions."}
          </p>
        </div>

        {/* Row 1: Leadership (Top 2 Cards Centered) */}
        <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          {leaders.map((member) => renderCard(member))}
        </div>

        {/* Row 2: Core Engineering & Research (Ayisha Sajid, Saifullah, Rafay - 3 Cards Centered) */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {coreTeam.map((member) => renderCard(member))}
        </div>

      </div>
    </section>
  );
}
