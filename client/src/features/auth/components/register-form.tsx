// External UI Component Imports
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { AlertCircle, Loader2 } from "lucide-react";

// Local Hooks
import useRegister from "../hooks/use-register";

/**
 * RegisterForm Component
 *
 * Renders a registration form with fields for name, email, and password.
 * Handles form submission and displays loading/error states.
 */
export const RegisterForm = () => {
  const { form, onSubmit, error, isLoading } = useRegister();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
        noValidate
        aria-label="Registration form"
      >
        {/* Full Name Field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-neutral-600">Full Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="John Doe"
                  type="text"
                  autoComplete="name"
                  className="rounded-lg border-neutral-200 focus:border-neutral-500 focus:ring-neutral-500"
                  aria-required="true"
                  {...field}
                />
              </FormControl>
              <FormMessage role="alert" />
            </FormItem>
          )}
        />

        {/* Email Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-neutral-600">Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="name@example.com"
                  type="email"
                  autoComplete="email"
                  className="rounded-lg border-neutral-200 focus:border-neutral-500 focus:ring-neutral-500"
                  aria-required="true"
                  {...field}
                />
              </FormControl>
              <FormMessage role="alert" />
            </FormItem>
          )}
        />

        {/* Password Fields Container */}
        <div className="grid gap-4 sm:grid-cols-1">
          {/* Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-neutral-600">Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Create a password"
                    type="password"
                    autoComplete="new-password"
                    className="rounded-lg border-neutral-200 focus:border-neutral-500 focus:ring-neutral-500"
                    aria-required="true"
                    {...field}
                  />
                </FormControl>
                <FormMessage role="alert" />
              </FormItem>
            )}
          />

          {/* Confirm Password Field */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-neutral-600">
                  Confirm Password
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Confirm your password"
                    type="password"
                    autoComplete="new-password"
                    className="rounded-lg border-neutral-200 focus:border-neutral-500 focus:ring-neutral-500"
                    aria-required="true"
                    {...field}
                  />
                </FormControl>
                <FormMessage role="alert" />
              </FormItem>
            )}
          />
        </div>

        {/* Submit Button */}
        <Button
          className="w-full bg-neutral-950 text-white transition-all hover:bg-neutral-800"
          type="submit"
          disabled={isLoading}
          aria-busy={isLoading}
        >
          {isLoading && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
          )}
          Create Account
        </Button>

        {/* Error Message Display */}
        {error && (
          <div
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-50 p-2 text-red-500"
            role="alert"
            aria-live="polite"
          >
            <AlertCircle className="size-4" aria-hidden="true" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {/* Sign In Link */}
        <div className="flex items-center justify-center gap-2 text-sm text-neutral-600">
          <p className="text-sm font-medium">Already have an account?</p>
          <Link
            to="/login"
            search={{ redirect: "/dashboard" }}
            className="font-medium text-neutral-600 transition-colors hover:text-neutral-700"
          >
            Sign in
          </Link>
        </div>
      </form>
    </Form>
  );
};
