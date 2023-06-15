import { FormEvent, useEffect, useRef, useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { useFetch } from "../lib/hooks/useFetch";
import { signupAuth } from "../api/auth";

const Signup = () => {
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { state, onFetching, error, loading } = useFetch(
    () =>
      signupAuth({
        email: emailRef.current?.value ?? "",
        password: passwordRef.current?.value ?? "",
      }),
    true
  );
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
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
    if (!state) {
      alert("계정을 성공적으로 생성했습니다!");
      return navigate("/signin");
    } else if (!state?.ok && state?.error) {
      alert(state?.error);
      return;
    }
  }, [onFetching]);
  return (
    <Layout title="Sign Up">
      <form
        onSubmit={onSubmit}
        className="flex flex-col items-center h-fit mt-10 space-y-5"
      >
        <Input
          inputRef={emailRef}
          label="Email"
          type="email"
          testId="email-input"
          onFocus={() => setEmailError("")}
        />{" "}
        {emailError && (
          <p className="text-bold text-lg text-red-500">{emailError}</p>
        )}
        <Input
          inputRef={passwordRef}
          label="Password"
          type="password"
          testId="password-input"
          onFocus={() => setPasswordError("")}
        />
        {passwordError && (
          <p className="text-bold text-lg text-red-500">{passwordError}</p>
        )}
        <Button
          label="Sign Up"
          testId="signin-button"
          disabled={emailError || passwordError || loading ? true : false}
        />
      </form>
      <hr className="border-2 border-yellow-900 w-full my-6" />
      <p className="flex mt-5 items-center justify-center">
        Did you have an account?
        <Link to={"/signin"} replace className="mx-3">
          <strong className="w-fit text-lg font-bold underline text-yellow-900">
            Go To Sign In
          </strong>
        </Link>
      </p>
    </Layout>
  );
};

export default Signup;
