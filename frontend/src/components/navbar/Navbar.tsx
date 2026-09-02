import { useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../../context/use-auth";

import { NavbarItem } from "./NavbarItem";
import { NavbarUser } from "./NavbarUser";

export function Navbar() {
  const { isAuthenticated, isLoading } = useAuth();

  const [isOpen, setIsOpen] = useState(false);

  const closeNavbar = () => {
    setIsOpen(false);
  };

  if (isLoading) {
    return (
      <header className="border-b border-gray-200 bg-white">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="text-xl font-bold text-gray-900">
            AuthApp
          </Link>
        </nav>
      </header>
    );
  }

  return (
    <header className="border-b border-gray-200 bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          onClick={closeNavbar}
          className="text-xl font-bold text-gray-900"
        >
          AuthApp
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-4 md:flex">
          {!isAuthenticated ? (
            <>
              <NavbarItem to="/login" label="Login" />

              <Link
                to="/register"
                className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800"
              >
                Register
              </Link>
            </>
          ) : (
            <NavbarUser />
          )}
        </div>

        {/* Mobile button */}
        <button
          type="button"
          onClick={() => setIsOpen((previous) => !previous)}
          className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile */}
      {isOpen && (
        <div className="border-t border-gray-200 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col px-4 py-3 sm:px-6">
            {!isAuthenticated ? (
              <>
                <NavbarItem to="/login" label="Login" onClick={closeNavbar} />

                <Link
                  to="/register"
                  onClick={closeNavbar}
                  className="mt-1 rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-gray-800"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <NavbarItem
                  to="/dashboard"
                  label="Dashboard"
                  onClick={closeNavbar}
                />

                <NavbarItem
                  to="/profile"
                  label="My Profile"
                  onClick={closeNavbar}
                />

                {/* Logout */}
                <button
                  type="button"
                  className="mt-1 rounded-lg px-3 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
