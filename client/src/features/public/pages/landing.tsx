import { Link } from "@tanstack/react-router";
import {
  Code,
  Rocket,
  Settings,
  ArrowRight,
  Shield,
  GitBranch,
} from "lucide-react";
import { FeatureCard } from "../components/feature-card";
import { TECH_STACK } from "../data/tech-stack";
import StackCard from "../components/stack-card";

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="w-full border-b border-neutral-100 bg-gradient-to-b from-indigo-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 flex gap-2">
              <Rocket className="h-12 w-12 text-neutral-950" />
            </div>
            <h1 className="mb-6 bg-gradient-to-r from-stone-950 to-neutral-950 bg-clip-text text-5xl font-bold text-transparent sm:text-6xl">
              Modern Full-Stack
              <br />
              Starter Template
            </h1>
            <p className="mb-8 max-w-2xl text-xl text-gray-600">
              Ready to use stack featuring Vite, React, TanStack, Shadcn, and
              more.
            </p>
            <div className="flex gap-4">
              <Link
                to="/docs"
                className="flex items-center gap-2 rounded-full bg-neutral-950 px-6 py-3 text-white transition hover:bg-neutral-900"
              >
                Get Started <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={import.meta.env.VITE_GITHUB_REPO_URL || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full border border-gray-300 px-6 py-3 transition hover:bg-gray-50"
              >
                View on GitHub <GitBranch className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
            Powered by featured stack
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {TECH_STACK.map((item, index) => (
              <StackCard key={index} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="bg-gradient-to-b from-neutral-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-neutral-950">
              Everything You Need
            </h2>
            <p className="mx-auto max-w-2xl text-neutral-600">
              A complete development environment with all the features you need
              to build modern web applications.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Code,
                title: "Type-Safe Development",
                description:
                  "Full TypeScript support with Zod validation for end-to-end type safety",
              },
              {
                icon: Shield,
                title: "Authentication Ready",
                description:
                  "Secure authentication system with custom email and password based login",
              },
              {
                icon: Settings,
                title: "Easy Configuration",
                description:
                  "Simple environment setup with comprehensive documentation",
              },
            ].map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
