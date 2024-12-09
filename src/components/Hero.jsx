import React from "react";
import { InfiniteMovingLogos } from "./ui/infinite-moving-logos";
import { HoverBorderGradient } from "./ui/hover-border-gradient";
import { AnimatedPin } from "./ui/animated-pin";
import AvatarImage from "../assets/avatar.png";
import BgVideo from "../assets/bg-video.mp4";

export default function Hero() {
  return (
    <div className="xs:h-[150vh] h-[105vh] md:h-screen w-full relative flex flex-col items-center justify-center antialiased">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-100"
      >
        <source src={BgVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="max-w-6xl mx-auto px-4 relative z-10 py-12 md:py-0">
        <div className="relative z-10 w-[140px] h-[140px] md:w-[200px] md:h-[200px] lg:w-[240px] lg:h-[240px] mx-auto mb-6 md:mb-8">
          <AnimatedPin>
            <HoverBorderGradient>
              <div className="w-full h-full rounded-full bg-neutral-900 overflow-hidden">
                <img 
                  src={AvatarImage} 
                  alt="Opeyemi Ajagbe" 
                  className="w-full h-full object-cover rounded-full bg-neutral-950"
                  loading="eager"
                  decoding="async"
                />
              </div>
            </HoverBorderGradient>
          </AnimatedPin>
        </div>
        <h1 className="relative z-10 text-3xl sm:text-5xl md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold">
          Senior Product Designer
        </h1>
        <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm sm:text-base md:text-lg text-center relative z-10">
          Hello, I'm Opeyemi.
        </p>
        <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm sm:text-base md:text-lg text-center relative z-10">
          I craft digital products that empower people and drive business growth.
        </p>
      </div>
      <div className="absolute bottom-4 md:bottom-5 w-full z-10">
        <InfiniteMovingLogos />
      </div>
    </div>
  );
}
