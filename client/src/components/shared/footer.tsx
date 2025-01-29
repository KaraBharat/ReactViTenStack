import { Github } from "lucide-react";
import { AppLogo } from "./app-logo";

// Types
interface SocialLink {
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  label: string;
}

// Constants
const SOCIAL_LINKS: SocialLink[] = [
  {
    icon: Github,
    href: import.meta.env.VITE_GITHUB_REPO_URL || "#",
    label: "GitHub Repository",
  },
];

// Reusable styled link component
const FooterLink: React.FC<{ href: string; children: React.ReactNode }> = ({
  href,
  children,
}) => (
  <a
    href={href}
    className="text-neutral-500 transition-colors hover:text-neutral-900"
    target={href.startsWith("http") ? "_blank" : undefined}
    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
  >
    {children}
  </a>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="mt-10 border-t border-gray-100 bg-white"
      role="contentinfo"
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-1">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <AppLogo />
            </div>
            <div className="flex flex-col">
              <p className="text-sm font-medium text-gray-500">
                Modern Full-Stack Starter Template
              </p>
              <p className="text-sm text-gray-500">
                Ready to use stack featuring Vite, React, TanStack, Shadcn, and
                more.
              </p>
            </div>
            <div className="flex gap-4">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <FooterLink key={href} href={href}>
                  <span className="sr-only">{label}</span>
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </FooterLink>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-100 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-gray-500">
              © {currentYear} ReactViTenStack.
            </p>
            <p className="flex items-center gap-1 text-sm text-gray-500">
              <span className="text-gray-500">Made with</span>
              <span className="animate-pulse text-red-500">❤️</span>
              <span className="text-gray-500">by</span>
              <a
                href="https://www.bharatkara.com"
                className="font-medium transition-colors hover:text-gray-900"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://www.bharatkara.com/images/logo-icon.png"
                  alt=""
                  width={20}
                  height={20}
                  className="h-5 w-5"
                />
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
