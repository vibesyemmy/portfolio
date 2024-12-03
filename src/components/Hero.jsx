import React from "react";
import { BackgroundBeams } from "./ui/background-beams";
import { InfiniteMovingLogos } from "./ui/infinite-moving-logos";
import { HoverBorderGradient } from "./ui/hover-border-gradient";
import AvatarImage from "../assets/avatar.png";

export default function Hero() {
  return (
    <div className="h-screen w-full relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-2xl mx-auto p-4">
        <div className="relative z-10 w-[180px] h-[180px] md:w-[200px] md:h-[200px] lg:w-[240px] lg:h-[240px] mx-auto mb-8">
          <HoverBorderGradient>
            <img 
              src={AvatarImage} 
              alt="Opeyemi Avatar" 
              className="w-full h-full object-cover rounded-full bg-neutral-950"
            />
          </HoverBorderGradient>
        </div>
        <h1 className="relative z-10 text-3xl sm:text-5xl md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold">
          Product Designer
        </h1>
        <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm sm:text-base md:text-lg text-center relative z-10">
          Hello, I'm Opeyemi.
        </p>
        <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm sm:text-base md:text-lg text-center relative z-10">
          I craft digital products that empower people and drive business growth.
        </p>
      </div>
      <div className="absolute bottom-5 w-full z-10">
        <InfiniteMovingLogos />
      </div>
      <BackgroundBeams />
    </div>
  );
}
