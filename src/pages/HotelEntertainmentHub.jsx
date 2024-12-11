import React, { useState, useEffect, Suspense } from "react";
import { AnimatedTooltip } from "../components/ui/animated-tooltip";
import { BlurImageBackground } from "../components/ui/blur-image-background";
import { BoltIcon, SwatchIcon, HeartIcon, DocumentDuplicateIcon, EyeSlashIcon, CurrencyDollarIcon } from "@heroicons/react/24/outline/index.js";
import scatteredInfo from '../assets/illustrations/scattered-info.svg';
import limitedVisibility from '../assets/illustrations/limited-visibility.svg';
import pricingComplexity from '../assets/illustrations/pricing-complexity.svg';
import unifiedHub from '../assets/illustrations/unified-hub.svg';
import discoverability from '../assets/illustrations/discoverability.svg';
import { useColor } from 'color-thief-react';
import CaseStudyNav from '../components/ui/case-study-nav';
import { getNavigation } from '../config/case-studies';
import { Skeleton } from '../components/ui/skeleton';

const Lottie = React.lazy(() => import('lottie-react'));
const motion = React.lazy(() => import('framer-motion').then(mod => ({ default: mod.motion })));

const teamMembers = [
  {
    name: "Opeyemi Ajagbe",
    designation: "Product Designer",
    image: "/images/avatar.png",
  },
  {
    name: "Joshua Zaporta Cruz",
    designation: "Product Designer",
    image: "/images/joshua.png",
  },
  {
    name: "Theodor",
    designation: "Product Designer",
    image: "/images/boy.png",
  },
];

const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = resolve;
    img.onerror = reject;
    img.src = src;
  });
};

export default function HotelEntertainmentHub() {
  const [backgroundColor, setBackgroundColor] = useState("rgba(20, 20, 20, 0.9)");
  const [isLoading, setIsLoading] = useState(true);

  const images = [
    { src: "/images/hotel-hero.png", alt: "Hotel Entertainment Hub Hero" },
    { src: "/images/hotel-research.png", alt: "Research and Discovery" },
    { src: "/images/hotel-ui.png", alt: "UI Components" },
    { src: "/images/hotel-outcome.png", alt: "Project Outcome" }
  ];

  useEffect(() => {
    const loadImages = async () => {
      try {
        await preloadImage(images[0].src);
        setIsLoading(false);
      } catch (error) {
        console.error('Error preloading images:', error);
        setIsLoading(false);
      }
    };
    loadImages();
  }, []);

  const { data: dominantColor } = useColor(images[0].src, 'hex', {
    crossOrigin: 'anonymous',
    quality: 10, // Reduce color analysis quality for faster loading
  });

  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch('/animations/Hotel-Entertainment-Hub.json')
      .then(response => response.json())
      .then(data => {
        setAnimationData(data);
      })
      .catch(error => {
        console.error('Error loading animation:', error);
      });
  }, []);

  const { prevCase, nextCase } = getNavigation('hotel-hub');

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* Hero Section */}
      <BlurImageBackground
        imageSrc="/images/hotel-entertainment-hub.png"
        className="min-h-[60vh] flex items-center justify-center pt-24 md:pt-16"
        overlayClassName="bg-black/60"
      >
        <div className="max-w-7xl mx-auto px-4 py-8 md:py-16 relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-white mb-8">
            Crafting a Hotel Entertainment Hub That Delights
          </h1>
          <p className="text-white text-center max-w-2xl mx-auto text-lg md:text-xl mb-12">
          A console app enabling guests to access hotel services and enjoy entertainment like movies, music, and games from their rooms.
          </p>
          
          {/* Project Details */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
            <div className="text-center">
              <h3 className="text-sm uppercase tracking-wider text-neutral-400 mb-2">Role</h3>
              <p className="text-white font-medium">Product Designer</p>
            </div>
            <div className="text-center">
              <h3 className="text-sm uppercase tracking-wider text-neutral-400 mb-2">Client</h3>
              <p className="text-white font-medium">ggCircuit</p>
            </div>
            <div className="text-center">
              <h3 className="text-sm uppercase tracking-wider text-neutral-400 mb-2">Product</h3>
              <p className="text-white font-medium">Console Based Solution</p>
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

      {/* Main Content */}
      <div>
        {/* Overview Section */}
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Overview</h2>
          <div className="w-full prose prose-lg prose-invert">
            <p className="text-neutral-300 text-lg leading-relaxed mb-8">
              When guests arrive at a hotel, they're often tired, time-strapped, or simply overwhelmed by the choices around them. From on-demand spa treatments to local excursions, room service upgrades, and in-room entertainment options, many of these valuable services go undiscovered—buried in brochures, complicated TV menus, or overwhelming hotel directories.
            </p>
            <div className="w-full max-w-none">
              <div className="relative w-full pb-[66.76%] rounded-lg md:rounded-3xl overflow-hidden">
                {isLoading ? (
                  <Skeleton className="absolute inset-0" />
                ) : (
                  <Suspense fallback={<Skeleton className="absolute inset-0" />}>
                    <Lottie 
                      animationData={animationData}
                      loop={true}
                      autoplay={true}
                      className="absolute top-0 left-0 w-full h-full"
                      rendererSettings={{
                        preserveAspectRatio: 'xMidYMid meet'
                      }}
                    />
                  </Suspense>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Problem Statement */}
        <div>
          <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
            <h2 className="text-3xl font-bold mb-8">The Challenge</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-neutral-300 text-lg leading-relaxed">
                  Create a unified "entertainment hub" that helps hotel guests easily discover, access, and enjoy a wide range of hotel services, entertainment, and local activities. The hub needed to be flexible enough to adapt to multiple hotel brands, all while making complex pricing structures and configurations feel effortless.
                </p>
              </div>
              <div className="relative bg-neutral-950/50 rounded-xl p-6">
                <img 
                  src={discoverability} 
                  alt="Service Discovery Interface" 
                  className="w-full max-w-lg mx-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 to-transparent rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Defining the Problem */}
      <div>
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
          <h2 className="text-3xl font-bold mb-8">Defining the Problem</h2>
          <div className="space-y-8">
            <p className="text-neutral-300 text-lg leading-relaxed">
              Hotels host a diverse crowd: the business traveler squeezing in a quick meal and a movie before an early flight; the family eager for kid-friendly activities after check-in; the vacationing couple hoping to find a relaxing spa treatment or a guided city tour. Often, these guests had to rely on calling the concierge or rifling through in-room directories to learn what the hotel offered.
            </p>
            
            <div>
              <h3 className="text-xl font-semibold mb-6">Key issues we identified through initial research:</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-lg bg-red-950/30 border border-red-900/50">
                  <div className="flex items-center gap-3 mb-3">
                    <DocumentDuplicateIcon className="w-6 h-6 text-red-400" />
                    <h4 className="text-lg font-medium text-red-100">Scattered Information</h4>
                  </div>
                  <img src={scatteredInfo} alt="Scattered Information" className="w-full h-32 object-contain mb-4" />
                  <p className="text-neutral-300">Entertainment options, services, and promotions were spread across leaflets, TV channels, and printed menus.</p>
                </div>
                
                <div className="p-6 rounded-lg bg-red-950/30 border border-red-900/50">
                  <div className="flex items-center gap-3 mb-3">
                    <EyeSlashIcon className="w-6 h-6 text-red-400" />
                    <h4 className="text-lg font-medium text-red-100">Limited Visibility</h4>
                  </div>
                  <img src={limitedVisibility} alt="Limited Visibility" className="w-full h-32 object-contain mb-4" />
                  <p className="text-neutral-300">Guests missed out on special promotions, local tours, or even unique dining experiences due to poor discovery mechanisms.</p>
                </div>
                
                <div className="p-6 rounded-lg bg-red-950/30 border border-red-900/50">
                  <div className="flex items-center gap-3 mb-3">
                    <CurrencyDollarIcon className="w-6 h-6 text-red-400" />
                    <h4 className="text-lg font-medium text-red-100">Brand & Pricing Complexity</h4>
                  </div>
                  <img src={pricingComplexity} alt="Pricing Complexity" className="w-full h-32 object-contain mb-4" />
                  <p className="text-neutral-300">Each partner hotel had its own branding guidelines, pricing models, and tax structures. Managing this complexity within a single platform was no small feat.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Constraints & Considerations */}
      <div>
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
          <h2 className="text-3xl font-bold mb-8">Constraints & Considerations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-white">Scalability Requirements</h3>
              <p className="text-neutral-300 text-lg leading-relaxed">
                The solution needed to scale across different hotel brands and properties, each with their own unique service offerings and pricing structures. We had to create a flexible system that could accommodate various content types while maintaining a consistent user experience.
              </p>
            </div>
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-white">Technical Flexibility</h3>
              <p className="text-neutral-300 text-lg leading-relaxed">
                Integration with existing hotel management systems was crucial. The hub needed to handle real-time availability updates, dynamic pricing, and secure payment processing while being maintainable by hotel staff with varying levels of technical expertise.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* The Design Approach */}
      <div className="bg-green-950/30">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
          <h2 className="text-3xl font-bold mb-8">The Design Approach</h2>
          <div className="space-y-16">
            <p className="text-neutral-300 text-lg leading-relaxed">
              Our approach combined user-centric research, iterative design, and stakeholder collaboration:
            </p>

            {/* User Research Section */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-white">User Research & Persona Definition</h3>
              <p className="text-neutral-300 text-lg leading-relaxed mb-6">
                We mapped out three main user personas:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-lg bg-green-900/20 border border-green-800/30">
                  <h4 className="text-lg font-medium mb-2 text-green-100">Business Traveler</h4>
                  <p className="text-neutral-300">Prioritized efficiency, seeking quick access to on-demand movies or a last-minute meal.</p>
                </div>
                <div className="p-6 rounded-lg bg-green-900/20 border border-green-800/30">
                  <h4 className="text-lg font-medium mb-2 text-green-100">Vacationing Couples</h4>
                  <p className="text-neutral-300">Desired curated local experiences, spa treatments, and romantic dining options.</p>
                </div>
                <div className="p-6 rounded-lg bg-green-900/20 border border-green-800/30">
                  <h4 className="text-lg font-medium mb-2 text-green-100">Families</h4>
                  <p className="text-neutral-300">Needed a streamlined way to find kid-friendly content and activities that could be booked without hassle.</p>
                </div>
              </div>
              <p className="text-neutral-300 text-lg leading-relaxed mt-4">
                These personas guided our content hierarchy, ensuring the platform surfaced the most relevant services at the right moments.
              </p>
            </div>

            {/* Modular UI System */}
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-white">Modular UI System</h3>
              <p className="text-neutral-300 text-lg leading-relaxed">
                We created a design system of reusable components—iconography, cards, and responsive layouts—that could "snap" into different brand identities. A global style guide allowed us to swap in a hotel's unique branding elements seamlessly.
              </p>
            </div>

            {/* Seamless Navigation */}
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-white">Seamless Navigation & Discovery</h3>
              <p className="text-neutral-300 text-lg leading-relaxed">
                We introduced intuitive navigation that grouped entertainment categories (e.g., in-room dining, spa services, local tours, streaming options) and surfaced relevant suggestions. For example, if a family was logged in, they'd see a carousel of kid-friendly movies and activities right on the home screen, eliminating guesswork.
              </p>
            </div>

            {/* Transparent Pricing */}
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-white">Transparent Pricing & Booking</h3>
              <p className="text-neutral-300 text-lg leading-relaxed">
                We integrated a clear pricing breakdown screen. Before booking a service, guests could see the base cost, taxes, and any additional fees. This eliminated sticker shock and support calls related to billing confusion.
              </p>
            </div>

            {/* Streamlined Backend */}
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-white">Streamlined Backend Management</h3>
              <p className="text-neutral-300 text-lg leading-relaxed">
                On the backend, a simple CMS allowed hotel staff to add new offers, update pricing, or launch seasonal promotions. This real-time flexibility meant no more printing pamphlets or waiting for IT support.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Collaborations & Iterations */}
      <div className="bg-blue-950/30">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
          <h2 className="text-3xl font-bold mb-8">Collaborations & Iterations</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-8">
              <div>
                <p className="text-neutral-300 text-lg leading-relaxed">
                  Teamwork was crucial. Working with developers, we learned early on that implementing dynamic pricing required structured data input. We collaborated closely with project managers and hotel stakeholders to align on a scalable data model for services and fees.
                </p>
              </div>

              <div className="bg-blue-900/20 border border-blue-800/30 rounded-lg p-8">
                <h3 className="text-xl font-semibold mb-4 text-blue-100">Insight from Testing</h3>
                <p className="text-neutral-300 text-lg leading-relaxed">
                  During usability testing, one hotel manager mentioned how guests rarely discovered their specialty tours due to poor placement. By tweaking the layout and introducing a "Recommended for You" section based on guest stay length and season, these tours became a focal point—leading to more bookings and positive guest feedback.
                </p>
              </div>
            </div>

            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <img
                src="/hotel-entertainment/collaboration.webp"
                alt="Team collaboration session showing designers and developers working together on the hotel entertainment hub"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-950/50 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>

      {/* The Emotional Touch */}
      <div className="bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
          <h2 className="text-3xl font-bold mb-8">The Emotional Touch: A Moment of Delight</h2>
          <div className="bg-neutral-800/50 border border-neutral-700 rounded-lg p-8">
            <p className="text-neutral-300 text-lg leading-relaxed italic">
              During a pilot test, a couple visiting for their anniversary stumbled upon a local wine-tasting event listed under the "Featured Experiences" section. They booked it spontaneously that evening. The next morning, they left a glowing note with the front desk, mentioning how they never would have known about it if not for the new hub. It was a small, heartwarming reminder that this digital solution genuinely enhanced someone's stay—turning what could have been a routine hotel night into a memorable experience.
            </p>
          </div>
        </div>
      </div>

      {/* Results & Impact */}
      <div>
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
          <h2 className="text-3xl font-bold mb-8">Results & Impact</h2>
          <p className="text-neutral-300 text-lg mb-12">After rolling out the entertainment hub:</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-8">
              <h3 className="text-xl font-semibold mb-4 text-white">Increased Engagement</h3>
              <p className="text-neutral-300">
                Guests now explored more pages and spent more time discovering content, leading to a notable uptick in bookings of services and activities.
              </p>
            </div>

            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-8">
              <h3 className="text-xl font-semibold mb-4 text-white">Reduced Support Calls</h3>
              <p className="text-neutral-300">
                With transparent pricing and an intuitive interface, front-desk and concierge calls dropped. Guests could self-serve more effectively.
              </p>
            </div>

            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-8">
              <h3 className="text-xl font-semibold mb-4 text-white">Improved Satisfaction</h3>
              <p className="text-neutral-300">
                Post-stay surveys showed higher satisfaction scores, and the simplified checkout process saved both guests and staff valuable time.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Looking Ahead */}
      <div>
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
          <h2 className="text-3xl font-bold mb-8">Looking Ahead</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-neutral-300 text-lg leading-relaxed">
                As the platform matures, we see opportunities to integrate personalized recommendations based on a guest's history or loyalty status. We're also exploring partnerships with external service providers—further expanding the range of entertainment and amenities accessible right from the comfort of a guest's room.
              </p>
              
              <p className="text-neutral-300 text-lg leading-relaxed">
                Ultimately, this hotel entertainment hub achieved more than just organizing content—it helped shape meaningful guest experiences. By merging intuitive design, flexible branding, and user-centric features, we made it easier for guests to discover the best their hotel had to offer, while streamlining operations and reinforcing the hotel's brand value.
              </p>
            </div>

            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <img
                src="/hotel-entertainment/future-vision.webp"
                alt="Visualization of future hotel entertainment features and personalization"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/50 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <CaseStudyNav prevCase={prevCase} nextCase={nextCase} />
    </div>
  );
}
