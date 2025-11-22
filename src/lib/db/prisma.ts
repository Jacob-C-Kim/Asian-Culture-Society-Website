/**
 * Prisma Client singleton for database access
 *
 * This pattern prevents multiple Prisma Client instances in development
 * (which can cause connection pool exhaustion).
 *
 * Usage in your shadow's service files:
 * ```typescript
 * import { prisma } from '@/lib/db/prisma'
 *
 * const events = await prisma.event.findMany()
 * ```
 */
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
