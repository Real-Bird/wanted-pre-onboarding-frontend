import { useEffect, useRef, useState } from "react";
import {
  ResponseToDoType,
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from "../api/todo";
import { useFetch } from "../hooks/useFetch";
import { Button, Input, Layout } from "../components/common";
import { MemoToDoCard } from "../components/ToDo";

const ToDoList = () => {
  const newTodoRef = useRef<HTMLInputElement>(null);
  const editTodoRef = useRef<HTMLInputElement>(null);
  const [todoList, setTodoList] = useState<ResponseToDoType[]>([]);
  const { state, loading, onFetching } = useFetch(() => getTodos());
  const onAddNewTodo = async () => {
    const newToDo = newTodoRef.current?.value;
    if (!newToDo) return;
    await createTodo(newToDo);
    newTodoRef.current.value = "";
    onFetching();
  };

  const onEditTodoSubmit = async ({
    id,
    todo,
    isCompleted,
  }: Partial<ResponseToDoType>) => {
    const editTodo = editTodoRef.current ? editTodoRef.current.value : todo;
    await updateTodo({ id, todo: editTodo, isCompleted });
    onFetching();
  };

  const onDeleteTodo = async (id: number) => {
    await deleteTodo(id);
    onFetching();
  };

  useEffect(() => {
    if (state?.ok) {
      setTodoList(state.todos);
    }
  }, [loading, state]);

  return (
    <Layout title="TO DO LIST" isLogged={true}>
      <article className="flex w-full justify-center items-end space-x-3">
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
      </article>
      <ul className="w-full h-fit max-h-[75%] mt-14 space-y-5 overflow-y-scroll py-4 px-2">
        {todoList?.map((todo) => (
          <MemoToDoCard
            key={todo.id}
            editTodoRef={editTodoRef}
            onEditTodoSubmit={onEditTodoSubmit}
            onToggleCompleted={onEditTodoSubmit}
            onDeleteTodo={onDeleteTodo}
            todo={todo}
          />
        ))}
      </ul>
    </Layout>
  );
};

export default ToDoList;
