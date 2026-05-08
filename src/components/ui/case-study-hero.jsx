import React from "react";
import { cn } from "../../utils/cn";
import { BlurImageBackground } from "./blur-image-background";

const VARIANT_OVERLAY = {
  composite: "bg-black/60",
  bounded: "bg-black/55",
  home: "bg-black/45",
  "before-state": "bg-black/65",
};

export default function CaseStudyHero({
  variant = "composite",
  image,
  alt = "",
  title,
  subtitle,
  children,
  className,
  contentClassName,
}) {
  const overlayClassName = VARIANT_OVERLAY[variant] || VARIANT_OVERLAY.composite;

  return (
    <BlurImageBackground
      imageSrc={image}
      className={cn(
        "min-h-[60vh] flex items-center justify-center pt-24 md:pt-16",
        className
      )}
      overlayClassName={overlayClassName}
    >
      {alt ? <span className="sr-only">{alt}</span> : null}
      <div
        className={cn(
          "max-w-7xl mx-auto px-4 py-8 md:py-16 relative z-10",
          contentClassName
        )}
      >
        {title ? (
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-white mb-6">
            {title}
          </h1>
        ) : null}
        {subtitle ? (
          <p className="text-neutral-200 text-center max-w-3xl mx-auto text-lg md:text-xl mb-12">
            {subtitle}
          </p>
        ) : null}
        {children}
      </div>
    </BlurImageBackground>
  );
}
