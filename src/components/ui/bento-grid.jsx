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
      
      <div className={cn(
        "flex-shrink-0 w-full h-48 md:h-32 lg:h-48 relative rounded-lg bg-neutral-900 overflow-hidden mb-4",
        onClick && "transition-transform duration-200 group-hover/bento:scale-[1.02]"
      )}>
        {header}
      </div>
      <div className="group-hover/bento:translate-x-2 transition duration-200">
        <div className="font-bold text-neutral-200 mb-2 line-clamp-1">
          {title}
        </div>
        <div className="font-normal text-neutral-300 text-sm line-clamp-2">
          {description}
        </div>
      </div>
    </div>
  );
};
