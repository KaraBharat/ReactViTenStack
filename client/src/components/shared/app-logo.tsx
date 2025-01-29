// External library imports
import { Rocket } from "lucide-react";

// Constants
const BRAND_NAME = "ReactViTenStack";

/**
 * AppLogo Component
 * Renders the application logo with a rocket icon and branded text
 */
export const AppLogo = () => {
  return (
    <div
      className="flex items-center gap-2"
      role="banner"
      aria-label="Application logo"
    >
      <Rocket className="size-8 text-neutral-950" aria-hidden="true" />
      <span
        className="bg-gradient-to-r from-stone-950 to-neutral-950 bg-clip-text text-xl font-bold text-transparent"
        aria-label={BRAND_NAME}
      >
        {BRAND_NAME}
      </span>
    </div>
  );
};
