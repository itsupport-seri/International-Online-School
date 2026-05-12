"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Smartphone, TabletSmartphone } from "lucide-react";

/* ── useInView (for smooth reveal) ── */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, visible];
}

export default function SchoolAppSection() {
  const [headerRef, headerVisible] = useInView(0.2);
  const [cardsRef, cardsVisible] = useInView(0.1);

  const studentFeatures = [
    "Live chat with teachers",
    "Check class schedule anytime",
    "Track tasks and academic progress",
    "Stay updated on live classes",
  ];

  const parentFeatures = [
    "Track student classes",
    "Monitor performance and progress",
    "Chat with teachers directly",
    "Stay informed with updates and visibility",
  ];

  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        background:
          "linear-gradient(160deg,#f8faff 0%,#eef2ff 50%,#f0fdf4 100%)",
        borderTop: "1px solid #e0e7ff",
        borderBottom: "1px solid #e0e7ff",
      }}
    >
      {/* Background effects */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-80px",
            width: "420px",
            height: "420px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle,rgba(99,102,241,0.12) 0%,transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-80px",
            left: "-60px",
            width: "360px",
            height: "360px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle,rgba(16,185,129,0.10) 0%,transparent 70%)",
          }}
        />
      </div>

      <div style={{ position: "relative", zIndex: 1, padding: "70px 20px" }}>

        {/* ── HEADER ── */}
        <header
          ref={headerRef}
          style={{
            textAlign: "center",
            marginBottom: "56px",
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible
              ? "translateY(0)"
              : "translateY(30px)",
            transition: "all 0.7s ease",
          }}
        >
          {/* Badge */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "16px" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                background: "rgba(16,185,129,0.08)",
                border: "1px solid rgba(16,185,129,0.25)",
                borderRadius: "999px",
                padding: "6px 16px",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "#10b981",
                }}
              />
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#047857",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                School App
              </span>
            </div>
          </div>

          {/* Heading */}
          <h2
            style={{
              fontSize: "clamp(1.9rem,4vw,2.8rem)",
              fontWeight: 800,
              color: "#0f172a",
              lineHeight: 1.2,
            }}
          >
            Stay Connected Through the <br />
            <span
              style={{
                background:
                  "linear-gradient(130deg,#4f46e5 0%,#2563eb 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              International Schooling App
            </span>
          </h2>

          {/* Store icons */}
          <p
            style={{
              marginTop: "14px",
              fontSize: "13px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              color: "#475569",
            }}
          >
            Available on
            <Image src="/play-store.avif" alt="play" width={16} height={16} />
            Play Store &
            <Image src="/app-store.avif" alt="app" width={18} height={18} />
            App Store
          </p>
        </header>

        {/* ── CARDS ── */}
        <div
          ref={cardsRef}
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
            gap: "28px",
          }}
        >

          {/* Student Card */}
          <AppCard
            visible={cardsVisible}
            delay={0}
            icon={<Smartphone size={22} />}
            title="Student App"
            description="Students can stay on top of their school day with live chat, schedules, and performance tracking."
            features={studentFeatures}
            color="#2563eb"
          />

          {/* Parent Card */}
          <AppCard
            visible={cardsVisible}
            delay={0.1}
            icon={<TabletSmartphone size={22} />}
            title="Parent App"
            description="Parents can track progress, monitor classes, and stay connected with teachers easily."
            features={parentFeatures}
            color="#10b981"
          />
        </div>
      </div>
    </section>
  );
}

/* ── Reusable Card ── */
function AppCard({ visible, delay, icon, title, description, features, color }) {
  const [hover, setHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: "#fff",
        borderRadius: "26px",
        padding: "28px 22px",
        border: "1.5px solid #e2e8f0",
        boxShadow: hover
          ? `0 20px 60px ${color}20`
          : "0 4px 20px rgba(15,23,42,0.06)",
        transform: visible
          ? hover
            ? "translateY(-10px)"
            : "translateY(0)"
          : "translateY(40px)",
        opacity: visible ? 1 : 0,
        transition: `all 0.5s ease ${delay}s`,
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: "52px",
          height: "52px",
          borderRadius: "16px",
          background: `${color}15`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto",
          color: color,
        }}
      >
        {icon}
      </div>

      {/* Title */}
      <h3
        style={{
          marginTop: "16px",
          fontSize: "1.3rem",
          fontWeight: 700,
          textAlign: "center",
        }}
      >
        {title}
      </h3>

      {/* Description */}
      <p
        style={{
          marginTop: "10px",
          fontSize: "14px",
          color: "#64748b",
          textAlign: "center",
          lineHeight: 1.6,
        }}
      >
        {description}
      </p>

      {/* Features */}
      <ul style={{ marginTop: "18px", display: "flex", flexDirection: "column", gap: "10px" }}>
        {features.map((f) => (
          <li
            key={f}
            style={{
              fontSize: "13px",
              padding: "10px 14px",
              borderRadius: "12px",
              background: "#f8fafc",
              border: "1px solid #e2e8f0",
            }}
          >
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}
