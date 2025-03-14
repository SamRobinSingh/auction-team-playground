
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuction } from '@/contexts/AuctionContext';
import { User, LogOut } from 'lucide-react';

const Header: React.FC = () => {
  const { currentUser, logout } = useAuction();
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', role: 'all' },
    { name: 'Teams', path: '/teams', role: 'all' },
    { name: 'Players', path: '/players', role: 'all' },
    { name: 'Live Auction', path: '/auction', role: 'all' },
    { name: 'Admin', path: '/admin', role: 'admin' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-bold text-2xl bg-gradient-to-r from-ipl-purple to-ipl-orange bg-clip-text text-transparent">
              IPL Auction
            </span>
          </Link>
          
          <nav className="hidden md:flex gap-6">
            {navItems.map((item) => {
              if (item.role === 'admin' && currentUser?.role !== 'admin') {
                return null;
              }
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    location.pathname === item.path ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          {currentUser ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground hidden md:inline-block">
                {currentUser.name} ({currentUser.role})
              </span>
              <Button variant="ghost" size="icon" onClick={logout}>
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          ) : (
            <Link to="/login">
              <Button variant="outline" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
