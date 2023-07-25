import { type InputHTMLAttributes, forwardRef } from "react";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, type = "text", className, testId, ...inputAttrs }, inputRef) => {
    const inputField = (
      <input
        {...inputAttrs}
        className={
          className
            ? className
            : "w-full text-gray-500 outline-none focus:ring-1 focus:ring-orange-900 p-1 rounded-md"
        }
        type={type}
        ref={inputRef}
        data-testid={testId}
      />
    );

    if (!label) {
      return inputField;
    }
    return (
      <label className="w-full max-w-xs space-y-2">
        {label && (
          <h4 className="text-xl text-yellow-900 font-semibold">{label}</h4>
        )}
        {inputField}
      </label>
    );
  }
);

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  testId?: string;
}
