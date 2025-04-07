import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HoverBorderGradient } from "../components/ui/hover-border-gradient";
import { AnimatedPin } from "../components/ui/animated-pin";
import HeroVideo from "../assets/hero-video.mp4";
import UxcelIcon from "../assets/uxcel.svg";
import { IconBrandLinkedin, IconBrandGithub, IconBrandDribbble, IconBrandFigma, IconMail } from '@tabler/icons-react';
import { BackgroundBeams } from "../components/ui/background-beams.tsx";
import { InfiniteMovingLogos } from "../components/ui/infinite-moving-logos";
import { motion } from "framer-motion";

export default function TestPage() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  
  return (
    <main className="min-h-screen bg-neutral-950 relative overflow-hidden">
      {/* Go Back Button */}
      <div className="absolute top-6 left-6 z-20">
        <Link 
          to="/" 
          className="flex items-center gap-2 text-white hover:text-purple-400 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          <span>Go Back</span>
        </Link>
      </div>
      
      {/* Hero Section */}
      <div className="h-[100vh] w-full relative flex flex-col items-center justify-center antialiased overflow-hidden">
        {/* Background with enhanced opacity for mobile */}
        <div className="absolute inset-0 w-full h-full bg-neutral-950">
          <BackgroundBeams className="opacity-75 sm:opacity-85 md:opacity-90" />
        </div>
        
        <div className="max-w-6xl mx-auto px-4 relative z-10 py-12 md:py-0">
          <motion.div 
            className="relative z-10 w-[140px] h-[140px] md:w-[200px] md:h-[200px] lg:w-[240px] lg:h-[240px] mx-auto mb-6 md:mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <AnimatedPin>
              <HoverBorderGradient>
                <div className="w-full h-full rounded-full bg-neutral-900 overflow-hidden">
                  <video 
                    src={HeroVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover rounded-full bg-neutral-950"
                    aria-label="Profile video"
                  />
                </div>
              </HoverBorderGradient>
            </AnimatedPin>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h1 className="relative z-10 text-3xl sm:text-5xl md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold">
              Senior Product Designer
            </h1>
            <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm sm:text-base md:text-lg text-center relative z-10">
              Hello, I'm Opeyemi.
            </p>
            <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm sm:text-base md:text-lg text-center relative z-10">
              I craft digital products that empower people and drive business growth.
            </p>
          </motion.div>
          
          {/* Social Icons */}
          <motion.div 
            className="flex justify-center gap-6 mb-8 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {[
              {
                icon: IconMail,
                href: '#',
                label: 'Email'
              },
              {
                icon: IconBrandLinkedin,
                href: 'https://www.linkedin.com/in/opeyemi-ajagbe/',
                label: 'LinkedIn'
              },
              {
                icon: IconBrandDribbble,
                href: 'https://dribbble.com/opeyemiajagbe',
                label: 'Dribbble'
              },
              {
                icon: IconBrandGithub,
                href: 'https://github.com/vibesyemmy',
                label: 'Github'
              },
              {
                icon: IconBrandFigma,
                href: 'https://www.figma.com/@opeyemiajagbe',
                label: 'Figma'
              }
            ].map(({ icon: Icon, href, label }) => (
              <a 
                key={label} 
                href={href === '#' ? 'javascript:void(0)' : href} 
                target={href === '#' ? '_self' : '_blank'} 
                rel="noopener noreferrer" 
                className="text-neutral-400 hover:text-neutral-100 transition-colors duration-300 group"
                aria-label={label}
              >
                {typeof Icon === 'string' ? (
                  <img 
                    src={Icon} 
                    alt={label} 
                    className="w-6 h-6 brightness-50 opacity-80 group-hover:brightness-200 group-hover:opacity-100 group-hover:scale-110 transition-transform"
                  />
                ) : (
                  <Icon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                )}
              </a>
            ))}
          </motion.div>
        </div>
        <div className="absolute bottom-4 md:bottom-5 w-full z-10">
          <InfiniteMovingLogos />
        </div>
      </div>
    </main>
  );
}
