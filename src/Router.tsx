import { Navigate, createBrowserRouter, useLocation } from "react-router-dom";
import App from "./App";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ToDoList from "./pages/ToDoList";

const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      {
        path: "signup",
        element: (
          <AlreadyAuth>
            <Signup />
          </AlreadyAuth>
        ),
      },
      {
        path: "signin",
        element: (
          <AlreadyAuth>
            <Signin />
          </AlreadyAuth>
        ),
      },
      {
        path: "todo",
        element: (
          <RequireAuth>
            <ToDoList />
          </RequireAuth>
        ),
      },
    ],
  },
]);

export default router;

function RequireAuth({ children }: { children: JSX.Element }) {
  const auth = localStorage.getItem("wtd-token");
  const location = useLocation();

  if (!auth) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
}

function AlreadyAuth({ children }: { children: JSX.Element }) {
  const auth = localStorage.getItem("wtd-token");
  const location = useLocation();
  if (auth) {
    return <Navigate to="/todo" state={{ from: location }} replace />;
  }

  return children;
}
