import { type FormEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "../components/common";
import { useFetch } from "../hooks/useFetch";
import { signinAuth } from "../api/auth";
import SignForm from "../components/Sign/SignForm";
import SignConvert from "../components/Sign/SignConvert";

const Signin = () => {
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { state, onFetching, loading } = useFetch(
    () =>
      signinAuth({
        email: emailRef.current?.value ?? "",
        password: passwordRef.current?.value ?? "",
      }),
    true
  );
  const onCompleteSignIn = (e: FormEvent) => {
    e.preventDefault();
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    if (!email || !password) return;
    if (email && !email.includes("@")) {
      setEmailError("이메일에는 '@'가 포함되어야 합니다.");
      return;
    }
    if (password && password.length < 8) {
      setPasswordError("비밀번호를 8자 이상 입력하세요.");
      return;
    }
    onFetching();
    return;
  };

  useEffect(() => {
    if (!emailRef.current?.value || !passwordRef.current?.value) {
      return;
    }
    if (state?.ok && state.token) {
      localStorage.setItem("wtd-token", state.token);
      return navigate("/todo");
    } else if (!state?.ok && state?.error) {
      alert(state?.error);
      return;
    }
  }, [onFetching]);
  return (
    <Layout title="Sign In">
      <SignForm
        onSubmit={onCompleteSignIn}
        emailRef={emailRef}
        passwordRef={passwordRef}
        emailError={emailError}
        onResetEmailError={() => setEmailError("")}
        passwordError={passwordError}
        onResetPasswordError={() => setPasswordError("")}
        loading={loading}
        isSignIn={true}
      />
      <SignConvert upOrIn="signup" isSignIn={true} />
    </Layout>
  );
};

export default Signin;
