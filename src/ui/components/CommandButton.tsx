import clsx from "clsx";
import { PropsWithChildren } from "react";

export const CommandButton = ({
  disabled,
  children,
  onClick,
}: PropsWithChildren<{ disabled: boolean; onClick: () => any }>) => (
  <button
    type="button"
    disabled={disabled}
    onClick={onClick}
    className={clsx(
      "inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium transition-all duration-200 ease-in-out rounded-lg",
      "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800",
      !disabled && [
        "text-white bg-gradient-to-r from-blue-600 to-blue-700",
        "hover:from-blue-700 hover:to-blue-800",
        "active:from-blue-800 active:to-blue-900",
        "focus:ring-blue-500",
        "shadow-lg shadow-blue-500/25",
        "hover:shadow-xl hover:shadow-blue-500/40",
        "transform hover:scale-105 active:scale-95"
      ],
      disabled && [
        "text-slate-400 bg-slate-700/50",
        "cursor-not-allowed opacity-60",
        "shadow-sm"
      ]
    )}
  >
    {children}
  </button>
);
