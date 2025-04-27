import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="pt-28 md:pt-36 pb-16 bg-gradient-to-br from-[#f0f7f1] to-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 z-10">
            <div className="bg-[#FF8A00] text-white px-4 py-2 rounded-full inline-block mb-4 text-sm font-medium animate-pulse">
              Limited Offer: 16 Free Meals + Free Shipping
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight">
              Delicious Meals, <br />
              <span className="text-[#067A46]">Delivered to You</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-md">
              Skip the grocery store. Get fresh, pre-measured ingredients and recipe cards delivered straight to your door.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-[#067A46] text-white rounded-full font-medium hover:bg-[#056a3d] transition-colors text-lg flex items-center justify-center">
                Get Started <ArrowRight className="ml-2" size={20} />
              </button>
              <button className="px-8 py-4 border-2 border-[#067A46] text-[#067A46] rounded-full font-medium hover:bg-[#f0f7f1] transition-colors text-lg">
                View Our Plans
              </button>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <div className="w-full h-80 md:h-[460px] relative rounded-2xl overflow-hidden shadow-xl transform md:rotate-2 transition-transform hover:rotate-0 duration-500">
              <img 
                src="https://images.pexels.com/photos/4144234/pexels-photo-4144234.jpeg" 
                alt="Delicious HelloFresh meal" 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <div className="bg-white text-[#067A46] px-4 py-2 rounded-lg inline-block font-semibold">
                  Ready in 30 minutes
                </div>
              </div>
            </div>
            <div className="hidden md:block absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg transform -rotate-3 z-20">
              <div className="flex items-center">
                <div className="bg-[#067A46] text-white p-2 rounded-full mr-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">4.8 out of 5</p>
                  <p className="text-xs text-gray-500">Customer rating</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden md:block absolute top-1/2 left-10 transform -translate-y-1/2">
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="60" cy="60" r="60" fill="#067A46" fillOpacity="0.07"/>
          <circle cx="60" cy="60" r="40" fill="#067A46" fillOpacity="0.1"/>
        </svg>
      </div>
      <div className="hidden md:block absolute bottom-10 right-10">
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="40" cy="40" r="40" fill="#FF8A00" fillOpacity="0.1"/>
        </svg>
      </div>
    </div>
  );
};

export default Hero;