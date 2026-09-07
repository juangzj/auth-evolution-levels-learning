export const UserTableEmpty = () => (
  <tr>
    <td colSpan={4} className="px-6 py-12 text-center">
      <div className="flex flex-col items-center">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
          <span className="text-xl">👤</span>
        </div>

        <h3 className="font-medium text-gray-900">No users found</h3>
        <p className="mt-1 text-sm text-gray-500">
          There are no registered users to display.
        </p>
      </div>
    </td>
  </tr>
);
