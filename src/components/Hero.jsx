import React from "react";
import { InfiniteMovingLogos } from "./ui/infinite-moving-logos";
import { HoverBorderGradient } from "./ui/hover-border-gradient";
import { AnimatedPin } from "./ui/animated-pin";
import HeroVideo from "../assets/hero-video.mp4";
import { BackgroundBeams } from "./ui/background-beams.tsx";

export default function Hero() {
  return (
    <>
      <div className="xs:h-[150vh] h-[105vh] md:h-screen w-full relative flex flex-col items-center justify-center antialiased overflow-hidden">
        {/* Background with enhanced opacity for mobile */}
        <div className="absolute inset-0 w-full h-full bg-neutral-950">
          <BackgroundBeams className="opacity-75 sm:opacity-85 md:opacity-90" />
        </div>
        
        <div className="max-w-6xl mx-auto px-4 relative z-10 py-12 md:py-0">
          <div className="relative z-10 w-[140px] h-[140px] md:w-[200px] md:h-[200px] lg:w-[240px] lg:h-[240px] mx-auto mb-6 md:mb-8">
            <AnimatedPin>
              <HoverBorderGradient>
                <div className="w-full h-full rounded-full bg-neutral-900 overflow-hidden">
                  <video 
                    src={HeroVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover rounded-full bg-neutral-950"
                    aria-label="Profile video"
                  />
                </div>
              </HoverBorderGradient>
            </AnimatedPin>
          </div>
          <h1 className="relative z-10 text-3xl sm:text-5xl md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold">
            Opeyemi Ajagbe
          </h1>
          <p className="text-neutral-400 max-w-2xl mx-auto mt-3 text-base sm:text-lg md:text-xl text-center relative z-10">
            Senior Product Designer
          </p>
          <p className="text-neutral-300 max-w-2xl mx-auto mt-6 text-sm sm:text-base md:text-lg text-center relative z-10 leading-relaxed">
            I design B2B platforms, fintech tools, and operating systems for ops teams. Ten years of work across supply chains, payments, logistics, and gaming. Case studies below.
          </p>
        </div>
        <div className="absolute bottom-4 md:bottom-5 w-full z-10">
          <InfiniteMovingLogos />
        </div>
      </div>
    </>
  );
}
