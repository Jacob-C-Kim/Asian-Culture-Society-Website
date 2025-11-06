'use client';

import { useState, useEffect, useRef, ReactNode } from "react";

interface StickyHeaderProps {
  children: ReactNode;
  currentPage?: string;
}

export default function StickyHeader({ children, currentPage }: StickyHeaderProps) {
  const [scrollY, setScrollY] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set initial header height and mobile state
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }

    checkMobile();

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleResize = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
      checkMobile();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Calculate transition progress for header
  // Guard against division by zero when headerHeight is 0 (initial render)
  const triggerPoint = headerHeight > 0 ? headerHeight / 2 : 50;
  const transitionDistance = headerHeight > 0 ? headerHeight / 3 : 30;
  const progress = transitionDistance > 0
    ? Math.min(Math.max((scrollY - triggerPoint) / transitionDistance, 0), 1)
    : 0;

  // Determine if header should be sticky
  const isSticky = scrollY > triggerPoint;

  // Calculate transform and opacity based on scroll progress
  const translateY = isSticky ? 0 : Math.max(-scrollY, -headerHeight);
  const stickyOpacity = progress; // Use progress for smooth fade-in effect
  const stickyScale = 0.98 + (progress * 0.02);

  return (
    <>
      {/* Sticky Header */}
      <div
        ref={headerRef}
        className="w-full relative z-50 bg-white"
        style={{
          paddingTop: isMobile ? '8px' : '12px',
          paddingBottom: isMobile ? '8px' : '12px',
          position: isSticky ? 'fixed' : 'relative',
          top: isSticky ? '0' : 'auto',
          left: isSticky ? '0' : 'auto',
          right: isSticky ? '0' : 'auto',
          transform: isSticky ? `translateY(${translateY}px) scale(${stickyScale})` : 'none',
          // When not sticky: solid white. When sticky: use opacity transition
          backgroundColor: isSticky ? `rgba(255, 255, 255, ${stickyOpacity})` : 'rgb(255, 255, 255)',
          borderBottom: `1px solid rgba(229, 231, 235, ${Math.max(stickyOpacity, 0.1)})`,
          boxShadow: `0 2px 8px -2px rgba(0, 0, 0, ${0.1 * Math.max(stickyOpacity, 0.1)})`,
          // Only apply blur when sticky
          backdropFilter: isSticky ? 'blur(8px)' : 'none',
          transition: isSticky ? 'none' : 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          willChange: 'transform, background-color, border-color, box-shadow'
        }}
      >
        {children}
      </div>

      {/* Spacer to prevent content jump when header becomes fixed */}
      {isSticky && (
        <div style={{ height: `${headerHeight}px` }} />
      )}
    </>
  );
}
