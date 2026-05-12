"use client";

import { useRef, useState, useEffect } from "react";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";

const heroCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500&display=swap');

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes badgePulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(34,197,94,0.5); }
    60%       { box-shadow: 0 0 0 8px rgba(34,197,94,0); }
  }

  .h-line  { animation: fadeUp 0.8s ease 0.2s both; }
  .h-title { animation: fadeUp 0.8s ease 0.45s both; font-family: 'Playfair Display', serif; }
  .h-badge { animation: fadeUp 0.7s ease 0.7s both; }
  .h-ctas  { animation: fadeUp 0.7s ease 0.9s both; }
  .h-overlay { animation: fadeIn 1.2s ease both; }

  .accred-pulse { animation: badgePulse 2.8s ease 1.5s infinite; }

  .cta-enroll {
    position: relative; overflow: hidden;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  .cta-enroll::before {
    content: ''; position: absolute; inset: 0;
    background: rgba(255,255,255,0.18);
    transform: translateX(-101%);
    transition: transform 0.3s ease;
  }
  .cta-enroll:hover::before { transform: translateX(0); }
  .cta-enroll:hover { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(0,0,0,0.3); }

  .cta-demo {
    transition: transform 0.2s ease, background 0.2s ease;
  }
  .cta-demo:hover { transform: translateY(-2px); background: rgba(255,255,255,0.22); }

  .play-btn {
    backdrop-filter: blur(10px);
    transition: transform 0.2s ease, background 0.2s ease;
  }
  .play-btn:hover { transform: scale(1.12); background: rgba(255,255,255,0.25); }
`;

export default function HeroSection() {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false); // false until video confirms playing
  const [muted, setMuted]     = useState(true);  // matches the muted HTML attr below

  // ✅ After mount: force muted=true on the element & kick off autoplay
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    v.muted = true; // guarantee muted regardless of browser quirks

    const playPromise = v.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => setPlaying(true))   // autoplay succeeded
        .catch(() => setPlaying(false)); // autoplay blocked — user must press Play
    }
  }, []);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;   // flip the actual element property
    setMuted(v.muted);    // sync state to what the element actually is
  };

  return (
    <>
      <style>{heroCSS}</style>

     <section className="relative w-full h-[80vw] sm:h-[90vh] min-h-[340px] sm:min-h-[500px] overflow-hidden bg-[#0f1e4a]">


        {/*
          ✅ KEY FIXES:
          1. `muted` attribute here is required for autoplay to work in all browsers
          2. No onLoadedMetadata — useEffect handles it reliably after mount
          3. No autoPlay attribute — we call v.play() manually so we can catch errors
        */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover object-center"
          src="/video/1.mp4"
          loop
          muted          
          playsInline    
          preload="auto" 
        />

        {/* Overlay */}
        <div className="h-overlay absolute inset-0 bg-gradient-to-r from-[#0f1e4a]/90 via-[#0f1e4a]/45 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-28 bg-gradient-to-t from-[#0f1e4a]/60 to-transparent" />

        {/* Left-aligned content */}
        <div className="absolute inset-0 flex items-center">
          <div className="px-4 sm:px-6 md:px-14 lg:px-20 max-w-xl">

            <p className="h-line text-[#93c5fd] text-[11px] md:text-xs font-semibold tracking-[0.25em] uppercase mb-3 md:mb-4">
              Globally Recognized · KG – Grade 12
            </p>

            <h1 className="h-title text-white text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] mb-3 md:mb-6">
              International<br />Online School
            </h1>

            <div className="h-badge accred-pulse inline-flex items-center gap-2 bg-gradient-to-r from-green-700 to-green-500 border border-white/40 rounded-full px-3 md:px-4 py-1.5 mb-6 md:mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse shrink-0" />
              <span className="text-white text-[10px] md:text-xs font-medium tracking-wide whitespace-nowrap">
                Accredited · NEASC · WASC · Cognia · College Board
              </span>
            </div>

            <div className="h-ctas flex flex-wrap gap-3">
              
               <a href="/enrollment"
                className="cta-enroll bg-[#077ffb] text-white text-xs md:text-sm font-bold tracking-widest uppercase px-6 md:px-8 py-2.5 md:py-3 rounded-full"
              >
                Enroll Now
              </a>
              
              <a  href="/demo"
                className="cta-demo border border-white/50 bg-white/10 text-white text-xs md:text-sm font-semibold tracking-widest uppercase px-6 md:px-8 py-2.5 md:py-3 rounded-full"
              >
                Book Demo
              </a>
            </div>
          </div>
        </div>

        {/* Stats — bottom left */}
        <div className="absolute bottom-6 left-6 md:left-14 lg:left-20 flex items-center gap-5 md:gap-8">
          {[["15,000+", "Students"], ["190+", "Countries"], ["600+", "Teachers"]].map(([n, l], i) => (
            <div key={l} className="text-center" style={{ animation: `fadeUp 0.7s ease ${1.0 + i * 0.13}s both` }}>
              <p className="text-white font-bold text-base md:text-xl leading-none" style={{ fontFamily: "'Playfair Display', serif" }}>{n}</p>
              <p className="text-white/50 text-[9px] md:text-[10px] tracking-widest uppercase mt-0.5">{l}</p>
            </div>
          ))}
        </div>

        {/* Mute + Play buttons — bottom right */}
        <div className="absolute bottom-5 right-5 z-30 flex items-center gap-2">

          <button
            onClick={toggleMute}
            aria-label={muted ? "Unmute" : "Mute"}
            className="play-btn w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/15 border border-white/30 flex items-center justify-center text-white"
          >
            {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </button>

          <button
            onClick={togglePlay}
            aria-label={playing ? "Pause" : "Play"}
            className="play-btn w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/15 border border-white/30 flex items-center justify-center text-white"
          >
            {playing
              ? <Pause size={14} />
              : <Play  size={14} className="translate-x-px" />
            }
          </button>

        </div>

      </section>
    </>
  );
}