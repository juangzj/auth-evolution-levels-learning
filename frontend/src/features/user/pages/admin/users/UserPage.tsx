import { useEffect, useState } from "react";

import { UserTable } from "../../../components/table/UserTable";
import { findAll } from "../../../user.api";

import type { User } from "../../../domain/entities/user.entity";
import type {
  UserListQuery,
  UserListResponse,
} from "../../../types/pagination";

import { useNotification } from "../../../../../notifications/use-notification.context";

export const UserPage = () => {
  const { showError } = useNotification();

  const [users, setUsers] = useState<User[]>([]);
  const [pagination, setPagination] = useState<UserListResponse["meta"] | null>(
    null,
  );

  const [filters, setFilters] = useState<UserListQuery>({
    page: 1,
    limit: 10,
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      setIsLoading(true);

      try {
        const response = await findAll(filters);

        setUsers(response.data);
        setPagination(response.meta);
      } catch {
        showError("Failed to load users.");
      } finally {
        setIsLoading(false);
      }
    };

    loadUsers();
  }, [filters, showError]);

  const handlePageChange = (page: number) => {
    setFilters((current) => ({
      ...current,
      page,
    }));
  };

  const handleSearch = (name: string) => {
    setFilters((current) => ({
      ...current,
      name: name || undefined,
      page: 1,
    }));
  };

  const handleRoleChange = (role: UserListQuery["role"]) => {
    setFilters((current) => ({
      ...current,
      role,
      page: 1,
    }));
  };

  if (isLoading) {
    return <p>Loading users...</p>;
  }

  return (
    <UserTable
      users={users}
      pagination={pagination}
      onPageChange={handlePageChange}
      onSearch={handleSearch}
      onRoleChange={handleRoleChange}
    />
  );
};
