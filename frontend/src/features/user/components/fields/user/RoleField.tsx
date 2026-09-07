import type { UserRole } from "../../../enums/user-role.enum";

interface RoleFieldProps {
  value: UserRole;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
}

export function RoleField({
  value,
  onChange,
  disabled = false,
}: RoleFieldProps) {
  return (
    <div>
      {" "}
      <label
        htmlFor="role"
        className="mb-2 block text-sm font-medium text-gray-700"
      >
        {" "}
        Role{" "}
      </label>{" "}
      <select
        id="role"
        name="role"
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-200 disabled:bg-gray-100"
      >
        {" "}
        <option value="USER">User</option>{" "}
        <option value="ADMIN">Admin</option>{" "}
      </select>{" "}
    </div>
  );
}
