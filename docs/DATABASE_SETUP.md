# Database Setup Guide for Events

## Overview

This guide walks you through setting up PostgreSQL for ACS events and migrating from the static data file.

## Prerequisites

- Docker installed (for local PostgreSQL)
- Node.js 20+
- Basic understanding of SQL/Prisma

## Step 1: Start PostgreSQL Database

```bash
# Start PostgreSQL container
docker-compose -f docker/docker-compose.dev.yml up postgres -d

# Verify it's running
docker ps | grep postgres
```

## Step 2: Set Up Environment Variables

Add to `.env.local`:

```env
DATABASE_URL="postgresql://acs_user:acs_password@localhost:5432/acs_events?schema=public"
```

## Step 3: Run Database Migrations

```bash
# Create and apply migration
npx prisma migrate dev --name init

# Generate Prisma Client
npx prisma generate
```

## Step 4: Implement Event Service

1. Copy `src/lib/services/eventService.example.ts` to `eventService.ts`
2. Implement each function following the examples
3. Test each function as you go

## Step 5: Create API Routes

1. Copy `src/app/api/events/route.example.ts` to `route.ts`
2. Implement GET and POST handlers
3. Create `[id]/route.ts` for individual event operations
4. Test with Postman or curl

## Step 6: Migrate Existing Events

1. Implement `prisma/seed.ts` to read from `src/lib/data/events.ts`
2. Run: `npx prisma db seed`
3. Verify events in database: `npx prisma studio`

## Step 7: Update Components

1. Move `EventDetailsCard` to `src/components/common/`
2. Update to fetch from API instead of static data
3. Add loading states and error handling

## Step 8: Implement Admin UI

1. Copy `src/app/admin/events/page.example.tsx` to `page.tsx`
2. Copy `src/components/common/EventForm.example.tsx` to `EventForm.tsx`
3. Implement form state, validation, and API integration
4. Add event list/table display
5. Add create/edit/delete functionality

## Step 9: Testing

- Test API endpoints
- Test component integration
- Test error cases

## Helpful Commands

```bash
# View database in browser
npx prisma studio

# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# Check database connection
npx prisma db pull

# Create a new migration after schema changes
npx prisma migrate dev --name migration_name

# Generate Prisma Client after schema changes
npx prisma generate
```

## Common Issues

**Connection refused**: Make sure PostgreSQL container is running
**Migration errors**: Check DATABASE_URL is correct
**Type errors**: Run `npx prisma generate` after schema changes
**Port already in use**: Stop other PostgreSQL instances or change port in docker-compose

## API Implementation Checklist

- [ ] Copy `eventService.example.ts` to `eventService.ts` and implement all functions
- [ ] Copy `route.example.ts` files to actual route files
- [ ] Implement GET /api/events (list all events)
- [ ] Implement POST /api/events (create event)
- [ ] Implement GET /api/events/[id] (get single event)
- [ ] Implement PUT /api/events/[id] (update event)
- [ ] Implement DELETE /api/events/[id] (delete event)
- [ ] Add validation using Zod schemas
- [ ] Add error handling
- [ ] Test all endpoints

## Component Implementation Checklist

- [ ] Copy `EventForm.example.tsx` to `EventForm.tsx`
- [ ] Add form state management (useState or react-hook-form)
- [ ] Implement form validation
- [ ] Connect form submission to API
- [ ] Add loading states
- [ ] Add error display
- [ ] Add success feedback
- [ ] Copy `page.example.tsx` to `page.tsx`
- [ ] Implement event fetching
- [ ] Implement event list display
- [ ] Add create/edit/delete functionality
- [ ] Test full CRUD workflow

## Database Schema

The Event model has the following fields:

- `id`: Auto-incrementing integer (primary key)
- `title`: String (required)
- `time`: String (required, e.g., "5:00 PM - 7:00 PM")
- `location`: String (required)
- `date`: DateTime (required, used for calendar integration)
- `description`: Text (required)
- `isWeekendEvent`: Boolean (default: false)

The `date` field is indexed for faster queries when filtering by date.
