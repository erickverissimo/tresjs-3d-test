import { ComponentCustomProperties } from 'vue';
import { hasPermission, hasPermissions } from './plugins/permissions';
import { isMobile, formatDate, isAdmin } from './plugins/utils-plugins';

export {};

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $hasPermissions: typeof hasPermissions;
    $hasPermission: typeof hasPermission;
    $isMobile: typeof isMobile;
    $formatDate: typeof formatDate;
    $isAdmin: typeof isAdmin;
  }
}
