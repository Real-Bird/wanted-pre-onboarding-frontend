import { ReactNode, createContext, useContext } from "react";
import { AuthService } from "../instances/AuthService";

const SigninContext = createContext<Pick<AuthService, "signin"> | null>(null);
export const useSigninContext = () => useContext(SigninContext);

const SigninProvider = ({ children, authService }: SigninProviderProps) => {
  const signin = authService.signin;
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
