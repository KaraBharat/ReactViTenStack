// External imports
import { Package, Terminal } from "lucide-react";

/**
 * PackageManagementSection Component
 * Displays comprehensive PNPM workspace management instructions
 * Includes workspace setup, package installation commands, and best practices
 */
export const PackageManagementSection = () => {
  return (
    <section id="package-management" className="mb-8 sm:mb-12">
      <h2 className="mb-3 text-xl font-bold text-neutral-950 sm:mb-4 sm:text-2xl">
        Package Management (PNPM)
      </h2>

      {/* PNPM Overview */}
      <div className="mb-4 sm:mb-6">
        <p className="text-sm text-neutral-600 sm:text-base">
          This project utilizes PNPM workspaces for efficient monorepo package
          management. Here's a comprehensive guide on managing dependencies
          across workspaces:
        </p>
      </div>

      {/* Workspace Configuration */}
      <div className="mb-6 rounded-lg border border-neutral-100 bg-white p-4 sm:mb-8 sm:p-6">
        <div className="mb-3 flex items-center gap-2 sm:mb-4">
          <Package className="h-4 w-4 flex-shrink-0 text-neutral-600 sm:h-5 sm:w-5" />
          <h3 className="text-base font-semibold text-neutral-950 sm:text-lg">
            Workspace Setup
          </h3>
        </div>
        <pre className="mb-3 overflow-x-auto rounded-lg bg-neutral-50 p-3 text-xs text-neutral-600 sm:mb-4 sm:p-4 sm:text-sm">
          {`# pnpm-workspace.yaml
packages:
  - 'client'
  - 'server'`}
        </pre>
        <p className="text-xs text-neutral-600 sm:text-sm">
          The workspace configuration defines the project structure and package
          relationships.
        </p>
      </div>

      {/* Package Installation Commands */}
      <div className="space-y-4 sm:space-y-6">
        {/* Root Workspace Commands */}
        <div className="rounded-lg border border-neutral-100 bg-white p-4 sm:p-6">
          <div className="mb-3 flex items-center gap-2 sm:mb-4">
            <Terminal className="h-4 w-4 flex-shrink-0 text-neutral-600 sm:h-5 sm:w-5" />
            <h3 className="text-base font-semibold text-neutral-950 sm:text-lg">
              Root Workspace Commands
            </h3>
          </div>
          <pre className="overflow-x-auto rounded-lg bg-neutral-50 p-3 text-xs text-neutral-600 sm:p-4 sm:text-sm">
            {`# Install in root workspace
pnpm add -D [package-name] --workspace-root

# Install multiple packages
pnpm add -D [package-name-1] [package-name-2] --workspace-root

# Remove package
pnpm remove [package-name] --workspace-root`}
          </pre>
        </div>

        {/* Client Package Commands */}
        <div className="rounded-lg border border-neutral-100 bg-white p-4 sm:p-6">
          <div className="mb-3 flex items-center gap-2 sm:mb-4">
            <Terminal className="h-4 w-4 flex-shrink-0 text-neutral-600 sm:h-5 sm:w-5" />
            <h3 className="text-base font-semibold text-neutral-950 sm:text-lg">
              Client Package Commands
            </h3>
          </div>
          <pre className="overflow-x-auto rounded-lg bg-neutral-50 p-3 text-xs text-neutral-600 sm:p-4 sm:text-sm">
            {`# Install in client workspace
pnpm add [package-name] --filter client

# Install specific version
pnpm add [package-name]@[version] --filter client

# Install as devDependency
pnpm add -D [package-name] --filter client`}
          </pre>
        </div>

        {/* Server Package Commands */}
        <div className="rounded-lg border border-neutral-100 bg-white p-4 sm:p-6">
          <div className="mb-3 flex items-center gap-2 sm:mb-4">
            <Terminal className="h-4 w-4 flex-shrink-0 text-neutral-600 sm:h-5 sm:w-5" />
            <h3 className="text-base font-semibold text-neutral-950 sm:text-lg">
              Server Package Commands
            </h3>
          </div>
          <pre className="scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-track-neutral-100 overflow-x-auto rounded-lg bg-neutral-50 p-3 text-xs text-neutral-600 sm:p-4 sm:text-sm">
            {`# Install in server workspace
pnpm add [package-name] --filter server

# Install specific version
pnpm add [package-name]@[version] --filter server

# Install as devDependency
pnpm add -D [package-name] --filter server`}
          </pre>
        </div>
      </div>
    </section>
  );
};
