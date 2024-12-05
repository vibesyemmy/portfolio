import React, { useEffect, useState } from "react";

export const BackgroundRipple = () => {
  const [ripples, setRipples] = useState([]);
  const [boundary, setBoundary] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateBoundary = () => {
      setBoundary({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateBoundary();
    window.addEventListener("resize", updateBoundary);

    const interval = setInterval(() => {
      const newRipple = {
        x: Math.random() * boundary.width,
        y: Math.random() * boundary.height,
        size: Math.random() * 100 + 50, // Random size between 50 and 150
        id: Date.now(),
      };

      setRipples((prev) => [...prev, newRipple]);

      // Remove ripple after animation
      setTimeout(() => {
        setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id));
      }, 4000); // Match this with the CSS animation duration
    }, 2000); // Create new ripple every 2 seconds

    return () => {
      window.removeEventListener("resize", updateBoundary);
      clearInterval(interval);
    };
  }, [boundary.width, boundary.height]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="absolute rounded-full animate-ripple-fade"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
            background: "radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, rgba(168, 85, 247, 0) 70%)",
          }}
        />
      ))}
    </div>
  );
};
