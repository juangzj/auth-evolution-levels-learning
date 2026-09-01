export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: "USER" | "ADMIN";
}

export type UserData = User;
