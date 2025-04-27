import React from 'react';

const HowItWorks: React.FC = () => {
  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">How (Not)HelloFresh Works</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Watch our quick video to see how easy it is to get started with (Not)HelloFresh.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative pb-[56.25%] h-0">
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-2xl shadow-lg"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="How (Not)HelloFresh Works"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="mt-8 text-center text-gray-600">
            Learn how we deliver fresh ingredients and amazing recipes right to your doorstep
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;