import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../utils/cn";
import { BorderButton } from "./border-button";
import { Modal } from "./modal";
import { ContactForm } from "./contact-form";
import logo from "../../assets/logo.svg";

export const FloatingNav = ({ navItems, className }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (location.pathname === '/') {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      navigate('/');
    }
  };

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = sectionId === "#" ? document.body : document.querySelector(sectionId);
        if (element) {
          const offset = sectionId === "#" ? 0 : element.offsetTop;
          window.scrollTo({
            top: offset,
            behavior: "smooth",
          });
        }
      }, 100);
    } else {
      const element = sectionId === "#" ? document.body : document.querySelector(sectionId);
      if (element) {
        const offset = sectionId === "#" ? 0 : element.offsetTop;
        window.scrollTo({
          top: offset,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={cn(
          "flex fixed top-4 inset-x-0 mx-auto border border-white/[0.2] rounded-full bg-black/30 backdrop-blur-md shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1)] z-[5000] pl-8 pr-4 py-4 items-center justify-between",
          "w-[90%] custom:max-w-fit",
          className
        )}
      >
        {/* Logo */}
        <div className="text-white">
          <a href="/" onClick={handleLogoClick}>
            <img src={logo} alt="Logo" className="h-6 md:h-8 w-auto" />
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden custom:flex items-center gap-0.5 ml-20">
          {navItems.map((item, index) => {
            if (item.name === "Send a Message") {
              return (
                <BorderButton
                  key={item.name}
                  className="ml-2"
                  onClick={() => setIsContactModalOpen(true)}
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
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="custom:hidden p-2 hover:bg-neutral-800/50 rounded-lg"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            className="w-6 h-6 text-neutral-300"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMobileMenuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-20 mx-4 p-4 rounded-lg bg-black/80 backdrop-blur-sm border border-white/[0.2] shadow-xl z-50"
          >
            <nav className="flex flex-col space-y-4">
              {navItems.map((item, index) => (
                <a
                  key={item.name}
                  href={item.name === "My Projects" ? "#projects" : item.link}
                  className="text-neutral-300 hover:text-white px-4 py-2 rounded-lg hover:bg-neutral-800/50"
                  onClick={(e) => {
                    setActiveIndex(index);
                    setIsMobileMenuOpen(false);
                    if (item.name === "My Projects") {
                      scrollToSection(e, "#projects");
                    }
                  }}
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Form Modal */}
      <Modal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)}>
        <ContactForm onClose={() => setIsContactModalOpen(false)} />
      </Modal>
    </>
  );
};
