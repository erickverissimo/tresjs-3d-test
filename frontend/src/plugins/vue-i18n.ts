import { createI18n } from 'vue-i18n';
import { en, pt } from 'vuetify/locale';

const messages = {
  en: {
    $vuetify: {
      ...en,
    },
  },
  pt: {
    $vuetify: {
      ...pt,
    },
  },
};

export const i18n = createI18n({
  legacy: false, // Vuetify does not support the legacy mode of vue-i18n
  locale: 'pt',
  fallbackLocale: 'en',
  messages,
});
