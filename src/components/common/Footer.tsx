import { useState, memo, useCallback } from "react";
import ACSLogo from "./ACSLogo";
import svgPaths from "../pages/home-src/imports/svg-61ju42v1aq";
import discordSvgPaths from "../pages/home-src/imports/svg-pgq3ktlc4j";

const InstagramButton = memo(function InstagramButton() {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = useCallback(() => {
    window.open("https://www.instagram.com/acsrit/", "_blank");
  }, []);

  return (
    <div
      className={`relative w-full min-w-0 max-w-[236px] cursor-pointer rounded-[10px] bg-[rgba(255,255,255,0.1)] transition-all duration-200 ${
        isHovered ? "scale-105 bg-[rgba(255,255,255,0.2)]" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div className="box-border flex h-[43px] items-center justify-start gap-2.5 overflow-clip px-4 py-2.5 md:px-[30px]">
        <div className="relative flex h-[25px] w-[25px] shrink-0 items-center justify-center">
          <svg
            className="h-[23px] w-[23px]"
            fill="none"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 23 23"
          >
            <path d={svgPaths.p29f29c80} fill="var(--fill-0, white)" id="Vector" />
          </svg>
        </div>
        <div className="relative shrink-0 text-nowrap font-['Lexend:Regular',_sans-serif] text-[12px] font-normal leading-[0] text-white">
          <p className="whitespace-pre leading-[normal]">Follow us on Instagram</p>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[10px] border border-solid border-white"
      />
    </div>
  );
});

const DiscordButton = memo(function DiscordButton() {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = useCallback(() => {
    window.open("https://discord.gg/jJBCYdkJBT", "_blank");
  }, []);

  return (
    <div
      className={`relative w-full min-w-0 max-w-[236px] cursor-pointer rounded-[10px] bg-[rgba(255,255,255,0.1)] transition-all duration-200 ${
        isHovered ? "scale-105 bg-[rgba(255,255,255,0.2)]" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div className="box-border flex h-[43px] items-center justify-start gap-2.5 overflow-clip px-4 py-2.5 md:px-[30px]">
        <div className="relative flex h-[25px] w-[25px] shrink-0 items-center justify-center">
          <svg
            className="h-[18.92px] w-6"
            fill="none"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 19"
          >
            <path d={discordSvgPaths.p1d146f00} fill="var(--fill-0, white)" id="Vector" />
          </svg>
        </div>
        <div className="relative shrink-0 text-nowrap font-['Lexend:Regular',_sans-serif] text-[12px] font-normal leading-[0] text-white">
          <p className="whitespace-pre leading-[normal]">Join our Discord server</p>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[10px] border border-solid border-white"
      />
    </div>
  );
});

const CampusGroupsButton = memo(function CampusGroupsButton() {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = useCallback(() => {
    window.open("https://campusgroups.rit.edu/feeds?type=club&type_id=16075&tab=about", "_blank");
  }, []);

  return (
    <div
      className={`relative w-full min-w-0 max-w-[236px] cursor-pointer rounded-[10px] bg-[rgba(255,255,255,0.1)] transition-all duration-200 ${
        isHovered ? "scale-105 bg-[rgba(255,255,255,0.2)]" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div className="box-border flex h-[43px] items-center justify-start gap-2.5 overflow-clip px-4 py-2.5 md:px-[30px]">
        <div className="relative flex h-[25px] w-[25px] shrink-0 items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/logos/campus-groups-logo.png"
            alt="CampusGroups Logo"
            className="h-full w-full object-contain"
          />
        </div>
        <div className="relative shrink-0 text-nowrap font-['Lexend:Regular',_sans-serif] text-[12px] font-normal leading-[0] text-white">
          <p className="whitespace-pre leading-[normal]">Join our CampusGroups</p>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[10px] border border-solid border-white"
      />
    </div>
  );
});

const Footer = memo(function Footer() {
  const handleScrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <div className="relative w-full shrink-0 bg-[#23464b]">
      <div className="flex min-h-[286px] w-full flex-col items-start gap-8 px-4 py-[40px] md:flex-row md:justify-between md:gap-4 md:px-8 md:py-[63px]">
        {/* Left side - Logo and contact info */}
        <div className="flex flex-col">
          <ACSLogo size={61} className="mb-[20px]" onClick={handleScrollToTop} />
          <div className="mb-[8px] font-['ITC_Avant_Garde_Gothic:Bold',_sans-serif] text-[16px] not-italic leading-[0] text-white">
            <p className="leading-[normal]">Asian Culture Society</p>
          </div>
          <a
            className="mb-[8px] block cursor-pointer font-['Lexend:Medium',_sans-serif] text-[12px] font-medium leading-[0] text-white transition-colors hover:text-blue-300"
            href="mailto:acsrit@gmail.com"
          >
            <p className="leading-[normal]">acsrit@gmail.com</p>
          </a>
          <div className="max-w-[280px] font-['Lexend:Regular',_sans-serif] text-[10px] font-normal leading-[0] text-white sm:max-w-none">
            <p className="leading-[normal]">1 Lomb Memorial Dr, Rochester, NY 14623</p>
          </div>
        </div>

        {/* Right side - Social media buttons */}
        <div className="flex w-full flex-col gap-4 md:w-auto">
          <CampusGroupsButton />
          <InstagramButton />
          <DiscordButton />
        </div>
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 border border-solid border-black shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"
      />
    </div>
  );
});

export default Footer;
