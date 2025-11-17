import { memo } from "react";

/**
 * Reusable Hero/Welcome Section Component
 */
export const HeroSection = memo(function HeroSection({
  title = "asian culture society",
  subtitle = "welcome to",
  description = "RIT's largest Asian club, bringing students together to celebrate, learn, and share the rich history, culture, and art of Asian countries",
  includeHeaderSpace = true,
  headerSpaceHeight = "61px",
  topPadding = "50px",
  bottomPadding = "150px",
  fullScreen = false,
}: {
  title?: string;
  subtitle?: string;
  description?: string;
  includeHeaderSpace?: boolean;
  headerSpaceHeight?: string;
  topPadding?: string;
  bottomPadding?: string;
  fullScreen?: boolean;
} = {}) {
  return (
    <div
      className={`relative z-10 box-border flex flex-col content-stretch items-center justify-start gap-[72px] bg-white px-0 ${
        fullScreen ? "min-h-screen w-full" : "size-full"
      }`}
      style={{
        paddingTop: includeHeaderSpace ? `calc(${topPadding} + ${headerSpaceHeight})` : topPadding,
        paddingBottom: bottomPadding,
      }}
    >
      <div className="relative flex flex-1 shrink-0 flex-col content-stretch items-center justify-center gap-[5px]">
        <div className="relative flex shrink-0 flex-col content-stretch items-center justify-start leading-[0] text-black">
          <div className="relative shrink-0 text-center font-['Lexend:Regular',_sans-serif] text-[16px] font-normal md:text-[18px]">
            <p className="leading-[normal]">{subtitle}</p>
          </div>
          <div className="relative shrink-0 text-center font-['ITC_Avant_Garde_Gothic:Bold',_sans-serif] text-[28px] font-bold not-italic md:text-[40px]">
            <p className="px-4 font-bold leading-[normal]">{title}</p>
          </div>
        </div>
        <div className="relative w-full max-w-[600px] shrink-0 px-4 text-center font-['Lexend:Regular',_sans-serif] text-[12px] font-normal leading-[normal] text-black">
          <p className="leading-[normal]">{description}</p>
        </div>
      </div>
    </div>
  );
});
