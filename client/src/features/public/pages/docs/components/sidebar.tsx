/**
 * DocsSidebar Component
 * A navigation sidebar for documentation pages that displays a list of links
 * Features:
 * - Sticky positioning with top offset
 * - Responsive hover states
 * - Accessible navigation structure
 */

// Types and Interfaces
type NavItem = {
  title: string;
  href: string;
};

interface SidebarProps {
  items: NavItem[];
}

/**
 * Renders a vertical navigation sidebar with the provided navigation items
 * @param {SidebarProps} props - Component props containing navigation items
 */
export const DocsSidebar = ({ items }: SidebarProps) => {
  return (
    <nav
      className="sticky top-24 space-y-1"
      aria-label="Documentation navigation"
    >
      {items.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className="block rounded-lg px-4 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-50 hover:text-neutral-950"
        >
          {item.title}
        </a>
      ))}
    </nav>
  );
};
