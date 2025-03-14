
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';
import PlayerCard from '@/components/players/PlayerCard';
import Layout from '@/components/layout/Layout';
import { useAuction } from '@/contexts/AuctionContext';
import { PlayerType } from '@/types';

const Players = () => {
  const { players } = useAuction();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('');
  const [filterCountry, setFilterCountry] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('');

  // Get unique countries from players
  const countries = [...new Set(players.map(player => player.country))];

  // Filter players based on search and filters
  const filteredPlayers = players.filter(player => {
    const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType ? player.type === filterType : true;
    const matchesCountry = filterCountry ? player.country === filterCountry : true;
    const matchesStatus = filterStatus ? player.status === filterStatus : true;
    
    return matchesSearch && matchesType && matchesCountry && matchesStatus;
  });

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6">Players</h1>
        
        {/* Filters */}
        <div className="mb-8 bg-white p-4 rounded-lg shadow-sm">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search players..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Player Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Types</SelectItem>
                  <SelectItem value="Batsman">Batsman</SelectItem>
                  <SelectItem value="Bowler">Bowler</SelectItem>
                  <SelectItem value="All-Rounder">All-Rounder</SelectItem>
                  <SelectItem value="Wicket-Keeper">Wicket-Keeper</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={filterCountry} onValueChange={setFilterCountry}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Countries</SelectItem>
                  {countries.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Status</SelectItem>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="sold">Sold</SelectItem>
                  <SelectItem value="unsold">Unsold</SelectItem>
                </SelectContent>
              </Select>
              
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={() => {
                  setSearchTerm('');
                  setFilterType('');
                  setFilterCountry('');
                  setFilterStatus('');
                }}
              >
                <Filter className="h-4 w-4" />
                Reset
              </Button>
            </div>
          </div>
        </div>
        
        {/* Players Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredPlayers.map((player) => (
            <PlayerCard 
              key={player.id} 
              player={player}
            />
          ))}
        </div>
        
        {filteredPlayers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No players found matching your filters.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Players;
