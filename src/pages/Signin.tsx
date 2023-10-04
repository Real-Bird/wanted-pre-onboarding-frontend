import { Layout } from "../components/common";
import SignForm from "../components/Sign/SignForm";
import SignConvert from "../components/Sign/SignConvert";
import useSignin from "../hooks/services/useSignin";

const Signin = () => {
  const {
    emailRef,
    passwordRef,
    onCompleteSignin,
    signinError,
    onValidate,
    loading,
  } = useSignin();

  return (
    <Layout title="Sign In">
      <SignForm
        onSubmit={onCompleteSignin}
        onKeyUp={onValidate}
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
