
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useAuction } from '@/contexts/AuctionContext';
import { Role } from '@/types';
import Layout from '@/components/layout/Layout';

const Login = () => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<Role>('user');
  const { login } = useAuction();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, role);
    navigate(role === 'admin' ? '/admin' : '/');
  };

  return (
    <Layout>
      <div className="container max-w-md py-16">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Sign in</CardTitle>
            <CardDescription>
              Enter your credentials to access the auction platform
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="your-email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Role</Label>
                <RadioGroup 
                  defaultValue="user"
                  value={role}
                  onValueChange={(value) => setRole(value as Role)}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="user" id="user" />
                    <Label htmlFor="user">Team Owner</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="admin" id="admin" />
                    <Label htmlFor="admin">Admin</Label>
                  </div>
                </RadioGroup>
                <p className="text-xs text-muted-foreground mt-1">
                  Note: This is a demo application. In a real application, roles would be assigned based on authenticated user information.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full bg-gradient-to-r from-ipl-purple to-ipl-orange">
                Sign in
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </Layout>
  );
};

export default Login;
