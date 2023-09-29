import { render, fireEvent, screen } from "@testing-library/react";

import ToDoCard from ".";
import { createRef } from "react";
import userEvent from "@testing-library/user-event";
import { expect, vi, describe, it } from "vitest";

const mockTodo = {
  userId: 1,
  id: 1,
  todo: "Test Todo",
  isCompleted: false,
};

const mockOnToggleCompleted: (body: unknown) => void = vi.fn();
const mockOnEditTodoSubmit: (body: unknown) => void = vi.fn();
const mockOnDeleteTodo = vi.fn();

describe("<ToDoCard />", () => {
  it("renders correctly", () => {
    render(
      <ToDoCard
        onToggleCompleted={mockOnToggleCompleted}
        onEditTodoSubmit={mockOnEditTodoSubmit}
        onDeleteTodo={mockOnDeleteTodo}
        editTodoRef={{ current: null }}
        todo={mockTodo}
      />
    );

    expect(screen.getByText(mockTodo.todo)).toBeInTheDocument();
  });

  it("calls the correct function when the 수정 button and 취소 button is clicked", () => {
    render(
      <ToDoCard
        onToggleCompleted={mockOnToggleCompleted}
        onEditTodoSubmit={mockOnEditTodoSubmit}
        onDeleteTodo={mockOnDeleteTodo}
        editTodoRef={{ current: null }}
        todo={mockTodo}
      />
    );

    fireEvent.click(screen.getByText("수정"));
    expect(screen.getByRole("textbox")).toBeInTheDocument();

    fireEvent.click(screen.getByText("취소"));
    expect(screen.getByText(mockTodo.todo)).toBeInTheDocument();
  });

  it("writes the correct input after the 수정 button is clicked", () => {
    const editRef = createRef<HTMLInputElement>();
    render(
      <ToDoCard
        onToggleCompleted={mockOnToggleCompleted}
        onEditTodoSubmit={() =>
          mockOnEditTodoSubmit({
            ...mockTodo,
            todo: editRef.current?.value,
          })
        }
        onDeleteTodo={mockOnDeleteTodo}
        editTodoRef={editRef}
        todo={mockTodo}
      />
    );

    fireEvent.click(screen.getByText("수정"));

    const submitBtn = screen.getByText("제출");
    const editInput = screen.getByRole("textbox");

    userEvent.clear(editInput);
    userEvent.type(editInput, "test edit todo");

    fireEvent.click(submitBtn);

    expect(mockOnEditTodoSubmit).toHaveBeenCalled();
    expect(mockOnEditTodoSubmit).toHaveBeenCalledWith({
      ...mockTodo,
      todo: "test edit todo",
    });
  });

  it("calls the correct function when the check is toggled", () => {
    render(
      <ToDoCard
        onToggleCompleted={() =>
          mockOnToggleCompleted({
            ...mockTodo,
            isCompleted: !mockTodo.isCompleted,
          })
        }
        onEditTodoSubmit={mockOnEditTodoSubmit}
        onDeleteTodo={mockOnDeleteTodo}
        editTodoRef={{ current: null }}
        todo={mockTodo}
      />
    );

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    expect(mockOnToggleCompleted).toHaveBeenCalled();
    expect(mockOnToggleCompleted).toHaveBeenCalledWith({
      ...mockTodo,
      isCompleted: true,
    });
  });

  it("calls the correct function when the 삭제 button is clicked", () => {
    window.confirm = vi.fn(() => true);
    render(
      <ToDoCard
        onToggleCompleted={mockOnToggleCompleted}
        onEditTodoSubmit={mockOnEditTodoSubmit}
        onDeleteTodo={mockOnDeleteTodo}
        editTodoRef={{ current: null }}
        todo={mockTodo}
      />
    );

    fireEvent.click(screen.getByText("삭제"));

    expect(window.confirm).toHaveBeenCalledWith("정말 삭제하겠습니까?");
    expect(mockOnDeleteTodo).toHaveBeenCalledWith(mockTodo.id);
  });
});
