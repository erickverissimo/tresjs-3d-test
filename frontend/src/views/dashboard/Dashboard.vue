<template>
  <v-container fluid class="d-flex justify-center align-center fill-height">
    <div style="width: 1550px; height: 1000px">
      <TresCanvas class="border rounded-lg" clear-color="grey">
        <FirstView />
      </TresCanvas>
    </div>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { TresCanvas } from '@tresjs/core';

import FirstView from '@/components/dashboard-components/FirstView.vue';

export default defineComponent({
  name: 'dashboard',
  components: {
    TresCanvas,
    FirstView,
  },
  setup() {
    return {};
  },
});
</script>
