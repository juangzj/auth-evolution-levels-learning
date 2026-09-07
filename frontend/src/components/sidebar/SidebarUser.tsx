import type { User } from "../../features/user/domain/entities/user.entity";

interface SidebarUserProps {
  user: User | null;
}

export const SidebarUser = ({ user }: SidebarUserProps) => {
  const initials =
    `${user?.firstName?.charAt(0) ?? ""}${user?.lastName?.charAt(0) ?? ""}`.toUpperCase();

  return (
    <div className="border-t border-gray-200 p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-900 text-sm font-semibold text-white">
          {initials}
        </div>

        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-gray-900">
            {user?.firstName} {user?.lastName}
          </p>

          <p className="truncate text-xs text-gray-500">{user?.email}</p>
        </div>
      </div>

      <div className="mt-3">
        <span className="inline-flex rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
          {user?.role}
        </span>
      </div>
    </div>
  );
};
