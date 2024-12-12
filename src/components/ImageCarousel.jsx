import React, { useState, useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { IconChevronLeft, IconChevronRight, IconX } from '@tabler/icons-react';
import { motion, AnimatePresence } from "framer-motion";

const ImageCarousel = ({ images }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    slidesToScroll: 1,
    align: 'start',
    containScroll: 'trimSnaps',
    loop: false,
    dragFree: true,
  });

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [autoplayInterval, setAutoplayInterval] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback((index) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setSelectedImage(null);
      }
    };

    if (selectedImage !== null) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [selectedImage]);

  // Start autoplay
  useEffect(() => {
    if (!emblaApi) return;

    const startAutoplay = () => {
      const interval = setInterval(() => {
        if (emblaApi.canScrollNext()) {
          emblaApi.scrollNext();
        } else {
          // Stop autoplay when reaching the end
          clearInterval(interval);
          setAutoplayInterval(null);
        }
      }, 3000);
      setAutoplayInterval(interval);
    };

    const stopAutoplay = () => {
      if (autoplayInterval) {
        clearInterval(autoplayInterval);
        setAutoplayInterval(null);
      }
    };

    // Start autoplay initially
    startAutoplay();

    // Stop autoplay on user interaction
    emblaApi.on('pointerDown', stopAutoplay);
    emblaApi.on('pointerUp', startAutoplay);

    // Cleanup
    return () => {
      stopAutoplay();
      if (emblaApi) {
        emblaApi.off('pointerDown', stopAutoplay);
        emblaApi.off('pointerUp', startAutoplay);
      }
    };
  }, [emblaApi, autoplayInterval]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);

    return () => {
      if (emblaApi) {
        emblaApi.off('select', onSelect);
        emblaApi.off('reInit', onSelect);
      }
    };
  }, [emblaApi, onSelect]);

  return (
    <>
      <div className="relative max-w-7xl mx-auto">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-8">
            {images.map((image, index) => (
              <div
                className="flex-[0_0_calc(50%-16px)] min-w-0 relative aspect-[16/10] overflow-hidden rounded-xl cursor-pointer"
                key={index}
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="object-contain w-full h-full"
                />
              </div>
            ))}
          </div>
        </div>
        
        <button
          className={`absolute left-4 top-1/2 -translate-y-1/2 rounded-full p-2 hover:bg-white/10 transition-colors ${
            !prevBtnEnabled ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={scrollPrev}
          disabled={!prevBtnEnabled}
        >
          <IconChevronLeft className="w-6 h-6 text-white" />
        </button>

        <button
          className={`absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-2 hover:bg-white/10 transition-colors ${
            !nextBtnEnabled ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={scrollNext}
          disabled={!nextBtnEnabled}
        >
          <IconChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {images.map((_, index) => (
          <button
            key={index}
            className={`rounded-full transition-all ${
              index === selectedIndex 
                ? 'bg-white scale-100 outline outline-2 outline-neutral-600' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
            onClick={() => scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
            style={{
              width: '6px',
              height: '6px',
              minWidth: '6px',
              minHeight: '6px',
              padding: 0,
              outlineOffset: '2px'
            }}
          />
        ))}
      </div>

      {/* Full Screen Modal */}
      <AnimatePresence>
        {selectedImage && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[5000]"
            />
            <div className="fixed inset-0 overflow-y-auto z-[5001]">
              <div className="flex min-h-full items-center justify-center p-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  className="relative bg-neutral-900 rounded-2xl shadow-xl max-w-[90vw] max-h-[90vh] overflow-hidden"
                >
                  <div className="absolute top-4 right-4 z-10">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImage(null);
                      }}
                      className="rounded-full p-2 hover:bg-white/10 transition-colors"
                    >
                      <IconX className="w-6 h-6 text-white" />
                    </button>
                  </div>
                  <div className="p-4">
                    <img
                      src={selectedImage.src}
                      alt={selectedImage.alt}
                      className="max-w-full max-h-[80vh] object-contain mx-auto"
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ImageCarousel;
