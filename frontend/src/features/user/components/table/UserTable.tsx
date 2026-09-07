import type { UserTableProps } from "./types/user-table-props.type";
import { UserTableEmpty } from "./UserTableEmpty";
import { UserTableFooter } from "./UserTableFooter";
import { UserTableHeader } from "./UserTableHeader";
import { UserTableRow } from "./UserTableRow";

export const UserTable = ({ users }: UserTableProps) => {
  const totalUsers = users.length;

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Users
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage registered users and their roles.
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-gray-200 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">User list</h2>
            <p className="mt-1 text-sm text-gray-500">
              {totalUsers} {totalUsers === 1 ? "user" : "users"} registered
            </p>
          </div>

          <button
            type="button"
            className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800"
          >
            Add user
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[750px] text-left">
            <UserTableHeader />

            <tbody className="divide-y divide-gray-100">
              {totalUsers > 0 ? (
                users.map((user) => <UserTableRow key={user.id} user={user} />)
              ) : (
                <UserTableEmpty />
              )}
            </tbody>
          </table>
        </div>

        {totalUsers > 0 && <UserTableFooter total={totalUsers} />}
      </div>
    </div>
  );
};
