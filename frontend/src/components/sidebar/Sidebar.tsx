import { useState } from "react";

import { useAuth } from "../../context/use-auth";

import { SidebarHeader } from "./SidebarHeader";
import { SidebarItem } from "./SidebarItem";
import { SidebarUser } from "./SidebarUser";

import { DashboardIcon } from "../icons/DashboardIcon";
import { UserIcon } from "../icons/UserIcon";
import { UsersIcon } from "../icons/UsersIcon";
import { SettingsIcon } from "../icons/SettingsIcon";

export const Sidebar = () => {
  const { user } = useAuth();

  const [isOpen, setIsOpen] = useState(false);

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="
          fixed left-4 top-4 z-40 rounded-lg
          border border-gray-200 bg-white p-2.5
          text-gray-700 shadow-sm
          hover:bg-gray-50
          lg:hidden
        "
        aria-label="Open sidebar"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Mobile overlay */}
      {isOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={closeSidebar}
          className="
            fixed inset-0 z-40
            bg-black/40
            lg:hidden
          "
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          flex w-72 flex-col
          border-r border-gray-200 bg-white
          shadow-xl
          transition-transform duration-300

          lg:static lg:z-auto
          lg:w-64
          lg:translate-x-0
          lg:shadow-none

          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Header */}
        <SidebarHeader onClose={closeSidebar} />

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-5">
          {/* Main menu */}
          <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Menu
          </p>

          <SidebarItem
            to="/dashboard"
            label="Dashboard"
            icon={<DashboardIcon />}
            onClick={closeSidebar}
          />

          {/* USER */}
          {user?.role === "USER" && (
            <SidebarItem
              to="/profile"
              label="My Profile"
              icon={<UserIcon />}
              onClick={closeSidebar}
            />
          )}

          {/* ADMIN */}
          {user?.role === "ADMIN" && (
            <>
              <p className="mb-2 mt-6 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                Administration
              </p>

              <SidebarItem
                to="/users"
                label="Users"
                icon={<UsersIcon />}
                onClick={closeSidebar}
              />

              <SidebarItem
                to="/settings"
                label="Settings"
                icon={<SettingsIcon />}
                onClick={closeSidebar}
              />
            </>
          )}
        </nav>

        {/* User */}
        <SidebarUser user={user} />
      </aside>
    </>
  );
};
