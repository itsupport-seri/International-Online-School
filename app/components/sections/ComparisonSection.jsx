"use client";

import { useEffect, useRef, useState } from "react";
import { BookOpen, Check, X, Star, ChevronRight, Zap, Globe, Shield } from "lucide-react";

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

const rows = [
  { feature: "Curriculum",        icon: "📘", us: "100% International Curriculum",          them: "Old traditional methods" },
  { feature: "Teachers",          icon: "👩‍🏫", us: "600+ Certified International Teachers",  them: "Limited and unverified" },
  { feature: "Learning approach", icon: "🎯", us: "Personalized For Every Child",            them: "One-size-fits-all" },
  { feature: "Class format",      icon: "🎥", us: "Live & Interactive In Real Time",         them: "Pre-recorded videos only" },
  { feature: "Assessments",       icon: "📊", us: "Continuous and Ongoing",                  them: "No structured assessments" },
  { feature: "Environment",       icon: "🏠", us: "Safe & Comfortable From Home",            them: "Unmonitored online spaces" },
  { feature: "Skills",            icon: "⚡", us: "Future-ready: AI, Global, Digital",       them: "Outdated skill sets" },
  { feature: "Schedule",          icon: "🕐", us: "Fully Flexible, Learn Anytime",           them: "Fixed rigid timings" },
  { feature: "Community",         icon: "🌍", us: "Global Network (190+ countries)",         them: "No community support" },
];

const stats = [
  { value: "15K+", label: "Active Students", icon: <Globe size={18} /> },
  { value: "190+", label: "Countries", icon: <Zap size={18} /> },
  { value: "600+", label: "Teachers", icon: <Shield size={18} /> },
];

export default function ComparisonSection() {
  const [headerRef, headerVisible] = useInView(0.2);
  const [statsRef, statsVisible] = useInView(0.1);
  const [tableRef, tableVisible] = useInView(0.08);

  return (
    <section
      aria-labelledby="comparison-title"
      style={{
        background: "linear-gradient(160deg, #f8faff 0%, #eef4ff 40%, #f0fdf8 100%)",
        padding: "80px 0 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative background shapes */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{
          position: "absolute", top: "-120px", right: "-80px",
          width: "520px", height: "520px", borderRadius: "50%",
          background: "radial-gradient(circle at 40% 40%, rgba(59,130,246,0.10) 0%, transparent 70%)",
        }} />
        <div style={{
          position: "absolute", bottom: "80px", left: "-100px",
          width: "420px", height: "420px", borderRadius: "50%",
          background: "radial-gradient(circle at 60% 60%, rgba(16,185,129,0.10) 0%, transparent 70%)",
        }} />
        {/* Grid dot pattern */}
        <svg width="100%" height="100%" style={{ position: "absolute", inset: 0, opacity: 0.25 }}>
          <defs>
            <pattern id="dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1.5" fill="#94a3b8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: "1100px", margin: "0 auto", padding: "0 20px" }}>

        {/* ── Header ── */}
        <header
          ref={headerRef}
          style={{
            textAlign: "center",
            marginBottom: "52px",
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(28px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.18)",
            borderRadius: "999px", padding: "6px 16px", marginBottom: "20px",
          }}>
            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#3b82f6", display: "inline-block" }} />
            <span style={{ color: "#1d4ed8", fontWeight: 700, fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              See The Difference
            </span>
          </div>

          <h2
            id="comparison-title"
            style={{
              fontSize: "clamp(1.9rem, 4vw, 2.75rem)",
              fontWeight: 800,
              color: "#0f172a",
              lineHeight: 1.18,
              margin: "0 0 16px",
              letterSpacing: "-0.02em",
            }}
          >
            Why Parents Choose{" "}
            <span style={{
              background: "linear-gradient(135deg, #1d4ed8 0%, #0ea5e9 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              International Schooling
            </span>
          </h2>

          <p style={{ color: "#64748b", fontSize: "clamp(0.9rem, 2vw, 1.05rem)", maxWidth: "580px", margin: "0 auto", lineHeight: 1.7 }}>
            A side-by-side comparison of what your child actually gets with International Schooling vs. other online schools.
          </p>
        </header>

        {/* ── Stats Row ── */}
        <div
          ref={statsRef}
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "clamp(12px, 3vw, 28px)",
            flexWrap: "wrap",
            marginBottom: "48px",
            opacity: statsVisible ? 1 : 0,
            transform: statsVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
          }}
        >
          {stats.map(({ value, label, icon }) => (
            <div key={label} style={{
              display: "flex", alignItems: "center", gap: "12px",
              background: "white",
              border: "1px solid rgba(59,130,246,0.15)",
              borderRadius: "16px",
              padding: "14px 24px",
              boxShadow: "0 4px 20px rgba(59,130,246,0.08)",
              minWidth: "160px",
            }}>
              <span style={{
                width: "36px", height: "36px", borderRadius: "10px",
                background: "linear-gradient(135deg, #eff6ff, #dbeafe)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#3b82f6", flexShrink: 0,
              }}>{icon}</span>
              <div>
                <p style={{ margin: 0, fontWeight: 800, fontSize: "1.3rem", color: "#0f172a", lineHeight: 1 }}>{value}</p>
                <p style={{ margin: 0, fontSize: "12px", color: "#64748b", fontWeight: 500, marginTop: "3px" }}>{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Comparison Table ── */}
        <div
          ref={tableRef}
          style={{
            borderRadius: "28px",
            overflow: "hidden",
            border: "1px solid rgba(59,130,246,0.15)",
            boxShadow: "0 32px 80px rgba(59,130,246,0.13), 0 4px 16px rgba(0,0,0,0.05)",
            background: "white",
            opacity: tableVisible ? 1 : 0,
            transform: tableVisible ? "translateY(0)" : "translateY(32px)",
            transition: "opacity 0.75s ease 0.15s, transform 0.75s ease 0.15s",
          }}
        >
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "560px" }}>
              <caption className="sr-only">Comparison between International Schooling and other online schools</caption>

              {/* ── Head ── */}
              <thead>
                <tr>
                  {/* Feature col */}
                  <th style={{
                    width: "32%", padding: "22px 24px",
                    background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
                    borderBottom: "1px solid rgba(16,185,129,0.15)",
                    borderRight: "1px solid rgba(16,185,129,0.15)",
                    textAlign: "left",
                  }}>
                    <span style={{ fontSize: "11px", fontWeight: 700, color: "#059669", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                      What your child needs
                    </span>
                  </th>

                  {/* IS col */}
                  <th style={{
                    width: "40%", padding: "22px 24px",
                    background: "linear-gradient(170deg, #1e40af 0%, #1d4ed8 60%, #0369a1 100%)",
                    borderBottom: "1px solid rgba(255,255,255,0.1)",
                    borderLeft: "1px solid rgba(255,255,255,0.08)",
                    borderRight: "1px solid rgba(255,255,255,0.08)",
                    textAlign: "center",
                    position: "relative",
                  }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
                      <span style={{
                        display: "inline-flex", alignItems: "center", gap: "5px",
                        background: "rgba(255,255,255,0.15)",
                        border: "1px solid rgba(255,255,255,0.25)",
                        borderRadius: "999px", padding: "4px 12px",
                        fontSize: "11px", fontWeight: 700, color: "white",
                        textTransform: "uppercase", letterSpacing: "0.07em",
                      }}>
                        <Star size={11} style={{ fill: "#fbbf24", stroke: "#fbbf24" }} aria-hidden />
                        Best Choice
                      </span>
                      <span style={{ fontSize: "clamp(0.9rem, 2vw, 1.1rem)", fontWeight: 800, color: "white", lineHeight: 1.2 }}>
                        International Schooling
                      </span>
                    </div>
                  </th>

                  {/* Others col */}
                  <th style={{
                    width: "28%", padding: "22px 20px",
                    background: "#f8fafc",
                    borderBottom: "1px solid #e2e8f0",
                    textAlign: "center",
                  }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                      <span style={{ fontSize: "10px", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em" }}>Others</span>
                      <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#64748b" }}>Other Schools</span>
                    </div>
                  </th>
                </tr>
              </thead>

              {/* ── Body ── */}
              <tbody>
                {rows.map(({ feature, icon, us, them }, i) => (
                  <tr
                    key={feature}
                    style={{
                      opacity: tableVisible ? 1 : 0,
                      transform: tableVisible ? "translateX(0)" : "translateX(-16px)",
                      transition: `opacity 0.45s ease ${0.25 + i * 0.055}s, transform 0.45s ease ${0.25 + i * 0.055}s`,
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.querySelectorAll("td,th").forEach(el => {
                        el.style.background = el.dataset.hover;
                      });
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.querySelectorAll("td,th").forEach(el => {
                        el.style.background = el.dataset.base;
                      });
                    }}
                  >
                    {/* Feature label */}
                    <th
                      scope="row"
                      data-base={i % 2 === 0 ? "#fafffe" : "white"}
                      data-hover="#f0fdf4"
                      style={{
                        padding: "16px 20px 16px 24px",
                        borderRight: "1px solid rgba(16,185,129,0.12)",
                        borderBottom: i < rows.length - 1 ? "1px solid #f1f5f9" : "none",
                        background: i % 2 === 0 ? "#fafffe" : "white",
                        textAlign: "left",
                        transition: "background 0.2s",
                      }}
                    >
                      <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <span style={{
                          width: "32px", height: "32px", borderRadius: "9px",
                          background: "rgba(16,185,129,0.08)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: "15px", flexShrink: 0,
                        }}>{icon}</span>
                        <span style={{ fontWeight: 600, color: "#1e293b", fontSize: "0.875rem" }}>{feature}</span>
                      </span>
                    </th>

                    {/* IS value */}
                    <td
                      data-base={i % 2 === 0 ? "#eff6ff" : "#f0f7ff"}
                      data-hover="#dbeafe"
                      style={{
                        padding: "16px 20px",
                        borderLeft: "1px solid rgba(59,130,246,0.1)",
                        borderRight: "1px solid rgba(59,130,246,0.1)",
                        borderBottom: i < rows.length - 1 ? "1px solid rgba(59,130,246,0.08)" : "none",
                        background: i % 2 === 0 ? "#eff6ff" : "#f0f7ff",
                        textAlign: "center",
                        transition: "background 0.2s",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                        <span style={{
                          width: "22px", height: "22px", borderRadius: "50%",
                          background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          flexShrink: 0,
                          boxShadow: "0 2px 8px rgba(59,130,246,0.35)",
                        }}>
                          <Check size={12} color="white" strokeWidth={3} />
                        </span>
                        <span style={{ fontWeight: 600, color: "#1e3a8a", fontSize: "0.82rem", lineHeight: 1.35, maxWidth: "200px", textAlign: "left" }}>
                          {us}
                        </span>
                      </div>
                    </td>

                    {/* Others value */}
                    <td
                      data-base="white"
                      data-hover="#f8fafc"
                      style={{
                        padding: "16px 16px",
                        borderBottom: i < rows.length - 1 ? "1px solid #f1f5f9" : "none",
                        background: "white",
                        textAlign: "center",
                        transition: "background 0.2s",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                        <span style={{
                          width: "20px", height: "20px", borderRadius: "50%",
                          background: "#f1f5f9",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          flexShrink: 0,
                        }}>
                          <X size={10} color="#94a3b8" strokeWidth={2.5} />
                        </span>
                        <span style={{ color: "#94a3b8", fontSize: "0.79rem", fontWeight: 500, lineHeight: 1.35, maxWidth: "130px", textAlign: "left" }}>
                          {them}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ── Footer CTA ── */}
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
            padding: "22px 28px",
            background: "linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 50%, #0369a1 100%)",
            borderTop: "1px solid rgba(255,255,255,0.08)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <div style={{
                width: "42px", height: "42px", borderRadius: "12px",
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.18)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                🎓
              </div>
              <p style={{ margin: 0, color: "rgba(255,255,255,0.85)", fontSize: "0.9rem", lineHeight: 1.5 }}>
                Join{" "}
                <span style={{ fontWeight: 800, color: "white" }}>15,000+ students</span>{" "}
                already learning with International Schooling
              </p>
            </div>

            <a
              href="#book-demo"
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                background: "white",
                borderRadius: "999px",
                padding: "11px 24px",
                fontSize: "0.875rem",
                fontWeight: 700,
                color: "#1d4ed8",
                textDecoration: "none",
                boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
                transition: "all 0.2s",
                flexShrink: 0,
                whiteSpace: "nowrap",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.2)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.15)";
              }}
            >
              <BookOpen size={15} />
              Book Free Demo
              <ChevronRight size={14} style={{ opacity: 0.6 }} />
            </a>
          </div>
        </div>

        {/* ── Bottom trust strip ── */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "clamp(16px, 4vw, 40px)",
          flexWrap: "wrap",
          padding: "32px 0 48px",
          opacity: tableVisible ? 1 : 0,
          transition: "opacity 0.7s ease 0.8s",
        }}>
          {["No contracts, cancel anytime", "Free demo class included", "Trusted by families in 190+ countries"].map(text => (
            <span key={text} style={{ display: "flex", alignItems: "center", gap: "7px", color: "#64748b", fontSize: "0.82rem", fontWeight: 500 }}>
              <span style={{
                width: "18px", height: "18px", borderRadius: "50%",
                background: "linear-gradient(135deg, #10b981, #059669)",
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <Check size={10} color="white" strokeWidth={3} />
              </span>
              {text}
            </span>
          ))}
        </div>

      </div>
    </section>
  );
}