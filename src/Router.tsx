import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ToDoList from "./pages/ToDoList";
import { HttpClient } from "./instances/HttpClient";
import { TokenStorage } from "./instances/TokenStorage";
import { LocalStorage } from "./instances/LocalStorage";
import { AuthService } from "./instances/AuthService";
import { ToDoService } from "./instances/ToDoService";
import SignupProvider from "./contexts/signupService";
import SigninProvider from "./contexts/signinService";
import ToDoProvider from "./contexts/toDoService";

const localStorage = new LocalStorage();
const tokenStorage = new TokenStorage(localStorage);
const httpClient = new HttpClient(tokenStorage);
const authService = new AuthService(httpClient, tokenStorage);
const toDoService = new ToDoService(httpClient);

const router = createBrowserRouter([
  {
    path: "",
    element: <TokenValidate tokenStorage={tokenStorage} />,
    children: [
      {
        path: "signup",
        element: (
          <SignupProvider authService={authService}>
            <Signup />
          </SignupProvider>
        ),
      },
      {
        path: "signin",
        element: (
          <SigninProvider authService={authService}>
            <Signin />
          </SigninProvider>
        ),
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

function TokenValidate({ tokenStorage }: TokenValidateProps) {
  tokenStorage.initializedToken();
  const hasToken = !!tokenStorage.get();
  return <App hasToken={hasToken} />;
}

interface TokenValidateProps {
  tokenStorage: TokenStorage;
}

export default router;
