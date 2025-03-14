
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { useAuction } from '@/contexts/AuctionContext';
import PlayerCard from '@/components/players/PlayerCard';
import { Player } from '@/types';

const TeamDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { teams } = useAuction();
  
  const team = teams.find(t => t.id === id);
  
  if (!team) {
    return (
      <Layout>
        <div className="container py-8 text-center">
          <p>Team not found</p>
          <Button asChild className="mt-4">
            <Link to="/teams">Back to Teams</Link>
          </Button>
        </div>
      </Layout>
    );
  }
  
  // Group players by type
  const batsmen = team.players.filter(p => p.type === 'Batsman');
  const bowlers = team.players.filter(p => p.type === 'Bowler');
  const allRounders = team.players.filter(p => p.type === 'All-Rounder');
  const wicketKeepers = team.players.filter(p => p.type === 'Wicket-Keeper');
  
  // Format currency in crores
  const formatCurrency = (amount: number) => {
    return `₹${(amount / 10000000).toFixed(2)} Cr`;
  };
  
  // Get total player cost
  const getTotalPlayerCost = (players: Player[]) => {
    return players.reduce((sum, player) => sum + player.currentPrice, 0);
  };

  return (
    <Layout>
      <div className="container py-8">
        <div className="flex items-center gap-2 mb-6">
          <Button asChild variant="outline" size="icon">
            <Link to="/teams">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">{team.name}</h1>
        </div>
        
        {/* Team Overview Card */}
        <div 
          className="mb-8 p-6 rounded-lg shadow-sm"
          style={{ backgroundColor: `${team.primaryColor}10` }}
        >
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-shrink-0">
              <div 
                className="w-28 h-28 rounded-full flex items-center justify-center"
                style={{ backgroundColor: team.primaryColor }}
              >
                <span className="text-4xl font-bold text-white">
                  {team.name.charAt(0)}
                </span>
              </div>
            </div>
            
            <div className="flex-1">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                  <h2 className="text-xl font-semibold mb-4">Squad Overview</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Players</p>
                      <p className="text-2xl font-bold">{team.players.length}/13</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Budget Remaining</p>
                      <p className="text-2xl font-bold">{formatCurrency(team.budget)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Budget Spent</p>
                      <p className="text-2xl font-bold">{formatCurrency(getTotalPlayerCost(team.players))}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Avg. Player Cost</p>
                      <p className="text-2xl font-bold">
                        {team.players.length > 0 
                          ? formatCurrency(getTotalPlayerCost(team.players) / team.players.length) 
                          : '₹0 Cr'}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex-1">
                  <h2 className="text-xl font-semibold mb-4">Player Distribution</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Batsmen</p>
                      <p className="text-2xl font-bold">{batsmen.length}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Bowlers</p>
                      <p className="text-2xl font-bold">{bowlers.length}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">All-Rounders</p>
                      <p className="text-2xl font-bold">{allRounders.length}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Wicket-Keepers</p>
                      <p className="text-2xl font-bold">{wicketKeepers.length}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Players Tabs */}
        <Tabs defaultValue="all">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Players ({team.players.length})</TabsTrigger>
            <TabsTrigger value="batsmen">Batsmen ({batsmen.length})</TabsTrigger>
            <TabsTrigger value="bowlers">Bowlers ({bowlers.length})</TabsTrigger>
            <TabsTrigger value="all-rounders">All-Rounders ({allRounders.length})</TabsTrigger>
            <TabsTrigger value="wicket-keepers">Wicket-Keepers ({wicketKeepers.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            {team.players.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No players in the squad yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {team.players.map((player) => (
                  <PlayerCard key={player.id} player={player} />
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="batsmen">
            {batsmen.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No batsmen in the squad yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {batsmen.map((player) => (
                  <PlayerCard key={player.id} player={player} />
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="bowlers">
            {bowlers.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No bowlers in the squad yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {bowlers.map((player) => (
                  <PlayerCard key={player.id} player={player} />
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="all-rounders">
            {allRounders.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No all-rounders in the squad yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {allRounders.map((player) => (
                  <PlayerCard key={player.id} player={player} />
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="wicket-keepers">
            {wicketKeepers.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No wicket-keepers in the squad yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {wicketKeepers.map((player) => (
                  <PlayerCard key={player.id} player={player} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default TeamDetail;
