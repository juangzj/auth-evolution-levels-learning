import { FormField } from "../../../../../components/formField/FormField";

interface PasswordFieldsProps {
  password: string;
  confirmPassword?: string;
  showConfirmPassword?: boolean;
  isLoading?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function PasswordFields({
  password,
  confirmPassword = "",
  showConfirmPassword = true,
  isLoading = false,
  onChange,
}: PasswordFieldsProps) {
  return (
    <>
      {" "}
      <FormField
        label="Password"
        id="password"
        name="password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={onChange}
        disabled={isLoading}
        required
      />{" "}
      {showConfirmPassword && (
        <FormField
          label="Confirm password"
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={onChange}
          disabled={isLoading}
          required
        />
      )}{" "}
    </>
  );
}
