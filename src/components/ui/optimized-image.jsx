import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  width,
  height,
  priority = false 
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  // Generate srcset for responsive images
  const generateSrcSet = (imageSrc) => {
    if (!imageSrc) return '';
    const sizes = [320, 640, 768, 1024, 1280];
    return sizes
      .map(size => {
        const url = new URL(imageSrc, window.location.origin);
        url.searchParams.set('w', size);
        return `${url.toString()} ${size}w`;
      })
      .join(', ');
  };

  // Get image dimensions
  const getImageDimensions = () => {
    const style = {};
    if (width) style.width = typeof width === 'number' ? `${width}px` : width;
    if (height) style.height = typeof height === 'number' ? `${height}px` : height;
    return style;
  };

  return (
    <div className={`relative overflow-hidden ${className}`} style={getImageDimensions()}>
      <AnimatePresence>
        {isLoading && !error && (
          <motion.div
            initial={{ opacity: 0.4 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-neutral-800 animate-pulse"
          />
        )}
      </AnimatePresence>
      
      <motion.img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        srcSet={generateSrcSet(src)}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className={`w-full h-full object-cover ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setError(true);
          setIsLoading(false);
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      />

      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-900 text-neutral-400">
          <span>Failed to load image</span>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;
