import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";
import { cn } from "../utils/cn";
import OptimizedImage from './ui/optimized-image';

const ComingSoonTag = () => (
  <span 
    className="px-4 py-1.5 rounded-full text-xs font-medium bg-gradient-to-r from-purple-600/80 to-purple-800/80 text-white border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.2)]"
    tabIndex="-1"
    aria-label="Project status: Coming Soon"
  >
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
    category: "design",
    header: (
      <div className="flex flex-1 w-full h-full min-h-[6rem]">
        <OptimizedImage 
          src="/images/UI-grid.png"
          alt="UI Grid System" 
          className="w-full h-full"
          priority={true}
        />
      </div>
    ),
    link: "/fintech-monster"
  },
  {
    title: "Crafting a Hotel Entertainment Hub",
    description: "Creating a delightful entertainment experience for hotel guests.",
    category: "design",
    header: (
      <div className="flex flex-1 w-full h-full min-h-[6rem]">
        <OptimizedImage 
          src="/images/hotel-entertainment-hub.png"
          alt="Hotel Entertainment Hub" 
          className="w-full h-full"
          priority={true}
        />
      </div>
    ),
    link: "/hotel-hub"
  },
  {
    title: "PhoneCash: A Fintech Solution",
    description: "Revolutionizing Mobile Money Transfers in Africa",
    category: "design",
    header: (
      <div className="relative w-full h-full">
        <div className="flex flex-1 w-full h-full min-h-[6rem]">
          <OptimizedImage 
            src="/images/phonecash.webp"
            alt="PhoneCash Project" 
            className="w-full h-full"
            priority={true}
          />
        </div>
      </div>
    ),
    link: "/phonecash"
  },
  {
    title: "FlatMagic: Figma Plugin",
    description: "A Figma plugin that transforms complex frame structures into single, flattened images with just one click.",
    category: "development",
    header: (
      <div className="flex flex-1 w-full h-full min-h-[6rem]">
        <OptimizedImage 
          src="/images/flatmagicbg.png"
          alt="FlatMagic Figma Plugin" 
          className="w-full h-full"
          priority={true}
        />
      </div>
    ),
    link: "/flatmagic"
  },
  {
    title: "UX Buddy: AI-Powered UX Analysis",
    description: "An intelligent Figma plugin that provides real-time UX analysis and actionable design recommendations using Claude AI.",
    category: "development",
    header: (
      <div className="flex flex-1 w-full h-full min-h-[6rem]">
        <OptimizedImage 
          src="/images/UX-buddy.png"
          alt="UX Buddy"
          className="w-full h-full"
          priority={true}
        />
      </div>
    ),
    link: "/ux-buddy"
  },
  {
    title: "The Pursuit of Knowledge",
    description: "A journey through learning and discovery.",
    category: "design",
    isComingSoon: true,
    header: (
      <div className="relative w-full h-full" tabIndex="-1">
        <div className="absolute inset-0 bg-neutral-900/50 backdrop-blur-[2px] z-10" tabIndex="-1" />
        <div className="absolute top-4 left-4 z-20" tabIndex="-1">
          <ComingSoonTag />
        </div>
        <div className="flex flex-1 w-full h-full min-h-[6rem]" tabIndex="-1">
          <OptimizedImage 
            src="/images/phonecash.webp"
            alt="PhoneCash Project" 
            className="w-full h-full"
            priority={true}
          />
        </div>
      </div>
    ),
    link: "#"
  },
  {
    title: "The Joy of Creation",
    description: "Bringing ideas to life through innovation.",
    category: "development",
    isComingSoon: true,
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
            <source src="/images/p6.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    ),
    link: "#"
  },
];

const tabs = [
  { id: "all", label: "All Projects" },
  { id: "design", label: "Design" },
  { id: "development", label: "Development" }
];

export default function Projects() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");

  const handleCardClick = (link) => {
    if (link === "#") {
      return;
    }
    navigate(link);
  };

  const filteredItems = activeTab === "all" 
    ? items 
    : items.filter(item => item.category === activeTab);

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
    <div id="projects" className="py-20 bg-neutral-950">
      <div className="max-w-6xl mx-auto px-4">
        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center gap-2 p-1 bg-neutral-900/50 backdrop-blur-md rounded-lg border border-neutral-800">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "px-6 py-2.5 rounded-md text-sm font-medium transition-all duration-200",
                  activeTab === tab.id
                    ? "bg-[#232A39] text-white shadow-lg"
                    : "text-neutral-400 hover:text-white hover:bg-neutral-800/50"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <BentoGrid className="max-w-5xl mx-auto">
            {filteredItems.map((item, i) => {
              const originalIndex = items.indexOf(item);
              return (
                <BentoGridItem
                  key={originalIndex}
                  title={item.title}
                  description={item.description}
                  header={item.header}
                  className={originalIndex === 3 || originalIndex === 6 ? "md:col-span-2" : ""}
                  onClick={() => handleCardClick(item.link)}
                  isComingSoon={item.isComingSoon}
                />
              );
            })}
          </BentoGrid>
        </motion.div>
      </div>
    </div>
  );
}