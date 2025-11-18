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

function FilterButtons({
  onNavigate,
  filterButtonType = "callback",
}: {
  onNavigate?: (page: string) => void;
  filterButtonType?: FilterButtonType;
}) {
  if (filterButtonType === "hardNavigate") {
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
      <div className="relative flex shrink-0 content-stretch items-start justify-start gap-[18px]">
        <a
          href="https://campusgroups.rit.edu/ACS/acs-calendar/"
          target="_top"
          rel="noopener"
          className="text-decoration-none relative box-border flex shrink-0 cursor-pointer content-stretch items-center justify-center gap-2.5 overflow-clip rounded-[10px] bg-[#8bd4e0] px-5 py-[7px] shadow-md transition-all duration-200 hover:bg-[#7bc7d3]"
          onClick={(e) => {
            e.preventDefault();
            navigateToFullCalendar();
          }}
        >
          <div className="relative shrink-0 text-nowrap font-['ITC_Avant_Garde_Gothic:Bold',_sans-serif] text-[14px] not-italic leading-[0] text-black">
            <p className="whitespace-pre leading-[normal]">Full Calendar</p>
          </div>
        </a>
      </div>
    );
  }

  if (filterButtonType === "newTab") {
    const handleCalendarClick = () => {
      window.open(
        "https://campusgroups.rit.edu/ACS/acs-calendar/",
        "_blank",
        "noopener,noreferrer"
      );
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

  // Default: callback
  return (
    <div className="relative flex shrink-0 content-stretch items-start justify-start gap-[18px]">
      <div
        className="relative box-border flex shrink-0 cursor-pointer content-stretch items-center justify-center gap-2.5 overflow-clip rounded-[10px] bg-[#8bd4e0] px-5 py-[7px] shadow-md transition-all duration-200 hover:bg-[#7bc7d3]"
        onClick={() => {
          if (onNavigate) {
            onNavigate("calendar");
          }
        }}
      >
        <div className="relative shrink-0 text-nowrap font-['ITC_Avant_Garde_Gothic:Bold',_sans-serif] text-[14px] not-italic leading-[0] text-black">
          <p className="whitespace-pre leading-[normal]">Full Calendar</p>
        </div>
      </div>
    </div>
  );
}

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

function PlaceholderCard({
  title = "No Events Yet",
  message = "Events will be displayed here once they are added.",
}: {
  title?: string;
  message?: string;
}) {
  return (
    <div className="relative flex h-[265px] w-[280px] shrink-0 items-center justify-center rounded-[15px] bg-[#99e3ed] sm:w-[351px]">
      <div className="max-h-[200px] overflow-y-auto px-6 text-center">
        <div className="mb-2 font-['Lexend:Bold',_sans-serif] text-[18px] font-bold text-black">
          <p className="leading-[1.2]">{title}</p>
        </div>
        <div className="font-['Lexend:Regular',_sans-serif] text-[12px] font-normal text-black">
          <p className="leading-[1.4]">{message}</p>
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

  useEffect(() => {
    const updateCardWidth = () => {
      const newWidth = window.innerWidth < 640 ? 280 : 351;
      setCardWidth(newWidth);
    };

    updateCardWidth();
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

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

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
          className="flex select-none gap-5"
          style={{
            transform: `translateX(${currentTransform}px)`,
            transition: "transform 300ms ease-out",
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

        <div
          className={`pointer-events-none absolute bottom-0 left-0 top-0 z-10 hidden w-16 transition-opacity duration-300 md:block ${
            currentSlide > 0 ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background: "linear-gradient(to right, #69d7e5 0%, #69d7e5 20%, transparent 100%)",
          }}
        />

        <div
          className={`pointer-events-none absolute bottom-0 right-0 top-0 z-10 hidden w-16 transition-opacity duration-300 md:block ${
            currentSlide < totalSlides - 1 ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background: "linear-gradient(to left, #69d7e5 0%, #69d7e5 20%, transparent 100%)",
          }}
        />
      </div>

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
    <div className="relative box-border flex w-full flex-col content-stretch items-center justify-start gap-[15px] overflow-hidden bg-[#69d7e5] px-0 pb-[30px] pt-[25px]">
      <div className="relative flex shrink-0 flex-col justify-center px-4 text-center font-['Lexend:Medium',_sans-serif] text-[20px] font-medium leading-[0] text-black md:text-[25px]">
        <p className="leading-[normal]">Events and Announcements</p>
      </div>
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
    </div>
  );
}
