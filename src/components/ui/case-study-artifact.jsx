import React from "react";
import { cn } from "../../utils/cn";

const RATIO_CLASS = {
  "16:9": "aspect-[16/9]",
  "4:3": "aspect-[4/3]",
  "1:1": "aspect-square",
  "9:16": "aspect-[9/16]",
};

export default function CaseStudyArtifact({
  ratio = "16:9",
  src,
  alt,
  caption,
  className,
  imgClassName,
  loading = "lazy",
}) {
  const aspect = RATIO_CLASS[ratio] || RATIO_CLASS["16:9"];

  return (
    <figure className={cn("mt-8", className)}>
      <div className={cn("rounded-lg overflow-hidden bg-neutral-900/40", aspect)}>
        <img
          src={src}
          alt={alt}
          loading={loading}
          className={cn("w-full h-full object-cover", imgClassName)}
        />
      </div>
      {caption ? (
        <figcaption className="mt-3 text-sm md:text-base text-neutral-400 leading-relaxed">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
