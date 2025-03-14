
import React from 'react';
import { Player } from '@/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PlayerCardProps {
  player: Player;
  onClick?: () => void;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player, onClick }) => {
  // Format currency in lakhs/crores
  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`;
    } else {
      return `₹${(amount / 100000).toFixed(1)} L`;
    }
  };

  // Get color for player status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sold':
        return 'bg-green-500 hover:bg-green-600';
      case 'unsold':
        return 'bg-red-500 hover:bg-red-600';
      default:
        return 'bg-blue-500 hover:bg-blue-600';
    }
  };

  return (
    <Card 
      className="player-card cursor-pointer"
      onClick={onClick}
    >
      <div className="relative">
        <img 
          src={player.image || '/placeholder.svg'} 
          alt={player.name}
          className="w-full h-48 object-cover"
        />
        <Badge 
          className={`absolute top-2 right-2 capitalize ${getStatusColor(player.status)}`}
        >
          {player.status}
        </Badge>
      </div>
      <CardContent className="pt-4">
        <h3 className="font-bold text-lg mb-1">{player.name}</h3>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="outline">{player.type}</Badge>
          <span className="text-xs text-muted-foreground">{player.country}</span>
        </div>
        
        {player.type === 'Batsman' && (
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <p className="text-muted-foreground">Matches</p>
              <p className="font-medium">{player.stats.matches}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Runs</p>
              <p className="font-medium">{player.stats.runs}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Average</p>
              <p className="font-medium">{player.stats.average}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Strike Rate</p>
              <p className="font-medium">{player.stats.strikeRate}</p>
            </div>
          </div>
        )}
        
        {player.type === 'Bowler' && (
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <p className="text-muted-foreground">Matches</p>
              <p className="font-medium">{player.stats.matches}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Wickets</p>
              <p className="font-medium">{player.stats.wickets}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Economy</p>
              <p className="font-medium">{player.stats.economyRate}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Strike Rate</p>
              <p className="font-medium">{player.stats.strikeRate}</p>
            </div>
          </div>
        )}
        
        {player.type === 'All-Rounder' && (
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <p className="text-muted-foreground">Runs</p>
              <p className="font-medium">{player.stats.runs}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Wickets</p>
              <p className="font-medium">{player.stats.wickets}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Bat SR</p>
              <p className="font-medium">{player.stats.strikeRate}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Economy</p>
              <p className="font-medium">{player.stats.economyRate}</p>
            </div>
          </div>
        )}
        
        {player.type === 'Wicket-Keeper' && (
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <p className="text-muted-foreground">Matches</p>
              <p className="font-medium">{player.stats.matches}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Runs</p>
              <p className="font-medium">{player.stats.runs}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Average</p>
              <p className="font-medium">{player.stats.average}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Strike Rate</p>
              <p className="font-medium">{player.stats.strikeRate}</p>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t pt-4 flex justify-between">
        <div>
          <p className="text-xs text-muted-foreground">Base Price</p>
          <p className="font-medium">{formatCurrency(player.basePrice)}</p>
        </div>
        {player.status === 'sold' && (
          <div>
            <p className="text-xs text-muted-foreground">Sold For</p>
            <p className="font-medium">{formatCurrency(player.currentPrice)}</p>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default PlayerCard;
