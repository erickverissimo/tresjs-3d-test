// Composables
import { createRouter, createWebHistory } from 'vue-router';
import { isAuthenticated } from '@/middlewares/auth';
import { getInitialRoute } from '@/navItems';
import { hasPermission } from '@/plugins/permissions';

//Layout:
const DefaultLayout = () => import('@/layouts/default/Default.vue');
const PublicLayout = () => import('@/layouts/public/Public.vue');

// routes:
import { adminRoutes } from './AdminRoutes';
import { publicRoutes } from './PublicRoutes';

const routes = [
  {
    path: '/',
    name: 'PublicRoutes',
    redirect: '/login',
    component: PublicLayout,
    children: publicRoutes,
  },
  {
    path: '/',
    name: 'AdminRoutes',
    redirect: '/login',
    component: DefaultLayout,
    children: adminRoutes,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

router.beforeEach(async (to, from, next) => {
  const isAuth = await isAuthenticated();

  const userHasPermission = hasPermission(
    to.meta.action as any,
    to.meta.resource as any,
  );

  if (isAuth && !userHasPermission) {
    if (from.name === 'Login') {
      return next({ name: 'notFound' });
    }

    return next({ path: '/login' });
  } else if (userHasPermission && isAuth) {
    const initialRoute = getInitialRoute();

    const publicRoutesNames = ['Login'];

    if (to.meta.public && to.name === 'notFound') {
      return next();
    }

    if (to.name && publicRoutesNames.includes(to.name.toString())) {
      return next({ path: initialRoute });
    }

    if (to.name === from.name) {
      return next();
    }

    if (to.path === '/') {
      return next({ path: initialRoute });
    }

    return next();
  }
  if (!to.meta.public && !isAuth) {
    if (to.name === 'Login') {
      return next();
    }
    return next({ name: 'Login' });
  }
  return next();
});

export default router;
