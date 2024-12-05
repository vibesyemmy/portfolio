"use client";
import React from "react";
import { cn } from "../../../utils/cn";

export const BackgroundBeamsDemo = () => {
  return (
    <div className="h-[40rem] w-full bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold">
          Backgrounds
        </h1>
        <p></p>
      </div>
      <BackgroundBeams />
    </div>
  );
};

export const BackgroundBeams = ({ className }: { className?: string }) => {
  const paths = [
    "M-380 -189C-380 -189 -312 216 152 343C616 470 684 875 684 875",
    "M-373 -197C-373 -197 -305 208 159 335C623 462 691 867 691 867",
    "M-366 -205C-366 -205 -298 200 166 327C630 454 698 859 698 859",
    "M-359 -213C-359 -213 -291 192 173 319C637 446 705 851 705 851",
    "M-352 -221C-352 -221 -284 184 180 311C644 438 712 843 712 843",
    "M-345 -229C-345 -229 -277 176 187 303C651 430 719 835 719 835",
    "M-338 -237C-338 -237 -270 168 194 295C658 422 726 827 726 827",
    "M-331 -245C-331 -245 -263 160 201 287C665 414 733 819 733 819",
    "M-324 -253C-324 -253 -256 152 208 279C672 406 740 811 740 811",
    "M-317 -261C-317 -261 -249 144 215 271C679 398 747 803 747 803",
  ];
  
  return (
    <div className={cn("absolute inset-0 flex items-center justify-center [perspective:1000px] opacity-70", className)}>
      <div className="relative w-full h-full">
        {paths.map((path, index) => (
          <svg
            key={index}
            className={cn(
              "absolute inset-0 h-full w-full",
              index % 2 === 0 ? "animate-beam-fast" : "animate-beam-slow"
            )}
            width="100%"
            height="100%"
            viewBox="0 0 300 300"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              opacity: 0.05 - index * 0.005,
            }}
          >
            <path
              d={path}
              stroke="currentColor"
              strokeOpacity="0.2"
              strokeWidth="1"
              fill="none"
            />
          </svg>
        ))}
      </div>
    </div>
  );
};
