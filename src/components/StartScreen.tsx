import React from 'react';
import { IdolFilterType } from '../types';
import { Heart, Users, User, Check } from 'lucide-react';

interface StartScreenProps {
  onStart: (filter: IdolFilterType) => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  const [selectedFilter, setSelectedFilter] = React.useState<IdolFilterType>('all');

  const handleFilterSelect = (filter: IdolFilterType) => {
    setSelectedFilter(filter);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-center">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-purple-800">
          K-POP 이상형월드컵
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Tournament-style game to choose your favorite K-pop idol through a series of choices.
          Who will be your ultimate bias?
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Choose Your Tournament
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <button
            className={`flex flex-col items-center justify-center p-6 rounded-lg border-2 transition-all ${
              selectedFilter === 'all'
                ? 'border-purple-500 bg-purple-50 text-purple-700'
                : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
            }`}
            onClick={() => handleFilterSelect('all')}
          >
            <Users size={36} className={selectedFilter === 'all' ? 'text-purple-500' : 'text-gray-400'} />
            <span className="mt-2 font-medium">All Idols</span>
            {selectedFilter === 'all' && (
              <Check size={20} className="absolute top-2 right-2 text-purple-500" />
            )}
          </button>
          
          <button
            className={`flex flex-col items-center justify-center p-6 rounded-lg border-2 transition-all ${
              selectedFilter === 'male'
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
            }`}
            onClick={() => handleFilterSelect('male')}
          >
            <User size={36} className={selectedFilter === 'male' ? 'text-blue-500' : 'text-gray-400'} />
            <span className="mt-2 font-medium">Male Idols</span>
            {selectedFilter === 'male' && (
              <Check size={20} className="absolute top-2 right-2 text-blue-500" />
            )}
          </button>
          
          <button
            className={`flex flex-col items-center justify-center p-6 rounded-lg border-2 transition-all ${
              selectedFilter === 'female'
                ? 'border-pink-500 bg-pink-50 text-pink-700'
                : 'border-gray-200 hover:border-pink-300 hover:bg-pink-50'
            }`}
            onClick={() => handleFilterSelect('female')}
          >
            <Heart size={36} className={selectedFilter === 'female' ? 'text-pink-500' : 'text-gray-400'} />
            <span className="mt-2 font-medium">Female Idols</span>
            {selectedFilter === 'female' && (
              <Check size={20} className="absolute top-2 right-2 text-pink-500" />
            )}
          </button>
        </div>
        
        <button
          className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400"
          onClick={() => onStart(selectedFilter)}
        >
          Start Tournament
        </button>
      </div>
      
      <div className="text-sm text-gray-500">
        Select your favorite idols in each round to determine your ultimate bias!
      </div>
    </div>
  );
};

export default StartScreen;