// External imports
import { FileCode, Database, Globe, AlertCircle } from "lucide-react";

/**
 * ConfigurationSection Component
 * Renders a comprehensive configuration guide section including:
 * - Environment setup instructions
 * - Server configuration details
 * - Client configuration settings
 * - Security notices and best practices
 */
export const ConfigurationSection = () => {
  return (
    <section id="configuration" className="mb-8 sm:mb-12">
      <h2 className="mb-3 text-xl font-bold text-neutral-950 sm:mb-4 sm:text-2xl">
        Configuration
      </h2>

      {/* Environment Setup Section */}
      <div className="mb-4 sm:mb-6">
        <p className="mb-3 text-sm text-neutral-600 sm:mb-4 sm:text-base">
          Configure your environment variables by copying the example file and
          updating the values:
        </p>
        <div className="rounded-lg bg-neutral-950 p-3 sm:p-4">
          <code className="flex items-center gap-2 text-xs text-white sm:text-sm">
            <FileCode className="h-3 w-3 flex-shrink-0 sm:h-4 sm:w-4" />
            .env.example
          </code>
        </div>
      </div>

      {/* Configuration Details Section */}
      <div className="space-y-4 sm:space-y-6">
        {/* Server Configuration Block */}
        <div className="rounded-lg border border-neutral-100 bg-white p-4 sm:p-6">
          <div className="mb-3 flex items-center gap-2 sm:mb-4">
            <Database className="h-4 w-4 flex-shrink-0 text-neutral-600 sm:h-5 sm:w-5" />
            <h3 className="text-base font-semibold text-neutral-950 sm:text-lg">
              Server Configuration
            </h3>
          </div>
          <div className="mb-3 sm:mb-4">
            <code className="block whitespace-pre-wrap rounded-lg bg-neutral-50 p-3 text-xs text-neutral-600 sm:p-4 sm:text-sm">
              {`# Server Configuration
PORT=3000
NODE_ENV=development
API_URL=http://localhost:3000
CLIENT_URL=http://localhost:5173

# Database Configuration (Neon Database)
DATABASE_URL='postgresql://xxxxxxx-xxxxxx:xxxxxxx-xxxxxx@xxxxxxx-xxxxxx.db.neon.tech/xxxxxxx-xxxxxx?sslmode=require'

# Authentication Configuration
JWT_SECRET='xxx-xxx-xxx-xxx-xxx'
AUTH_SECRET_KEY='xxx-xxx-xxx-xxx-xxx'`}
            </code>
          </div>
          <p className="text-xs text-neutral-900 sm:text-sm">
            Configure your database connection strings. Supports Neon PostgreSQL
            Database.
          </p>
        </div>

        {/* Client Configuration Block */}
        <div className="rounded-lg border border-neutral-100 bg-white p-4 sm:p-6">
          <div className="mb-3 flex items-center gap-2 sm:mb-4">
            <Globe className="h-4 w-4 flex-shrink-0 text-neutral-600 sm:h-5 sm:w-5" />
            <h3 className="text-base font-semibold text-neutral-950 sm:text-lg">
              Client Configuration
            </h3>
          </div>
          <div className="mb-3 sm:mb-4">
            <code className="block whitespace-pre-wrap rounded-lg bg-neutral-50 p-3 text-xs text-neutral-600 sm:p-4 sm:text-sm">
              {`# Client Configuration
VITE_API_URL="http://localhost:3000"`}
            </code>
          </div>
          <p className="text-xs text-neutral-600 sm:text-sm">
            Set up your API endpoints and application URLs. The VITE_ prefix
            makes these variables available in the frontend.
          </p>
        </div>

        {/* Security Notice Block */}
        <div className="rounded-lg border border-amber-100 bg-amber-50 p-3 sm:p-4">
          <div className="flex gap-2">
            <AlertCircle className="h-4 w-4 flex-shrink-0 text-amber-600 sm:h-5 sm:w-5" />
            <div>
              <h4 className="text-sm font-medium text-amber-800 sm:text-base">
                Security Notice
              </h4>
              <p className="text-xs text-amber-700 sm:text-sm">
                Never commit your .env file to version control. Make sure it's
                included in your .gitignore file.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
