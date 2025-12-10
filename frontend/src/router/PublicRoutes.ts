import { RouteRecordRaw } from 'vue-router';

// Public components:
const Login = () => import('@/views/public/Login.vue');
const Page404 = () => import('@/views/public/Page404.vue');

export const publicRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { public: true },
  },
  {
    path: '/:catchAll(.*)*',
    name: 'notFound',
    component: Page404,
    meta: { public: true },
  },
];
