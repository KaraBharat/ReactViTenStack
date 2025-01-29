// External imports
import { Terminal, Check } from "lucide-react";

/**
 * InstallationSection Component
 * Renders the installation instructions section including prerequisites
 * and command-line setup steps for the ReactViTenStack project
 */
export const InstallationSection = () => {
  // List of prerequisites for the project setup
  const prerequisites = [
    "Node.js 20+",
    "PNPM 9+",
    "NeonDB account (Postgres SQL)",
    "Vercel account (Deployment)",
  ];

  // Installation commands with their descriptions
  const installationSteps = [
    {
      description: "Clone the repository:",
      command: "git clone https://github.com/KaraBharat/ReactViTenStack.git",
    },
    {
      description: "Install dependencies:",
      command: "pnpm install",
    },
  ];

  return (
    <section id="installation" className="mb-12">
      <h2 className="mb-4 text-2xl font-bold text-neutral-950">Installation</h2>

      {/* Prerequisites Section */}
      <div className="mb-6 rounded-lg border border-neutral-100 bg-white p-6">
        <h3 className="mb-4 text-lg font-semibold text-neutral-950">
          Prerequisites
        </h3>
        <ul className="mb-4 grid gap-3 text-neutral-950">
          {prerequisites.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <Check className="h-5 w-5" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Installation Commands Section */}
      <div className="space-y-4">
        {installationSteps.map(({ description, command }) => (
          <div key={command} className="rounded-lg bg-neutral-950 p-4">
            <p className="mb-2 text-sm text-neutral-400">{description}</p>
            <code className="flex items-center gap-2 text-sm text-white">
              <Terminal className="h-4 w-4" />
              {command}
            </code>
          </div>
        ))}
      </div>
    </section>
  );
};
