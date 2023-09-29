import { Link } from "react-router-dom";
import { cls } from "../../../lib/util";
import { type ButtonHTMLAttributes } from "react";

export const Button = ({ label, path, testId, ...btnAttrs }: ButtonProps) => {
  return (
    <>
      {path ? (
        <Link to={path}>
          <button
            data-testid={testId}
            {...btnAttrs}
            className={cls(
              "bg-red-500 hover:bg-red-600 disabled:bg-neutral-400 text-white shadow-md active:shadow-none w-fit px-2 py-0.5 disabled:shadow-none active:text-gray-200 rounded-md shadow-slate-500"
            )}>
            {label}
          </button>
        </Link>
      ) : (
        <button
          data-testid={testId}
          {...btnAttrs}
          className={cls(
            "bg-red-500 hover:bg-red-600 disabled:bg-neutral-400 text-white shadow-md active:shadow-none w-fit px-2 py-0.5 disabled:shadow-none active:text-gray-200 rounded-md shadow-slate-500"
          )}>
          {label}
        </button>
      )}
    </>
  );
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  path?: string;
  testId?: string;
}
