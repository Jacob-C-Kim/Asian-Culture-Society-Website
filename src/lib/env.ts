/**
 * Environment variable validation and type-safe access
 * This ensures all required environment variables are present at build time
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
  NODE_ENV: process.env.NODE_ENV || 'development',

  // Application URLs
  APP_URL: getEnvVar('NEXT_PUBLIC_APP_URL', 'http://localhost:3000'),

  // Security
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,

  // Rate limiting
  RATE_LIMIT_MAX: parseInt(getEnvVar('RATE_LIMIT_MAX_REQUESTS', '10'), 10),
  RATE_LIMIT_WINDOW: parseInt(getEnvVar('RATE_LIMIT_WINDOW_MS', '60000'), 10),

  // CORS
  ALLOWED_ORIGINS: getEnvVar(
    'ALLOWED_ORIGINS',
    'https://campusgroups.rit.edu,https://rit.edu'
  ).split(','),
} as const;

// Validate critical environment variables in production
if (env.NODE_ENV === 'production') {
  if (!env.NEXTAUTH_SECRET) {
    console.warn('WARNING: NEXTAUTH_SECRET is not set. This is insecure for production!');
  }
}
