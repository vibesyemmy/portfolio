import React, { useState, useEffect } from "react";
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
  const [isStripVisible, setIsStripVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsStripVisible(currentScrollY <= lastScrollY || currentScrollY === 0);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

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
      <div
        className={cn(
          "fixed top-0 inset-x-0 max-w-2xl mx-auto z-50 transition-all duration-300",
          className,
        )}
      >
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={cn(
            "fixed inset-x-0 mx-auto border border-white/[0.2] rounded-full bg-black/30 backdrop-blur-md shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1)] z-[5000] pl-4 pr-2 py-2 items-center justify-between custom:pl-8 custom:pr-4 custom:py-4 flex transition-all duration-300",
            "w-[95%] custom:max-w-fit",
            isStripVisible ? "top-11" : "top-4",
            className
          )}
        >
          {/* Logo */}
          <div className="text-white">
            <a href="/" onClick={handleLogoClick} className="block w-[140px] md:w-[180px] h-6 md:h-8">
              <img 
                src={logo} 
                alt="Logo" 
                className="h-full w-auto" 
                loading="eager"
                decoding="async"
              />
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
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="custom:hidden relative p-3 rounded-full hover:bg-white/10 transition-colors duration-200 group"
          >
            <div className="absolute inset-0 rounded-full border border-white/[0.1] group-hover:border-white/[0.2] transition-colors" />
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </motion.div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[4999] bg-black/95 backdrop-blur-md custom:hidden"
          >
            <div className="flex flex-col items-center justify-center min-h-screen gap-8 p-8">
              {navItems.map((item, index) => {
                if (item.name === "Send a Message") {
                  return (
                    <BorderButton
                      key={item.name}
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setIsContactModalOpen(true);
                      }}
                      className="w-full max-w-[200px]"
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
                    onClick={(e) => {
                      setIsMobileMenuOpen(false);
                      if (item.name === "My Projects") {
                        scrollToSection(e, "#projects");
                      }
                    }}
                    className="text-xl font-medium text-white hover:text-blue-400 transition-colors"
                  >
                    {item.name}
                  </a>
                );
              })}
            </div>
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
