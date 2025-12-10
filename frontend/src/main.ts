// Plugins
import { registerPlugins } from '@/plugins';
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify';
import router from '@/router';

// CSS styles for libs:
import 'vue3-toastify/dist/index.css';
import 'vue-awesome-paginate/dist/style.css';
import 'vuetify/styles';
import 'vuetify/components';
import 'vuetify/directives';

// Components
import App from './App.vue';

// Composables
import { createApp } from 'vue';

const app = createApp(App);

app.use(Vue3Toastify, {
  autoClose: 3000,
  position: 'bottom-right',
} as ToastContainerOptions);

registerPlugins(app);

router.isReady().then(() => {
  app.mount('#app');
});
