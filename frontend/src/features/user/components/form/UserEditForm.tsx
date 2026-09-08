import { useState } from "react";

import { Button } from "../../../../components/button/Button";
import { UserBasicFields } from "../fields/user/UserBasciFields";

import type { UpdateUserDto } from "../../domain/dtos/update-user.dto";
import type { User } from "../../domain/entities/user.entity";
import { PasswordFields } from "../fields/user/PasswordFields";

interface UserEditFormProps {
  user: User;
  isLoading?: boolean;
  onSubmit: (data: UpdateUserDto) => void | Promise<void>;
  onCancel: () => void;
}

export function UserEditForm({
  user,
  isLoading = false,
  onSubmit,
  onCancel,
}: UserEditFormProps) {
  const [formData, setFormData] = useState<UpdateUserDto>({
    firstName: user.firstName ?? "",
    lastName: user.lastName ?? "",
    role: user.role,
    password: "",
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

    const updateData: UpdateUserDto = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      role: formData.role,
      ...(formData.password?.trim() ? { password: formData.password } : {}),
    };

    await onSubmit(updateData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Email - read only */}

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Email
        </label>

        <div className="w-full rounded-lg border border-gray-200 bg-gray-100 px-3 py-2 text-sm text-gray-600">
          {user.email}
        </div>
      </div>

      {/* Editable information */}
      <UserBasicFields
        firstName={formData.firstName ?? ""}
        lastName={formData.lastName ?? ""}
        email=""
        emailDisabled
        showEmail={false}
        isLoading={isLoading}
        onChange={handleChange}
      />

      {/* Role */}
      <div>
        <label
          htmlFor="role"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Role
        </label>

        <select
          id="role"
          name="role"
          value={formData.role}
          disabled={isLoading}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-gray-500 focus:ring-1 focus:ring-gray-500 disabled:cursor-not-allowed disabled:bg-gray-100"
        >
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
        </select>
      </div>

      {/* Password */}
      <PasswordFields
        password={formData.password ?? ""}
        showConfirmPassword={false}
        isLoading={isLoading}
        onChange={handleChange}
        required={false}
      />

      {/* Actions */}
      <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="secondary"
          size="md"
          disabled={isLoading}
          onClick={onCancel}
        >
          Cancel
        </Button>

        <Button type="submit" variant="primary" size="md" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save changes"}
        </Button>
      </div>
    </form>
  );
}
