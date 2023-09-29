import { render, screen } from "@testing-library/react";
import { Layout } from ".";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";

describe("<Layout />", () => {
  it("renders component correctly", () => {
    render(
      <HelmetProvider>
        <Layout title="Test Layout">
          <div>Test Children</div>
        </Layout>
      </HelmetProvider>
    );
    const layout = screen.getByText("Test Layout");
    const children = screen.getByText("Test Layout");

    expect(layout).toBeInTheDocument();
    expect(children).toBeInTheDocument();
  });

  it("renders component on logged in", () => {
    render(
      <MemoryRouter>
        <HelmetProvider>
          <Layout title="Test Layout" isLogged={true}>
            <div>Test Children</div>
          </Layout>
        </HelmetProvider>
      </MemoryRouter>
    );
    const signOutBtn = screen.getByText("Sign Out");

    expect(signOutBtn).toBeInTheDocument();
  });
});
