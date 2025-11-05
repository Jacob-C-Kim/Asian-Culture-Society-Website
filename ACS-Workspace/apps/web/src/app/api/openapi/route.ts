import { NextResponse } from "next/server";

export async function GET() {
  const spec = {
    openapi: "3.0.3",
    info: { title: "ACS Workspace API", version: "0.1.0" },
    servers: [{ url: "/api" }],
    paths: {
      "/committees": {
        get: { summary: "List committees", responses: { 200: { description: "OK" } } },
        post: { summary: "Create committee", requestBody: { required: true }, responses: { 201: { description: "Created" } } }
      },
      "/committees/{id}": {
        get: { summary: "Get committee" }, patch: { summary: "Update committee" }, delete: { summary: "Delete committee" }
      },
      "/events": { get: { summary: "List events" }, post: { summary: "Create event" } },
      "/events/{id}": { get: { summary: "Get event" }, patch: { summary: "Update event" }, delete: { summary: "Delete event" } },
      "/budgets/committees": { get: { summary: "List committee budgets" }, post: { summary: "Create committee budget" } },
      "/budgets/events": { get: { summary: "List event budgets" }, post: { summary: "Create event budget" } },
      "/line-items": { get: { summary: "List line items" }, post: { summary: "Create line item" } },
      "/line-items/{id}": { get: { summary: "Get line item" }, patch: { summary: "Update line item" }, delete: { summary: "Delete line item" } },
      "/requests": { get: { summary: "List requests" }, post: { summary: "Create request" } },
      "/requests/{id}": { get: { summary: "Get request" }, patch: { summary: "Update request" }, delete: { summary: "Delete request" } },
      "/requests/{id}/items": { post: { summary: "Add item to request" }, delete: { summary: "Remove item from request" } },
      "/requests/{id}/media": { post: { summary: "Add media task to request" } },
      "/requests/{id}/attachments": { post: { summary: "Add attachment" } }
    }
  } as const;

  return NextResponse.json(spec);
}
