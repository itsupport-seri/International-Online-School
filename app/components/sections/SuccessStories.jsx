"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star, Quote, ArrowRight, Users } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";

/* ── useInView ── */
function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
      },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ── Stories data (from inspected HTML) ── */
const stories = [
  {
    id: 1,
    href: "/success-stories/1",
    image: "/sucess/1.webp",
    alt: "Student athlete balancing football and studies",
    tag: "Sports & Academics",
    tagColor: "#0ea5e9",
    tagBg: "#e0f2fe",
    title: "He Almost Quit Football—Here's What Stopped Him",
    excerpt:
      "What happens when your child is trying to build a future in sport… but school doesn't support it? Discover how one family found a path that honoured both.",
    student: "Arjun, 17",
    location: "Mumbai, India",
    stars: 5,
  },
  {
    id: 2,
    href: "/success-stories/2",
    image: "/sucess/img1.webp",
    alt: "Student experiencing flexible learning",
    tag: "Flexible Learning",
    tagColor: "#8b5cf6",
    tagBg: "#ede9fe",
    title: "She Didn't Think Twice Before Choosing International Schooling",
    excerpt:
      "When Emily said this to her mother, her doubts slowly turned into confidence. A story of trust, transformation, and a curriculum that truly fits.",
    student: "Emily, 15",
    location: "Dubai, UAE",
    stars: 5,
  },
  {
    id: 3,
    href: "/success-stories/3",
    image: "/sucess/img1.webp",
    alt: "Student excited to learn",
    tag: "Renewed Passion",
    tagColor: "#059669",
    tagBg: "#d1fae5",
    title: "I Don't Feel Like Skipping School Anymore. I Feel Excited to Learn.",
    excerpt:
      "Every child deserves a safe learning environment. Here's how one student rediscovered joy in education through a curriculum built around them.",
    student: "Rohan, 14",
    location: "Bangalore, India",
    stars: 5,
  },
  {
    id: 4,
    href: "/success-stories/4",
    image: "/sucess/1.webp",
    alt: "Student studying internationally",
    tag: "Global Recognition",
    tagColor: "#f59e0b",
    tagBg: "#fef3c7",
    title: "From a Small Town to a Global Stage—Her Diploma Made It Possible",
    excerpt:
      "Geography was never a barrier. With an internationally recognised diploma, this student proved that ambition and the right school can take you anywhere.",
    student: "Priya, 18",
    location: "Jaipur, India",
    stars: 5,
  },
  {
    id: 5,
    href: "/success-stories/5",
    image: "/sucess/img1.webp",
    alt: "Student with anxiety finding support",
    tag: "Mental Wellness",
    tagColor: "#ec4899",
    tagBg: "#fce7f3",
    title: "Anxiety Kept Him from School—Until We Found One That Listened",
    excerpt:
      "For years, traditional school felt overwhelming. A personalised schedule and compassionate teachers changed everything. This is his story.",
    student: "Karan, 16",
    location: "Hyderabad, India",
    stars: 5,
  },
  {
    id: 6,
    href: "/success-stories/6",
    image: "/sucess/img1.webp",
    alt: "Student completing diploma online",
    tag: "Second Chance",
    tagColor: "#1d4ed8",
    tagBg: "#dbeafe",
    title: "She Dropped Out at 16—and Earned Her Diploma at 19 Online",
    excerpt:
      "Life doesn't always go to plan. But with the right support structure, even a detour can lead somewhere extraordinary. Meet a student who rewrote her story.",
    student: "Sara, 19",
    location: "Pune, India",
    stars: 5,
  },
];

/* ── Stats ── */
const stats = [
  { value: "10,000+", label: "Students Enrolled" },
  { value: "95%", label: "Satisfaction Rate" },
  { value: "50+", label: "Countries Reached" },
  { value: "100%", label: "Accredited Diploma" },
];

export default function SuccessStories() {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);

  const [headerRef, headerVisible] = useInView(0.15);
  const [statsRef, statsVisible] = useInView(0.1);
  const [sliderRef, sliderVisible] = useInView(0.08);
  const [ctaRef, ctaVisible] = useInView(0.1);

  return (
    <section
      id="success-stories"
      style={{
        position: "relative",
        overflow: "hidden",
        background: "#f8faff",
        borderTop: "1px solid #e0e7ff",
        borderBottom: "1px solid #e0e7ff",
      }}
    >
      {/* ── Background: subtle geometric lines + soft gradient ── */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        {/* Ambient gradient top-right */}
        <div style={{
          position: "absolute", top: 0, right: 0,
          width: "520px", height: "420px",
          background: "radial-gradient(ellipse at top right, rgba(59,130,246,0.07) 0%, transparent 68%)",
        }} />
        {/* Ambient gradient bottom-left */}
        <div style={{
          position: "absolute", bottom: 0, left: 0,
          width: "480px", height: "380px",
          background: "radial-gradient(ellipse at bottom left, rgba(139,92,246,0.06) 0%, transparent 65%)",
        }} />
        {/* Fine grid lines */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.45 }}>
          <defs>
            <pattern id="ssGrid" x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#c7d7f5" strokeWidth="0.6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#ssGrid)" />
        </svg>
        {/* Diagonal accent line top-left */}
        <svg style={{ position: "absolute", top: 0, left: 0, width: "340px", height: "200px", opacity: 0.18 }}
          viewBox="0 0 340 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="0" y1="200" x2="340" y2="0" stroke="#3b82f6" strokeWidth="1.5" />
          <line x1="40" y1="200" x2="340" y2="40" stroke="#3b82f6" strokeWidth="0.8" />
        </svg>
        {/* Diagonal accent line bottom-right */}
        <svg style={{ position: "absolute", bottom: 0, right: 0, width: "300px", height: "180px", opacity: 0.14 }}
          viewBox="0 0 300 180" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="300" y1="0" x2="0" y2="180" stroke="#8b5cf6" strokeWidth="1.5" />
          <line x1="260" y1="0" x2="0" y2="140" stroke="#8b5cf6" strokeWidth="0.8" />
        </svg>
        {/* Small dot cluster top-left */}
        <svg style={{ position: "absolute", top: "60px", left: "60px", width: "120px", height: "120px", opacity: 0.22 }}
          viewBox="0 0 120 120" fill="none">
          {[0,1,2,3,4].map(row => [0,1,2,3,4].map(col => (
            <circle key={`${row}-${col}`} cx={col*24+12} cy={row*24+12} r="2" fill="#3b82f6" />
          )))}
        </svg>
        {/* Small dot cluster bottom-right */}
        <svg style={{ position: "absolute", bottom: "80px", right: "80px", width: "100px", height: "100px", opacity: 0.18 }}
          viewBox="0 0 100 100" fill="none">
          {[0,1,2,3].map(row => [0,1,2,3].map(col => (
            <circle key={`${row}-${col}`} cx={col*24+12} cy={row*24+12} r="2" fill="#8b5cf6" />
          )))}
        </svg>
      </div>

      <div style={{ position: "relative", zIndex: 1, padding: "64px 20px 80px" }}>

        {/* ══ HEADER ══ */}
        <header
          ref={headerRef}
          style={{
            textAlign: "center",
            maxWidth: "680px",
            margin: "0 auto 56px",
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(28px)",
            transition: "opacity 0.75s ease, transform 0.75s ease",
          }}
        >
          {/* Pill badge */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "18px" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "7px",
              background: "rgba(37,99,235,0.07)", border: "1px solid rgba(37,99,235,0.18)",
              borderRadius: "999px", padding: "5px 18px",
            }}>
              <Users size={12} color="#2563eb" />
              <span style={{
                fontSize: "11px", fontWeight: 700, color: "#1d4ed8",
                textTransform: "uppercase", letterSpacing: "0.1em",
              }}>Real Journeys · Real Results</span>
            </div>
          </div>

          <h2 style={{
            fontSize: "clamp(2rem,4.5vw,3rem)", fontWeight: 800,
            color: "#0f172a", lineHeight: 1.15, letterSpacing: "-0.025em",
            marginBottom: "18px",
          }}>
            Success{" "}
            <span style={{
              background: "linear-gradient(130deg,#2563eb 0%,#7c3aed 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              backgroundClip: "text", position: "relative", display: "inline-block",
            }}>
              Stories
              {/* Underline SVG */}
              <svg aria-hidden="true"
                style={{ position: "absolute", bottom: "-8px", left: 0, width: "100%", overflow: "visible" }}
                height="8" viewBox="0 0 140 8" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="ssLine" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#2563eb" />
                    <stop offset="100%" stopColor="#7c3aed" />
                  </linearGradient>
                </defs>
                <path d="M0 7 Q35 1 70 6 Q105 11 140 4"
                  stroke="url(#ssLine)" strokeWidth="2.5" fill="none" strokeLinecap="round"
                  style={{
                    strokeDasharray: 160,
                    strokeDashoffset: headerVisible ? 0 : 160,
                    transition: "stroke-dashoffset 1.2s ease 0.45s",
                  }}
                />
              </svg>
            </span>
          </h2>
          <p style={{ fontSize: "clamp(0.95rem,2vw,1.1rem)", color: "#475569", lineHeight: 1.75 }}>
            Real journeys from students and families balancing ambition, academics, and support —
            each one a testament to what's possible with the right learning environment.
          </p>
        </header>

        {/* ══ STATS ROW ══ */}
        <div
          ref={statsRef}
          style={{
            maxWidth: "860px", margin: "0 auto 64px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))",
            gap: "1px",
            background: "#e2e8f0",
            borderRadius: "20px",
            overflow: "hidden",
            boxShadow: "0 4px 24px rgba(15,23,42,0.06)",
            opacity: statsVisible ? 1 : 0,
            transform: statsVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
          }}
        >
          {stats.map((s, i) => (
            <div key={i} style={{
              background: "#fff",
              padding: "24px 20px",
              textAlign: "center",
            }}>
              <p style={{
                fontSize: "clamp(1.5rem,3vw,2rem)", fontWeight: 800,
                background: "linear-gradient(130deg,#2563eb,#7c3aed)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                backgroundClip: "text", marginBottom: "4px",
              }}>{s.value}</p>
              <p style={{ fontSize: "12px", fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.07em" }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* ══ SWIPER SLIDER ══ */}
        <div
          ref={sliderRef}
          style={{
            maxWidth: "1160px", margin: "0 auto",
            opacity: sliderVisible ? 1 : 0,
            transform: sliderVisible ? "translateY(0)" : "translateY(36px)",
            transition: "opacity 0.75s ease 0.2s, transform 0.75s ease 0.2s",
          }}
        >
          {/* Slide counter + nav */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            marginBottom: "28px", flexWrap: "wrap", gap: "12px",
          }}>
            <div>
              <p style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: "#2563eb", marginBottom: "2px" }}>
                Student Journeys
              </p>
              <p style={{ fontSize: "13px", color: "#64748b" }}>
                Story <span style={{ fontWeight: 700, color: "#0f172a" }}>{activeIndex + 1}</span> of {stories.length}
              </p>
            </div>

            {/* Dot indicators */}
            <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
              {stories.map((_, i) => (
                <button
                  key={i}
                  onClick={() => swiperRef.current?.slideTo(i)}
                  aria-label={`Go to story ${i + 1}`}
                  style={{
                    height: "9px",
                    width: i === activeIndex ? "30px" : "9px",
                    borderRadius: "999px", border: "none",
                    cursor: "pointer", padding: 0,
                    background: i === activeIndex
                      ? "linear-gradient(90deg,#2563eb,#7c3aed)"
                      : "#cbd5e1",
                    transition: "width 0.35s ease, background 0.3s ease",
                  }}
                />
              ))}
            </div>

            {/* Prev / Next */}
            <div style={{ display: "flex", gap: "10px" }}>
              {[
                { label: "Previous story", icon: <ChevronLeft size={19} color="#1e40af" />, action: () => swiperRef.current?.slidePrev() },
                { label: "Next story", icon: <ChevronRight size={19} color="#1e40af" />, action: () => swiperRef.current?.slideNext() },
              ].map(({ label, icon, action }) => (
                <button key={label} onClick={action} aria-label={label}
                  style={{
                    width: "42px", height: "42px", borderRadius: "50%",
                    border: "1.5px solid #bfdbfe", background: "#eff6ff",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer", transition: "background 0.2s, border-color 0.2s, transform 0.2s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#dbeafe"; e.currentTarget.style.borderColor = "#93c5fd"; e.currentTarget.style.transform = "scale(1.08)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "#eff6ff"; e.currentTarget.style.borderColor = "#bfdbfe"; e.currentTarget.style.transform = "scale(1)"; }}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Swiper */}
          <Swiper
            onSwiper={s => (swiperRef.current = s)}
            onSlideChange={s => setActiveIndex(s.realIndex)}
            modules={[Autoplay, Pagination]}
            slidesPerView={1}
            spaceBetween={24}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            loop
            speed={700}
            breakpoints={{
              640:  { slidesPerView: 1.6, spaceBetween: 20 },
              900:  { slidesPerView: 2.2, spaceBetween: 24 },
              1100: { slidesPerView: 3,   spaceBetween: 28 },
            }}
            style={{ paddingBottom: "16px", paddingLeft: "4px", paddingRight: "4px" }}
          >
            {stories.map((story, i) => (
              <SwiperSlide key={story.id} style={{ height: "auto" }}>
                <a
                  href={story.href}
                  style={{ display: "block", height: "100%", textDecoration: "none" }}
                  onMouseEnter={() => setHoveredCard(i)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <article style={{
                    display: "flex", flexDirection: "column",
                    height: "100%",
                    background: "#fff",
                    borderRadius: "24px",
                    border: "1px solid #e2e8f0",
                    overflow: "hidden",
                    boxShadow: hoveredCard === i
                      ? "0 24px 60px rgba(37,99,235,0.13), 0 8px 24px rgba(15,23,42,0.08)"
                      : "0 4px 20px rgba(15,23,42,0.06)",
                    transform: hoveredCard === i ? "translateY(-6px)" : "translateY(0)",
                    transition: "transform 0.32s cubic-bezier(.22,.68,0,1.2), box-shadow 0.32s ease",
                  }}>
                    {/* Image */}
                    <div style={{ position: "relative", width: "100%", aspectRatio: "16/10", overflow: "hidden" }}>
                      <Image
                        src={story.image} alt={story.alt} fill loading="lazy"
                        sizes="(min-width:1100px) 33vw, (min-width:900px) 45vw, (min-width:640px) 55vw, 90vw"
                        style={{
                          objectFit: "cover", objectPosition: "center",
                          transform: hoveredCard === i ? "scale(1.06)" : "scale(1)",
                          transition: "transform 0.55s cubic-bezier(.22,.68,0,1.2)",
                        }}
                        quality={80}
                      />
                      {/* Gradient overlay */}
                      <div style={{
                        position: "absolute", inset: 0,
                        background: "linear-gradient(to top, rgba(15,23,42,0.60) 0%, rgba(15,23,42,0.05) 50%, transparent 100%)",
                      }} />
                      {/* Tag badge */}
                      <div style={{
                        position: "absolute", top: "14px", left: "14px",
                        background: story.tagBg,
                        border: `1px solid ${story.tagColor}33`,
                        borderRadius: "999px",
                        padding: "4px 12px",
                        display: "inline-flex", alignItems: "center", gap: "5px",
                      }}>
                        <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: story.tagColor, flexShrink: 0 }} />
                        <span style={{ fontSize: "10px", fontWeight: 700, color: story.tagColor, letterSpacing: "0.06em" }}>{story.tag}</span>
                      </div>
                      {/* Quote icon */}
                      <div style={{
                        position: "absolute", bottom: "14px", right: "14px",
                        width: "34px", height: "34px", borderRadius: "50%",
                        background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)",
                        border: "1px solid rgba(255,255,255,0.3)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        <Quote size={14} color="#fff" />
                      </div>
                    </div>

                    {/* Card body */}
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "22px 22px 20px" }}>
                      {/* Stars */}
                      <div style={{ display: "flex", gap: "3px", marginBottom: "12px" }}>
                        {Array.from({ length: story.stars }).map((_, si) => (
                          <Star key={si} size={12} color="#f59e0b" fill="#f59e0b" />
                        ))}
                      </div>

                      <h3 style={{
                        fontSize: "clamp(0.9rem,1.6vw,1rem)", fontWeight: 700,
                        color: "#0f172a", lineHeight: 1.45, marginBottom: "10px",
                        display: "-webkit-box", WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical", overflow: "hidden",
                      }}>
                        "{story.title}"
                      </h3>
                      <p style={{
                        fontSize: "13px", color: "#64748b", lineHeight: 1.7,
                        marginBottom: "18px", flex: 1,
                        display: "-webkit-box", WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical", overflow: "hidden",
                      }}>
                        {story.excerpt}
                      </p>

                      {/* Footer row */}
                      <div style={{
                        display: "flex", alignItems: "center",
                        justifyContent: "space-between",
                        paddingTop: "14px",
                        borderTop: "1px solid #f1f5f9",
                      }}>
                        <div>
                          <p style={{ fontSize: "12px", fontWeight: 700, color: "#0f172a", marginBottom: "1px" }}>{story.student}</p>
                          <p style={{ fontSize: "11px", color: "#94a3b8" }}>{story.location}</p>
                        </div>
                        <div style={{
                          display: "inline-flex", alignItems: "center", gap: "4px",
                          padding: "7px 14px",
                          borderRadius: "999px",
                          border: hoveredCard === i ? "1.5px solid #2563eb" : "1.5px solid #e2e8f0",
                          color: hoveredCard === i ? "#2563eb" : "#64748b",
                          fontSize: "11px", fontWeight: 700,
                          transition: "all 0.22s ease",
                          background: hoveredCard === i ? "#eff6ff" : "transparent",
                        }}>
                          Read Story <ArrowRight size={11} />
                        </div>
                      </div>
                    </div>
                  </article>
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* ══ CTA ══ */}
        <div
          ref={ctaRef}
          style={{
            textAlign: "center", marginTop: "56px",
            opacity: ctaVisible ? 1 : 0,
            transform: ctaVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
          }}
        >
          <a
            href="https://internationalschooling.org/success-stories"
            target="_blank"
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "14px 36px",
              borderRadius: "999px",
              background: "linear-gradient(135deg,#2563eb 0%,#7c3aed 100%)",
              color: "#fff",
              fontSize: "14px", fontWeight: 700,
              textDecoration: "none",
              boxShadow: "0 8px 28px rgba(37,99,235,0.30)",
              transition: "box-shadow 0.25s, transform 0.25s",
            }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 14px 40px rgba(37,99,235,0.42)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 8px 28px rgba(37,99,235,0.30)"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            View All Stories <ArrowRight size={15} />
          </a>
        </div>

      </div>

      <style>{`
        .swiper-slide { height: auto !important; }
      `}</style>
    </section>
  );
}