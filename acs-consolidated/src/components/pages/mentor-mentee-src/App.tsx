import { useState, useEffect } from "react";
import { NavigationHeader } from "./components/InteractiveFrame22";
import MentorMenteePage from "./components/MentorMenteePage";
import StickyHeader from "../../common/StickyHeader";

export default function App() {
  const [currentPage, setCurrentPage] = useState('mentor-mentee');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleNavigation = (page: string) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-white relative overflow-x-hidden w-full">
      <StickyHeader currentPage={currentPage}>
        <NavigationHeader currentPage={currentPage} onNavigate={handleNavigation} />
      </StickyHeader>
      <MentorMenteePage />
    </div>
  );
}
