import React from 'react';

export const Skeleton = ({ className = "", ...props }) => {
  return (
    <div
      className={`animate-pulse bg-neutral-800/50 rounded-lg ${className}`}
      {...props}
    />
  );
};
