import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ToDoToggleEditBtn } from ".";

const mockOnCancelClick = jest.fn();
const mockOnDeleteClick = jest.fn();
const mockOnEditClick = jest.fn();
const mockOnSubmitClick = jest.fn();

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
