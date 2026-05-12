"use client";
import { useEffect, useRef, useState } from "react";
import { BookOpen, BarChart2, ArrowRight } from "lucide-react";
import Image from "next/image";

/* ── useInView hook ── */
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

/* ── Stat data ── */
const outcomeStats = [
  {
    value: "3.8",
    label: "Average GPA",
    icon: "📈",
    accent: "#378ADD",
    bg: "#E6F1FB",
    text: "#185FA5",
  },
  {
    value: "100%",
    label: "University acceptance rate",
    icon: "🎓",
    accent: "#1D9E75",
    bg: "#E1F5EE",
    text: "#0F6E56",
  },
  {
    value: "7%",
    label: "Ivy League acceptance",
    icon: "🏆",
    accent: "#EF9F27",
    bg: "#FAEEDA",
    text: "#854F0B",
  },
  {
    value: "75%",
    label: "International scholarships",
    icon: "🌍",
    accent: "#7F77DD",
    bg: "#EEEDFE",
    text: "#534AB7",
  },
];

/* ── College data ── */
const colleges = [
  { alt: "Brown University",      src: "/colleges/brown.avif",                country: "USA" },
  { alt: "UC Berkeley",           src: "/colleges/california.avif",           country: "USA" },
  { alt: "Caltech",               src: "/colleges/caltech.avif",              country: "USA" },
  { alt: "Harvard University",    src: "/colleges/harvard.avif",              country: "USA" },
  { alt: "Michigan University",   src: "/colleges/michigan.webp",             country: "USA" },
  { alt: "Princeton University",  src: "/colleges/princeton.avif",            country: "USA" },
  { alt: "Stanford University",   src: "/colleges/stanford.webp",             country: "USA" },
  { alt: "Univ. of Michigan",     src: "/colleges/university-of-michigan.avif", country: "USA" },
];

/* ══════════════════════════════════════════════════════════════
   STAT CARD
══════════════════════════════════════════════════════════════ */
function StatCard({ stat, index, visible }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff",
        borderRadius: "16px",
        border: `0.5px solid ${hovered ? stat.accent + "55" : "#e2e8f0"}`,
        padding: "22px 18px 18px",
        position: "relative",
        overflow: "hidden",
        cursor: "default",
        transform: visible
          ? hovered ? "translateY(-4px)" : "translateY(0)"
          : "translateY(28px)",
        opacity: visible ? 1 : 0,
        transition: `opacity 0.55s ease ${0.06 + index * 0.09}s,
                     transform 0.35s cubic-bezier(0.34,1.3,0.64,1),
                     border-color 0.22s ease`,
      }}
    >
      {/* Top accent bar */}
      <div
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: "2px",
          background: stat.accent,
          borderRadius: "16px 16px 0 0",
        }}
      />

      {/* Subtle bg tint on hover */}
      <div
        style={{
          position: "absolute", inset: 0,
          background: stat.bg,
          opacity: hovered ? 0.3 : 0,
          transition: "opacity 0.3s ease",
          pointerEvents: "none",
          borderRadius: "16px",
        }}
      />

      {/* Icon chip */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "32px", height: "32px",
          borderRadius: "8px",
          background: stat.bg,
          marginBottom: "10px",
          fontSize: "15px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {stat.icon}
      </div>

      {/* Number */}
      <div
        style={{
          fontSize: "clamp(1.6rem,3.5vw,2rem)",
          fontWeight: 500,
          color: stat.text,
          lineHeight: 1,
          marginBottom: "6px",
          letterSpacing: "-0.02em",
          position: "relative",
          zIndex: 1,
        }}
      >
        {stat.value}
      </div>

      {/* Label */}
      <div
        style={{
          fontSize: "0.72rem",
          fontWeight: 500,
          color: "#64748b",
          lineHeight: 1.45,
          position: "relative",
          zIndex: 1,
        }}
      >
        {stat.label}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAIN SECTION
══════════════════════════════════════════════════════════════ */
export default function UniversityPathSection() {
  const [headerRef, headerVisible] = useInView(0.2);
  const [statsRef,  statsVisible]  = useInView(0.08);
  const [marqueeRef, marqueeVisible] = useInView(0.08);

  /* double the list for seamless marquee loop */
  const doubled = [...colleges, ...colleges];

  return (
    <section
      id="university-path"
      aria-labelledby="uni-path-title"
      style={{
        position: "relative",
        overflow: "hidden",
        background: "#f7f9ff",
      }}
    >

      {/* ── Background geometry ── */}
      <div
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 0 }}
      >
        {/* Dot grid */}
        <div
          style={{
            position: "absolute", inset: 0,
            backgroundImage:
              "radial-gradient(rgba(55,138,221,0.18) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            opacity: 0.5,
          }}
        />

        {/* Large rings */}
        {[
          { w: 560, h: 560, top: -180, right: -140, opacity: 0.3 },
          { w: 320, h: 320, top: -60,  right:  10,  opacity: 0.22 },
          { w: 680, h: 680, bottom: -280, left: -220, opacity: 0.2 },
          { w: 180, h: 180, bottom: 40,  left: 60,    opacity: 0.25 },
        ].map((r, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: r.w, height: r.h,
              top: r.top, right: r.right, bottom: r.bottom, left: r.left,
              borderRadius: "50%",
              border: "0.5px solid rgba(55,138,221,0.3)",
              opacity: r.opacity,
            }}
          />
        ))}

        {/* Accent dots */}
        {[
          { top: "18%",  right: "22%" },
          { top: "55%",  right: "8%"  },
          { bottom: "20%", left: "18%" },
          { top: "30%",  left: "6%"  },
          { bottom: "35%", right: "30%" },
        ].map((pos, i) => (
          <div
            key={i}
            style={{
              position: "absolute", ...pos,
              width: 6, height: 6,
              borderRadius: "50%",
              background: "rgba(55,138,221,0.3)",
            }}
          />
        ))}

        {/* Blue blob top-right */}
        <div
          style={{
            position: "absolute",
            top: -120, right: -80,
            width: 480, height: 480,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(55,138,221,0.08) 0%, transparent 70%)",
          }}
        />
        {/* Green blob bottom-left */}
        <div
          style={{
            position: "absolute",
            bottom: -100, left: -80,
            width: 380, height: 380,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(29,158,117,0.07) 0%, transparent 70%)",
          }}
        />
        {/* Purple blob bottom-right */}
        <div
          style={{
            position: "absolute",
            bottom: -60, right: 60,
            width: 280, height: 280,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(127,119,221,0.07) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* ── Content ── */}
      <div
        style={{
          position: "relative", zIndex: 1,
          maxWidth: "940px", margin: "0 auto",
          padding: "60px 20px 68px",
        }}
      >

        {/* ── Header ── */}
        <header
          ref={headerRef}
          style={{
            textAlign: "center",
            marginBottom: "44px",
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(22px)",
            transition: "opacity 0.65s ease, transform 0.65s ease",
          }}
        >
          {/* Pill */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "14px" }}>
            <div
              style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                background: "#dbeafe",
                border: "0.5px solid #93c5fd",
                borderRadius: "100px", padding: "5px 14px",
              }}
            >
              <span
                style={{
                  width: "5px", height: "5px",
                  borderRadius: "50%", background: "#2563eb",
                  display: "inline-block",
                }}
              />
              <span
                style={{
                  fontSize: "10px", fontWeight: 500,
                  color: "#1d4ed8",
                  textTransform: "uppercase", letterSpacing: "0.12em",
                }}
              >
                University Admissions
              </span>
            </div>
          </div>

          {/* H2 */}
          <h2
            id="uni-path-title"
            style={{
              fontSize: "clamp(1.55rem, 3.5vw, 2.2rem)",
              fontWeight: 500,
              color: "#0f172a",
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              marginBottom: "12px",
            }}
          >
            Your path to{" "}
            <span
              style={{
                color: "#185FA5",
                position: "relative",
                display: "inline-block",
              }}
            >
              top universities
              {/* Animated underline */}
              <svg
                aria-hidden="true"
                style={{
                  position: "absolute", bottom: "-6px",
                  left: 0, width: "100%", overflow: "visible",
                }}
                height="6"
                viewBox="0 0 300 6"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 5 Q75 0 150 4 Q225 8 300 3"
                  stroke="#378ADD"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  style={{
                    strokeDasharray: 340,
                    strokeDashoffset: headerVisible ? 0 : 340,
                    transition: "stroke-dashoffset 1.2s ease 0.5s",
                  }}
                />
              </svg>
            </span>
            {" "}starts here
          </h2>

          <p
            style={{
              fontSize: "0.875rem",
              color: "#64748b",
              maxWidth: "480px",
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            Our students consistently gain admission to the world's most prestigious
            institutions — backed by a proven academic framework.
          </p>
        </header>

        {/* ── Stat Cards ── */}
        <div
          ref={statsRef}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(170px,1fr))",
            gap: "12px",
            marginBottom: "44px",
          }}
        >
          {outcomeStats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} visible={statsVisible} />
          ))}
        </div>

        {/* ── Divider label ── */}
        <div
          style={{
            display: "flex", alignItems: "center", gap: "12px",
            marginBottom: "20px",
            opacity: marqueeVisible ? 1 : 0,
            transition: "opacity 0.6s ease",
          }}
        >
          <div style={{ flex: 1, height: "0.5px", background: "#cbd5e1" }} />
          <span
            style={{
              fontSize: "10px", fontWeight: 500, color: "#94a3b8",
              textTransform: "uppercase", letterSpacing: "0.12em",
              whiteSpace: "nowrap",
            }}
          >
            Our students have been admitted to
          </span>
          <div style={{ flex: 1, height: "0.5px", background: "#cbd5e1" }} />
        </div>

        {/* ── University Marquee ── */}
        <div
          ref={marqueeRef}
          style={{
            opacity: marqueeVisible ? 1 : 0,
            transition: "opacity 0.8s ease 0.2s",
            marginBottom: "40px",
          }}
        >
          <div
            aria-label="Scrolling university logo strip"
            style={{ position: "relative", overflow: "hidden" }}
          >
            {/* Fade edges */}
            {[
              { left: 0, background: "linear-gradient(90deg,#f7f9ff,transparent)" },
              { right: 0, background: "linear-gradient(270deg,#f7f9ff,transparent)" },
            ].map((fade, i) => (
              <div
                key={i}
                aria-hidden="true"
                style={{
                  position: "absolute", top: 0, bottom: 0,
                  width: "100px", zIndex: 2, pointerEvents: "none",
                  ...fade,
                }}
              />
            ))}

            <div
              style={{
                display: "flex",
                gap: "12px",
                width: "max-content",
                animation: "uniScroll 36s linear infinite",
                padding: "8px 0 16px",
              }}
            >
              {doubled.map((col, i) => (
                <div
                  key={`${col.alt}-${i}`}
                  style={{
                    width: "82px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "6px",
                    flexShrink: 0,
                  }}
                >
                  {/* Logo card */}
                  <div
                    style={{
                      width: "82px", height: "82px",
                      background: "#ffffff",
                      borderRadius: "14px",
                      border: "0.5px solid #e2e8f0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "12px",
                    }}
                  >
                    <Image
                      alt={i < colleges.length ? col.alt : ""}
                      src={col.src}
                      width={200}
                      height={200}
                      loading="lazy"
                      style={{ width: "100%", height: "auto", objectFit: "contain" }}
                    />
                  </div>

                  {/* Country chip */}
                  <span
                    style={{
                      fontSize: "9px",
                      fontWeight: 500,
                      color: "#185FA5",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    {col.country}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <style>{`
            @keyframes uniScroll {
              0%   { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
          `}</style>
        </div>

        {/* ── CTA buttons ── */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            flexWrap: "wrap",
            opacity: marqueeVisible ? 1 : 0,
            transition: "opacity 0.7s ease 0.55s",
          }}
        >
          <a
            href="#book-demo"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "7px",
              background: "#1d4ed8",
              color: "#fff",
              borderRadius: "100px",
              padding: "12px 26px",
              fontSize: "13px",
              fontWeight: 500,
              textDecoration: "none",
              transition: "opacity 0.18s",
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.88"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
          >
            <BookOpen size={14} />
            Book a free demo
            <ArrowRight size={13} style={{ opacity: 0.7 }} />
          </a>

          <a
            href="#outcomes"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "7px",
              background: "#fff",
              color: "#0f172a",
              border: "0.5px solid #cbd5e1",
              borderRadius: "100px",
              padding: "12px 26px",
              fontSize: "13px",
              fontWeight: 500,
              textDecoration: "none",
              transition: "background 0.18s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "#f1f5f9"}
            onMouseLeave={e => e.currentTarget.style.background = "#fff"}
          >
            <BarChart2 size={14} />
            View outcomes
          </a>
        </div>

      </div>
    </section>
  );
}