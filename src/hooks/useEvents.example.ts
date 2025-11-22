/**
 * EXAMPLE FILE - Custom hook for event operations
 *
 * Your shadow should create src/hooks/useEvents.ts following this pattern.
 * This hook abstracts API calls and provides a clean interface for components.
 *
 * Usage in components:
 * ```typescript
 * const { events, isLoading, error, createEvent, updateEvent, deleteEvent } = useEvents()
 * ```
 */

import { useState, useEffect } from "react";
import type { EventResponse, CreateEventInput, UpdateEventInput } from "@/lib/types/event";

export function useEvents() {
  const [events, setEvents] = useState<EventResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // TODO: Implement fetchEvents
  const fetchEvents = async () => {
    // Fetch from GET /api/events
    // try {
    //   setIsLoading(true)
    //   setError(null)
    //   const response = await fetch('/api/events')
    //   if (!response.ok) throw new Error('Failed to fetch events')
    //   const data = await response.json()
    //   setEvents(data.events || data)
    // } catch (err) {
    //   setError(err instanceof Error ? err.message : 'Unknown error')
    // } finally {
    //   setIsLoading(false)
    // }
  };

  // TODO: Implement createEvent
  const createEvent = async (data: CreateEventInput) => {
    // POST to /api/events
    // try {
    //   const response = await fetch('/api/events', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(data),
    //   })
    //   if (!response.ok) throw new Error('Failed to create event')
    //   await fetchEvents() // Refresh list
    // } catch (err) {
    //   throw err
    // }
  };

  // TODO: Implement updateEvent
  const updateEvent = async (data: UpdateEventInput) => {
    // PUT to /api/events/[id]
    // try {
    //   const response = await fetch(`/api/events/${data.id}`, {
    //     method: 'PUT',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(data),
    //   })
    //   if (!response.ok) throw new Error('Failed to update event')
    //   await fetchEvents() // Refresh list
    // } catch (err) {
    //   throw err
    // }
  };

  // TODO: Implement deleteEvent
  const deleteEvent = async (id: number) => {
    // DELETE to /api/events/[id]
    // try {
    //   const response = await fetch(`/api/events/${id}`, {
    //     method: 'DELETE',
    //   })
    //   if (!response.ok) throw new Error('Failed to delete event')
    //   await fetchEvents() // Refresh list
    // } catch (err) {
    //   throw err
    // }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

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
