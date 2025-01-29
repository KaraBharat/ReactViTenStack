// External library imports
import { Link } from "@tanstack/react-router";
import {
  Plus,
  LayoutDashboard,
  ListTodo,
  Shield,
  BarChart3,
  PieChart,
  TrendingUp,
  LucideIcon,
} from "lucide-react";

// UI Component imports
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Types
interface FeatureCard {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface StatisticCard {
  icon: LucideIcon;
  title: string;
  height: string;
}

// Constants
const FEATURE_CARDS: FeatureCard[] = [
  {
    icon: Shield,
    title: "Secure Access",
    description:
      "Your dashboard is protected with email and password authentication, ensuring your data remains private and secure.",
  },
  {
    icon: ListTodo,
    title: "Todo Management",
    description:
      "Create, organize, and track your todos efficiently. Use the quick action buttons above to get started.",
  },
  {
    icon: LayoutDashboard,
    title: "Profile Settings",
    description:
      "Customize your user profile, manage account preferences, and update your personal information.",
  },
];

const STATISTIC_CARDS: StatisticCard[] = [
  {
    icon: BarChart3,
    title: "Task Completion Rate",
    height: "h-[200px]",
  },
  {
    icon: PieChart,
    title: "Category Distribution",
    height: "h-[200px]",
  },
  {
    icon: TrendingUp,
    title: "Weekly Progress",
    height: "h-[250px]",
  },
];

/**
 * Renders a feature card component with icon, title, and description
 */
const FeatureCard = ({ icon: Icon, title, description }: FeatureCard) => (
  <Card className="border-neutral-100">
    <CardHeader>
      <CardTitle className="flex items-center text-lg text-neutral-950">
        <Icon className="mr-2 h-5 w-5 text-neutral-600" aria-hidden="true" />
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

/**
 * Renders a statistic card component with placeholder content
 */
const StatisticCard = ({ icon: Icon, title, height }: StatisticCard) => (
  <Card className="border-neutral-100">
    <CardHeader>
      <CardTitle className="flex items-center text-lg text-neutral-950">
        <Icon className="mr-2 h-5 w-5 text-neutral-600" aria-hidden="true" />
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div
        className={`flex ${height} items-center justify-center rounded-lg bg-neutral-50`}
        role="img"
        aria-label={`${title} visualization`}
      >
        <div className="space-y-2 text-center">
          <Icon
            className="mx-auto h-8 w-8 text-neutral-300"
            aria-hidden="true"
          />
          <p className="text-sm text-muted-foreground">
            {title} will appear here
          </p>
        </div>
      </div>
    </CardContent>
  </Card>
);

/**
 * DashboardPage Component
 * Main dashboard view displaying welcome message, quick actions, stats overview, and features
 */
const DashboardPage = () => {
  return (
    <div className="flex flex-col gap-6 p-4">
      {/* Header Section */}
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome to Your Dashboard
        </h1>
        <p className="text-muted-foreground">
          Manage your todos and view application statistics in one place.
        </p>
      </header>

      {/* Quick Actions */}
      <nav className="flex gap-4" aria-label="Quick actions">
        <Link to="/dashboard/todos/new">
          <Button
            className="bg-neutral-950 text-white hover:bg-neutral-800"
            aria-label="Create new todo"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            Create Todo
          </Button>
        </Link>
        <Link to="/dashboard/todos">
          <Button
            variant="outline"
            className="border-neutral-200"
            aria-label="View all todos"
          >
            <ListTodo className="h-4 w-4" aria-hidden="true" />
            View Todos
          </Button>
        </Link>
      </nav>

      {/* Feature Cards */}
      <section
        className="grid gap-4 md:grid-cols-3"
        aria-label="Dashboard features"
      >
        {FEATURE_CARDS.map((card) => (
          <FeatureCard key={card.title} {...card} />
        ))}
      </section>

      {/* Statistics Section */}
      <section
        className="grid gap-4 md:grid-cols-2"
        aria-label="Dashboard statistics"
      >
        {STATISTIC_CARDS.slice(0, 2).map((card) => (
          <StatisticCard key={card.title} {...card} />
        ))}
        {STATISTIC_CARDS[2] && (
          <div className="md:col-span-2">
            <StatisticCard {...STATISTIC_CARDS[2]} />
          </div>
        )}
      </section>
    </div>
  );
};

export default DashboardPage;
