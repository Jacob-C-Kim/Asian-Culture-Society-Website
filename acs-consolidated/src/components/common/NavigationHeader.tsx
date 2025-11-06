'use client';

import { useState, memo, useCallback, useMemo } from "react";
import ACSLogo from "./ACSLogo";

export const NavigationHeader = memo(function NavigationHeader({
  currentPage = "home",
  onNavigate,
}: {
  currentPage?: string;
  onNavigate?: (page: string) => void;
} = {}) {
  const [activeSection, setActiveSection] = useState<string | null>(currentPage);

  // Exact CampusGroups routes (with trailing slashes)
  const routes: Record<string, string> = {
    home: "https://campusgroups.rit.edu/acs/home/",
    "about-us": "https://campusgroups.rit.edu/ACS/about-us/",
    calendar: "https://campusgroups.rit.edu/ACS/acs-calendar/",
    "mentor-mentee": "https://campusgroups.rit.edu/ACS/mentor-mentee/",
    tinikling: "https://campusgroups.rit.edu/ACS/tinikling/",
  };

  const linkCls = useCallback(
    (key: string) =>
      `font-['Lexend:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[10px] md:text-[12px] text-center text-nowrap cursor-pointer transition-colors hover:text-blue-600 ${
        activeSection === key ? "text-blue-600" : "text-black"
      }`,
    [activeSection]
  );

  // Hard navigate the parent/top frame to a specific URL (bypasses CG link rewriting)
  const navigateTop = useCallback((url: string) => {
    try {
      if (window.top) window.top.location.assign(url);
      else window.location.assign(url);
    } catch {
      window.location.assign(url);
    }
  }, []);

  // Generic anchor that can optionally force navigation via JS (to avoid CG rewriting)
  const NavLink = ({
    keyName,
    labelDesktop,
    labelMobile,
    forceTopHref, // when true, preventDefault and use navigateTop()
  }: {
    keyName: keyof typeof routes;
    labelDesktop: string;
    labelMobile?: string;
    forceTopHref?: boolean;
  }) => (
    <a
      href={routes[keyName]}
      target="_top"
      rel="noopener"
      className={linkCls(keyName)}
      onClick={(e) => {
        setActiveSection(keyName);
        onNavigate?.(keyName);
        if (forceTopHref) {
          e.preventDefault();
          navigateTop(routes[keyName]); // guarantees exact path e.g. /ACS/about-us/
        }
      }}
    >
      <p className={`leading-[normal] whitespace-pre ${labelMobile ? "hidden sm:block" : ""}`}>
        {labelDesktop}
      </p>
      {labelMobile && (
        <p className="leading-[normal] whitespace-pre block sm:hidden">{labelMobile}</p>
      )}
    </a>
  );

  return (
    <div className="w-full max-w-7xl mx-auto flex items-center justify-center gap-2 md:gap-8 px-2 md:px-6 relative">
      {/* Logo → CG home */}
      <a
        href={routes.home}
        target="_top"
        rel="noopener"
        onClick={() => {
          setActiveSection("home");
          onNavigate?.("home");
        }}
        className="md:hidden cursor-pointer"
      >
        <ACSLogo size={48} />
      </a>
      <a
        href={routes.home}
        target="_top"
        rel="noopener"
        onClick={() => {
          setActiveSection("home");
          onNavigate?.("home");
        }}
        className="hidden md:block cursor-pointer"
      >
        <ACSLogo size={61} />
      </a>

      {/* Navigation */}
      <div className="flex gap-2 md:gap-6 items-center">
        {/* Force About Us to the exact /ACS/about-us/ path to bypass CG rewriting */}
        <NavLink keyName="about-us" labelDesktop="About Us" forceTopHref />

        {/* Calendar goes to /ACS/acs-calendar/ */}
        <NavLink keyName="calendar" labelDesktop="Calendar" />

        <NavLink
          keyName="mentor-mentee"
          labelDesktop="Mentor/Mentee"
          labelMobile="Mentor"
        />
        <NavLink keyName="tinikling" labelDesktop="Tinikling" />
      </div>
    </div>
  );
});
