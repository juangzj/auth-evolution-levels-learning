import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className = "", ...props }: InputProps) {
  return (
    <input
      {...props}
      className={`
        w-full
        rounded-lg
        border
        border-gray-300
        px-4
        py-3
        text-sm
        text-gray-900
        outline-none
        transition
        placeholder:text-gray-400
        focus:border-purple-500
        focus:ring-2
        focus:ring-purple-200
        ${className}
      `}
    />
  );
}
