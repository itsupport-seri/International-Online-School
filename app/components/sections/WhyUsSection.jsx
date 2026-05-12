"use client";
import { useEffect, useRef, useState } from "react";
import { Target, Sparkles, Globe, Users, BookOpen, ChevronRight, ArrowRight } from "lucide-react";

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
      },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

const cards = [
  {
    icon: Target,
    title: "Live Group Classes",
    desc: "Real instruction, real-time feedback, and continuous support from certified teachers every single day.",
    stat: "Daily",
    statLabel: "Live Sessions",
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-100",
    hoverBorder: "hover:border-blue-300",
    gradFrom: "from-blue-500",
    gradTo: "to-blue-700",
    pillBg: "bg-blue-50",
    pillText: "text-blue-700",
    pillBorder: "border-blue-100",
    glowColor: "rgba(59,130,246,0.12)",
  },
  {
    icon: Sparkles,
    title: "International Teachers",
    desc: "600+ trained teachers supporting multilingual learners across 40+ languages with proven confidence.",
    stat: "600+",
    statLabel: "Expert Teachers",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
    hoverBorder: "hover:border-emerald-300",
    gradFrom: "from-emerald-500",
    gradTo: "to-teal-600",
    pillBg: "bg-emerald-50",
    pillText: "text-emerald-700",
    pillBorder: "border-emerald-100",
    glowColor: "rgba(16,185,129,0.12)",
  },
  {
    icon: Globe,
    title: "International Curriculum",
    desc: "KG–12 curriculum offering 500+ courses built to global standards, recognized worldwide.",
    stat: "500+",
    statLabel: "Courses",
    color: "text-orange-500",
    bg: "bg-orange-50",
    border: "border-orange-100",
    hoverBorder: "hover:border-orange-300",
    gradFrom: "from-orange-400",
    gradTo: "to-rose-500",
    pillBg: "bg-orange-50",
    pillText: "text-orange-700",
    pillBorder: "border-orange-100",
    glowColor: "rgba(249,115,22,0.12)",
  },
  {
    icon: Users,
    title: "Personalized Learning",
    desc: "Flexible schedules and tailored pacing — choose exactly what works best for your child.",
    stat: "190+",
    statLabel: "Countries",
    color: "text-violet-600",
    bg: "bg-violet-50",
    border: "border-violet-100",
    hoverBorder: "hover:border-violet-300",
    gradFrom: "from-violet-500",
    gradTo: "to-purple-700",
    pillBg: "bg-violet-50",
    pillText: "text-violet-700",
    pillBorder: "border-violet-100",
    glowColor: "rgba(139,92,246,0.12)",
  },
];

function FeatureCard({ card, index, visible }) {
  const { icon: Icon, title, desc, stat, statLabel, color, bg, border, hoverBorder, gradFrom, gradTo, pillBg, pillText, pillBorder, glowColor } = card;
  const [hovered, setHovered] = useState(false);

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group relative flex flex-col rounded-3xl border ${border} ${hoverBorder} bg-white overflow-hidden transition-all duration-500 hover:-translate-y-2 cursor-default`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(36px) scale(0.96)",
        transition: `opacity 0.6s ease ${0.1 + index * 0.1}s, transform 0.6s ease ${0.1 + index * 0.1}s, border-color 0.3s, box-shadow 0.4s`,
        boxShadow: hovered
          ? `0 20px 50px ${glowColor}, 0 4px 16px rgba(15,23,42,0.06)`
          : "0 2px 12px rgba(15,23,42,0.06)",
      }}
    >
      {/* Top gradient bar — slides in on hover */}
      <div
        className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradFrom} ${gradTo} transition-all duration-500`}
        style={{ opacity: hovered ? 1 : 0, transform: hovered ? "scaleX(1)" : "scaleX(0)", transformOrigin: "left" }}
      />

      <div className="flex flex-col flex-1 p-6 sm:p-7">
        {/* Stat pill — top right */}
        <div className="flex items-start justify-between mb-5">
          {/* Icon box */}
          <div
            className={`flex size-12 sm:size-14 items-center justify-center rounded-2xl ${bg} ${color} transition-all duration-400 group-hover:scale-110 group-hover:rounded-xl`}
            style={{
              boxShadow: hovered ? `0 8px 20px ${glowColor}` : "none",
              transition: "transform 0.3s, border-radius 0.3s, box-shadow 0.3s",
            }}
          >
            <Icon size={22} aria-hidden="true" strokeWidth={2} />
          </div>

          {/* Mini stat */}
          <div className={`flex flex-col items-end`}>
            <span className={`font-[family-name:var(--font-display)] text-xl font-extrabold ${color} leading-none`}>
              {stat}
            </span>
            <span className="text-[10px] font-semibold text-slate-400 mt-0.5">{statLabel}</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 className="text-base sm:text-lg font-extrabold text-slate-900 leading-snug mb-2 font-[family-name:var(--font-display)]">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            {desc}
          </p>
        </div>

        {/* Learn more link — appears on hover */}
        <div
          className="flex items-center gap-1 mt-5 transition-all duration-300"
          style={{ opacity: hovered ? 1 : 0, transform: hovered ? "translateX(0)" : "translateX(-8px)" }}
        >
          <span className={`text-xs font-bold ${color}`}>Learn more</span>
          <ArrowRight size={12} className={color} />
        </div>
      </div>

      {/* Bottom gradient wash on hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradFrom} ${gradTo} pointer-events-none rounded-3xl transition-opacity duration-500`}
        style={{ opacity: hovered ? 0.04 : 0 }}
      />
    </article>
  );
}

export default function WhyUsSection() {
  const [headerRef, headerVisible] = useInView(0.2);
  const [cardsRef, cardsVisible] = useInView(0.08);
  const [ctaRef, ctaVisible] = useInView(0.3);

  return (
    <section
      id="why-us"
      aria-labelledby="why-us-title"
      className="relative scroll-mt-20 overflow-hidden bg-[#f8faff] py-16 md:py-14"
    >
      {/* Top / bottom gradient lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-100 to-transparent" />

      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-25"
          style={{ background: "radial-gradient(circle, #bfdbfe 0%, transparent 70%)" }} />
        <div className="absolute -bottom-24 -left-24 w-[400px] h-[400px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #a7f3d0 0%, transparent 70%)" }} />
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="wudots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1.2" fill="#93c5fd" fillOpacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#wudots)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-14">

        {/* ── Header ── */}
        <header
          ref={headerRef}
          className="text-center max-w-2xl mx-auto mb-12 md:mb-16 space-y-4"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5">
            <span className="size-1.5 rounded-full bg-blue-500 inline-block animate-pulse" />
            <span className="text-blue-700 font-semibold text-xs tracking-wide uppercase">
              Why Parents Choose Us
            </span>
          </div>

          <h2
            id="why-us-title"
            className="font-[family-name:var(--font-display)] text-[1.75rem] sm:text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight"
          >
            Why UAE Parents Trust{" "}
            <span className="relative inline-block text-blue-600">
              International Schooling
              <svg className="absolute -bottom-1.5 left-0 w-full hidden sm:block" height="6" viewBox="0 0 340 6" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 5 Q85 0 170 4 Q255 8 340 3" stroke="#3b82f6" strokeWidth="3" fill="none" strokeLinecap="round"
                  style={{ strokeDasharray: 360, strokeDashoffset: headerVisible ? 0 : 360, transition: "stroke-dashoffset 1.2s ease 0.4s" }}
                />
              </svg>
            </span>
            ?
          </h2>

          <p className="text-sm md:text-base text-slate-500 leading-relaxed">
            100% International Curriculum, Certified Teachers and flexible
            Schooling — all in one place, built for your child's future.
          </p>
        </header>

        {/* ── Cards Grid ── */}
        <div
          ref={cardsRef}
          className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        >
          {cards.map((card, i) => (
            <FeatureCard key={card.title} card={card} index={i} visible={cardsVisible} />
          ))}
        </div>

        {/* ── Bottom CTA ── */}
        <div
          ref={ctaRef}
          className="mt-14 md:mt-16 flex flex-col sm:flex-row items-center justify-center gap-4"
          style={{
            opacity: ctaVisible ? 1 : 0,
            transform: ctaVisible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s",
          }}
        >
          {/* Supporting text */}
          <p className="text-sm text-slate-500 text-center sm:text-left">
            Join{" "}
            <span className="font-bold text-slate-800">15,000+ families</span>{" "}
            from 190+ countries
          </p>

          <span className="hidden sm:block w-px h-5 bg-slate-300" />

          {/* Primary CTA */}
          <a
            href="#book-demo"
            className="group inline-flex items-center gap-2.5 rounded-full px-8 py-3.5 bg-blue-600 text-white text-sm font-bold shadow-[0_6px_20px_rgba(37,99,235,0.32)] hover:bg-blue-700 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(37,99,235,0.42)] transition-all duration-250"
          >
            <BookOpen size={15} />
            Book Free Demo
            <ChevronRight size={14} className="opacity-70 group-hover:translate-x-1 transition-transform duration-200" />
          </a>

          {/* Secondary CTA */}
          <a
            href="#programs"
            className="group inline-flex items-center gap-2 rounded-full px-6 py-3.5 bg-white text-slate-700 text-sm font-bold border border-slate-200 hover:border-blue-200 hover:text-blue-700 hover:-translate-y-0.5 transition-all duration-250 shadow-sm"
          >
            View Programs
            <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-200" />
          </a>
        </div>

      </div>
    </section>
  );
}