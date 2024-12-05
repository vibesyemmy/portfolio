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
        "absolute inset-0 overflow-hidden bg-neutral-950",
        className
      )}
      ref={beamsRef}
    />
  );
};
