"use client";

import { useState } from "react";
import { HelpCircle, Plus } from "lucide-react";

const faqs = [
  {
    q: "What is International Schooling?",
    a: "International Schooling offers an American curriculum globally, accredited by Cognia & WASC."
  },
  {
    q: "Is the school accredited?",
    a: "Yes, it is accredited by Cognia (AdvancED)."
  },
  {
    q: "Do students need advanced technical skills?",
    a: "No, basic computer knowledge is enough."
  },
  {
    q: "What is SAT?",
    a: "SAT is a standardized test for college admissions."
  },
  {
    q: "What is AP?",
    a: "AP courses are advanced, college-level subjects."
  },
  {
    q: "How are classes conducted?",
    a: "Through an online Learning Management System."
  }
];

export default function FAQSection1() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-[#f9fafb] py-16 sm:py-20">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">

        <div className="bg-white border border-gray-200 rounded-3xl p-8 sm:p-12 shadow-sm">

          <div className="absolute top-0 left-0 w-full h-1 bg-[#b11226]" />

          <div className="flex justify-center mb-4">
            <div className="bg-[#b11226]/10 p-4 rounded-full animate-pulse">
              <HelpCircle className="w-6 h-6 text-[#b11226]" />
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-center">
            Frequently Asked Questions
          </h2>

          <div className="mt-10 space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-red-200 rounded-xl">

                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center p-4"
                >
                  <span>{faq.q}</span>

                  <Plus
                    className={`transition ${
                      openIndex === index ? "rotate-45 text-red-600" : ""
                    }`}
                  />
                </button>

                <div
                  className={`transition-all duration-300 ${
                    openIndex === index
                      ? "max-h-40 p-4"
                      : "max-h-0 overflow-hidden"
                  }`}
                >
                  <p className="text-sm text-gray-600">{faq.a}</p>
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}