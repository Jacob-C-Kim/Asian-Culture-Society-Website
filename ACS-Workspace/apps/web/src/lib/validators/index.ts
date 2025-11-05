import { z } from "zod";

export const CommitteeIn = z.object({ name: z.string().min(1) });
export const CommitteeOut = z.object({ id: z.string(), name: z.string() });

export const EventIn = z.object({
  name: z.string().min(1),
  date: z.coerce.date(), // accepts string/Date
  committeeId: z.string(),
  createdById: z.string().optional(),
});

export const LineItemIn = z.object({
  name: z.string().min(1),
  eventId: z.string(),
});

export const CommitteeBudgetIn = z.object({
  committeeId: z.string(),
  amount: z.coerce.number().nonnegative(),
});

export const EventBudgetIn = z.object({
  eventId: z.string(),
  amount: z.coerce.number().nonnegative(),
});

export const RequestIn = z.object({
  type: z.string().min(1),
  eventId: z.string(),
  committeeId: z.string(),
  status: z.enum(["DRAFT", "PENDING", "APPROVED", "REJECTED", "CANCELED"]).default("DRAFT"),
  createdById: z.string(),
  notes: z.string().optional(),
  itemIds: z.array(z.string()).optional(),
  media: z.array(z.object({ type: z.string(), status: z.string(), notes: z.string().optional() })).optional(),
});

export const AttachmentIn = z.object({
  requestId: z.string(),
  mediaType: z.string().optional(),
  fileUrl: z.string().url(),
  fileHash: z.string().min(8),
  uploaderId: z.string(),
});