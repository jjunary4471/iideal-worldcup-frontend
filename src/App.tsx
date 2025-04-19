import React, { useState } from 'react';
import Header from './components/Header';
import StartScreen from './components/StartScreen';
import MatchCard from './components/MatchCard';
import ResultScreen from './components/ResultScreen';
import ProgressBar from './components/ProgressBar';
import { IdolFilterType, Tournament } from './types';
import { 
  initTournament,
  selectWinner,
  getCurrentMatch,
  isTournamentComplete,
  getAllWinners
} from './utils/tournamentUtils';

function App() {
  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [isStarted, setIsStarted] = useState(false);

  // Start a new tournament with the selected filter
  const handleStartTournament = (filter: IdolFilterType) => {
    const newTournament = initTournament(filter);
    setTournament(newTournament);
    setIsStarted(true);
  };

  // Select winner for current match
  const handleSelectWinner = (winnerIndex: number) => {
    if (!tournament) return;
    
    const currentMatch = getCurrentMatch(tournament);
    if (!currentMatch) return;
    
    const winner = currentMatch.contestants[winnerIndex];
    const updatedTournament = selectWinner(tournament, winner);
    
    setTournament(updatedTournament);
  };

  // Restart the tournament
  const handleRestart = () => {
    setTournament(null);
    setIsStarted(false);
  };

  // Render different screens based on tournament state
  const renderContent = () => {
    if (!isStarted) {
      return <StartScreen onStart={handleStartTournament} />;
    }
    
    if (!tournament) return null;
    
    if (isTournamentComplete(tournament)) {
      const winners = getAllWinners(tournament);
      return <ResultScreen winners={winners} onRestart={handleRestart} />;
    }
    
    const currentMatch = getCurrentMatch(tournament);
    if (!currentMatch) return null;
    
    return (
      <div className="container mx-auto px-4 py-6">
        <ProgressBar tournament={tournament} />
        
        <MatchCard 
          match={currentMatch}
          onSelectWinner={handleSelectWinner}
          roundNumber={tournament.currentRound}
          matchNumber={tournament.currentMatch}
          totalRounds={tournament.totalRounds}
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow py-4">
        {renderContent()}
      </main>
      <footer className="py-4 text-center text-gray-500 text-sm bg-white shadow-inner">
        <p>K-pop Ideal Type World Cup &copy; 2025</p>
      </footer>
    </div>
  );
}

export default App;