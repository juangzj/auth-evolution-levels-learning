export const UserTableFooter = ({ total }: { total: number }) => (
  <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50 px-6 py-4">
    <p className="text-sm text-gray-500">
      Showing <span className="font-medium text-gray-700">{total}</span>{" "}
      {total === 1 ? "user" : "users"}
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
);
