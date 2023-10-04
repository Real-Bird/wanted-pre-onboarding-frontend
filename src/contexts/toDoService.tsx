import { ReactNode, createContext, useContext } from "react";
import { ResponseToDoType, ToDoService } from "../instances/ToDoService";

const toDoDefault: ResponseToDoType = {
  id: 0,
  todo: "",
  isCompleted: false,
  userId: 0,
};

const ToDoContext = createContext<
  Pick<ToDoService, "createTodo" | "getTodos" | "updateTodo" | "deleteTodo">
>({
  createTodo: async () => ({ ok: false, newToDoData: toDoDefault }),
  getTodos: async () => ({ ok: false, todos: [] }),
  updateTodo: async () => ({ ok: false, updateTodo: toDoDefault }),
  deleteTodo: async () => ({ ok: false, id: -1 }),
});
export const useToDoContext = () => useContext(ToDoContext);

const ToDoProvider = ({ children, toDoService }: ToDoProviderProps) => {
  const createTodo = toDoService.createTodo.bind(toDoService);
  const getTodos = toDoService.getTodos.bind(toDoService);
  const updateTodo = toDoService.updateTodo.bind(toDoService);
  const deleteTodo = toDoService.deleteTodo.bind(toDoService);
  return (
    <ToDoContext.Provider
      value={{ createTodo, getTodos, updateTodo, deleteTodo }}>
      {children}
    </ToDoContext.Provider>
  );
};

interface ToDoProviderProps {
  children: ReactNode;
  toDoService: ToDoService;
}

export default ToDoProvider;
