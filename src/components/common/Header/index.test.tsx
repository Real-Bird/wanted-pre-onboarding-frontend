import { render, screen, fireEvent } from "@testing-library/react";
import { Header } from ".";
import { MemoryRouter } from "react-router-dom";

describe("<Header />", () => {
  it("renders title correctly", () => {
    const title = "Test Title";
    render(<Header title={title} />);
    const titleElement = screen.getByText(title);
    expect(titleElement).toBeInTheDocument();
  });

  it("renders 'Sign Out' button when isLogged is true", () => {
    render(
      <MemoryRouter>
        <Header title="Test Title" isLogged={true} />
      </MemoryRouter>
    );
    const signOutButton = screen.getByText("Sign Out");
    expect(signOutButton).toBeInTheDocument();
  });

  it("does not render 'Sign Out' button when isLogged is false", () => {
    render(<Header title="Test Title" isLogged={false} />);
    const signOutButton = screen.queryByText("Sign Out");
    expect(signOutButton).not.toBeInTheDocument();
  });

  it("calls onClick when 'Sign Out' button is clicked", () => {
    localStorage.setItem("wtd-token", "test");

    render(
      <MemoryRouter>
        <Header title="Test Title" isLogged={true} />
      </MemoryRouter>
    );

    const signOutButton = screen.getByText("Sign Out");
    fireEvent.click(signOutButton);

    const removeKey = localStorage.getItem("wtd-token");

    expect(removeKey).toBeNull();
  });
});
