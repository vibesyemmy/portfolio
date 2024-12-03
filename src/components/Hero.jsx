import React from "react";
import { BackgroundBeams } from "./ui/background-beams";
import { InfiniteMovingLogos } from "./ui/infinite-moving-logos";

export default function Hero() {
  return (
    <div className="h-screen w-full rounded-md bg-black relative flex flex-col items-center justify-center antialiased px-4 sm:px-6 md:px-8">
      <div className="max-w-2xl mx-auto p-4">
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
      <div className="absolute bottom-20 w-full">
        <InfiniteMovingLogos />
      </div>
      <BackgroundBeams />
    </div>
  );
}
