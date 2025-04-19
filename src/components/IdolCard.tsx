import React from 'react';
import { Idol } from '../types';

interface IdolCardProps {
  idol: Idol;
  onClick: () => void;
  isHoverable?: boolean;
  isResult?: boolean;
  rank?: number;
}

const IdolCard: React.FC<IdolCardProps> = ({ 
  idol, 
  onClick, 
  isHoverable = true,
  isResult = false,
  rank
}) => {
  const { name, groupName, imageUrl } = idol;

  return (
    <div 
      className={`relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 ${
        isHoverable ? 'cursor-pointer transform hover:scale-[1.02] hover:shadow-xl' : ''
      } ${isResult ? 'max-w-xs mx-auto' : 'h-full'}`}
      onClick={onClick}
    >
      <div className="relative h-full">
        {/* Idol Image */}
        <div className="overflow-hidden h-full">
          <img 
            src={imageUrl} 
            alt={name} 
            className={`object-cover w-full ${isResult ? 'h-80' : 'h-full'}`}
          />
        </div>
        
        {/* Overlay with Name and Group */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
          <h3 className="text-xl font-bold">{name}</h3>
          <p className="text-sm opacity-90">{groupName}</p>
        </div>
        
        {/* Rank Badge (for results) */}
        {isResult && rank && (
          <div className={`absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${
            rank === 1 ? 'bg-yellow-500' : 'bg-purple-600'
          } text-white font-bold`}>
            {rank}
          </div>
        )}
        
        {/* Hover Overlay */}
        {isHoverable && (
          <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-pink-600/30 opacity-0 transition-opacity duration-300 flex items-center justify-center hover:opacity-100">
            <span className="text-white font-bold text-lg px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm">
              선택하기
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default IdolCard;