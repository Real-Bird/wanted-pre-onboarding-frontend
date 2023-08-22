import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Footer } from ".";

describe("<Footer />", () => {
  it("renders component correctly", () => {
    render(<Footer />);
    const footer = screen.getByText(
      "© Real-Bird, Wanted Pre-Onboarding Front-End"
    );
    expect(footer).toBeInTheDocument();
  });
});
