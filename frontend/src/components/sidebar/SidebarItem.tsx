import { Link, useLocation } from "react-router-dom";

interface SidebarItemProps {
  to: string;
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

export const SidebarItem = ({ to, label, icon, onClick }: SidebarItemProps) => {
  const location = useLocation();

  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`
        mb-1 flex items-center gap-3 rounded-lg px-3 py-2.5
        text-sm font-medium transition-colors
        ${
          isActive
            ? "bg-gray-900 text-white"
            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        }
      `}
    >
      <span className="h-5 w-5 shrink-0">{icon}</span>

      <span>{label}</span>
    </Link>
  );
};
