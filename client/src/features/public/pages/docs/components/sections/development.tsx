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
    <section id="development" className="mb-8 sm:mb-12">
      <h2 className="mb-3 text-xl font-bold text-neutral-950 sm:mb-4 sm:text-2xl">
        Running Development
      </h2>

      {/* Development Commands Section */}
      <div className="mb-4 space-y-3 sm:mb-6 sm:space-y-4">
        {developmentCommands.map(({ label, command }, index) => (
          <div key={index} className="rounded-lg bg-neutral-950 p-3 sm:p-4">
            <p className="mb-1.5 text-xs text-neutral-400 sm:mb-2 sm:text-sm">
              {label}
            </p>
            <code className="flex items-center gap-2 break-all text-xs text-white sm:break-normal sm:text-sm">
              <Terminal className="h-3 w-3 flex-shrink-0 sm:h-4 sm:w-4" />
              {command}
            </code>
          </div>
        ))}
      </div>

      {/* Server Information Section */}
      <div className="rounded-lg border border-neutral-100 bg-white p-4 sm:p-6">
        <h3 className="mb-3 text-base font-semibold text-neutral-950 sm:mb-4 sm:text-lg">
          Development Servers
        </h3>
        <ul className="space-y-2 text-neutral-600 sm:space-y-3">
          {serverConfigs.map(({ label, url }, index) => (
            <li
              key={index}
              className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2"
            >
              <div className="flex items-center gap-2">
                <Code className="h-3 w-3 flex-shrink-0 sm:h-4 sm:w-4" />
                <span className="text-sm sm:text-base">{label}</span>
              </div>
              <code className="break-all rounded bg-neutral-100 px-2 py-1 font-mono text-xs sm:break-normal sm:text-sm">
                {url}
              </code>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
