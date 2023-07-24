import { Link } from "react-router-dom";

const SignConvert = ({ upOrIn, isSignIn }: SignConvertProps) => {
  return (
    <>
      <hr className="border-2 border-yellow-900 w-full my-6" />
      <p className="flex mt-5 items-center justify-center">
        {isSignIn ? "Don't have an account yet?" : "Did you have an account?"}
        <Link to={`/${upOrIn}`} replace className="mx-3">
          <strong className="w-fit text-lg font-bold underline text-yellow-900">
            {isSignIn ? " Go To Sign Up" : "Go To Sign In"}
          </strong>
        </Link>
      </p>
    </>
  );
};

export default SignConvert;

interface SignConvertProps {
  upOrIn: "signin" | "signup";
  isSignIn: boolean;
}
