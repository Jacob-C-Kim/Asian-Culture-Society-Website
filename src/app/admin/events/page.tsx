/**
 * Admin Events Page
 *
 * This page provides an interface to view, create, edit, and delete events.
 * All functionality is currently stubbed and needs to be implemented.
 *
 * TODO: Implement event fetching, form integration, and CRUD operations.
 * Reference: https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts
 */

"use client";

// TODO: Import useState, useEffect from "react" when implementing state
// import { useState, useEffect } from "react";
// TODO: Import Button from @/components/ui/button when implementing UI
// import { Button } from "@/components/ui/button";
// TODO: Import EventForm from @/components/common/EventForm
// import EventForm from '@/components/common/EventForm'
// TODO: Import event types from @/lib/types/event
// import type { EventResponse } from '@/lib/types/event'

/**
 * @brief Admin page for managing events
 *
 * This page provides a full CRUD interface for events:
 * - View all events in a table/list
 * - Create new events
 * - Edit existing events
 * - Delete events
 *
 * @returns JSX page component with event management UI
 *
 * @example
 * Accessible at: /admin/events
 */
export default function AdminEventsPage() {
  // TODO: Add state for events list
  // Stores all events fetched from the API
  // const [events, setEvents] = useState<EventResponse[]>([])

  // TODO: Add state for selected event (for editing)
  // When editing, this holds the event being edited
  // const [selectedEvent, setSelectedEvent] = useState<EventResponse | null>(null)

  // TODO: Add state for showing create form
  // Controls visibility of the EventForm component
  // const [showCreateForm, setShowCreateForm] = useState(false)

  // TODO: Add loading and error states
  // Loading state for initial fetch and operations
  // const [isLoading, setIsLoading] = useState(true)
  // Error state for displaying error messages
  // const [error, setError] = useState<string | null>(null)

  /**
   * @brief Fetches all events from the API
   *
   * Called on component mount and after create/update/delete operations
   * to refresh the events list.
   *
   * Implementation steps:
   * 1. Set isLoading to true
   * 2. Clear any previous errors
   * 3. Fetch from GET /api/events
   * 4. Parse JSON response
   * 5. Update events state (response may be { events: [...] } or just [...])
   * 6. Handle errors and set error state
   * 7. Set isLoading to false in finally block
   */
  // TODO: Implement fetchEvents function
  // const fetchEvents = async () => {
  //   try {
  //     setIsLoading(true)
  //     setError(null)
  //     const response = await fetch('/api/events')
  //     if (!response.ok) {
  //       throw new Error('Failed to fetch events')
  //     }
  //     const data = await response.json()
  //     // API may return { events: [...] } or just [...]
  //     setEvents(data.events || data)
  //   } catch (err) {
  //     setError(err instanceof Error ? err.message : 'Unknown error')
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }

  // TODO: Fetch events on component mount
  // useEffect(() => {
  //   fetchEvents()
  // }, [])

  /**
   * @brief Handles clicking the "Create New Event" button
   *
   * Resets selected event and shows the form in create mode.
   */
  // TODO: Implement handleCreate function
  // const handleCreate = () => {
  //   setSelectedEvent(null) // No event selected = create mode
  //   setShowCreateForm(true) // Show the form
  // }

  /**
   * @brief Handles clicking the "Edit" button on an event
   *
   * @param event - The event to edit
   *
   * Sets the selected event and shows the form in edit mode.
   */
  // TODO: Implement handleEdit function
  // const handleEdit = (event: EventResponse) => {
  //   setSelectedEvent(event) // Set event = edit mode
  //   setShowCreateForm(true) // Show the form
  // }

  /**
   * @brief Handles deleting an event
   *
   * @param id - The ID of the event to delete
   *
   * Shows a confirmation dialog, then deletes the event via API,
   * and refreshes the events list.
   */
  // TODO: Implement handleDelete function
  // const handleDelete = async (id: number) => {
  //   // Confirm deletion
  //   if (!confirm('Are you sure you want to delete this event? This action cannot be undone.')) {
  //     return
  //   }
  //
  //   try {
  //     const response = await fetch(`/api/events/${id}`, {
  //       method: 'DELETE'
  //     })
  //     if (!response.ok) {
  //       throw new Error('Failed to delete event')
  //     }
  //     // Refresh the list
  //     fetchEvents()
  //   } catch (err) {
  //     // Show error (you could use a toast library instead of alert)
  //     alert(err instanceof Error ? err.message : 'Failed to delete event')
  //   }
  // }

  /**
   * @brief Callback when EventForm successfully creates or updates an event
   *
   * Hides the form, clears selected event, and refreshes the events list.
   */
  // TODO: Implement handleFormSuccess callback
  // const handleFormSuccess = () => {
  //   setShowCreateForm(false) // Hide form
  //   setSelectedEvent(null) // Clear selection
  //   fetchEvents() // Refresh list to show new/updated event
  // }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Event Management</h1>
          <p className="text-muted-foreground mt-1">Create, edit, and manage ACS events</p>
        </div>
        {/* TODO: Add create button */}
        {/* <Button onClick={handleCreate}>Create New Event</Button> */}
      </div>

      {/* TODO: Show form when creating/editing */}
      {/* {showCreateForm && (
        <div className="mb-6 rounded-lg border bg-card p-4">
          <EventForm
            event={selectedEvent || undefined}
            onSuccess={handleFormSuccess}
            onCancel={() => {
              setShowCreateForm(false)
              setSelectedEvent(null)
            }}
          />
        </div>
      )} */}

      {/* TODO: Show loading state */}
      {/* {isLoading && <p>Loading events...</p>} */}

      {/* TODO: Show error state */}
      {/* {error && <p className="text-destructive">Error: {error}</p>} */}

      {/* TODO: Display events list/table */}
      {/* {events.length === 0 && !isLoading && (
        <p className="text-muted-foreground">No events found. Create your first event!</p>
      )} */}

      {/* TODO: Create events table or list */}
      {/* Example table structure:
      <div className="rounded-lg border">
        <table className="w-full">
          <thead>
            <tr>
              <th>Title</th>
              <th>Date</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id}>
                <td>{event.title}</td>
                <td>{new Date(event.date).toLocaleDateString()}</td>
                <td>{event.location}</td>
                <td>
                  <Button variant="outline" size="sm" onClick={() => handleEdit(event)}>
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(event.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      */}
    </div>
  );
}
