// src/plugins/vuetify.ts
/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com
 */

// Styles
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';

// Composables / componentes lab
import { VDateInput } from 'vuetify/labs/VDateInput';
import { VMaskInput } from 'vuetify/labs/VMaskInput';
import { VFileUpload } from 'vuetify/labs/VFileUpload';

import { createVuetify } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi';

// Vuetify language adapter
import { createVueI18nAdapter } from 'vuetify/locale/adapters/vue-i18n';
import { useI18n } from 'vue-i18n';
import { i18n } from './vue-i18n';

export default createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#3e636e',
          green_primary: '#edf5f3',
          secondary: '#B55612',
          info: '#1E88E5',
          danger: '#dc3545',
          neutral: '#F0F1F2',
          blue_darken: 'rgba(13, 71, 161, 1)',
          tabs_primary: 'rgba(99, 86, 75, 1)',
          ligth_blue: 'rgba(225, 245, 254, 1)',
          tomatoe: 'rgba(249, 222, 220, 1)',
          custom_warning: '#FB8C00',
        },
      },
    },
  },
  components: {
    VDateInput,
    VMaskInput,
    VFileUpload,
  },
  locale: {
    adapter: createVueI18nAdapter({ i18n, useI18n }),
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
});
