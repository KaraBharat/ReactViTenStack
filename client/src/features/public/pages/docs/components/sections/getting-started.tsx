// External imports
import { ArrowRight, GitFork, Star } from "lucide-react";

export const GettingStartedSection = () => {
  const githubRepoUrl = import.meta.env.VITE_GITHUB_REPO_URL || "#";

  return (
    <section id="getting-started" className="mb-8 sm:mb-12">
      {/* Section Header */}
      <h2 className="mb-3 text-xl font-bold text-neutral-950 sm:mb-4 sm:text-2xl">
        Getting Started
      </h2>

      {/* Main Content Card */}
      <div className="mb-4 rounded-lg border border-neutral-100 bg-white p-4 sm:mb-6 sm:p-6">
        <h3 className="mb-3 text-base font-semibold text-neutral-950 sm:mb-4 sm:text-lg">
          Modern Full Stack Starter Template
        </h3>
        <p className="mb-4 text-sm text-neutral-600 sm:text-base">
          A full-stack TypeScript monorepo starter template featuring:
        </p>

        {/* Features Grid */}
        <div className="mb-4 grid gap-4 sm:mb-6 sm:grid-cols-1 sm:gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <h4 className="mb-1 font-medium text-neutral-950 sm:mb-2">
              Frontend
            </h4>
            <ul className="list-inside list-disc space-y-1 text-xs text-neutral-600 sm:text-sm">
              <li>React</li>
              <li>Vite</li>
              <li>TanStack Router, Query & Table</li>
              <li>Shadcn/UI</li>
              <li>Tailwind CSS</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="mb-1 font-medium text-neutral-950 sm:mb-2">
              Backend
            </h4>
            <ul className="list-inside list-disc space-y-1 text-xs text-neutral-600 sm:text-sm">
              <li>Hono.js</li>
              <li>DrizzleORM</li>
              <li>Neon Database</li>
              <li>TypeScript & Zod</li>
              <li>PNPM Workspaces</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="mb-1 font-medium text-neutral-950 sm:mb-2">
              Authentication (Basic)
            </h4>
            <ul className="list-inside list-disc space-y-1 text-xs text-neutral-600 sm:text-sm">
              <li>JWT</li>
              <li>Password Hashing</li>
              <li>Session Management</li>
              <li>Rate Limiting</li>
              <li>Email Verification & Reset Password (Coming Soon)</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="mb-1 font-medium text-neutral-950 sm:mb-2">
              Deployment
            </h4>
            <ul className="list-inside list-disc space-y-1 text-xs text-neutral-600 sm:text-sm">
              <li>Vercel Edge Functions</li>
              <li>Cloudflare (Coming Soon)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
        <a
          href="/docs#installation"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-neutral-950 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-neutral-800 sm:px-6 sm:text-sm"
        >
          Quick Start Guide
          <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
        </a>
        <a
          href={githubRepoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-neutral-200 px-4 py-2 text-xs font-medium text-neutral-600 transition-colors hover:bg-neutral-50 sm:px-6 sm:text-sm"
        >
          <GitFork className="h-3 w-3 sm:h-4 sm:w-4" />
          Fork on GitHub
        </a>
        <a
          href={githubRepoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-neutral-200 px-4 py-2 text-xs font-medium text-neutral-600 transition-colors hover:bg-neutral-50 sm:px-6 sm:text-sm"
        >
          <Star className="h-3 w-3 sm:h-4 sm:w-4" />
          Star on GitHub
        </a>
      </div>
    </section>
  );
};
