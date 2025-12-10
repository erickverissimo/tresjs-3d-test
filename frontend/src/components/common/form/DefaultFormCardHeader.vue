<template>
  <div class="d-flex flex-column">
    <div class="d-flex ga-2 align-center">
      <v-icon v-if="icon" :icon="icon" style="font-weight: bold" />
      <div class="text-subtitle-1" style="font-weight: bold">
        {{ title }}
      </div>
    </div>
    <div
      v-if="subtitle"
      class="text-subtitle-1"
      style="color: gray; font-weight: 400"
    >
      {{ subtitle }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'default-form-card-header',
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: false,
    },
    icon: {
      type: String,
      required: false,
    },
  },
});
</script>
