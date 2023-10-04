import { createBrowserRouter } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ToDoList from "./pages/ToDoList";
import { HttpClient } from "./instances/HttpClient";
import { TokenStorage } from "./instances/TokenStorage";
import { LocalStorage } from "./instances/LocalStorage";
import { ToDoService } from "./instances/ToDoService";
import ToDoProvider from "./contexts/toDoService";
import { TokenValidate } from "./components/TokenValidate";

const localStorage = new LocalStorage();
const tokenStorage = new TokenStorage(localStorage);
const httpClient = new HttpClient(tokenStorage);
const toDoService = new ToDoService(httpClient);

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
        element: (
          <ToDoProvider toDoService={toDoService}>
            <ToDoList />
          </ToDoProvider>
        ),
      },
    ],
  },
]);

export default router;
