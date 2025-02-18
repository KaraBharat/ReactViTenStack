// External imports
import React from "react";

/**
 * Props interface for the FeatureCard component
 * @interface Props
 * @property {React.ElementType} icon - Icon component to be rendered
 * @property {string} title - Title of the feature
 * @property {string} description - Description of the feature
 */
type Props = {
  icon: React.ElementType;
  title: string;
  description: string;
};

/**
 * FeatureCard Component
 * Renders a card displaying a feature with an icon, title, and description
 * Includes hover animations and consistent styling
 *
 * @component
 * @param {Props} props - Component props
 */
export const FeatureCard = ({ icon: Icon, title, description }: Props) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-neutral-50 p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <div className="relative">
        <div className="mb-4 inline-flex rounded-lg bg-neutral-100 p-3">
          <Icon data-icon className="size-6 text-neutral-950" />
        </div>
        <h3 className="mb-3 text-xl font-bold text-neutral-950">{title}</h3>
        <p className="text-neutral-600">{description}</p>
      </div>
    </div>
  );
};
