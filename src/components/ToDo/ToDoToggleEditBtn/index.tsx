import { Button } from "../../common";

export const ToDoToggleEditBtn = ({
  isEdit,
  onSubmitClick,
  onCancelClick,
  onEditClick,
  onDeleteClick,
}: ToDoEditBtnProps) => {
  return (
    <div className="flex items-center space-x-2">
      {isEdit ? (
        <>
          <Button label="제출" testId="submit-button" onClick={onSubmitClick} />
          <Button
            label="취소"
            testId="cancel-button"
            onClick={onCancelClick}
            className="bg-stone-400"
          />
        </>
      ) : (
        <>
          <Button label="수정" testId="modify-button" onClick={onEditClick} />
          <Button
            label="삭제"
            testId="delete-button"
            className="bg-stone-400"
            onClick={onDeleteClick}
          />
        </>
      )}
    </div>
  );
};

interface ToDoEditBtnProps {
  isEdit: boolean;
  onSubmitClick: () => void;
  onCancelClick: () => void;
  onEditClick: () => void;
  onDeleteClick: () => void;
}
