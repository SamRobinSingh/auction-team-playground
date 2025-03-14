
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t bg-background py-6 mt-12">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
          <Link to="/" className="font-semibold text-lg">
            IPL Auction
          </Link>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link to="/about" className="hover:text-foreground transition-colors">
              About
            </Link>
            <Link to="/contact" className="hover:text-foreground transition-colors">
              Contact
            </Link>
            <Link to="/terms" className="hover:text-foreground transition-colors">
              Terms
            </Link>
            <Link to="/privacy" className="hover:text-foreground transition-colors">
              Privacy
            </Link>
          </div>
        </div>
        <div className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} IPL Auction. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
