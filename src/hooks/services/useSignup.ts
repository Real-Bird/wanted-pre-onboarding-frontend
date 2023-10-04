import { FormEvent, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../rtkHooks";
import {
  fetchSignup,
  initialize,
  selectAuthState,
  validate,
} from "../../reducers/auth";
import { useNavigate } from "react-router-dom";
import useDebounce from "../useDebounce";

function useSignup() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const debounce = useDebounce();

  const {
    response: state,
    isLoading: loading,
    validation: signupError,
  } = useAppSelector(selectAuthState);
  const dispatch = useAppDispatch();

  const onValidate = () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    debounce(() => dispatch(validate({ email, password })), 800);
  };

  const onCompleteSignup = (e: FormEvent) => {
    e.preventDefault();
    const email = emailRef.current?.value ?? "";
    const password = passwordRef.current?.value ?? "";
    if (!email || !password) {
      alert("이메일 또는 패스워드를 입력해주세요");
      return;
    }
    dispatch(
      fetchSignup({
        email,
        password,
      })
    );
  };

  useEffect(() => {
    if (!emailRef.current?.value || !passwordRef.current?.value || loading) {
      return;
    }
    if (state.ok) {
      alert(state.message);
      dispatch(initialize("all"));
      return navigate("/signin");
    } else if (!state.ok) {
      alert(state.message);
      dispatch(initialize("response"));
      return;
    }
  }, [loading]);

  return {
    loading,
    emailRef,
    passwordRef,
    signupError,
    onCompleteSignup,
    onValidate,
  };
}

export default useSignup;
