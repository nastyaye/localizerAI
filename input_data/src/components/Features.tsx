import React from 'react';
import { Clock, UtensilsCrossed, ThumbsUp, DollarSign } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 transition-transform duration-300 hover:transform hover:-translate-y-2">
      <div className="bg-[#f0f7f1] text-[#067A46] p-3 rounded-full inline-block mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3 text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const Features: React.FC = () => {
  const features = [
    {
      icon: <Clock size={24} />,
      title: "Quick & Easy",
      description: "Delicious meals ready in just 30 minutes with pre-measured ingredients."
    },
    {
      icon: <UtensilsCrossed size={24} />,
      title: "25+ Weekly Recipes",
      description: "Choose from a wide variety of meals updated weekly for endless options."
    },
    {
      icon: <ThumbsUp size={24} />,
      title: "Fresh Ingredients",
      description: "Farm-fresh ingredients delivered straight to your door for maximum flavor."
    },
    {
      icon: <DollarSign size={24} />,
      title: "Affordable Plans",
      description: "Flexible plans starting at just $7.99 per serving to fit your lifestyle."
    }
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Why Choose HelloFresh?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We make cooking at home easy, fun, and affordable with farm-fresh ingredients and chef-created recipes.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;