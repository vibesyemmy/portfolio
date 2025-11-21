import React from "react";

const testimonials = [
  {
    quote: "I ran UX Buddy before my review — it caught three things I would've missed. The meeting went so much smoother.",
    author: "Chiamaka Okoro",
    role: "Product Designer",
  },
  {
    quote: "UX Buddy has become an essential part of my workflow. The feedback is always thoughtful and professional.",
    author: "Adebayo Adeyemi",
    role: "UX Designer",
  },
  {
    quote: "This is exactly what I've been looking for. Instant feedback without waiting for reviews. Game changer!",
    author: "Ifeoma Okafor",
    role: "Design Lead",
  },
];

export default function TestimonialCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
      {testimonials.map((testimonial, index) => (
        <div
          key={index}
          className="bg-neutral-900/50 backdrop-blur-md rounded-xl p-6 border border-neutral-800 hover:border-neutral-700 transition-colors flex flex-col"
        >
          <div className="flex-1 mb-4">
            <svg
              className="w-8 h-8 text-purple-400 mb-4"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.984zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
            </svg>
            <p className="text-neutral-300 text-base leading-relaxed italic">
              "{testimonial.quote}"
            </p>
          </div>
          <div className="mt-auto pt-4 border-t border-neutral-800">
            <p className="text-white font-medium">{testimonial.author}</p>
            <p className="text-neutral-400 text-sm">{testimonial.role}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

