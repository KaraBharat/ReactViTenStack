// External library imports
import { Link } from "@tanstack/react-router";
import { UserCircle, Lock, ChevronRight } from "lucide-react";

// Internal component imports
import { Card, CardContent } from "@/components/ui/card";

// Types for our settings items
interface SettingsItem {
  to: string;
  icon: React.ReactElement;
  title: string;
  description: string;
}

/**
 * SettingsCard - Reusable component for settings navigation items
 * @param {SettingsItem} props - Properties for the settings card
 */
const SettingsCard = ({ to, icon, title, description }: SettingsItem) => (
  <Link
    to={to}
    className="group block"
    aria-label={`Navigate to ${title} settings`}
  >
    <Card className="transition-colors hover:border-neutral-200 hover:bg-neutral-50/50">
      <CardContent className="flex items-center justify-between p-6">
        <div className="flex items-center gap-4">
          <div
            className="rounded-lg bg-neutral-100 p-2.5 group-hover:bg-neutral-200"
            aria-hidden="true"
          >
            {icon}
          </div>
          <div>
            <h3 className="font-semibold">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
        <ChevronRight
          className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </CardContent>
    </Card>
  </Link>
);

/**
 * Settings configuration array for easy maintenance and scalability
 */
const settingsItems: SettingsItem[] = [
  {
    to: "/dashboard/settings/user-profile",
    icon: <UserCircle className="h-6 w-6 text-neutral-600" />,
    title: "Profile Information",
    description: "Update your profile details and preferences",
  },
  {
    to: "/dashboard/settings/change-password",
    icon: <Lock className="h-6 w-6 text-neutral-600" />,
    title: "Password",
    description: "Change your password and security settings",
  },
];

/**
 * SettingsPage Component
 * Displays a list of settings options for user configuration
 */
const SettingsPage = () => {
  return (
    <div
      className="grid gap-4"
      role="navigation"
      aria-label="Settings navigation"
    >
      {settingsItems.map((item, index) => (
        <SettingsCard key={`settings-item-${index}`} {...item} />
      ))}
    </div>
  );
};

export default SettingsPage;
