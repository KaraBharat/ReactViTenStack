// External library imports
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

// Internal imports
import { useUpdateProfile } from "../hooks/use-update-user-profile";
import { SelectUser } from "@server/src/types/users.types";

// Interface definitions
interface UpdateProfileFormProps {
  user: SelectUser;
}

/**
 * UpdateProfileForm Component
 *
 * A form component that allows users to update their profile information.
 * Currently handles display name updates with proper form validation and loading states.
 *
 * @param {UpdateProfileFormProps} props - Component props containing user data
 */
export const UpdateProfileForm = ({ user }: UpdateProfileFormProps) => {
  const { form, onSubmit, isLoading } = useUpdateProfile({ user });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
        aria-label="Update Profile Form"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="display-name">Display Name</FormLabel>
              <FormControl>
                <Input
                  id="display-name"
                  className="w-full"
                  placeholder="Enter your display name"
                  aria-label="Display Name"
                  aria-required="true"
                  {...field}
                />
              </FormControl>
              <FormMessage role="alert" />
            </FormItem>
          )}
        />
        <Button
          className="bg-neutral-950 text-white transition-colors duration-200 hover:bg-neutral-800"
          type="submit"
          disabled={isLoading}
          aria-busy={isLoading}
        >
          {isLoading ? "Updating..." : "Update Profile"}
        </Button>
      </form>
    </Form>
  );
};
