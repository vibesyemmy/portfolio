import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../utils/cn";
import { BorderButton } from "./border-button";
import logo from "../../assets/logo.svg";

export const FloatingNav = ({ navItems, className }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const element = sectionId === "#" ? document.body : document.querySelector(sectionId);
    if (element) {
      const offset = sectionId === "#" ? 0 : element.offsetTop;
      window.scrollTo({
        top: offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={cn(
          "flex fixed top-4 inset-x-0 mx-auto border border-white/[0.2] rounded-full bg-black/30 backdrop-blur-md shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1)] z-[5000] pl-8 pr-4 py-4 items-center",
          "w-[90%] custom:max-w-fit",
          className
        )}
      >
        <a 
          href="#" 
          className="hover:opacity-75 transition-opacity"
          onClick={(e) => scrollToSection(e, "#")}
        >
          <img src={logo} alt="Logo" className="h-[32px] w-auto" />
        </a>
        
        {/* Desktop Navigation */}
        <div className="ml-[100px] hidden custom:flex items-center">
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
            const href = item.name === "My Projects" ? "#projects" : item.link;
            return (
              <a
                key={item.name}
                href={href}
                className="relative px-4 py-2 group bg-transparent"
                onClick={(e) => {
                  setActiveIndex(index);
                  if (item.name === "My Projects") {
                    scrollToSection(e, "#projects");
                  }
                }}
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
              </a>
            );
          })}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="ml-auto custom:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <div className="w-6 h-5 relative flex flex-col justify-between">
            <span className={cn(
              "w-full h-0.5 bg-white transition-transform duration-200",
              isMobileMenuOpen && "rotate-45 translate-y-2"
            )} />
            <span className={cn(
              "w-full h-0.5 bg-white transition-opacity duration-200",
              isMobileMenuOpen && "opacity-0"
            )} />
            <span className={cn(
              "w-full h-0.5 bg-white transition-transform duration-200",
              isMobileMenuOpen && "-rotate-45 -translate-y-2"
            )} />
          </div>
        </button>
      </motion.div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[4999] pt-24 px-4 bg-black/95 backdrop-blur-sm custom:hidden"
          >
            <div className="flex flex-col items-center gap-4">
              {navItems.map((item, index) => {
                if (item.name === "Send a Message") {
                  return (
                    <BorderButton
                      key={item.name}
                      className="w-full max-w-sm"
                      onClick={() => {
                        setActiveIndex(index);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      {item.name}
                    </BorderButton>
                  );
                }
                const href = item.name === "My Projects" ? "#projects" : item.link;
                return (
                  <a
                    key={item.name}
                    href={href}
                    className="w-full max-w-sm py-3 text-center"
                    onClick={(e) => {
                      setActiveIndex(index);
                      setIsMobileMenuOpen(false);
                      if (item.name === "My Projects") {
                        scrollToSection(e, "#projects");
                      }
                    }}
                  >
                    <span
                      className={cn(
                        "text-lg transition-colors duration-200",
                        activeIndex === index 
                          ? "text-white font-medium" 
                          : "text-neutral-300"
                      )}
                    >
                      {item.name}
                    </span>
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
