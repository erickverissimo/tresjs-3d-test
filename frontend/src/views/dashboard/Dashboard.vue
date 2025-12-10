<template>
  <v-container fluid class="d-flex justify-center align-center fill-height">
    <div style="width: 750px; height: 500px">
      <TresCanvas class="border rounded-lg" clear-color="#82DBC5">
        <FirstView />
      </TresCanvas>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { TresCanvas } from '@tresjs/core';
import FirstView from '@/components/dashboard-components/FirstView.vue';
</script>
