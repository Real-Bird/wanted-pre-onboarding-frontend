import { render, screen } from "@testing-library/react";
import { Button } from ".";
import { MemoryRouter } from "react-router-dom";

describe("<Button />", () => {
  it("render component correctly without path", () => {
    render(<Button label="test btn" />);
    const buttonElement = screen.getByText("test btn");

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass("bg-red-500");
  });

  it("render component correctly with Link when path is provided", () => {
    render(
      <MemoryRouter>
        <Button label="test btn" path="/test" />
      </MemoryRouter>
    );
    const linkElement = screen.getByRole("link");

    expect(linkElement).toHaveAttribute("href", "/test");
    expect(linkElement).toContainElement(screen.getByText("test btn"));
  });

  it("renders as disabled when disabled prop is true", () => {
    render(<Button label="test btn" disabled={true} />);
    const buttonElement = screen.getByRole("button");

    expect(buttonElement).toBeDisabled();
    expect(buttonElement).toHaveClass("disabled:bg-neutral-400");
    expect(buttonElement).toHaveTextContent("test btn");
  });
});
