import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface TestimonialProps {
  quote: string;
  author: string;
  image: string;
  rating: number;
}

const Testimonial: React.FC<TestimonialProps> = ({ quote, author, image, rating }) => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg mx-4 my-8">
      <div className="flex items-center mb-6">
        <img 
          src={image} 
          alt={author} 
          className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-[#067A46]"
        />
        <div>
          <div className="flex mb-1">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={16} 
                className={i < rating ? "text-[#FF8A00] fill-[#FF8A00]" : "text-gray-300"} 
              />
            ))}
          </div>
          <p className="font-medium text-gray-800">{author}</p>
        </div>
      </div>
      <p className="text-gray-600 italic mb-4">"{quote}"</p>
    </div>
  );
};

const Testimonials: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const testimonials = [
    {
      quote: "HelloFresh has completely changed our weeknight dinners. We no longer stress about what to cook and the recipes are always delicious!",
      author: "Sarah M.",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg",
      rating: 5
    },
    {
      quote: "As a busy professional, I never had time to plan meals. Now I'm cooking tasty, healthy dinners in under 30 minutes!",
      author: "David L.",
      image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
      rating: 5
    },
    {
      quote: "Our family loves the variety of recipes. Even our picky kids are trying new foods and helping in the kitchen!",
      author: "Jennifer K.",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
      rating: 4
    },
    {
      quote: "The quality of ingredients is outstanding. Everything arrives fresh, and the recipes are so flavorful.",
      author: "Michael P.",
      image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
      rating: 5
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="py-20 bg-[#f0f7f1]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Customers Love Us</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have transformed their mealtime experience.
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <Testimonial
                    quote={testimonial.quote}
                    author={testimonial.author}
                    image={testimonial.image}
                    rating={testimonial.rating}
                  />
                </div>
              ))}
            </div>
          </div>
          
          <button 
            className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2 bg-white rounded-full p-2 shadow-md text-gray-600 hover:text-[#067A46] focus:outline-none z-10 hidden md:block"
            onClick={prevSlide}
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2 bg-white rounded-full p-2 shadow-md text-gray-600 hover:text-[#067A46] focus:outline-none z-10 hidden md:block"
            onClick={nextSlide}
          >
            <ChevronRight size={24} />
          </button>
          
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentSlide === index ? 'bg-[#067A46]' : 'bg-gray-300'
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-wrap justify-center mt-16 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-[#067A46] mb-2">4.8/5</div>
            <p className="text-gray-600">Average Rating</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-[#067A46] mb-2">500K+</div>
            <p className="text-gray-600">Happy Customers</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-[#067A46] mb-2">100M+</div>
            <p className="text-gray-600">Meals Delivered</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;