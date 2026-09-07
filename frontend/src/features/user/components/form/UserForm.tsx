import { useState } from "react";

import { Button } from "../../../../components/button/Button";
import { FormField } from "../../../../components/formField/FormField";

import type { User } from "../../domain/entities/user.entity";
import type { UpdateOwnUserDto } from "../../domain/dtos/update-own-user.dto";
import type { UpdateUserDto } from "../../domain/dtos/update-user.dto";

type UserFormMode = "self" | "admin";

interface UserFormProps {
  mode: UserFormMode;
  initialData: User;
  isLoading?: boolean;
  onSubmit: (data: UpdateOwnUserDto | UpdateUserDto) => void | Promise<void>;
}

export function UserForm({
  mode,
  initialData,
  isLoading = false,
  onSubmit,
}: UserFormProps) {
  const [formData, setFormData] = useState({
    firstName: initialData.firstName,
    lastName: initialData.lastName,
    email: initialData.email,
    role: initialData.role,
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (mode === "self") {
      const data: UpdateOwnUserDto = {
        firstName: formData.firstName,
        lastName: formData.lastName,
      };

      await onSubmit(data);
      return;
    }

    const data: UpdateUserDto = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      role: formData.role,
    };

    await onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* First name + Last name */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField
          label="First name"
          id="firstName"
          name="firstName"
          type="text"
          placeholder="First name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />

        <FormField
          label="Last name"
          id="lastName"
          name="lastName"
          type="text"
          placeholder="Last name"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </div>

      {/* Email */}
      <FormField
        label="Email"
        id="email"
        name="email"
        type="email"
        placeholder="you@example.com"
        value={formData.email}
        onChange={handleChange}
        disabled={mode === "self"}
        required
      />

      {/* Admin-only fields */}
      {mode === "admin" && (
        <div>
          <label
            htmlFor="role"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Role
          </label>

          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            disabled={isLoading}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>
      )}

      {/* Submit */}
      <Button
        type="submit"
        variant="primary"
        size="md"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? "Saving..." : "Save changes"}
      </Button>
    </form>
  );
}
