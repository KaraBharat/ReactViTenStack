// External library imports
import { Link, useRouterState } from "@tanstack/react-router";
import { Bell, ChevronRight, Search } from "lucide-react";

// Internal UI component imports
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

/**
 * UUID regex pattern for filtering breadcrumb paths
 */
const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * Interface for breadcrumb items
 */
interface BreadcrumbItem {
  label: string;
  path: string;
  isLast: boolean;
}

/**
 * AppHeader Component
 * Renders the application's main header with navigation breadcrumbs and action buttons
 */
export function AppHeader() {
  // Get current pathname from router state
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  /**
   * Generates breadcrumb items from the current path
   * @param path - Current URL path
   * @returns Array of breadcrumb items
   */
  const getBreadcrumbs = (path: string): BreadcrumbItem[] => {
    const parts = path.split("/").filter(Boolean);

    // Filter out UUIDs from path parts
    const filteredParts = parts.filter((part) => !UUID_PATTERN.test(part));

    return filteredParts.map((part, index) => ({
      label: part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, " "),
      path: "/" + filteredParts.slice(0, index + 1).join("/"),
      isLast: index === filteredParts.length - 1,
    }));
  };

  const breadcrumbs = getBreadcrumbs(pathname);

  return (
    <header
      className="sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between bg-background transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12"
      role="banner"
    >
      {/* Left section: Navigation and Breadcrumbs */}
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" aria-label="Toggle sidebar" />
        <Separator orientation="vertical" className="mr-2 h-4" decorative />
        <nav aria-label="Breadcrumb navigation">
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbs.map((crumb) => (
                <BreadcrumbItem key={crumb.path}>
                  {!crumb.isLast ? (
                    <>
                      <BreadcrumbLink asChild>
                        <Link className="capitalize" to={crumb.path}>
                          {crumb.label}
                        </Link>
                      </BreadcrumbLink>
                      <ChevronRight className="h-4 w-4" />
                    </>
                  ) : (
                    <BreadcrumbPage className="capitalize">
                      {crumb.label}
                    </BreadcrumbPage>
                  )}
                </BreadcrumbItem>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </nav>
      </div>

      {/* Right section: Action buttons */}
      <div className="flex items-center gap-2 px-4">
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-muted"
          aria-label="Search"
        >
          <Search className="h-5 w-5" aria-hidden="true" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-muted"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" aria-hidden="true" />
        </Button>
      </div>
    </header>
  );
}
