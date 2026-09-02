import { Link, useLocation } from "react-router-dom";

interface NavbarItemProps {
  to: string;
  label: string;
  onClick?: () => void;
}

export const NavbarItem = ({ to, label, onClick }: NavbarItemProps) => {
  const location = useLocation();

  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`
        rounded-lg px-3 py-2
        text-sm font-medium
        transition-colors
        ${
          isActive
            ? "bg-gray-900 text-white"
            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        }
      `}
    >
      {label}
    </Link>
  );
};
