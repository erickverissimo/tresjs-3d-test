/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import vuetify from './vuetify';
import router from '../router';
import { permissionPlugin } from './permissions';
import { utilsPlugins } from './utils-plugins';
import { pinia } from './pinia';

import VueAwesomePaginate from 'vue-awesome-paginate';

// Types
import type { App } from 'vue';

export function registerPlugins(app: App) {
  app
    .use(vuetify)
    .use(pinia)
    .use(permissionPlugin)
    .use(router)
    .use(utilsPlugins)
    .use(VueAwesomePaginate);
}
