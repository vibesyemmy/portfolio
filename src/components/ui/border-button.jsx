import React from "react";
import { cn } from "../../utils/cn";

export const BorderButton = ({ children, className, variant = "primary", ...props }) => {
  const isGhost = variant === "ghost";
  return (
    <button
      className={cn(
        "relative inline-flex h-[42px] overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50",
        className
      )}
      {...props}
    >
      {isGhost ? (
        <span className="absolute inset-0 rounded-full border border-neutral-700" />
      ) : (
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
      )}
      <span
        className={cn(
          "inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full px-4 py-1 text-sm font-medium backdrop-blur-3xl",
          isGhost
            ? "bg-transparent text-neutral-300 hover:text-white hover:bg-neutral-900/40"
            : "bg-black/80 text-white"
        )}
      >
        {children}
      </span>
    </button>
  );
};
