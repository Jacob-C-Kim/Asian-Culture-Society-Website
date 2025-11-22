# Events System Architecture

This document explains how the events system works, focusing on how `EventDetailsCard` and related components interact with the event data flow.

## Overview

The events system provides a calendar interface where users can view and interact with ACS events. The system currently uses static data from `src/lib/data/events.ts`, with a planned migration to a database-backed system using PostgreSQL and Prisma.

## Event Data Flow

### Current System (Static Data)

```
src/lib/data/events.ts
    ↓
Helper Functions (getEventsForDate, hasEventsOnDate, getEventDates)
    ↓
CalendarPage Component
    ↓
CalendarWidget + EventDetailsCard
```

### Future System (Database-Backed)

```
PostgreSQL Database
    ↓
Prisma ORM (src/lib/db/prisma.ts)
    ↓
Service Layer (src/lib/services/eventService.ts)
    ↓
API Routes (src/app/api/events/*)
    ↓
useEvents Hook (src/hooks/useEvents.ts)
    ↓
CalendarPage Component
    ↓
CalendarWidget + EventDetailsCard
```

## Data Structure

Events are represented with the following properties:

- `id`: Unique identifier
- `title`: Event name (e.g., "First GBM")
- `time`: Time range string (e.g., "5:00 PM - 7:00 PM")
- `location`: Event location (e.g., "Bamboo Room")
- `date`: Human-readable date string (e.g., "August 29th, 2025")
- `dateObject`: JavaScript Date object for calendar integration
- `description`: Full event description
- `link`: Optional link to more information

## Component Interaction Flow

### CalendarPage

The main container component that orchestrates the calendar interface.

**Location**: `src/components/pages/calendar-src/components/CalendarPage.tsx`

**Responsibilities**:

- Manages `selectedDate` state (the currently selected date)
- Manages `showEventCard` state (controls visibility of EventDetailsCard)
- Handles date selection from CalendarWidget
- Handles closing the event card
- Listens for global keyboard events (ESC to close, arrow keys for navigation)
- Determines mobile vs desktop layout

**Key Functions**:

- `handleDateSelect(date)`: Called when a date is clicked in CalendarWidget
  - Checks if the date has events using `hasEventsOnDate()`
  - Updates `selectedDate` state
  - Shows EventDetailsCard after animation delay
- `handleCloseEvent()`: Closes the event card and clears selected date
- Global keyboard handler: Dispatches custom events for arrow key navigation

### CalendarWidget

Displays the calendar UI and handles date selection.

**Location**: `src/components/pages/calendar-src/components/calendar/CalendarWidget.tsx`

**Responsibilities**:

- Renders the calendar using shadcn/ui Calendar component
- Highlights dates that have events using `getEventDates()`
- Handles date clicks and calls `onDateSelect` callback
- Adapts layout for mobile vs desktop

**Data Flow**:

- Receives `selectedDate` prop from CalendarPage
- Calls `getEventDates()` to get array of dates with events
- Passes dates to Calendar component's `modifiers` prop for highlighting

### EventDetailsCard

Displays detailed information about events on a selected date.

**Location**: `src/components/pages/calendar-src/components/calendar/EventDetailsCard.tsx`

**Props**:

- `selectedDate: Date | undefined` - The date to display events for
- `onClose: () => void` - Callback function to close the card

**Responsibilities**:

- Fetches events for the selected date
- Displays event details (title, time, location, description)
- Handles navigation between multiple events on the same date
- Provides mobile swipe gestures for event navigation
- Provides keyboard navigation (arrow keys) for desktop
- Manages mobile detection and responsive behavior

**Data Fetching**:

```typescript
const events = selectedDate ? getAllEventsForDate(selectedDate, getEventsForDate) : [];
```

The component uses `getAllEventsForDate()` helper function, which:

1. Takes the selected date and a `getEventsForDate` function
2. Calls `getEventsForDate(selectedDate)` to get events from the data source
3. Formats and sorts events by start time
4. Returns an array ready for display

**State Management**:

- `currentEventIndex`: Tracks which event is currently displayed (for dates with multiple events)
- `isMobile`: Detects if viewport is mobile-sized (≤768px)
- `touchStart/touchEnd`: Tracks touch positions for swipe gestures
- `isSwipeActive`: Visual feedback during swipe
- `showSwipeHint`: Shows/hides swipe hint on mobile

**Features**:

1. **Multiple Event Navigation**:
   - If a date has multiple events, users can navigate between them
   - Desktop: Arrow keys (Up/Down) or scroll buttons
   - Mobile: Swipe gestures (up to go to next, down to go to previous)

2. **Keyboard Navigation**:
   - Listens for global `navigateEvent` custom events
   - CalendarPage dispatches these events when arrow keys are pressed
   - Updates `currentEventIndex` to show next/previous event

3. **Touch Gestures**:
   - Detects vertical swipes on mobile
   - Minimum swipe distance: 40px
   - Ignores horizontal swipes
   - Provides visual feedback during swipe

4. **Responsive Design**:
   - Different heights for mobile (360px) vs desktop (400px)
   - Different animation timings
   - Mobile-specific swipe hints

## Helper Functions

### getEventsForDate

**Location**: `src/lib/data/events.ts`

**Signature**: `getEventsForDate(date: Date): Event[]`

**Purpose**: Filters the events array to return only events that occur on the specified date.

**Implementation**:

```typescript
export const getEventsForDate = (date: Date): Event[] => {
  return events.filter(
    (event) =>
      event.dateObject.getDate() === date.getDate() &&
      event.dateObject.getMonth() === date.getMonth() &&
      event.dateObject.getFullYear() === date.getFullYear()
  );
};
```

**Usage**: Called by `getAllEventsForDate()` and directly by CalendarPage to check if a date has events.

### getAllEventsForDate

**Location**: `src/lib/utils/calendarHelpers.ts`

**Signature**:

```typescript
getAllEventsForDate(
  date: Date,
  getEventsForDate: (date: Date) => Array<{...}>
): Array<{title, time, location, description}>
```

**Purpose**: Formats and sorts events for display in EventDetailsCard. Accepts a `getEventsForDate` function as a parameter to work with different data sources (static data now, database later).

**Implementation**:

1. Calls `getEventsForDate(date)` to get events
2. If no events, returns a placeholder "No Event" object
3. Maps events to display format (extracts title, time, location, description)
4. Sorts events by start time using `parseStartTime()` helper
5. Returns formatted and sorted array

**Usage**: Called by EventDetailsCard to get events for the selected date.

### hasEventsOnDate

**Location**: `src/lib/data/events.ts`

**Signature**: `hasEventsOnDate(date: Date): boolean`

**Purpose**: Quickly checks if a date has any events without returning the full event objects.

**Implementation**:

```typescript
export const hasEventsOnDate = (date: Date): boolean => {
  return getEventsForDate(date).length > 0;
};
```

**Usage**: Called by CalendarPage to determine if a clicked date should show the EventDetailsCard.

### getEventDates

**Location**: `src/lib/data/events.ts`

**Signature**: `getEventDates(): Date[]`

**Purpose**: Returns an array of all dates that have events, used for calendar highlighting.

**Implementation**:

```typescript
export const getEventDates = (): Date[] => {
  return events.map((event) => event.dateObject);
};
```

**Usage**: Called by CalendarWidget to highlight dates with events in the calendar UI.

### parseStartTime

**Location**: `src/lib/utils/calendarHelpers.ts`

**Signature**: `parseStartTime(timeString: string): number`

**Purpose**: Parses a time string (e.g., "5:00 PM - 7:00 PM") and returns minutes since midnight for the start time. Used for sorting events by time.

**Usage**: Called internally by `getAllEventsForDate()` to sort events.

### formatDate

**Location**: `src/lib/utils/calendarHelpers.ts`

**Signature**: `formatDate(date: Date): string`

**Purpose**: Formats a Date object to a human-readable string (e.g., "August 29, 2025").

**Usage**: Used by EventDetailsCard to display the selected date.

## Integration Points

### CalendarPage → EventDetailsCard

1. **Date Selection Flow**:

   ```
   User clicks date in CalendarWidget
   → CalendarWidget calls onDateSelect(date)
   → CalendarPage.handleDateSelect(date) checks hasEventsOnDate(date)
   → If has events, sets selectedDate state
   → EventDetailsCard receives selectedDate prop
   → EventDetailsCard fetches events using getAllEventsForDate()
   ```

2. **Closing Flow**:

   ```
   User clicks close button or presses ESC
   → EventDetailsCard calls onClose()
   → CalendarPage.handleCloseEvent() clears selectedDate
   → EventDetailsCard receives undefined selectedDate
   → Component returns null (unmounts)
   ```

3. **Navigation Flow** (Multiple Events):
   ```
   User presses arrow key
   → CalendarPage global keyboard handler dispatches navigateEvent
   → EventDetailsCard listens for navigateEvent
   → Updates currentEventIndex state
   → Re-renders with new event displayed
   ```

### EventDetailsCard → Data Source

Currently, EventDetailsCard receives data through the helper function chain:

```
EventDetailsCard
  → getAllEventsForDate(selectedDate, getEventsForDate)
    → getEventsForDate(selectedDate) [from src/lib/data/events.ts]
      → events array [static data]
```

In the future, this will change to:

```
EventDetailsCard
  → useEvents hook
    → API call to /api/events?date=...
      → eventService.getEventsByDate()
        → Prisma query
          → PostgreSQL database
```

## Future Database Integration

### Migration Path

When transitioning from static data to database-backed events:

1. **Update EventDetailsCard**:
   - Replace `getAllEventsForDate(selectedDate, getEventsForDate)` call
   - Use `useEvents` hook instead: `const { events, isLoading } = useEvents()`
   - Filter events by selectedDate in the component or hook
   - Handle loading and error states

2. **Update CalendarPage**:
   - Replace `hasEventsOnDate()` and `getEventsForDate()` calls
   - Use `useEvents` hook to get all events
   - Create helper functions that work with the events from the hook

3. **Update CalendarWidget**:
   - Replace `getEventDates()` call
   - Extract dates from events array provided by `useEvents` hook

4. **Service Layer Integration**:
   - `eventService.getEventsByDate(date)` will replace `getEventsForDate(date)`
   - `eventService.getAllEvents()` will provide all events for the hook
   - API routes will handle date filtering and return formatted data

### Example Future Implementation

```typescript
// In EventDetailsCard
const { events: allEvents, isLoading } = useEvents();
const eventsForDate = useMemo(() => {
  if (!selectedDate || !allEvents) return [];
  return allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate.toDateString() === selectedDate.toDateString();
  });
}, [selectedDate, allEvents]);
```

## Known Warnings

### Image Optimization

Some components use `<img>` tags instead of Next.js `<Image />` component:

- `src/components/common/Footer.tsx`
- `src/components/pages/about-us-src/components/AboutUsPage.tsx`
- `src/components/pages/mentor-mentee-src/components/MentorMenteePage.tsx`

These are performance warnings, not errors. The components will function correctly, but using Next.js Image component would provide automatic optimization, lazy loading, and better performance. This can be optimized later if needed.

## Summary

The events system provides a seamless calendar interface where:

1. **CalendarPage** manages the overall state and layout
2. **CalendarWidget** displays the calendar and handles date selection
3. **EventDetailsCard** displays event details and handles navigation
4. **Helper functions** provide data filtering, formatting, and sorting
5. **Static data** currently powers the system, with a clear path to database integration

The architecture is designed to make the transition from static to database-backed data straightforward, with minimal changes to component logic.
