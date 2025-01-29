// External imports
import { Code, Terminal } from "lucide-react";

/**
 * DevelopmentSection Component
 * Renders a documentation section for development setup and configuration
 * Displays build commands, database operations, and server information
 */
export const DevelopmentSection = () => {
  // Command configurations for development setup
  const developmentCommands = [
    {
      label: "Build the project (client & server):",
      command: "pnpm build",
    },
    {
      label: "Generate database migrations:",
      command: "pnpm db:generate",
    },
    {
      label: "Push database migrations:",
      command: "pnpm db:push",
    },
    {
      label: "Start client:",
      command: "pnpm run dev:client",
    },
    {
      label: "Start server:",
      command: "pnpm run dev:server",
    },
  ];

  // Server configurations
  const serverConfigs = [
    {
      label: "Frontend:",
      url: "http://localhost:5173",
    },
    {
      label: "Backend (Hono API):",
      url: "http://localhost:3000",
    },
  ];

  return (
    <section id="development" className="mb-12">
      <h2 className="mb-4 text-2xl font-bold text-neutral-950">
        Running Development
      </h2>

      {/* Development Commands Section */}
      <div className="mb-6 space-y-4">
        {developmentCommands.map(({ label, command }, index) => (
          <div key={index} className="rounded-lg bg-neutral-950 p-4">
            <p className="mb-2 text-sm text-neutral-400">{label}</p>
            <code className="flex items-center gap-2 text-sm text-white">
              <Terminal className="h-4 w-4" />
              {command}
            </code>
          </div>
        ))}
      </div>

      {/* Server Information Section */}
      <div className="rounded-lg border border-neutral-100 bg-white p-6">
        <h3 className="mb-3 text-lg font-semibold text-neutral-950">
          Development Servers
        </h3>
        <ul className="space-y-2 text-neutral-600">
          {serverConfigs.map(({ label, url }, index) => (
            <li key={index} className="flex items-center gap-2">
              <Code className="h-4 w-4" />
              {label}{" "}
              <code className="rounded bg-neutral-100 px-2 py-1">{url}</code>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
