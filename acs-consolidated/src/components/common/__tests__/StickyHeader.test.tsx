import { render, screen } from "@testing-library/react";
import StickyHeader from "../StickyHeader";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    pathname: "/",
  }),
}));

describe("StickyHeader", () => {
  it("renders children correctly", () => {
    render(
      <StickyHeader currentPage="home">
        <div>Test Content</div>
      </StickyHeader>
    );

    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("applies sticky positioning classes", () => {
    const { container } = render(
      <StickyHeader currentPage="home">
        <div>Content</div>
      </StickyHeader>
    );

    const header = container.querySelector('[data-testid="sticky-header"]');
    expect(header).toHaveClass("sticky", "top-0");
  });

  it("handles different page states", () => {
    const { rerender } = render(
      <StickyHeader currentPage="home">
        <div>Content</div>
      </StickyHeader>
    );

    expect(screen.getByText("Content")).toBeInTheDocument();

    rerender(
      <StickyHeader currentPage="about-us">
        <div>Content</div>
      </StickyHeader>
    );

    expect(screen.getByText("Content")).toBeInTheDocument();
  });
});
