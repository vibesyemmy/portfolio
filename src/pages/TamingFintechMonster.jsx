import React from "react";
import { BackgroundBeams } from "../components/ui/background-beams";
import { AnimatedTooltip } from "../components/ui/animated-tooltip";
import { BlurImageBackground } from "../components/ui/blur-image-background";

const teamMembers = [
  {
    name: "Opeyemi Ajagbe",
    designation: "Product Designer",
    image: "/src/assets/avatar.png",
  },
  {
    name: "Ayo",
    designation: "Product Designer",
    image: "/src/assets/ayo.png",
  },
  {
    name: "Seun",
    designation: "Product Designer",
    image: "/src/assets/seun.jpg",
  },
];

export default function TamingFintechMonster() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* Hero Section */}
      <BlurImageBackground
        imageSrc="/src/assets/ui-grid.png"
        className="min-h-[60vh] flex items-center justify-center pt-24 md:pt-16"
        overlayClassName="bg-black/60 backdrop-blur-[50px]"
      >
        <div className="max-w-4xl mx-auto px-4 py-8 md:py-16 relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 mb-8">
            Poseidon: Taming the Fintech Sea Monster
          </h1>
          <p className="text-neutral-400 text-center max-w-2xl mx-auto text-lg md:text-xl mb-12">
            A Design System Case Study
          </p>
          
          {/* Project Details */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
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
        <BackgroundBeams />
      </BlurImageBackground>

      {/* Project Overview */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-neutral-200 mb-8">Project Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-neutral-900/50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-neutral-200 mb-4">The Challenge</h3>
              <p className="text-neutral-400">
                Financial institutions faced complex workflows that were difficult for users to navigate,
                leading to confusion and reduced productivity.
              </p>
            </div>
            <div className="bg-neutral-900/50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-neutral-200 mb-4">The Solution</h3>
              <p className="text-neutral-400">
                We redesigned the core workflows with a focus on simplicity and user experience,
                resulting in improved efficiency and user satisfaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process & Approach */}
      <section className="py-16 px-4 bg-neutral-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-neutral-200 mb-8">Process & Approach</h2>
          <div className="space-y-12">
            <div>
              <h3 className="text-xl font-semibold text-neutral-200 mb-4">1. Research & Discovery</h3>
              <p className="text-neutral-400">
                Conducted extensive user research to understand pain points and opportunities for improvement.
                Interviewed stakeholders and analyzed competitor solutions.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-neutral-200 mb-4">2. Design & Iteration</h3>
              <p className="text-neutral-400">
                Created wireframes and prototypes, iterating based on user feedback and usability testing.
                Focused on simplifying complex workflows while maintaining functionality.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-neutral-200 mb-4">3. Implementation & Testing</h3>
              <p className="text-neutral-400">
                Worked closely with development team to implement designs. Conducted thorough testing
                to ensure optimal performance and user experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Results & Impact */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-neutral-200 mb-8">Results & Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-neutral-900/50 p-6 rounded-lg">
              <h3 className="text-2xl font-bold text-neutral-200 mb-2">40%</h3>
              <p className="text-neutral-400">Reduction in task completion time</p>
            </div>
            <div className="bg-neutral-900/50 p-6 rounded-lg">
              <h3 className="text-2xl font-bold text-neutral-200 mb-2">85%</h3>
              <p className="text-neutral-400">User satisfaction rate</p>
            </div>
            <div className="bg-neutral-900/50 p-6 rounded-lg">
              <h3 className="text-2xl font-bold text-neutral-200 mb-2">60%</h3>
              <p className="text-neutral-400">Decrease in support tickets</p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Learnings */}
      <section className="py-16 px-4 bg-neutral-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-neutral-200 mb-8">Key Learnings</h2>
          <div className="space-y-6">
            <p className="text-neutral-400">
              1. Simplicity is key - Even complex financial workflows can be simplified without losing functionality
            </p>
            <p className="text-neutral-400">
              2. User feedback is invaluable - Regular user testing and feedback sessions led to significant improvements
            </p>
            <p className="text-neutral-400">
              3. Iteration is essential - Multiple rounds of refinement were necessary to achieve optimal results
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
