import { fireEvent, render, screen } from "@testing-library/react";
import { Input } from ".";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

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

  it("correctly called event on press enter", () => {
    const mockOnPressEnter: () => void = vi.fn();

    render(<Input testId="input-test" onPressEnter={mockOnPressEnter} />);

    const input = screen.getByTestId("input-test");

    fireEvent.keyUp(input, { key: "A" });

    expect(mockOnPressEnter).toHaveBeenCalledTimes(0);

    fireEvent.keyUp(input, { key: "Enter" });

    expect(mockOnPressEnter).toHaveBeenCalled();
    expect(mockOnPressEnter).toHaveBeenCalledTimes(1);
  });
});
