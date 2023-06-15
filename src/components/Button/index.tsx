import { Link } from "react-router-dom";
import { cls } from "../../lib/util";

interface ButtonProps {
  label: string;
  disabled?: boolean;
  onClick?: () => void;
  path?: string;
  testId?: string;
  className?: string;
}

const Button = ({
  label,
  disabled,
  onClick,
  path,
  testId,
  className = "",
}: ButtonProps) => {
  return (
    <>
      {path ? (
        <Link to={path}>
          <button
            data-testid={testId}
            className={cls(
              className,
              "bg-red-500 hover:bg-red-600 disabled:bg-neutral-400 text-white shadow-md active:shadow-none w-fit px-2 py-0.5 disabled:shadow-none active:text-gray-200 rounded-md shadow-slate-500"
            )}
            disabled={disabled}
            onClick={onClick}
          >
            {label}
          </button>
        </Link>
      ) : (
        <button
          data-testid={testId}
          className={cls(
            className,
            "bg-red-500 hover:bg-red-600 disabled:bg-neutral-400 text-white shadow-md active:shadow-none w-fit px-2 py-0.5 disabled:shadow-none active:text-gray-200 rounded-md shadow-slate-500"
          )}
          disabled={disabled}
          onClick={onClick}
        >
          {label}
        </button>
      )}
    </>
  );
};

export default Button;
