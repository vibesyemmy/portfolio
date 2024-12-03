import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";
import { BorderButton } from "./border-button";
import logo from "../../assets/logo.svg";

export const FloatingNav = ({ navItems, className }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={cn("flex fixed top-4 inset-x-0 max-w-fit mx-auto border border-white/[0.2] rounded-full bg-black/30 backdrop-blur-md shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1)] z-[5000] px-8 py-4 items-center", className)}
    >
      <img src={logo} alt="Logo" className="h-[32px] w-auto" />
      <div className="ml-[100px] flex items-center">
        {navItems.map((item, index) => {
          if (item.name === "Send a Message") {
            return (
              <BorderButton
                key={item.name}
                className="ml-2"
                onClick={() => setActiveIndex(index)}
              >
                {item.name}
              </BorderButton>
            );
          }
          return (
            <button
              key={item.name}
              className="relative px-4 py-2 group bg-transparent"
              onClick={() => setActiveIndex(index)}
            >
              <span
                className={cn(
                  "text-sm transition-colors duration-200",
                  activeIndex === index 
                    ? "text-white font-medium" 
                    : "text-neutral-300 group-hover:text-white"
                )}
              >
                {item.name}
              </span>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
};
