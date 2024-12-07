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
  {
    name: "Ayo",
    designation: "Product Designer",
    image: "/images/ayo.png",
  },
  {
    name: "Seun",
    designation: "Product Designer",
    image: "/images/seun.jpg",
  },
];

export default function TamingFintechMonster() {
  const [backgroundColor, setBackgroundColor] = useState("rgba(20, 20, 20, 0.9)");

  const images = [
    { src: "/images/fragment.svg", alt: "The Challenge Illustration" },
    { src: "/images/process.svg", alt: "Research Process Illustration" },
    { src: "/images/UI-grid.png", alt: "UI Components Grid" },
    { src: "/images/conclusion.png", alt: "Project Conclusion Illustration" }
  ];

  const { data: dominantColor } = useColor(images[0].src, 'hex', {
    crossOrigin: 'anonymous',
  });

  useEffect(() => {
    if (dominantColor) {
      // Convert hex to RGB and invert for contrast
      const hex = dominantColor.replace('#', '');
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      
      // Invert the colors and add opacity
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
        imageSrc="/images/UI-grid.png"
        className="min-h-[60vh] flex items-center justify-center pt-24 md:pt-16"
        overlayClassName="bg-black/60"
      >
        <div className="max-w-6xl mx-auto px-4 py-8 md:py-16 relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-white mb-8">
            Poseidon: Taming the Fintech Sea Monster
          </h1>
          <p className="text-white text-center max-w-2xl mx-auto text-lg md:text-xl mb-12">
            A Design System Case Study
          </p>
          
          {/* Project Details */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <h3 className="text-sm uppercase tracking-wider text-neutral-400 mb-2">Role</h3>
              <p className="text-white font-medium">Product Designer</p>
            </div>
            <div className="text-center">
              <h3 className="text-sm uppercase tracking-wider text-neutral-400 mb-2">Client</h3>
              <p className="text-white font-medium">HydrogenPay</p>
            </div>
            <div className="text-center">
              <h3 className="text-sm uppercase tracking-wider text-neutral-400 mb-2">Product</h3>
              <p className="text-white font-medium">Design System</p>
            </div>
            <div className="text-center">
              <h3 className="text-sm uppercase tracking-wider text-neutral-400 mb-2">Team</h3>
              <div className="flex justify-center">
                <AnimatedTooltip items={teamMembers} />
              </div>
            </div>
          </div>
        </div>
      </BlurImageBackground>

      {/* Introduction */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-neutral-200 mb-8">Introduction</h2>
          <p className="text-neutral-400 leading-relaxed text-lg mb-12">
            In the fast-paced world of Nigerian fintech, a seamless and engaging user experience is paramount. HydrogenPay, a leading player in this space, faced a critical challenge: their digital platforms, spanning web, mobile, and POS terminals, lacked consistency, leading to user confusion and hindering their growth. Recognizing the need for a unified design language, HydrogenPay assembled a design team, which I had the privilege of leading, to create Poseidon – a comprehensive UI design system. This case study outlines our collaborative journey in building Poseidon, highlighting the challenges, our design thinking, and the system's significant impact on HydrogenPay's success.
          </p>
          <div className="rounded-lg overflow-hidden shadow-2xl">
            <img 
              src="/images/hydrogen-ds.png" 
              alt="HydrogenPay Design System" 
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* The Challenge */}
      <section className="py-16 px-4 bg-neutral-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-neutral-200 mb-8">The Challenge: A Sea of Inconsistency</h2>
          <p className="text-neutral-400 leading-relaxed text-lg mb-12">
            HydrogenPay's existing solutions suffered from a fragmented user experience. User testing and internal feedback revealed jarring inconsistencies across their platforms. Users encountered different interfaces, interaction patterns, and visual cues, making it difficult to navigate seamlessly. This fragmentation stemmed from a lack of centralized design guidelines and a disjointed collaboration between designers and developers
          </p>
          <div className="rounded-lg overflow-hidden">
            <img 
              src="/images/fragment.svg" 
              alt="The Challenge Illustration" 
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* North Star Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-neutral-200 mb-8">Our North Star: Efficiency, Consistency, and User Delight</h2>
          <p className="text-neutral-400 leading-relaxed text-lg mb-8">
            Our design team approached the Poseidon project with a clear set of guiding principles:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-neutral-900/50 rounded-xl p-6 border border-neutral-800 hover:border-neutral-700 transition-colors group">
              <div className="flex items-center gap-4 mb-4">
                <BoltIcon className="w-8 h-8 text-yellow-200 transition-all duration-300 group-hover:text-yellow-400 group-hover:drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" />
                <h3 className="text-xl font-semibold text-neutral-200">Efficiency</h3>
              </div>
              <p className="text-sm text-neutral-400 leading-relaxed">
                We aimed to create a design system that streamlined development workflows, ensuring faster time-to-market for new features and updates.
              </p>
            </div>
            <div className="bg-neutral-900/50 rounded-xl p-6 border border-neutral-800 hover:border-neutral-700 transition-colors group">
              <div className="flex items-center gap-4 mb-4">
                <SwatchIcon className="w-8 h-8 text-purple-200 transition-all duration-300 group-hover:text-purple-400 group-hover:drop-shadow-[0_0_8px_rgba(192,132,252,0.5)]" />
                <h3 className="text-xl font-semibold text-neutral-200">Consistency</h3>
              </div>
              <p className="text-sm text-neutral-400 leading-relaxed">
                We wanted to establish a unified design language across all HydrogenPay platforms, enhancing brand identity and creating a cohesive user experience.
              </p>
            </div>
            <div className="bg-neutral-900/50 rounded-xl p-6 border border-neutral-800 hover:border-neutral-700 transition-colors group">
              <div className="flex items-center gap-4 mb-4">
                <HeartIcon className="w-8 h-8 text-rose-200 transition-all duration-300 group-hover:text-rose-400 group-hover:drop-shadow-[0_0_8px_rgba(251,113,133,0.5)]" />
                <h3 className="text-xl font-semibold text-neutral-200">User Delight</h3>
              </div>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Our ultimate goal was to empower users with a seamless, intuitive, and enjoyable experience, regardless of how they chose to interact with HydrogenPay.
              </p>
            </div>
          </div>
          <div className="mt-16">
            <img 
              src="/images/north-star.svg" 
              alt="North Star Principles Illustration" 
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Setting Sail Section */}
      <section className="py-16 px-4 bg-[#cfd7e6]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-neutral-900 mb-8">Setting Sail: A Research-Driven Approach</h2>
          <p className="text-neutral-700 leading-relaxed text-lg mb-12">
            We embarked on our mission with a deep dive into understanding HydrogenPay's users, their pain points, and their needs. Our research encompassed:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-neutral-200 hover:border-neutral-300 transition-colors">
              <h3 className="text-xl font-semibold text-neutral-900 mb-4">User Interviews and Surveys</h3>
              <p className="text-sm text-neutral-700 leading-relaxed">
                We conducted in-depth interviews and surveys with a diverse group of HydrogenPay users to gather qualitative and quantitative data on their experiences and expectations.
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-neutral-200 hover:border-neutral-300 transition-colors">
              <h3 className="text-xl font-semibold text-neutral-900 mb-4">Stakeholder Workshops</h3>
              <p className="text-sm text-neutral-700 leading-relaxed">
                We facilitated workshops with key stakeholders across different departments within HydrogenPay to understand their perspectives, requirements, and pain points related to the existing design and development processes.
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-neutral-200 hover:border-neutral-300 transition-colors">
              <h3 className="text-xl font-semibold text-neutral-900 mb-4">Competitive Analysis</h3>
              <p className="text-sm text-neutral-700 leading-relaxed">
                We analyzed the design systems of leading fintech companies, identifying best practices, areas for differentiation, and potential pitfalls to avoid.
              </p>
            </div>
          </div>
          <div className="mt-16">
            <img 
              src="/images/process.svg" 
              alt="Research Process Illustration" 
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Charting the Course Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-neutral-200 mb-8">Charting the Course: Designing the Poseidon UI Kit</h2>
          <div className="space-y-8">
            <p className="text-neutral-400 leading-relaxed text-lg">
              Armed with insights from our research, we began crafting the Poseidon UI Kit, a comprehensive library of reusable components, design patterns, and guidelines. We worked closely with HydrogenPay's front-end developers to ensure seamless integration and efficient implementation.
            </p>
            <p className="text-neutral-400 leading-relaxed text-lg">
            Key Components of the Poseidon UI Kit:
            </p>
            <div className="grid grid-cols-1 gap-6">
              <div className="bg-neutral-900/50 rounded-xl p-6 border border-neutral-800 hover:border-neutral-700 transition-colors">
                <h3 className="text-xl font-semibold text-neutral-200 mb-4">Atomic Design Principles</h3>
                <p className="text-neutral-400 leading-relaxed mb-6">
                  We adopted Brad Frost's Atomic Design methodology, breaking down the user interface into its smallest elements (atoms), combining them to form more complex components (molecules and organisms), and finally assembling them into templates and pages. This approach ensured reusability, scalability, and consistency.
                </p>
                <img 
                  src="/images/atoms.svg" 
                  alt="Atomic Design Methodology Illustration" 
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>
              <div className="bg-neutral-900/50 rounded-xl p-6 border border-neutral-800 hover:border-neutral-700 transition-colors">
                <h3 className="text-xl font-semibold text-neutral-200 mb-4">Flexible Grid System</h3>
                <p className="text-neutral-400 leading-relaxed mb-6">
                  We implemented a flexible grid system designed to adapt seamlessly to various screen sizes, ensuring a consistent and visually appealing experience across desktops, laptops, tablets, and mobile devices.
                </p>
                <img 
                  src="/images/grid-system.svg" 
                  alt="Flexible Grid System Illustration" 
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>
              <div className="bg-neutral-900/50 rounded-xl p-6 border border-neutral-800 hover:border-neutral-700 transition-colors">
                <h3 className="text-xl font-semibold text-neutral-200 mb-4">Design Tokens</h3>
                <p className="text-neutral-400 leading-relaxed mb-6">
                  We established a system of design tokens to ensure consistency in spacing, typography, color palettes, and other visual elements. This centralized source of truth streamlined design handoffs and minimized inconsistencies during development.
                </p>
                <img 
                  src="/images/design-token.png" 
                  alt="Design Tokens Illustration" 
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>
              <div className="bg-neutral-900/50 rounded-xl p-6 border border-neutral-800 hover:border-neutral-700 transition-colors">
                <h3 className="text-xl font-semibold text-neutral-200 mb-4">Component Library</h3>
                <p className="text-neutral-400 leading-relaxed mb-6">
                  Our front-end developers, using tools like Figma and Storybook, played a crucial role in translating our design specifications into a robust component library, providing easy access to reusable UI elements for future development.
                </p>
                <img 
                  src="/images/component-library.png" 
                  alt="Component Library Illustration" 
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigating the Waters Section */}
      <div className="relative" style={{ backgroundColor: '#121628' }}>
        <div className="max-w-6xl mx-auto px-8 md:px-12 py-12 md:py-24">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-200">
              Navigating the Waters: Addressing Accessibility and Platform Conventions
            </h2>
            <p className="text-neutral-400 leading-relaxed text-lg">
              Throughout the design process, we remained acutely aware of the importance of accessibility and platform-specific conventions.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
              <div className="bg-neutral-900/50 rounded-xl p-6 border border-neutral-800 hover:border-neutral-700 transition-colors">
                <h3 className="text-xl font-semibold text-neutral-200 mb-4">Accessibility as a Priority</h3>
                <p className="text-neutral-400 leading-relaxed text-sm">
                  We incorporated accessibility best practices from the outset, ensuring that Poseidon's components met WCAG (Web Content Accessibility Guidelines) standards. This included rigorous testing for color contrast ratios, keyboard navigation, screen reader compatibility, and alternative text for images.
                </p>
              </div>
              <div className="bg-neutral-900/50 rounded-xl p-6 border border-neutral-800 hover:border-neutral-700 transition-colors">
                <h3 className="text-xl font-semibold text-neutral-200 mb-4">Balancing Consistency with Platform Conventions</h3>
                <p className="text-neutral-400 leading-relaxed text-sm">
                  While consistency was paramount, we also recognized the importance of adhering to established UI patterns and conventions for Android and iOS devices. This ensured a familiar and intuitive experience for users on their preferred platforms, preventing unnecessary friction or confusion.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Impact Section */}
      <div className="relative">
        <div className="max-w-6xl mx-auto px-8 md:px-12 py-12 md:py-24">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-200">
                Impact: Calmer Seas and Smoother Sailing
              </h2>
              <p className="text-neutral-400 leading-relaxed text-lg">
                The implementation of the Poseidon UI Kit had a transformative impact on HydrogenPay:
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-neutral-900/50 rounded-xl p-6 border border-neutral-800 hover:border-neutral-700 transition-colors">
                <h3 className="text-xl font-semibold text-neutral-200 mb-4">Streamlined Development</h3>
                <p className="text-neutral-400 leading-relaxed text-sm">
                  The component library significantly reduced development time by providing ready-to-use UI elements. Developers no longer needed to build components from scratch, allowing them to focus on building features and functionality.
                </p>
              </div>
              
              <div className="bg-neutral-900/50 rounded-xl p-6 border border-neutral-800 hover:border-neutral-700 transition-colors">
                <h3 className="text-xl font-semibold text-neutral-200 mb-4">Enhanced Consistency and Brand Identity</h3>
                <p className="text-neutral-400 leading-relaxed text-sm">
                  Poseidon brought much-needed consistency to HydrogenPay's digital presence. The unified design language strengthened their brand identity and provided users with a cohesive experience across touchpoints.
                </p>
              </div>
              
              <div className="bg-neutral-900/50 rounded-xl p-6 border border-neutral-800 hover:border-neutral-700 transition-colors">
                <h3 className="text-xl font-semibold text-neutral-200 mb-4">Improved User Experience</h3>
                <p className="text-neutral-400 leading-relaxed text-sm">
                  User testing confirmed the positive impact of Poseidon on the overall user experience. Users reported greater ease of navigation, reduced confusion, and an increased sense of trust in the brand.
                </p>
              </div>
            </div>
            
            <div className="mt-12">
              <img 
                src="/images/UI-grid.png" 
                alt="UI Components Grid" 
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Conclusion Section */}
      <div className="relative">
        <div className="max-w-6xl mx-auto px-8 md:px-12 py-12 md:py-24">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-200">
              Conclusion: A Seaworthy Design System for Future Growth
            </h2>
            <p className="text-neutral-400 leading-relaxed text-lg">
              The Poseidon project was a testament to the power of collaboration, user-centered design, and a commitment to building scalable and accessible design systems. By establishing a clear design language, streamlining development workflows, and prioritizing the user experience, Poseidon set the stage for HydrogenPay's continued growth and innovation in the dynamic world of fintech. As HydrogenPay expands its product offerings, Poseidon will continue to evolve and adapt, serving as a robust foundation for creating exceptional digital experiences.
            </p>
            <div className="mt-8">
              <img 
                src="/images/conclusion.png" 
                alt="Project Conclusion Illustration" 
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
