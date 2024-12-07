import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";
import { cn } from "../utils/cn";
import UIGridImage from "../assets/UI-grid.png";
import MonoImage from "../assets/mono.png";
import P3Image from "../assets/p3.png";
import P4Video from "../assets/p4.mp4";
import PhoneCashImage from "../assets/phonecash.webp";
import P6Video from "../assets/p6.mp4";
import P7Image from "../assets/p7.png";
import HotelHeroImage from "../assets/hotel-hero.png";

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
    title: "Crafting a Hotel Entertainment Hub",
    description: "Creating a delightful entertainment experience for hotel guests.",
    header: (
      <div className="flex flex-1 w-full h-full min-h-[6rem]">
        <img 
          src={MonoImage} 
          alt="Hotel Entertainment Hub" 
          className="w-full h-full object-cover"
        />
      </div>
    ),
    link: "/case-study/hotel-entertainment"
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
        <div className="flex flex-1 w-full h-full min-h-[6rem]">
          <img 
            src={P3Image} 
            alt="Art of Design Project" 
            className="w-full h-full object-cover"
          />
        </div>
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
        <div className="flex flex-1 w-full h-full min-h-[6rem] overflow-hidden">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={P4Video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
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
        <div className="flex flex-1 w-full h-full min-h-[6rem]">
          <img 
            src={PhoneCashImage} 
            alt="PhoneCash Project" 
            className="w-full h-full object-cover"
          />
        </div>
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
        <div className="flex flex-1 w-full h-full min-h-[6rem] overflow-hidden">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={P6Video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    ),
    link: "#"
  },
  {
    title: "The Future of Design",
    description: "Shaping tomorrow's digital experiences today.",
    header: (
      <div className="relative w-full h-full">
        <div className="absolute inset-0 bg-neutral-900/50 backdrop-blur-[2px] z-10" />
        <div className="absolute top-4 left-4 z-20">
          <ComingSoonTag />
        </div>
        <div className="flex flex-1 w-full h-full min-h-[6rem]">
          <img 
            src={P7Image} 
            alt="Future of Design Project" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    ),
    link: "#"
  },
  {
    title: "Poseidon: Taming the Fintech Sea Monster",
    description: "A Design System Case Study",
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
    title: "Crafting a Hotel Entertainment Hub That Delights",
    description: "A UX Case Study",
    header: (
      <div className="flex flex-1 w-full h-full min-h-[6rem]">
        <img 
          src={HotelHeroImage} 
          alt="Hotel Entertainment Hub" 
          className="w-full h-full object-cover"
        />
      </div>
    ),
    link: "/case-study/hotel-entertainment"
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
    <div id="projects" className="py-20 bg-black">
      <div className="max-w-6xl mx-auto px-4">
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
    </div>
  );
}