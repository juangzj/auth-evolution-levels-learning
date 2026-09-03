import { useEffect, useState } from "react";

import { UserTable } from "../../components/UserTable";
import { findAll } from "../../user.api";
import type { User } from "../../types/model/user.type";

export const UserPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await findAll();
        setUsers(data);
      } catch {
        setError("Failed to load users.");
      } finally {
        setIsLoading(false);
      }
    };

    loadUsers();
  }, []);

  return (
    <div>
      {isLoading ? <p>Loading users...</p> : null}

      {error ? <p>{error}</p> : null}

      {!isLoading && !error ? <UserTable users={users} /> : null}
    </div>
  );
};
