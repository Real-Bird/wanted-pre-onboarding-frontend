import { FormEvent, useRef, useState } from "react";
import { useSignupContext } from "../../contexts/signupService";
import { useFetch } from "../useFetch";

function useSignup() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [signupError, setSignupError] = useState({
    emailError: "",
    passwordError: "",
  });
  const { signup } = useSignupContext();
  const { state, onFetching, loading, error } = useFetch<{
    ok: boolean;
    message?: string;
  }>(
    () =>
      signup({
        email: emailRef.current?.value ?? "",
        password: passwordRef.current?.value ?? "",
      }),
    true
  );

  const onVerifiedError = () => {
    setSignupError({
      emailError: "",
      passwordError: "",
    });
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (email && !email.includes("@")) {
      setSignupError((prev) => ({
        ...prev,
        emailError: "이메일에는 '@'가 포함되어야 합니다.",
      }));
      return;
    }
    if (password && password.length < 8) {
      setSignupError((prev) => ({
        ...prev,
        passwordError: "비밀번호를 8자 이상 입력하세요.",
      }));
      return;
    }
  };

  const onCompleteSignup = (e: FormEvent) => {
    e.preventDefault();
    onFetching();
  };

  return {
    state,
    loading,
    error,
    emailRef,
    passwordRef,
    signupError,
    onCompleteSignup,
    onVerifiedError,
  };
}

export default useSignup;
