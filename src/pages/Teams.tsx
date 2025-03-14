
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Layout from '@/components/layout/Layout';
import { useAuction } from '@/contexts/AuctionContext';

const Teams = () => {
  const { teams } = useAuction();

  // Format currency in crores
  const formatCurrency = (amount: number) => {
    return `₹${(amount / 10000000).toFixed(2)} Cr`;
  };

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6">Teams</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map((team) => (
            <Link key={team.id} to={`/teams/${team.id}`}>
              <Card className="h-full hover:shadow-md transition-all">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: team.primaryColor }}
                    >
                      <span className="text-2xl font-bold text-white">
                        {team.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">{team.name}</h2>
                      <p className="text-sm text-muted-foreground">
                        {team.players.length} / 13 Players
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Squad Size</span>
                        <span className="font-medium">{team.players.length}/13</span>
                      </div>
                      <Progress value={(team.players.length / 13) * 100} />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Budget Remaining</span>
                        <span className="font-medium">{formatCurrency(team.budget)}</span>
                      </div>
                      <Progress value={(team.budget / 850000000) * 100} />
                    </div>
                    
                    <div className="grid grid-cols-4 gap-2 text-center text-sm">
                      <div>
                        <p className="font-medium">{team.players.filter(p => p.type === 'Batsman').length}</p>
                        <p className="text-xs text-muted-foreground">BAT</p>
                      </div>
                      <div>
                        <p className="font-medium">{team.players.filter(p => p.type === 'Bowler').length}</p>
                        <p className="text-xs text-muted-foreground">BOWL</p>
                      </div>
                      <div>
                        <p className="font-medium">{team.players.filter(p => p.type === 'All-Rounder').length}</p>
                        <p className="text-xs text-muted-foreground">AR</p>
                      </div>
                      <div>
                        <p className="font-medium">{team.players.filter(p => p.type === 'Wicket-Keeper').length}</p>
                        <p className="text-xs text-muted-foreground">WK</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <p className="text-sm text-center w-full">View full squad</p>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Teams;
