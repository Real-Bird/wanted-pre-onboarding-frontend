import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Input } from ".";
import userEvent from "@testing-library/user-event";

describe("<Input />", () => {
  it("render component correctly", () => {
    render(<Input testId="input-test" />);
    const input = screen.getByTestId("input-test");

    expect(input).toBeInTheDocument();
  });

  it("render component correctly with label", () => {
    render(<Input testId="input-test" label="test input" />);
    const label = screen.getByText("test input");
    const input = screen.getByTestId("input-test");

    expect(label).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  });

  it("writes a value into the input field", () => {
    render(<Input testId="input-test" />);
    const input = screen.getByTestId("input-test");

    fireEvent.change(input, { target: { value: "New Value" } });

    expect(input).toHaveValue("New Value");
  });

  it("correctly updates input value using userEvent", () => {
    render(<Input testId="input-test" />);

    const input = screen.getByTestId("input-test");

    userEvent.type(input, "New Value");

    expect(input).toHaveValue("New Value");
  });
});
