"use client";

import { useRef, useState, useEffect, useCallback } from "react";

const SLIDES = [
  {
    id: 1,
    src: "/slider/1.webp",
    alt: "Students learning online",
    kenBurns: "zoom-in",
  },
  {
    id: 2,
    src: "/slider/2.webp",
    alt: "Global classroom",
    kenBurns: "pan-left",
  },
  {
    id: 3,
    src: "/slider/3.webp",
    alt: "Teachers and students",
    kenBurns: "zoom-out",
  },
  {
    id: 4,
    src: "/slider/4.webp",
    alt: "Online learning environment",
    kenBurns: "pan-right",
  },
];

const SLIDE_DURATION = 6000;

export default function HeroSection() {
  const [current, setCurrent]     = useState(0);
  const [prev, setPrev]           = useState(null);
  const [animating, setAnimating] = useState(false);
  const [progress, setProgress]   = useState(0);
  const intervalRef               = useRef(null);
  const rafRef                    = useRef(null);
  const startRef                  = useRef(null);
  const total                     = SLIDES.length;

  // ── Progress RAF ─────────────────────────────────────────────
  const startProgress = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    startRef.current = performance.now();
    const tick = (now) => {
      const pct = Math.min(((now - startRef.current) / SLIDE_DURATION) * 100, 100);
      setProgress(pct);
      if (pct < 100) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  // ── Navigate ──────────────────────────────────────────────────
  const goTo = useCallback(
    (idx) => {
      if (animating || idx === current) return;
      setAnimating(true);
      setPrev(current);
      setCurrent(idx);
      setProgress(0);
      cancelAnimationFrame(rafRef.current);
      setTimeout(() => {
        setPrev(null);
        setAnimating(false);
        startProgress();
      }, 1000);
    },
    [animating, current, startProgress]
  );

  const goNext = useCallback(() => goTo((current + 1) % total), [current, total, goTo]);
  const goPrev = useCallback(() => goTo((current - 1 + total) % total), [current, total, goTo]);

  // ── Auto-advance ──────────────────────────────────────────────
  useEffect(() => {
    clearInterval(intervalRef.current);
    startProgress();
    intervalRef.current = setInterval(goNext, SLIDE_DURATION);
    return () => {
      clearInterval(intervalRef.current);
      cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  const kbDur = SLIDE_DURATION + 1000;

  return (
    <>
      <style>{`
       

        /* ══ Ken Burns ══ */
        @keyframes kb-zoom-in   { from{transform:scale(1) translateX(0)}     to{transform:scale(1.13) translateX(-1%)} }
        @keyframes kb-zoom-out  { from{transform:scale(1.13) translateX(0)}  to{transform:scale(1) translateX(1%)}    }
        @keyframes kb-pan-left  { from{transform:scale(1.1) translateX(2%)}  to{transform:scale(1.1) translateX(-2%)} }
        @keyframes kb-pan-right { from{transform:scale(1.1) translateX(-2%)} to{transform:scale(1.1) translateX(2%)}  }

        .kb-zoom-in   { animation: kb-zoom-in   ${kbDur}ms ease-in-out both; }
        .kb-zoom-out  { animation: kb-zoom-out  ${kbDur}ms ease-in-out both; }
        .kb-pan-left  { animation: kb-pan-left  ${kbDur}ms ease-in-out both; }
        .kb-pan-right { animation: kb-pan-right ${kbDur}ms ease-in-out both; }

        /* ══ Slide stack — z 1/2/3 ══ */
        .hs-slide {
          position: absolute; inset: 0;
          z-index: 1; opacity: 0;
          pointer-events: none;
          will-change: opacity;
        }
        .hs-slide.is-active {
          z-index: 3; pointer-events: none; /* images never need clicks */
          animation: hsFadeIn 1s cubic-bezier(0.25,0.46,0.45,0.94) forwards;
        }
        .hs-slide.is-leaving {
          z-index: 2;
          animation: hsFadeOut 1s cubic-bezier(0.55,0,1,0.45) forwards;
        }
        @keyframes hsFadeIn  { from{opacity:0} to{opacity:1} }
        @keyframes hsFadeOut { from{opacity:1} to{opacity:0} }

        /* ══ Overlay layer — z 10, never captures clicks ══ */
        .hs-overlay {
          position: absolute; inset: 0;
          z-index: 10;
          pointer-events: none;
        }

        /* ══ Segmented progress bar (desktop) ══ */
        .hs-seg {
          height: 3px; border-radius: 2px;
          background: rgba(255,255,255,0.22);
          flex: 1; cursor: pointer; overflow: hidden; position: relative;
          transition: background 0.3s, flex 0.4s cubic-bezier(0.34,1.56,0.64,1);
          border: none; padding: 0;
        }
        .hs-seg.active { flex: 2.6; background: rgba(255,255,255,0.3); }
        .hs-seg-fill {
          position: absolute; inset-y:0; left:0;
          background: #fff; border-radius: 2px;
          transition: width 0.06s linear;
        }

        /* ══ Arrow buttons ══ */
        .hs-btn {
          width: 42px; height: 42px; border-radius: 50%;
          border: 1.5px solid rgba(255,255,255,0.22);
          background: rgba(15,30,74,0.4);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          display: flex; align-items: center; justify-content: center;
          color: #fff; cursor: pointer;
          transition: background 0.22s, border-color 0.22s, transform 0.18s;
          flex-shrink: 0; padding: 0;
        }
        .hs-btn:hover {
          background: rgba(7,127,251,0.5);
          border-color: #077ffb;
          transform: scale(1.1);
        }
        .hs-btn:active { transform: scale(0.94); }

        @media (max-width: 639px) {
          .hs-btn {
            width: 32px; height: 32px;
            border: 1px solid rgba(255,255,255,0.2);
            background: rgba(15,30,74,0.45);
            backdrop-filter: blur(4px);
            -webkit-backdrop-filter: blur(4px);
          }
        }

        /* ══ Controls wrapper ══ */
        .hs-controls {
          position: absolute;
          bottom: 20px; right: 92px;
          z-index: 30;
          display: flex; flex-direction: column;
          align-items: flex-end; gap: 10px;
          pointer-events: auto;
        }
        @media (max-width: 639px) {
          .hs-controls { right: 12px; bottom: 16px; gap: 7px; }
        }

        /* ══ Show/hide helpers ══ */
        .hs-desktop { display: flex; }
        @media (max-width: 639px) { .hs-desktop { display: none !important; } }

        .hs-mobile-only { display: none; }
        @media (max-width: 639px) { .hs-mobile-only { display: flex; } }

        /* ══ Mobile dot indicators ══ */
        .hs-mdot {
          width: 5px; height: 5px; border-radius: 50%;
          background: rgba(255,255,255,0.28);
          cursor: pointer; border: none; padding: 0;
          transition: background 0.3s, transform 0.3s;
        }
        .hs-mdot.active { background: #fff; transform: scale(1.35); }

        /* ══ Hero text entrance ══ */
        .h-line  { animation: htIn 0.65s cubic-bezier(0.22,1,0.36,1) 0.05s both; }
        .h-title { animation: htIn 0.65s cubic-bezier(0.22,1,0.36,1) 0.12s both; }
        .h-badge { animation: htIn 0.65s cubic-bezier(0.22,1,0.36,1) 0.20s both; }
        .h-ctas  { animation: htIn 0.65s cubic-bezier(0.22,1,0.36,1) 0.28s both; }
        @keyframes htIn {
          from { opacity:0; transform:translateY(20px); }
          to   { opacity:1; transform:translateY(0);    }
        }

        /* ══ Stats entrance ══ */
        .hs-stat { animation: hsStatIn 0.6s cubic-bezier(0.22,1,0.36,1) both; }
        @keyframes hsStatIn {
          from { opacity:0; transform:translateY(14px); }
          to   { opacity:1; transform:translateY(0);    }
        }

        /* ══ Right accent strip (desktop only) ══ */
        .hs-accent {
          position: absolute; right:0; top:0; bottom:0;
          width: 4px; z-index: 25; pointer-events: none;
          background: linear-gradient(to bottom,
            #077ffb 0%, rgba(7,127,251,0.3) 55%, transparent 100%);
        }
        @media (max-width: 639px) { .hs-accent { display: none; } }

        /* ══ Stat divider ══ */
        .hs-divider {
          width: 1px; height: 28px;
          background: rgba(255,255,255,0.14);
          flex-shrink: 0;
        }

        /* ══ Counter font ══ */
        .hs-count {
          font-family: 'Playfair Display', Georgia, serif;
          font-variant-numeric: tabular-nums;
        }
      `}</style>

      <section
        className="hero-section relative w-full h-[80vw] sm:h-[90vh] min-h-[340px] sm:min-h-[500px] overflow-hidden bg-[#0f1e4a]"
        aria-label="Hero image slider"
      >

        {/* ── LAYER 1-3 : Slide images ── */}
        {SLIDES.map((slide, i) => {
          const isActive  = i === current;
          const isLeaving = i === prev;
          return (
            <div
              key={slide.id}
              className={`hs-slide${isActive ? " is-active" : ""}${isLeaving ? " is-leaving" : ""}`}
              aria-hidden={!isActive}
            >
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={slide.src}
                  alt={slide.alt}
                  className={`w-full h-full object-cover object-center select-none${isActive ? ` kb-${slide.kenBurns}` : ""}`}
                  draggable={false}
                />
              </div>
            </div>
          );
        })}

        {/* ── LAYER 10 : Overlays — sit ABOVE images, pointer-events: none ── */}

        {/* Main left-to-right dark gradient so text is readable */}
        <div
          className="hs-overlay"
          style={{
            background: "linear-gradient(to right, rgba(15,30,74,0.92) 0%, rgba(15,30,74,0.60) 40%, rgba(15,30,74,0.20) 70%, transparent 100%)",
          }}
        />

        {/* Bottom vignette for stats legibility */}
        <div
          className="hs-overlay"
          style={{
            background: "linear-gradient(to top, rgba(7,15,38,0.80) 0%, rgba(7,15,38,0.30) 30%, transparent 60%)",
          }}
        />

        {/* Top vignette for nav/header area */}
        <div
          className="hs-overlay"
          style={{
            background: "linear-gradient(to bottom, rgba(15,30,74,0.50) 0%, transparent 40%)",
          }}
        />

        {/* ── LAYER 25 : Decorative right accent strip ── */}
        <div className="hs-accent" />

        {/* ── LAYER 20 : Hero copy — left ── */}
        <div className="absolute inset-0 flex items-center" style={{ zIndex: 20, pointerEvents: "none" }}>
          <div className="px-4 sm:px-6 md:px-14 lg:px-20 max-w-xl" style={{ pointerEvents: "auto" }}>

            <p className="h-line text-[#93c5fd] text-[11px] md:text-xs font-semibold tracking-[0.25em] uppercase mb-3 md:mb-4">
              Globally Recognized · KG – Grade 12
            </p>

            <h1 className="h-title text-white text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] mb-3 md:mb-6">
              International<br />Online School
            </h1>

            <div className="h-badge inline-flex items-center gap-2 bg-gradient-to-r from-green-700 to-green-500 border border-white/40 rounded-full px-3 md:px-4 py-1.5 mb-6 md:mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse shrink-0" />
              <span className="text-white text-[10px] md:text-xs font-medium tracking-wide whitespace-nowrap">
                Accredited · NEASC · WASC · Cognia · College Board
              </span>
            </div>

            <div className="h-ctas flex flex-wrap gap-3">
              <a
                href="/enrollment"
                className="bg-[#077ffb] hover:bg-[#0569d4] text-white text-xs md:text-sm font-bold tracking-widest uppercase px-6 md:px-8 py-2.5 md:py-3 rounded-full transition-colors"
              >
                Enroll Now
              </a>
              <a
                href="/demo"
                className="border border-white/50 bg-white/10 hover:bg-white/20 text-white text-xs md:text-sm font-semibold tracking-widest uppercase px-6 md:px-8 py-2.5 md:py-3 rounded-full transition-colors"
              >
                Book Demo
              </a>
            </div>

          </div>
        </div>

        {/* ── LAYER 20 : Stats — bottom left ── */}
        <div
          className="absolute bottom-6 left-6 md:left-14 lg:left-20 flex items-center gap-4 md:gap-6"
          style={{ zIndex: 20 }}
        >
          {[["15,000+", "Students"], ["190+", "Countries"], ["600+", "Teachers"]].map(
            ([n, l], i) => (
              <div key={l} className="flex items-center gap-4 md:gap-6">
                {i > 0 && <div className="hs-divider" />}
                <div className="hs-stat" style={{ animationDelay: `${0.9 + i * 0.15}s` }}>
                  <p
                    className="text-white font-bold text-base md:text-xl leading-none"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {n}
                  </p>
                  <p className="text-white/50 text-[9px] md:text-[10px] tracking-widest uppercase mt-0.5">
                    {l}
                  </p>
                </div>
              </div>
            )
          )}
        </div>

        {/* ── LAYER 30 : Slider controls — bottom right ── */}
        <div className="hs-controls">

          {/* Counter — desktop only */}
          <div className="hs-desktop items-baseline gap-1">
            <span className="hs-count text-white text-lg md:text-xl font-bold leading-none">
              {String(current + 1).padStart(2, "0")}
            </span>
            <span className="text-white/30 text-[11px] px-0.5">/</span>
            <span className="hs-count text-white/40 text-[11px] leading-none">
              {String(total).padStart(2, "0")}
            </span>
          </div>

          {/* Segmented progress bar — desktop only */}
          <div className="hs-desktop gap-1.5 w-32 md:w-36">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                className={`hs-seg${i === current ? " active" : ""}`}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
              >
                {i === current && (
                  <div className="hs-seg-fill" style={{ width: `${progress}%` }} />
                )}
              </button>
            ))}
          </div>

          {/* Dot indicators — mobile only */}
          <div className="hs-mobile-only items-center gap-[5px]">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                className={`hs-mdot${i === current ? " active" : ""}`}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          {/* Prev / Next arrows — both breakpoints */}
          <div className="flex items-center gap-2">
            <button onClick={goPrev} className="hs-btn" aria-label="Previous slide">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button onClick={goNext} className="hs-btn" aria-label="Next slide">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

        </div>

      </section>
    </>
  );
}