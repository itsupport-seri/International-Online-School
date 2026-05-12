"use client";

export default function FeeStructureSection() {
  return (
    <section className="bg-white py-16 sm:py-20 relative overflow-hidden">

      {/* Subtle Background Accent */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-red-50 rounded-full blur-3xl opacity-50" />

      <div className="relative max-w-5xl mx-auto px-5 sm:px-8 text-center">

        {/* Heading */}
        <p className="text-[#b11226] font-medium uppercase tracking-wide text-sm">
          Keystone Fee Structure
        </p>

        <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
          Transparent & Structured Fee Plan
        </h2>

        {/* Description */}
        <p className="mt-4 text-gray-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
          We believe in complete transparency when it comes to our fee structure. 
          Explore detailed information about tuition, facilities, and other components 
          designed to support your child’s holistic development.
        </p>

        {/* CTA */}
        <div className="mt-8">
          <a
            href="https://www.keystoneeducation.in/admissions"
            className="inline-block bg-[#b11226] text-white px-8 py-3 rounded-full text-sm sm:text-base font-medium 
            transition-all duration-300 ease-in-out transform 
            hover:scale-110 hover:shadow-xl 
            active:scale-95 
            animate-bounce-soft"
          >
            Know More
          </a>
        </div>

      </div>
    </section>
  );
}