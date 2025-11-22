import { useState, useEffect } from "react";
import { NavigationHeader } from "./components/InteractiveFrame22";
import AboutUsPage from "./components/AboutUsPage";
import StickyHeader from "../../common/StickyHeader";

export default function App() {
  const [currentPage, setCurrentPage] = useState('about-us');

  // Reset scroll position when navigating to a new page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleNavigation = (page: string) => {
    setCurrentPage(page);
  };

  // About Us page with sticky header behavior (same as homepage and calendar)
  return (
    <div className="min-h-screen bg-white relative overflow-x-hidden w-full">
      <StickyHeader currentPage={currentPage}>
        <NavigationHeader
          currentPage={currentPage}
          onNavigate={handleNavigation}
        />
      </StickyHeader>

      <AboutUsPage />
    </div>
  );
}
