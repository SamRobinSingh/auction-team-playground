
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import Layout from '@/components/layout/Layout';
import { useAuction } from '@/contexts/AuctionContext';
import { Player, PlayerType } from '@/types';

const Admin = () => {
  const { players, teams, currentUser, assignPlayerToTeam } = useAuction();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [selectedPlayer, setSelectedPlayer] = useState<string>('');
  const [selectedTeam, setSelectedTeam] = useState<string>('');
  const [bidAmount, setBidAmount] = useState<string>('');

  // Check if user is admin
  React.useEffect(() => {
    if (!currentUser || currentUser.role !== 'admin') {
      toast({
        title: "Access Denied",
        description: "You need admin privileges to access this page.",
        variant: "destructive",
      });
      navigate('/login');
    }
  }, [currentUser, navigate, toast]);

  // Format currency in lakhs/crores
  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`;
    } else {
      return `₹${(amount / 100000).toFixed(1)} L`;
    }
  };

  // Handle player assignment
  const handleAssignPlayer = () => {
    if (!selectedPlayer || !selectedTeam || !bidAmount) {
      toast({
        title: "Missing information",
        description: "Please select a player, team, and enter a bid amount.",
        variant: "destructive",
      });
      return;
    }

    const amount = parseInt(bidAmount);
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid bid amount.",
        variant: "destructive",
      });
      return;
    }

    const player = players.find(p => p.id === selectedPlayer);
    const team = teams.find(t => t.id === selectedTeam);

    if (!player || !team) {
      toast({
        title: "Error",
        description: "Selected player or team not found.",
        variant: "destructive",
      });
      return;
    }

    if (team.players.length >= 13) {
      toast({
        title: "Team Full",
        description: `${team.name} already has 13 players, the maximum allowed.`,
        variant: "destructive",
      });
      return;
    }

    if (team.budget < amount) {
      toast({
        title: "Insufficient Budget",
        description: `${team.name} doesn't have enough budget for this bid.`,
        variant: "destructive",
      });
      return;
    }

    assignPlayerToTeam(selectedPlayer, selectedTeam, amount);
    
    toast({
      title: "Player Assigned",
      description: `${player.name} has been assigned to ${team.name} for ${formatCurrency(amount)}.`,
    });

    // Reset form
    setSelectedPlayer('');
    setSelectedTeam('');
    setBidAmount('');
  };

  // Get player status counts
  const availableCount = players.filter(p => p.status === 'available').length;
  const soldCount = players.filter(p => p.status === 'sold').length;
  const unsoldCount = players.filter(p => p.status === 'unsold').length;

  // Filter players by type
  const getPlayersByType = (type: PlayerType) => {
    return players.filter(p => p.type === type);
  };

  if (!currentUser || currentUser.role !== 'admin') {
    return null;
  }

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Players
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{players.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Available Players
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{availableCount}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Sold Players
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{soldCount}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Unsold Players
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{unsoldCount}</div>
            </CardContent>
          </Card>
        </div>

        {/* Assign Player Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Assign Player to Team</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm font-medium mb-2">Select Player</p>
                <Select value={selectedPlayer} onValueChange={setSelectedPlayer}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select player" />
                  </SelectTrigger>
                  <SelectContent>
                    {players
                      .filter(p => p.status === 'available')
                      .map(player => (
                        <SelectItem key={player.id} value={player.id}>
                          {player.name} ({player.type})
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-2">Select Team</p>
                <Select value={selectedTeam} onValueChange={setSelectedTeam}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select team" />
                  </SelectTrigger>
                  <SelectContent>
                    {teams.map(team => (
                      <SelectItem key={team.id} value={team.id}>
                        {team.name} ({formatCurrency(team.budget)})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-2">Bid Amount</p>
                <Input
                  type="number"
                  placeholder="Enter amount"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  min={100000}
                  step={100000}
                />
              </div>
              
              <div className="flex items-end">
                <Button onClick={handleAssignPlayer} className="w-full">
                  Assign Player
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Players by Type */}
        <Tabs defaultValue="batsman">
          <TabsList className="mb-6">
            <TabsTrigger value="batsman">Batsmen</TabsTrigger>
            <TabsTrigger value="bowler">Bowlers</TabsTrigger>
            <TabsTrigger value="all-rounder">All-Rounders</TabsTrigger>
            <TabsTrigger value="wicket-keeper">Wicket-Keepers</TabsTrigger>
          </TabsList>
          
          {(['Batsman', 'Bowler', 'All-Rounder', 'Wicket-Keeper'] as PlayerType[]).map((type) => (
            <TabsContent key={type} value={type.toLowerCase()}>
              <div className="rounded-lg border">
                <div className="grid grid-cols-5 p-4 font-medium bg-muted/30">
                  <div>Name</div>
                  <div>Country</div>
                  <div>Base Price</div>
                  <div>Status</div>
                  <div>Team</div>
                </div>
                {getPlayersByType(type).map((player) => {
                  const playerTeam = teams.find(t => t.id === player.teamId);
                  return (
                    <div key={player.id} className="grid grid-cols-5 p-4 border-t">
                      <div>{player.name}</div>
                      <div>{player.country}</div>
                      <div>{formatCurrency(player.basePrice)}</div>
                      <div>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
                          ${player.status === 'sold' ? 'bg-green-100 text-green-800' : 
                            player.status === 'unsold' ? 'bg-red-100 text-red-800' : 
                            'bg-blue-100 text-blue-800'}`}>
                          {player.status}
                        </span>
                      </div>
                      <div>{playerTeam?.name || '-'}</div>
                    </div>
                  );
                })}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </Layout>
  );
};

export default Admin;
