"use client";
import React, { useState, useRef, useEffect } from "react";

export const LensEffect = ({
  children,
  className = "",
  lensClass = "",
}) => {
  const divRef = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (divRef.current) {
      setSize({
        width: divRef.current.offsetWidth,
        height: divRef.current.offsetHeight,
      });
    }
  }, []);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;

    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setPosition({ x, y });
  };

  return (
    <div
      ref={divRef}
      className={`relative overflow-hidden group ${className}`}
      onMouseMove={handleMouseMove}
    >
      <div className="relative w-full h-full">
        {/* Content */}
        <div className="relative z-10">{children}</div>

        {/* Lens */}
        <div
          className={`pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity absolute -inset-px z-0 ${lensClass}`}
          style={{
            background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.1), transparent 40%)`,
          }}
        />
      </div>
    </div>
  );
};
