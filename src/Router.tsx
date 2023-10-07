import { createBrowserRouter } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ToDoList from "./pages/ToDoList";
import { TokenValidate } from "./components/TokenValidate";
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

const router = createBrowserRouter([
  {
    path: "",
    element: <TokenValidate tokenStorage={tokenStorage} />,
    children: [
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "signin",
        element: <Signin />,
      },
      {
        path: "todo",
        element: <ToDoList />,
      },
    ],
  },
]);

export default router;
