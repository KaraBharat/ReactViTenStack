// Library imports
import { Link } from "@tanstack/react-router";
import { GitBranch } from "lucide-react";

// Internal component imports
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AppLogo } from "@/components/shared/app-logo";
import { LoginForm } from "../components/login-form";
import { TECH_STACK } from "@/features/public/data/tech-stack";
import StackCard from "@/features/public/components/stack-card";

const LoginPage = () => {
  return (
    <main className="relative min-h-screen w-full flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      {/* Left side - Feature showcase */}
      <section className="relative hidden h-full flex-col p-10 text-white dark:border-r lg:flex">
        <div
          className="absolute inset-0 bg-gradient-to-b from-indigo-50 to-white"
          aria-hidden="true"
        />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Link to="/" aria-label="Go to homepage">
            <AppLogo />
          </Link>
        </div>

        <div className="relative z-20 mt-auto">
          <div className="space-y-6">
            <h1 className="text-2xl font-semibold text-neutral-950">
              Welcome Back
            </h1>
            <p className="text-base text-neutral-600">
              Experience the perfect combination of powerful technologies
              designed for modern web development.
            </p>

            {/* Feature highlights */}
            <div className="grid grid-cols-2 gap-4" role="list">
              {TECH_STACK.map((card) => (
                <StackCard compact key={card.title} {...card} />
              ))}
            </div>

            {/* GitHub promotion */}
            <div className="flex items-center gap-2 rounded-lg border border-neutral-100 bg-white p-4 text-sm text-neutral-950">
              <GitBranch className="h-5 w-5" aria-hidden="true" />
              <span>Free and open source on GitHub</span>
            </div>
          </div>
        </div>
      </section>

      {/* Right side - Login form */}
      <section className="px-2 py-10 md:px-8 md:py-0">
        <div className="flex flex-col items-center justify-center gap-4 lg:hidden">
          <Link to="/" aria-label="Go to homepage">
            <AppLogo />
          </Link>
          <Separator className="w-full bg-neutral-100" />
        </div>

        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
          <Card className="border-none shadow-none">
            <CardHeader>
              <CardTitle className="bg-gradient-to-r from-neutral-600 to-neutral-600 bg-clip-text text-2xl text-transparent">
                Welcome back
              </CardTitle>
              <CardDescription>
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LoginForm />
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-center lg:hidden">
          <Link
            to="/"
            className="text-sm text-neutral-600 transition-colors hover:text-neutral-950"
          >
            Back to home
          </Link>
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
