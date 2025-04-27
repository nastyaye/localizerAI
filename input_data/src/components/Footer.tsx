import React from 'react';
import { Facebook, Instagram, Twitter, Youtube, Smartphone, Mail, MapPin } from 'lucide-react';
import Logo from './Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="mb-6">
              <Logo />
            </div>
            <p className="text-gray-300 mb-6">
              Making home cooking simple, fun, and accessible for everyone with delicious recipes and fresh ingredients delivered to your door.
            </p>
            <div className="flex space-x-4">
              <SocialIcon icon={<Facebook size={18} />} />
              <SocialIcon icon={<Instagram size={18} />} />
              <SocialIcon icon={<Twitter size={18} />} />
              <SocialIcon icon={<Youtube size={18} />} />
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-6">Our Plans</h4>
            <ul className="space-y-3">
              <FooterLink>2 Person Plan</FooterLink>
              <FooterLink>Family Plan</FooterLink>
              <FooterLink>Vegetarian Plan</FooterLink>
              <FooterLink>Quick & Easy</FooterLink>
              <FooterLink>Calorie Smart</FooterLink>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-6">Company</h4>
            <ul className="space-y-3">
              <FooterLink>About Us</FooterLink>
              <FooterLink>Careers</FooterLink>
              <FooterLink>Blog</FooterLink>
              <FooterLink>Press</FooterLink>
              <FooterLink>Partner With Us</FooterLink>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={20} className="mr-3 text-[#067A46] flex-shrink-0 mt-1" />
                <span className="text-gray-300">123 Cooking Street, Foodville, CA 90210</span>
              </li>
              <li className="flex items-center">
                <Smartphone size={20} className="mr-3 text-[#067A46] flex-shrink-0" />
                <span className="text-gray-300">(800) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-3 text-[#067A46] flex-shrink-0" />
                <span className="text-gray-300">support@hellofresh.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <hr className="border-gray-700 mb-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} HelloFresh. All rights reserved.
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Accessibility</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

interface SocialIconProps {
  icon: React.ReactNode;
}

const SocialIcon: React.FC<SocialIconProps> = ({ icon }) => {
  return (
    <a 
      href="#" 
      className="bg-gray-700 w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#067A46] transition-colors"
    >
      {icon}
    </a>
  );
};

interface FooterLinkProps {
  children: React.ReactNode;
}

const FooterLink: React.FC<FooterLinkProps> = ({ children }) => {
  return (
    <li>
      <a href="#" className="text-gray-300 hover:text-white transition-colors">
        {children}
      </a>
    </li>
  );
};

export default Footer;