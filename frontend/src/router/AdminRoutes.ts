import { RouteRecordRaw } from 'vue-router';
import { checkAdminPermission } from '@/middlewares/checkAdminPermission';

// Default Components
const Dashboard = () => import('@/views/dashboard/Dashboard.vue');
const Teste = () => import('@/views/Teste.vue');

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
  {
    path: '/teste',
    name: 'Teste',
    component: Teste,
    beforeEnter: checkAdminPermission(),
    meta: {
      public: false,
    },
  },
];
