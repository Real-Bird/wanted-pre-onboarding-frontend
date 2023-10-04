import { Layout } from "../components/common";
import { MemoToDoCard, ToDoInput } from "../components/ToDo";
import useTodoList from "../hooks/services/useTodoList";

const ToDoList = () => {
  const {
    newTodoRef,
    editTodoRef,
    onAddNewTodo,
    onDeleteTodo,
    onEditTodoSubmit,
    todoList,
    onToggleCompleted,
  } = useTodoList();
  return (
    <Layout title="TO DO LIST" isLogged={true}>
      <ToDoInput newTodoRef={newTodoRef} onAddNewTodo={onAddNewTodo} />
      <ul className="w-full h-fit max-h-[75%] mt-14 space-y-5 overflow-y-scroll py-4 px-2">
        {todoList?.map((todo) => (
          <MemoToDoCard
            key={todo.id}
            editTodoRef={editTodoRef}
            onEditTodoSubmit={onEditTodoSubmit}
            onToggleCompleted={onToggleCompleted}
            onDeleteTodo={onDeleteTodo}
            todo={todo}
          />
        ))}
      </ul>
    </Layout>
  );
};

export default ToDoList;
