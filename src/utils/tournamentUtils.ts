import { Idol, IdolFilterType, Tournament, Round, Match, TournamentLevel } from '../types';
import { getIdolsByGender } from '../data/idols';

// Shuffle array using Fisher-Yates algorithm
export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Calculate the number of rounds needed for the tournament
export const calculateTotalRounds = (contestants: number): number => {
  return Math.ceil(Math.log2(contestants));
};

// Get tournament level based on remaining contestants
export const getTournamentLevel = (currentRound: number, totalRounds: number): TournamentLevel => {
  const remainingRounds = totalRounds - currentRound;
  switch (remainingRounds) {
    case 1:
      return 'Final';
    case 2:
      return 'Best4';
    case 3:
      return 'Best8';
    default:
      return 'Best16';
  }
};

// Get round number within current tournament level
export const getRoundInLevel = (currentRound: number, totalRounds: number): number => {
  const level = getTournamentLevel(currentRound, totalRounds);
  switch (level) {
    case 'Best16':
      return currentRound + 1;
    case 'Best8':
      return currentRound - (totalRounds - 4) + 1;
    case 'Best4':
      return currentRound - (totalRounds - 3) + 1;
    case 'Final':
      return 1;
    default:
      return currentRound + 1;
  }
};

// Create pairs of contestants for matches
export const createPairs = (contestants: Idol[]): [Idol, Idol][] => {
  const pairs: [Idol, Idol][] = [];
  
  for (let i = 0; i < contestants.length; i += 2) {
    // If we have an odd number, the last idol gets a bye
    if (i + 1 >= contestants.length) break;
    pairs.push([contestants[i], contestants[i + 1]]);
  }
  
  return pairs;
};

// Initialize a tournament with the given filter type
export const initTournament = (filter: IdolFilterType): Tournament => {
  const contestants = shuffleArray(getIdolsByGender(filter));
  
  // We need a power of 2 number of contestants for a proper tournament
  const validContestantCount = Math.pow(2, Math.floor(Math.log2(contestants.length)));
  const tournamentContestants = contestants.slice(0, validContestantCount);
  
  const pairs = createPairs(tournamentContestants);
  
  const firstRound: Round = {
    matches: pairs.map(pair => ({
      contestants: pair,
      winner: null
    }))
  };
  
  return {
    rounds: [firstRound],
    currentRound: 0,
    currentMatch: 0,
    filter,
    totalRounds: calculateTotalRounds(tournamentContestants.length)
  };
};

// Advance to the next match in the tournament
export const advanceToNextMatch = (tournament: Tournament): Tournament => {
  const { currentRound, currentMatch, rounds } = tournament;
  const round = rounds[currentRound];
  
  // If we reached the end of the current round, create the next round
  if (currentMatch >= round.matches.length - 1) {
    // If this was the final round, don't advance
    if (currentRound >= tournament.totalRounds - 1) {
      return tournament;
    }
    
    // Create next round with winners from current round
    const winners = round.matches.map(match => match.winner).filter(Boolean) as Idol[];
    const pairs = createPairs(winners);
    
    const nextRound: Round = {
      matches: pairs.map(pair => ({
        contestants: pair,
        winner: null
      }))
    };
    
    return {
      ...tournament,
      rounds: [...rounds, nextRound],
      currentRound: currentRound + 1,
      currentMatch: 0
    };
  }
  
  // Otherwise just advance to the next match in the current round
  return {
    ...tournament,
    currentMatch: currentMatch + 1
  };
};

// Select a winner for the current match
export const selectWinner = (tournament: Tournament, idol: Idol): Tournament => {
  const { currentRound, currentMatch, rounds } = tournament;
  const updatedRounds = [...rounds];
  
  // Update the winner of the current match
  updatedRounds[currentRound] = {
    ...rounds[currentRound],
    matches: rounds[currentRound].matches.map((match, index) => {
      if (index === currentMatch) {
        return {
          ...match,
          winner: idol
        };
      }
      return match;
    })
  };
  
  // Advance to the next match
  return advanceToNextMatch({
    ...tournament,
    rounds: updatedRounds
  });
};

// Check if the tournament is complete
export const isTournamentComplete = (tournament: Tournament): boolean => {
  const { currentRound, rounds, totalRounds } = tournament;
  return (
    currentRound === rounds.length - 1 &&
    rounds[currentRound].matches.length === 1 &&
    rounds[currentRound].matches[0].winner !== null
  );
};

// Get the current match
export const getCurrentMatch = (tournament: Tournament): Match | null => {
  const { currentRound, currentMatch, rounds } = tournament;
  
  if (currentRound < rounds.length && currentMatch < rounds[currentRound].matches.length) {
    return rounds[currentRound].matches[currentMatch];
  }
  
  return null;
};

// Get the winner of the tournament
export const getTournamentWinner = (tournament: Tournament): Idol | null => {
  const { rounds } = tournament;
  const finalRound = rounds[rounds.length - 1];
  
  if (finalRound && finalRound.matches.length === 1) {
    return finalRound.matches[0].winner;
  }
  
  return null;
};

// Get all winners from each round
export const getAllWinners = (tournament: Tournament): Idol[] => {
  const winners: Idol[] = [];
  
  // Get the winner from the final round
  const finalWinner = getTournamentWinner(tournament);
  if (finalWinner) winners.push(finalWinner);
  
  // Get the runner-up (the other contestant in the final match)
  const finalRound = tournament.rounds[tournament.rounds.length - 1];
  if (finalRound && finalRound.matches.length === 1) {
    const runnerUp = finalRound.matches[0].contestants.find(
      contestant => contestant.id !== finalWinner?.id
    );
    if (runnerUp) winners.push(runnerUp);
  }
  
  return winners;
};