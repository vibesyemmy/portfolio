import React, { useState } from "react";
import { InfiniteMovingLogos } from "./ui/infinite-moving-logos";
import { HoverBorderGradient } from "./ui/hover-border-gradient";
import { AnimatedPin } from "./ui/animated-pin";
import HeroVideo from "../assets/hero-video.mp4";
import UxcelIcon from "../assets/uxcel.svg";
import { IconBrandLinkedin, IconBrandGithub, IconBrandDribbble, IconBrandFigma, IconMail } from '@tabler/icons-react';
import { Modal } from './ui/modal';
import { ContactForm } from './ui/contact-form';
import { BackgroundBeams } from "./ui/background-beams.tsx";

export default function Hero() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  
  return (
    <>
      <div className="xs:h-[150vh] h-[105vh] md:h-screen w-full relative flex flex-col items-center justify-center antialiased overflow-hidden">
        {/* Background with enhanced opacity for mobile */}
        <div className="absolute inset-0 w-full h-full bg-neutral-950">
          <BackgroundBeams className="opacity-75 sm:opacity-85 md:opacity-90" />
        </div>
        
        <div className="max-w-6xl mx-auto px-4 relative z-10 py-12 md:py-0">
          <div className="relative z-10 w-[140px] h-[140px] md:w-[200px] md:h-[200px] lg:w-[240px] lg:h-[240px] mx-auto mb-6 md:mb-8">
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
          </div>
          <h1 className="relative z-10 text-3xl sm:text-5xl md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold">
            Senior Product Designer
          </h1>
          <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm sm:text-base md:text-lg text-center relative z-10">
            Hello, I'm Opeyemi.
          </p>
          <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm sm:text-base md:text-lg text-center relative z-10">
            I craft digital products that empower people and drive business growth.
          </p>
          
          
          {/* Social Icons */}
          <div className="flex justify-center gap-6 mb-8 mt-8">
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
              },
              {
                icon: UxcelIcon,
                href: 'https://app.uxcel.com/ux/opeyemiajagbe',
                label: 'Uxcel'
              }
            ].map(({ icon: Icon, href, label }) => {
              if (label === 'Email') {
                return (
                  <button
                    key={label}
                    onClick={() => setIsContactModalOpen(true)}
                    className="text-neutral-400 hover:text-neutral-100 transition-colors group p-0 bg-transparent border-0 focus:outline-none focus:ring-0 active:bg-transparent"
                    aria-label={label}
                  >
                    <Icon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  </button>
                );
              }
              return (
                <a 
                  key={label} 
                  href={href} 
                  target="_blank" 
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
              );
            })}
          </div>
        </div>
        <div className="absolute bottom-4 md:bottom-5 w-full z-10">
          <InfiniteMovingLogos />
        </div>
      </div>

      <Modal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)}>
        <ContactForm onClose={() => setIsContactModalOpen(false)} />
      </Modal>
    </>
  );
}
