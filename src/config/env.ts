import { z } from "zod";

const envSchema = z.object({
  // Node environment
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),

  // Application URLs
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),

  // Rate Limiting
  RATE_LIMIT_MAX_REQUESTS: z.coerce.number().positive().default(10),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().positive().default(60000),

  // CORS
  ALLOWED_ORIGINS: z.string().default("https://campusgroups.rit.edu,https://rit.edu"),
});

export type Env = z.infer<typeof envSchema>;

// Validate and export environment variables
function validateEnv(): Env {
  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    console.error("❌ Invalid environment variables:", parsed.error.flatten().fieldErrors);
    throw new Error("Invalid environment variables");
  }

  return parsed.data;
}

export const env = validateEnv();

// Helper to check if in production
export const isProd = env.NODE_ENV === "production";
export const isDev = env.NODE_ENV === "development";
export const isTest = env.NODE_ENV === "test";
