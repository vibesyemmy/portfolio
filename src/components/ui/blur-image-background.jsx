import React from "react";
import { cn } from "../../utils/cn";

export const BlurImageBackground = ({
  imageSrc,
  className,
  overlayClassName,
  children,
}) => {
  return (
    <div className={cn("relative w-full overflow-hidden group", className)}>
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${imageSrc})` }}
      />
      
      {/* Blur Overlay */}
      <div
        className={cn(
          "absolute inset-0 backdrop-blur-sm bg-black/60 transition-all duration-500 ease-in-out group-hover:backdrop-blur-0",
          overlayClassName
        )}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
