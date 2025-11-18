import { useState, useEffect } from "react";
import { NavigationHeader } from "@/components/common/NavigationHeader";
import MentorSignup from "@/components/common/MentorSignup";
import StickyHeader from "../../common/StickyHeader";

export default function App() {
  const [currentPage, setCurrentPage] = useState("mentor-signup");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleNavigation = (page: string) => {
    if (page === "home") {
      window.location.href = "https://campusgroups.rit.edu/acs/home/";
    } else if (page === "about-us") {
      window.location.href = "https://campusgroups.rit.edu/ACS/about-us/";
    } else if (page === "calendar") {
      window.location.href = "https://campusgroups.rit.edu/ACS/acs-calendar/";
    } else if (page === "mentor-mentee") {
      window.location.href = "https://campusgroups.rit.edu/ACS/mentor-mentee/";
    } else if (page === "tinikling") {
      window.location.href = "https://campusgroups.rit.edu/ACS/tinikling/";
    }
    setCurrentPage("mentor-signup");
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-white">
      <StickyHeader currentPage={currentPage}>
        <NavigationHeader currentPage={currentPage} onNavigate={handleNavigation} />
      </StickyHeader>
      <MentorSignup
        title="Become a Mentor"
        formUrl="https://docs.google.com/forms/d/e/1FAIpQLSdYUoB1zb_teJ_6yBaE_AfGZ2onxZtRt_GcCyKaseoZhTKTeA/viewform?embedded=true"
        height="900px"
        mobileHeight="700px"
      />
    </div>
  );
}
