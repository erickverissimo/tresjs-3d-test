<template>
  <v-app-bar flat class="border-b" color="white">
    <div class="d-flex align-center pa-2 ga-2">
      <v-btn
        @click="backPage"
        variant="text"
        flat
        prepend-icon="mdi-arrow-left"
        style="text-transform: initial"
      >
        Voltar
      </v-btn>
      <div>
        <h3 style="font-weight: bold">{{ title }}</h3>
        <div class="text-caption">{{ subtitle }}</div>
      </div>
    </div>
  </v-app-bar>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

import PageHeader from '@/components/shared/PageHeader.vue';

export default defineComponent({
  name: 'default-stepper-header',
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: false,
    },
    redirect: {
      type: Function,
      required: false,
    },
  },
  components: {
    PageHeader,
  },
  setup(props) {
    const router = useRouter();

    const backPage = () => {
      if (props.redirect) {
        props.redirect();
      } else {
        router.back();
      }
    };

    return {
      backPage,
    };
  },
});
</script>
