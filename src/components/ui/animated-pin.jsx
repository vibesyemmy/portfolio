import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

export const AnimatedPin = ({ children }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const containerRef = useRef(null);
  const pinRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseMove = (e) => {
    if (!containerRef.current || isMobile) return;
    
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    // Calculate rotation (limited to +/- 15 degrees)
    const rotateY = (mouseX / (rect.width / 2)) * 15;
    const rotateX = -(mouseY / (rect.height / 2)) * 15;
    
    setRotateX(rotateX);
    setRotateY(rotateY);
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div 
      ref={containerRef}
      className="relative inline-block"
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: "1000px",
      }}
    >
      <motion.div
        animate={{
          scale: isHovered && !isMobile ? 1.05 : 1,
          rotateX: rotateX,
          rotateY: rotateY,
          z: isHovered && !isMobile ? 50 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25,
        }}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {children}
      </motion.div>

      <motion.div
        ref={pinRef}
        initial={{ opacity: 0, y: 20, scale: 0.6 }}
        animate={{ 
          opacity: isMobile || isHovered ? 1 : 0,
          y: isMobile || isHovered ? 0 : 20,
          scale: isMobile || isHovered ? 1 : 0.6,
          rotateX: rotateX * 0.5,
          rotateY: rotateY * 0.5,
        }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20
        }}
        style={{
          transformStyle: "preserve-3d",
        }}
        className="absolute -top-16 left-[calc(50%-75px)] -translate-x-1/2 z-50 pointer-events-none origin-bottom"
      >
        <div className="relative bg-[#272727] text-white px-4 py-2 rounded-xl text-sm font-medium shadow-xl whitespace-nowrap">
          <div className="flex items-center gap-2">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
            >
              <path
                d="M12 0C7.453 0 3.623 3.853 3.623 8.429c0 6.502 7.179 14.931 7.485 15.287a1.176 1.176 0 0 0 1.784 0c.306-.356 7.485-8.785 7.485-15.287C20.377 3.853 16.547 0 12 0zm0 12.714c-2.368 0-4.286-1.94-4.286-4.285C7.714 6.083 9.633 4.143 12 4.143c2.368 0 4.286 1.94 4.286 4.285 0 2.345-1.918 4.285-4.286 4.285z"
                fill="currentColor"
              />
            </svg>
            Lagos, Nigeria
          </div>
          <div className="absolute -bottom-1 left-1/2 w-2 h-2 bg-[#272727] rotate-45 -translate-x-1/2 translate-y-1/6"></div>
        </div>
      </motion.div>
    </div>
  );
};
