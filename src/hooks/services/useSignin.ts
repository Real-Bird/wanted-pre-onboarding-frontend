import { FormEvent, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../rtkHooks";
import {
  selectAuthState,
  fetchSignin,
  validate,
  initialize,
} from "../../reducers/auth";
import { useNavigate } from "react-router-dom";
import useDebounce from "../useDebounce";

function useSignin() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const {
    response: state,
    isLoading: loading,
    validation: signinError,
  } = useAppSelector(selectAuthState);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const debounce = useDebounce();

  const onValidate = () => {
    const email = emailRef.current?.value ?? "";
    const password = passwordRef.current?.value ?? "";

    debounce(() => dispatch(validate({ email, password })), 800);
  };

  const onCompleteSignin = (e: FormEvent) => {
    e.preventDefault();
    const email = emailRef.current?.value ?? "";
    const password = passwordRef.current?.value ?? "";
    if (!email || !password) {
      alert("이메일 또는 패스워드를 입력해주세요");
      return;
    }
    dispatch(
      fetchSignin({
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
      dispatch(initialize("all"));
      return navigate("/todo");
    } else if (!state.ok) {
      alert(state.message);
      dispatch(initialize("response"));
      return;
    }
  }, [loading]);

  return {
    state,
    loading,
    emailRef,
    passwordRef,
    signinError,
    onCompleteSignin,
    onValidate,
  };
}

export default useSignin;
