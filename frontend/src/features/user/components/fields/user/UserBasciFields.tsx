import { FormField } from "../../../../../components/formField/FormField";

interface UserBasicFieldsProps {
  firstName: string;
  lastName: string;
  email: string;
  showEmail?: boolean;
  emailDisabled?: boolean;
  isLoading?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function UserBasicFields({
  firstName,
  lastName,
  email,
  showEmail = true,
  emailDisabled = false,
  isLoading = false,
  onChange,
}: UserBasicFieldsProps) {
  return (
    <>
      {/* First name + Last name */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField
          label="First name"
          id="firstName"
          name="firstName"
          type="text"
          placeholder="First name"
          value={firstName}
          onChange={onChange}
          disabled={isLoading}
          required
        />

        <FormField
          label="Last name"
          id="lastName"
          name="lastName"
          type="text"
          placeholder="Last name"
          value={lastName}
          onChange={onChange}
          disabled={isLoading}
          required
        />
      </div>

      {/* Email */}
      {showEmail && (
        <FormField
          label="Email"
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={onChange}
          disabled={emailDisabled || isLoading}
          required
        />
      )}
    </>
  );
}
