
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Users, DollarSign, Award } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { useAuction } from '@/contexts/AuctionContext';

const Index = () => {
  const { teams, players, auction } = useAuction();
  
  // Count sold players
  const soldPlayers = players.filter(player => player.status === 'sold').length;
  
  // Get highest bid
  const highestBid = players.reduce((max, player) => 
    player.currentPrice > max ? player.currentPrice : max, 0);
  
  // Format currency in crores
  const formatCurrency = (amount: number) => {
    return `₹${(amount / 10000000).toFixed(2)} Cr`;
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-gradient py-16 md:py-24">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Welcome to the <span className="bg-gradient-to-r from-ipl-purple to-ipl-orange bg-clip-text text-transparent">IPL Auction</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                Bid on top cricket talent, build your dream team, and compete for glory in the world's premier T20 cricket league.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-gradient-to-r from-ipl-purple to-ipl-orange">
                  <Link to="/auction">
                    Live Auction
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/teams">View Teams</Link>
                </Button>
              </div>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="relative w-full max-w-md aspect-square">
                <img
                  src="/placeholder.svg"
                  alt="IPL Trophy"
                  className="rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="overflow-hidden border-none shadow-md">
              <CardContent className="p-6 flex flex-col items-center">
                <div className="bg-ipl-purple/10 p-4 rounded-full mb-4">
                  <Users className="h-8 w-8 text-ipl-purple" />
                </div>
                <h3 className="text-3xl font-bold">{teams.length}</h3>
                <p className="text-muted-foreground">Teams</p>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden border-none shadow-md">
              <CardContent className="p-6 flex flex-col items-center">
                <div className="bg-ipl-orange/10 p-4 rounded-full mb-4">
                  <DollarSign className="h-8 w-8 text-ipl-orange" />
                </div>
                <h3 className="text-3xl font-bold">{formatCurrency(highestBid || 0)}</h3>
                <p className="text-muted-foreground">Highest Bid</p>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden border-none shadow-md">
              <CardContent className="p-6 flex flex-col items-center">
                <div className="bg-ipl-magenta/10 p-4 rounded-full mb-4">
                  <Award className="h-8 w-8 text-ipl-magenta" />
                </div>
                <h3 className="text-3xl font-bold">{soldPlayers}/{players.length}</h3>
                <p className="text-muted-foreground">Players Sold</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Teams Preview */}
      <section className="py-12 bg-muted/30">
        <div className="container">
          <div className="flex flex-col items-center text-center mb-10">
            <h2 className="text-3xl font-bold">IPL Teams</h2>
            <p className="text-muted-foreground mt-2">
              Eight teams competing for cricket's most prestigious T20 trophy
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {teams.map((team) => (
              <Link key={team.id} to={`/teams/${team.id}`}>
                <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all">
                  <CardContent className="p-6 flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                      <span className="text-2xl font-bold" style={{ color: team.primaryColor }}>
                        {team.name.charAt(0)}
                      </span>
                    </div>
                    <h3 className="font-medium text-center">{team.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Players: {team.players.length}/13
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          
          <div className="flex justify-center mt-10">
            <Button asChild variant="outline">
              <Link to="/teams">View All Teams</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12">
        <div className="container">
          <div className="bg-gradient-to-r from-ipl-purple to-ipl-orange p-8 md:p-12 rounded-lg text-white">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">
                Ready to join the auction?
              </h2>
              <p className="text-lg mb-6">
                Login now to participate in the bidding process and build your dream team.
              </p>
              <Button asChild size="lg" variant="secondary">
                <Link to="/login">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
