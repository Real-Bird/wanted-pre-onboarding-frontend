import { RefObject, useState, memo, useEffect } from "react";
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

  const onSubmitClick = () => {
    onEditTodoSubmit(todo.id);
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

  useEffect(() => {
    if (toggleEdit && editTodoRef.current) {
      editTodoRef.current.focus();
      editTodoRef.current.value = todo.todo;
    }
  }, [toggleEdit]);

  return (
    <li className="flex justify-between items-center w-full space-x-6 bg-white px-3 py-5 rounded-md shadow-md">
      <Input
        type="checkbox"
        defaultChecked={todo.isCompleted}
        onChange={() => onToggleCompleted(todo.id)}
        className="h-6 w-6 cursor-pointer"
      />
      <div className="bg-stone-300 flex-1 text-center p-1">
        {toggleEdit ? (
          <Input type="text" ref={editTodoRef} onPressEnter={onSubmitClick} />
        ) : (
          <p
            className={cls(
              todo.isCompleted ? "line-through text-gray-400" : "",
              "text-yellow-900 font-medium text-lg"
            )}>
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
  onToggleCompleted: (id: ResponseToDoType["id"]) => void;
  onEditTodoSubmit: (id: number) => void;
  onDeleteTodo: (id: number) => void;
  editTodoRef: RefObject<HTMLInputElement>;
  todo: ResponseToDoType;
}

export const MemoToDoCard = memo(ToDoCard);

export default ToDoCard;
