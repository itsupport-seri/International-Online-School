"use client";

export default function ExperienceSection() {
  return (
    <section className="bg-[#f9fafb] py-16 sm:py-20">
      
      <div className="max-w-5xl mx-auto px-5 sm:px-8">

        {/* Card Container */}
        <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-8 sm:p-12 text-center relative overflow-hidden">

          {/* Decorative top line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-[#b11226]" />

          {/* Small Label */}
          <p className="text-[#b11226] font-medium text-sm tracking-wide uppercase">
            Book a Keystone Experience
          </p>

          {/* Heading */}
          <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-snug">
            Explore Our Campus & Community
          </h2>

          {/* Description */}
          <p className="mt-4 text-gray-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Join us for a walk around our green campus and discover what makes Keystone special. 
            Experience our learning environment, explore our programmes, and connect with our 
            Admission and Leadership team.
          </p>

          {/* CTA Button */}
          <div className="mt-8">
            <a
  href="https://www.keystoneeducation.in/admissions"
  className="inline-block bg-[#b11226] text-white px-8 py-3 rounded-full text-sm sm:text-base font-medium 
  hover:bg-red-700 transition transform hover:scale-105 active:scale-95 animate-pulse-slow"
>
  Explore Now
</a>
          </div>

        </div>

      </div>
    </section>
  );
}