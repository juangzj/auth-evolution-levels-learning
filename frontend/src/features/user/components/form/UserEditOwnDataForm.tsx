import { useState } from "react";
import { Button } from "../../../../components/button/Button";
import { UserBasicFields } from "../fields/user/UserBasciFields";
import type { UpdateOwnUserDto } from "../../domain/dtos/update-own-user.dto";
import type { User } from "../../domain/entities/user.entity";
interface UserEditOwnDataProps {
  user: User;
  isLoading?: boolean;
  onSubmit: (data: UpdateOwnUserDto) => void | Promise<void>;
}
export function UserEditOwnDataForm({
  user,
  isLoading = false,
  onSubmit,
}: UserEditOwnDataProps) {
  const [formData, setFormData] = useState<UpdateOwnUserDto>({
    firstName: user.firstName ?? "",
    lastName: user.lastName ?? "",
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((previousData) => ({ ...previousData, [name]: value }));
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSubmit(formData);
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
