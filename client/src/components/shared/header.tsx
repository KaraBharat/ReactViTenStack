// External libraries
import { Link } from "@tanstack/react-router";
import { ArrowRightToLine, LogOut, Menu, X } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

// Local components
import { NavLink } from "./nav-link";
import { AppLogo } from "./app-logo";

// UI components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Types and providers
import { useAuth } from "@/providers/auth.provider";
import { AuthState } from "@/types/auth.types";

// Reusable navigation links component
const NavigationLinks = () => (
  <>
    <NavLink to="/">Home</NavLink>
    <NavLink to="/features">Features</NavLink>
    <NavLink to="/docs">Documentation</NavLink>
  </>
);

const Header = () => {
  const { authState, user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Memoize handlers
  const handleLogout = useCallback(() => {
    logout();
    setIsMenuOpen(false);
  }, [logout]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  // Optimize resize listener
  useEffect(() => {
    const handleResize = () => {
      requestAnimationFrame(() => {
        if (window.innerWidth >= 768) {
          setIsMenuOpen(false);
        }
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav
          className="flex h-16 items-center justify-between"
          role="navigation"
        >
          {/* Logo and Navigation */}
          <div className="flex items-center gap-8">
            <Link to="/" onClick={closeMenu}>
              <AppLogo />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden items-center gap-6 md:flex">
              <NavigationLinks />
            </div>
          </div>

          {/* Hamburger Menu Button */}
          <button
            className="rounded-lg p-2 transition-colors hover:bg-neutral-100 md:hidden"
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-neutral-600" />
            ) : (
              <Menu className="h-6 w-6 text-neutral-600" />
            )}
          </button>

          {/* Desktop Auth Buttons */}
          {authState !== AuthState.AUTHENTICATING && (
            <div className="hidden items-center gap-4 md:flex">
              {authState === AuthState.UNAUTHENTICATED && (
                <>
                  <Link
                    to="/login"
                    className="flex items-center gap-2 rounded-full bg-neutral-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-900"
                  >
                    <ArrowRightToLine className="h-5 w-5" />
                    Demo
                  </Link>
                </>
              )}
              {authState === AuthState.AUTHENTICATED && (
                <>
                  <Link to="/dashboard">
                    <Button
                      variant="outline"
                      className="flex items-center gap-2 rounded-full border-neutral-200 hover:bg-neutral-50 hover:text-neutral-950"
                    >
                      <ArrowRightToLine className="h-5 w-5" />
                      Dashboard
                    </Button>
                  </Link>
                  {user && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="relative h-8 w-8 rounded-full hover:bg-neutral-50"
                        >
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={user.avatar || ""}
                              alt={user.name}
                            />
                            <AvatarFallback className="bg-neutral-100 text-neutral-950">
                              {user.name
                                .split(" ")
                                .map((n: string) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        className="w-56"
                        align="end"
                        forceMount
                      >
                        <DropdownMenuLabel className="font-normal">
                          <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">
                              {user.name}
                            </p>
                            <p className="text-xs leading-none text-muted-foreground">
                              {user.email}
                            </p>
                          </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={handleLogout}
                          className="text-red-600 focus:bg-red-50 focus:text-red-600"
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Log out
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </>
              )}
            </div>
          )}
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div
            className="md:hidden"
            role="dialog"
            aria-label="Mobile navigation menu"
          >
            <div className="flex flex-col space-y-4 border-t border-gray-100 bg-white px-4 py-6">
              {/* Mobile Navigation Links */}
              <NavigationLinks />

              {/* Mobile Auth Buttons */}
              {authState !== AuthState.AUTHENTICATING && (
                <div className="border-t border-gray-100 pt-4">
                  {authState === AuthState.UNAUTHENTICATED ? (
                    <div className="flex flex-col space-y-4">
                      <Link
                        to="/login"
                        className="flex items-center justify-center gap-2 rounded-full bg-neutral-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-900"
                        onClick={closeMenu}
                      >
                        <ArrowRightToLine className="h-5 w-5" />
                        Demo
                      </Link>
                    </div>
                  ) : (
                    <div className="flex flex-col space-y-4">
                      <Link
                        to="/dashboard"
                        className="flex items-center justify-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
                        onClick={closeMenu}
                      >
                        <ArrowRightToLine className="h-5 w-5" />
                        Dashboard
                      </Link>
                      {user && (
                        <button
                          onClick={handleLogout}
                          className="flex items-center justify-center gap-2 rounded-full border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                        >
                          <LogOut className="h-5 w-5" />
                          Log out
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
