"use client";
import { useEffect, useRef, useState } from "react";
import {
  Users, BookOpen, Check, BookMarked, ChevronRight,
  Sparkles, Clock, Calendar,
} from "lucide-react";

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

const plans = [
  {
    id: "group",
    variant: "blue",
    badge: "Most Popular",
    Icon: Users,
    title: "Group Learning",
    subtitle: "1 Teacher · 10–15 Students",
    tagline: "Learn together, grow together",
    quickStats: [
      { Icon: Clock, label: "60 min/class" },
      { Icon: Calendar, label: "42–45 week year" },
    ],
    features: [
      "Live group classes (60 min each)",
      "Fixed schedule and timings",
      "Collaborative assignments",
      "3 student counselling sessions",
      "3 career counselling sessions",
      "3 parent-teacher meetings",
      "42–45 week academic year",
    ],
  },
  {
    id: "onetoone",
    variant: "amber",
    badge: "Premium",
    Icon: BookMarked,
    title: "One-To-One Learning",
    subtitle: "1 Teacher · 1 Student",
    tagline: "Fully personalized, fully yours",
    quickStats: [
      { Icon: Clock, label: "50 min/class" },
      { Icon: Calendar, label: "Flexible dates" },
    ],
    features: [
      "One-to-one live classes",
      "Fully flexible timings",
      "50 minutes per class",
      "Flexible assessment dates",
      "6 student counselling sessions",
      "6 career counselling sessions",
      "6 parent-teacher meetings",
    ],
  },
];

const theme = {
  blue: {
    topBar: "linear-gradient(90deg,#1d4ed8,#38bdf8)",
    badge: { bg: "#1d4ed8", color: "white" },
    iconWrap: { bg: "#eff6ff", border: "1px solid #bfdbfe" },
    iconColor: "#2563eb",
    tagline: "#2563eb",
    pill: { bg: "#eff6ff", border: "1px solid #bfdbfe", color: "#1e40af" },
    cardBorder: "#3b82f6",
    cardShadow: "0 12px 40px rgba(59,130,246,0.16)",
    cardShadowHover: "0 36px 80px rgba(59,130,246,0.22)",
    cta: { bg: "linear-gradient(135deg,#2563eb,#1d4ed8)", color: "white", shadow: "0 6px 20px rgba(37,99,235,0.32)", shadowHover: "0 10px 28px rgba(37,99,235,0.42)" },
  },
  amber: {
    topBar: "linear-gradient(90deg,#f59e0b,#f97316)",
    badge: { bg: "#f59e0b", color: "#412402" },
    iconWrap: { bg: "#fffbeb", border: "1px solid #fde68a" },
    iconColor: "#d97706",
    tagline: "#b45309",
    pill: { bg: "#fffbeb", border: "1px solid #fde68a", color: "#92400e" },
    cardBorder: "#f59e0b",
    cardShadow: "0 12px 40px rgba(245,158,11,0.12)",
    cardShadowHover: "0 36px 80px rgba(245,158,11,0.18)",
    cta: { bg: "linear-gradient(135deg,#0f172a,#1e293b)", color: "white", shadow: "0 6px 20px rgba(15,23,42,0.22)", shadowHover: "0 10px 28px rgba(15,23,42,0.32)" },
  },
};

function PlanCard({ plan, index, visible }) {
  const [hovered, setHovered] = useState(false);
  const t = theme[plan.variant];
  const { Icon } = plan;

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "white",
        borderRadius: "24px",
        border: `1.5px solid ${hovered ? t.cardBorder : "#e2e8f0"}`,
        overflow: "hidden",
        position: "relative",
        boxShadow: hovered ? t.cardShadowHover : t.cardShadow,
        transform: visible
          ? hovered
            ? "translateY(-10px) scale(1.012)"
            : "translateY(0) scale(1)"
          : index === 0
          ? "translateX(-28px) scale(0.97)"
          : "translateX(28px) scale(0.97)",
        opacity: visible ? 1 : 0,
        transition: `opacity 0.7s ease ${0.12 + index * 0.15}s, transform 0.38s cubic-bezier(0.34,1.4,0.64,1), box-shadow 0.35s ease, border-color 0.25s ease`,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Top accent bar */}
      <div style={{ height: "5px", background: t.topBar }} />

      {/* Badge */}
      <div style={{ position: "absolute", top: "18px", right: "18px" }}>
        <span style={{
          display: "inline-flex", alignItems: "center", gap: "5px",
          background: t.badge.bg, color: t.badge.color,
          borderRadius: "999px", padding: "4px 11px",
          fontSize: "10.5px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em",
        }}>
          <Sparkles size={10} />
          {plan.badge}
        </span>
      </div>

      <div style={{ padding: "28px 28px 24px", display: "flex", flexDirection: "column", flex: 1, gap: "0" }}>

        {/* Icon */}
        <div style={{
          width: "52px", height: "52px", borderRadius: "16px",
          ...t.iconWrap,
          display: "flex", alignItems: "center", justifyContent: "center",
          marginBottom: "16px",
          transform: hovered ? "scale(1.12) rotate(-3deg)" : "scale(1)",
          transition: "transform 0.32s cubic-bezier(0.34,1.5,0.64,1)",
        }}>
          <Icon size={24} color={t.iconColor} strokeWidth={2} />
        </div>

        {/* Title block */}
        <h3 style={{ fontSize: "1.35rem", fontWeight: 800, color: "#0f172a", lineHeight: 1.2, letterSpacing: "-0.015em", marginBottom: "4px" }}>
          {plan.title}
        </h3>
        <p style={{ fontSize: "12.5px", fontWeight: 600, color: "#64748b", marginBottom: "4px" }}>{plan.subtitle}</p>
        <p style={{ fontSize: "12px", fontWeight: 600, color: t.tagline, marginBottom: "16px" }}>{plan.tagline}</p>

        {/* Pills */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "16px" }}>
          {plan.quickStats.map(({ Icon: StatIcon, label }) => (
            <span key={label} style={{
              display: "inline-flex", alignItems: "center", gap: "5px",
              ...t.pill,
              borderRadius: "999px", padding: "5px 12px",
              fontSize: "11.5px", fontWeight: 600,
            }}>
              <StatIcon size={12} />
              {label}
            </span>
          ))}
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "linear-gradient(90deg,transparent,#e2e8f0,transparent)", margin: "4px 0 18px" }} />

        {/* Features */}
        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px", flex: 1, marginBottom: "24px" }}>
          {plan.features.map((feat, i) => (
            <li key={feat} style={{
              display: "flex", alignItems: "flex-start", gap: "10px",
              fontSize: "13.5px", color: "#334155", lineHeight: 1.45, fontWeight: 500,
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-10px)",
              transition: `opacity 0.38s ease ${0.5 + index * 0.15 + i * 0.055}s, transform 0.38s ease ${0.5 + index * 0.15 + i * 0.055}s`,
            }}>
              <span style={{
                width: "20px", height: "20px", borderRadius: "50%",
                background: "#dcfce7", border: "1px solid #bbf7d0",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0, marginTop: "1px",
              }}>
                <Check size={10} color="#16a34a" strokeWidth={2.8} />
              </span>
              {feat}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#book-demo"
          style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
            width: "100%", borderRadius: "999px", padding: "13px 20px",
            fontSize: "14px", fontWeight: 700, textDecoration: "none",
            background: t.cta.bg, color: t.cta.color,
            boxShadow: hovered ? t.cta.shadowHover : t.cta.shadow,
            transition: "box-shadow 0.25s ease, transform 0.22s ease",
            transform: hovered ? "translateY(-2px)" : "translateY(0)",
          }}
        >
          <BookOpen size={15} />
          Book Free Demo
          <ChevronRight size={14} style={{ opacity: 0.65, transition: "transform 0.22s ease", transform: hovered ? "translateX(4px)" : "translateX(0)" }} />
        </a>
      </div>

      {/* Hover glow overlay */}
      <div style={{
        position: "absolute", inset: 0, borderRadius: "24px", pointerEvents: "none",
        background: plan.variant === "blue"
          ? "radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.06) 0%, transparent 65%)"
          : "radial-gradient(ellipse at 50% 0%, rgba(245,158,11,0.06) 0%, transparent 65%)",
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.4s ease",
      }} />
    </article>
  );
}

export default function ProgramsSection() {
  const [headerRef, headerVisible] = useInView(0.2);
  const [cardsRef, cardsVisible] = useInView(0.1);

  return (
    <section
      id="programs"
      style={{
        background: "linear-gradient(155deg,#f5f8ff 0%,#eef3ff 45%,#f0fdf8 100%)",
        padding: "64px 20px 52px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decoration */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: "-80px", left: "-80px", width: "380px", height: "380px", borderRadius: "50%", background: "radial-gradient(circle,rgba(59,130,246,0.11) 0%,transparent 70%)" }} />
        <div style={{ position: "absolute", bottom: "-60px", right: "-60px", width: "340px", height: "340px", borderRadius: "50%", background: "radial-gradient(circle,rgba(245,158,11,0.09) 0%,transparent 70%)" }} />
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.9 }}>
          <defs>
            <pattern id="pgdots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1.3" fill="#93c5fd" fillOpacity="0.22" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pgdots)" />
        </svg>
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: "960px", margin: "0 auto" }}>

        {/* Header */}
        <header
          ref={headerRef}
          style={{
            textAlign: "center", marginBottom: "48px",
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(28px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "18px" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "7px",
              background: "rgba(59,130,246,0.07)", border: "1px solid rgba(59,130,246,0.18)",
              borderRadius: "999px", padding: "5px 16px",
            }}>
              <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#3b82f6" }} />
              <span style={{ fontSize: "11px", fontWeight: 700, color: "#1d4ed8", textTransform: "uppercase", letterSpacing: "0.09em" }}>
                Learning Options
              </span>
            </div>
          </div>

          <h2 style={{ fontSize: "clamp(1.8rem,4.2vw,2.55rem)", fontWeight: 800, color: "#0f172a", lineHeight: 1.18, letterSpacing: "-0.022em", marginBottom: "14px" }}>
            Choose the Plan That{" "}
            <span style={{
              background: "linear-gradient(130deg,#1d4ed8 0%,#06b6d4 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              position: "relative", display: "inline-block",
            }}>
              Fits Your Child
            </span>
          </h2>

          <p style={{ color: "#64748b", fontSize: "clamp(0.87rem,1.9vw,1rem)", maxWidth: "520px", margin: "0 auto", lineHeight: 1.72 }}>
            Two expertly designed formats — both built on our international curriculum with certified teachers, live classes, and proven results.
          </p>
        </header>

        {/* Cards */}
        <div
          ref={cardsRef}
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "24px" }}
        >
          {plans.map((plan, i) => (
            <PlanCard key={plan.id} plan={plan} index={i} visible={cardsVisible} />
          ))}
        </div>

        {/* Bottom note */}
        <p style={{
          textAlign: "center", marginTop: "36px", fontSize: "12.5px", color: "#94a3b8", fontWeight: 500,
          opacity: cardsVisible ? 1 : 0, transition: "opacity 0.7s ease 0.8s",
        }}>
          Not sure which plan is right?{" "}
          <a href="#book-demo" style={{ color: "#3b82f6", textDecoration: "none", fontWeight: 600 }}>
            Book a free demo
          </a>{" "}
          and our advisors will guide you.
        </p>

      </div>
    </section>
  );
}