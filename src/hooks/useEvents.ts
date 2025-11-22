/**
 * Custom Hook for Event Operations
 *
 * This hook abstracts API calls and provides a clean interface for components.
 * All functions are currently stubbed and need to be implemented.
 *
 * TODO: Implement all functions following the detailed comments.
 * Reference: https://react.dev/reference/react
 */

// TODO: Import useState, useEffect from "react" when implementing the hook
// import { useState, useEffect } from "react";
import type { EventResponse, CreateEventInput, UpdateEventInput } from "@/lib/types/event";

/**
 * @brief Custom React hook for managing events
 *
 * This hook provides state management and API functions for event CRUD operations.
 * It automatically fetches events on mount and provides functions for create, update, and delete.
 *
 * @returns Object containing:
 *          - events: EventResponse[] - Array of all events
 *          - isLoading: boolean - Loading state for initial fetch
 *          - error: string | null - Error message if fetch fails
 *          - fetchEvents: () => Promise<void> - Manually refresh events
 *          - createEvent: (data: CreateEventInput) => Promise<void> - Create new event
 *          - updateEvent: (data: UpdateEventInput) => Promise<void> - Update existing event
 *          - deleteEvent: (id: number) => Promise<void> - Delete event by ID
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { events, isLoading, error, createEvent } = useEvents()
 *
 *   if (isLoading) return <div>Loading...</div>
 *   if (error) return <div>Error: {error}</div>
 *
 *   return (
 *     <div>
 *       {events.map(event => (
 *         <div key={event.id}>{event.title}</div>
 *       ))}
 *     </div>
 *   )
 * }
 * ```
 */
export function useEvents() {
  // TODO: Uncomment and use these when implementing the hook
  // const [events, setEvents] = useState<EventResponse[]>([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);

  // Placeholder to satisfy return type - remove when implementing
  const events: EventResponse[] = [];
  const isLoading = false;
  const error: string | null = null;

  /**
   * @brief Fetches all events from the API
   *
   * Updates the events state with the fetched data.
   * Sets loading and error states appropriately.
   *
   * @returns Promise that resolves when fetch completes
   *
   * Implementation steps:
   * 1. Set isLoading to true
   * 2. Clear error state
   * 3. Fetch from GET /api/events
   * 4. Parse JSON response
   * 5. Update events state (handle both { events: [...] } and [...] formats)
   * 6. Handle errors and set error state
   * 7. Set isLoading to false in finally block
   */
  // TODO: Implement fetchEvents
  const fetchEvents = async () => {
    // Example implementation:
    // try {
    //   setIsLoading(true)
    //   setError(null)
    //   const response = await fetch('/api/events')
    //   if (!response.ok) {
    //     throw new Error('Failed to fetch events')
    //   }
    //   const data = await response.json()
    //   // Handle both response formats: { events: [...] } or just [...]
    //   setEvents(data.events || data)
    // } catch (err) {
    //   setError(err instanceof Error ? err.message : 'Unknown error')
    // } finally {
    //   setIsLoading(false)
    // }
  };

  /**
   * @brief Creates a new event
   *
   * @param data - Event data following CreateEventInput interface
   *
   * @returns Promise that resolves when event is created
   *
   * @throws Error if API request fails
   *
   * After successful creation, automatically refreshes the events list.
   */
  // TODO: Implement createEvent
  const createEvent = async (_data: CreateEventInput) => {
    // Example implementation:
    // try {
    //   const response = await fetch('/api/events', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(data),
    //   })
    //   if (!response.ok) {
    //     const errorData = await response.json()
    //     throw new Error(errorData.error || 'Failed to create event')
    //   }
    //   // Refresh the events list
    //   await fetchEvents()
    // } catch (err) {
    //   // Re-throw so component can handle it
    //   throw err
    // }
  };

  /**
   * @brief Updates an existing event
   *
   * @param data - Event data following UpdateEventInput interface (must include id)
   *
   * @returns Promise that resolves when event is updated
   *
   * @throws Error if API request fails
   *
   * After successful update, automatically refreshes the events list.
   */
  // TODO: Implement updateEvent
  const updateEvent = async (_data: UpdateEventInput) => {
    // Example implementation:
    // try {
    //   const response = await fetch(`/api/events/${data.id}`, {
    //     method: 'PUT',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(data),
    //   })
    //   if (!response.ok) {
    //     const errorData = await response.json()
    //     throw new Error(errorData.error || 'Failed to update event')
    //   }
    //   // Refresh the events list
    //   await fetchEvents()
    // } catch (err) {
    //   // Re-throw so component can handle it
    //   throw err
    // }
  };

  /**
   * @brief Deletes an event by ID
   *
   * @param id - The ID of the event to delete
   *
   * @returns Promise that resolves when event is deleted
   *
   * @throws Error if API request fails
   *
   * After successful deletion, automatically refreshes the events list.
   */
  // TODO: Implement deleteEvent
  const deleteEvent = async (_id: number) => {
    // Example implementation:
    // try {
    //   const response = await fetch(`/api/events/${id}`, {
    //     method: 'DELETE',
    //   })
    //   if (!response.ok) {
    //     const errorData = await response.json()
    //     throw new Error(errorData.error || 'Failed to delete event')
    //   }
    //   // Refresh the events list
    //   await fetchEvents()
    // } catch (err) {
    //   // Re-throw so component can handle it
    //   throw err
    // }
  };

  // TODO: Uncomment when implementing the hook
  // Fetch events on component mount
  // useEffect(() => {
  //   fetchEvents();
  // }, []);

  return {
    events,
    isLoading,
    error,
    fetchEvents,
    createEvent,
    updateEvent,
    deleteEvent,
  };
}
