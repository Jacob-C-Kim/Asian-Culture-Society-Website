import { useState, useRef, useEffect } from "react";
import svgPaths from "../imports/svg-onqcmwzw98";
import { Event, events, getSortedEvents } from "../data/events";

// Helper function to get Mentor/Mentee specific events
const getMentorMenteeEvents = (): Event[] => {
  return events.filter((event) => event.title === "Speed Dating");
};

function FilterButtons({ onNavigate: _onNavigate }: { onNavigate?: (page: string) => void }) {
  const handleCalendarClick = () => {
    // Open the external CampusGroups calendar URL
    window.open("https://campusgroups.rit.edu/ACS/acs-calendar/", "_blank", "noopener,noreferrer");
  };

  return (
    <div className="relative flex shrink-0 content-stretch items-start justify-start gap-[18px]">
      <div
        className="relative box-border flex shrink-0 cursor-pointer content-stretch items-center justify-center gap-2.5 overflow-clip rounded-[10px] bg-[#8bd4e0] px-5 py-[7px] shadow-md transition-all duration-200 hover:bg-[#7bc7d3]"
        onClick={handleCalendarClick}
      >
        <div className="relative shrink-0 text-nowrap font-['ITC_Avant_Garde_Gothic:Bold',_sans-serif] text-[14px] not-italic leading-[0] text-black">
          <p className="whitespace-pre leading-[normal]">Full Calendar</p>
        </div>
      </div>
    </div>
  );
}

// Event interface is now imported from /data/events.ts

function EventCard({ event }: { event: Event }) {
  return (
    <div className="relative h-[265px] w-[280px] shrink-0 rounded-[15px] bg-[#99e3ed] sm:w-[351px]">
      <div className="relative h-[265px] w-[280px] overflow-clip sm:w-[351px]">
        <div className="absolute left-[18px] top-[94px] flex w-[237px] flex-col content-stretch items-start justify-start gap-1 text-black">
          <div className="relative w-full shrink-0 font-['Lexend:Bold',_sans-serif] text-[18px] font-bold">
            <p className="leading-[1.2]">{event.title}</p>
          </div>
          <div className="relative w-full shrink-0 font-['Lexend:Medium',_sans-serif] text-[12px] font-medium">
            <p className="leading-[1.3]">
              {event.time} @ {event.location}
            </p>
          </div>
          <div className="relative w-full shrink-0 font-['Lexend:Medium',_sans-serif] text-[12px] font-medium">
            {event.link ? (
              <p className="cursor-pointer leading-[1.3] underline decoration-solid [text-underline-position:from-font] hover:text-blue-600">
                {event.date}
              </p>
            ) : (
              <p className="leading-[1.3]">{event.date}</p>
            )}
          </div>
        </div>
        <div className="absolute left-[298px] top-[94px] flex size-9 items-center justify-center rounded-[15px] bg-[rgba(255,255,255,0.5)]">
          <div className="relative h-6 w-[21px]" data-name="calendar-days">
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
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[15px] border border-solid border-white"
          />
        </div>
        <div className="absolute left-[18px] top-[170px] h-[77px] w-[calc(100%-36px)] overflow-y-auto text-[12px] text-black">
          <div className="pr-2 font-['Lexend:Regular',_sans-serif] font-normal">
            <p className="leading-[1.4]">{event.description}</p>
          </div>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[15px] border border-solid border-white"
      />
    </div>
  );
}

// Placeholder card shown when no events are available
function PlaceholderCard({ isMentorMentee = false }: { isMentorMentee?: boolean }) {
  return (
    <div className="relative flex h-[265px] w-[280px] shrink-0 items-center justify-center rounded-[15px] bg-[#99e3ed] sm:w-[351px]">
      <div className="max-h-[200px] overflow-y-auto px-6 text-center">
        <div className="mb-2 font-['Lexend:Bold',_sans-serif] text-[18px] font-bold text-black">
          <p className="leading-[1.2]">
            {isMentorMentee ? "No Mentor/Mentee Events Yet" : "No Events Yet"}
          </p>
        </div>
        <div className="font-['Lexend:Regular',_sans-serif] text-[12px] font-normal text-black">
          <p className="leading-[1.4]">
            {isMentorMentee
              ? "Mentor/Mentee events will be displayed here once they are added."
              : "Events will be displayed here once they are added."}
          </p>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[15px] border border-solid border-white"
      />
    </div>
  );
}

function EventsCarousel({
  currentSlide,
  setCurrentSlide,
  isMentorMentee = false,
}: {
  currentSlide: number;
  setCurrentSlide: (slide: number) => void;
  isMentorMentee?: boolean;
}) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const lastScrollTimeRef = useRef<number>(0);
  const sortedEvents = isMentorMentee ? getMentorMenteeEvents() : getSortedEvents(); // Get events based on context
  const totalSlides = Math.max(sortedEvents.length, 1); // At least 1 slide for placeholder
  const [cardWidth, setCardWidth] = useState(351);
  const gap = 20;
  const slideWidth = cardWidth + gap;

  useEffect(() => {
    const updateCardWidth = () => {
      const newWidth = window.innerWidth < 640 ? 280 : 351;
      setCardWidth(newWidth);
    };

    // Set initial width
    updateCardWidth();

    // Listen for resize events
    window.addEventListener("resize", updateCardWidth);
    return () => window.removeEventListener("resize", updateCardWidth);
  }, []);

  const nextSlide = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  // Handle wheel/touchpad scrolling with balanced sensitivity
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();

    const now = Date.now();
    // Throttle scroll events - only allow one navigation per 500ms (reduced from 800ms)
    if (now - lastScrollTimeRef.current < 500) {
      return;
    }

    // Balanced thresholds for good sensitivity without being too jumpy
    const horizontalThreshold = 25; // Reduced from 50 for better sensitivity
    const verticalThreshold = 40; // Reduced from 80 for better sensitivity

    // Horizontal scroll (touchpad two-finger swipe) - primary method
    if (Math.abs(e.deltaX) > horizontalThreshold && Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      lastScrollTimeRef.current = now;
      if (e.deltaX > 0) {
        // Scroll right, show next slide
        nextSlide();
      } else {
        // Scroll left, show previous slide
        prevSlide();
      }
    }
    // Vertical scroll as fallback - require moderate movement
    else if (Math.abs(e.deltaY) > verticalThreshold && Math.abs(e.deltaX) < 15) {
      lastScrollTimeRef.current = now;
      if (e.deltaY > 0) {
        // Scroll down, show next slide
        nextSlide();
      } else {
        // Scroll up, show previous slide
        prevSlide();
      }
    }
  };

  // Handle touch events for mobile
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;

    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    // Minimum swipe distance
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swiped left, show next slide
        nextSlide();
      } else {
        // Swiped right, show previous slide
        prevSlide();
      }
    }

    setTouchStart(null);
  };

  const currentTransform = -currentSlide * slideWidth;

  return (
    <div className="relative mx-auto w-full max-w-6xl px-4 md:px-16">
      <div className="relative w-full overflow-hidden">
        <div
          ref={carouselRef}
          className="flex select-none gap-5"
          style={{
            transform: `translateX(${currentTransform}px)`,
            transition: "transform 300ms ease-out",
          }}
          onWheel={handleWheel}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {sortedEvents.length > 0 ? (
            sortedEvents.map((event) => <EventCard key={event.id} event={event} />)
          ) : (
            <PlaceholderCard isMentorMentee={isMentorMentee} />
          )}
        </div>

        {/* Left gradient fade overlay - smooth opacity transition (hidden on mobile) */}
        <div
          className={`pointer-events-none absolute bottom-0 left-0 top-0 z-10 hidden w-16 transition-opacity duration-300 md:block ${
            currentSlide > 0 ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background: "linear-gradient(to right, #69d7e5 0%, #69d7e5 20%, transparent 100%)",
          }}
        />

        {/* Right gradient fade overlay - smooth opacity transition (hidden on mobile) */}
        <div
          className={`pointer-events-none absolute bottom-0 right-0 top-0 z-10 hidden w-16 transition-opacity duration-300 md:block ${
            currentSlide < totalSlides - 1 ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background: "linear-gradient(to left, #69d7e5 0%, #69d7e5 20%, transparent 100%)",
          }}
        />
      </div>

      {/* Navigation buttons - positioned outside the carousel container */}
      <button
        onClick={prevSlide}
        className={`absolute left-0 top-1/2 z-20 -translate-y-1/2 transform rounded-full bg-white/20 p-1.5 transition-all duration-200 hover:bg-white/40 md:left-2 md:p-2 ${
          currentSlide === 0 ? "cursor-not-allowed opacity-50" : "opacity-100"
        }`}
        disabled={currentSlide === 0}
        aria-label="Previous slide"
      >
        <svg
          className="h-4 w-4 text-white md:h-6 md:w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className={`absolute right-0 top-1/2 z-20 -translate-y-1/2 transform rounded-full bg-white/20 p-1.5 transition-all duration-200 hover:bg-white/40 md:right-2 md:p-2 ${
          currentSlide === totalSlides - 1 ? "cursor-not-allowed opacity-50" : "opacity-100"
        }`}
        disabled={currentSlide === totalSlides - 1}
        aria-label="Next slide"
      >
        <svg
          className="h-4 w-4 text-white md:h-6 md:w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}

function PaginationDots({
  currentSlide,
  onSlideChange,
  totalSlides,
}: {
  currentSlide: number;
  onSlideChange: (index: number) => void;
  totalSlides: number;
}) {
  // Only show pagination dots if there are multiple events
  if (totalSlides <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: totalSlides }, (_, index) => (
        <button
          key={index}
          onClick={() => onSlideChange(index)}
          className={`cursor-pointer rounded-full transition-all duration-300 hover:opacity-80 ${
            currentSlide === index ? "h-2.5 w-8 bg-white/70" : "h-2.5 w-2.5 bg-white/50"
          }`}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
}

export default function EventsSection({
  onNavigate,
  isMentorMentee = false,
}: {
  onNavigate?: (page: string) => void;
  isMentorMentee?: boolean;
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sortedEvents = isMentorMentee ? getMentorMenteeEvents() : getSortedEvents(); // Get events based on context
  const totalSlides = Math.max(sortedEvents.length, 1);

  return (
    <div
      className="relative box-border flex w-full flex-col content-stretch items-center justify-start gap-[15px] overflow-hidden bg-[#69d7e5] px-0 pb-[30px] pt-[25px]"
      data-section="mentor-mentee-events"
      style={{
        fontFamily:
          'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      }}
    >
      <div className="relative flex shrink-0 flex-col justify-center px-4 text-center font-['Lexend:Medium',_sans-serif] text-[20px] font-medium leading-[0] text-black md:text-[25px]">
        <p className="leading-[normal]">Mentor/Mentee Events</p>
      </div>
      <FilterButtons onNavigate={onNavigate} />
      <EventsCarousel
        currentSlide={currentSlide}
        setCurrentSlide={setCurrentSlide}
        isMentorMentee={isMentorMentee}
      />
      <PaginationDots
        currentSlide={currentSlide}
        onSlideChange={setCurrentSlide}
        totalSlides={totalSlides}
      />
    </div>
  );
}
