<template>
  <primitive v-if="model" :object="model" :scale="0.01" />
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { useLoader } from '@tresjs/core';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

const {
  state: model,
  isLoading,
  error,
} = useLoader(FBXLoader, '/models/teste 4.fbx');

watch(model, (newModel) => {
  if (newModel) {
    console.log('Model loaded:', newModel);
  }
});
</script>
