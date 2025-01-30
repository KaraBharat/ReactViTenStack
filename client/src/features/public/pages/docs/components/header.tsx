// External imports
import { BookOpen } from "lucide-react";

/**
 * DocsHeader Component
 * Renders the documentation page header with a title, icon, and description
 * Features a gradient background and responsive text sizing
 */
export const DocsHeader = () => {
  return (
    <div className="border-b border-gray-100 bg-gradient-to-b from-indigo-50 to-white">
      {/* Container for content centering and padding */}
      <div className="container mx-auto px-4 py-16">
        {/* Content wrapper with centered layout */}
        <div className="flex flex-col items-center text-center">
          <BookOpen className="mb-6 h-12 w-12 text-neutral-950" />
          <h1 className="mb-6 bg-gradient-to-r from-neutral-950 to-neutral-950 bg-clip-text text-2xl font-bold text-transparent md:text-4xl">
            Documentation
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-neutral-600">
            Learn how to get started with ReactViTenStack and explore its
            features.
          </p>
        </div>
      </div>
    </div>
  );
};
