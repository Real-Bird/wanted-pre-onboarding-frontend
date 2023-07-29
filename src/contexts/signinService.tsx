import { ReactNode, createContext, useContext } from "react";
import { AuthService } from "../instances/AuthService";

const SigninContext = createContext<Pick<AuthService, "signin">>({
  signin: async () => ({ ok: false, message: "" }),
});
export const useSigninContext = () => useContext(SigninContext);

const SigninProvider = ({ children, authService }: SigninProviderProps) => {
  const signin = authService.signin.bind(authService);
  return (
    <SigninContext.Provider value={{ signin }}>
      {children}
    </SigninContext.Provider>
  );
};

interface SigninProviderProps {
  children: ReactNode;
  authService: AuthService;
}

export default SigninProvider;
