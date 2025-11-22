/**
 * Environment variable validation and type-safe access
 * This ensures all required environment variables are present at build time
 */

/**
 * @brief Gets an environment variable with optional default value
 * @param key - The environment variable key
 * @param defaultValue - Optional default value if key is not set
 * @return The environment variable value as a string
 * @throws Error if the variable is missing and no default is provided
 */
const getEnvVar = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue;

  if (!value && !defaultValue) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value as string;
};

export const env = {
  // Node environment
  NODE_ENV: process.env.NODE_ENV || "development",

  // Application URLs
  APP_URL: getEnvVar("NEXT_PUBLIC_APP_URL", "http://localhost:3000"),

  // Rate limiting
  RATE_LIMIT_MAX: parseInt(getEnvVar("RATE_LIMIT_MAX_REQUESTS", "10"), 10),
  RATE_LIMIT_WINDOW: parseInt(getEnvVar("RATE_LIMIT_WINDOW_MS", "60000"), 10),

  // CORS
  ALLOWED_ORIGINS: getEnvVar(
    "ALLOWED_ORIGINS",
    "https://campusgroups.rit.edu,https://rit.edu"
  ).split(","),

  // Database
  DATABASE_URL: getEnvVar(
    "DATABASE_URL",
    "postgresql://acs_user:acs_password@localhost:5432/acs_events?schema=public"
  ),
} as const;

// Validate critical environment variables in production
if (env.NODE_ENV === "production") {
  // Add production-specific validations here if needed
}
