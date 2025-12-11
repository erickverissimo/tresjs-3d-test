<template>
  <OrbitControls
    :enableRotate="true"
    :enablePan="true"
    :enableZoom="true"
    :target="[0, 0, 0]"
  />
  <TresPerspectiveCamera :position="[0, 0, 3]" :args="[40, 1, 0.1, 1000]" />
  <Suspense>
    <ModelViewer />
  </Suspense>

  <TresAmbientLight :intensity="1" />
  <TresDirectionalLight :position="[4, 10, 4]" :intensity="2" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { OrbitControls } from '@tresjs/cientos';

import ModelViewer from '@/components/dashboard-components/ModelViewer.vue';

export default defineComponent({
  name: 'FirstView',
  components: { OrbitControls, ModelViewer },
  setup() {},
});
</script>
