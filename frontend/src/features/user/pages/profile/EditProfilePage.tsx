import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useAuth } from "../../../../context/use-auth";
import { useNotification } from "../../../../notifications/use-notification.context";

import { UserEditOwnData } from "../../components/form/UserEditOwnData";
import { updateOwnUserData } from "../../user.api";

import type { UpdateOwnUserDto } from "../../domain/dtos/update-own-user.dto";

export function EditProfilePage() {
  const { user } = useAuth();

  const { showSuccess, showError } = useNotification();

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  if (!user) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <p className="text-sm text-gray-500">Unable to load your profile.</p>
      </div>
    );
  }

  const handleSubmit = async (data: UpdateOwnUserDto) => {
    setIsLoading(true);

    try {
      await updateOwnUserData(data);

      showSuccess("Profile updated successfully.");

      navigate("/profile");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showError(
          error.response?.data?.message ?? "Unable to update your profile.",
        );
      } else {
        showError("Unable to update your profile.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="mx-auto w-full max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Edit Profile</h1>

        <p className="mt-1 text-sm text-gray-500">
          Update your personal information.
        </p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <UserEditOwnData
          user={user}
          isLoading={isLoading}
          onSubmit={handleSubmit}
        />
      </div>
    </section>
  );
}
