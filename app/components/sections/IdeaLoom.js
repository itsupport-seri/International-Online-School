"use client";

import { useEffect, useRef, useState } from "react";
import {
    Users, Shield, Heart, Briefcase, FolderOpen, BookOpen, Globe,
    Apple, Flame, Brain, GraduationCap, Wrench, Settings, Wifi, Coins,
    Handshake, Lightbulb, Award, Star, Video, UserCheck, BookMarked, School,
} from "lucide-react";

/* ══════════════════════════════════════════════════════════════
   RING DATA
══════════════════════════════════════════════════════════════ */
const ring1Segments = [
    { label: "Global Community", icon: Users, color: "#e53e3e", light: "#fff5f5" },
    { label: "NEASC Accredited", icon: Shield, color: "#dd6b20", light: "#fffaf0" },
    { label: "Parent Partnership", icon: Heart, color: "#d69e2e", light: "#fffff0" },
    { label: "University Pathways", icon: Briefcase, color: "#38a169", light: "#f0fff4" },
    { label: "Project-Based Learning", icon: FolderOpen, color: "#3182ce", light: "#ebf8ff" },
    { label: "Student Portfolio", icon: BookOpen, color: "#6b46c1", light: "#faf5ff" },
    { label: "Outreach Programs", icon: Globe, color: "#d53f8c", light: "#fff5f7" },
];

const ring2Segments = [
    { label: "AP Courses", icon: Award, color: "#c53030", light: "#fff5f5" },
    { label: "Passion Projects", icon: Flame, color: "#c05621", light: "#fffaf0" },
    { label: "Critical Thinking", icon: Brain, color: "#b7791f", light: "#fffff0" },
    { label: "American Curriculum", icon: GraduationCap, color: "#276749", light: "#f0fff4" },
    { label: "Flexible Learning", icon: Wrench, color: "#2b6cb0", light: "#ebf8ff" },
    { label: "Makers & Innovation", icon: Settings, color: "#553c9a", light: "#faf5ff" },
    { label: "Digital Citizenship", icon: Wifi, color: "#97266d", light: "#fff5f7" },
    { label: "Financial Literacy", icon: Coins, color: "#285e61", light: "#e6fffa" },
];

const ring3Segments = [
    { label: "Student Well-Being", icon: Heart, color: "#e53e3e", light: "#fff5f5" },
    { label: "EdTech Tools", icon: Settings, color: "#3182ce", light: "#ebf8ff" },
    { label: "Live Online Classes", icon: Video, color: "#38a169", light: "#f0fff4" },
    { label: "Future-Ready Skills", icon: Lightbulb, color: "#d69e2e", light: "#fffff0" },
];

/* ══════════════════════════════════════════════════════════════
   SVG GEOMETRY HELPERS  (unchanged)
══════════════════════════════════════════════════════════════ */
const CX = 300, CY = 300;
const R1o = 290, R1i = 220;
const R2o = 216, R2i = 156;
const R3o = 152, R3i = 98;
const GAP = 1.8;

function polar(cx, cy, r, deg) {
    const rad = ((deg - 90) * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function annularPath(cx, cy, ro, ri, startDeg, endDeg) {
    const s1 = polar(cx, cy, ro, startDeg);
    const e1 = polar(cx, cy, ro, endDeg);
    const s2 = polar(cx, cy, ri, endDeg);
    const e2 = polar(cx, cy, ri, startDeg);
    const la = endDeg - startDeg > 180 ? 1 : 0;
    return [
        `M ${s1.x} ${s1.y}`,
        `A ${ro} ${ro} 0 ${la} 1 ${e1.x} ${e1.y}`,
        `L ${s2.x} ${s2.y}`,
        `A ${ri} ${ri} 0 ${la} 0 ${e2.x} ${e2.y}`,
        "Z",
    ].join(" ");
}

function arcTextDef(cx, cy, r, startDeg, endDeg, id) {
    const mid = (startDeg + endDeg) / 2;
    const span = (endDeg - startDeg) * 0.7;
    const from = mid - span / 2;
    const to = mid + span / 2;
    const bottom = mid > 90 && mid < 270;
    const s = polar(cx, cy, r, from);
    const e = polar(cx, cy, r, to);
    const la = to - from > 180 ? 1 : 0;
    if (bottom) {
        return <path key={id} id={id} d={`M ${e.x} ${e.y} A ${r} ${r} 0 ${la} 0 ${s.x} ${s.y}`} />;
    }
    return <path key={id} id={id} d={`M ${s.x} ${s.y} A ${r} ${r} 0 ${la} 1 ${e.x} ${e.y}`} />;
}

/* ══════════════════════════════════════════════════════════════
   STYLES  (completely unchanged)
══════════════════════════════════════════════════════════════ */
const css = `
.il-page{
  font-family:var(--font-sans,system-ui,sans-serif);
  background:var(--color-background-secondary,#f7fafc);
  position:relative;
  overflow-x:hidden;
}
.il-page::before{
  content:'';
  position:absolute;
  inset:0;
  background-image:radial-gradient(rgba(49,130,206,0.10) 1px,transparent 1px);
  background-size:26px 26px;
  pointer-events:none;
  z-index:0;
}
.il-inner{
  position:relative;
  z-index:1;
  max-width:1200px;
  margin:0 auto;
  padding:48px 20px 60px;
}
.il-head{
  text-align:center;
  margin-bottom:40px;
  opacity:0;
  transform:translateY(32px);
  transition:opacity .75s ease, transform .75s cubic-bezier(.16,1,.3,1);
}
.il-head.vis{ opacity:1; transform:translateY(0); }
.il-pill{
  display:inline-flex;
  align-items:center;
  gap:6px;
  font-size:10px;
  font-weight:500;
  letter-spacing:.13em;
  text-transform:uppercase;
  color:#2b6cb0;
  background:#ebf8ff;
  border:0.5px solid #bee3f8;
  padding:5px 14px;
  border-radius:100px;
  margin-bottom:14px;
}
.il-pill-dot{
  width:5px; height:5px;
  border-radius:50%;
  background:#3182ce;
  flex-shrink:0;
  display:inline-block;
}
.il-h1{
  font-size:clamp(2.45rem, 3vw, 2.1rem);
  font-weight:700;
  color:var(--color-text-primary,#5b5b5b);
  line-height:1.2;
  margin-bottom:10px;
  letter-spacing:-.02em;
}
.il-h1 em{ color:#1e52e1; font-style:normal; }
.il-desc{
  font-size:.875rem;
  color:var(--color-text-secondary,#718096);
  max-width:500px;
  margin:0 auto;
  line-height:1.7;
}
.il-body{
  display:grid;
  grid-template-columns:240px 1fr 240px;
  gap:24px;
  align-items:center;
}
.il-col{
  display:flex;
  flex-direction:column;
  gap:8px;
  opacity:0;
  transform:translateX(-40px);
  transition:opacity .75s ease .1s, transform .75s cubic-bezier(.16,1,.3,1) .1s;
}
.il-col.right{ transform:translateX(40px); }
.il-col.vis{ opacity:1; transform:translateX(0); }
.il-card{
  background:var(--color-background-primary,#fff);
  border-radius:12px;
  padding:10px 12px 10px 14px;
  border:0.5px solid var(--color-border-tertiary,rgba(0,0,0,0.08));
  display:flex;
  align-items:center;
  gap:9px;
  position:relative;
  overflow:hidden;
  cursor:default;
  transition:transform .2s ease;
}
.il-card:hover{ transform:translateY(-2px); }
.il-card-bar{
  position:absolute;
  left:0; top:0; bottom:0;
  width:3px;
  border-radius:3px 0 0 3px;
}
.il-card-ico{
  width:30px; height:30px;
  border-radius:8px;
  display:flex; align-items:center; justify-content:center;
  flex-shrink:0;
}
.il-card-info{ flex:1; min-width:0; }
.il-card-ring{
  font-size:9px;
  font-weight:500;
  letter-spacing:.1em;
  text-transform:uppercase;
  margin-bottom:1px;
}
.il-card-name{
  font-size:.75rem;
  font-weight:500;
  color:var(--color-text-primary,#1a202c);
  line-height:1.3;
}
.il-dot{
  position:absolute;
  right:-3px; top:50%;
  transform:translateY(-50%);
  width:6px; height:6px;
  border-radius:50%;
  border:1.5px solid var(--color-background-primary,#fff);
}
.il-col.right .il-dot{ right:auto; left:-3px; }
.il-diag{
  position:relative;
  display:flex;
  align-items:center;
  justify-content:center;
  opacity:0;
  transform:scale(.88) translateY(20px);
  transition:opacity .9s ease .05s, transform .9s cubic-bezier(.16,1,.3,1) .05s;
}
.il-diag.vis{ opacity:1; transform:scale(1) translateY(0); }
.il-tilt{
  perspective:1400px;
  position:relative;
  width:100%;
  max-width:560px;
}
.il-tilt-inner{
  transition:transform .12s ease-out;
  transform-style:preserve-3d;
}
.il-svg{
  width:100%;
  aspect-ratio:1;
  overflow:visible;
}
.seg{ cursor:pointer; transition:opacity .18s; }
.seg:hover{ opacity:.88; }
@keyframes cw  { to{ transform:rotate(360deg);  } }
@keyframes ccw { to{ transform:rotate(-360deg); } }
.r1{ animation:cw  38s linear infinite; transform-origin:300px 300px; }
.r2{ animation:ccw 28s linear infinite; transform-origin:300px 300px; }
.r3{ animation:cw  18s linear infinite; transform-origin:300px 300px; }
.il-core{
  position:absolute;
  top:50%; left:50%;
  transform:translate(-50%,-50%);
  z-index:20;
  pointer-events:none;
}
.il-core-circle{
  width:110px; height:110px;
  border-radius:50%;
  background:#1a365d;
  display:flex; flex-direction:column;
  align-items:center; justify-content:center;
  text-align:center; padding:14px;
  border:0.5px solid rgba(49,130,206,.4);
}
.il-core-icon{ font-size:22px; margin-bottom:4px; }
.il-core-title{
  font-size:11px;
  font-weight:500;
  color:#fff;
  letter-spacing:.04em;
}
.il-core-sub{
  font-size:8px;
  font-weight:500;
  color:rgba(255,255,255,.55);
  letter-spacing:.12em;
  text-transform:uppercase;
  margin-top:2px;
}
.il-hint{
  position:absolute;
  bottom:-22px; left:50%; transform:translateX(-50%);
  font-size:9px;
  font-weight:500;
  letter-spacing:.1em;
  text-transform:uppercase;
  color:#a0aec0;
  white-space:nowrap;
}
.il-stats{
  display:flex;
  justify-content:center;
  max-width:600px;
  margin:36px auto 0;
  background:var(--color-background-primary,#fff);
  border:0.5px solid var(--color-border-tertiary,rgba(0,0,0,0.08));
  border-radius:12px;
  overflow:hidden;
  opacity:0;
  transform:translateY(24px);
  transition:opacity .75s ease .35s, transform .75s cubic-bezier(.16,1,.3,1) .35s;
}
.il-stats.vis{ opacity:1; transform:translateY(0); }
.il-stat{
  flex:1;
  padding:16px 10px;
  text-align:center;
  border-right:0.5px solid var(--color-border-tertiary,rgba(0,0,0,0.08));
}
.il-stat:last-child{ border-right:none; }
.il-stat-n{
  font-size:1.5rem;
  font-weight:500;
  line-height:1;
  color:#2b6cb0;
  margin-bottom:4px;
}
.il-stat-l{
  font-size:.65rem;
  color:#718096;
  font-weight:500;
  letter-spacing:.08em;
  text-transform:uppercase;
}
.il-tip{
  position:fixed;
  background:var(--color-background-primary,#fff);
  color:var(--color-text-primary,#1a202c);
  border:0.5px solid var(--color-border-tertiary,rgba(0,0,0,0.08));
  padding:5px 11px;
  border-radius:8px;
  font-size:11px;
  font-weight:500;
  pointer-events:none;
  z-index:9999;
  opacity:0;
  transform:translateY(4px);
  transition:opacity .13s, transform .13s;
  white-space:nowrap;
}
.il-tip.on{ opacity:1; transform:translateY(0); }
@media(max-width:900px){
  .il-body{ grid-template-columns:1fr; gap:20px; }
  .il-col,.il-col.right{ flex-direction:row; flex-wrap:wrap; transform:translateY(30px) !important; }
  .il-col.vis{ transform:translateY(0) !important; }
  .il-card{ flex:1 1 180px; }
  .il-tilt{ max-width:420px; margin:0 auto; }
}
@media(max-width:560px){
  .il-tilt{ max-width:300px; }
  .il-core-circle{ width:76px; height:76px; }
  .il-core-icon{ font-size:16px; }
  .il-core-title{ font-size:9px; }
  .il-stats{ flex-wrap:wrap; }
  .il-stat{ flex:1 1 45%; }
  .il-stat:nth-child(2){ border-right:none; }
  .il-stat:nth-child(3),.il-stat:nth-child(4){ border-top:0.5px solid rgba(0,0,0,0.08); }
}
`;

/* ══════════════════════════════════════════════════════════════
   COMPONENT
══════════════════════════════════════════════════════════════ */
export default function IdeaLoom() {
    const headRef = useRef(null);
    const leftRef = useRef(null);
    const rightRef = useRef(null);
    const diagRef = useRef(null);
    const statsRef = useRef(null);
    const tiltRef = useRef(null);
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);

    const [paused, setPaused] = useState(false);
    const [tip, setTip] = useState({ text: "", x: 0, y: 0, on: false });

    useEffect(() => {
        const pairs = [
            { el: headRef.current, delay: 0 },
            { el: leftRef.current, delay: 100 },
            { el: diagRef.current, delay: 50 },
            { el: rightRef.current, delay: 200 },
            { el: statsRef.current, delay: 350 },
        ];
        const io = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    const p = pairs.find(p => p.el === e.target);
                    setTimeout(() => e.target.classList.add("vis"), p?.delay || 0);
                    io.unobserve(e.target);
                }
            });
        }, { threshold: 0.1 });
        pairs.forEach(({ el }) => el && io.observe(el));
        return () => io.disconnect();
    }, []);

    useEffect(() => {
        const wrap = tiltRef.current;
        if (!wrap) return;
        const inner = wrap.querySelector(".il-tilt-inner");
        const onMove = (e) => {
            const r = wrap.getBoundingClientRect();
            const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
            const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
            inner.style.transform = `rotateY(${dx * 6}deg) rotateX(${-dy * 6}deg)`;
        };
        const onLeave = () => { inner.style.transform = "rotateY(0) rotateX(0)"; };
        wrap.addEventListener("mousemove", onMove);
        wrap.addEventListener("mouseleave", onLeave);
        return () => {
            wrap.removeEventListener("mousemove", onMove);
            wrap.removeEventListener("mouseleave", onLeave);
        };
    }, []);

    const showTip = (e, label) => setTip({ text: label, x: e.clientX, y: e.clientY - 44, on: true });
    const moveTip = (e) => setTip(t => ({ ...t, x: e.clientX, y: e.clientY - 44 }));
    const hideTip = () => setTip(t => ({ ...t, on: false }));

    const ps = paused ? { animationPlayState: "paused" } : {};

    const renderRing = (segments, ro, ri, textR, fontSize, darkText, spinClass) => {
        const n = segments.length;
        const segDeg = 360 / n;
        const paths = [];
        const defs = [];

        segments.forEach((seg, i) => {
            const s = i * segDeg + GAP / 2;
            const e = (i + 1) * segDeg - GAP / 2;
            const id = `ap-${spinClass}-${i}`;
            defs.push(arcTextDef(CX, CY, textR, s, e, id));
            paths.push(
                <g key={i} className="seg"
                    onMouseEnter={ev => showTip(ev, seg.label)}
                    onMouseMove={moveTip}
                    onMouseLeave={hideTip}
                >
                    <path d={annularPath(CX, CY, ro, ri, s, e)}
                        fill={darkText ? seg.light : seg.color}
                        stroke={darkText ? seg.color : "#fff"}
                        strokeWidth={darkText ? "1.2" : "2"} />
                    <path d={annularPath(CX, CY, ro, ri, s, e)}
                        fill={darkText ? seg.color : "url(#shimmer)"}
                        opacity={darkText ? "0.08" : "0.15"}
                        stroke="none" />
                    <text fontSize={fontSize} fontWeight="500"
                        fontFamily="system-ui, sans-serif"
                        fill={darkText ? seg.color : "#fff"}
                        letterSpacing="0.06em">
                        <textPath href={`#${id}`} startOffset="50%" textAnchor="middle">
                            {seg.label.toUpperCase()}
                        </textPath>
                    </text>
                </g>
            );
        });

        return (
            <g className={spinClass} style={{ ...ps }}>
                <defs>{defs}</defs>
                {paths}
                <circle cx={CX} cy={CY} r={ro} fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
                <circle cx={CX} cy={CY} r={ri} fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
            </g>
        );
    };

    const renderCard = (seg, ringLabel) => {
        const Icon = seg.icon;
        return (
            <div className="il-card" key={seg.label} style={{ borderColor: seg.color + "33" }}>
                <div className="il-card-bar" style={{ background: seg.color }} />
                <div className="il-card-ico" style={{ background: seg.light }}>
                    <Icon size={14} color={seg.color} strokeWidth={2} />
                </div>
                <div className="il-card-info">
                    <div className="il-card-ring" style={{ color: seg.color }}>{ringLabel}</div>
                    <div className="il-card-name">{seg.label}</div>
                </div>
                <div className="il-dot" style={{ background: seg.color }} />
            </div>
        );
    };

    return (
        <>
            <style>{css}</style>

            <div className={`il-tip${tip.on ? " on" : ""}`}
                style={{ top: tip.y, left: tip.x, transform: "translate(-50%, 0)" }}>
                {tip.text}
            </div>

            <div className="il-page">
                <svg aria-hidden="true"
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0, overflow: "hidden" }}
                    viewBox="0 0 1400 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
                    <ellipse cx="1200" cy="80" rx="500" ry="380" fill="rgba(49,130,206,0.05)" />
                    <ellipse cx="100" cy="820" rx="420" ry="320" fill="rgba(229,62,62,0.04)" />
                    <ellipse cx="700" cy="900" rx="360" ry="240" fill="rgba(56,161,105,0.04)" />
                    <polygon points="0,0 120,-18 200,70 178,180 60,200 -30,110" fill="none" stroke="#3182ce" strokeWidth="1" opacity="0.08" />
                    <line x1="22" y1="60" x2="22" y2="840" stroke="#3182ce" strokeWidth="1" opacity="0.06" />
                    <line x1="1378" y1="60" x2="1378" y2="840" stroke="#3182ce" strokeWidth="1" opacity="0.06" />
                    <path d="M -40 900 Q 180 640 380 900" fill="none" stroke="#3182ce" strokeWidth="1.5" opacity="0.07" />
                    <polygon points="1100,700 1220,880 980,880" fill="none" stroke="#38a169" strokeWidth="1" opacity="0.07" />
                </svg>

                <div className="il-inner">

                    {/* ── HEADER — content updated ── */}
                    <div ref={headRef} className="il-head">
                        <h1 className="il-h1">
                            Our Learning{" "}
                            <em className="relative inline-block">
                                Framework
                                <svg className="absolute -bottom-1 left-0 w-full" height="6"
                                    viewBox="0 0 200 6" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 5 Q50 0 100 4 Q150 8 200 3"
                                        stroke="#1e52e1" strokeWidth="3" fill="none" strokeLinecap="round"
                                        style={{
                                            strokeDasharray: 220,
                                            strokeDashoffset: mounted ? 0 : 220,
                                            transition: "stroke-dashoffset 1.1s ease 0.5s",
                                        }} />
                                </svg>
                            </em>
                        </h1>
                        <p className="il-desc">
                            A globally accredited American curriculum for KG–Grade 12, trusted by 15,000+ students
                            across 190+ countries — delivered through live, flexible, and personalized online learning.
                        </p>
                    </div>

                    {/* ── BODY ── */}
                    <div className="il-body">

                        {/* LEFT COLUMN */}
                        <div ref={leftRef} className="il-col">
                            {ring1Segments.slice(0, 4).map((s, i) => renderCard(s, `Outer · ${i + 1}`))}
                            {ring3Segments.slice(0, 2).map((s, i) => renderCard(s, `Inner · ${i + 1}`))}
                        </div>

                        {/* DIAGRAM */}
                        <div ref={diagRef} className="il-diag">
                            <div className="il-tilt" ref={tiltRef}
                                onMouseEnter={() => setPaused(true)}
                                onMouseLeave={() => setPaused(false)}>
                                <div className="il-tilt-inner">
                                    <svg className="il-svg" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
                                        <defs>
                                            <linearGradient id="shimmer" x1="0%" y1="0%" x2="100%" y2="100%">
                                                <stop offset="0%" stopColor="#fff" stopOpacity=".4" />
                                                <stop offset="50%" stopColor="#fff" stopOpacity="0" />
                                                <stop offset="100%" stopColor="#fff" stopOpacity=".2" />
                                            </linearGradient>
                                        </defs>
                                        <circle cx={CX} cy={CY} r={R1o + 9} fill="none" stroke="#3182ce" strokeWidth="0.8" strokeDasharray="5 9" opacity="0.18" />
                                        <circle cx={CX} cy={CY} r={R1o + 20} fill="none" stroke="#3182ce" strokeWidth="0.5" strokeDasharray="2 14" opacity="0.10" />
                                        {mounted && renderRing(ring1Segments, R1o, R1i, (R1o + R1i) / 2, "13", false, "r1")}
                                        {mounted && renderRing(ring2Segments, R2o, R2i, (R2o + R2i) / 2, "11", true, "r2")}
                                        {mounted && renderRing(ring3Segments, R3o, R3i, (R3o + R3i) / 2, "10", false, "r3")}
                                        <circle cx={CX} cy={CY} r={R3i - 2} fill="#eff6ff" stroke="rgba(49,130,206,0.3)" strokeWidth="1.5" />
                                        <circle cx={CX} cy={CY} r={R3i - 14} fill="none" stroke="rgba(49,130,206,0.10)" strokeWidth="10" />
                                    </svg>
                                </div>

                                {mounted && (
                                   <div className="il-core">
                                        <div className="il-core-circle">
                                            <div className="il-core-icon">💡</div>
                                            <div className="il-core-title">Framework</div>
                                        </div>
                                    </div>
                                )}

                                <div className="il-hint">
                                    {paused ? "▶ Paused · move away to resume" : "Hover to pause · tilt to explore"}
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN */}
                        <div ref={rightRef} className="il-col right">
                            {ring1Segments.slice(4).map((s, i) => renderCard(s, `Outer · ${i + 5}`))}
                            {ring3Segments.slice(2).map((s, i) => renderCard(s, `Inner · ${i + 3}`))}
                            {ring2Segments.slice(0, 3).map((s, i) => renderCard(s, `Middle · ${i + 1}`))}
                        </div>

                    </div>

                    {/* ── STATS — updated to IS real numbers ── */}
                    <div ref={statsRef} className="il-stats">
                        {[
                            { num: "3.8", label: "Student Achievement" },
                            { num: "100%", label: "University Acceptance" },
                            { num: "7%", label: "Ivy League Acceptance" },
                            { num: "75%", label: "International Scholarships" },
                        ].map(({ num, label }) => (
                            <div className="il-stat" key={label}>
                                <div className="il-stat-n">{num}</div>
                                <div className="il-stat-l">{label}</div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </>
    );
}