import { ReactNode, createContext, useContext } from "react";
import { AuthService } from "../instances/AuthService";

const SignupContext = createContext<Pick<AuthService, "signup">>({
  signup: async () => ({ ok: false, message: "" }),
});
export const useSignupContext = () => useContext(SignupContext);

const SignupProvider = ({ children, authService }: SignupProviderProps) => {
  const signup = authService.signup.bind(authService);
  return (
    <SignupContext.Provider value={{ signup }}>
      {children}
    </SignupContext.Provider>
  );
};

interface SignupProviderProps {
  children: ReactNode;
  authService: AuthService;
}

export default SignupProvider;
