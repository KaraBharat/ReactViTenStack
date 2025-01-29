// External imports
import { Cloud, GitBranch } from "lucide-react";

/**
 * DeploymentSection Component
 * Renders the deployment documentation section with information about
 * Vercel deployment options and environment setup guidelines
 */
export const DeploymentSection = () => {
  return (
    <section id="deployment" className="mb-12">
      {/* Main Deployment Section Header */}
      <h2 className="mb-4 text-2xl font-bold text-neutral-950">Deployment</h2>

      {/* Vercel Deployment Guide Section */}
      <div className="mb-6 rounded-lg border border-neutral-100 bg-white p-6">
        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-neutral-950">
          <Cloud className="h-5 w-5" />
          Vercel Deployment
        </h3>
        <p className="mb-4 text-neutral-700">
          This project is configured for seamless deployment on Vercel. Both
          applications need to be deployed separately:
        </p>
        <ul className="mb-4 list-inside list-disc space-y-2 text-neutral-700">
          <li>
            Frontend: Deploy the{" "}
            <code className="rounded bg-neutral-100 px-2 py-0.5">client</code>{" "}
            directory as a static site{" "}
            <a
              href="https://vercel.com/docs/frameworks/vite"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 hover:underline"
            >
              <span>View Guide</span>
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </li>
          <li>
            Backend (Hono API): Deploy the{" "}
            <code className="rounded bg-neutral-100 px-2 py-0.5">server</code>{" "}
            directory as an Edge Function{" "}
            <a
              href="https://hono.dev/docs/getting-started/vercel"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 hover:underline"
            >
              <span>View Guide</span>
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </li>
        </ul>
      </div>

      {/* Future Deployment Options Section */}
      <div className="rounded-lg border border-neutral-100 bg-white p-6">
        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-neutral-950">
          <Cloud className="h-5 w-5" />
          Other Deployment Options
        </h3>
        <div className="flex items-center gap-3 rounded-md bg-neutral-50 p-4">
          <div className="flex-1">
            <h4 className="mb-1 font-medium text-neutral-700">Coming Soon</h4>
          </div>
        </div>
      </div>

      {/* Environment Variables Warning Section */}
      <div className="mt-6 rounded-lg border border-yellow-100 bg-yellow-50 p-4">
        <div className="flex items-start gap-2">
          <GitBranch className="h-5 w-5 text-yellow-600" />
          <div>
            <h4 className="font-medium text-yellow-800">Deployment Tip</h4>
            <p className="text-sm text-yellow-700">
              Remember to set up your environment variables in your Vercel
              project settings before deploying.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
