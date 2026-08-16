import { useState } from "react";
import axios from "axios";

import { Button } from "../../button/Button";
import { FormField } from "../../formField/FormField";
import { Alert } from "../../alert/Alert";

import { register } from "../../../services/user/userService";
import type { UserData } from "../../../types/user";

export function RegisterForm() {
  const [formData, setFormData] = useState<UserData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const [message, setMessage] = useState("");

  const [messageType, setMessageType] = useState<"success" | "error" | null>(
    null,
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    // Remove previous message when user starts editing again
    setMessage("");
    setMessageType(null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);
    setMessage("");
    setMessageType(null);

    try {
      await register(formData);

      setMessage("Account created successfully.");
      setMessageType("success");

      // Clear form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      setMessageType("error");

      if (axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
          setMessage("This email is already registered.");
        } else {
          setMessage("Something went wrong. Please try again.");
        }
      } else {
        setMessage("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Feedback */}
      {message && messageType && <Alert type={messageType} message={message} />}

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
