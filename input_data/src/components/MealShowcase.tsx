import React, { useState } from 'react';
import { Clock, Flame, Award } from 'lucide-react';

interface MealCardProps {
  title: string;
  image: string;
  time: string;
  calories: string;
  tag: string;
  tagColor: string;
}

const MealCard: React.FC<MealCardProps> = ({ title, image, time, calories, tag, tagColor }) => {
  return (
    <div className="rounded-xl overflow-hidden shadow-lg bg-white transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      <div className="relative">
        <img src={image} alt={title} className="w-full h-60 object-cover" />
        <div className={`absolute top-4 left-4 ${tagColor} text-white text-xs font-bold px-3 py-1 rounded-full`}>
          {tag}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
        <div className="flex justify-between items-center">
          <div className="flex items-center text-gray-600">
            <Clock size={16} className="mr-1" />
            <span className="text-sm">{time}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Flame size={16} className="mr-1" />
            <span className="text-sm">{calories}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const MealShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState("popular");
  
  const meals = {
    popular: [
      {
        title: "Garlic Butter Steak & Potatoes",
        image: "https://images.pexels.com/photos/1251208/pexels-photo-1251208.jpeg",
        time: "35 min",
        calories: "650 cal",
        tag: "Customer Favorite",
        tagColor: "bg-[#FF8A00]"
      },
      {
        title: "Creamy Mushroom Risotto",
        image: "https://images.pexels.com/photos/3026805/pexels-photo-3026805.jpeg",
        time: "40 min",
        calories: "520 cal",
        tag: "Vegetarian",
        tagColor: "bg-[#067A46]"
      },
      {
        title: "Honey Glazed Salmon",
        image: "https://images.pexels.com/photos/3655916/pexels-photo-3655916.jpeg",
        time: "25 min",
        calories: "490 cal",
        tag: "Protein-Rich",
        tagColor: "bg-[#2563EB]"
      },
      {
        title: "Southwest Chicken Bowl",
        image: "https://images.pexels.com/photos/5718071/pexels-photo-5718071.jpeg",
        time: "30 min",
        calories: "580 cal",
        tag: "Spicy",
        tagColor: "bg-[#DC2626]"
      }
    ],
    vegetarian: [
      {
        title: "Mediterranean Falafel Bowl",
        image: "https://images.pexels.com/photos/1292294/pexels-photo-1292294.jpeg",
        time: "35 min",
        calories: "480 cal",
        tag: "Plant-Based",
        tagColor: "bg-[#067A46]"
      },
      {
        title: "Roasted Vegetable Pasta",
        image: "https://images.pexels.com/photos/1527603/pexels-photo-1527603.jpeg",
        time: "40 min",
        calories: "550 cal",
        tag: "Italian",
        tagColor: "bg-[#067A46]"
      },
      {
        title: "Chickpea Curry",
        image: "https://images.pexels.com/photos/5409009/pexels-photo-5409009.jpeg",
        time: "30 min",
        calories: "470 cal",
        tag: "Spicy",
        tagColor: "bg-[#DC2626]"
      },
      {
        title: "Stuffed Bell Peppers",
        image: "https://images.pexels.com/photos/4144234/pexels-photo-4144234.jpeg",
        time: "45 min",
        calories: "420 cal",
        tag: "Gluten-Free",
        tagColor: "bg-[#067A46]"
      }
    ],
    quick: [
      {
        title: "15-Minute Stir Fry",
        image: "https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg",
        time: "15 min",
        calories: "410 cal",
        tag: "Quick & Easy",
        tagColor: "bg-[#2563EB]"
      },
      {
        title: "Speedy Pesto Pasta",
        image: "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg",
        time: "20 min",
        calories: "520 cal",
        tag: "Kid-Friendly",
        tagColor: "bg-[#FF8A00]"
      },
      {
        title: "Taco Bowls",
        image: "https://images.pexels.com/photos/5737247/pexels-photo-5737247.jpeg",
        time: "20 min",
        calories: "530 cal",
        tag: "Mexican",
        tagColor: "bg-[#DC2626]"
      },
      {
        title: "Quick Greek Salad",
        image: "https://images.pexels.com/photos/1211887/pexels-photo-1211887.jpeg",
        time: "10 min",
        calories: "320 cal",
        tag: "No-Cook",
        tagColor: "bg-[#067A46]"
      }
    ]
  };

  const tabs = [
    { id: "popular", label: "Most Popular" },
    { id: "vegetarian", label: "Vegetarian" },
    { id: "quick", label: "Quick & Easy" }
  ];

  return (
    <div className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center text-[#067A46] mb-4">
            <Award size={20} className="mr-2" />
            <span className="text-sm font-semibold uppercase tracking-wide">Chef-curated recipes</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Explore Our Delicious Meals</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From quick weeknight dinners to impressive weekend feasts, we've got recipes for every occasion.
          </p>
        </div>

        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-white p-1 rounded-full shadow-md">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeTab === tab.id 
                    ? 'bg-[#067A46] text-white' 
                    : 'text-gray-600 hover:text-[#067A46]'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {meals[activeTab as keyof typeof meals].map((meal, index) => (
            <MealCard
              key={index}
              title={meal.title}
              image={meal.image}
              time={meal.time}
              calories={meal.calories}
              tag={meal.tag}
              tagColor={meal.tagColor}
            />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="px-8 py-3 bg-[#067A46] text-white rounded-full font-medium hover:bg-[#056a3d] transition-colors">
            View All Recipes
          </button>
        </div>
      </div>
    </div>
  );
};

export default MealShowcase;