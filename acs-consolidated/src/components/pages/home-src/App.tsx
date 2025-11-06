import { useState, useEffect } from "react";
import { NavigationHeader } from "@/components/common/NavigationHeader";
import { HeroSection } from "@/components/common/HeroSection";
import EventsSection from "./components/EventsSection";
import Footer from "@/components/common/Footer";
import CalendarPage from "./components/CalendarPage";
import StickyHeader from "../../common/StickyHeader";

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  // Reset scroll position when navigating to a new page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleNavigation = (page: string) => {
    setCurrentPage(page);
  };

  // For calendar page, we want the same sticky header behavior
  const isCalendarPage = currentPage === 'calendar';

  if (isCalendarPage) {
    return (
      <div className="min-h-screen bg-white relative overflow-x-hidden w-full">
        <StickyHeader currentPage={currentPage}>
          <NavigationHeader
            currentPage={currentPage}
            onNavigate={handleNavigation}
          />
        </StickyHeader>

        <CalendarPage />
      </div>
    );
  }

  // Home page with sticky header behavior
  return (
    <div className="min-h-screen bg-white relative overflow-x-hidden w-full">
      <StickyHeader currentPage={currentPage}>
        <NavigationHeader
          currentPage={currentPage}
          onNavigate={handleNavigation}
        />
      </StickyHeader>

      <HeroSection />
      <EventsSection onNavigate={handleNavigation} />
      <Footer />
    </div>
  );
}
