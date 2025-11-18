import { memo, useCallback } from "react";
import ACSLogo from "./ACSLogo";
import SocialButton from "./SocialButton";
import svgPaths from "@/lib/assets/svg/instagram-icon";
import discordSvgPaths from "@/lib/assets/svg/discord-icon";

/**
 * @brief Footer component with organization information and social media links
 * @return {JSX.Element} Footer component
 */
const Footer = memo(function Footer() {
  /**
   * @brief Scrolls the page to the top with smooth animation
   * @return {void}
   */
  const handleScrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <footer className="relative w-full shrink-0 bg-acs-navy-dark">
      <div className="flex min-h-[286px] w-full flex-col items-start gap-8 px-4 py-[40px] md:flex-row md:justify-between md:gap-4 md:px-8 md:py-[63px]">
        {/* Left side - Logo and contact info */}
        <div className="flex flex-col">
          <ACSLogo size={61} className="mb-[20px]" onClick={handleScrollToTop} />

          <h2 className="mb-[8px] font-avant-garde text-[16px] leading-[normal] text-white">
            Asian Culture Society
          </h2>

          <address className="not-italic">
            <a
              className="mb-[8px] block cursor-pointer font-lexend text-[12px] font-medium text-white transition-colors hover:text-blue-300"
              href="mailto:acsrit@gmail.com"
            >
              acsrit@gmail.com
            </a>
            <p className="max-w-[280px] font-lexend text-[10px] font-normal text-white sm:max-w-none">
              1 Lomb Memorial Dr, Rochester, NY 14623
            </p>
          </address>
        </div>

        {/* Right side - Social media buttons */}
        <nav className="flex w-full flex-col gap-4 md:w-auto" aria-label="Social media links">
          <SocialButton
            href="https://campusgroups.rit.edu/feeds?type=club&type_id=16075&tab=about"
            label="Join our CampusGroups"
            icon={
              <img
                src="/assets/logos/campus-groups-logo.png"
                alt=""
                className="h-full w-full object-contain"
              />
            }
            ariaLabel="Join ACS on CampusGroups"
          />

          <SocialButton
            href="https://www.instagram.com/acsrit/"
            label="Follow us on Instagram"
            icon={
              <svg
                className="h-[23px] w-[23px]"
                fill="none"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 23 23"
                aria-hidden="true"
              >
                <path d={svgPaths.p29f29c80} fill="var(--fill-0, white)" />
              </svg>
            }
            ariaLabel="Follow ACS on Instagram"
          />

          <SocialButton
            href="https://discord.gg/jJBCYdkJBT"
            label="Join our Discord server"
            icon={
              <svg
                className="h-[18.92px] w-6"
                fill="none"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 24 19"
                aria-hidden="true"
              >
                <path d={discordSvgPaths.p1d146f00} fill="var(--fill-0, white)" />
              </svg>
            }
            ariaLabel="Join ACS Discord server"
          />
        </nav>
      </div>

      {/* Border overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 border border-solid border-black shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"
      />
    </footer>
  );
});

export default Footer;
