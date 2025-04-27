import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import Logo from './Logo';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Logo />
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLinks />
            <button className="px-6 py-2 bg-[#067A46] text-white rounded-full font-medium hover:bg-[#056a3d] transition-colors">
              View Plans
            </button>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-full left-0 w-full">
          <div className="container mx-auto px-4 py-5">
            <div className="flex flex-col space-y-4">
              <MobileNavLinks setIsMenuOpen={setIsMenuOpen} />
              <button className="px-6 py-3 bg-[#067A46] text-white rounded-full font-medium hover:bg-[#056a3d] transition-colors w-full">
                View Plans
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

interface MobileNavLinksProps {
  setIsMenuOpen: (isOpen: boolean) => void;
}

const MobileNavLinks: React.FC<MobileNavLinksProps> = ({ setIsMenuOpen }) => {
  return (
    <>
      <NavItem mobile onClick={() => setIsMenuOpen(false)}>Our Plans</NavItem>
      <NavItem mobile onClick={() => setIsMenuOpen(false)}>How It Works</NavItem>
      <NavItem mobile onClick={() => setIsMenuOpen(false)}>Recipes</NavItem>
      <NavItem mobile onClick={() => setIsMenuOpen(false)}>About Us</NavItem>
    </>
  );
};

const NavLinks: React.FC = () => {
  return (
    <>
      <NavItem>Our Plans</NavItem>
      <NavItem>How It Works</NavItem>
      <NavItem>Recipes</NavItem>
      <NavItem>About Us</NavItem>
    </>
  );
};

interface NavItemProps {
  children: React.ReactNode;
  mobile?: boolean;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ children, mobile, onClick }) => {
  return (
    <a 
      href="#" 
      className={`group relative ${mobile ? 'block py-2' : 'inline-flex items-center'}`}
      onClick={onClick}
    >
      <span className="text-gray-700 font-medium hover:text-[#067A46] transition-colors flex items-center">
        {children}
        <ChevronDown className="ml-1" size={16} />
      </span>
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#067A46] transition-all group-hover:w-full"></span>
    </a>
  );
};

export default Header;