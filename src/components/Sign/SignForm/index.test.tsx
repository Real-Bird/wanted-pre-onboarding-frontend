import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import SignForm from ".";
import { createRef } from "react";
import userEvent from "@testing-library/user-event";

describe("<SignForm />", () => {
  const emailRef = createRef<HTMLInputElement>();
  const passwordRef = createRef<HTMLInputElement>();

  it("renders component correctly in 'sign in' path", () => {
    render(
      <SignForm
        emailRef={emailRef}
        passwordRef={passwordRef}
        emailError={""}
        passwordError={""}
        loading={false}
        isSignIn={true}
      />
    );

    const emailLabel = screen.getByText("Email");
    const passwordLabel = screen.getByText("Password");
    const button = screen.getByTestId("signin-button");

    expect(emailLabel).toBeInTheDocument();
    expect(passwordLabel).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it("renders component correctly in 'sign up' path", () => {
    render(
      <SignForm
        emailRef={emailRef}
        passwordRef={passwordRef}
        emailError={""}
        passwordError={""}
        loading={false}
        isSignIn={false}
      />
    );

    const button = screen.getByTestId("signup-button");

    expect(button).toBeInTheDocument();
  });

  it("renders component correctly with errors", () => {
    render(
      <SignForm
        emailRef={emailRef}
        passwordRef={passwordRef}
        emailError={"email error"}
        passwordError={"password error"}
        loading={false}
        isSignIn={true}
      />
    );

    const emailError = screen.getByText("email error");
    const passwordError = screen.getByText("password error");

    expect(emailError).toBeInTheDocument();
    expect(passwordError).toBeInTheDocument();
  });

  it("submits the form when the submit button is clicked", () => {
    const onSubmitMock = jest.fn();

    render(
      <SignForm
        emailRef={emailRef}
        passwordRef={passwordRef}
        emailError={""}
        passwordError={""}
        loading={false}
        isSignIn={true}
        onSubmit={(e) => {
          e.preventDefault();
          onSubmitMock({
            email: emailRef.current?.value,
            password: passwordRef.current?.value,
          });
        }}
      />
    );

    const emailInput = screen.getByTestId("email-input");
    const passwordInput = screen.getByTestId("password-input");

    userEvent.type(emailInput, "a@a.a");
    userEvent.type(passwordInput, "asdf1234");

    const submitButton = screen.getByTestId("signin-button");
    fireEvent.click(submitButton);

    expect(onSubmitMock).toHaveBeenCalled();
    expect(onSubmitMock).toHaveBeenCalledWith({
      email: "a@a.a",
      password: "asdf1234",
    });
  });
});
