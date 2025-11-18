import { useState, useEffect } from "react";
import { hasEventsOnDate, getEventsForDate } from "@/lib/data/events";
import EventDetailsCard from "./calendar/EventDetailsCard";
import CalendarWidget from "./calendar/CalendarWidget";

/**
 * @brief Main calendar page component with interactive date selection and event display
 * @return {JSX.Element} Calendar page component
 */
export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [showEventCard, setShowEventCard] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  /**
   * @brief Checks if the viewport is mobile (<=768px) and updates state
   * @return {void}
   */
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  /**
   * @brief Handles date selection from the calendar widget
   * @params {Date | undefined} date - The selected date or undefined
   * @return {void}
   */
  const handleDateSelect = (date: Date | undefined) => {
    // Check if the clicked date has events
    const isEventDate = date && hasEventsOnDate(date);

    if (!isEventDate) {
      // If it's not an event date, do nothing
      return;
    }

    // If the same date is selected, deselect it (go back to full calendar)
    if (selectedDate && date && selectedDate.getTime() === date.getTime()) {
      handleCloseEvent();
    } else {
      // Select the new event date with animation
      setSelectedDate(date);

      // Show event card after calendar starts moving
      setTimeout(
        () => {
          setShowEventCard(true);
        },
        isMobile ? 300 : 150
      );
    }
  };

  /**
   * @brief Closes the event details card and resets selected date
   * @return {void}
   */
  const handleCloseEvent = () => {
    // Start fade out immediately, then clear date after fade completes
    setShowEventCard(false);

    // Clear the selected date after a brief moment to allow fade animation
    setTimeout(() => {
      setSelectedDate(undefined);
    }, 100);
  };

  /**
   * @brief Handles global keyboard events for ESC (close) and arrow keys (navigate events)
   * @return {void}
   */
  useEffect(() => {
    const handleGlobalKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedDate) {
        handleCloseEvent();
        return;
      }

      // Handle arrow keys for event navigation when event card is visible
      if (selectedDate && showEventCard) {
        // Get the events for the selected date to check if there are multiple
        const eventsForDate = getEventsForDate(selectedDate);

        if (eventsForDate.length > 1) {
          if (e.key === "ArrowUp") {
            e.preventDefault();
            e.stopPropagation();
            // Trigger a custom event that the EventDetailsCard can listen to
            const upEvent = new CustomEvent("navigateEvent", { detail: { direction: "up" } });
            document.dispatchEvent(upEvent);
          } else if (e.key === "ArrowDown") {
            e.preventDefault();
            e.stopPropagation();
            // Trigger a custom event that the EventDetailsCard can listen to
            const downEvent = new CustomEvent("navigateEvent", { detail: { direction: "down" } });
            document.dispatchEvent(downEvent);
          }
        }
      }
    };

    document.addEventListener("keydown", handleGlobalKeyPress);
    return () => document.removeEventListener("keydown", handleGlobalKeyPress);
  }, [selectedDate, showEventCard]);

  /**
   * @brief Resets event card visibility when selected date is cleared
   * @return {void}
   */
  useEffect(() => {
    if (!selectedDate) {
      setShowEventCard(false);
    }
  }, [selectedDate]);

  const hasSelectedDate = selectedDate !== undefined;

  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      {/* White background section - only as tall as navigation bar */}
      <div className="h-16 w-full bg-white" aria-hidden="true" />

      {/* Turquoise background section */}
      <div className="min-h-[calc(100vh-64px)] w-full bg-[#69d7e5]">
        {/* Calendar content with proper top spacing */}
        <div className={`${isMobile ? "px-4 pb-8 pt-4" : "px-8 pb-12 pt-8"}`}>
          <div className="relative mx-auto max-w-7xl">
            {/* Mobile Layout */}
            {isMobile ? (
              <div className="flex flex-col gap-6">
                {/* Calendar container - full width on mobile */}
                <div className="w-full">
                  <CalendarWidget
                    selectedDate={selectedDate}
                    onDateSelect={handleDateSelect}
                    isCompact={false}
                  />
                </div>

                {/* Event details card - below calendar on mobile */}
                {hasSelectedDate && (
                  <div
                    className={`w-full transition-all duration-500 ease-calendar-ease ${
                      showEventCard ? "translate-y-0 opacity-100 delay-200" : "translate-y-4 opacity-0 delay-0"
                    }`}
                  >
                    <EventDetailsCard selectedDate={selectedDate} onClose={handleCloseEvent} />
                  </div>
                )}
              </div>
            ) : (
              /* Desktop Layout - Using CSS Grid for positioning */
              <div className="relative h-[620px] w-full">
                {/* Calendar container - slides from center to left when date selected */}
                <div
                  className={`absolute z-20 transition-all duration-500 ease-calendar-ease ${
                    hasSelectedDate
                      ? "left-[50px] top-1/2 w-[600px] -translate-y-1/2"
                      : "left-1/2 top-[55%] w-[650px] -translate-x-1/2 -translate-y-1/2"
                  }`}
                >
                  <CalendarWidget
                    selectedDate={selectedDate}
                    onDateSelect={handleDateSelect}
                    isCompact={hasSelectedDate}
                  />
                </div>

                {/* Event details card - positioned to the right of calendar */}
                <div
                  className={`absolute right-[30px] top-1/2 w-[360px] -translate-y-1/2 transition-all duration-500 ease-calendar-ease ${
                    showEventCard
                      ? "pointer-events-auto z-[15] opacity-100 delay-150"
                      : "pointer-events-none z-[5] opacity-0 delay-0"
                  } ${showEventCard || selectedDate ? "visible" : "invisible"}`}
                >
                  {hasSelectedDate && (
                    <EventDetailsCard selectedDate={selectedDate} onClose={handleCloseEvent} />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
