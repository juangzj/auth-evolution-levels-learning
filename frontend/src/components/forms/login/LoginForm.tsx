import { Button } from "../../button/Button";
import { FormField } from "../../formField/FormField";

export function LoginForm() {
  return (
    <form className="space-y-5">
      {/* Email */}
      <FormField
        label="Email"
        id="email"
        name="email"
        type="email"
        placeholder="you@example.com"
        required
      />

      {/* Password */}
      <FormField
        label="Password"
        id="password"
        name="password"
        type="password"
        placeholder="Enter your password"
        required
      />
      {/* Submit */}
      <Button type="submit" variant="primary" size="md" className="w-full">
        Register
      </Button>
    </form>
  );
}
