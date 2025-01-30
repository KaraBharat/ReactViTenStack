// External library imports
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
    <main className="max-w-2xl" role="main">
      <section className="mb-8">
        <header className="mb-8">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold text-neutral-950">
              Update Profile
            </h1>
          </div>
          <p className="text-sm text-neutral-500">
            Change your display name and manage your profile settings.
          </p>
        </header>
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
      </section>
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
