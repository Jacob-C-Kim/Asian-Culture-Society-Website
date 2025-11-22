import { useState, useRef, useEffect } from "react";
import svgPaths from "@/components/pages/home-src/imports/svg-onqcmwzw98";
import { Event, events, getSortedEvents } from "@/lib/data/events";

type FilterButtonType = "callback" | "hardNavigate" | "newTab";

interface EventsSectionProps {
  onNavigate?: (page: string) => void;
  filterButtonType?: FilterButtonType;
  customEvents?: Event[];
  useSortedEvents?: boolean;
  placeholderTitle?: string;
  placeholderMessage?: string;
  isMentorMentee?: boolean;
}

/**
 * @brief Renders filter buttons for navigating to the full calendar
 * @params {function} [onNavigate] - Callback function for navigation (optional)
 * @params {FilterButtonType} [filterButtonType="callback"] - Type of navigation: "callback", "hardNavigate", or "newTab"
 * @return {JSX.Element} Filter button component
 */
function FilterButtons({
  onNavigate,
  filterButtonType = "callback",
}: {
  onNavigate?: (page: string) => void;
  filterButtonType?: FilterButtonType;
}) {
  if (filterButtonType === "hardNavigate") {
    /**
     * @brief Navigates to the full calendar page by assigning the window location
     * @return {void}
     */
    const navigateToFullCalendar = () => {
      try {
        if (window.top) {
          window.top.location.assign("https://campusgroups.rit.edu/ACS/acs-calendar/");
        } else {
          window.location.assign("https://campusgroups.rit.edu/ACS/acs-calendar/");
        }
      } catch {
        window.location.assign("https://campusgroups.rit.edu/ACS/acs-calendar/");
      }
    };

    return (
      <div className="relative flex shrink-0 items-start justify-start gap-4.5">
        <a
          href="https://campusgroups.rit.edu/ACS/acs-calendar/"
          target="_top"
          rel="noopener"
          className="rounded-button relative box-border flex shrink-0 cursor-pointer items-center justify-center gap-2.5 overflow-clip bg-acs-teal-dark px-5 py-[7px] text-black no-underline shadow-md transition-all duration-200 hover:bg-[#7bc7d3]"
          onClick={(e) => {
            e.preventDefault();
            navigateToFullCalendar();
          }}
        >
          <span className="shrink-0 whitespace-nowrap font-avant-garde text-[14px] not-italic">
            Full Calendar
          </span>
        </a>
      </div>
    );
  }

  if (filterButtonType === "newTab") {
    /**
     * @brief Opens the calendar in a new browser tab
     * @return {void}
     */
    const handleCalendarClick = () => {
      window.open(
        "https://campusgroups.rit.edu/ACS/acs-calendar/",
        "_blank",
        "noopener,noreferrer"
      );
    };

    return (
      <div className="relative flex shrink-0 items-start justify-start gap-4.5">
        <button
          className="rounded-button relative box-border flex shrink-0 cursor-pointer items-center justify-center gap-2.5 overflow-clip bg-acs-teal-dark px-5 py-[7px] shadow-md transition-all duration-200 hover:bg-[#7bc7d3]"
          onClick={handleCalendarClick}
          aria-label="Open full calendar in new tab"
        >
          <span className="shrink-0 whitespace-nowrap font-avant-garde text-[14px] not-italic text-black">
            Full Calendar
          </span>
        </button>
      </div>
    );
  }

  // Default: callback
  return (
    <div className="relative flex shrink-0 items-start justify-start gap-4.5">
      <button
        className="rounded-button relative box-border flex shrink-0 cursor-pointer items-center justify-center gap-2.5 overflow-clip bg-acs-teal-dark px-5 py-[7px] shadow-md transition-all duration-200 hover:bg-[#7bc7d3]"
        onClick={() => {
          if (onNavigate) {
            onNavigate("calendar");
          }
        }}
        aria-label="Navigate to full calendar"
      >
        <span className="shrink-0 whitespace-nowrap font-avant-garde text-[14px] not-italic text-black">
          Full Calendar
        </span>
      </button>
    </div>
  );
}

/**
 * @brief Renders an event card with event details
 * @params {Event} event - The event object containing title, time, location, date, and description
 * @return {JSX.Element} Event card component
 */
function EventCard({ event }: { event: Event }) {
  return (
    <article className="relative h-[265px] w-[280px] shrink-0 rounded-card bg-acs-teal sm:w-[351px]">
      <div className="relative flex h-full w-full flex-col overflow-clip rounded-card px-[18px] pb-4 pt-[94px]">
        {/* Calendar icon - top right */}
        <div className="absolute right-[18px] top-[94px] flex size-9 items-center justify-center rounded-card bg-white/50">
          <div className="relative h-6 w-[21px]">
            <svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 21 24"
              aria-hidden="true"
            >
              <g id="calendar-days">
                <path d={svgPaths.p3ca7b300} fill="var(--fill-0, #195259)" id="Primary" />
              </g>
            </svg>
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-card border border-solid border-white"
          />
        </div>

        {/* Event title, time, location, date */}
        <div className="flex w-[calc(100%-50px)] flex-col gap-1 text-black">
          <h3 className="w-full font-lexend text-[18px] font-bold leading-[1.2]">{event.title}</h3>
          <p className="w-full font-lexend text-[12px] font-medium leading-[1.3]">
            {event.time} @ {event.location}
          </p>
          <div className="w-full font-lexend text-[12px] font-medium">
            {event.link ? (
              <a
                href={event.link}
                className="cursor-pointer leading-[1.3] underline decoration-solid hover:text-blue-600"
                target="_blank"
                rel="noopener noreferrer"
              >
                {event.date}
              </a>
            ) : (
              <p className="leading-[1.3]">{event.date}</p>
            )}
          </div>
        </div>

        {/* Description - scrollable */}
        <div className="mt-[10px] h-[77px] w-full overflow-y-auto pr-2 text-[12px] text-black">
          <p className="font-lexend font-normal leading-[1.4]">{event.description}</p>
        </div>
      </div>

      {/* Border overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-card border border-solid border-white"
      />
    </article>
  );
}

/**
 * @brief Renders a placeholder card when no events are available
 * @params {string} [title="No Events Yet"] - Title text for the placeholder
 * @params {string} [message="Events will be displayed here once they are added."] - Message text for the placeholder
 * @return {JSX.Element} Placeholder card component
 */
function PlaceholderCard({
  title = "No Events Yet",
  message = "Events will be displayed here once they are added.",
}: {
  title?: string;
  message?: string;
}) {
  return (
    <div className="relative flex h-[265px] w-[280px] shrink-0 items-center justify-center rounded-card bg-acs-teal sm:w-[351px]">
      <div className="max-h-[200px] overflow-y-auto px-6 text-center">
        <h3 className="mb-2 font-lexend text-[18px] font-bold leading-[1.2] text-black">{title}</h3>
        <p className="font-lexend text-[12px] font-normal leading-[1.4] text-black">{message}</p>
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-card border border-solid border-white"
      />
    </div>
  );
}

/**
 * @brief Renders a carousel of event cards with navigation controls
 * @params {number} currentSlide - Current slide index
 * @params {function} setCurrentSlide - Function to update the current slide
 * @params {Event[]} displayEvents - Array of events to display
 * @params {string} [placeholderTitle] - Title for placeholder card when no events
 * @params {string} [placeholderMessage] - Message for placeholder card when no events
 * @return {JSX.Element} Events carousel component
 */
function EventsCarousel({
  currentSlide,
  setCurrentSlide,
  displayEvents,
  placeholderTitle,
  placeholderMessage,
}: {
  currentSlide: number;
  setCurrentSlide: (slide: number) => void;
  displayEvents: Event[];
  placeholderTitle?: string;
  placeholderMessage?: string;
}) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const lastScrollTimeRef = useRef<number>(0);
  const totalSlides = Math.max(displayEvents.length, 1);
  const [cardWidth, setCardWidth] = useState(351);
  const gap = 20;
  const slideWidth = cardWidth + gap;

  /**
   * @brief Updates card width based on window size (280px for mobile, 351px for desktop)
   * @return {void}
   */
  useEffect(() => {
    const updateCardWidth = () => {
      const newWidth = window.innerWidth < 640 ? 280 : 351;
      setCardWidth(newWidth);
    };

    updateCardWidth();
    window.addEventListener("resize", updateCardWidth);
    return () => window.removeEventListener("resize", updateCardWidth);
  }, []);

  /**
   * @brief Advances to the next slide
   * @return {void}
   */
  const nextSlide = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  /**
   * @brief Goes to the previous slide
   * @return {void}
   */
  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  /**
   * @brief Handles mouse wheel scrolling for carousel navigation
   * @params {React.WheelEvent} e - Wheel event object
   * @return {void}
   */
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();

    const now = Date.now();
    if (now - lastScrollTimeRef.current < 500) {
      return;
    }

    const horizontalThreshold = 25;
    const verticalThreshold = 40;

    if (Math.abs(e.deltaX) > horizontalThreshold && Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      lastScrollTimeRef.current = now;
      if (e.deltaX > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    } else if (Math.abs(e.deltaY) > verticalThreshold && Math.abs(e.deltaX) < 15) {
      lastScrollTimeRef.current = now;
      if (e.deltaY > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  };

  const [touchStart, setTouchStart] = useState<number | null>(null);

  /**
   * @brief Handles touch start event for mobile swipe navigation
   * @params {React.TouchEvent} e - Touch event object
   * @return {void}
   */
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  /**
   * @brief Handles touch end event to complete swipe gesture
   * @params {React.TouchEvent} e - Touch event object
   * @return {void}
   */
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;

    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide();
      } else {
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
          className="flex select-none gap-5 transition-transform duration-300 ease-out"
          style={{
            transform: `translateX(${currentTransform}px)`,
          }}
          onWheel={handleWheel}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {displayEvents.length > 0 ? (
            displayEvents.map((event) => <EventCard key={event.id} event={event} />)
          ) : (
            <PlaceholderCard title={placeholderTitle} message={placeholderMessage} />
          )}
        </div>

        {/* Left gradient fade */}
        <div
          className={`pointer-events-none absolute bottom-0 left-0 top-0 z-10 hidden w-16 bg-gradient-to-r from-[#69d7e5] via-[#69d7e5]/20 to-transparent transition-opacity duration-300 md:block ${
            currentSlide > 0 ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden="true"
        />

        {/* Right gradient fade */}
        <div
          className={`pointer-events-none absolute bottom-0 right-0 top-0 z-10 hidden w-16 bg-gradient-to-l from-[#69d7e5] via-[#69d7e5]/20 to-transparent transition-opacity duration-300 md:block ${
            currentSlide < totalSlides - 1 ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden="true"
        />
      </div>

      {/* Previous button */}
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

      {/* Next button */}
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

/**
 * @brief Renders pagination dots for carousel navigation
 * @params {number} currentSlide - Current slide index
 * @params {function} onSlideChange - Callback function to change slides
 * @params {number} totalSlides - Total number of slides
 * @return {JSX.Element | null} Pagination dots component or null if only one slide
 */
function PaginationDots({
  currentSlide,
  onSlideChange,
  totalSlides,
}: {
  currentSlide: number;
  onSlideChange: (index: number) => void;
  totalSlides: number;
}) {
  if (totalSlides <= 1) return null;

  return (
    <nav className="flex items-center justify-center gap-2" aria-label="Carousel pagination">
      {Array.from({ length: totalSlides }, (_, index) => (
        <button
          key={index}
          onClick={() => onSlideChange(index)}
          className={`cursor-pointer rounded-full transition-all duration-300 hover:opacity-80 ${
            currentSlide === index ? "h-2.5 w-8 bg-white/70" : "h-2.5 w-2.5 bg-white/50"
          }`}
          aria-label={`Go to slide ${index + 1}`}
          aria-current={currentSlide === index ? "true" : "false"}
        />
      ))}
    </nav>
  );
}

/**
 * @brief Main events section component displaying event carousel with filtering options
 * @params {function} [onNavigate] - Callback function for navigation (optional)
 * @params {FilterButtonType} [filterButtonType="callback"] - Type of filter button navigation
 * @params {Event[]} [customEvents] - Custom array of events to display (optional)
 * @params {boolean} [useSortedEvents=true] - Whether to use sorted events
 * @params {string} [placeholderTitle] - Custom placeholder title (optional)
 * @params {string} [placeholderMessage] - Custom placeholder message (optional)
 * @params {boolean} [isMentorMentee=false] - Whether to show mentor/mentee specific events
 * @return {JSX.Element} Events section component
 */
export default function EventsSection({
  onNavigate,
  filterButtonType = "callback",
  customEvents,
  useSortedEvents = true,
  placeholderTitle,
  placeholderMessage,
  isMentorMentee = false,
}: EventsSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Determine which events to display
  let displayEvents: Event[];
  if (customEvents) {
    displayEvents = customEvents;
  } else if (isMentorMentee) {
    // Filter for mentor/mentee specific events
    displayEvents = getSortedEvents().filter((event) => event.title === "Speed Dating");
  } else if (useSortedEvents) {
    displayEvents = getSortedEvents();
  } else {
    // For calendar-src, use events directly (unsorted)
    displayEvents = [...events];
  }

  const totalSlides = Math.max(displayEvents.length, 1);

  // Use custom placeholder text for mentor-mentee if not provided
  const finalPlaceholderTitle =
    placeholderTitle || (isMentorMentee ? "No Mentor/Mentee Events Yet" : "No Events Yet");
  const finalPlaceholderMessage =
    placeholderMessage ||
    (isMentorMentee
      ? "Mentor/Mentee events will be displayed here once they are added."
      : "Events will be displayed here once they are added.");

  return (
    <section
      className="relative box-border flex w-full flex-col items-center justify-start gap-[15px] overflow-hidden bg-[#69d7e5] px-0 pb-[30px] pt-[25px]"
      data-section={isMentorMentee ? "mentor-mentee-events" : "events"}
    >
      <header className="relative flex shrink-0 flex-col justify-center px-4 text-center">
        <h2 className="font-lexend text-[20px] font-medium text-black md:text-[25px]">
          Events and Announcements
        </h2>
      </header>
      <FilterButtons onNavigate={onNavigate} filterButtonType={filterButtonType} />
      <EventsCarousel
        currentSlide={currentSlide}
        setCurrentSlide={setCurrentSlide}
        displayEvents={displayEvents}
        placeholderTitle={finalPlaceholderTitle}
        placeholderMessage={finalPlaceholderMessage}
      />
      <PaginationDots
        currentSlide={currentSlide}
        onSlideChange={setCurrentSlide}
        totalSlides={totalSlides}
      />
    </section>
  );
}
