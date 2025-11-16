import { useState, useEffect } from "react";
import svgPaths from "../../imports/svg-onqcmwzw98";
// Unused: import { getEventsForDate } from "../../data/events";
import { getAllEventsForDate, formatDate } from "../../utils/calendarHelpers";

interface EventDetailsCardProps {
  selectedDate: Date | undefined;
  onClose: () => void;
}

export default function EventDetailsCard({ selectedDate, onClose }: EventDetailsCardProps) {
  // ALL HOOKS MUST BE AT THE TOP - React Rules of Hooks
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null);
  const [isSwipeActive, setIsSwipeActive] = useState(false);
  const [showSwipeHint, setShowSwipeHint] = useState(true);

  // Get events safely (can be empty if no selectedDate)
  const events = selectedDate ? getAllEventsForDate(selectedDate) : [];
  const safeIndex = Math.max(0, Math.min(currentEventIndex, Math.max(0, events.length - 1)));
  const currentEvent = events[safeIndex];

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Reset event index when date changes and focus the card if it has multiple events
  useEffect(() => {
    if (!selectedDate) return;
    setCurrentEventIndex(0);
    setShowSwipeHint(true);

    if (isMobile && events.length > 1) {
      const timer = setTimeout(() => {
        setShowSwipeHint(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [selectedDate, isMobile, events.length]);

  // Listen for global navigation events
  useEffect(() => {
    if (!events.length) return;

    const handleNavigateEvent = (e: CustomEvent) => {
      if (events.length > 1) {
        const { direction } = e.detail;
        handleScroll(direction);
      }
    };

    document.addEventListener("navigateEvent", handleNavigateEvent as EventListener);
    return () =>
      document.removeEventListener("navigateEvent", handleNavigateEvent as EventListener);
  }, [events.length, safeIndex]);

  // NOW do early returns AFTER all hooks
  if (!selectedDate) return null;
  if (!events || events.length === 0) return null;
  if (!currentEvent) return null;

  // Handle scrolling through events
  const handleScroll = (direction: "up" | "down") => {
    if (direction === "down" && safeIndex < events.length - 1) {
      setCurrentEventIndex(safeIndex + 1);
    } else if (direction === "up" && safeIndex > 0) {
      setCurrentEventIndex(safeIndex - 1);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (events.length <= 1) return;

    if (e.key === "ArrowDown" && safeIndex < events.length - 1) {
      e.preventDefault();
      e.stopPropagation();
      handleScroll("down");
    } else if (e.key === "ArrowUp" && safeIndex > 0) {
      e.preventDefault();
      e.stopPropagation();
      handleScroll("up");
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (events.length <= 1 || !isMobile) return;
    setTouchEnd(null);
    setIsSwipeActive(true);
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (events.length <= 1 || !isMobile) return;
    setTouchEnd({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    });
  };

  const handleTouchEnd = () => {
    setIsSwipeActive(false);

    if (events.length <= 1 || !isMobile || !touchStart || !touchEnd) {
      setTouchStart(null);
      setTouchEnd(null);
      return;
    }

    const deltaX = Math.abs(touchStart.x - touchEnd.x);
    const deltaY = touchStart.y - touchEnd.y;
    const minSwipeDistance = 40; // Reduced threshold for easier swiping

    // Only process vertical swipes (ignore horizontal)
    if (deltaX > Math.abs(deltaY)) {
      setTouchStart(null);
      setTouchEnd(null);
      return;
    }

    const isUpSwipe = deltaY > minSwipeDistance;
    const isDownSwipe = deltaY < -minSwipeDistance;

    if (isUpSwipe && safeIndex < events.length - 1) {
      handleScroll("down");
      setShowSwipeHint(false);
    }
    if (isDownSwipe && safeIndex > 0) {
      handleScroll("up");
      setShowSwipeHint(false);
    }

    // Reset touch state
    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <div className="relative">
      {/* Event card */}
      <div
        className={`relative w-full rounded-[15px] border border-white bg-[#99e3ed] transition-all duration-300 ease-out hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
          isMobile ? "h-[360px] hover:scale-[1.01]" : "h-[400px] hover:scale-[1.02]"
        } ${isSwipeActive && isMobile ? "scale-[0.98] brightness-95" : ""}`}
        onKeyDown={events.length > 1 && !isMobile ? handleKeyDown : undefined}
        onTouchStart={isMobile && events.length > 1 ? handleTouchStart : undefined}
        onTouchMove={isMobile && events.length > 1 ? handleTouchMove : undefined}
        onTouchEnd={isMobile && events.length > 1 ? handleTouchEnd : undefined}
        tabIndex={events.length > 1 && !isMobile ? 0 : -1}
        role={events.length > 1 ? "region" : undefined}
        aria-label={
          events.length > 1
            ? `Event ${safeIndex + 1} of ${events.length}. ${isMobile ? "Swipe vertically or tap buttons to navigate." : "Use arrow keys to navigate."}`
            : undefined
        }
      >
        {/* Close X button in top left */}
        <button
          onClick={onClose}
          className={`absolute left-[18px] top-[18px] z-10 flex items-center justify-center rounded-full border border-white bg-[rgba(255,255,255,0.5)] transition-all duration-200 hover:scale-110 hover:bg-[rgba(255,255,255,0.8)] ${
            isMobile ? "h-10 w-10 active:scale-95" : "h-8 w-8"
          }`}
          aria-label="Close event details"
        >
          <svg
            className={`text-[#195259] ${isMobile ? "h-5 w-5" : "h-4 w-4"}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Calendar icon in top right */}
        <div
          className={`absolute right-[18px] top-[18px] flex items-center justify-center rounded-[15px] border border-white bg-[rgba(255,255,255,0.5)] ${
            isMobile ? "size-10" : "size-9"
          }`}
        >
          <div className={`relative ${isMobile ? "h-7 w-6" : "h-6 w-[21px]"}`}>
            <svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 21 24"
            >
              <g id="calendar-days">
                <path d={svgPaths.p3ca7b300} fill="var(--fill-0, #195259)" id="Primary" />
              </g>
            </svg>
          </div>
        </div>

        {/* Event content */}
        <div
          className={`absolute left-[18px] flex w-[calc(100%-80px)] flex-col content-stretch items-start justify-start gap-1 ${
            isMobile ? "top-[55px]" : "top-[60px]"
          }`}
        >
          <div
            className={`relative w-full shrink-0 font-['Lexend:Bold',_sans-serif] font-bold text-black ${
              isMobile ? "text-[16px]" : "text-[18px]"
            }`}
          >
            <p className="leading-[1.2]">{currentEvent.title}</p>
          </div>

          <div
            className={`relative w-full shrink-0 font-['Lexend:Medium',_sans-serif] font-medium text-black ${
              isMobile ? "text-[11px]" : "text-[12px]"
            }`}
          >
            <p className="leading-[1.3]">
              {currentEvent.time} @ {currentEvent.location}
            </p>
          </div>

          <div
            className={`relative w-full shrink-0 font-['Lexend:Medium',_sans-serif] font-medium text-black ${
              isMobile ? "text-[11px]" : "text-[12px]"
            }`}
          >
            <p className="leading-[1.3]">{formatDate(selectedDate)}</p>
          </div>
        </div>

        {/* Description */}
        <div
          className={`absolute left-[18px] w-[calc(100%-36px)] overflow-y-auto text-black ${
            isMobile ? "top-[155px] h-[130px] text-[11px]" : "top-[175px] h-[140px] text-[12px]"
          }`}
        >
          <div
            className={`pr-2 font-['Lexend:Regular',_sans-serif] font-normal ${
              isMobile ? "text-[11px]" : "text-[12px]"
            }`}
          >
            <p className="leading-[1.4]">{currentEvent.description}</p>
          </div>
        </div>

        {/* Swipe indicator for mobile */}
        {events.length > 1 && isMobile && showSwipeHint && (
          <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
            <div
              className={`flex flex-col items-center gap-2 transition-opacity duration-500 opacity-30`}
            >
              <svg
                className="h-6 w-6 animate-bounce text-[#195259]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 11l5-5m0 0l5 5m-5-5v12"
                />
              </svg>
              <div className="text-xs font-medium text-[#195259]">Swipe up/down</div>
              <svg
                className="h-6 w-6 animate-bounce text-[#195259]"
                style={{ animationDelay: "0.5s" }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 13l-5 5m0 0l-5-5m5 5V6"
                />
              </svg>
            </div>
          </div>
        )}

        {/* Event counter if multiple events */}
        {events.length > 1 && (
          <div
            className={`absolute left-[18px] right-[18px] flex items-center justify-between ${
              isMobile ? "bottom-[10px]" : "bottom-[14px]"
            }`}
          >
            <div
              className={`font-['Lexend:Medium',_sans-serif] font-medium text-[#195259] ${
                isMobile ? "text-[11px]" : "text-[12px]"
              }`}
            >
              {safeIndex + 1} of {events.length} events
            </div>
            <div
              className={`font-['Lexend:Regular',_sans-serif] text-[#195259] ${
                isMobile ? "text-[9px]" : "text-[10px]"
              }`}
            >
              {isMobile ? "Swipe or tap buttons" : "Use ↑↓ keys or buttons"}
            </div>
          </div>
        )}
      </div>

      {/* Arrow navigation buttons for multiple events */}
      {events.length > 1 && (
        <>
          {isMobile ? (
            /* Mobile: Horizontal buttons at the bottom */
            <div className="absolute bottom-[50px] left-1/2 flex -translate-x-1/2 transform gap-4">
              <button
                onClick={() => {
                  handleScroll("up");
                  setShowSwipeHint(false);
                }}
                disabled={safeIndex === 0}
                className={`flex h-12 w-12 items-center justify-center rounded-full transition-all duration-200 active:scale-95 ${
                  safeIndex === 0
                    ? "cursor-not-allowed bg-gray-200 text-gray-400"
                    : "cursor-pointer bg-[rgba(255,255,255,0.8)] text-[#195259] shadow-md hover:bg-[rgba(255,255,255,0.9)]"
                }`}
                aria-label="Previous event"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={() => {
                  handleScroll("down");
                  setShowSwipeHint(false);
                }}
                disabled={safeIndex === events.length - 1}
                className={`flex h-12 w-12 items-center justify-center rounded-full transition-all duration-200 active:scale-95 ${
                  safeIndex === events.length - 1
                    ? "cursor-not-allowed bg-gray-200 text-gray-400"
                    : "cursor-pointer bg-[rgba(255,255,255,0.8)] text-[#195259] shadow-md hover:bg-[rgba(255,255,255,0.9)]"
                }`}
                aria-label="Next event"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          ) : (
            /* Desktop: Vertical buttons on the right */
            <div className="absolute right-[-40px] top-1/2 flex -translate-y-1/2 transform flex-col gap-2">
              <button
                onClick={() => handleScroll("up")}
                disabled={safeIndex === 0}
                className={`flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200 hover:scale-110 ${
                  safeIndex === 0
                    ? "cursor-not-allowed bg-gray-200 text-gray-400"
                    : "cursor-pointer bg-[#99e3ed] text-[#195259] hover:bg-[#8bd4e0]"
                }`}
                aria-label="Previous event"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 15l7-7 7 7"
                  />
                </svg>
              </button>
              <button
                onClick={() => handleScroll("down")}
                disabled={safeIndex === events.length - 1}
                className={`flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200 hover:scale-110 ${
                  safeIndex === events.length - 1
                    ? "cursor-not-allowed bg-gray-200 text-gray-400"
                    : "cursor-pointer bg-[#99e3ed] text-[#195259] hover:bg-[#8bd4e0]"
                }`}
                aria-label="Next event"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
