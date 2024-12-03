import React, { useEffect, useRef } from "react";
import { cn } from "../../utils/cn";

export const BackgroundBeams = ({ className }) => {
  const containerRef = useRef(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      
      mouseX.current = x;
      mouseY.current = y;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const interval = setInterval(() => {
      if (containerRef.current) {
        const style = containerRef.current.style;
        const x = mouseX.current;
        const y = mouseY.current;

        style.setProperty("--x", `${x}px`);
        style.setProperty("--y", `${y}px`);
      }
    }, 16); // 60fps update

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "absolute inset-0 opacity-30 bg-black",
        className
      )}
    >
      <div
        className="absolute inset-0 [background:radial-gradient(circle_800px_at_var(--x,100px)_var(--y,200px),#4c00ff,transparent_100%)]"
        style={{
          transform: "translate(-50%, -50%)",
        }}
      />
      <div
        className="absolute inset-0 [background:radial-gradient(circle_400px_at_var(--x,100px)_var(--y,200px),#4c00ff,transparent_100%)]"
        style={{
          transform: "translate(-50%, -50%)",
        }}
      />
    </div>
  );
};
