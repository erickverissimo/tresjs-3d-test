import { RouteRecordRaw } from 'vue-router';
import { checkAdminPermission } from '@/middlewares/checkAdminPermission';

// Default Components
const Dashboard = () => import('@/views/dashboard/Dashboard.vue');

export const adminRoutes: RouteRecordRaw[] = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    beforeEnter: checkAdminPermission(),
    meta: {
      public: false,
    },
  },
];
