/**
 * EXAMPLE FILE - Reference implementation for admin events page
 *
 * Your shadow should create src/app/admin/events/page.tsx following this pattern.
 * This page provides an interface to view, create, edit, and delete events.
 *
 * Steps:
 * 1. Copy this file to page.tsx (remove .example)
 * 2. Implement event fetching (GET /api/events)
 * 3. Wire up EventForm component
 * 4. Add event list/table display
 * 5. Add edit/delete functionality
 * 6. Add loading and error states
 */

"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
// TODO: Import EventForm from @/components/common/EventForm
// TODO: Import event types from @/lib/types/event

export default function AdminEventsPage() {
  // TODO: Add state for events list
  // const [events, setEvents] = useState<EventResponse[]>([])

  // TODO: Add state for selected event (for editing)
  // const [selectedEvent, setSelectedEvent] = useState<EventResponse | null>(null)

  // TODO: Add state for showing create form
  // const [showCreateForm, setShowCreateForm] = useState(false)

  // TODO: Add loading and error states
  // const [isLoading, setIsLoading] = useState(true)
  // const [error, setError] = useState<string | null>(null)

  // TODO: Fetch events on component mount
  // useEffect(() => {
  //   fetchEvents()
  // }, [])

  // TODO: Implement fetchEvents function
  // const fetchEvents = async () => {
  //   try {
  //     setIsLoading(true)
  //     const response = await fetch('/api/events')
  //     if (!response.ok) throw new Error('Failed to fetch events')
  //     const data = await response.json()
  //     setEvents(data.events || data) // Adjust based on API response structure
  //   } catch (err) {
  //     setError(err instanceof Error ? err.message : 'Unknown error')
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }

  // TODO: Implement handleCreate function
  // const handleCreate = () => {
  //   setSelectedEvent(null)
  //   setShowCreateForm(true)
  // }

  // TODO: Implement handleEdit function
  // const handleEdit = (event: EventResponse) => {
  //   setSelectedEvent(event)
  //   setShowCreateForm(true)
  // }

  // TODO: Implement handleDelete function
  // const handleDelete = async (id: number) => {
  //   if (!confirm('Are you sure you want to delete this event?')) return
  //   try {
  //     const response = await fetch(`/api/events/${id}`, { method: 'DELETE' })
  //     if (!response.ok) throw new Error('Failed to delete event')
  //     fetchEvents() // Refresh list
  //   } catch (err) {
  //     alert(err instanceof Error ? err.message : 'Failed to delete event')
  //   }
  // }

  // TODO: Implement handleFormSuccess callback
  // const handleFormSuccess = () => {
  //   setShowCreateForm(false)
  //   setSelectedEvent(null)
  //   fetchEvents() // Refresh list
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
