/**
 * EXAMPLE FILE - Reference implementation for EventForm component
 *
 * Your shadow should create src/components/common/EventForm.tsx following this pattern.
 * This component provides a form for adding/editing events.
 *
 * Steps for shadow:
 * 1. Copy this file to EventForm.tsx (remove .example)
 * 2. Implement form state management
 * 3. Add form validation using the eventSchema from @/lib/validators/events
 * 4. Connect to API endpoint (POST /api/events or PUT /api/events/[id])
 * 5. Add loading states and error handling
 * 6. Add success feedback (toast notification or redirect)
 */

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
// TODO: Import eventSchema from @/lib/validators/events

interface EventFormProps {
  /**
   * If provided, form will be in "edit" mode and pre-populate with event data
   * If not provided, form will be in "create" mode
   */
  event?: {
    id: number;
    title: string;
    time: string;
    location: string;
    date: string; // ISO string
    description: string;
    isWeekendEvent: boolean;
  };
  /**
   * Callback when form is successfully submitted
   */
  onSuccess?: () => void;
  /**
   * Callback when form is cancelled
   */
  onCancel?: () => void;
}

export default function EventForm({ event, onSuccess, onCancel }: EventFormProps) {
  const isEditMode = !!event;

  // TODO: Add form state management
  // Hint: Use useState for each field, or use react-hook-form for better form handling
  // Example with useState:
  // const [title, setTitle] = useState(event?.title || '')
  // const [time, setTime] = useState(event?.time || '')
  // const [location, setLocation] = useState(event?.location || '')
  // const [date, setDate] = useState(event?.date ? new Date(event.date).toISOString().slice(0, 16) : '')
  // const [description, setDescription] = useState(event?.description || '')
  // const [isWeekendEvent, setIsWeekendEvent] = useState(event?.isWeekendEvent || false)

  // TODO: Add validation state
  // const [errors, setErrors] = useState<Record<string, string>>({})

  // TODO: Add loading state
  // const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: Implement form submission
    // Steps:
    // 1. Validate form data using eventSchema
    // 2. Set loading state
    // 3. Call API endpoint (POST for create, PUT for edit)
    // 4. Handle success (call onSuccess, show toast, etc.)
    // 5. Handle errors (set error state, show error message)
    // 6. Reset loading state

    // Example API call structure:
    // try {
    //   setIsSubmitting(true)
    //   const formData = {
    //     title,
    //     time,
    //     location,
    //     date: new Date(date),
    //     description,
    //     isWeekendEvent,
    //   }
    //
    //   const validation = eventSchema.safeParse(formData)
    //   if (!validation.success) {
    //     setErrors(validation.error.flatten().fieldErrors)
    //     return
    //   }
    //
    //   const response = await fetch(
    //     isEditMode ? `/api/events/${event.id}` : '/api/events',
    //     {
    //       method: isEditMode ? 'PUT' : 'POST',
    //       headers: { 'Content-Type': 'application/json' },
    //       body: JSON.stringify(validation.data),
    //     }
    //   )
    //   if (!response.ok) throw new Error('Failed to save event')
    //   onSuccess?.()
    // } catch (error) {
    //   // Handle error
    //   console.error('Error saving event:', error)
    // } finally {
    //   setIsSubmitting(false)
    // }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">{isEditMode ? "Edit Event" : "Create New Event"}</h2>
        <p className="text-muted-foreground text-sm">
          {isEditMode
            ? "Update the event details below."
            : "Fill in the details to create a new ACS event."}
        </p>
      </div>

      {/* Title Field */}
      <div className="space-y-2">
        <Label htmlFor="title">
          Event Title <span className="text-destructive">*</span>
        </Label>
        <Input
          id="title"
          type="text"
          placeholder="e.g., First GBM"
          // TODO: Add value and onChange
          // value={title}
          // onChange={(e) => setTitle(e.target.value)}
          required
        />
        {/* TODO: Display validation error if exists */}
        {/* {errors.title && <p className="text-sm text-destructive">{errors.title}</p>} */}
      </div>

      {/* Time Field */}
      <div className="space-y-2">
        <Label htmlFor="time">
          Time <span className="text-destructive">*</span>
        </Label>
        <Input
          id="time"
          type="text"
          placeholder="e.g., 5:00 PM - 7:00 PM"
          // TODO: Add value and onChange
          required
        />
        {/* TODO: Display validation error */}
      </div>

      {/* Location Field */}
      <div className="space-y-2">
        <Label htmlFor="location">
          Location <span className="text-destructive">*</span>
        </Label>
        <Input
          id="location"
          type="text"
          placeholder="e.g., Bamboo Room"
          // TODO: Add value and onChange
          required
        />
        {/* TODO: Display validation error */}
      </div>

      {/* Date Field */}
      <div className="space-y-2">
        <Label htmlFor="date">
          Date & Time <span className="text-destructive">*</span>
        </Label>
        <Input
          id="date"
          type="datetime-local"
          // TODO: Add value and onChange
          // Hint: Convert Date to datetime-local format: date.toISOString().slice(0, 16)
          // Hint: Convert from datetime-local: new Date(value)
          required
        />
        {/* TODO: Display validation error */}
      </div>

      {/* Description Field */}
      <div className="space-y-2">
        <Label htmlFor="description">
          Description <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="description"
          placeholder="Describe the event..."
          rows={5}
          // TODO: Add value and onChange
          required
        />
        {/* TODO: Display validation error */}
      </div>

      {/* Weekend Event Checkbox */}
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="isWeekendEvent"
          // TODO: Add checked and onChange
          // checked={isWeekendEvent}
          // onChange={(e) => setIsWeekendEvent(e.target.checked)}
          className="h-4 w-4 rounded border-gray-300"
        />
        <Label htmlFor="isWeekendEvent" className="font-normal">
          This is a weekend event
        </Label>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end gap-3">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={false}>
          {/* TODO: Add loading state */}
          {/* {isSubmitting ? "Saving..." : isEditMode ? "Update Event" : "Create Event"} */}
          {isEditMode ? "Update Event" : "Create Event"}
        </Button>
      </div>
    </form>
  );
}
