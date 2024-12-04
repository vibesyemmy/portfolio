import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";
import { cn } from "../utils/cn";
import UIGridImage from "../assets/UI-grid.png";
import MonoImage from "../assets/mono.png";

const ComingSoonTag = () => (
  <span className="px-4 py-1.5 rounded-full text-xs font-medium bg-gradient-to-r from-purple-600/80 to-purple-800/80 text-white border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
    Coming Soon
  </span>
);

const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] bg-neutral-900"></div>
);

const items = [
  {
    title: "Taming the Fintech Monster",
    description: "A unified UI system to streamline development, and enhance user experience.",
    header: (
      <div className="flex flex-1 w-full h-full min-h-[6rem]">
        <img 
          src={UIGridImage} 
          alt="UI Grid System" 
          className="w-full h-full object-cover"
        />
      </div>
    ),
    link: "/case-study/fintech-monster"
  },
  {
    title: "The Digital Revolution",
    description: "Dive into the transformative power of technology.",
    header: (
      <div className="relative w-full h-full">
        <div className="absolute inset-0 bg-neutral-900/50 backdrop-blur-[2px] z-10" />
        <div className="absolute top-4 left-4 z-20">
          <ComingSoonTag />
        </div>
        <div className="flex flex-1 w-full h-full min-h-[6rem]">
          <img 
            src={MonoImage} 
            alt="Mono Project" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    ),
    link: "#"
  },
  {
    title: "The Art of Design",
    description: "Exploring the intersection of aesthetics and functionality.",
    header: (
      <div className="relative w-full h-full">
        <div className="absolute inset-0 bg-neutral-900/50 backdrop-blur-[2px] z-10" />
        <div className="absolute top-4 left-4 z-20">
          <ComingSoonTag />
        </div>
        <Skeleton />
      </div>
    ),
    link: "#"
  },
  {
    title: "The Power of Communication",
    description: "Building bridges through effective dialogue and understanding.",
    header: (
      <div className="relative w-full h-full">
        <div className="absolute inset-0 bg-neutral-900/50 backdrop-blur-[2px] z-10" />
        <div className="absolute top-4 left-4 z-20">
          <ComingSoonTag />
        </div>
        <Skeleton />
      </div>
    ),
    link: "#"
  },
  {
    title: "The Pursuit of Knowledge",
    description: "A journey through learning and discovery.",
    header: (
      <div className="relative w-full h-full">
        <div className="absolute inset-0 bg-neutral-900/50 backdrop-blur-[2px] z-10" />
        <div className="absolute top-4 left-4 z-20">
          <ComingSoonTag />
        </div>
        <Skeleton />
      </div>
    ),
    link: "#"
  },
  {
    title: "The Joy of Creation",
    description: "Bringing ideas to life through innovation.",
    header: (
      <div className="relative w-full h-full">
        <div className="absolute inset-0 bg-neutral-900/50 backdrop-blur-[2px] z-10" />
        <div className="absolute top-4 left-4 z-20">
          <ComingSoonTag />
        </div>
        <Skeleton />
      </div>
    ),
    link: "#"
  },
  {
    title: "The Spirit of Adventure",
    description: "Embracing challenges and exploring new horizons.",
    header: (
      <div className="relative w-full h-full">
        <div className="absolute inset-0 bg-neutral-900/50 backdrop-blur-[2px] z-10" />
        <div className="absolute top-4 left-4 z-20">
          <ComingSoonTag />
        </div>
        <Skeleton />
      </div>
    ),
    link: "#"
  },
];

export default function Projects() {
  const navigate = useNavigate();

  const handleCardClick = (link) => {
    if (link === "#") {
      return;
    }
    navigate(link);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      const cards = document.getElementsByClassName("group/bento");
      for (const card of cards) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
      }
    };

    document.getElementById("projects").addEventListener("mousemove", handleMouseMove);
    return () => {
      document.getElementById("projects")?.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div id="projects" className="py-20 bg-black px-4 sm:px-6 md:px-8">
      <BentoGrid className="max-w-5xl mx-auto">
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={item.header}
            className={i === 3 || i === 6 ? "md:col-span-2" : ""}
            onClick={() => handleCardClick(item.link)}
          />
        ))}
      </BentoGrid>
    </div>
  );
}