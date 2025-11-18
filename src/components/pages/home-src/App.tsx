import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { NavigationHeader } from "@/components/common/NavigationHeader";
import { HeroSection } from "@/components/common/HeroSection";
import Footer from "@/components/common/Footer";
import StickyHeader from "../../common/StickyHeader";

// Lazy load heavy components
const EventsSection = dynamic(() => import("@/components/common/EventsSection"), {
  loading: () => <div className="min-h-[200px]" />,
});
const CalendarPage = dynamic(() => import("./components/CalendarPage"), {
  loading: () => <div className="min-h-screen" />,
});

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");

  // Reset scroll position when navigating to a new page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleNavigation = useCallback((page: string) => {
    setCurrentPage(page);
  }, []);

  // For calendar page, we want the same sticky header behavior
  const isCalendarPage = currentPage === "calendar";

  if (isCalendarPage) {
    return (
      <div className="relative min-h-screen w-full overflow-x-hidden bg-white">
        <StickyHeader currentPage={currentPage}>
          <NavigationHeader currentPage={currentPage} onNavigate={handleNavigation} />
        </StickyHeader>

        <CalendarPage />
      </div>
    );
  }

  // Home page with sticky header behavior
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-white">
      <StickyHeader currentPage={currentPage}>
        <NavigationHeader currentPage={currentPage} onNavigate={handleNavigation} />
      </StickyHeader>

      <HeroSection />
      <EventsSection onNavigate={handleNavigation} />
      <Footer />
    </div>
  );
}
