// External imports
import { FolderTree, FileCode, Package } from "lucide-react";

/**
 * ProjectStructureSection Component
 * Displays the project's directory structure and organization
 * Includes main structure, frontend, and backend architecture
 * Features a callout section highlighting key organizational aspects
 */
export const ProjectStructureSection = () => {
  return (
    <section id="project-structure" className="mb-12">
      {/* Section Header */}
      <h2 className="mb-4 text-2xl font-bold text-neutral-950">
        Project Structure
      </h2>

      {/* Project Overview Description */}
      <div className="mb-6">
        <p className="text-neutral-600">
          This project follows a monorepo structure using PNPM workspaces,
          organizing the codebase into three main packages:
        </p>
      </div>

      {/* Main Project Structure Section */}
      <div className="mb-8 rounded-lg border border-neutral-100 bg-white p-6">
        <div className="mb-4 flex items-center gap-2">
          <FolderTree className="h-5 w-5 text-neutral-600" />
          <h3 className="font-semibold text-neutral-950">Main Structure</h3>
        </div>
        <pre className="overflow-x-auto rounded-lg bg-neutral-50 p-4 text-sm text-neutral-600">
          {`project-root/
├── client/           # Vite React frontend application
├── server/           # Hono.js, Drizzle ORM and NeonDB backend API
└── package.json      # Root workspace configuration`}
        </pre>
      </div>

      {/* Frontend Architecture Section */}
      <div className="mb-8 rounded-lg border border-neutral-100 bg-white p-6">
        <div className="mb-4 flex items-center gap-2">
          <FileCode className="h-5 w-5 text-neutral-600" />
          <h3 className="font-semibold text-neutral-950">Frontend Structure</h3>
        </div>
        <pre className="overflow-x-auto rounded-lg bg-neutral-50 p-4 text-sm text-neutral-600">
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
      <div className="mb-8 rounded-lg border border-neutral-100 bg-white p-6">
        <div className="mb-4 flex items-center gap-2">
          <Package className="h-5 w-5 text-neutral-600" />
          <h3 className="font-semibold text-neutral-950">Backend Structure</h3>
        </div>
        <pre className="overflow-x-auto rounded-lg bg-neutral-50 p-4 text-sm text-neutral-600">
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
      <div className="rounded-lg border border-amber-100 bg-amber-50 p-4">
        <h4 className="mb-2 font-medium text-amber-900">
          Key Organization Features
        </h4>
        <ul className="list-inside list-disc space-y-1 text-sm text-amber-700">
          <li>Feature-based organization for scalability</li>
          <li>Clear separation of concerns between frontend and backend</li>
          <li>Modular component architecture</li>
          <li>Organized routing structure</li>
        </ul>
      </div>
    </section>
  );
};
