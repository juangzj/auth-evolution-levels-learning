import { useEffect, useState } from "react";
import { UserTable } from "../../../components/table/UserTable";
import { findAll } from "../../../user.api";
import type { User } from "../../../domain/entities/user.entity";
import { useNotification } from "../../../../../notifications/use-notification.context";
export const UserPage = () => {
  const { showError } = useNotification();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await findAll();
        setUsers(data);
      } catch {
        showError("Failed to load users.");
      } finally {
        setIsLoading(false);
      }
    };
    loadUsers();
  }, [showError]);
  if (isLoading) {
    return <p>Loading users...</p>;
  }
  return <UserTable users={users} />;
};
