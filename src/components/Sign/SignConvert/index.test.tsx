import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SignConvert from ".";
import { MemoryRouter } from "react-router-dom";

describe("<SignConvert />", () => {
  it("renders component correctly when isSignIn is true", () => {
    render(
      <MemoryRouter>
        <SignConvert upOrIn="signin" isSignIn={true} />
      </MemoryRouter>
    );

    const signin = screen.getByText("Go To Sign Up");
    const linkElement = screen.getByRole("link");

    expect(signin).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "/signin");
    expect(linkElement).toContainElement(signin);
  });

  it("renders component correctly when isSignIn is false", () => {
    render(
      <MemoryRouter>
        <SignConvert upOrIn="signup" isSignIn={false} />
      </MemoryRouter>
    );

    const signup = screen.getByText("Go To Sign In");

    expect(signup).toBeInTheDocument();
  });
});
