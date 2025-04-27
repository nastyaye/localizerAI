import React, { useState } from 'react';
import { Send } from 'lucide-react';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      // In a real app, you would submit to an API here
      setEmail('');
      setTimeout(() => setSubmitted(false), 3000);
    }
  };
  
  return (
    <div className="py-16 bg-gray-100">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Get Exclusive Offers & Recipes</h3>
          <p className="text-gray-600 mb-8">
            Subscribe to our newsletter for new recipes, cooking tips, and special promotions.
          </p>
          
          {submitted ? (
            <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-6 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <span>Thanks for subscribing!</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#067A46] focus:border-transparent"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button 
                type="submit" 
                className="bg-[#067A46] text-white px-6 py-3 rounded-full font-medium hover:bg-[#056a3d] transition-colors flex items-center justify-center"
              >
                Subscribe
                <Send size={16} className="ml-2" />
              </button>
            </form>
          )}
          
          <p className="text-sm text-gray-500 mt-4">
            We respect your privacy. Your information will never be shared with third parties.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;