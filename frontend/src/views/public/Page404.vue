<template>
  <v-container fluid class="d-flex justify-center fill-height w-100">
    <v-row align="center">
      <v-col class="text-center">
        <h1 class="text-h1">Oops! Error 404</h1>
        <p class="text-subtitle-1 pa-5">
          Desculpe o transtorno, mas a página que você procura não pode ser
          encontrada.
        </p>
        <v-btn @click="backPage()" color="primary">
          <template #prepend
            ><v-icon icon="mdi-arrow-left-bold-circle-outline"></v-icon
          ></template>
          <span>Voltar</span>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { useRouter } from 'vue-router';

export default {
  name: 'Page404',
  setup() {
    const router = useRouter();

    const backPage = () => {
      router.push({ path: '/login' });
    };

    return {
      backPage,
    };
  },
};
</script>
