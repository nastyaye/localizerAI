import React from 'react';
import { UtensilsCrossed } from 'lucide-react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center">
      <div className="bg-[#067A46] p-2 rounded-full mr-2">
        <UtensilsCrossed className="text-white" size={20} />
      </div>
      <span className="font-bold text-xl text-[#067A46]">(Not)HelloFresh</span>
    </div>
  );
};

export default Logo;