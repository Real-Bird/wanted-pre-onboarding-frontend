import { ChangeEvent, RefObject } from "react";

interface InputProps {
  label?: string;
  type: "text" | "email" | "password";
  inputRef?: RefObject<HTMLInputElement>;
  value?: string;
  testId?: string;
  placeholder?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
}

const Input = ({
  label,
  type = "text",
  inputRef,
  onChange,
  value,
  testId,
  placeholder,
  onFocus,
}: InputProps) => {
  return (
    <label className="w-full max-w-xs space-y-2">
      {label && (
        <h4 className="text-xl text-yellow-900 font-semibold">{label}</h4>
      )}
      <input
        className="w-full text-gray-500 outline-none focus:ring-1 focus:ring-orange-900 p-1 rounded-md"
        type={type}
        ref={inputRef}
        onChange={onChange}
        value={value}
        data-testid={testId}
        placeholder={placeholder}
        onFocus={onFocus}
      />
    </label>
  );
};

export default Input;
