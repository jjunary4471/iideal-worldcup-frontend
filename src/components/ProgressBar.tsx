import React from 'react';
import { Tournament } from '../types';
import { getTournamentLevel } from '../utils/tournamentUtils';

interface ProgressBarProps {
  tournament: Tournament;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ tournament }) => {
  const { currentRound, currentMatch, rounds, totalRounds } = tournament;
  const tournamentLevel = getTournamentLevel(currentRound, totalRounds);
  
  // Calculate overall progress
  const totalMatches = rounds.reduce((sum, round) => sum + round.matches.length, 0);
  let completedMatches = 0;
  
  // Count completed matches
  for (let i = 0; i < currentRound; i++) {
    completedMatches += rounds[i].matches.length;
  }
  completedMatches += currentMatch;
  
  const progress = Math.min((completedMatches / totalMatches) * 100, 100);
  
  // Get color based on tournament level
  const getGradient = () => {
    switch (tournamentLevel) {
      case 'Final':
        return 'from-yellow-500 to-orange-600';
      case 'Best4':
        return 'from-purple-500 to-indigo-600';
      case 'Best8':
        return 'from-blue-500 to-cyan-600';
      default:
        return 'from-pink-500 to-purple-600';
    }
  };
  
  return (
    <div className="w-full max-w-3xl mx-auto mb-6">
      <div className="flex justify-between text-sm text-gray-600 mb-2">
        <div className="flex items-center gap-2">
          <span className={`font-semibold ${
            tournamentLevel === 'Final' ? 'text-yellow-600' :
            tournamentLevel === 'Best4' ? 'text-purple-600' :
            tournamentLevel === 'Best8' ? 'text-blue-600' :
            'text-pink-600'
          }`}>
            {tournamentLevel}
          </span>
          <span className="text-gray-400">•</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <span className="font-medium">
          {completedMatches} of {totalMatches} Matches
        </span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
        <div 
          className={`h-2.5 rounded-full bg-gradient-to-r ${getGradient()} transition-all duration-500 ease-out`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;