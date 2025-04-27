import React from 'react';
import { Truck, Clock, MapPin, Shield } from 'lucide-react';

interface DeliveryMethodProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const DeliveryMethod: React.FC<DeliveryMethodProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md">
      <div className="text-[#067A46] mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const DeliveryInfo: React.FC = () => {
  return (
    <div className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Delivery You Can Trust</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We ensure your meals arrive fresh and on time with our reliable delivery network.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <DeliveryMethod
            icon={<Truck size={32} />}
            title="Free Delivery"
            description="Complimentary delivery on all orders, right to your doorstep"
          />
          <DeliveryMethod
            icon={<Clock size={32} />}
            title="Flexible Times"
            description="Choose your preferred delivery time slot that fits your schedule"
          />
          <DeliveryMethod
            icon={<MapPin size={32} />}
            title="Wide Coverage"
            description="Available in major cities and surrounding areas across the country"
          />
          <DeliveryMethod
            icon={<Shield size={32} />}
            title="Safe Delivery"
            description="Temperature-controlled boxes keep your ingredients fresh for up to 48 hours"
          />
        </div>

        <div className="mt-12 bg-white rounded-xl p-8 max-w-3xl mx-auto shadow-md">
          <h3 className="text-2xl font-bold mb-4 text-center">Delivery Partners</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="text-center">
              <div className="bg-[#06C167] text-white p-4 rounded-xl mb-3">
                <span className="text-xl font-bold">UberEats</span>
              </div>
              <p className="text-gray-600">Fast delivery within 45 minutes</p>
            </div>
            <div className="text-center">
              <div className="bg-[#FF8000] text-white p-4 rounded-xl mb-3">
                <span className="text-xl font-bold">Lieferando</span>
              </div>
              <p className="text-gray-600">Reliable German delivery service</p>
            </div>
            <div className="text-center">
              <div className="bg-[#00C2E8] text-white p-4 rounded-xl mb-3">
                <span className="text-xl font-bold">Wolt</span>
              </div>
              <p className="text-gray-600">Premium delivery experience</p>
            </div>
          </div>

          <h3 className="text-2xl font-bold mb-4 text-center">Delivery Areas</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold mb-2 text-[#067A46]">East Coast</h4>
              <ul className="space-y-1 text-gray-600">
                <li>New York City</li>
                <li>Boston</li>
                <li>Philadelphia</li>
                <li>Washington DC</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-[#067A46]">West Coast</h4>
              <ul className="space-y-1 text-gray-600">
                <li>Los Angeles</li>
                <li>San Francisco</li>
                <li>Seattle</li>
                <li>Portland</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-[#067A46]">Central</h4>
              <ul className="space-y-1 text-gray-600">
                <li>Chicago</li>
                <li>Houston</li>
                <li>Denver</li>
                <li>Dallas</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryInfo;