<template>
  <v-app-bar flat class="border-b" color="white">
    <div class="d-flex align-center pa-2">
      <v-icon
        v-if="icon"
        :icon="icon"
        class="mr-2"
        size="24"
        style="color: gray"
      />
      <div>
        <h3 style="font-weight: bold">{{ title }}</h3>
        <p v-if="subtitle" class="text-caption" style="color: gray">
          {{ subtitle }}
        </p>
      </div>
    </div>
  </v-app-bar>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'page-header',
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: false,
      default: '',
    },
    icon: {
      type: String,
      required: false,
      default: '',
    },
  },
});
</script>
