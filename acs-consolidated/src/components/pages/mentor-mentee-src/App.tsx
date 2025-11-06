import { useState, useEffect, useRef } from "react";
import { NavigationHeader } from "./components/InteractiveFrame22";
import MentorMenteePage from "./components/MentorMenteePage";

export default function App() {
  const [currentPage, setCurrentPage] = useState('mentor-mentee');
  const [scrollY, setScrollY] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const normalHeaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set initial header height and mobile state
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    if (normalHeaderRef.current) {
      setHeaderHeight(normalHeaderRef.current.offsetHeight);
    }

    checkMobile();

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleResize = () => {
      if (normalHeaderRef.current) {
        setHeaderHeight(normalHeaderRef.current.offsetHeight);
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

  // Reset scroll position when navigating to a new page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleNavigation = (page: string) => {
    // Since we only have Mentor/Mentee page, we can handle other navigation requests
    // For now, just keep the current page as mentor-mentee
    if (page === 'mentor-mentee') {
      setCurrentPage(page);
    }
    // For other pages like calendar, home, etc., we could redirect to external URLs
    // or handle them as needed in the future
  };

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
  // Always keep navbar visible with full opacity
  const stickyOpacity = 1;
  const stickyScale = 0.98 + (progress * 0.02);

  // Mentor/Mentee page with sticky header behavior
  return (
    <div className="min-h-screen bg-white relative overflow-x-hidden w-full">
      {/* Header with smooth transition for Mentor/Mentee page */}
      <div 
        ref={normalHeaderRef}
        className="w-full relative z-50 bg-white"
        style={{
          paddingTop: isMobile ? '8px' : '12px',
          paddingBottom: isMobile ? '8px' : '12px',
          position: isSticky ? 'fixed' : 'relative',
          top: isSticky ? '0' : 'auto',
          left: isSticky ? '0' : 'auto',
          right: isSticky ? '0' : 'auto',
          transform: isSticky ? `translateY(${translateY}px) scale(${stickyScale})` : 'none',
          backgroundColor: isSticky ? `rgba(255, 255, 255, ${stickyOpacity})` : 'rgb(255, 255, 255)',
          borderBottom: `1px solid rgba(229, 231, 235, ${Math.max(stickyOpacity, 0.1)})`,
          boxShadow: `0 2px 8px -2px rgba(0, 0, 0, ${0.1 * Math.max(stickyOpacity, 0.1)})`,
          backdropFilter: stickyOpacity > 0 ? 'blur(8px)' : 'none',
          transition: isSticky ? 'none' : 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          willChange: 'transform, background-color, border-color, box-shadow'
        }}
      >
        <NavigationHeader 
          currentPage={currentPage}
          onNavigate={handleNavigation}
        />
      </div>
      
      {/* Spacer to prevent content jump when header becomes fixed */}
      {isSticky && (
        <div style={{ height: `${headerHeight}px` }} />
      )}
      
      <MentorMenteePage onNavigate={handleNavigation} hideHeader={true} />
    </div>
  );
}