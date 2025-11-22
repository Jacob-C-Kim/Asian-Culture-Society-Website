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
// TODO: Uncomment after running `npx prisma generate`
// import { PrismaClient } from "@prisma/client";

// const globalForPrisma = globalThis as unknown as {
//   prisma: PrismaClient | undefined;
// };

// export const prisma =
//   globalForPrisma.prisma ??
//   new PrismaClient({
//     log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
//   });

// if (process.env.NODE_ENV !== "production") {
//   globalForPrisma.prisma = prisma;
// }

// Placeholder export - remove when uncommenting above
// Using a type that matches what PrismaClient would be, but as null until generated
type PrismaClientType = {
  event: {
    findMany: () => Promise<unknown[]>;
    findUnique: () => Promise<unknown | null>;
    create: () => Promise<unknown>;
    update: () => Promise<unknown>;
    delete: () => Promise<unknown>;
  };
  $disconnect: () => Promise<void>;
};

export const prisma: PrismaClientType | null = null;
