import React from 'react';
import { Match } from '../types';
import IdolCard from './IdolCard';
import { getTournamentLevel, getRoundInLevel } from '../utils/tournamentUtils';

interface MatchCardProps {
  match: Match;
  onSelectWinner: (index: number) => void;
  roundNumber: number;
  matchNumber: number;
  totalRounds: number;
}

const MatchCard: React.FC<MatchCardProps> = ({ 
  match, 
  onSelectWinner, 
  roundNumber, 
  matchNumber,
  totalRounds
}) => {
  const [contestant1, contestant2] = match.contestants;
  const tournamentLevel = getTournamentLevel(roundNumber, totalRounds);
  const roundInLevel = getRoundInLevel(roundNumber, totalRounds);

  return (
    <div className="flex flex-col items-center">
      <div className="w-full mb-8 text-center">
        <div className="inline-flex items-center gap-3 bg-white rounded-full px-6 py-2 shadow-md">
          <span className={`text-lg font-bold ${
            tournamentLevel === 'Final' ? 'text-yellow-600' :
            tournamentLevel === 'Best4' ? 'text-purple-600' :
            tournamentLevel === 'Best8' ? 'text-blue-600' :
            'text-pink-600'
          }`}>
            {tournamentLevel}
          </span>
          <span className="w-px h-4 bg-gray-300"></span>
          <span className="text-gray-600">
            Round {roundInLevel}
          </span>
          <span className="w-px h-4 bg-gray-300"></span>
          <span className="text-gray-600">
            Match {matchNumber + 1}
          </span>
        </div>
        
        <div className="mt-3 text-sm text-gray-500">
          Choose your favorite
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        <div className="h-[60vh] md:h-[70vh] relative">
          <IdolCard 
            idol={contestant1} 
            onClick={() => onSelectWinner(0)} 
          />
        </div>
        
        <div className="relative flex items-center justify-center text-3xl font-bold text-pink-600 md:hidden">
          VS
        </div>
        
        <div className="h-[60vh] md:h-[70vh] relative">
          <IdolCard 
            idol={contestant2} 
            onClick={() => onSelectWinner(1)} 
          />
        </div>
      </div>
      
      <div className="hidden md:flex items-center justify-center my-4 text-4xl font-bold text-pink-600">
        VS
      </div>
    </div>
  );
};

export default MatchCard;