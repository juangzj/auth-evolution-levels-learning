import { useState } from "react";
import axios from "axios";
import { Button } from "../../../../components/button/Button";
import { UserBasicFields } from "../fields/user/UserBasciFields";
import { PasswordFields } from "../fields/user/PasswordFields";
import { useNotification } from "../../../../notifications/use-notification.context";
import { register } from "../../../auth/auth.api";
import type { RegisterUserDto } from "../../domain/dtos/register-user.dto";

const initialFormData: RegisterUserDto = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export function UserRegisterForm() {
  const { showSuccess, showError } = useNotification();
  const [formData, setFormData] = useState<RegisterUserDto>(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((previousData) => ({ ...previousData, [name]: value }));
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      showError("Passwords do not match.");
      return;
    }
    setIsLoading(true);
    try {
      await register(formData);
      showSuccess("User registered successfully.");
      setFormData(initialFormData);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
          showError("This email is already registered.");
        } else {
          showError("Something went wrong. Please try again.");
        }
      } else {
        showError("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {" "}
      <UserBasicFields
        firstName={formData.firstName}
        lastName={formData.lastName}
        email={formData.email}
        isLoading={isLoading}
        onChange={handleChange}
      />{" "}
      <PasswordFields
        password={formData.password}
        confirmPassword={formData.confirmPassword}
        showConfirmPassword
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
        {isLoading ? "Creating account..." : "Register"}{" "}
      </Button>{" "}
    </form>
  );
}
