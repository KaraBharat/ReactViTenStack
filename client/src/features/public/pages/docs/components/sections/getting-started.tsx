// External imports
import { ArrowRight, GitFork, Star } from "lucide-react";

/**
 * GettingStartedSection Component
 * Renders the Getting Started section of the documentation page
 * Features a comprehensive overview of the full-stack template capabilities
 * and quick access links to GitHub and documentation
 */
export const GettingStartedSection = () => {
  // GitHub repository URL from environment variables
  const githubRepoUrl = import.meta.env.VITE_GITHUB_REPO_URL || "#";

  return (
    <section id="getting-started" className="mb-12">
      {/* Section Header */}
      <h2 className="mb-4 text-2xl font-bold text-neutral-950">
        Getting Started
      </h2>

      {/* Main Content Card */}
      <div className="mb-6 rounded-lg border border-neutral-100 bg-white p-6">
        <h3 className="mb-4 text-lg font-semibold text-neutral-950">
          Modern Full Stack Starter Template
        </h3>
        <p className="mb-4 text-neutral-600">
          A full-stack TypeScript monorepo starter template featuring:
        </p>

        {/* Features Grid */}
        <div className="mb-6 grid gap-6 md:grid-cols-2">
          <div>
            <h4 className="mb-2 font-medium text-neutral-950">Frontend</h4>
            <ul className="list-inside list-disc space-y-1 text-sm text-neutral-600">
              <li>React</li>
              <li>Vite</li>
              <li>TanStack Router, Query & Table</li>
              <li>Shadcn/UI</li>
              <li>Tailwind CSS</li>
            </ul>
          </div>
          <div>
            <h4 className="mb-2 font-medium text-neutral-950">Backend</h4>
            <ul className="list-inside list-disc space-y-1 text-sm text-neutral-600">
              <li>Hono.js</li>
              <li>DrizzleORM</li>
              <li>Neon Database</li>
              <li>TypeScript & Zod</li>
              <li>PNPM Workspaces</li>
            </ul>
          </div>
          <div>
            <h4 className="mb-2 font-medium text-neutral-950">
              Authentication (Basic)
            </h4>
            <ul className="list-inside list-disc space-y-1 text-sm text-neutral-600">
              <li>JWT</li>
              <li>Password Hashing</li>
              <li>Session Management</li>
              <li>Rate Limiting</li>
              <li>Email Verification & Reset Password (Coming Soon)</li>
            </ul>
          </div>
          <div>
            <h4 className="mb-2 font-medium text-neutral-950">Deployment</h4>
            <ul className="list-inside list-disc space-y-1 text-sm text-neutral-600">
              <li>Vercel Edge Functions</li>
              <li>Cloudflare (Coming Soon)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <a
          href="/docs#installation"
          className="inline-flex items-center gap-2 rounded-full bg-neutral-950 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
        >
          Quick Start Guide
          <ArrowRight className="h-4 w-4" />
        </a>
        <a
          href={githubRepoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-neutral-200 px-6 py-2 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-50"
        >
          <GitFork className="h-4 w-4" />
          Fork on GitHub
        </a>
        <a
          href={githubRepoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-neutral-200 px-6 py-2 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-50"
        >
          <Star className="h-4 w-4" />
          Star on GitHub
        </a>
      </div>
    </section>
  );
};
