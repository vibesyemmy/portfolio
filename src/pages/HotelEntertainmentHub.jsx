import React from "react";
import { AnimatedTooltip } from "../components/ui/animated-tooltip";
import { BlurImageBackground } from "../components/ui/blur-image-background";
import { BoltIcon, SwatchIcon, HeartIcon } from "@heroicons/react/24/outline/index.js";
import { useState, useEffect } from "react";
import { useColor } from 'color-thief-react';

const teamMembers = [
  {
    name: "Opeyemi Ajagbe",
    designation: "Product Designer",
    image: "/images/avatar.png",
  },
  // Add other team members if needed
];

export default function HotelEntertainmentHub() {
  const [backgroundColor, setBackgroundColor] = useState("rgba(20, 20, 20, 0.9)");

  const images = [
    { src: "/images/hotel-hero.png", alt: "Hotel Entertainment Hub Hero" },
    { src: "/images/hotel-research.png", alt: "Research and Discovery" },
    { src: "/images/hotel-ui.png", alt: "UI Components" },
    { src: "/images/hotel-outcome.png", alt: "Project Outcome" }
  ];

  const { data: dominantColor } = useColor(images[0].src, 'hex', {
    crossOrigin: 'anonymous',
  });

  useEffect(() => {
    if (dominantColor) {
      const hex = dominantColor.replace('#', '');
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      
      const invertedR = 255 - r;
      const invertedG = 255 - g;
      const invertedB = 255 - b;
      
      setBackgroundColor(`rgba(${invertedR}, ${invertedG}, ${invertedB}, 0.9)`);
    }
  }, [dominantColor]);

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* Hero Section */}
      <BlurImageBackground
        imageSrc="/images/hotel-hero.png"
        className="min-h-[60vh] flex items-center justify-center pt-24 md:pt-16"
        overlayClassName="bg-black/60"
      >
        <div className="max-w-6xl mx-auto px-4 py-8 md:py-16 relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-white mb-8">
            Crafting a Hotel Entertainment Hub That Delights
          </h1>
          <p className="text-white text-center max-w-2xl mx-auto text-lg md:text-xl mb-12">
            A UX Case Study
          </p>
          
          {/* Team Section */}
          <div className="flex flex-col items-center justify-center gap-4">
            <p className="text-neutral-300">Designed by</p>
            <div className="flex items-center justify-center gap-2">
              <AnimatedTooltip items={teamMembers} />
            </div>
          </div>
        </div>
      </BlurImageBackground>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Overview Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Overview</h2>
          <p className="text-neutral-300 text-lg leading-relaxed mb-8">
            The Hotel Entertainment Hub project aimed to revolutionize how hotel guests discover and access entertainment options during their stay. Our goal was to create an intuitive, engaging platform that would enhance the guest experience while streamlining operations for hotel staff.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg bg-neutral-900">
              <BoltIcon className="w-8 h-8 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Challenge</h3>
              <p className="text-neutral-400">
                Create a unified platform that simplifies entertainment discovery and access for hotel guests while reducing operational overhead.
              </p>
            </div>
            <div className="p-6 rounded-lg bg-neutral-900">
              <SwatchIcon className="w-8 h-8 text-purple-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Approach</h3>
              <p className="text-neutral-400">
                User-centered design process with extensive research, iterative prototyping, and continuous user testing.
              </p>
            </div>
            <div className="p-6 rounded-lg bg-neutral-900">
              <HeartIcon className="w-8 h-8 text-red-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Outcome</h3>
              <p className="text-neutral-400">
                A delightful entertainment platform that increased guest satisfaction and streamlined hotel operations.
              </p>
            </div>
          </div>
        </section>

        {/* Problem Statement */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">The Challenge</h2>
          <p className="text-neutral-300 text-lg leading-relaxed mb-8">
            Hotels faced significant challenges in managing and presenting their entertainment options to guests. The existing systems were fragmented, leading to:
          </p>
          <ul className="list-disc list-inside text-neutral-300 text-lg leading-relaxed space-y-4 mb-8">
            <li>Poor guest experience in discovering available entertainment options</li>
            <li>Inefficient staff workflows in managing entertainment requests</li>
            <li>Missed revenue opportunities from entertainment services</li>
            <li>Lack of personalization in entertainment recommendations</li>
          </ul>
          <div className="rounded-lg overflow-hidden">
            <img 
              src="/images/hotel-research.png"
              alt="Research Findings" 
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
        </section>

        {/* Design Process */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Design Process</h2>
          <div className="space-y-12">
            <div>
              <h3 className="text-2xl font-semibold mb-4">1. Research & Discovery</h3>
              <p className="text-neutral-300 text-lg leading-relaxed mb-6">
                We conducted extensive research to understand both guest and staff needs:
              </p>
              <ul className="list-disc list-inside text-neutral-300 text-lg leading-relaxed space-y-4">
                <li>User interviews with hotel guests and staff</li>
                <li>Competitive analysis of existing solutions</li>
                <li>Service blueprint mapping</li>
                <li>Analytics review of current entertainment usage</li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-4">2. Design Strategy</h3>
              <p className="text-neutral-300 text-lg leading-relaxed mb-6">
                Based on our research, we developed a design strategy focused on:
              </p>
              <ul className="list-disc list-inside text-neutral-300 text-lg leading-relaxed space-y-4">
                <li>Intuitive discovery of entertainment options</li>
                <li>Seamless booking and access</li>
                <li>Personalized recommendations</li>
                <li>Efficient staff management tools</li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-4">3. Design System</h3>
              <p className="text-neutral-300 text-lg leading-relaxed mb-6">
                We created a comprehensive design system to ensure consistency and scalability:
              </p>
              <div className="rounded-lg overflow-hidden mt-8">
                <img 
                  src="/images/hotel-ui.png"
                  alt="Design System Components" 
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Solution & Impact */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Solution & Impact</h2>
          <p className="text-neutral-300 text-lg leading-relaxed mb-8">
            The final solution delivered significant improvements across key metrics:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="p-6 rounded-lg bg-neutral-900">
              <h3 className="text-xl font-semibold mb-4">Guest Experience</h3>
              <ul className="list-disc list-inside text-neutral-300 space-y-2">
                <li>40% increase in entertainment engagement</li>
                <li>85% positive feedback on ease of use</li>
                <li>3x increase in personalized bookings</li>
              </ul>
            </div>
            <div className="p-6 rounded-lg bg-neutral-900">
              <h3 className="text-xl font-semibold mb-4">Business Impact</h3>
              <ul className="list-disc list-inside text-neutral-300 space-y-2">
                <li>25% increase in entertainment revenue</li>
                <li>50% reduction in staff management time</li>
                <li>90% decrease in booking errors</li>
              </ul>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden">
            <img 
              src="/images/hotel-outcome.png"
              alt="Project Outcome Visualization" 
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
        </section>

        {/* Learnings */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Key Learnings</h2>
          <div className="space-y-6 text-neutral-300 text-lg leading-relaxed">
            <p>
              This project reinforced several important principles in product design:
            </p>
            <ul className="list-disc list-inside space-y-4">
              <li>The importance of thorough user research in understanding complex ecosystems</li>
              <li>The value of iterative design in refining solutions</li>
              <li>The impact of well-designed systems on both user satisfaction and business metrics</li>
              <li>The need for scalable design systems in enterprise solutions</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
