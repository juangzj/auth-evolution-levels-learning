import { useState } from "react";
import axios from "axios";
import { Button } from "../../../../components/button/Button";
import { UserBasicFields } from "../fields/user/UserBasciFields";
import { useNotification } from "../../../../notifications/use-notification.context";
import { updateOwnUserData } from "../../user.api";
import type { UpdateOwnUserDto } from "../../domain/dtos/update-own-user.dto";
import type { User } from "../../domain/entities/user.entity";
interface UserEditOwnDataProps {
  user: User;
  isLoading?: boolean;
  onSubmit: (data: UpdateOwnUserDto) => void | Promise<void>;
}
export function UserEditOwnData({ user }: UserEditOwnDataProps) {
  const { showSuccess, showError } = useNotification();
  const [formData, setFormData] = useState<UpdateOwnUserDto>({
    firstName: user.firstName ?? "",
    lastName: user.lastName ?? "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((previousData) => ({ ...previousData, [name]: value }));
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await updateOwnUserData(formData);
      showSuccess("Profile updated successfully.");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
          showError("This email is already registered.");
        } else {
          showError(
            error.response?.data?.message ?? "Unable to update your profile.",
          );
        }
      } else {
        showError("Unable to update your profile.");
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {" "}
      <UserBasicFields
        firstName={formData.firstName ?? ""}
        lastName={formData.lastName ?? ""}
        email={user.email}
        emailDisabled
        isLoading={isLoading}
        onChange={handleChange}
      />{" "}
      <Button
        type="submit"
        variant="primary"
        size="md"
        className="w-full"
        disabled={isLoading}
      >
        {" "}
        {isLoading ? "Saving..." : "Save changes"}{" "}
      </Button>{" "}
    </form>
  );
}
