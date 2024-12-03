"use client";
import React from "react";
import { cn } from "../../utils/cn";

export const HoverBorderGradient = ({
  children,
  className,
  containerClassName,
}) => {
  return (
    <div
      className={cn(
        "group relative rounded-full p-[2px]",
        containerClassName
      )}
    >
      {/* Permanent glowing border */}
      <div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-[#4c00ff] to-[#6c0075] opacity-75 blur-sm"
        style={{
          background:
            "linear-gradient(to right, #4c00ff, #6c0075)",
        }}
      />
      <div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-[#4c00ff] to-[#6c0075]"
        style={{
          background:
            "linear-gradient(to right, #4c00ff, #6c0075)",
        }}
      />

      {/* Hover effect - additional glow */}
      <div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-[#4c00ff] to-[#6c0075] opacity-0 blur-xl transition-all duration-300 group-hover:opacity-75"
        style={{
          background:
            "linear-gradient(to right, #4c00ff, #6c0075)",
        }}
      />

      {/* Content container */}
      <div className={cn("relative rounded-full bg-neutral-950 p-[1px]", className)}>
        {children}
      </div>
    </div>
  );
};
