import { memo, CSSProperties } from "react";

interface HeroSectionProps {
  /** The main title text */
  title?: string;
  /** The subtitle text */
  subtitle?: string;
  /** The description text */
  description?: string;
  /** Whether to include space for the header */
  includeHeaderSpace?: boolean;
  /** Height of the header space */
  headerSpaceHeight?: string;
  /** Top padding */
  topPadding?: string;
  /** Bottom padding */
  bottomPadding?: string;
  /** Whether to use full screen height */
  fullScreen?: boolean;
}

/**
 * @brief Reusable Hero/Welcome Section Component with customizable content and spacing
 * @params {string} [title="asian culture society"] - The main title text
 * @params {string} [subtitle="welcome to"] - The subtitle text displayed above the title
 * @params {string} [description="RIT's largest Asian club..."] - The description text displayed below the title
 * @params {boolean} [includeHeaderSpace=true] - Whether to include space for the header
 * @params {string} [headerSpaceHeight="61px"] - Height of the header space
 * @params {string} [topPadding="50px"] - Top padding value
 * @params {string} [bottomPadding="150px"] - Bottom padding value
 * @params {boolean} [fullScreen=false] - Whether to use full screen height
 * @return {JSX.Element} Hero section component
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
}: HeroSectionProps = {}) {
  const containerStyle: CSSProperties = {
    paddingTop: includeHeaderSpace ? `calc(${topPadding} + ${headerSpaceHeight})` : topPadding,
    paddingBottom: bottomPadding,
  };

  return (
    <section
      className={`relative z-10 flex flex-col items-center justify-start gap-18 bg-white px-0 ${
        fullScreen ? "min-h-screen w-full" : "size-full"
      }`}
      style={containerStyle}
    >
      <div className="relative flex flex-1 flex-col items-center justify-center gap-[5px]">
        {/* Title and subtitle */}
        <header className="relative flex flex-col items-center justify-start text-black">
          <p className="text-center font-lexend text-[16px] font-normal md:text-[18px]">
            {subtitle}
          </p>
          <h1 className="px-4 text-center font-avant-garde text-[28px] font-bold not-italic md:text-[40px]">
            {title}
          </h1>
        </header>

        {/* Description */}
        <p className="w-full max-w-[600px] px-4 text-center font-lexend text-[12px] font-normal text-black">
          {description}
        </p>
      </div>
    </section>
  );
});
