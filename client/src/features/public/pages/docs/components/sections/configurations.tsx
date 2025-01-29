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
    <section id="configuration" className="mb-12">
      <h2 className="mb-4 text-2xl font-bold text-neutral-950">
        Configuration
      </h2>

      {/* Environment Setup Section */}
      <div className="mb-6">
        <p className="mb-4 text-neutral-600">
          Configure your environment variables by copying the example file and
          updating the values:
        </p>
        <div className="rounded-lg bg-neutral-950 p-4">
          <code className="flex items-center gap-2 text-sm text-white">
            <FileCode className="h-4 w-4" />
            .env.example
          </code>
        </div>
      </div>

      {/* Configuration Details Section */}
      <div className="space-y-6">
        {/* Server Configuration Block */}
        <div className="rounded-lg border border-neutral-100 bg-white p-6">
          <div className="mb-4 flex items-center gap-2">
            <Database className="h-5 w-5 text-neutral-600" />
            <h3 className="text-lg font-semibold text-neutral-950">
              Server Configuration
            </h3>
          </div>
          <div className="mb-4">
            <code className="block whitespace-pre-wrap rounded-lg bg-neutral-50 p-4 text-sm text-neutral-600">
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
          <p className="text-sm text-neutral-900">
            Configure your database connection strings. Supports Neon PostgreSQL
            Database.
          </p>
        </div>

        {/* Client Configuration Block */}
        <div className="rounded-lg border border-neutral-100 bg-white p-6">
          <div className="mb-4 flex items-center gap-2">
            <Globe className="h-5 w-5 text-neutral-600" />
            <h3 className="text-lg font-semibold text-neutral-950">
              Client Configuration
            </h3>
          </div>
          <div className="mb-4">
            <code className="block whitespace-pre-wrap rounded-lg bg-neutral-50 p-4 text-sm text-neutral-600">
              {`# Client Configuration
VITE_API_URL="http://localhost:3000"`}
            </code>
          </div>
          <p className="text-sm text-neutral-600">
            Set up your API endpoints and application URLs. The VITE_ prefix
            makes these variables available in the frontend.
          </p>
        </div>

        {/* Security Notice Block */}
        <div className="rounded-lg border border-amber-100 bg-amber-50 p-4">
          <div className="flex gap-2">
            <AlertCircle className="h-5 w-5 text-amber-600" />
            <div>
              <h4 className="font-medium text-amber-800">Security Notice</h4>
              <p className="text-sm text-amber-700">
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