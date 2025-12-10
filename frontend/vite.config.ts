import path from 'path';

// Plugins
import { templateCompilerOptions } from '@tresjs/core';
import vue from '@vitejs/plugin-vue';
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';
import ViteFonts from 'unplugin-fonts/vite';

// Utilities
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        transformAssetUrls,
        compilerOptions: {},
      },
      ...templateCompilerOptions,
    }),
    vuetify({
      autoImport: true,
    }),
    ViteFonts({
      google: {
        families: [
          {
            name: 'Roboto',
            styles: 'wght@100;300;400;500;700;900',
          },
        ],
      },
    }),
  ],
  cacheDir: 'node_modules/.vite',
  optimizeDeps: {
    include: [
      'vuetify/components/VApp',
      'vuetify/components/VAlert',
      'vuetify/components/VAvatar',
      'vuetify/components/VBadge',
      'vuetify/components/VBtnToggle',
      'vuetify/components/VCard',
      'vuetify/components/VCheckbox',
      'vuetify/components/VChip',
      'vuetify/components/VDataTable',
      'vuetify/components/VDialog',
      'vuetify/components/VDivider',
      'vuetify/components/VExpansionPanel',
      'vuetify/components/VFileInput',
      'vuetify/components/VForm',
      'vuetify/components/VFooter',
      'vuetify/components/VList',
      'vuetify/components/VMenu',
      'vuetify/components/VNumberInput',
      'vuetify/components/VProgressCircular',
      'vuetify/components/VSelect',
      'vuetify/components/VSheet',
      'vuetify/components/VStepper',
      'vuetify/components/VTable',
      'vuetify/components/VTabs',
      'vuetify/components/VTextarea',
      'vuetify/components/VTimePicker',
      'vuetify/components/VAutocomplete',
      'vuetify/components/VMain',
      'vuetify/components/VBtn',
      'vuetify/components/VGrid',
      'vuetify/components/VImg',
      'vuetify/components/VTextField',
      'vuetify/components/VAppBar',
      'vuetify/components/VLayout',
      'vuetify/components/VNavigationDrawer',
      'vuetify/components/VIcon',
      'vuetify/components/VToolbar',
      'vuetify/components/VTooltip',
      'vuetify/components/VRadioGroup',
      'vuetify/components/VRadio',
      'vuetify/components/VSwitch',
      'vuetify/components/VProgressLinear',
    ],
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "sass:math";`,
      },
    },
  },

  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue'],
  },
  server: {
    port: 8080,
  },
});
