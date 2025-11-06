/**
 * Reusable Hero/Welcome Section Component
 */
export function HeroSection({
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
      className={`box-border content-stretch flex flex-col gap-[72px] items-center justify-start px-0 relative bg-white z-10 ${
        fullScreen ? "min-h-screen w-full" : "size-full"
      }`}
      style={{
        paddingTop: includeHeaderSpace
          ? `calc(${topPadding} + ${headerSpaceHeight})`
          : topPadding,
        paddingBottom: bottomPadding,
      }}
    >
      <div className="content-stretch flex flex-col gap-[5px] items-center justify-center relative shrink-0 flex-1">
        <div className="content-stretch flex flex-col items-center justify-start leading-[0] relative shrink-0 text-black">
          <div className="font-['Lexend:Regular',_sans-serif] font-normal relative shrink-0 text-[16px] md:text-[18px] text-center">
            <p className="leading-[normal]">{subtitle}</p>
          </div>
          <div className="font-['ITC_Avant_Garde_Gothic:Bold',_sans-serif] font-bold not-italic relative shrink-0 text-[28px] md:text-[40px] text-center">
            <p className="leading-[normal] font-bold px-4">{title}</p>
          </div>
        </div>
        <div className="font-['Lexend:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[12px] text-black text-center max-w-[600px] px-4 w-full">
          <p className="leading-[normal]">{description}</p>
        </div>
      </div>
    </div>
  );
}
