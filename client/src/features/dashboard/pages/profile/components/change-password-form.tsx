// External library imports
import { AlertCircle, CheckCircle } from "lucide-react";

// UI Component imports
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Hook imports
import { useChangePassword } from "../hooks/use-change-password";

// Constants
const FORM_FIELDS = [
  {
    name: "currentPassword" as const,
    label: "Current Password",
    placeholder: "Enter your current password",
    autoComplete: "current-password",
  },
  {
    name: "newPassword" as const,
    label: "New Password",
    placeholder: "Enter your new password",
    autoComplete: "new-password",
  },
  {
    name: "confirmPassword" as const,
    label: "Confirm Password",
    placeholder: "Confirm your new password",
    autoComplete: "new-password",
  },
] as const;

interface StatusMessageProps {
  isSuccess: boolean;
  message: string;
}

/**
 * Displays status message with appropriate styling and icon
 */
const StatusMessage = ({ isSuccess, message }: StatusMessageProps) => (
  <div
    className={`flex w-full items-center justify-center gap-2 rounded-lg p-2 ${
      isSuccess ? "bg-green-50 text-green-500" : "bg-red-50 text-red-500"
    }`}
    role="alert"
    aria-live="polite"
  >
    {isSuccess ? (
      <CheckCircle className="size-4" aria-hidden="true" />
    ) : (
      <AlertCircle className="size-4" aria-hidden="true" />
    )}
    <p className="text-sm font-medium">{message}</p>
  </div>
);

/**
 * ChangePasswordForm Component
 * Handles password change functionality with form validation and status feedback
 */
export const ChangePasswordForm = () => {
  const { form, onSubmit, isPending, isSuccess, isSubmitted } =
    useChangePassword();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
        aria-label="Change Password Form"
      >
        {/* Password Input Fields */}
        {FORM_FIELDS.map(({ name, label, placeholder, autoComplete }) => (
          <FormField
            key={name}
            control={form.control}
            name={name}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={name}>{label}</FormLabel>
                <FormControl>
                  <Input
                    id={name}
                    className="w-full"
                    type="password"
                    autoComplete={autoComplete}
                    placeholder={placeholder}
                    aria-required="true"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        {/* Status Messages */}
        {isSubmitted && (
          <StatusMessage
            isSuccess={isSuccess}
            message={
              isSuccess
                ? "Password updated successfully"
                : "Failed to update password"
            }
          />
        )}

        {/* Submit Button */}
        <Button
          className="bg-neutral-950 text-white hover:bg-neutral-800"
          type="submit"
          disabled={isPending}
          aria-busy={isPending}
        >
          {isPending ? "Updating..." : "Change Password"}
        </Button>
      </form>
    </Form>
  );
};
