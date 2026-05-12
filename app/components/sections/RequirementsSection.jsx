"use client";

import { CheckCircle, Clock } from "lucide-react";

export default function RequirementsSection() {
  return (
    <section className="bg-white py-16 sm:py-20">
      
      <div className="max-w-6xl mx-auto px-5 sm:px-8">

        {/* Heading */}
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Requirements
          </h2>

          <div className="mt-3 w-16 h-1 bg-[#b11226] mx-auto rounded-full" />
        </div>

        {/* Content */}
        <div className="mt-12 grid gap-10 lg:grid-cols-2">

          {/* LEFT — Documents */}
          <div>

            <h3 className="text-lg font-semibold text-[#b11226] mb-5">
              Required Documents
            </h3>

            <div className="space-y-4">
              {[
                "2 passport-size photographs of the student and each parent",
                "Photocopy of the last academic report card",
                "Copy of the student's Birth Certificate",
                "Original School Leaving Certificate from the previous school",
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-4 border border-gray-200 rounded-xl hover:border-[#b11226] hover:bg-red-50 transition"
                >
                  <CheckCircle className="w-5 h-5 text-[#b11226] mt-0.5" />

                  <p className="text-gray-700 text-sm sm:text-base">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Visit Timing */}
          <div className="bg-red-50 border border-red-100 rounded-2xl p-6 sm:p-8">

            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-5 h-5 text-[#b11226]" />

              <h3 className="text-lg font-semibold text-[#b11226]">
                School Visit Timings
              </h3>
            </div>

            <p className="text-gray-700 mb-4">
              You are welcome to visit the school campus during the following hours:
            </p>

            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <p className="text-gray-600 text-sm">
                Monday to Saturday
              </p>

              <p className="text-xl font-semibold text-gray-900 mt-1">
                9:00 AM – 4:00 PM
              </p>
            </div>

            {/* CTA */}
            <button className="mt-6 bg-[#b11226] text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-red-700 transition">
              Book a Visit
            </button>

          </div>

        </div>
      </div>
    </section>
  );
}