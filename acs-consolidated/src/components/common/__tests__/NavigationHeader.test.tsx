import { render, screen, fireEvent } from "@testing-library/react";
import { NavigationHeader } from "../NavigationHeader";

describe("NavigationHeader", () => {
  it("renders navigation links", () => {
    render(<NavigationHeader currentPage="home" />);

    expect(screen.getByText("About Us")).toBeInTheDocument();
    expect(screen.getByText("Calendar")).toBeInTheDocument();
    expect(screen.getByText("Mentor/Mentee")).toBeInTheDocument();
    expect(screen.getByText("Tinikling")).toBeInTheDocument();
  });

  it("highlights current page", () => {
    render(<NavigationHeader currentPage="about-us" />);

    const aboutLink = screen.getByText("About Us");
    expect(aboutLink).toHaveClass("text-blue-600");
  });

  it("calls onNavigate when link is clicked", () => {
    const mockNavigate = jest.fn();
    render(<NavigationHeader currentPage="home" onNavigate={mockNavigate} />);

    const calendarLink = screen.getByText("Calendar");
    fireEvent.click(calendarLink);

    expect(mockNavigate).toHaveBeenCalledWith("calendar");
  });

  it("renders logo", () => {
    const { container } = render(<NavigationHeader currentPage="home" />);

    const logos = container.querySelectorAll('[data-name="ACS Logo"]');
    expect(logos.length).toBeGreaterThan(0);
  });
});
