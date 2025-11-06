import { POST } from "../route";
import { NextRequest } from "next/server";

describe("/api/submit/mentor", () => {
  it("returns 400 for missing required fields", async () => {
    const request = new NextRequest("http://localhost:3000/api/submit/mentor", {
      method: "POST",
      body: JSON.stringify({}),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBeDefined();
  });

  it("returns 400 for invalid email", async () => {
    const request = new NextRequest("http://localhost:3000/api/submit/mentor", {
      method: "POST",
      body: JSON.stringify({
        name: "Test User",
        email: "invalid-email",
        major: "Computer Science",
        year: "junior",
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toContain("email");
  });

  it("accepts valid mentor application", async () => {
    const request = new NextRequest("http://localhost:3000/api/submit/mentor", {
      method: "POST",
      body: JSON.stringify({
        name: "Jane Doe",
        email: "jane@example.com",
        major: "Computer Science",
        year: "senior",
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.message).toBe("Application submitted successfully");
  });
});
