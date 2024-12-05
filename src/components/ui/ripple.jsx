"use client";
import React, { useEffect, useState } from "react";

export const Ripple = ({
  children,
  className = "",
  duration = 600,
  color = "rgba(255, 255, 255, 0.5)",
}) => {
  const [ripples, setRipples] = useState([]);

  useEffect(() => {
    const cleanupRipples = () => {
      setRipples([]);
    };

    return cleanupRipples;
  }, []);

  const addRipple = (event) => {
    const element = event.currentTarget;
    const rect = element.getBoundingClientRect();

    const diameter = Math.max(element.clientWidth, element.clientHeight);
    const radius = diameter / 2;

    const ripple = {
      x: event.clientX - rect.left - radius,
      y: event.clientY - rect.top - radius,
      diameter,
      id: Date.now(),
    };

    setRipples((prevRipples) => [...prevRipples, ripple]);

    setTimeout(() => {
      setRipples((prevRipples) =>
        prevRipples.filter((prevRipple) => prevRipple.id !== ripple.id)
      );
    }, duration);
  };

  return (
    <div
      className={`relative overflow-hidden cursor-pointer ${className}`}
      onClick={addRipple}
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          style={{
            position: "absolute",
            left: ripple.x,
            top: ripple.y,
            width: ripple.diameter,
            height: ripple.diameter,
            background: color,
            borderRadius: "50%",
            transform: "scale(0)",
            animation: `ripple ${duration}ms linear`,
            pointerEvents: "none",
          }}
        />
      ))}
      {children}
      <style>
        {`
          @keyframes ripple {
            to {
              transform: scale(2);
              opacity: 0;
            }
          }
        `}
      </style>
    </div>
  );
};
