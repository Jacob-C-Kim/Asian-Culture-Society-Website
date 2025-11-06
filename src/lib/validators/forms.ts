import { z } from "zod";

// Common field validators
const emailSchema = z.string().email("Invalid email address").max(254);
const nameSchema = z.string().min(1, "Name is required").max(100);
const phoneSchema = z
  .string()
  .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number")
  .optional();

// Mentor application schema
export const mentorApplicationSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  major: z.string().min(1, "Major is required").max(100),
  year: z.enum(["freshman", "sophomore", "junior", "senior", "graduate"]),
  experience: z.string().max(500).optional(),
  availability: z.string().max(200).optional(),
});

export type MentorApplication = z.infer<typeof mentorApplicationSchema>;

// Mentee application schema
export const menteeApplicationSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  major: z.string().min(1, "Major is required").max(100),
  year: z.enum(["freshman", "sophomore", "junior", "senior"]),
  interests: z.string().max(500).optional(),
  goals: z.string().max(500).optional(),
});

export type MenteeApplication = z.infer<typeof menteeApplicationSchema>;

// Tinikling registration schema
export const tiniklingRegistrationSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  experience: z.enum(["beginner", "intermediate", "advanced"]).default("beginner"),
  attendance: z.string().max(200).optional(),
});

export type TiniklingRegistration = z.infer<typeof tiniklingRegistrationSchema>;
