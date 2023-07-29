import { FormEvent, useRef, useState } from "react";
import { useFetch } from "../useFetch";
import { useSigninContext } from "../../contexts/signinService";

function useSignin() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [signinError, setSigninError] = useState({
    emailError: "",
    passwordError: "",
  });
  const { signin } = useSigninContext();
  const { state, onFetching, loading, error } = useFetch<{
    ok: boolean;
    message?: string;
  }>(
    () =>
      signin({
        email: emailRef.current?.value ?? "",
        password: passwordRef.current?.value ?? "",
      }),
    true
  );

  const onVerifiedError = () => {
    setSigninError({
      emailError: "",
      passwordError: "",
    });
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (email && !email.includes("@")) {
      setSigninError((prev) => ({
        ...prev,
        emailError: "이메일에는 '@'가 포함되어야 합니다.",
      }));
      return;
    }
    if (password && password.length < 8) {
      setSigninError((prev) => ({
        ...prev,
        passwordError: "비밀번호를 8자 이상 입력하세요.",
      }));
      return;
    }
  };

  const onCompleteSignin = (e: FormEvent) => {
    e.preventDefault();
    onFetching();
  };

  return {
    state,
    loading,
    error,
    emailRef,
    passwordRef,
    signinError,
    onCompleteSignin,
    onVerifiedError,
  };
}

export default useSignin;
