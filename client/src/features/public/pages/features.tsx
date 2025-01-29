import { FeatureCard } from "../components/feature-card";
import { FEATURES } from "../data/features";

const FeaturesPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-100 bg-gradient-to-b from-indigo-50 to-white">
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col items-center text-center">
            <h2 className="relative mb-4">
              <span className="text-4xl font-black text-gray-900 sm:text-5xl">
                Powerful Features for
              </span>
              <br />
              <span className="bg-gradient-to-r from-neutral-950 to-neutral-950 bg-clip-text text-4xl font-black text-transparent sm:text-5xl">
                Modern Development
              </span>
              <div className="absolute -bottom-4 left-1/2 h-2 w-24 -translate-x-1/2 rounded-full bg-gradient-to-r from-neutral-200 to-neutral-200"></div>
            </h2>
            <p className="mx-auto mt-8 max-w-2xl text-lg text-neutral-600">
              Everything you need to build modern web applications with a
              production-ready stack featuring the latest technologies.
            </p>
          </div>
        </div>
      </div>

      <section className="w-full py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturesPage;
