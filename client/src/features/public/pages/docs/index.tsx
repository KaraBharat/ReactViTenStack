// External imports
import { FC } from "react";

// Internal imports - Components
import { DocsHeader } from "./components/header";
import { DocsSidebar } from "./components/sidebar";
import { ConfigurationSection } from "./components/sections/configurations";
import { DeploymentSection } from "./components/sections/deployment";
import { DevelopmentSection } from "./components/sections/development";
import { GettingStartedSection } from "./components/sections/getting-started";
import { InstallationSection } from "./components/sections/installation";
import { ProjectStructureSection } from "./components/sections/project-structure";
import { PackageManagementSection } from "./components/sections/package-management";

// Navigation items for the documentation sidebar
const NAV_ITEMS = [
  { title: "Getting Started", href: "#getting-started" },
  { title: "Installation", href: "#installation" },
  { title: "Project Structure", href: "#project-structure" },
  { title: "Configuration", href: "#configuration" },
  { title: "Development", href: "#development" },
  { title: "Deployment (Vercel)", href: "#deployment" },
  { title: "Package Management (PNPM)", href: "#package-management" },
];

/**
 * DocsPage Component
 * Renders the main documentation page with a sidebar navigation and content sections.
 * Layout: Two-column grid on large screens, single column on mobile
 */
const DocsPage: FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <DocsHeader />

      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <DocsSidebar items={NAV_ITEMS} />
          </div>

          {/* Main Content Sections */}
          <div className="[&>section]:scroll-mt-24 lg:col-span-2">
            <GettingStartedSection />
            <InstallationSection />
            <ProjectStructureSection />
            <ConfigurationSection />
            <DevelopmentSection />
            <DeploymentSection />
            <PackageManagementSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocsPage;
