import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ToDoInput } from ".";
import { createRef } from "react";
import userEvent from "@testing-library/user-event";

describe("<ToDoInput />", () => {
  const mockOnAddNewTodo = jest.fn();
  const inputRef = createRef<HTMLInputElement>();

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

  it("writes new todo", () => {
    render(
      <ToDoInput
        newTodoRef={inputRef}
        onAddNewTodo={() => mockOnAddNewTodo({ todo: inputRef.current?.value })}
      />
    );

    const input = screen.getByTestId("new-todo-input");
    const button = screen.getByTestId("new-todo-add-button");
    userEvent.type(input, "new todo");

    fireEvent.click(button);

    expect(mockOnAddNewTodo).toHaveBeenCalled();
    expect(mockOnAddNewTodo).toHaveBeenCalledWith({ todo: "new todo" });
  });
});
