"use client";
import React from "react";
import { cn } from "../../utils/cn";

export function BackgroundBeams({ className }) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden bg-neutral-950", className)}>
      <div className="absolute top-0 left-0 w-full h-full">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="animate-beam absolute h-px opacity-50"
            style={{
              left: "50%",
              top: "50%",
              width: "120%",
              transform: `translate(-50%, -50%) rotate(${i * 9}deg)`,
              background: "linear-gradient(90deg, transparent 0%, #4c00ff 50%, transparent 100%)",
            }}
          />
        ))}
      </div>
      <div className="absolute inset-0 bg-neutral-950 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
    </div>
  );
}
