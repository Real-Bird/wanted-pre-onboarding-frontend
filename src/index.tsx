import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./Router";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import store from "./store";
import {
  AuthService,
  HttpClient,
  LocalStorage,
  ToDoService,
  TokenStorage,
} from "./instances";

export const localStorage = new LocalStorage();
export const tokenStorage = new TokenStorage(localStorage);
export const httpClient = new HttpClient(tokenStorage);
export const authService = new AuthService(httpClient, tokenStorage);
export const todoService = new ToDoService(httpClient);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);
