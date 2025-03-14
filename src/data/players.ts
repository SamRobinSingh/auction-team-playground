
import { Player } from '@/types';

// Generate 120 players with different types and countries
export const getInitialPlayers = (): Player[] => {
  const playerTypes = ['Batsman', 'Bowler', 'All-Rounder', 'Wicket-Keeper'] as const;
  const countries = ['India', 'Australia', 'England', 'South Africa', 'New Zealand', 'West Indies', 'Sri Lanka', 'Pakistan', 'Bangladesh', 'Afghanistan'];
  
  const players: Player[] = [];
  
  // First names and last names to generate random names
  const firstNames = ['Virat', 'Rohit', 'David', 'Steve', 'Joe', 'Babar', 'Kane', 'Ben', 'Kagiso', 'Shakib', 'Rashid', 'Jasprit', 'Mitchell', 'Jos', 'Quinton', 'Kieron', 'Angelo', 'Faf', 'Trent', 'Bhuvneshwar'];
  
  const lastNames = ['Kohli', 'Sharma', 'Warner', 'Smith', 'Root', 'Azam', 'Williamson', 'Stokes', 'Rabada', 'Al Hasan', 'Khan', 'Bumrah', 'Starc', 'Buttler', 'de Kock', 'Pollard', 'Mathews', 'du Plessis', 'Boult', 'Kumar'];
  
  for (let i = 0; i < 120; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const name = `${firstName} ${lastName}`;
    const type = playerTypes[Math.floor(Math.random() * playerTypes.length)];
    const country = countries[Math.floor(Math.random() * countries.length)];
    const basePrice = [20, 30, 40, 50, 75, 100, 150, 200][Math.floor(Math.random() * 8)] * 100000; // Base price in lakhs
    
    const player: Player = {
      id: `player-${i + 1}`,
      name,
      type,
      country,
      basePrice,
      currentPrice: basePrice,
      image: `/player-${(i % 15) + 1}.jpg`, // Would use actual player images in a real app
      stats: {
        matches: Math.floor(Math.random() * 100) + 10,
        runs: type !== 'Bowler' ? Math.floor(Math.random() * 3000) + 200 : undefined,
        wickets: type !== 'Batsman' ? Math.floor(Math.random() * 150) + 5 : undefined,
        average: type !== 'Bowler' ? Math.floor(Math.random() * 50) + 20 : undefined,
        strikeRate: type !== 'Bowler' ? Math.floor(Math.random() * 150) + 70 : undefined,
        economyRate: type !== 'Batsman' ? parseFloat((Math.random() * 4 + 4).toFixed(2)) : undefined,
      },
      teamId: null,
      status: 'available'
    };
    
    players.push(player);
  }
  
  return players;
};
