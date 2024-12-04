import React from "react";
import { cn } from "../../utils/cn";

export const BlurImageBackground = ({
  imageSrc,
  className,
  overlayClassName,
  children,
}) => {
  return (
    <div className={cn("relative w-full overflow-hidden", className)}>
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${imageSrc})` }}
      />
      
      {/* Blur Overlay */}
      <div
        className={cn(
          "absolute inset-0 backdrop-blur-[100px] bg-black/50",
          overlayClassName
        )}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
