
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Player, Team, User, AuctionState } from '@/types';
import { getInitialPlayers } from '@/data/players';
import { getInitialTeams } from '@/data/teams';

interface AuctionContextType {
  players: Player[];
  teams: Team[];
  currentUser: User | null;
  auction: AuctionState;
  setCurrentUser: (user: User | null) => void;
  assignPlayerToTeam: (playerId: string, teamId: string, bidAmount: number) => void;
  startBidding: (playerId: string) => void;
  placeBid: (teamId: string, amount: number) => void;
  finalizeBid: () => void;
  login: (email: string, role: 'admin' | 'user') => void;
  logout: () => void;
}

const AuctionContext = createContext<AuctionContextType | undefined>(undefined);

export const AuctionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [players, setPlayers] = useState<Player[]>(getInitialPlayers());
  const [teams, setTeams] = useState<Team[]>(getInitialTeams());
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [auction, setAuction] = useState<AuctionState>({
    status: 'upcoming',
    currentPlayerId: null,
    currentBid: 0,
    currentBidder: null,
    timeRemaining: 30,
  });

  // Update teams when players change
  useEffect(() => {
    const updatedTeams = teams.map(team => ({
      ...team,
      players: players.filter(player => player.teamId === team.id)
    }));
    setTeams(updatedTeams);
  }, [players]);

  const login = (email: string, role: 'admin' | 'user') => {
    // In a real app, this would validate credentials
    const mockUser: User = {
      id: '1',
      name: role === 'admin' ? 'Admin User' : 'Team Owner',
      email,
      role
    };
    setCurrentUser(mockUser);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const assignPlayerToTeam = (playerId: string, teamId: string, bidAmount: number) => {
    // Update player
    setPlayers(prev => prev.map(player => {
      if (player.id === playerId) {
        return {
          ...player,
          teamId,
          currentPrice: bidAmount,
          status: 'sold'
        };
      }
      return player;
    }));

    // Update team budget
    setTeams(prev => prev.map(team => {
      if (team.id === teamId) {
        return {
          ...team,
          budget: team.budget - bidAmount
        };
      }
      return team;
    }));
  };

  const startBidding = (playerId: string) => {
    const player = players.find(p => p.id === playerId);
    if (!player) return;

    setAuction({
      status: 'live',
      currentPlayerId: playerId,
      currentBid: player.basePrice,
      currentBidder: null,
      timeRemaining: 30,
    });
  };

  const placeBid = (teamId: string, amount: number) => {
    const team = teams.find(t => t.id === teamId);
    if (!team || team.budget < amount) return;

    setAuction(prev => ({
      ...prev,
      currentBid: amount,
      currentBidder: teamId,
      timeRemaining: 30, // Reset timer on new bid
    }));
  };

  const finalizeBid = () => {
    const { currentPlayerId, currentBidder, currentBid } = auction;
    
    if (currentPlayerId && currentBidder) {
      assignPlayerToTeam(currentPlayerId, currentBidder, currentBid);
    } else if (currentPlayerId) {
      // Mark as unsold if no bidder
      setPlayers(prev => prev.map(player => {
        if (player.id === currentPlayerId) {
          return { ...player, status: 'unsold' };
        }
        return player;
      }));
    }

    setAuction({
      status: 'upcoming',
      currentPlayerId: null,
      currentBid: 0,
      currentBidder: null,
      timeRemaining: 30,
    });
  };

  return (
    <AuctionContext.Provider value={{
      players,
      teams,
      currentUser,
      auction,
      setCurrentUser,
      assignPlayerToTeam,
      startBidding,
      placeBid,
      finalizeBid,
      login,
      logout
    }}>
      {children}
    </AuctionContext.Provider>
  );
};

export const useAuction = () => {
  const context = useContext(AuctionContext);
  if (context === undefined) {
    throw new Error('useAuction must be used within an AuctionProvider');
  }
  return context;
};
