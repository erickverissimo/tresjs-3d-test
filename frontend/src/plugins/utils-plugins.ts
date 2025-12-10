import { useAuthStore } from '@/stores';
import { mobile } from './is-mobile';

export function isMobile(): boolean {
  return mobile.value;
}

export function isAdmin(): boolean {
  const authStore = useAuthStore();
  return authStore.currentUser?.user.roles.includes('admin') ?? false;
}

export function formatDate(date: Date): string {
  const formatedDate = new Date(date);
  return formatedDate.toLocaleString();
}

export const utilsPlugins = {
  install(app: any) {
    app.config.globalProperties.$isMobile = isMobile;
    app.config.globalProperties.$formatDate = formatDate;
    app.config.globalProperties.$isAdmin = isAdmin;
  },
};
