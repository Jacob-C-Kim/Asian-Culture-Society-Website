import dynamic from "next/dynamic";
import { useState, useEffect, useCallback } from "react";
import { NavigationHeader } from "@/components/common/NavigationHeader";

import StickyHeader from "../../common/StickyHeader";

const TinklingPage = dynamic(() => import("./components/TinklingPage"), {
  loading: () => <div className="min-h-screen" />,
});

export default function App() {
  const [currentPage, setCurrentPage] = useState('tinikling');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleNavigation = useCallback((page: string) => {
    setCurrentPage(page);
  }, []);

  return (
    <div className="min-h-screen bg-white relative overflow-x-hidden w-full">
      <StickyHeader currentPage={currentPage}>
        <NavigationHeader currentPage={currentPage} onNavigate={handleNavigation} />
      </StickyHeader>
      <TinklingPage />
    </div>
  );
}
