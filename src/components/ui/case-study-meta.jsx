import React from "react";

export default function CaseStudyMeta({ items, className = "grid grid-cols-2 md:grid-cols-4 gap-8 max-w-7xl mx-auto" }) {
  return (
    <dl className={className}>
      {items.map(({ label, value }, i) => (
        <div key={i} className="text-center">
          <dt className="text-sm uppercase tracking-wider text-neutral-400 mb-2">{label}</dt>
          <dd className="m-0 text-white font-medium">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
