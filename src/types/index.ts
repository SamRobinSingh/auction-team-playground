
export type Role = 'admin' | 'user';

export type PlayerType = 'Batsman' | 'Bowler' | 'All-Rounder' | 'Wicket-Keeper';

export interface Player {
  id: string;
  name: string;
  type: PlayerType;
  country: string;
  basePrice: number;
  currentPrice: number;
  image: string;
  stats: {
    matches?: number;
    runs?: number;
    wickets?: number;
    average?: number;
    strikeRate?: number;
    economyRate?: number;
  };
  teamId: string | null;
  status: 'available' | 'sold' | 'unsold';
}

export interface Team {
  id: string;
  name: string;
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  budget: number;
  players: Player[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  teamId?: string; // If user is associated with a team
}

export interface AuctionState {
  status: 'upcoming' | 'live' | 'completed';
  currentPlayerId: string | null;
  currentBid: number;
  currentBidder: string | null;
  timeRemaining: number;
}
