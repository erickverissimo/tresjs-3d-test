import { ISidebarItemsTypes } from '@/types';

export const sidebarItems = (): ISidebarItemsTypes[] => [
  {
    name: 'Dashboard',
    to: '/dashboard',
    icon: 'mdi-chart-bar',
    resource: '',
    action: '',
  },
];
