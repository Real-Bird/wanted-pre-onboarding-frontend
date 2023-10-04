import { Link } from "react-router-dom";
import { cls } from "../../../lib/util";
import { type ButtonHTMLAttributes } from "react";

export const Button = ({ label, path, testId, ...btnAttrs }: ButtonProps) => {
  const buttonField = (
    <button
      data-testid={testId}
      {...btnAttrs}
      className={cls(
        btnAttrs.disabled
          ? "disabled:bg-neutral-400 disabled:shadow-none"
          : "active:text-gray-200",
        "bg-red-500 hover:bg-red-600 text-white shadow-md active:shadow-none w-fit px-2 py-0.5 rounded-md shadow-slate-500"
      )}>
      {label}
    </button>
  );
  if (path) {
    return <Link to={path}>{buttonField}</Link>;
  }
  return buttonField;
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  path?: string;
  testId?: string;
}
