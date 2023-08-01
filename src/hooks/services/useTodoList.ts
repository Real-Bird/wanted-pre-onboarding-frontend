import { useToDoContext } from "../../contexts/toDoService";
import { useEffect, useRef, useState } from "react";
import { ResponseToDoType } from "../../instances/ToDoService";
import { useFetch } from "../useFetch";

function useTodoList() {
  const { createTodo, getTodos, updateTodo, deleteTodo } = useToDoContext();
  const newTodoRef = useRef<HTMLInputElement>(null);
  const editTodoRef = useRef<HTMLInputElement>(null);
  const [todoList, setTodoList] = useState<ResponseToDoType[]>([]);
  const { state, loading, onFetching } = useFetch(getTodos);
  const onAddNewTodo = async () => {
    const newToDo = newTodoRef.current?.value;
    if (!newToDo) return;
    const { newToDoData } = await createTodo(newToDo);
    newTodoRef.current.value = "";
    setTodoList([...todoList, newToDoData]);
  };

  const onEditTodoSubmit = async ({
    id,
    todo,
    isCompleted,
  }: Partial<ResponseToDoType>) => {
    const editTodo = editTodoRef.current ? editTodoRef.current.value : todo;
    const { updateTodo: updatedTodoData } = await updateTodo({
      id,
      todo: editTodo,
      isCompleted,
    });
    setTodoList((prevTodoList) =>
      prevTodoList.map((item) =>
        item.id === updatedTodoData.id ? updatedTodoData : item
      )
    );
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

  return {
    newTodoRef,
    editTodoRef,
    todoList,
    onAddNewTodo,
    onEditTodoSubmit,
    onDeleteTodo,
  };
}

export default useTodoList;
