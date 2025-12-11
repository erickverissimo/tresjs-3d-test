<template>
  <v-container
    fluid
    class="d-flex justify-center align-center fill-height pa-4"
  >
    <div style="width: 1250px; height: 750px">
      <TresCanvas class="border rounded-lg" clear-color="#D3D3D3">
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
