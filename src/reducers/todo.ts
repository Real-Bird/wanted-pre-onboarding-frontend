import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ResponseToDoType } from "../instances";
import { todoService } from "../Router";

const initialState: TodoSliceState = {
  todoList: {
    ok: false,
    todos: [],
  },
  isLoading: false,
};

export const fetchTodoList = createAsyncThunk(
  "todo/fetchTodoList",
  async () => {
    const response = await todoService.getTodos();
    return response;
  }
);

export const fetchCreateTodo = createAsyncThunk(
  "todo/fetchCreateTodo",
  async (todo: string) => {
    const response = await todoService.createTodo(todo);
    return response;
  }
);

export const fetchUpdateTodo = createAsyncThunk(
  "todo/fetchUpdateTodo",
  async (body: Pick<ResponseToDoType, "id" | "todo" | "isCompleted">) => {
    const response = await todoService.updateTodo(body);
    return response;
  }
);

export const fetchDeleteTodo = createAsyncThunk(
  "todo/fetchDeleteTodo",
  async (id: number) => {
    const response = await todoService.deleteTodo(id);
    return response;
  }
);

enum AsyncThunkTypes {
  pending = "pending",
  fulfilled = "fulfilled",
  rejected = "rejected",
}

export const todoReducer = createSlice({
  name: "todo",
  initialState,
  reducers: {
    initialize: (
      state,
      action: PayloadAction<keyof TodoSliceState | "all">
    ) => {
      if (action.payload === "all") {
        state = initialState;
        return state;
      }
      const newState = {
        ...state,
        [action.payload]: initialState[action.payload],
      };
      return newState;
    },
  },
  extraReducers: (builder) => {
    // get todo list
    builder.addCase(fetchTodoList.fulfilled, (state, action) => {
      state.todoList = action.payload;
    });
    // create todo
    builder.addCase(fetchCreateTodo.fulfilled, (state, action) => {
      state.todoList.todos = [
        ...state.todoList.todos,
        action.payload.newToDoData,
      ];
    });
    // update todo
    builder.addCase(fetchUpdateTodo.fulfilled, (state, action) => {
      state.todoList.todos = state.todoList.todos.map((todo) =>
        todo.id === action.payload.updateTodo.id
          ? action.payload.updateTodo
          : todo
      );
    });
    // delete todo
    builder.addCase(fetchDeleteTodo.fulfilled, (state, action) => {
      state.todoList.todos = state.todoList.todos.filter(
        (todo) => todo.id !== action.payload.id
      );
    });

    builder
      .addMatcher(
        (action: PayloadAction) =>
          action.type.endsWith(AsyncThunkTypes.pending),
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        (action: PayloadAction) =>
          action.type.endsWith(
            AsyncThunkTypes.fulfilled || AsyncThunkTypes.rejected
          ),
        (state) => {
          state.isLoading = false;
        }
      );
  },
});

export const { initialize } = todoReducer.actions;

export const selectTodoState = (state: RootState) => state.todo;

export default todoReducer.reducer;

type TodoSliceState = {
  todoList: FetchTodoResponse;
  isLoading: boolean;
};

type FetchTodoResponse = {
  ok: boolean;
  todos: ResponseToDoType[];
};
