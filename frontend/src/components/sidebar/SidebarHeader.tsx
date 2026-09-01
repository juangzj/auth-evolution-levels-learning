import { Link } from "react-router-dom";

interface SidebarHeaderProps {
  onClose: () => void;
}

export const SidebarHeader = ({ onClose }: SidebarHeaderProps) => {
  return (
    <div className="flex h-16 items-center justify-between border-b border-gray-200 px-5">
      <Link
        to="/dashboard"
        onClick={onClose}
        className="flex items-center gap-3"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-900 text-sm font-bold text-white">
          AE
        </div>

        <div>
          <p className="text-sm font-semibold text-gray-900">Auth Evolution</p>

          <p className="text-xs text-gray-500">Dashboard</p>
        </div>
      </Link>

      <button
        type="button"
        onClick={onClose}
        className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 lg:hidden"
        aria-label="Close sidebar"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};
