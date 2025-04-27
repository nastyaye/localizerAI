import React from 'react';
import { Check, ChevronRight } from 'lucide-react';

interface PlanCardProps {
  title: string;
  price: string;
  priceSubtext: string;
  description: string;
  features: string[];
  isPopular?: boolean;
}

const PlanCard: React.FC<PlanCardProps> = ({ 
  title, 
  price, 
  priceSubtext, 
  description, 
  features, 
  isPopular 
}) => {
  return (
    <div className={`bg-white rounded-2xl overflow-hidden transition-all duration-300 ${
      isPopular 
        ? 'shadow-xl border-2 border-[#067A46] relative transform hover:-translate-y-2' 
        : 'shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1'
    }`}>
      {isPopular && (
        <div className="bg-[#067A46] text-white text-center py-2 text-sm font-medium">
          MOST POPULAR
        </div>
      )}
      <div className="p-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 mb-6">{description}</p>
        <div className="mb-6">
          <span className="text-4xl font-bold text-gray-800">{price}</span>
          <span className="text-gray-500 ml-1">{priceSubtext}</span>
        </div>
        <ul className="space-y-3 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <div className="mr-3 mt-1 text-[#067A46]">
                <Check size={16} />
              </div>
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
        <button 
          className={`w-full py-3 rounded-full font-medium flex items-center justify-center ${
            isPopular 
              ? 'bg-[#067A46] text-white hover:bg-[#056a3d]' 
              : 'bg-white border-2 border-[#067A46] text-[#067A46] hover:bg-[#f0f7f1]'
          } transition-colors`}
        >
          Select This Plan
          <ChevronRight size={18} className="ml-1" />
        </button>
      </div>
    </div>
  );
};

const PricingPlans: React.FC = () => {
  const plans = [
    {
      title: "2 Person Plan",
      price: "$8.99",
      priceSubtext: "per serving",
      description: "Perfect for couples or roommates",
      features: [
        "3-5 recipes per week",
        "Perfectly portioned ingredients",
        "Skip or cancel anytime",
        "Free shipping on your first box"
      ]
    },
    {
      title: "Family Plan",
      price: "$7.99",
      priceSubtext: "per serving",
      description: "Great for families with kids",
      features: [
        "2-4 recipes per week",
        "Family-friendly recipes",
        "Kid-tested meals",
        "Easy to prepare in 30 minutes",
        "Free shipping"
      ],
      isPopular: true
    },
    {
      title: "Veggie Plan",
      price: "$8.49",
      priceSubtext: "per serving",
      description: "Plant-based meals for everyone",
      features: [
        "3-5 recipes per week",
        "Vegetarian ingredients",
        "Exciting global flavors",
        "Nutritionally balanced"
      ]
    }
  ];

  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Choose Your Plan</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Flexible plans to fit your lifestyle, with no commitment required. Change, pause, or cancel anytime.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <PlanCard
              key={index}
              title={plan.title}
              price={plan.price}
              priceSubtext={plan.priceSubtext}
              description={plan.description}
              features={plan.features}
              isPopular={plan.isPopular}
            />
          ))}
        </div>
        
        <div className="text-center mt-12 max-w-2xl mx-auto">
          <p className="text-gray-600 mb-6">
            All plans include free delivery, recipe cards, and access to our mobile app with thousands of recipes.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-gray-100 px-4 py-2 rounded-full text-sm text-gray-700">
              No commitment
            </div>
            <div className="bg-gray-100 px-4 py-2 rounded-full text-sm text-gray-700">
              Skip weeks anytime
            </div>
            <div className="bg-gray-100 px-4 py-2 rounded-full text-sm text-gray-700">
              Cancel anytime
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPlans;