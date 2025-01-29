// External imports
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

// Internal imports
import { useAuth } from "@/providers/auth.provider";
import { changePasswordSchema } from "../schemas/user-profile.schema";
import { useUpdatePassword } from "@/features/auth/queries/auth.update.queries";

type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

/**
 * Custom hook to handle password change functionality
 * Manages form state, validation, and password update mutation
 * @returns Object containing form controls, submission handler, and status flags
 */
export const useChangePassword = () => {
  // Form submission states
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { user } = useAuth();
  const updatePasswordMutation = useUpdatePassword();

  // Initialize form with zod schema validation
  const form = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  /**
   * Handles the password change form submission
   * Updates the password and manages the submission state
   */
  const onSubmit = async (data: ChangePasswordFormData) => {
    setIsSubmitted(false);

    try {
      const response = await updatePasswordMutation.mutateAsync({
        id: user?.id ?? "",
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });

      setIsSuccess(response.success);
      setIsSubmitted(true);
      toast.success("Password updated successfully");
      form.reset();
    } catch (error) {
      toast.error("Failed to update password");
      setIsSuccess(false);
      setIsSubmitted(true);
    }
  };

  return {
    form,
    onSubmit,
    isPending: updatePasswordMutation.isPending,
    isSuccess,
    isSubmitted,
  };
};
