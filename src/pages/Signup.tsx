import { Layout } from "../components/common";
import SignForm from "../components/Sign/SignForm";
import SignConvert from "../components/Sign/SignConvert";
import useSignup from "../hooks/services/useSignup";

const Signup = () => {
  const {
    emailRef,
    passwordRef,
    signupError,
    onCompleteSignup,
    onValidate,
    loading,
  } = useSignup();

  return (
    <Layout title="Sign Up">
      <SignForm
        onSubmit={onCompleteSignup}
        onKeyUp={onValidate}
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
