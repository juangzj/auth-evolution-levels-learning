import type { UserTableProps } from "../types/model/user.type";

export const UserTable = ({ users }: UserTableProps) => {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Users
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage registered users and their roles.
        </p>
      </div>

      {/* Table container */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        {/* Table header */}
        <div className="flex flex-col gap-4 border-b border-gray-200 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">User list</h2>

            <p className="mt-1 text-sm text-gray-500">
              {users.length} {users.length === 1 ? "user" : "users"} registered
            </p>
          </div>

          <button
            type="button"
            className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800"
          >
            Add user
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[750px] text-left">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  User
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Email
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Role
                </th>

                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {users.length > 0 ? (
                users.map((user) => (
                  <tr
                    key={user.id}
                    className="transition-colors hover:bg-gray-50"
                  >
                    {/* User */}
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

                          <p className="text-xs text-gray-500">
                            ID: {user.id.slice(0, 8)}...
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {user.email}
                    </td>

                    {/* Role */}
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

                    {/* Actions */}
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
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center">
                      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                        <span className="text-xl">👤</span>
                      </div>

                      <h3 className="font-medium text-gray-900">
                        No users found
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        There are no registered users to display.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        {users.length > 0 && (
          <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50 px-6 py-4">
            <p className="text-sm text-gray-500">
              Showing{" "}
              <span className="font-medium text-gray-700">{users.length}</span>{" "}
              {users.length === 1 ? "user" : "users"}
            </p>

            <div className="flex gap-2">
              <button
                type="button"
                disabled
                className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-400"
              >
                Previous
              </button>

              <button
                type="button"
                className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
