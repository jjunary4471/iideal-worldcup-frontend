import React, { useState, useEffect } from 'react';
import { Idol } from '../types';
import IdolCard from './IdolCard';
import { Sparkles, Share2, RefreshCw } from 'lucide-react';
import Confetti from './Confetti';

interface ResultScreenProps {
  winners: Idol[];
  onRestart: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ winners, onRestart }) => {
  const [showConfetti, setShowConfetti] = useState(true);

  // Stop confetti after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleShare = () => {
    // Create share text
    const shareText = `My K-pop Ideal Type is ${winners[0]?.name} from ${winners[0]?.groupName}! Play K-pop Ideal Type World Cup to find yours!`;
    
    // Use Web Share API if available
    if (navigator.share) {
      navigator.share({
        title: 'K-pop Ideal Type World Cup Results',
        text: shareText,
        url: window.location.href,
      }).catch(error => console.log('Error sharing:', error));
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(shareText)
        .then(() => alert('Result copied to clipboard!'))
        .catch(err => console.error('Could not copy text: ', err));
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-center">
      {showConfetti && <Confetti />}
      
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-purple-800 mb-2 flex items-center justify-center">
          <Sparkles className="text-yellow-500 mr-2" />
          Your Ideal Type
          <Sparkles className="text-yellow-500 ml-2" />
        </h2>
        <p className="text-gray-600">
          Congratulations! You've completed the K-pop Ideal Type World Cup
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto mb-8">
        {winners.map((winner, index) => (
          <div key={winner.id} className="flex flex-col items-center">
            <div className="relative">
              <IdolCard 
                idol={winner} 
                onClick={() => {}} 
                isHoverable={false}
                isResult={true}
                rank={index + 1}
              />
              
              {index === 0 && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-4 py-1 rounded-full shadow-md font-bold">
                  Winner
                </div>
              )}
              
              {index === 1 && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-400 to-purple-600 text-white px-4 py-1 rounded-full shadow-md font-bold">
                  Runner-up
                </div>
              )}
            </div>
            
            <h3 className="mt-4 text-xl font-bold">
              {winner.name}
            </h3>
            <p className="text-gray-600">
              {winner.groupName}
            </p>
          </div>
        ))}
      </div>
      
      <div className="flex flex-col md:flex-row items-center justify-center gap-4">
        <button
          onClick={handleShare}
          className="flex items-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-full shadow hover:bg-indigo-700 transition-colors"
        >
          <Share2 size={18} className="mr-2" />
          Share Result
        </button>
        
        <button
          onClick={onRestart}
          className="flex items-center px-6 py-3 bg-pink-600 text-white font-semibold rounded-full shadow hover:bg-pink-700 transition-colors"
        >
          <RefreshCw size={18} className="mr-2" />
          New Tournament
        </button>
      </div>
    </div>
  );
};

export default ResultScreen;