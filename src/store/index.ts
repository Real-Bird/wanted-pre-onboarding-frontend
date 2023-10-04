import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../reducers/auth";
import todoReducer from "../reducers/todo";

const store = configureStore({
  reducer: {
    auth: authReducer,
    todo: todoReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
