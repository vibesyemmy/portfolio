import React, { useState, useEffect } from 'react';

export default function StripBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY <= lastScrollY || currentScrollY === 0);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div 
      className={`w-full h-7 bg-gradient-to-r from-[#7E22CE] to-[#2563EB] backdrop-blur-sm border-b border-purple-700/20 fixed top-0 left-0 right-0 z-[49] transform transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="h-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-full gap-1">
          <p className="text-sm text-white font-medium">
            <span className="hidden lg:inline">🪄Introducing <span className="font-bold">FlatMagic 1.3.0</span> - A Figma plugin that flattens complex frames into single images.</span>
            <span className="lg:hidden">🪄Introducing <span className="font-bold">FlatMagic 1.3.0</span>.</span>
          </p>
          <a 
            href="https://www.figma.com/community/plugin/1448869823988608422/flatmagic"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-white font-medium underline hover:text-white/90 transition-colors"
          >
            Try on Figma
          </a>
        </div>
      </div>
    </div>
  );
}
