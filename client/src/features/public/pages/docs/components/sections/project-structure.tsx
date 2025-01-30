// External imports
import { FolderTree, FileCode, Package } from "lucide-react";

/**
 * ProjectStructureSection Component
 * Displays the project's directory structure and organization
 * Includes main structure, frontend, and backend architecture
 */
export const ProjectStructureSection = () => {
  return (
    <section id="project-structure" className="mb-8 sm:mb-12">
      {/* Section Header */}
      <h2 className="mb-3 text-xl font-bold text-neutral-950 sm:mb-4 sm:text-2xl">
        Project Structure
      </h2>

      {/* Project Overview Description */}
      <div className="mb-4 sm:mb-6">
        <p className="text-sm text-neutral-600 sm:text-base">
          This project follows a monorepo structure using PNPM workspaces,
          organizing the codebase into three main packages:
        </p>
      </div>

      {/* Main Project Structure Section */}
      <div className="mb-6 rounded-lg border border-neutral-100 bg-white p-4 sm:mb-8 sm:p-6">
        <div className="mb-3 flex items-center gap-2 sm:mb-4">
          <FolderTree className="h-4 w-4 flex-shrink-0 text-neutral-600 sm:h-5 sm:w-5" />
          <h3 className="text-base font-semibold text-neutral-950 sm:text-lg">
            Main Structure
          </h3>
        </div>
        <pre className="scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-track-neutral-100 overflow-x-auto rounded-lg bg-neutral-50 p-3 text-xs text-neutral-600 sm:p-4 sm:text-sm">
          {`project-root/
├── client/           # Vite React frontend application
├── server/           # Hono.js, Drizzle ORM and NeonDB backend API
└── package.json      # Root workspace configuration`}
        </pre>
      </div>

      {/* Frontend Architecture Section */}
      <div className="mb-6 rounded-lg border border-neutral-100 bg-white p-4 sm:mb-8 sm:p-6">
        <div className="mb-3 flex items-center gap-2 sm:mb-4">
          <FileCode className="h-4 w-4 flex-shrink-0 text-neutral-600 sm:h-5 sm:w-5" />
          <h3 className="text-base font-semibold text-neutral-950 sm:text-lg">
            Frontend Structure
          </h3>
        </div>
        <pre className="scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-track-neutral-100 overflow-x-auto rounded-lg bg-neutral-50 p-3 text-xs text-neutral-600 sm:p-4 sm:text-sm">
          {`client/
├── src/
│   ├── components/   # Reusable UI components
│   ├── features/     # Feature-based modules
│   │   ├── auth/     # Authentication
│   │   ├── dashboard/# Dashboard features
│   │   └── public/   # Public pages
│   ├── lib/         # Utilities and configurations
│   ├── providers/   # Context providers
│   └── routes/      # TanStack router setup
│   	│   __root.tsx
│       │   ├───(app)
│       │   ├───(auth)
│       │   └───(public)
└── package.json`}
        </pre>
      </div>

      {/* Backend Architecture Section */}
      <div className="mb-6 rounded-lg border border-neutral-100 bg-white p-4 sm:mb-8 sm:p-6">
        <div className="mb-3 flex items-center gap-2 sm:mb-4">
          <Package className="h-4 w-4 flex-shrink-0 text-neutral-600 sm:h-5 sm:w-5" />
          <h3 className="text-base font-semibold text-neutral-950 sm:text-lg">
            Backend Structure
          </h3>
        </div>
        <pre className="scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-track-neutral-100 overflow-x-auto rounded-lg bg-neutral-50 p-3 text-xs text-neutral-600 sm:p-4 sm:text-sm">
          {`server/
├── src/
│   ├── database/    # Database configuration & schemas
│   ├── routes/      # API route handlers
│   ├── services/    # Business logic
│   ├── middleware/  # Custom middleware
│   └── types/       # Type definitions
└── package.json`}
        </pre>
      </div>

      {/* Key Features Summary Section */}
      <div className="rounded-lg border border-amber-100 bg-amber-50 p-3 sm:p-4">
        <h4 className="mb-2 text-sm font-medium text-amber-900 sm:text-base">
          Key Organization Features
        </h4>
        <ul className="list-inside list-disc space-y-1 text-xs text-amber-700 sm:text-sm">
          <li>Feature-based organization for scalability</li>
          <li>Clear separation of concerns between frontend and backend</li>
          <li>Modular component architecture</li>
          <li>Organized routing structure</li>
        </ul>
      </div>
    </section>
  );
};
