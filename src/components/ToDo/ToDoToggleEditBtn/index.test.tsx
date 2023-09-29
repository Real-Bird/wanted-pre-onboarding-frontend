import { render, screen } from "@testing-library/react";

import { ToDoToggleEditBtn } from ".";
import { expect, vi, describe, it } from "vitest";

const mockOnCancelClick = vi.fn();
const mockOnDeleteClick = vi.fn();
const mockOnEditClick = vi.fn();
const mockOnSubmitClick = vi.fn();

describe("<ToDoToggleBtn />", () => {
  let isEdit = false;
  it("renders correctly", () => {
    render(
      <ToDoToggleEditBtn
        isEdit={isEdit}
        onCancelClick={mockOnCancelClick}
        onDeleteClick={mockOnDeleteClick}
        onEditClick={mockOnEditClick}
        onSubmitClick={mockOnSubmitClick}
      />
    );

    const editBtn = screen.getByText("수정");
    const delBtn = screen.getByText("삭제");
    const submitBtn = screen.queryByText("제출");
    const cancelBtn = screen.queryByText("취소");

    expect(editBtn).toBeInTheDocument();
    expect(delBtn).toBeInTheDocument();
    expect(submitBtn).not.toBeInTheDocument();
    expect(cancelBtn).not.toBeInTheDocument();
  });

  it("renders correctly when isEdit is toggled true", () => {
    isEdit = true;
    render(
      <ToDoToggleEditBtn
        isEdit={isEdit}
        onCancelClick={mockOnCancelClick}
        onDeleteClick={mockOnDeleteClick}
        onEditClick={mockOnEditClick}
        onSubmitClick={mockOnSubmitClick}
      />
    );

    const editBtn = screen.queryByText("수정");
    const delBtn = screen.queryByText("삭제");
    const submitBtn = screen.getByText("제출");
    const cancelBtn = screen.getByText("취소");

    expect(editBtn).not.toBeInTheDocument();
    expect(delBtn).not.toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();
    expect(cancelBtn).toBeInTheDocument();
  });
});
