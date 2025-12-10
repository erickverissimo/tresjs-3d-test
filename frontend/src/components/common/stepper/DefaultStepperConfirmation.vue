<template>
  <div class="d-flex justify-center align-center ga-4 flex-column">
    <v-icon
      icon="mdi-check-decagram-outline"
      style="color: rgba(102, 187, 106, 1)"
      class="text-h1"
    />
    <div>
      {{ label }}
    </div>
    <div>
      <v-btn
        variant="flat"
        density="comfortable"
        color="primary"
        @click="closePage"
        >Fechar</v-btn
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'default-stepper-confirmation',
  props: {
    label: {
      type: String,
      required: true,
    },
    redirect: {
      type: Function,
      required: false,
    },
  },
  setup(props) {
    const router = useRouter();

    const closePage = () => {
      if (props.redirect) {
        props.redirect();
        return;
      }
      router.back();
    };

    return {
      closePage,
    };
  },
});
</script>
