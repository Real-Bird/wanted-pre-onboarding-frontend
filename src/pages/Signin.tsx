import { useNavigate } from "react-router-dom";
import { Layout } from "../components/common";
import SignForm from "../components/Sign/SignForm";
import SignConvert from "../components/Sign/SignConvert";
import useDebounce from "../hooks/useDebounce";
import useSignin from "../hooks/services/useSignin";
import { useEffect } from "react";

const Signin = () => {
  const navigate = useNavigate();
  const debounce = useDebounce();
  const {
    emailRef,
    passwordRef,
    onCompleteSignin,
    signinError,
    onVerifiedError,
    state,
    loading,
  } = useSignin();

  useEffect(() => {
    if (!emailRef.current?.value || !passwordRef.current?.value || loading) {
      return;
    }
    if (state?.ok) {
      return navigate("/todo");
    } else if (!state?.ok) {
      alert(state?.message);
      return;
    }
  }, [loading]);
  return (
    <Layout title="Sign In">
      <SignForm
        onSubmit={onCompleteSignin}
        onKeyDown={() => debounce(onVerifiedError, 800)}
        emailRef={emailRef}
        passwordRef={passwordRef}
        emailError={signinError.emailError}
        passwordError={signinError.passwordError}
        loading={loading}
        isSignIn={true}
      />
      <SignConvert upOrIn="signup" isSignIn={true} />
    </Layout>
  );
};

export default Signin;
