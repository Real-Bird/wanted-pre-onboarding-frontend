import { RefObject, useState, memo, useEffect, ChangeEvent } from "react";
import { cls } from "../../../lib/util";
import { Input } from "../../common";
import { ToDoToggleEditBtn } from "../ToDoToggleEditBtn";
import { ResponseToDoType } from "../../../instances/ToDoService";

const ToDoCard = ({
  editTodoRef,
  onEditTodoSubmit,
  onToggleCompleted,
  todo,
  onDeleteTodo,
}: ToDoCardProps) => {
  const [toggleEdit, setToggleEdit] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleEditTodo = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
  };

  const onSubmitClick = () => {
    onEditTodoSubmit({ ...todo });
    setToggleEdit(false);
  };

  const onToggleEditMode = () => setToggleEdit((prev) => !prev);

  const onDeleteClick = () => setConfirmDelete(true);

  useEffect(() => {
    if (confirmDelete) {
      if (window.confirm("정말 삭제하겠습니까?")) {
        onDeleteTodo(todo.id);
      }
    }
  }, [confirmDelete]);

  return (
    <li className="flex justify-between items-center w-full space-x-6 bg-white px-3 py-5 rounded-md shadow-md">
      <Input
        type="checkbox"
        defaultChecked={todo.isCompleted}
        onChange={(e) =>
          onToggleCompleted({ ...todo, isCompleted: e.currentTarget.checked })
        }
        className="h-6 w-6 cursor-pointer"
      />
      <div className="bg-stone-300 flex-1 text-center p-1">
        {toggleEdit ? (
          <Input
            type="text"
            ref={editTodoRef}
            defaultValue={todo.todo}
            onChange={handleEditTodo}
          />
        ) : (
          <p
            className={cls(
              todo.isCompleted ? "line-through text-gray-400" : "",
              "text-yellow-900 font-medium text-lg"
            )}
          >
            {todo.todo}
          </p>
        )}
      </div>
      <ToDoToggleEditBtn
        isEdit={toggleEdit}
        onSubmitClick={onSubmitClick}
        onCancelClick={onToggleEditMode}
        onEditClick={onToggleEditMode}
        onDeleteClick={onDeleteClick}
      />
    </li>
  );
};

interface ToDoCardProps {
  onToggleCompleted: (body: ResponseToDoType) => void;
  onEditTodoSubmit: (body: ResponseToDoType) => void;
  onDeleteTodo: (id: number) => void;
  editTodoRef: RefObject<HTMLInputElement>;
  todo: ResponseToDoType;
}

export const MemoToDoCard = memo(ToDoCard);
