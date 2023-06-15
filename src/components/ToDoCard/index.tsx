import { RefObject, useState, memo, useEffect } from "react";
import Input from "../Input";
import { cls } from "../../lib/util";
import Button from "../Button";
import { ResponseToDoType } from "../../api/todo";

interface ToDoCardProps {
  onToggleCompleted: (body: ResponseToDoType) => void;
  onEditTodoSubmit: (body: ResponseToDoType) => void;
  onDeleteTodo: (id: number) => void;
  editTodoRef: RefObject<HTMLInputElement>;
  todo: ResponseToDoType;
}

const ToDoCard = ({
  editTodoRef,
  onEditTodoSubmit,
  onToggleCompleted,
  todo,
  onDeleteTodo,
}: ToDoCardProps) => {
  const [toggleEdit, setToggleEdit] = useState(false);
  const [editTodo, setEditTodo] = useState(todo.todo);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    if (confirmDelete) {
      if (window.confirm("정말 삭제하겠습니까?")) {
        onDeleteTodo(todo.id);
      }
    }
  }, [confirmDelete]);

  return (
    <li className="flex justify-between items-center w-full space-x-6 bg-white px-3 py-5 rounded-md shadow-md">
      <input
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
            inputRef={editTodoRef}
            value={editTodo}
            onChange={(e) => setEditTodo(e.target.value)}
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
      <div className="flex items-center space-x-2">
        {toggleEdit ? (
          <>
            <Button
              label="제출"
              testId="submit-button"
              onClick={() => {
                onEditTodoSubmit({ ...todo });
                setToggleEdit(false);
              }}
            />
            <Button
              label="취소"
              testId="cancel-button"
              onClick={() => setToggleEdit((prev) => !prev)}
              className="bg-stone-400"
            />
          </>
        ) : (
          <>
            <Button
              label="수정"
              testId="modify-button"
              onClick={() => setToggleEdit((prev) => !prev)}
            />
            <Button
              label="삭제"
              testId="delete-button"
              className="bg-stone-400"
              onClick={() => setConfirmDelete(true)}
            />
          </>
        )}
      </div>
    </li>
  );
};

export default memo(ToDoCard);
