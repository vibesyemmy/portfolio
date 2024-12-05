"use client";
import React from "react";

export function BackgroundLines() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute left-0 top-[calc(100%-120px)] h-[200px] w-[200px] animate-float rounded-3xl bg-gradient-to-r from-purple-400/40 to-purple-600/40 blur-3xl"></div>
      <div className="absolute right-0 top-[calc(100%-120px)] h-[200px] w-[200px] animate-float delay-1000 rounded-3xl bg-gradient-to-r from-purple-400/40 to-purple-600/40 blur-3xl"></div>
      <div className="h-full w-full bg-neutral-950 [background:radial-gradient(#1c1c1c_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]">
      </div>
    </div>
  );
}
