"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  MapPin, Phone, Mail, ChevronRight, ExternalLink,
  Send, Globe, BookOpen, Users, Award, FileText,
  MessageSquare, GraduationCap, Heart,
} from "lucide-react";
import {
  FaFacebook, FaInstagram, FaTwitter,
  FaLinkedin, FaYoutube, FaWhatsapp,
} from "react-icons/fa";

/* ─── CSS ──────────────────────────────────────────────────────── */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

  .footer-root * { box-sizing: border-box; }
  .footer-root { font-family: 'Plus Jakarta Sans', sans-serif; }

  /* ── WhatsApp ripple ── */
  @keyframes wa-pulse {
    0%   { transform: scale(1);   opacity: 0.55; }
    100% { transform: scale(2.5); opacity: 0;    }
  }
  .wa-r1 { animation: wa-pulse 2.2s ease-out infinite 0s;    }
  .wa-r2 { animation: wa-pulse 2.2s ease-out infinite 0.73s; }
  .wa-r3 { animation: wa-pulse 2.2s ease-out infinite 1.46s; }
  .wa-fab {
    transition: transform 0.28s cubic-bezier(.22,.68,0,1.4), box-shadow 0.25s ease;
  }
  .wa-fab:hover {
    transform: scale(1.12) !important;
    box-shadow: 0 16px 40px rgba(37,211,102,0.60) !important;
  }

  /* ── Scroll reveal ── */
  .reveal {
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }
  .reveal.from-left { transform: translateX(-32px); }
  .reveal.visible {
    opacity: 1 !important;
    transform: translateY(0) translateX(0) !important;
  }

  /* ── Footer links — white & crisp ── */
  .f-link {
    display: inline-flex; align-items: center; gap: 7px;
    color: rgba(255,255,255,0.78);
    text-decoration: none; font-size: 13px; line-height: 1.55; font-weight: 400;
    transition: color 0.18s ease, gap 0.18s ease;
  }
  .f-link:hover { color: #fff; gap: 10px; }
  .f-link .chev { color: #4da3ff; flex-shrink: 0; }

  /* ── Social icon ── */
  .soc-icon {
    width: 36px; height: 36px; border-radius: 9px;
    display: flex; align-items: center; justify-content: center;
    text-decoration: none; flex-shrink: 0;
    transition: transform 0.22s cubic-bezier(.22,.68,0,1.4), opacity 0.2s;
  }
  .soc-icon:hover { transform: translateY(-4px) scale(1.1); opacity: 1; }

  /* ── Country card ── */
  .country-card {
    display: flex; align-items: center; gap: 7px;
    padding: 6px 12px; border-radius: 8px;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.10);
    text-decoration: none;
    transition: background 0.18s, border-color 0.18s, transform 0.18s;
    white-space: nowrap; font-family: inherit;
  }
  .country-card:hover {
    background: rgba(77,163,255,0.18);
    border-color: rgba(77,163,255,0.40);
    transform: translateY(-2px);
  }
  .country-card .flag-img {
    width: 22px; height: 15px; border-radius: 2px; object-fit: cover; flex-shrink: 0;
    box-shadow: 0 1px 3px rgba(0,0,0,0.35);
  }
  .country-card .c-name {
    font-size: 12px; font-weight: 500; color: rgba(255,255,255,0.88);
  }

  /* ── Accred badge ── */
  .accred-badge {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 8px 16px; border-radius: 8px;
    font-size: 12px; font-weight: 600; letter-spacing: 0.04em;
    transition: transform 0.22s cubic-bezier(.22,.68,0,1.4), box-shadow 0.2s ease;
    cursor: default;
  }
  .accred-badge:hover { transform: translateY(-3px); box-shadow: 0 8px 22px rgba(0,0,0,0.25); }

  /* ── Newsletter ── */
  .nl-inp {
    flex: 1; padding: 11px 15px;
    background: rgba(255,255,255,0.09);
    border: 1.5px solid rgba(255,255,255,0.16); border-right: none;
    color: #fff; font-size: 13px; font-weight: 400;
    border-radius: 9px 0 0 9px;
    outline: none; transition: border-color 0.2s, background 0.2s; font-family: inherit;
  }
  .nl-inp::placeholder { color: rgba(255,255,255,0.35); }
  .nl-inp:focus { border-color: rgba(77,163,255,0.60); background: rgba(255,255,255,0.12); }
  .nl-btn {
    padding: 11px 20px; background: #1a6edb;
    color: #fff; font-size: 13px; font-weight: 700;
    border: none; cursor: pointer;
    border-radius: 0 9px 9px 0;
    display: flex; align-items: center; gap: 6px;
    font-family: inherit; transition: background 0.18s; white-space: nowrap; letter-spacing: 0.02em;
  }
  .nl-btn:hover { background: #1559b8; }

  /* ── Section heading ── */
  .col-head {
    font-size: 10.5px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.16em;
    color: #fff; margin-bottom: 16px;
    display: flex; align-items: center; gap: 8px;
  }
  .col-head-bar { flex: 1; height: 1px; background: rgba(255,255,255,0.14); }
  .col-head-dot {
    width: 5px; height: 5px; border-radius: 50%; background: #4da3ff; flex-shrink: 0;
  }

  /* ── Divider ── */
  .f-divider { height: 1px; background: rgba(255,255,255,0.10); margin: 36px 0; }

  /* ── Contact row ── */
  .contact-link {
    color: rgba(255,255,255,0.78); text-decoration: none;
    font-size: 13px; line-height: 1.6; transition: color 0.18s; font-weight: 400;
  }
  .contact-link:hover { color: #fff; }

  /* ── Mobile accordion ── */
  .mob-content {
    overflow: hidden;
    transition: max-height 0.32s ease, opacity 0.26s ease;
  }

  /* ── Stats strip ── */
  .stat-chip {
    display: flex; flex-direction: column; align-items: center;
    padding: 10px 20px; border-radius: 10px;
    background: rgba(255,255,255,0.07);
    border: 1px solid rgba(255,255,255,0.11);
    min-width: 100px;
  }

  /* ── Responsive ── */
  @media (max-width: 767px) {
    .desktop-grid { display: none !important; }
    .mobile-acc   { display: block !important; }
    .nl-wrap      { flex-direction: column; }
    .nl-form      { width: 100% !important; }
    .stats-row    { gap: 8px !important; }
    .stat-chip    { min-width: 80px; padding: 8px 12px; }
  }
  @media (min-width: 768px) {
    .desktop-grid { display: grid !important; }
    .mobile-acc   { display: none !important; }
  }
  @media (max-width: 1080px) {
    .desktop-grid {
      grid-template-columns: 200px repeat(5,1fr) !important;
      gap: 32px 18px !important;
    }
  }
  @media (max-width: 900px) {
    .desktop-grid {
      grid-template-columns: 1fr 1fr 1fr !important;
    }
    .brand-block { grid-column: 1 / -1 !important; }
  }
`;

/* ─── useReveal hook ─────────────────────────────────────────── */
function useReveal(threshold = 0.1) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
}

/* ─── DATA ─────────────────────────────────────────────────────── */
const BG = "#001e40";

const socialLinks = [
  { icon: <FaFacebook size={15} />, href: "#", label: "Facebook",  color: "#fff", bg: "#1877f2"              },
  { icon: <FaInstagram size={15} />,href: "#", label: "Instagram", color: "#fff", bg: "#e1306c"              },
  { icon: <FaTwitter size={15} />,  href: "#", label: "Twitter",   color: "#fff", bg: "#1da1f2"              },
  { icon: <FaLinkedin size={15} />, href: "#", label: "LinkedIn",  color: "#fff", bg: "#0a66c2"              },
  { icon: <FaYoutube size={15} />,  href: "#", label: "YouTube",   color: "#fff", bg: "#ff0000"              },
];

const columns = [
  {
    title: "Programs",
    icon: <BookOpen size={11} color="#4da3ff" />,
    links: [
      { label: "One-To-One Learning",    href: "/one-to-one-learning" },
      { label: "Group Learning",          href: "/group-learning" },
      { label: "Self Study Learning",     href: "/self-study-learning" },
      { label: "AP Courses",              href: "/ap-courses" },
      { label: "Dual Diploma Program",    href: "/dual-diploma" },
      { label: "Online High School",      href: "/online-high-school" },
      { label: "Online Middle School",    href: "/online-middle-school" },
      { label: "Online Elementary",       href: "/online-elementary-school" },
      { label: "Special Education",       href: "/special-education" },
      { label: "University Program",      href: "/university-program" },
    ],
  },
  {
    title: "Accreditation",
    icon: <Award size={11} color="#4da3ff" />,
    links: [
      { label: "NEASC Accreditation",  href: "/neasc" },
      { label: "WASC Accreditation",   href: "/wasc" },
      { label: "Cognia Accreditation", href: "/cognia" },
      { label: "College Board",        href: "/college-board" },
      { label: "NCAA, USA",            href: "/ncaa" },
      { label: "UNESCO, CID",          href: "/unesco-cid" },
    ],
  },
  {
    title: "Community",
    icon: <Users size={11} color="#4da3ff" />,
    links: [
      { label: "Parent Reviews",     href: "/#reviews" },
      { label: "Student Gallery",    href: "/gallery" },
      { label: "Student Community",  href: "/student-community" },
      { label: "IS Alumni",          href: "/alumni" },
      { label: "Meet Our Counselor", href: "/meet-our-counselor" },
      { label: "Clubs & Events",     href: "/clubs" },
      { label: "Webinars",           href: "/webinars" },
      { label: "Blog",               href: "/blog" },
    ],
  },
  {
    title: "Quick Links",
    icon: <Globe size={11} color="#4da3ff" />,
    links: [
      { label: "Book Free Demo",     href: "/demo" },
      { label: "Enrollment Process", href: "/enrollment-process" },
      { label: "Fee Structure",      href: "/fee-structure" },
      { label: "Financial Aid",      href: "/financial" },
      { label: "Course Catalog",     href: "/course-catalog" },
      { label: "Careers",            href: "/career" },
      { label: "Press Release",      href: "/press-release" },
      { label: "FAQ's",              href: "/#faq" },
    ],
  },
  {
    title: "Legal",
    icon: <FileText size={11} color="#4da3ff" />,
    links: [
      { label: "Privacy Policy",    href: "/privacy-policy" },
      { label: "Terms of Use",      href: "/terms-of-use" },
      { label: "Guardian Policy",   href: "/guardian-policy" },
      { label: "Fee Refund Policy", href: "/fee-refund-policy" },
      { label: "Contact Us",        href: "/contact-us" },
    ],
  },
];

/* Country code map for flag CDN — using flagcdn.com */
const countries = [
  { name: "UAE",          code: "ae" },
  { name: "USA",          code: "us" },
  { name: "UK",           code: "gb" },
  { name: "Canada",       code: "ca" },
  { name: "Australia",    code: "au" },
  { name: "Mexico",       code: "mx" },
  { name: "Brazil",       code: "br" },
  { name: "Spain",        code: "es" },
  { name: "Germany",      code: "de" },
  { name: "France",       code: "fr" },
  { name: "Japan",        code: "jp" },
  { name: "Singapore",    code: "sg" },
  { name: "India",        code: "in" },
  { name: "Saudi Arabia", code: "sa" },
  { name: "South Africa", code: "za" },
  { name: "New Zealand",  code: "nz" },
];

const accreditations = [
  { label: "NEASC",  color: "#93c5fd", bg: "rgba(59,130,246,0.14)",  border: "rgba(93,197,253,0.28)"  },
  { label: "WASC",   color: "#c4b5fd", bg: "rgba(139,92,246,0.14)",  border: "rgba(196,181,253,0.28)" },
  { label: "Cognia", color: "#6ee7b7", bg: "rgba(16,185,129,0.14)",  border: "rgba(110,231,183,0.28)" },
  { label: "NCAA",   color: "#fcd34d", bg: "rgba(245,158,11,0.14)",  border: "rgba(252,211,77,0.28)"  },
  { label: "UNESCO", color: "#f9a8d4", bg: "rgba(236,72,153,0.14)",  border: "rgba(249,168,212,0.28)" },
  { label: "College Board", color: "#86efac", bg: "rgba(34,197,94,0.14)", border: "rgba(134,239,172,0.28)" },
];

/* ─── MOBILE ACCORDION ─────────────────────────────────────────── */
function MobileAcc({ col }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid rgba(255,255,255,0.09)" }}>
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          width: "100%", display: "flex", alignItems: "center",
          justifyContent: "space-between", padding: "13px 0",
          background: "transparent", border: "none", cursor: "pointer",
          color: "#fff", fontFamily: "inherit",
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: "7px", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em" }}>
          {col.icon}{col.title}
        </span>
        <ChevronRight
          size={14} color="rgba(255,255,255,0.45)"
          style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.25s ease", flexShrink: 0 }}
        />
      </button>
      <div className="mob-content" style={{ maxHeight: open ? "520px" : 0, opacity: open ? 1 : 0 }}>
        <ul style={{ listStyle: "none", paddingBottom: "14px", display: "flex", flexDirection: "column", gap: "9px" }}>
          {col.links.map(l => (
            <li key={l.label}>
              <a href={l.href} className="f-link">
                <ChevronRight size={10} className="chev" />
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ─── FOOTER ───────────────────────────────────────────────────── */
export default function Footer() {
  const [email, setEmail]           = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const nlRef        = useReveal(0.1);
  const brandRef     = useReveal(0.1);
  const countriesRef = useReveal(0.08);
  const accredRef    = useReveal(0.1);
  const bottomRef    = useReveal(0.05);

  const handleSub = (e) => {
    e.preventDefault();
    if (email.trim()) { setSubscribed(true); setEmail(""); }
  };

  return (
    <>
      <style>{CSS}</style>

      {/* ── WHATSAPP FLOATING BUTTON ── */}
      <a
        href="https://api.whatsapp.com/send?phone=17273902419"
        target="_blank" rel="noreferrer"
        aria-label="Chat on WhatsApp"
        style={{ position: "fixed", bottom: "28px", right: "28px", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <span className="wa-r1" style={{ position:"absolute", width:"58px", height:"58px", borderRadius:"50%", background:"rgba(37,211,102,0.28)", pointerEvents:"none" }} />
        <span className="wa-r2" style={{ position:"absolute", width:"58px", height:"58px", borderRadius:"50%", background:"rgba(37,211,102,0.20)", pointerEvents:"none" }} />
        <span className="wa-r3" style={{ position:"absolute", width:"58px", height:"58px", borderRadius:"50%", background:"rgba(37,211,102,0.13)", pointerEvents:"none" }} />
        <span className="wa-fab" style={{ position:"relative", width:"58px", height:"58px", borderRadius:"50%", background:"#25d366", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 8px 26px rgba(37,211,102,0.40)" }}>
          <FaWhatsapp size={27} color="#fff" />
        </span>
      </a>

      {/* ── FOOTER ── */}
      <footer className="footer-root" style={{ background: BG, color: "#fff", position: "relative", overflow: "hidden" }}>

        {/* Subtle top accent line */}
        <div style={{ height: "3px", background: "linear-gradient(90deg, #1a6edb 0%, #38bdf8 40%, #818cf8 70%, #1a6edb 100%)" }} />

        {/* ── NEWSLETTER BAND ── */}
        <div
          ref={nlRef}
          className="reveal"
          style={{ background: "rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.09)", padding: "24px 24px" }}
        >
          <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "18px" }} className="nl-wrap">
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <div style={{ width: "42px", height: "42px", borderRadius: "11px", background: "rgba(26,110,219,0.25)", border: "1px solid rgba(77,163,255,0.30)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <MessageSquare size={18} color="#60a5fa" />
              </div>
              <div>
                <p style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: "#60a5fa", marginBottom: "3px" }}>Newsletter</p>
                <p style={{ fontSize: "14px", fontWeight: 600, color: "#fff", lineHeight: 1.3 }}>Free resources, updates &amp; scholarship news</p>
              </div>
            </div>

            {subscribed ? (
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#34d399", fontWeight: 600, fontSize: "14px" }}>
                <Heart size={16} fill="#34d399" color="#34d399" /> You're subscribed — thank you!
              </div>
            ) : (
              <form onSubmit={handleSub} style={{ display: "flex", width: "clamp(260px,36vw,420px)" }} className="nl-form">
                <input className="nl-inp" type="email" required
                  placeholder="Your email address"
                  value={email} onChange={e => setEmail(e.target.value)} />
                <button className="nl-btn" type="submit">
                  <Send size={13} /> Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        {/* ── MAIN BODY ── */}
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "48px 24px 40px" }}>

          {/* ── DESKTOP GRID ── */}
          <div
            className="desktop-grid"
            style={{ gridTemplateColumns: "250px repeat(5,1fr)", gap: "40px 28px", alignItems: "start" }}
          >
            {/* Brand */}
            <div ref={brandRef} className="reveal from-left brand-block">
              <div style={{ background: "rgba(255,255,255,0.95)", borderRadius: "11px", padding: "8px 14px", display: "inline-block", marginBottom: "20px" }}>
                <Image src="/logo.avif" alt="International Schooling" width={160} height={36}
                  style={{ height: "31px", width: "auto", objectFit: "contain", display: "block" }} />
              </div>
              <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.65)", lineHeight: 1.85, marginBottom: "20px", maxWidth: "225px" }}>
                Empowering students worldwide with accredited online education — flexible, personalised, and globally recognised.
              </p>

              {/* Stats */}
              <div className="stats-row" style={{ display: "flex", gap: "10px", marginBottom: "22px", flexWrap: "wrap" }}>
                {[["15K+", "Students"], ["190+", "Countries"], ["600+", "Teachers"]].map(([n, l]) => (
                  <div key={l} className="stat-chip">
                    <span style={{ fontSize: "15px", fontWeight: 700, color: "#fff", lineHeight: 1.1 }}>{n}</span>
                    <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.50)", textTransform: "uppercase", letterSpacing: "0.10em", marginTop: "2px" }}>{l}</span>
                  </div>
                ))}
              </div>

              {/* Contact */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "22px" }}>
                {[
                  { icon: <MapPin size={13} color="#4da3ff" />,  text: "Dubai & India",                          href: null },
                  { icon: <Phone size={13} color="#4da3ff" />,   text: "+91 99999 99999",                        href: "tel:+919999999999" },
                  { icon: <Mail size={13} color="#4da3ff" />,    text: "info@internationalschooling.org",        href: "mailto:info@internationalschooling.org" },
                ].map(({ icon, text, href }) => (
                  <div key={text} style={{ display: "flex", alignItems: "flex-start", gap: "9px" }}>
                    <span style={{ marginTop: "2px", flexShrink: 0 }}>{icon}</span>
                    {href
                      ? <a href={href} className="contact-link">{text}</a>
                      : <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.65)", lineHeight: 1.6 }}>{text}</span>
                    }
                  </div>
                ))}
              </div>

              {/* Socials */}
              <div style={{ display: "flex", gap: "7px", flexWrap: "wrap" }}>
                {socialLinks.map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                    aria-label={s.label} className="soc-icon"
                    style={{ background: s.bg, color: s.color, opacity: 0.88 }}
                  >{s.icon}</a>
                ))}
              </div>
            </div>

            {/* Link columns */}
            {columns.map((col, i) => (
              <div key={col.title}
                style={{ opacity: 0, transform: "translateY(26px)", transition: `opacity 0.60s ease ${0.1 + i * 0.09}s, transform 0.60s ease ${0.1 + i * 0.09}s` }}
                ref={el => {
                  if (!el) return;
                  const obs = new IntersectionObserver(([entry]) => {
                    if (entry.isIntersecting) { el.style.opacity = "1"; el.style.transform = "translateY(0)"; obs.disconnect(); }
                  }, { threshold: 0.06 });
                  obs.observe(el);
                }}
              >
                <div className="col-head">
                  <span className="col-head-dot" />
                  {col.icon}
                  {col.title}
                  <span className="col-head-bar" />
                </div>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "9px" }}>
                  {col.links.map(l => (
                    <li key={l.label}>
                      <a href={l.href} className="f-link">
                        <ChevronRight size={10} className="chev" />
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* ── MOBILE ACCORDIONS ── */}
          <div className="mobile-acc" style={{ display: "none" }}>
            <div style={{ marginBottom: "24px" }}>
              <div style={{ background: "rgba(255,255,255,0.95)", borderRadius: "11px", padding: "8px 14px", display: "inline-block", marginBottom: "14px" }}>
                <Image src="/logo.avif" alt="International Schooling" width={148} height={34}
                  style={{ height: "29px", width: "auto", objectFit: "contain", display: "block" }} />
              </div>
              <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.65)", lineHeight: 1.8, marginBottom: "14px" }}>
                Empowering students worldwide with accredited online education.
              </p>
              <div className="stats-row" style={{ display: "flex", gap: "8px", marginBottom: "16px", flexWrap: "wrap" }}>
                {[["15K+", "Students"], ["190+", "Countries"], ["600+", "Teachers"]].map(([n, l]) => (
                  <div key={l} className="stat-chip">
                    <span style={{ fontSize: "14px", fontWeight: 700, color: "#fff" }}>{n}</span>
                    <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.50)", textTransform: "uppercase", letterSpacing: "0.09em", marginTop: "1px" }}>{l}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: "7px", flexWrap: "wrap" }}>
                {socialLinks.map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                    aria-label={s.label} className="soc-icon"
                    style={{ background: s.bg, color: s.color, opacity: 0.88 }}
                  >{s.icon}</a>
                ))}
              </div>
            </div>
            {columns.map(col => <MobileAcc key={col.title} col={col} />)}
          </div>

          <div className="f-divider" />

          {/* ── COUNTRIES WITH FLAGS ── */}
          <div ref={countriesRef} className="reveal">
            <div className="col-head" style={{ marginBottom: "16px" }}>
              <span className="col-head-dot" />
              <Globe size={11} color="#4da3ff" />
              Countries We Serve
              <span className="col-head-bar" />
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {countries.map(c => (
                <a key={c.name} href={`/${c.name.toLowerCase().replace(/\s+/g, "-")}`} className="country-card">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://flagcdn.com/w40/${c.code}.png`}
                    alt={c.name}
                    className="flag-img"
                    loading="lazy"
                  />
                  <span className="c-name">{c.name}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="f-divider" />

          {/* ── ACCREDITATIONS ── */}
          <div ref={accredRef} className="reveal">
            <div className="col-head" style={{ marginBottom: "16px" }}>
              <span className="col-head-dot" />
              <GraduationCap size={11} color="#4da3ff" />
              Accreditations &amp; Recognition
              <span className="col-head-bar" />
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {accreditations.map((a, i) => (
                <div
                  key={a.label}
                  className="accred-badge"
                  style={{
                    background: a.bg, border: `1px solid ${a.border}`, color: a.color,
                    opacity: 0, transform: "translateY(14px)",
                    transition: `opacity 0.45s ease ${i * 0.07}s, transform 0.45s ease ${i * 0.07}s`,
                  }}
                  ref={el => {
                    if (!el) return;
                    const obs = new IntersectionObserver(([entry]) => {
                      if (entry.isIntersecting) { el.style.opacity = "1"; el.style.transform = "translateY(0)"; obs.disconnect(); }
                    }, { threshold: 0.1 });
                    obs.observe(el);
                  }}
                >
                  <Award size={12} color={a.color} />
                  {a.label}
                </div>
              ))}
            </div>
          </div>

          <div className="f-divider" />

          {/* ── BOTTOM BAR ── */}
          <div ref={bottomRef} className="reveal">
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "14px" }}>
              <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.42)", lineHeight: 1.75 }}>
                © {new Date().getFullYear()} International Schooling. All rights reserved.<br />
                <span style={{ fontSize: "11px" }}>Accredited Online Education · Serving 50+ Countries Globally</span>
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "18px" }}>
                {[
                  { label: "Privacy Policy", href: "/privacy-policy" },
                  { label: "Terms of Use",   href: "/terms-of-use" },
                  { label: "Contact Us",     href: "/contact-us" },
                  { label: "Sitemap",        href: "/sitemap.xml", ext: true },
                ].map(l => (
                  <a key={l.label} href={l.href}
                    target={l.ext ? "_blank" : undefined}
                    rel={l.ext ? "noreferrer" : undefined}
                    className="f-link"
                    style={{ fontSize: "11.5px", color: "rgba(255,255,255,0.42)" }}
                  >
                    {l.label}
                    {l.ext && <ExternalLink size={9} style={{ opacity: 0.5, flexShrink: 0 }} />}
                  </a>
                ))}
              </div>
            </div>
          </div>

        </div>
      </footer>
    </>
  );
}