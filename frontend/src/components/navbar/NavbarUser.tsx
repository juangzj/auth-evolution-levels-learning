import { useState } from "react";
import { useAuth } from "../../context/use-auth";
import { Modal } from "../modal/Modal";
export const NavbarUser = () => {
  const { user, logout } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const closeProfile = () => {
    setIsProfileOpen(false);
  };
  const handleLogout = async () => {
    await logout();
    setIsLogoutModalOpen(false);
    closeProfile();
  };
  const initials = `${user?.firstName?.charAt(0) ?? ""}${user?.lastName?.charAt(0) ?? ""}`;
  return (
    <>
      {" "}
      <div className="relative">
        {" "}
        {/* Profile button */}{" "}
        <button
          type="button"
          onClick={() => setIsProfileOpen((previous) => !previous)}
          className=" flex items-center gap-3 rounded-lg px-2 py-1.5 transition-colors hover:bg-gray-50 "
          aria-haspopup="menu"
          aria-expanded={isProfileOpen}
        >
          {" "}
          {/* Avatar */}{" "}
          <div className=" flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 text-sm font-semibold text-white ">
            {" "}
            {initials.toUpperCase()}{" "}
          </div>{" "}
          {/* User information */}{" "}
          <div className="hidden text-left sm:block">
            {" "}
            <p className="text-sm font-medium text-gray-900">
              {" "}
              {user?.firstName} {user?.lastName}{" "}
            </p>{" "}
            <p className="text-xs text-gray-500"> {user?.role} </p>{" "}
          </div>{" "}
          {/* Chevron */}{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className={` h-4 w-4 text-gray-400 transition-transform ${isProfileOpen ? "rotate-180" : ""} `}
          >
            {" "}
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />{" "}
          </svg>{" "}
        </button>{" "}
        {/* Dropdown */}{" "}
        {isProfileOpen && (
          <div className=" absolute right-0 z-50 mt-2 w-56 rounded-xl border border-gray-200 bg-white p-2 shadow-lg ">
            {" "}
            {/* User information */}{" "}
            <div className="border-b border-gray-100 px-3 py-2">
              {" "}
              <p className="truncate text-sm font-semibold text-gray-900">
                {" "}
                {user?.firstName} {user?.lastName}{" "}
              </p>{" "}
              <p className="truncate text-xs text-gray-500">
                {" "}
                {user?.email}{" "}
              </p>{" "}
            </div>{" "}
            {/* Navigation */}{" "}
            <div className="mt-1">
              {" "}
              {/* Dashboard */}{" "}
              <a
                href="/dashboard"
                onClick={closeProfile}
                className=" block rounded-md px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 "
              >
                {" "}
                Dashboard{" "}
              </a>{" "}
              {/* Profile */}{" "}
              <a
                href="/profile"
                onClick={closeProfile}
                className=" block rounded-md px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 "
              >
                {" "}
                My Profile{" "}
              </a>{" "}
            </div>{" "}
            {/* Logout */}{" "}
            <div className="mt-1 border-t border-gray-100 pt-1">
              {" "}
              <button
                type="button"
                onClick={() => setIsLogoutModalOpen(true)}
                className=" block w-full rounded-md px-3 py-2 text-left text-sm text-red-600 transition-colors hover:bg-red-50 "
              >
                {" "}
                Logout{" "}
              </button>{" "}
            </div>{" "}
          </div>
        )}{" "}
      </div>{" "}
      {/* Logout confirmation */}{" "}
      <Modal
        isOpen={isLogoutModalOpen}
        title="Logout"
        message="Are you sure that you want to log out?"
        onCancel={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
        confirmText="Yes"
        cancelText="No"
      />{" "}
    </>
  );
};
