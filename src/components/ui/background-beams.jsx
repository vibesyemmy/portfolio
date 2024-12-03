"use client";
import { useEffect, useRef } from "react";
import { cn } from "../../utils/cn";

export const BackgroundBeams = ({ className }) => {
  const beamsRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (!beamsRef.current) return;

      const rect = beamsRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      beamsRef.current.style.setProperty("--x", `${x}px`);
      beamsRef.current.style.setProperty("--y", `${y}px`);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden",
        className
      )}
      ref={beamsRef}
    >
      <div
        className={cn(
          "absolute inset-0 transition-opacity",
          "bg-[radial-gradient(circle_800px_at_var(--x,50%)_var(--y,50%),#4c00ff_0,transparent_100%)]",
          "opacity-50"
        )}
      />
      <div className="absolute inset-0 bg-black/[0.8]" />
    </div>
  );
};
