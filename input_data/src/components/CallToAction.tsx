import React from 'react';
import { ArrowRight } from 'lucide-react';

const CallToAction: React.FC = () => {
  return (
    <div className="py-20 bg-[#067A46] relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Mealtime?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join millions of happy customers cooking delicious meals with HelloFresh. Get started today with 16 free meals across your first 6 boxes!
          </p>
          <button className="bg-white text-[#067A46] px-8 py-4 rounded-full font-medium text-lg hover:bg-gray-100 transition-colors inline-flex items-center">
            Get Started Today <ArrowRight className="ml-2" size={20} />
          </button>
          <p className="mt-6 text-sm opacity-80">
            No commitment required. Skip or cancel anytime.
          </p>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-white"></div>
        <div className="absolute top-1/2 -left-32 w-96 h-96 rounded-full bg-white"></div>
        <div className="absolute -bottom-48 right-16 w-80 h-80 rounded-full bg-white"></div>
      </div>
    </div>
  );
};

export default CallToAction;