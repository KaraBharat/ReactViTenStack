// Library imports
import { AlertCircle, Loader2 } from "lucide-react";
import { Link } from "@tanstack/react-router";

// UI Component imports
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

// Hooks
import { useLogin } from "../hooks/use-login";

// Common styles
const inputStyles =
  "rounded-lg border-neutral-200 focus:border-neutral-500 focus:ring-neutral-500";

/**
 * LoginForm Component
 * Renders a form for user authentication with email and password fields
 */
export const LoginForm = () => {
  const { form, onSubmit, isLoading, error } = useLogin();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
        aria-label="Login form"
      >
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
                  className={inputStyles}
                  aria-label="Email address"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-neutral-600">Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your password"
                  type="password"
                  autoComplete="current-password"
                  className={inputStyles}
                  aria-label="Password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          className="w-full bg-neutral-950 text-white hover:bg-neutral-800"
          type="submit"
          disabled={isLoading}
          aria-busy={isLoading}
        >
          {isLoading && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
          )}
          Sign In
        </Button>

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

        <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
          <p className="text-sm font-medium">Don't have an account?</p>
          <Link
            to="/register"
            className="font-medium text-neutral-600 transition-colors hover:text-neutral-700"
          >
            Sign Up
          </Link>
        </div>
      </form>
    </Form>
  );
};
