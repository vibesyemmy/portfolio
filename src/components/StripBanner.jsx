import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MESSAGES = [
  {
    id: 'flatmagic',
    emoji: '🪄',
    title: 'FlatMagic 1.3.0',
    description: 'A Figma plugin that flattens complex frames into single images.',
    shortDescription: 'FlatMagic 1.3.0',
    link: 'https://www.figma.com/community/plugin/1448869823988608422/flatmagic',
    linkText: 'Try on Figma'
  },
  {
    id: 'uxbuddy',
    image: '/images/uxbuddy.svg',
    title: 'UX Buddy',
    description: 'An AI-powered UX research assistant that streamlines your design process.',
    shortDescription: 'UX Buddy',
    link: 'https://www.figma.com/community/plugin/1513874084032014970/ux-buddy',
    linkText: 'Try on Figma'
  }
];

const MESSAGE_DURATION = 5000; // 5 seconds per message

export default function StripBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY <= lastScrollY || currentScrollY === 0);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    if (MESSAGES.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % MESSAGES.length);
    }, MESSAGE_DURATION);

    return () => clearInterval(interval);
  }, []);

  const currentMessage = MESSAGES[currentIndex];
  const totalMessages = MESSAGES.length;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -28 }}
          animate={{ y: 0 }}
          exit={{ y: -28 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="w-full h-7 bg-gradient-to-r from-[#7E22CE] to-[#2563EB] backdrop-blur-sm border-b border-purple-700/20 fixed top-0 left-0 right-0 z-[49]"
        >
      <div className="h-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-full gap-2">
          <div className="flex-1 flex items-center justify-center min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentMessage.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-1 flex-wrap justify-center"
              >
                <p className="text-sm text-white font-medium flex items-center gap-1">
                  {currentMessage.image ? (
                    <img 
                      src={currentMessage.image} 
                      alt={currentMessage.title}
                      className="w-4 h-4 inline-block"
                    />
                  ) : (
                    <span>{currentMessage.emoji}</span>
                  )}
                  <span className="hidden lg:inline">
                    Introducing <span className="font-bold">{currentMessage.title}</span> - {currentMessage.description}
                  </span>
                  <span className="lg:hidden">
                    Introducing <span className="font-bold">{currentMessage.shortDescription}</span>.
                  </span>
                </p>
                <a 
                  href={currentMessage.link}
                  target={currentMessage.link.startsWith('http') ? '_blank' : undefined}
                  rel={currentMessage.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="text-sm text-white font-medium underline hover:text-white/90 transition-colors whitespace-nowrap"
                >
                  {currentMessage.linkText}
                </a>
              </motion.div>
            </AnimatePresence>
          </div>
          
          {totalMessages > 1 && (
            <div className="flex-shrink-0 ml-2 flex items-center gap-1.5">
              {MESSAGES.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className="focus:outline-none focus:ring-0 ring-0 p-0 bg-transparent border-0 active:bg-transparent hover:bg-transparent appearance-none"
                  aria-label={`Go to message ${index + 1}`}
                >
                  <div
                    className={`transition-all duration-300 rounded-full ${
                      index === currentIndex
                        ? 'w-2 h-2 bg-white'
                        : 'w-1.5 h-1.5 bg-white/50'
                    }`}
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
      )}
    </AnimatePresence>
  );
}
