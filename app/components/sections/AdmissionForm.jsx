"use client";

import { useState } from "react";

export default function AdmissionForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    grade: "",
    phone: "",
    childName: "",
    year: "",
    message: "",
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <section className="relative py-20 bg-gray-100">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage:
            "url('https://static.wixstatic.com/media/2139b1_8555dfb9407e43ce9101708264ea8658~mv2.jpg')",
        }}
      />

      <div className="relative max-w-3xl mx-auto px-6">

        <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-xl">

          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">
            Please fill in the form details below
          </h2>

          <form className="space-y-5">

            {/* Name */}
            <input
              type="text"
              name="name"
              placeholder="Parent Name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#b11226] outline-none transition"
              required
            />

            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#b11226]"
              required
            />

            {/* Dropdown Grade */}
            <select
              name="grade"
              value={form.grade}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#b11226]"
              required
            >
              <option value="">Select Grade</option>
              <option>Nursery</option>
              <option>PP1</option>
              <option>PP2</option>
              <option>Grade 1</option>
              <option>Grade 2</option>
              <option>Grade 3</option>
              <option>Grade 4</option>
              <option>Grade 5</option>
              <option>Grade 6</option>
              <option>Grade 7</option>
              <option>Grade 8</option>
              <option>Grade 9</option>
              <option>Grade 10</option>
              <option>Grade 11</option>
              <option>Grade 12</option>
            </select>

            {/* Phone */}
            <input
              type="tel"
              name="phone"
              placeholder="Contact Number"
              value={form.phone}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#b11226]"
              required
            />

            {/* Child Name */}
            <input
              type="text"
              name="childName"
              placeholder="Child's Name"
              value={form.childName}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#b11226]"
              required
            />

            {/* Academic Year */}
            <select
              name="year"
              value={form.year}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#b11226]"
              required
            >
              <option value="">Academic Year</option>
              <option>Mid Term 2025</option>
              <option>AY 2026 - 2027</option>
            </select>

            {/* Message */}
            <textarea
              name="message"
              placeholder="Message (optional)"
              value={form.message}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#b11226]"
            />

            {/* Checkbox */}
            <label className="flex items-start gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                name="agree"
                checked={form.agree}
                onChange={handleChange}
                className="mt-1 accent-[#b11226]"
                required
              />
              By clicking, you authorize us to contact you via call/email/SMS.
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#b11226] text-white py-3 rounded-full font-medium 
              transition-all duration-300 
              hover:scale-105 hover:shadow-lg 
              active:scale-95"
            >
              Submit
            </button>

          </form>
        </div>
      </div>
    </section>
  );
}