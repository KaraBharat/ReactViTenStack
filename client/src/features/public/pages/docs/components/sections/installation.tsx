// External imports
import { Terminal, Check } from "lucide-react";

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
    <section id="installation" className="mb-8 sm:mb-12">
      <h2 className="mb-3 text-xl font-bold text-neutral-950 sm:mb-4 sm:text-2xl">
        Installation
      </h2>

      {/* Prerequisites Section */}
      <div className="mb-4 rounded-lg border border-neutral-100 bg-white p-4 sm:mb-6 sm:p-6">
        <h3 className="mb-3 text-base font-semibold text-neutral-950 sm:mb-4 sm:text-lg">
          Prerequisites
        </h3>
        <ul className="mb-3 grid gap-2 text-sm text-neutral-950 sm:mb-4 sm:gap-3 sm:text-base">
          {prerequisites.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <Check className="h-4 w-4 flex-shrink-0 sm:h-5 sm:w-5" />
              <span className="break-words">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Installation Commands Section */}
      <div className="space-y-3 sm:space-y-4">
        {installationSteps.map(({ description, command }) => (
          <div key={command} className="rounded-lg bg-neutral-950 p-3 sm:p-4">
            <p className="mb-1.5 text-xs text-neutral-400 sm:mb-2 sm:text-sm">
              {description}
            </p>
            <code className="flex items-center gap-2 break-all text-xs text-white sm:break-normal sm:text-sm">
              <Terminal className="h-3 w-3 flex-shrink-0 sm:h-4 sm:w-4" />
              {command}
            </code>
          </div>
        ))}
      </div>
    </section>
  );
};
