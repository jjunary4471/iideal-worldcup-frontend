import React from 'react';
import { Heart } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="py-4 px-6 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white shadow-lg">
      <div className="container mx-auto flex items-center justify-center">
        <Heart className="mr-2 text-pink-200" size={24} />
        <h1 className="text-2xl md:text-3xl font-bold tracking-wider">
          <span className="text-white">K-POP</span> <span className="text-pink-200">이상형월드컵</span>
        </h1>
        <Heart className="ml-2 text-pink-200" size={24} />
      </div>
      <div className="text-center mt-1 text-sm text-pink-100 opacity-90">
        Ideal Type World Cup
      </div>
    </header>
  );
};

export default Header;