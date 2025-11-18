import { useState, memo, useCallback, ReactNode } from "react";

interface SocialButtonProps {
  /** The URL to open when clicked */
  href: string;
  /** The icon/image to display */
  icon: ReactNode;
  /** The text label */
  label: string;
  /** Optional aria-label for accessibility */
  ariaLabel?: string;
}

/**
 * Reusable social media button component
 * Displays an icon with text and links to an external URL
 */
const SocialButton = memo(function SocialButton({ href, icon, label, ariaLabel }: SocialButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = useCallback(() => {
    window.open(href, "_blank", "noopener,noreferrer");
  }, [href]);

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative w-full min-w-0 max-w-[236px] cursor-pointer rounded-button bg-white/10 transition-all duration-200 hover:scale-105 hover:bg-white/20 ${
        isHovered ? "scale-105 bg-white/20" : ""
      }`}
      aria-label={ariaLabel || label}
    >
      <div className="box-border flex h-[43px] items-center justify-start gap-2.5 overflow-clip px-4 py-2.5 md:px-[30px]">
        {/* Icon container */}
        <div className="relative flex h-[25px] w-[25px] shrink-0 items-center justify-center">
          {icon}
        </div>

        {/* Label text */}
        <span className="shrink-0 text-nowrap font-lexend text-[12px] font-normal text-white">
          {label}
        </span>
      </div>

      {/* Border overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-button border border-solid border-white"
      />
    </button>
  );
});

export default SocialButton;
