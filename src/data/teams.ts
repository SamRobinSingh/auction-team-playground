
import { Team } from '@/types';

export const getInitialTeams = (): Team[] => {
  return [
    {
      id: 'team-1',
      name: 'Mumbai Indians',
      logo: '/team-1.png',
      primaryColor: '#004BA0',
      secondaryColor: '#D1AB3E',
      budget: 850000000, // 85 crores
      players: []
    },
    {
      id: 'team-2',
      name: 'Chennai Super Kings',
      logo: '/team-2.png',
      primaryColor: '#F9CD05',
      secondaryColor: '#0081E9',
      budget: 850000000,
      players: []
    },
    {
      id: 'team-3',
      name: 'Royal Challengers Bangalore',
      logo: '/team-3.png',
      primaryColor: '#EC1C24',
      secondaryColor: '#000000',
      budget: 850000000,
      players: []
    },
    {
      id: 'team-4',
      name: 'Kolkata Knight Riders',
      logo: '/team-4.png',
      primaryColor: '#3A225D',
      secondaryColor: '#B3A123',
      budget: 850000000,
      players: []
    },
    {
      id: 'team-5',
      name: 'Delhi Capitals',
      logo: '/team-5.png',
      primaryColor: '#17479E',
      secondaryColor: '#EF1B23',
      budget: 850000000,
      players: []
    },
    {
      id: 'team-6',
      name: 'Punjab Kings',
      logo: '/team-6.png',
      primaryColor: '#ED1B24',
      secondaryColor: '#A7A9AC',
      budget: 850000000,
      players: []
    },
    {
      id: 'team-7',
      name: 'Rajasthan Royals',
      logo: '/team-7.png',
      primaryColor: '#2D3E8B',
      secondaryColor: '#EA1A85',
      budget: 850000000,
      players: []
    },
    {
      id: 'team-8',
      name: 'Sunrisers Hyderabad',
      logo: '/team-8.png',
      primaryColor: '#F7A721',
      secondaryColor: '#E95E0B',
      budget: 850000000,
      players: []
    }
  ];
};
