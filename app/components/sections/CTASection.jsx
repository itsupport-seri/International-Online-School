"use client";

export default function CTASection() {
  return (
    <section className="relative overflow-hidden py-14 md:py-20">
      
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700" />

      {/* Glow elements */}
      <div className="absolute -top-20 left-10 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="absolute bottom-0 right-10 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4">
        
        {/* Card */}
        <div className="rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl p-6 md:p-12">
          
          <div className="flex flex-col items-center text-center gap-6 md:flex-row md:text-left md:justify-between">
            
            {/* Left Content */}
            <div className="max-w-xl">
              
              <h2 className="text-2xl font-bold text-white md:text-4xl leading-tight">
                Give Your Child the Education They{" "}
                <span className="text-emerald-300">Deserve</span>
              </h2>

              <p className="mt-4 text-sm text-blue-100 md:text-base">
                Start your child’s journey with a globally recognized curriculum,
                expert teachers, and flexible learning designed for success.
              </p>

              {/* Badge */}
              <div className="mt-5 inline-block rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-emerald-600 shadow-sm md:text-sm">
                Enrolment Open Now | Limited Seats Available
              </div>
            </div>

            {/* Right CTA */}
            <div className="flex flex-col items-center gap-4 md:items-end">
              
              <a
                href="#book-demo"
                className="group inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-semibold text-blue-800 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl md:text-base"
              >
                Book Free Demo
                <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>

              <span className="text-xs text-blue-100">
                Takes only 2 minutes
              </span>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}