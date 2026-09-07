import type { User } from "../../domain/entities/user.entity";

export const UserTableRow = ({ user }: { user: User }) => (
  <tr key={user.id} className="transition-colors hover:bg-gray-50">
    <td className="px-6 py-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-gray-700">
          {user.firstName.charAt(0)}
          {user.lastName.charAt(0)}
        </div>
        <div>
          <p className="font-medium text-gray-900">
            {user.firstName} {user.lastName}
          </p>
          <p className="text-xs text-gray-500">ID: {user.id.slice(0, 8)}...</p>
        </div>
      </div>
    </td>

    <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>

    <td className="px-6 py-4">
      <span
        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
          user.role === "ADMIN"
            ? "bg-purple-100 text-purple-700"
            : "bg-blue-100 text-blue-700"
        }`}
      >
        {user.role}
      </span>
    </td>

    <td className="px-6 py-4">
      <div className="flex justify-end gap-2">
        <button
          type="button"
          className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
        >
          Edit
        </button>
        <button
          type="button"
          className="rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
        >
          Delete
        </button>
      </div>
    </td>
  </tr>
);
