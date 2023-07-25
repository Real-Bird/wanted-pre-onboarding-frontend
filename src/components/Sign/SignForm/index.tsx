import { RefObject } from "react";
import { type FormHTMLAttributes } from "react";
import { Button, Input } from "../../common";

const SignForm = ({
  emailRef,
  passwordRef,
  emailError,
  passwordError,
  loading,
  onResetEmailError,
  onResetPasswordError,
  isSignIn,
  ...formAttrs
}: SignFormProps) => {
  return (
    <form
      {...formAttrs}
      className="flex flex-col items-center h-fit mt-10 space-y-5"
    >
      <Input
        ref={emailRef}
        label="Email"
        type="email"
        testId="email-input"
        onFocus={onResetEmailError}
      />
      {emailError && (
        <p className="text-bold text-lg text-red-500">{emailError}</p>
      )}
      <Input
        ref={passwordRef}
        label="Password"
        type="password"
        testId="password-input"
        onFocus={onResetPasswordError}
      />
      {passwordError && (
        <p className="text-bold text-lg text-red-500">{passwordError}</p>
      )}
      <Button
        label={isSignIn ? "Sign In" : "Sign Up"}
        testId={isSignIn ? "signin-button" : "signup-button"}
        disabled={emailError || passwordError || loading ? true : false}
      />
    </form>
  );
};

export default SignForm;

interface SignFormProps extends FormHTMLAttributes<HTMLFormElement> {
  emailRef: RefObject<HTMLInputElement>;
  passwordRef: RefObject<HTMLInputElement>;
  emailError: string;
  passwordError: string;
  loading: boolean;
  onResetEmailError?: () => void;
  onResetPasswordError?: () => void;
  isSignIn: boolean;
}
