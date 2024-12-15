import React, { useState, useEffect, Suspense, lazy, memo } from 'react';
import { AnimatedTooltip } from '../components/ui/animated-tooltip';
import { BlurImageBackground } from '../components/ui/blur-image-background';
import { Skeleton } from '../components/ui/skeleton';
import CaseStudyNav from '../components/ui/case-study-nav';
import { getNavigation } from '../config/case-studies';
import { useColor } from 'color-thief-react';
import { motion, AnimatePresence } from "framer-motion";
import { IconX } from '@tabler/icons-react';
import ImageCarousel from '../components/ImageCarousel';

const Lottie = lazy(() => import('lottie-react'));

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

const ModalImage = memo(({ src, alt, onClose }) => (
  <div className="p-4">
    <img
      src={src}
      alt={alt}
      className="max-w-full max-h-[80vh] object-contain mx-auto"
    />
  </div>
));

const ImageSection = memo(({ src, alt, onClick }) => {
  const [isLoading, setIsLoading] = useState(true);
  
  return (
    <div className="relative w-full aspect-[16/9]">
      {isLoading && (
        <div className="absolute inset-0">
          <Skeleton className="w-full h-full rounded-xl" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        onClick={onClick}
        onLoad={() => setIsLoading(false)}
        className={`w-full h-full object-cover rounded-xl cursor-pointer transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ minHeight: '300px' }}
      />
    </div>
  );
});

export default function HotelEntertainmentHub() {
  const [backgroundColor, setBackgroundColor] = useState("rgba(20, 20, 20, 0.9)");
  const [isLoading, setIsLoading] = useState(true);
  const [animationData, setAnimationData] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

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

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setSelectedImage(null);
      }
    };

    if (selectedImage) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [selectedImage]);

  return (
    <>
      <CaseStudyNav navigation={getNavigation()} className="absolute top-0 left-0 right-0 z-50" />
      <main className="min-h-screen bg-neutral-950">
        {/* Hero Section */}
        <BlurImageBackground 
          imageSrc="/images/hotel-entertainment-hub.png"
          className="min-h-[60vh] flex items-center justify-center"
          overlayClassName="bg-black/60"
        >
          <div className="relative z-10 py-16 px-4">
            {/* Hero Element 1: Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-white mb-6">
              Hotel Entertainment Hub
            </h1>
            
            {/* Hero Element 2: Description */}
            <p className="text-white text-center max-w-2xl mx-auto text-lg md:text-xl mb-12">
              A console app enabling guests to access hotel services and enjoy entertainment like movies, music, and games from their rooms.
            </p>
            
            {/* Hero Element 3: Project Details Grid */}
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
                  <Suspense fallback={<Skeleton className="w-full h-full" />}>
                    <AnimatedTooltip items={teamMembers} />
                  </Suspense>
                </div>
              </div>
            </div>
          </div>
        </BlurImageBackground>

        {/* Main Content */}
        <div className="bg-transparent">
          {/* Project Description */}
          <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
            <div className="max-w-4xl mx-auto space-y-16">
              <p className="text-2xl text-neutral-300 font-normal mb-16 leading-relaxed">
              Hotels often struggle to showcase their full range of services—think seasonal tours, spa treatments, specialty events, and curated dining experiences. As a result, guests miss opportunities to enhance their stay. The Hotel Entertainment Hub brings these offerings together in one intuitive interface, making it simple for guests to discover, enjoy, and manage their entire hotel experience from a single touchpoint.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="col-span-1">
                  <h2 className="text-xl font-semibold mb-4 text-neutral-200">
                    Research & Discovery
                  </h2>
                </div>
                <div className="col-span-2 space-y-6">
                  <p className="text-neutral-300 leading-relaxed text-lg">
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
                  <p className="text-neutral-300 leading-relaxed text-lg">
                    Through surveys and interviews, we learned that guests wanted a unified interface that showcased all hotel services in one place, with upfront pricing to eliminate unwelcome surprises. They valued personalized recommendations—such as highlighting kid-friendly activities for families or private lounge access for business travelers—and sought a seamless checkout flow to reduce reliance on the concierge or printed materials. Together, these preferences guided our approach to creating an experience that felt both intuitive and tailored to each guest’s needs.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Overview Section */}
          <div className="max-w-7xl mx-auto px-4 pt-16 md:pt-24 pb-8">
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
                  <p className="text-neutral-300 leading-relaxed text-lg">
                    Guests can browse a curated library of on-demand movies, TV shows, and documentaries. With user-friendly filters and personalized recommendations, it’s easy to find something that suits every mood—whether you’re winding down after a long flight or settling in for a cozy family movie night.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Watch Images Grid Section */}
          <div className="max-w-7xl mx-auto px-4 pt-8 pb-16 md:pb-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div 
                className="relative aspect-[16/10] overflow-hidden rounded-xl cursor-pointer"
                onClick={() => setSelectedImage({ src: '/images/watch-grid.gif', alt: 'Hotel Entertainment Hub Watch Grid View' })}
              >
                <img
                  src="/images/watch-grid.gif"
                  alt="Hotel Entertainment Hub Watch Grid View"
                  className="object-contain w-full h-full"
                />
              </div>
              <div 
                className="relative aspect-[16/10] overflow-hidden rounded-xl cursor-pointer"
                onClick={() => setSelectedImage({ src: '/images/watch-detail.png', alt: 'Hotel Entertainment Hub Watch Detail View' })}
              >
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
                  <p className="text-neutral-300 leading-relaxed text-lg">
                    Turn downtime into fun time with interactive games, puzzles, and trivia. Guests can play solo or enjoy group activities, making in-room entertainment more engaging for families, couples, and colleagues.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Play Images Grid Section */}
          <div className="max-w-7xl mx-auto px-4 pt-8 pb-16 md:pb-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div 
                className="relative aspect-[16/10] overflow-hidden rounded-xl cursor-pointer"
                onClick={() => setSelectedImage({ src: '/images/game-grid.gif', alt: 'Hotel Entertainment Hub Game Grid View' })}
              >
                <img
                  src="/images/game-grid.gif"
                  alt="Hotel Entertainment Hub Game Grid View"
                  className="object-contain w-full h-full"
                />
              </div>
              <div 
                className="relative aspect-[16/10] overflow-hidden rounded-xl cursor-pointer"
                onClick={() => setSelectedImage({ src: '/images/game-detail.png', alt: 'Hotel Entertainment Hub Game Detail View' })}
              >
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
                  <p className="text-neutral-300 leading-relaxed text-lg">
                    Enjoy curated playlists that set the right atmosphere. From soothing tunes to start the morning to upbeat mixes for a pre-dinner mood, guests can shape their environment through music.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Listen Images Grid Section */}
          <div className="max-w-7xl mx-auto px-4 pt-8 pb-16 md:pb-24">
            <div className="max-w-4xl mx-auto">
              <div 
                className="relative aspect-[16/10] overflow-hidden rounded-xl cursor-pointer"
                onClick={() => setSelectedImage({ src: '/images/Listen_Detail.png', alt: 'Hotel Entertainment Hub Listen Detail View' })}
              >
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
                  <p className="text-neutral-300 leading-relaxed text-lg">
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

          {/* Outcome Section */}
          <div className="max-w-7xl mx-auto px-4 pt-16 md:pt-24 pb-24">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="col-span-1">
                  <h2 className="text-xl font-semibold mb-4 text-neutral-200">
                    Outcome
                  </h2>
                </div>
                <div className="col-span-2 space-y-6">
                  <p className="text-neutral-300 leading-relaxed text-lg">
                    By consolidating discovery, personalization, and bookings into one platform, the Hotel Entertainment Hub transforms an ordinary hotel visit into a memorable journey. Guests engage more deeply with the hotel's offerings, rely less on support staff, and ultimately enjoy a richer, more convenient stay.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Grid Image Section */}
          <div className="max-w-7xl mx-auto px-4 pb-24">
            <ImageSection 
              src="/images/feature-grid.png"
              alt="Hotel Entertainment Hub Feature Grid"
              onClick={() => setSelectedImage({ 
                src: '/images/feature-grid.png', 
                alt: 'Hotel Entertainment Hub Feature Grid' 
              })}
            />
          </div>

          {/* Divider */}
          <div className="max-w-7xl mx-auto px-4">
            <div className="border-t border-neutral-800 mb-12"></div>
          </div>

          {/* ProtoPie Text */}
          <div className="max-w-7xl mx-auto px-4 mb-8">
            <p className="text-neutral-400 text-lg text-center">Check the full prototype below</p>
          </div>

          {/* ProtoPie Prototype Section */}
          <div className="max-w-7xl mx-auto px-4 pb-24">
            <div className="relative w-full" style={{ aspectRatio: '16/9', minHeight: '500px' }}>
              <Suspense fallback={
                <div className="absolute inset-0">
                  <Skeleton className="w-full h-full rounded-xl" />
                </div>
              }>
                <iframe
                  src="https://cloud.protopie.io/p/efd2a0e232?ui=false&scaleToFit=true&enableHotspotHints=true&cursorType=touch&mockup=true&bgColor=%23F5F5F5&bgImage=undefined&playSpeed=1"
                  title="Hotel Entertainment Hub Prototype"
                  className="absolute inset-0 w-full h-full border-0 rounded-xl"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              </Suspense>
            </div>
          </div>

          {/* Bottom Navigation */}
          <CaseStudyNav prevCase={prevCase} nextCase={nextCase} className="py-16" />
        </div>

        {/* Full Screen Modal */}
        <AnimatePresence>
          {selectedImage && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedImage(null)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[5000]"
              />
              <div className="fixed inset-0 overflow-y-auto z-[5001]">
                <div className="flex min-h-full items-center justify-center p-4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    className="relative bg-neutral-900 rounded-2xl shadow-xl max-w-[90vw] max-h-[90vh] overflow-hidden"
                  >
                    <div className="absolute top-4 right-4 z-10">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedImage(null);
                        }}
                        className="rounded-full p-2 hover:bg-white/10 transition-colors"
                      >
                        <IconX className="w-6 h-6 text-white" />
                      </button>
                    </div>
                    <Suspense fallback={<Skeleton className="w-full h-full" />}>
                      <ModalImage 
                        src={selectedImage?.src}
                        alt={selectedImage?.alt}
                        onClose={() => setSelectedImage(null)}
                      />
                    </Suspense>
                  </motion.div>
                </div>
              </div>
            </>
          )}
        </AnimatePresence>
      </main>
    </>
  );
}
