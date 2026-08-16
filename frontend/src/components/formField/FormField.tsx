import type { InputHTMLAttributes } from "react";
import { Input } from "../input/Input";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function FormField({ label, id, ...inputProps }: FormFieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-gray-700"
      >
        {label}
      </label>

      <Input id={id} {...inputProps} />
    </div>
  );
}
