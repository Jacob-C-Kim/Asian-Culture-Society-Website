"use client";

import { useState, memo, useCallback } from "react";
import ACSLogo from "./ACSLogo";

/**
 * @brief Main navigation header component with logo and navigation links
 * @params {string} [currentPage="home"] - The currently active page
 * @params {function} [onNavigate] - Optional callback function when navigation occurs
 * @return {JSX.Element} Navigation header component
 */
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

  /**
   * @brief Generates CSS class names for navigation links based on active state
   * @params {string} key - The route key to generate classes for
   * @return {string} Combined CSS class names
   */
  const linkCls = useCallback(
    (key: string) =>
      `font-lexend font-normal relative shrink-0 text-[10px] md:text-[12px] text-center text-nowrap cursor-pointer transition-colors hover:text-blue-600 ${
        activeSection === key ? "text-blue-600" : "text-black"
      }`,
    [activeSection]
  );

  /**
   * @brief Navigates the parent/top frame to a specific URL, bypassing CampusGroups link rewriting
   * @params {string} url - The URL to navigate to
   * @return {void}
   */
  const navigateTop = useCallback((url: string) => {
    try {
      if (window.top) window.top.location.assign(url);
      else window.location.assign(url);
    } catch {
      window.location.assign(url);
    }
  }, []);

  /**
   * @brief Navigation link component with optional forced top-level navigation
   * @params {string} keyName - The route key name
   * @params {string} labelDesktop - The label to display on desktop
   * @params {string} [labelMobile] - Optional mobile-specific label
   * @params {boolean} [forceTopHref] - When true, prevents default and uses navigateTop()
   * @return {JSX.Element} Navigation link component
   */
  const NavLink = ({
    keyName,
    labelDesktop,
    labelMobile,
    forceTopHref,
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
      <span className={`whitespace-pre leading-[normal] ${labelMobile ? "hidden sm:block" : ""}`}>
        {labelDesktop}
      </span>
      {labelMobile && (
        <span className="block whitespace-pre leading-[normal] sm:hidden">{labelMobile}</span>
      )}
    </a>
  );

  return (
    <nav className="relative mx-auto flex w-full max-w-7xl items-center justify-center gap-2 px-2 md:gap-8 md:px-6">
      {/* Logo → CG home - Mobile */}
      <a
        href={routes.home}
        target="_top"
        rel="noopener"
        onClick={() => {
          setActiveSection("home");
          onNavigate?.("home");
        }}
        className="cursor-pointer md:hidden"
        aria-label="Asian Culture Society Home"
      >
        <ACSLogo size={48} />
      </a>

      {/* Logo → CG home - Desktop */}
      <a
        href={routes.home}
        target="_top"
        rel="noopener"
        onClick={() => {
          setActiveSection("home");
          onNavigate?.("home");
        }}
        className="hidden cursor-pointer md:block"
        aria-label="Asian Culture Society Home"
      >
        <ACSLogo size={61} />
      </a>

      {/* Navigation Links */}
      <div className="flex items-center gap-2 md:gap-6">
        {/* Force About Us to the exact /ACS/about-us/ path to bypass CG rewriting */}
        <NavLink keyName="about-us" labelDesktop="About Us" forceTopHref />

        {/* Calendar goes to /ACS/acs-calendar/ */}
        <NavLink keyName="calendar" labelDesktop="Calendar" />

        <NavLink keyName="mentor-mentee" labelDesktop="Mentor/Mentee" labelMobile="Mentor" />
        <NavLink keyName="tinikling" labelDesktop="Tinikling" />
      </div>
    </nav>
  );
});
