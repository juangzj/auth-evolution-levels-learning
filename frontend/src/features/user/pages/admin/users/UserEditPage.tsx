import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useNotification } from "../../../../../notifications/use-notification.context";
import { UserEditForm } from "../../../components/form/UserEditForm";
import { getUserById, updateUser } from "../../../user.api";
import type { User } from "../../../domain/entities/user.entity";
import type { UpdateUserDto } from "../../../domain/dtos/update-user.dto";
export function UserEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showSuccess, showError } = useNotification();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    if (!id) {
      showError("Invalid user ID.");
      navigate("/users");
      return;
    }
    const loadUser = async () => {
      try {
        const response = await getUserById(id);
        setUser(response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          showError(
            error.response?.data?.message ?? "Unable to load the user.",
          );
        } else {
          showError("Unable to load the user.");
        }
        navigate("/users");
      } finally {
        setIsLoading(false);
      }
    };
    void loadUser();
  }, [id, navigate, showError]);

  const handleSubmit = async (data: UpdateUserDto) => {
    if (!id) {
      showError("Invalid user ID.");
      return;
    }
    setIsSubmitting(true);
    try {
      await updateUser(id, data);
      showSuccess("User updated successfully.");
      navigate("/users");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showError(
          error.response?.data?.message ?? "Unable to update the user.",
        );
      } else {
        showError("Unable to update the user.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleCancel = () => {
    navigate("/users");
  };
  if (isLoading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        {" "}
        <p className="text-sm text-gray-500">Loading user...</p>{" "}
      </div>
    );
  }
  if (!user) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        {" "}
        <p className="text-sm text-gray-500"> Unable to load the user. </p>{" "}
      </div>
    );
  }
  return (
    <section className="mx-auto w-full max-w-4xl">
      {" "}
      <div className="mb-6">
        {" "}
        <h1 className="text-2xl font-bold text-gray-900"> Edit User </h1>{" "}
        <p className="mt-1 text-sm text-gray-500">
          {" "}
          Update this user's personal information, role, and password.{" "}
        </p>{" "}
      </div>{" "}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        {" "}
        <UserEditForm
          user={user}
          isLoading={isSubmitting}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />{" "}
      </div>{" "}
    </section>
  );
}
