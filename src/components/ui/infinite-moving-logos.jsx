import React from "react";
import arenaGaming from "../../assets/logos/arena-gaming 1-200h.png";
import circuit from "../../assets/logos/ggcircuit 2-200h.png";
import hydrogen from "../../assets/logos/hydrogen 1-200h.png";
import kobo from "../../assets/logos/kobo-1 2-200h.png";
import phonecash from "../../assets/logos/phonecash 1-200h.png";
import tunnel from "../../assets/logos/tunnel-1 1-200h.png";

const logos = [
  {
    url: arenaGaming,
    alt: "Arena Gaming",
  },
  {
    url: circuit,
    alt: "Circuit",
  },
  {
    url: hydrogen,
    alt: "Hydrogen",
  },
  {
    url: kobo,
    alt: "Kobo",
  },
  {
    url: phonecash,
    alt: "Phonecash",
  },
  {
    url: tunnel,
    alt: "Tunnel",
  },
];

export const InfiniteMovingLogos = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-8 py-8">
      <p className="text-center text-sm md:text-base text-muted-foreground">
        I've collaborated with teams from the businesses below
      </p>
      <div className="grid grid-cols-3 items-center justify-items-center gap-x-8 md:gap-x-16 gap-y-6 md:gap-y-8 md:flex md:flex-wrap md:justify-center">
        {logos.map((logo, idx) => (
          <div
            key={idx}
            className="relative h-[24px] md:h-[32px] w-auto grayscale hover:grayscale-0 transition-all duration-200 cursor-pointer group"
          >
            <img
              src={logo.url}
              alt={logo.alt}
              className="object-contain h-full max-h-[24px] md:max-h-[32px] w-auto"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-xs text-white bg-black/50 px-2 py-1 rounded">
                {logo.alt}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
