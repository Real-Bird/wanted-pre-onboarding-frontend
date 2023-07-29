import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SignForm from "../components/Sign/SignForm";
import SignConvert from "../components/Sign/SignConvert";
import { Layout } from "../components/common";
import useSignup from "../hooks/services/useSignup";
import useDebounce from "../hooks/useDebounce";

const Signup = () => {
  const navigate = useNavigate();
  const debounce = useDebounce();
  const {
    emailRef,
    passwordRef,
    signupError,
    onCompleteSignup,
    onVerifiedError,
    state,
    loading,
  } = useSignup();

  useEffect(() => {
    if (!emailRef.current?.value || !passwordRef.current?.value || loading) {
      return;
    }
    if (state?.ok) {
      alert(state.message);
      return navigate("/signin");
    } else if (state?.ok === false) {
      alert(state?.message);
      return;
    }
  }, [loading]);

  return (
    <Layout title="Sign Up">
      <SignForm
        onSubmit={onCompleteSignup}
        onKeyDown={() => debounce(onVerifiedError, 800)}
        emailRef={emailRef}
        passwordRef={passwordRef}
        emailError={signupError.emailError}
        passwordError={signupError.passwordError}
        loading={loading}
        isSignIn={false}
      />
      <SignConvert upOrIn="signin" isSignIn={false} />
    </Layout>
  );
};

export default Signup;
