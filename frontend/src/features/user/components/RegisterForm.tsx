import { useState } from "react";
import axios from "axios";

import { Button } from "../../../components/button/Button";
import { FormField } from "../../../components/formField/FormField";

import { useNotification } from "../../../notifications/use-notification.context";

import { register } from "../../auth/auth.api";
import type { UserRegisterData } from "../types/user-register-data.type";

const initialFormData: UserRegisterData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export function RegisterForm() {
  const { showSuccess, showError } = useNotification();

  const [formData, setFormData] = useState<UserRegisterData>(initialFormData);

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
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

      showSuccess("Account created successfully.");

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
      {/* First name + Last name */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField
          label="First name"
          id="firstName"
          name="firstName"
          type="text"
          placeholder="First name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />

        <FormField
          label="Last name"
          id="lastName"
          name="lastName"
          type="text"
          placeholder="Last name"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </div>

      {/* Email */}
      <FormField
        label="Email"
        id="email"
        name="email"
        type="email"
        placeholder="you@example.com"
        value={formData.email}
        onChange={handleChange}
        required
      />

      {/* Password */}
      <FormField
        label="Password"
        id="password"
        name="password"
        type="password"
        placeholder="Enter your password"
        value={formData.password}
        onChange={handleChange}
        required
      />

      {/* Confirm password */}
      <FormField
        label="Confirm password"
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        placeholder="Confirm your password"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
      />

      {/* Submit */}
      <Button
        type="submit"
        variant="primary"
        size="md"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? "Creating account..." : "Register"}
      </Button>
    </form>
  );
}
