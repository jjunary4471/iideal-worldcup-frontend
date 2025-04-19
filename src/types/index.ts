export interface Idol {
  id: number;
  name: string;
  groupName: string;
  imageUrl: string;
  gender: 'male' | 'female';
}

export type IdolFilterType = 'all' | 'male' | 'female';

export type TournamentLevel = 'Best16' | 'Best8' | 'Best4' | 'Final';

export interface Tournament {
  rounds: Round[];
  currentRound: number;
  currentMatch: number;
  filter: IdolFilterType;
  totalRounds: number;
}

export interface Round {
  matches: Match[];
}

export interface Match {
  contestants: [Idol, Idol];
  winner: Idol | null;
}