import React from "react";
import { AnimatedTooltip } from "../components/ui/animated-tooltip";
import { BlurImageBackground } from "../components/ui/blur-image-background";
import CaseStudyNav from '../components/ui/case-study-nav';
import { getNavigation } from '../config/case-studies';

const teamMembers = [
  {
    name: "Opeyemi Ajagbe",
    designation: "Product Designer",
    image: "/images/avatar.png",
  }
];

export default function FlatMagic() {
  const { prevCase, nextCase } = getNavigation('flatmagic');

  return (
    <>
      <main className="min-h-screen bg-neutral-950 text-white">
        {/* Hero Section */}
        <BlurImageBackground
          imageSrc="/images/flatmagicbg.png"
          className="min-h-[60vh] flex items-center justify-center pt-24 md:pt-16"
          overlayClassName="bg-black/60"
        >
          <div className="max-w-7xl mx-auto px-4 py-8 md:py-16 relative z-10">
            {/* Hero Element 0: Logo */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 blur-xl bg-yellow-500/60 animate-pulse"></div>
                <img
                  src="/images/flatmagiclogo.png"
                  alt="FlatMagic Logo"
                  className="w-24 h-24 md:w-32 md:h-32 relative z-10 drop-shadow-2xl"
                />
              </div>
            </div>
            {/* Hero Element 1: Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-white mb-8">
              FlatMagic
            </h1>
            {/* Hero Element 2: Description */}
            <p className="text-white text-center max-w-2xl mx-auto text-lg md:text-xl mb-10">
              A Figma plugin that transforms complex frame structures into single, flattened images with just one click.
            </p>

            {/* Hero Element 2.5: Try Button */}
            <div className="flex justify-center mb-12">
              <a
                href="https://www.figma.com/community/plugin/1448869823988608422/flatmagic"
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex items-center overflow-hidden rounded-lg p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
              >
                <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#FFD700_0%,#FFA500_50%,#FFD700_100%)]" />
                <span className="relative inline-flex items-center px-6 py-3 font-medium transition-all bg-yellow-500 rounded-lg group">
                  <img
                    src="/images/figma-logo.svg"
                    alt="Figma Logo"
                    className="mr-2 w-5 h-5 transition-opacity group-hover:opacity-70"
                  />
                  <span className="text-black group-hover:text-neutral-800">
                    Try FlatMagic
                  </span>
                  <svg
                    className="ml-2 w-4 h-4 text-black group-hover:text-neutral-800"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </span>
              </a>
            </div>

            {/* Hero Element 3: Project Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
              <div className="text-center">
                <h3 className="text-sm uppercase tracking-wider text-neutral-400 mb-2">Role</h3>
                <p className="text-white font-medium">Product Designer & Developer</p>
              </div>
              <div className="text-center">
                <h3 className="text-sm uppercase tracking-wider text-neutral-400 mb-2">Platform</h3>
                <p className="text-white font-medium">Figma Plugin</p>
              </div>
              <div className="text-center">
                <h3 className="text-sm uppercase tracking-wider text-neutral-400 mb-2">Timeline</h3>
                <p className="text-white font-medium">1 month</p>
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

        {/* Overview Section */}
        <section className="py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-4">
            <div className="prose prose-lg prose-invert">
              <p className="text-2xl text-neutral-300 font-normal mb-8 leading-relaxed">
                FlatMagic is a sleek and efficient Figma plugin that transforms complex frame structures into single, flattened images with just one click. Perfect for designers who need to simplify their workflows, create thumbnails, or preserve the exact appearance of their designs.
              </p>
            </div>
          </div>
        </section>

        {/* Plugin UI Screenshot */}
        <section className="pb-16">
          <div className="max-w-5xl mx-auto px-4">
            <div className="relative w-1/2 rounded-2xl overflow-hidden shadow-2xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent z-10"></div>
              <img
                src="/images/flatmagicui.png"
                alt="FlatMagic Plugin Interface"
                className="w-full h-auto"
              />
            </div>
          </div>
        </section>

        {/* Key Features Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-neutral-200 mb-12">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 mt-2 rounded-full bg-yellow-500"></div>
                  <div>
                    <h3 className="text-xl font-semibold text-neutral-200 mb-2">One-Click Flattening</h3>
                    <p className="text-neutral-400">Transform any frame or group into a single image instantly</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 mt-2 rounded-full bg-yellow-500"></div>
                  <div>
                    <h3 className="text-xl font-semibold text-neutral-200 mb-2">Smart Selection</h3>
                    <p className="text-neutral-400">The plugin intelligently enables only when a frame or group is selected</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 mt-2 rounded-full bg-yellow-500"></div>
                  <div>
                    <h3 className="text-xl font-semibold text-neutral-200 mb-2">Original Positioning</h3>
                    <p className="text-neutral-400">Maintains exact position and dimensions of your original frame</p>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 mt-2 rounded-full bg-yellow-500"></div>
                  <div>
                    <h3 className="text-xl font-semibold text-neutral-200 mb-2">Clean Interface</h3>
                    <p className="text-neutral-400">Modern, minimal UI that follows Figma's design patterns</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 mt-2 rounded-full bg-yellow-500"></div>
                  <div>
                    <h3 className="text-xl font-semibold text-neutral-200 mb-2">Resource Efficient</h3>
                    <p className="text-neutral-400">Reduces file size by converting complex layer structures into single images</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-neutral-200 mb-12">Use Cases</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-neutral-900/50 rounded-xl p-6 border border-yellow-500/20">
                <h3 className="text-xl font-semibold text-yellow-200 mb-4">Design Systems</h3>
                <p className="text-neutral-400">Creating thumbnails for design systems and maintaining visual consistency across shared components</p>
              </div>
              <div className="bg-neutral-900/50 rounded-xl p-6 border border-yellow-500/20">
                <h3 className="text-xl font-semibold text-yellow-200 mb-4">Complex Effects</h3>
                <p className="text-neutral-400">Preserving complex effects and interactions while simplifying handoff deliverables</p>
              </div>
              <div className="bg-neutral-900/50 rounded-xl p-6 border border-yellow-500/20">
                <h3 className="text-xl font-semibold text-yellow-200 mb-4">Performance</h3>
                <p className="text-neutral-400">Reducing file size for better performance without compromising visual quality</p>
              </div>
            </div>
          </div>
        </section>

        {/* How to Use Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-neutral-200 mb-12">How to Use</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="relative">
                <div className="absolute -left-4 top-0 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-lg font-bold text-black">1</div>
                <h3 className="text-xl font-semibold text-yellow-200 mb-4 pl-6">Select Frame</h3>
                <p className="text-neutral-400 pl-6">Select any frame or group you want to flatten</p>
              </div>
              <div className="relative">
                <div className="absolute -left-4 top-0 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-lg font-bold text-black">2</div>
                <h3 className="text-xl font-semibold text-yellow-200 mb-4 pl-6">Run Plugin</h3>
                <p className="text-neutral-400 pl-6">Run FlatMagic from the plugins menu</p>
              </div>
              <div className="relative">
                <div className="absolute -left-4 top-0 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-lg font-bold text-black">3</div>
                <h3 className="text-xl font-semibold text-yellow-200 mb-4 pl-6">Click Flatten</h3>
                <p className="text-neutral-400 pl-6">Click 'Flatten Selection' in the plugin window</p>
              </div>
              <div className="relative">
                <div className="absolute -left-4 top-0 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-lg font-bold text-black">4</div>
                <h3 className="text-xl font-semibold text-yellow-200 mb-4 pl-6">Done!</h3>
                <p className="text-neutral-400 pl-6">Your flattened frame is ready to use</p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Ready to Simplify Your Workflow?</h2>
            <p className="text-lg text-neutral-300 mb-8">
              Transform your complex Figma frames into flattened images with just one click.
            </p>
            <div className="flex justify-center">
              <a
                href="https://www.figma.com/community/plugin/1448869823988608422/flatmagic"
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex items-center overflow-hidden rounded-lg p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
              >
                <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#FFD700_0%,#FFA500_50%,#FFD700_100%)]" />
                <span className="relative inline-flex items-center px-6 py-3 font-medium transition-all bg-yellow-500 rounded-lg group">
                  <img
                    src="/images/figma-logo.svg"
                    alt="Figma Logo"
                    className="mr-2 w-5 h-5 transition-opacity group-hover:opacity-70"
                  />
                  <span className="text-black group-hover:text-neutral-800">
                    Try FlatMagic
                  </span>
                  <svg
                    className="ml-2 w-4 h-4 text-black group-hover:text-neutral-800"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Navigation Cards */}
      <CaseStudyNav prevCase={prevCase} nextCase={nextCase} className="py-8 bg-neutral-950" />
    </>
  );
}
