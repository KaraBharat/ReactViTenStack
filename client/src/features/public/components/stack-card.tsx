import { type ReactElement } from "react";

interface StackCardProps {
  icon: ReactElement;
  title: string;
  description: string;
  compact?: boolean;
}

/**
 * StackCard Component
 * Renders a card with icon, title and description in either compact or full size mode
 * Used to display stack/technology information in the application
 *
 * @param {StackCardProps} props - Component props
 */
const StackCard = ({
  icon,
  title,
  description,
  compact = false,
}: StackCardProps) => {
  // Render compact version of the card
  if (compact) {
    return (
      <div
        className="rounded-lg border border-neutral-100 bg-white p-4"
        role="listitem"
      >
        <div className="mb-2 flex items-center gap-2">
          <div className="inline-flex text-neutral-950">{icon}</div>
          <h4 className="font-medium text-neutral-950">{title}</h4>
        </div>
        <p className="text-sm text-neutral-600">{description}</p>
      </div>
    );
  }

  // Render full-size version of the card
  return (
    <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="mb-4 inline-flex rounded-lg bg-neutral-100 p-3 text-neutral-950">
        {icon}
      </div>
      <h3 className="mb-2 text-xl font-semibold">{title}</h3>
      <p className="text-neutral-600">{description}</p>
    </div>
  );
};

export default StackCard;
