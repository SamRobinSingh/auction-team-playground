
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Clock, DollarSign } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { useAuction } from '@/contexts/AuctionContext';
import { useToast } from '@/hooks/use-toast';

const Auction = () => {
  const { players, teams, auction, currentUser, startBidding, placeBid, finalizeBid } = useAuction();
  const [bidAmount, setBidAmount] = useState<string>('');
  const [timer, setTimer] = useState<number>(auction.timeRemaining);
  const { toast } = useToast();

  // Get current player
  const currentPlayer = auction.currentPlayerId 
    ? players.find(p => p.id === auction.currentPlayerId)
    : null;
  
  // Get current bidder team
  const currentBidderTeam = auction.currentBidder 
    ? teams.find(t => t.id === auction.currentBidder)
    : null;
  
  // Format currency in lakhs/crores
  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`;
    } else {
      return `₹${(amount / 100000).toFixed(1)} L`;
    }
  };
  
  // Timer
  useEffect(() => {
    if (auction.status !== 'live') return;
    
    setTimer(auction.timeRemaining);
    
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          finalizeBid();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [auction.status, auction.timeRemaining, finalizeBid]);
  
  // Handle starting bid for a player
  const handleStartBid = (playerId: string) => {
    if (!currentUser) {
      toast({
        title: "Authentication required",
        description: "Please login to participate in the auction.",
        variant: "destructive",
      });
      return;
    }
    
    if (currentUser.role !== 'admin') {
      toast({
        title: "Permission denied",
        description: "Only admins can start the bidding process.",
        variant: "destructive",
      });
      return;
    }
    
    startBidding(playerId);
  };
  
  // Handle placing a bid
  const handlePlaceBid = () => {
    if (!currentUser) {
      toast({
        title: "Authentication required",
        description: "Please login to participate in the auction.",
        variant: "destructive",
      });
      return;
    }
    
    if (currentUser.role !== 'user') {
      toast({
        title: "Permission denied",
        description: "Only team owners can place bids.",
        variant: "destructive",
      });
      return;
    }
    
    const amount = parseInt(bidAmount);
    
    if (isNaN(amount) || amount <= auction.currentBid) {
      toast({
        title: "Invalid bid amount",
        description: `Bid must be higher than the current bid of ${formatCurrency(auction.currentBid)}.`,
        variant: "destructive",
      });
      return;
    }
    
    // For demo, we're using a random team ID
    const randomTeamId = teams[Math.floor(Math.random() * teams.length)].id;
    placeBid(randomTeamId, amount);
    setBidAmount('');
    
    toast({
      title: "Bid placed!",
      description: `You've bid ${formatCurrency(amount)} for ${currentPlayer?.name}.`,
    });
  };
  
  // Get available players
  const availablePlayers = players.filter(p => p.status === 'available');

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6">Live Auction</h1>
        
        {/* Auction Status */}
        <div className="mb-8">
          {auction.status === 'live' ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-4">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <p className="font-medium">Auction is live now!</p>
            </div>
          ) : (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-center gap-4">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              <div>
                <p className="font-medium">Auction is not live</p>
                <p className="text-sm text-muted-foreground">
                  {currentUser?.role === 'admin' 
                    ? 'Select a player below to start the bidding process.' 
                    : 'Waiting for the admin to start the auction.'}
                </p>
              </div>
            </div>
          )}
        </div>
        
        {/* Current Bidding Card */}
        {auction.status === 'live' && currentPlayer && (
          <Card className="mb-8 border-primary">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Player Info */}
                <div className="flex-1">
                  <div className="flex gap-4">
                    <div className="w-24 h-24 overflow-hidden rounded-lg">
                      <img 
                        src={currentPlayer.image || '/placeholder.svg'}
                        alt={currentPlayer.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">{currentPlayer.name}</h2>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge>{currentPlayer.type}</Badge>
                        <span className="text-sm text-muted-foreground">{currentPlayer.country}</span>
                      </div>
                      <p className="mt-2">
                        <span className="text-sm text-muted-foreground">Base Price:</span>{' '}
                        <span className="font-medium">{formatCurrency(currentPlayer.basePrice)}</span>
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Bidding Info */}
                <div className="flex-1 flex flex-col items-center justify-center border-t md:border-t-0 md:border-l pt-4 md:pt-0 md:pl-6">
                  <div className="text-center mb-4">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Clock className="h-5 w-5 text-red-500" />
                      <span className="text-xl font-bold">{timer}s</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Time Remaining</p>
                  </div>
                  
                  <div className="text-center mb-4">
                    <div className="flex items-center justify-center gap-2">
                      <DollarSign className="h-5 w-5 text-green-500" />
                      <span className="text-2xl font-bold">{formatCurrency(auction.currentBid)}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Current Bid by{' '}
                      {currentBidderTeam 
                        ? <span className="font-medium">{currentBidderTeam.name}</span>
                        : 'Base Price'}
                    </p>
                  </div>
                  
                  {currentUser?.role === 'user' && (
                    <div className="flex items-center gap-2 w-full max-w-xs">
                      <Input 
                        type="number"
                        placeholder={`Min bid: ${auction.currentBid + 100000}`}
                        value={bidAmount}
                        onChange={(e) => setBidAmount(e.target.value)}
                        min={auction.currentBid + 100000}
                        step={100000}
                      />
                      <Button onClick={handlePlaceBid}>
                        Bid
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Available Players */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Available Players</h2>
          
          {availablePlayers.length === 0 ? (
            <div className="text-center py-12 bg-muted/20 rounded-lg">
              <p>All players have been auctioned!</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {availablePlayers.slice(0, 10).map((player) => (
                <Card key={player.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex items-center">
                      <div className="w-16 h-16 overflow-hidden">
                        <img 
                          src={player.image || '/placeholder.svg'}
                          alt={player.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="px-4 flex-1">
                        <h3 className="font-medium">{player.name}</h3>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {player.type}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {player.country}
                          </span>
                        </div>
                      </div>
                      <div className="px-4 text-right">
                        <p className="text-sm text-muted-foreground">Base Price</p>
                        <p className="font-medium">{formatCurrency(player.basePrice)}</p>
                      </div>
                      {currentUser?.role === 'admin' && auction.status !== 'live' && (
                        <div className="px-4">
                          <Button
                            size="sm"
                            onClick={() => handleStartBid(player.id)}
                          >
                            Start Bid
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Auction;
