/**
 * Event Form Component
 *
 * This component provides a form for creating and editing events.
 * All form functionality is currently stubbed and needs to be implemented.
 *
 * WHAT IS A CONTROLLED COMPONENT?
 * --------------------------------
 * React forms can be "controlled" or "uncontrolled":
 * - Controlled: React state controls the input value (we use this)
 * - Uncontrolled: Browser/DOM controls the input value
 *
 * WHY CONTROLLED COMPONENTS?
 * - We can validate input as user types
 * - We can format/transform input (e.g., auto-format dates)
 * - We can control when form submits
 * - We can easily reset the form
 * - Better for complex forms with validation
 *
 * THE FORM LIFECYCLE:
 * 1. User types in input → onChange fires → update state
 * 2. State updates → component re-renders → input shows new value
 * 3. User submits → handleSubmit fires → validate → call API
 * 4. API succeeds → onSuccess callback → refresh list/close form
 *
 * VALIDATION STRATEGY:
 * - Client-side: Validate with Zod before sending to API (fast feedback)
 * - Server-side: API also validates (security - never trust client)
 * - Show errors: Display field-level errors below each input
 *
 * TODO: Implement form state management, validation, and API integration.
 * Reference: See src/components/common/MentorSignup.tsx for form handling patterns
 */

"use client";

// TODO: Import useState from "react" when implementing form state
// import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
// TODO: Import eventSchema from @/lib/validators/events
// import { eventSchema } from '@/lib/validators/events'

/**
 * @brief Props for the EventForm component
 */
interface EventFormProps {
  /**
   * @brief Optional event data for edit mode
   *
   * If provided, form will be in "edit" mode and pre-populate with event data.
   * If not provided, form will be in "create" mode with empty fields.
   */
  event?: {
    id: number;
    title: string;
    time: string;
    location: string;
    date: string; // ISO string (e.g., "2025-08-29T17:00:00Z")
    description: string;
    isWeekendEvent: boolean;
  };
  /**
   * @brief Callback function called when form is successfully submitted
   *
   * This is called after the API request succeeds.
   * Use this to refresh the events list, close a modal, show a toast, etc.
   */
  onSuccess?: () => void;
  /**
   * @brief Callback function called when form is cancelled
   *
   * This is called when the user clicks the Cancel button.
   * Use this to close a modal, reset form state, etc.
   */
  onCancel?: () => void;
}

/**
 * @brief React component for creating and editing events
 *
 * This component provides a form interface for creating new events or editing existing ones.
 * It handles form state, validation, and API communication.
 *
 * @param props - EventFormProps containing optional event data and callbacks
 *
 * @returns JSX form element with fields for all event properties
 *
 * @example
 * ```tsx
 * // Create mode
 * <EventForm
 *   onSuccess={() => {
 *     console.log('Event created!')
 *     fetchEvents() // Refresh list
 *   }}
 *   onCancel={() => setShowForm(false)}
 * />
 *
 * // Edit mode
 * <EventForm
 *   event={selectedEvent}
 *   onSuccess={() => {
 *     console.log('Event updated!')
 *     setShowForm(false)
 *   }}
 *   onCancel={() => setShowForm(false)}
 * />
 * ```
 */
export default function EventForm({ event, onSuccess: _onSuccess, onCancel }: EventFormProps) {
  const isEditMode = !!event;

  // TODO: Add form state management
  //
  // WHY WE USE SEPARATE STATE FOR EACH FIELD:
  // - Simple and straightforward
  // - Easy to understand and debug
  // - Each field is independent
  // Alternative: Use a single state object, but separate is clearer for learning
  //
  // HOW useState WORKS:
  // - useState(initialValue) returns [value, setter]
  // - value: Current state value
  // - setter: Function to update state (causes re-render)
  // - When setter is called, component re-renders with new value
  //
  // INITIALIZATION LOGIC:
  // - If event prop exists: We're in edit mode → pre-fill with event data
  // - If event prop is undefined: We're in create mode → start with empty strings
  // - Use optional chaining (event?.title) to safely access properties
  // - Use || '' as fallback (if event?.title is undefined, use empty string)
  //
  // DATE FIELD SPECIAL HANDLING:
  // - HTML datetime-local input expects format: "YYYY-MM-DDTHH:mm"
  // - But API/database uses ISO format: "2025-08-29T17:00:00.000Z"
  // - We need to convert between formats:
  //   - Display: ISO → datetime-local (slice to remove seconds/milliseconds)
  //   - Submit: datetime-local → Date object (new Date(value))
  //
  // Example:
  // const [title, setTitle] = useState(event?.title || '')
  // const [time, setTime] = useState(event?.time || '')
  // const [location, setLocation] = useState(event?.location || '')
  // const [date, setDate] = useState(
  //   event?.date
  //     ? new Date(event.date).toISOString().slice(0, 16) // "2025-08-29T17:00:00.000Z" → "2025-08-29T17:00"
  //     : ''
  // )
  // const [description, setDescription] = useState(event?.description || '')
  // const [isWeekendEvent, setIsWeekendEvent] = useState(event?.isWeekendEvent || false)

  // TODO: Add validation state
  //
  // WHY WE STORE ERRORS IN STATE:
  // - We want to show errors below each field
  // - Errors change as user fixes them
  // - State triggers re-render to show/hide error messages
  //
  // ERROR STATE STRUCTURE:
  // - Record<string, string> = object with string keys and string values
  // - Example: { title: "Title is required", date: "Date must be in the future" }
  // - Empty object {} = no errors
  //
  // This will store field-level validation errors
  // const [errors, setErrors] = useState<Record<string, string>>({})

  // TODO: Add loading state
  //
  // WHY WE NEED LOADING STATE:
  // 1. Prevent double-submission: Disable submit button while submitting
  // 2. Show feedback: Display "Saving..." text so user knows something is happening
  // 3. Better UX: User knows their click was registered
  //
  // HOW IT WORKS:
  // - Start as false (not submitting)
  // - Set to true when form submits
  // - Set back to false when done (success or error)
  // - Use in button: disabled={isSubmitting}
  //
  // This prevents double-submission and shows loading UI
  // const [isSubmitting, setIsSubmitting] = useState(false)

  /**
   * @brief Handles form submission
   *
   * Validates form data, calls the appropriate API endpoint (POST for create, PUT for edit),
   * and handles success/error states.
   *
   * @param e - React form event (preventDefault is called automatically)
   *
   * Implementation steps:
   * 1. Prevent default form submission
   * 2. Clear previous errors
   * 3. Build form data object
   * 4. Validate using eventSchema.safeParse()
   * 5. If validation fails, set errors and return
   * 6. Set isSubmitting to true
   * 7. Call API endpoint (POST /api/events or PUT /api/events/[id])
   * 8. If successful, call onSuccess callback
   * 9. If error, set error state and display message
   * 10. Set isSubmitting to false in finally block
   */
  const handleSubmit = async (e: React.FormEvent) => {
    // WHY preventDefault():
    // By default, form submission reloads the page.
    // preventDefault() stops that so we can handle submission with JavaScript.
    e.preventDefault();

    // TODO: Implement form submission
    //
    // THE SUBMISSION FLOW:
    // 1. Set loading state (disable button, show "Saving...")
    // 2. Clear previous errors (fresh start)
    // 3. Build form data object from state
    // 4. Validate data with Zod
    // 5. If validation fails → show errors → stop
    // 6. If validation passes → call API
    // 7. If API succeeds → call onSuccess callback
    // 8. If API fails → show error message
    // 9. Always reset loading state (finally block)
    //
    // Example implementation:
    // try {
    //   // Step 1: Set loading state
    //   setIsSubmitting(true)
    //
    //   // Step 2: Clear previous errors
    //   setErrors({})
    //
    //   // Step 3: Build form data object
    //   // Convert datetime-local string back to Date object for API
    //   const formData = {
    //     title,
    //     time,
    //     location,
    //     date: new Date(date), // "2025-08-29T17:00" → Date object
    //     description,
    //     isWeekendEvent,
    //   }
    //
    //   // Step 4: Validate using Zod schema
    //   // safeParse() doesn't throw - returns { success, data/error }
    //   const validation = eventSchema.safeParse(formData)
    //   if (!validation.success) {
    //     // Step 5: Set field-level errors
    //     // Convert Zod errors to our error state format
    //     const fieldErrors: Record<string, string> = {}
    //     validation.error.errors.forEach((err) => {
    //       // err.path is array like ["title"] or ["date"]
    //       // err.message is like "Title is required"
    //       if (err.path[0]) {
    //         fieldErrors[err.path[0].toString()] = err.message
    //       }
    //     })
    //     setErrors(fieldErrors)
    //     return // Stop here - don't call API
    //   }
    //
    //   // Step 6: Call API endpoint
    //   // Determine URL and method based on edit vs create mode
    //   const url = isEditMode ? `/api/events/${event.id}` : '/api/events'
    //   const method = isEditMode ? 'PUT' : 'POST'
    //
    //   const response = await fetch(url, {
    //     method,
    //     headers: { 'Content-Type': 'application/json' }, // Tell server we're sending JSON
    //     body: JSON.stringify(validation.data), // Convert object to JSON string
    //   })
    //
    //   // Step 7: Check if request succeeded
    //   // response.ok is true for 200-299 status codes
    //   if (!response.ok) {
    //     const errorData = await response.json()
    //     throw new Error(errorData.error || 'Failed to save event')
    //   }
    //
    //   // Step 8: Success!
    //   // Call the onSuccess callback (parent component handles refresh/close)
    //   onSuccess?.()
    // } catch (error) {
    //   // Step 9: Handle errors
    //   // Could show toast notification, set general error, etc.
    //   console.error('Error saving event:', error)
    //   setErrors({ _general: error instanceof Error ? error.message : 'An error occurred' })
    // } finally {
    //   // Step 10: Always reset loading state
    //   // finally block runs whether try succeeds or catch runs
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
          //
          // HOW CONTROLLED INPUTS WORK:
          // - value={title}: Input displays current state value
          // - onChange: When user types, update state
          // - State update → re-render → input shows new value
          //
          // THE PATTERN:
          // 1. User types "A" → onChange fires with "A"
          // 2. setTitle("A") updates state
          // 3. Component re-renders
          // 4. Input shows "A" (because value={title})
          // 5. User types "B" → onChange fires with "AB"
          // 6. setTitle("AB") updates state
          // 7. Component re-renders
          // 8. Input shows "AB"
          //
          // e.target.value is the current input value (string)
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
          aria-label="This is a weekend event"
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
