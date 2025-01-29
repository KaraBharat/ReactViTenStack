import { cn } from "@/lib/utils";
import { Link, useMatchRoute } from "@tanstack/react-router";

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string; // Added for flexibility
}

/**
 * NavLink Component
 *
 * A styled navigation link component that highlights the active route.
 * Features a dynamic underline effect on hover and active states.
 *
 * @param {string} to - The destination route path
 * @param {React.ReactNode} children - The content to be rendered inside the link
 * @param {string} [className] - Optional additional CSS classes
 */
export const NavLink = ({ to, children, className }: NavLinkProps) => {
  const matchRoute = useMatchRoute();
  const isActive = matchRoute({ to });

  // Extracted styles for better readability
  const baseStyles = "relative text-sm font-medium transition-all duration-200";
  const activeStyles =
    "text-neutral-950 after:absolute after:left-0 after:w-full after:bg-gradient-to-r " +
    "after:from-neutral-950 after:to-neutral-950 after:content-[''] md:after:bottom-[-1.5rem] md:after:h-[2px]";
  const inactiveStyles =
    "text-neutral-600 hover:text-neutral-900 hover:after:absolute hover:after:w-full " +
    "hover:after:bg-neutral-200 hover:after:content-[''] md:hover:after:bottom-[-1.5rem] " +
    "md:hover:after:left-0 md:hover:after:h-[2px]";

  return (
    <Link
      to={to}
      className={cn(
        baseStyles,
        isActive ? activeStyles : inactiveStyles,
        className,
      )}
      role="link"
      aria-current={isActive ? "page" : undefined}
    >
      {children}
    </Link>
  );
};
