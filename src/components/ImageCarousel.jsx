import React, { useState, useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

const ImageCarousel = ({ images }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    slidesToScroll: 2,
    align: 'start',
    containScroll: 'trimSnaps',
    loop: true,
  });

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [autoplayInterval, setAutoplayInterval] = useState(null);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  // Start autoplay
  useEffect(() => {
    if (!emblaApi) return;

    const startAutoplay = () => {
      const interval = setInterval(() => {
        emblaApi.scrollNext();
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
    <div className="relative max-w-7xl mx-auto">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-8">
          {images.map((image, index) => (
            <div
              className="flex-[0_0_calc(50%-16px)] min-w-0 relative aspect-[16/10] overflow-hidden rounded-xl"
              key={index}
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
        className={`absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-neutral-900/80 text-white ${
          !prevBtnEnabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-neutral-800'
        }`}
        onClick={scrollPrev}
        disabled={!prevBtnEnabled}
      >
        <IconChevronLeft className="w-6 h-6 text-white" />
      </button>
      
      <button
        className={`absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-neutral-900/80 text-white ${
          !nextBtnEnabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-neutral-800'
        }`}
        onClick={scrollNext}
        disabled={!nextBtnEnabled}
      >
        <IconChevronRight className="w-6 h-6 text-white" />
      </button>
    </div>
  );
};

export default ImageCarousel;
