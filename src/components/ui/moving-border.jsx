import React from "react";
import { cn } from "../../utils/cn";

export const MovingBorder = ({
  children,
  duration = 2000,
  className,
  containerClassName,
  borderClassName,
  as: Component = "button",
  ...otherProps
}) => {
  return (
    <Component
      className={cn(
        "relative bg-transparent inline-flex items-center justify-center",
        containerClassName
      )}
      {...otherProps}
    >
      <div
        className={cn(
          "absolute inset-[1px] bg-neutral-950 rounded-lg z-[1]",
          borderClassName
        )}
      />
      <div
        className={cn(
          "relative z-10 bg-transparent",
          className
        )}
      >
        {children}
      </div>
      <div
        className="absolute inset-0 rounded-lg transition-all duration-300 [mask-image:linear-gradient(white,transparent)] group-hover:opacity-50"
        style={{
          background:
            "linear-gradient(75deg, rgba(132,0,255,0.7) 0%, rgba(132,0,255,0.7) 33%, rgba(0,136,255,0.7) 66%, rgba(62,251,255,0.7) 100%)",
          backgroundSize: "400% 400%",
          animation: `moving-border ${duration}ms linear infinite`,
        }}
      />
      <style jsx>{`
        @keyframes moving-border {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </Component>
  );
};
