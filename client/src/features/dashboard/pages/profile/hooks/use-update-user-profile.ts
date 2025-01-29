// External imports
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

// Internal imports
import { useUpdateUserProfile } from "../queries/users.update.queries";
import { updateProfileSchema } from "../schemas/user-profile.schema";
import { SelectUser } from "@server/src/types/users.types";

type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;

interface UseUpdateProfileProps {
  user: SelectUser;
}

/**
 * Custom hook to manage user profile updates
 * Handles form state, validation, and profile update mutation
 * @param {UseUpdateProfileProps} props - Contains user data
 * @returns Form controls, submit handler, and loading state
 */
export const useUpdateProfile = ({ user }: UseUpdateProfileProps) => {
  const updateProfileMutation = useUpdateUserProfile();

  const form = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: user?.name ?? "", // Using nullish coalescing operator for better null handling
    },
  });

  /**
   * Handles the profile update submission
   * Shows success/error notifications based on the operation result
   */
  const onSubmit = async (data: UpdateProfileFormData) => {
    try {
      await updateProfileMutation.mutateAsync({
        id: user?.id,
        name: data.name,
      });

      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  return {
    form,
    onSubmit,
    isLoading: updateProfileMutation.isPending,
  };
};
