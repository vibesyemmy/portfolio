import React, { useState, useEffect, Suspense } from "react";
import { AnimatedTooltip } from "../components/ui/animated-tooltip";
import { BlurImageBackground } from "../components/ui/blur-image-background";
import { Skeleton } from '../components/ui/skeleton';
import CaseStudyNav from '../components/ui/case-study-nav';
import { getNavigation } from '../config/case-studies';
import { useColor } from 'color-thief-react';
import ImageCarousel from '../components/ImageCarousel';

const Lottie = React.lazy(() => import('lottie-react'));

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
  const [animationData, setAnimationData] = useState(null);

  const images = [
    { src: "/images/hotel-hero.png", alt: "Hotel Entertainment Hub Hero" },
  ];

  const { prevCase, nextCase } = getNavigation('hotel-hub');

  useEffect(() => {
    const loadImages = async () => {
      try {
        await Promise.all(images.map(img => preloadImage(img.src)));
        setIsLoading(false);
      } catch (error) {
        console.error('Error preloading images:', error);
        setIsLoading(false);
      }
    };
    loadImages();
  }, []);

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

  const stayImages = [
    {
      src: '/images/stay-grid-1.png',
      alt: 'Hotel Entertainment Hub Stay View 1'
    },
    {
      src: '/images/stay-grid-2.png',
      alt: 'Hotel Entertainment Hub Stay View 2'
    },
    {
      src: '/images/stay-grid-3.png',
      alt: 'Hotel Entertainment Hub Stay View 3'
    },
    {
      src: '/images/stay-grid-4.png',
      alt: 'Hotel Entertainment Hub Stay View 4'
    },
    {
      src: '/images/stay-grid-5.png',
      alt: 'Hotel Entertainment Hub Stay View 5'
    }
  ];

  return (
    <div className="bg-neutral-950 text-white">
      <CaseStudyNav navigation={getNavigation()} className="absolute top-0 left-0 right-0 z-50" />
      
      {/* Hero Section */}
      <BlurImageBackground 
        imageSrc="/images/hotel-entertainment-hub.png"
        className="min-h-[60vh] flex items-center justify-center"
        overlayClassName="bg-black/60"
      >
        <div className="relative z-10 py-16 px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6">
            Hotel Entertainment Hub
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
        {/* Project Description */}
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto space-y-16">
            <p className="text-2xl text-neutral-300 font-light mb-16 leading-relaxed">
            Hotels often struggle to showcase their full range of services—think seasonal tours, spa treatments, specialty events, and curated dining experiences. As a result, guests miss opportunities to enhance their stay. The Hotel Entertainment Hub brings these offerings together in one intuitive interface, making it simple for guests to discover, enjoy, and manage their entire hotel experience from a single touchpoint.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="col-span-1">
                <h2 className="text-xl font-semibold mb-4 text-neutral-200">
                  Research & Discovery
                </h2>
              </div>
              <div className="col-span-2 space-y-6">
                <p className="text-neutral-300 leading-relaxed">
                Our research uncovered guests’ key pain points: fragmented information driving them to seek help from the concierge or front desk, unclear pricing structures, and limited awareness of special offers. Across all traveler types—business guests, vacationing couples, and families—there was a consistent desire for a unified platform delivering transparent pricing, tailored recommendations, and an effortless booking, payment, and checkout experience.
                </p>
                
              </div>
            </div>

            <div className="border-t border-neutral-800"></div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="col-span-1">
                <h2 className="text-xl font-semibold mb-4 text-neutral-200">
                  User Preferences
                </h2>
              </div>
              <div className="col-span-2 space-y-6">
                <p className="text-neutral-300 leading-relaxed">
                  Through surveys and interviews, we learned that guests wanted a unified interface that showcased all hotel services in one place, with upfront pricing to eliminate unwelcome surprises. They valued personalized recommendations—such as highlighting kid-friendly activities for families or private lounge access for business travelers—and sought a seamless checkout flow to reduce reliance on the concierge or printed materials. Together, these preferences guided our approach to creating an experience that felt both intuitive and tailored to each guest's needs.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Overview Section */}
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="w-full prose prose-lg prose-invert">
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

        {/* New Section */}
        <div className="max-w-7xl mx-auto px-4 pt-16 md:pt-24 pb-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="col-span-1">
                <h2 className="text-xl font-semibold mb-4 text-neutral-200">
                  Watch
                </h2>
              </div>
              <div className="col-span-2 space-y-6">
                <p className="text-neutral-300 leading-relaxed">
                  Guests can browse a curated library of on-demand movies, TV shows, and documentaries. With user-friendly filters and personalized recommendations, it's easy to find something that suits every mood—whether you're winding down after a long flight or settling in for a cozy family movie night.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Image Grid Section */}
        <div className="max-w-7xl mx-auto px-4 pt-8 pb-16 md:pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
              <img
                src="/images/watch-grid.gif"
                alt="Hotel Entertainment Hub Watch Grid View"
                className="object-contain w-full h-full"
              />
            </div>
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
              <img
                src="/images/watch-detail.png"
                alt="Hotel Entertainment Hub Watch Detail View"
                className="object-contain w-full h-full"
              />
            </div>
          </div>
        </div>

        {/* Play Section */}
        <div className="max-w-7xl mx-auto px-4 pt-16 md:pt-24 pb-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="col-span-1">
                <h2 className="text-xl font-semibold mb-4 text-neutral-200">
                  Play
                </h2>
              </div>
              <div className="col-span-2 space-y-6">
                <p className="text-neutral-300 leading-relaxed">
                  Turn downtime into fun time with interactive games, puzzles, and trivia. Guests can play solo or enjoy group activities, making in-room entertainment more engaging for families, couples, and colleagues.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Play Images Grid Section */}
        <div className="max-w-7xl mx-auto px-4 pt-8 pb-16 md:pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
              <img
                src="/images/game-grid.gif"
                alt="Hotel Entertainment Hub Game Grid View"
                className="object-contain w-full h-full"
              />
            </div>
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
              <img
                src="/images/game-detail.png"
                alt="Hotel Entertainment Hub Game Detail View"
                className="object-contain w-full h-full"
              />
            </div>
          </div>
        </div>

        {/* Listen Section */}
        <div className="max-w-7xl mx-auto px-4 pt-16 md:pt-24 pb-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="col-span-1">
                <h2 className="text-xl font-semibold mb-4 text-neutral-200">
                  Listen
                </h2>
              </div>
              <div className="col-span-2 space-y-6">
                <p className="text-neutral-300 leading-relaxed">
                  Enjoy curated playlists that set the right atmosphere. From soothing tunes to start the morning to upbeat mixes for a pre-dinner mood, guests can shape their environment through music.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Listen Images Grid Section */}
        <div className="max-w-7xl mx-auto px-4 pt-8 pb-16 md:pb-24">
          <div className="max-w-4xl mx-auto">
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
              <img
                src="/images/Listen_Detail.png"
                alt="Hotel Entertainment Hub Listen Detail View"
                className="object-contain w-full h-full"
              />
            </div>
          </div>
        </div>

        {/* Stay Section */}
        <div className="max-w-7xl mx-auto px-4 pt-16 md:pt-24 pb-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="col-span-1">
                <h2 className="text-xl font-semibold mb-4 text-neutral-200">
                  Stay
                </h2>
              </div>
              <div className="col-span-2 space-y-6">
                <p className="text-neutral-300 leading-relaxed">
                  Beyond entertainment, this section empowers guests to book a spa session, schedule a tour, reserve event tickets, or sample a curated dining experience—all in a few taps. It also streamlines practical tasks, allowing guests to set alarms, check out seamlessly, and handle payments without leaving their room.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stay Images Grid Section */}
        <div className="max-w-7xl mx-auto px-4 pt-8 pb-16 md:pb-24">
          <ImageCarousel images={stayImages} />
        </div>

        {/* Bottom Navigation */}
        <CaseStudyNav prevCase={prevCase} nextCase={nextCase} className="py-16" />
      </div>
    </div>
  );
}
