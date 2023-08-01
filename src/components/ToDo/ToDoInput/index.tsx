import { MouseEventHandler, RefObject } from "react";
import { Button, Input } from "../../common";

export const ToDoInput = ({ newTodoRef, onAddNewTodo }: ToDoInputProps) => {
  return (
    <div className="flex w-full justify-center items-end space-x-3">
      <Input
        ref={newTodoRef}
        label="What's New To Do?"
        type="text"
        testId="new-todo-input"
      />
      <Button
        label="추가"
        testId="new-todo-add-button"
        onClick={onAddNewTodo}
      />
    </div>
  );
};

interface ToDoInputProps {
  newTodoRef: RefObject<HTMLInputElement>;
  onAddNewTodo: MouseEventHandler<HTMLButtonElement>;
}
