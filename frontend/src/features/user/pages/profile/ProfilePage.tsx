import { Link } from "react-router-dom";

import { useAuth } from "../../../../context/use-auth";

export function ProfilePage() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <p className="text-sm text-gray-500">Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <p className="text-sm text-gray-500">Unable to load your profile.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>

          <p className="mt-1 text-sm text-gray-500">
            View your account information.
          </p>
        </div>

        <Link
          to="/profile/edit"
          className="inline-flex items-center justify-center rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          Edit profile
        </Link>
      </div>

      {/* Profile card */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        {/* Profile header */}
        <div className="border-b border-gray-200 px-6 py-5">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-lg font-semibold text-gray-700">
              {user.firstName.charAt(0)}
              {user.lastName.charAt(0)}
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {user.firstName} {user.lastName}
              </h2>

              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>
        </div>

        {/* User information */}
        <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
              First name
            </p>

            <p className="mt-1 text-sm font-medium text-gray-900">
              {user.firstName}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
              Last name
            </p>

            <p className="mt-1 text-sm font-medium text-gray-900">
              {user.lastName}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
              Email
            </p>

            <p className="mt-1 text-sm font-medium text-gray-900">
              {user.email}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
              Role
            </p>

            <span className="mt-1 inline-flex rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700">
              {user.role}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
