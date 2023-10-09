import { fireEvent, render, screen } from "@testing-library/react";
import { ToDoInput } from ".";
import { createRef } from "react";
import userEvent from "@testing-library/user-event";
import { expect, vi, describe, it } from "vitest";

describe("<ToDoInput />", () => {
  let mockOnAddNewTodo: () => void;
  const inputRef = createRef<HTMLInputElement>();

  beforeEach(() => {
    mockOnAddNewTodo = vi.fn();
  });

  it("renders correctly component", () => {
    render(
      <ToDoInput
        newTodoRef={{ current: null }}
        onAddNewTodo={mockOnAddNewTodo}
      />
    );
    const input = screen.getByTestId("new-todo-input");
    const button = screen.getByTestId("new-todo-add-button");

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it("writes new todo on press button", () => {
    render(<ToDoInput newTodoRef={inputRef} onAddNewTodo={mockOnAddNewTodo} />);

    const input = screen.getByTestId("new-todo-input");
    const button = screen.getByTestId("new-todo-add-button");
    userEvent.type(input, "new todo");

    expect(input).toHaveValue("new todo");

    fireEvent.click(button);

    expect(mockOnAddNewTodo).toHaveBeenCalled();
  });

  it("writes new todo on press enter", () => {
    render(<ToDoInput newTodoRef={inputRef} onAddNewTodo={mockOnAddNewTodo} />);

    const input = screen.getByTestId("new-todo-input");

    fireEvent.keyUp(input, { key: "A" });

    expect(mockOnAddNewTodo).not.toHaveBeenCalled();
    expect(mockOnAddNewTodo).toHaveBeenCalledTimes(0);

    fireEvent.keyUp(input, { key: "Enter" });

    expect(mockOnAddNewTodo).toHaveBeenCalled();
    expect(mockOnAddNewTodo).toHaveBeenCalledTimes(1);
  });
});
