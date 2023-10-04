import { useCallback, useEffect, useRef } from "react";
import { ResponseToDoType } from "../../instances/ToDoService";
import { useAppDispatch, useAppSelector } from "../rtkHooks";
import {
  fetchCreateTodo,
  fetchDeleteTodo,
  fetchTodoList,
  fetchUpdateTodo,
  selectTodoState,
} from "../../reducers/todo";

function useTodoList() {
  const newTodoRef = useRef<HTMLInputElement>(null);
  const editTodoRef = useRef<HTMLInputElement>(null);
  const {
    todoList: { todos: todoList },
    isLoading: loading,
  } = useAppSelector(selectTodoState);
  const dispatch = useAppDispatch();

  const onAddNewTodo = useCallback(async () => {
    console.log(newTodoRef.current?.value);
    const newToDo = newTodoRef.current?.value;
    if (!newToDo) return;
    dispatch(fetchCreateTodo(newToDo));
    newTodoRef.current.value = "";
  }, []);

  const onEditTodoSubmit = async ({
    id,
  }: Pick<ResponseToDoType, "id" | "isCompleted">) => {
    const currentTodo = todoList.find((todo) => todo.id === id);
    if (!currentTodo) {
      return;
    }
    const editTodo = editTodoRef.current?.value;
    if (editTodo === currentTodo.todo) {
      return;
    }
    dispatch(
      fetchUpdateTodo({
        ...currentTodo,
        todo: editTodo ? editTodo : currentTodo.todo,
      })
    );
  };

  const onToggleCompleted = async (id: ResponseToDoType["id"]) => {
    const currentTodo = todoList.find((todo) => todo.id === id);
    if (!currentTodo) {
      return;
    }
    dispatch(
      fetchUpdateTodo({
        ...currentTodo,
        isCompleted: !currentTodo.isCompleted,
      })
    );
  };

  const onDeleteTodo = async (id: number) => {
    dispatch(fetchDeleteTodo(id));
  };

  useEffect(() => {
    dispatch(fetchTodoList());
  }, [dispatch]);

  return {
    newTodoRef,
    editTodoRef,
    todoList,
    loading,
    onAddNewTodo,
    onEditTodoSubmit,
    onDeleteTodo,
    onToggleCompleted,
  };
}

export default useTodoList;
