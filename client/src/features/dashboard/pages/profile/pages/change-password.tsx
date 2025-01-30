// Internal component imports
import { ChangePasswordForm } from "../components/change-password-form";

/**
 * ChangePasswordPage Component
 *
 * A page component that provides users with the ability to change their password
 * through a secure form interface.
 */
const ChangePasswordPage = () => {
  return (
    <main className="max-w-2xl" role="main">
      <section className="mb-8">
        <header className="mb-8">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold text-neutral-950">
              Change Password
            </h1>
          </div>
          <p className="text-sm text-neutral-500">
            Change your password to keep your account secure.
          </p>
        </header>
        <ChangePasswordForm />
      </section>
    </main>
  );
};

export default ChangePasswordPage;
