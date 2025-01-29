// External library imports
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

// Internal component imports
import { ChangePasswordForm } from "../components/change-password-form";

/**
 * ChangePasswordPage Component
 *
 * A page component that provides users with the ability to change their password
 * through a secure form interface. The component is wrapped in a card layout
 * for consistent styling and better user experience.
 */
const ChangePasswordPage = () => {
  return (
    <main
      className="container mx-auto py-8"
      role="main"
      aria-labelledby="change-password-title"
    >
      <div className="mx-auto max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle id="change-password-title">Change Password</CardTitle>
            <CardDescription>
              Change your password to keep your account secure.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChangePasswordForm />
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default ChangePasswordPage;
