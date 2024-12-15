import { cn } from "../../utils/cn";

export const BentoGrid = ({
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[20rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  onClick,
  isComingSoon,
}) => {
  return (
    <div
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 bg-neutral-950 border border-white/[0.08] flex flex-col",
        onClick && "cursor-pointer hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.2)] overflow-hidden relative",
        className
      )}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {/* Purple gradient hover effect */}
      {onClick && (
        <div
          className="absolute inset-0 opacity-0 group-hover/bento:opacity-100 transition duration-500"
          style={{
            background: "radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), rgba(168,85,247,0.06), transparent 40%)",
          }}
        />
      )}

      {header && (
        <div className="relative h-48 md:h-60 mb-4 overflow-hidden rounded-lg">
          {header}
        </div>
      )}
      <div className="relative flex flex-col flex-1">
        <div className={cn(
          "transition duration-200",
          isComingSoon && "blur-[4px] select-none opacity-70"
        )}>
          <h3 className="font-semibold text-neutral-200 tracking-wide mb-2 mt-2">
            {title}
          </h3>
          <p className="text-sm text-neutral-400 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};
