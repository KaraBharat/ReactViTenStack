// External imports
import { Package, Terminal } from "lucide-react";

/**
 * PackageManagementSection Component
 * Displays comprehensive PNPM workspace management instructions
 * Includes workspace setup, package installation commands, and best practices
 */
export const PackageManagementSection = () => {
  return (
    <section id="package-management" className="mb-12">
      <h2 className="mb-4 text-2xl font-bold text-neutral-950">
        Package Management (PNPM)
      </h2>

      {/* PNPM Overview */}
      <div className="mb-6">
        <p className="text-neutral-600">
          This project utilizes PNPM workspaces for efficient monorepo package
          management. Here's a comprehensive guide on managing dependencies
          across workspaces:
        </p>
      </div>

      {/* Workspace Configuration */}
      <div className="mb-8 rounded-lg border border-neutral-100 bg-white p-6">
        <div className="mb-4 flex items-center gap-2">
          <Package className="h-5 w-5 text-neutral-600" />
          <h3 className="font-semibold text-neutral-950">Workspace Setup</h3>
        </div>
        <pre className="mb-4 overflow-x-auto rounded-lg bg-neutral-50 p-4 text-sm text-neutral-600">
          {`# pnpm-workspace.yaml
packages:
  - 'client'
  - 'server'`}
        </pre>
        <p className="text-sm text-neutral-600">
          The workspace configuration defines the project structure and package
          relationships.
        </p>
      </div>

      {/* Package Installation Commands */}
      <div className="space-y-6">
        {/* Root Workspace Commands */}
        <div className="rounded-lg border border-neutral-100 bg-white p-6">
          <div className="mb-4 flex items-center gap-2">
            <Terminal className="h-5 w-5 text-neutral-600" />
            <h3 className="font-semibold text-neutral-950">
              Root Workspace Commands
            </h3>
          </div>
          <pre className="overflow-x-auto rounded-lg bg-neutral-50 p-4 text-sm text-neutral-600">
            {`# Install in root workspace
pnpm add -D [package-name] --workspace-root

# Install multiple packages
pnpm add -D [package-name-1] [package-name-2] --workspace-root

# Remove package
pnpm remove [package-name] --workspace-root`}
          </pre>
        </div>

        {/* Client Package Commands */}
        <div className="rounded-lg border border-neutral-100 bg-white p-6">
          <div className="mb-4 flex items-center gap-2">
            <Terminal className="h-5 w-5 text-neutral-600" />
            <h3 className="font-semibold text-neutral-950">
              Client Package Commands
            </h3>
          </div>
          <pre className="overflow-x-auto rounded-lg bg-neutral-50 p-4 text-sm text-neutral-600">
            {`# Install in client workspace
pnpm add [package-name] --filter client

# Install specific version
pnpm add [package-name]@[version] --filter client

# Install as devDependency
pnpm add -D [package-name] --filter client`}
          </pre>
        </div>

        {/* Server Package Commands */}
        <div className="rounded-lg border border-neutral-100 bg-white p-6">
          <div className="mb-4 flex items-center gap-2">
            <Terminal className="h-5 w-5 text-neutral-600" />
            <h3 className="font-semibold text-neutral-950">
              Server Package Commands
            </h3>
          </div>
          <pre className="overflow-x-auto rounded-lg bg-neutral-50 p-4 text-sm text-neutral-600">
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
