/**
 * Health check endpoint for monitoring and Docker health checks
 */
import { NextResponse } from "next/server";

/**
 * @brief Health check endpoint handler
 * @return Promise<NextResponse> JSON response with health status
 */
export async function GET(): Promise<NextResponse> {
  return NextResponse.json(
    {
      status: "healthy",
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || "1.0.0",
    },
    {
      status: 200,
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    }
  );
}
