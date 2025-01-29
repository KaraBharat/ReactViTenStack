// External library imports
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

// Internal imports
import { UpdateProfileForm } from "../components/user-profile-form";
import { useUser } from "../queries/users.get.queries";
import { useAuth } from "@/providers/auth.provider";
import { SelectUser } from "@server/src/types/users.types";

/**
 * ProfilePage Component
 *
 * Renders the user profile update page with a form to modify user information.
 * Handles loading states and displays appropriate UI feedback.
 */
const ProfilePage = () => {
  // Authentication context
  const { user } = useAuth();

  // Fetch user data with error handling
  const { data: userData, isLoading } = useUser(user?.id ?? "");

  return (
    <main className="container mx-auto py-8">
      <div className="mx-auto max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Update Profile</CardTitle>
            <CardDescription>
              Change your display name and manage your profile settings.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <LoadingState />
            ) : (
              userData && (
                <UpdateProfileForm
                  user={userData.data as SelectUser}
                  aria-label="Profile update form"
                />
              )
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

/**
 * LoadingState Component
 *
 * Displays skeleton loading UI while data is being fetched
 */
const LoadingState = () => (
  <div
    className="flex flex-col gap-4"
    role="status"
    aria-label="Loading profile data"
  >
    <Skeleton className="h-8 w-[200px]" />
    <Skeleton className="h-8 w-full" />
  </div>
);

export default ProfilePage;
