<template>
  <!-- CÂMERA -->
  <TresPerspectiveCamera
    :position="cameraPosition"
    :fov="45"
    :lookAt="[0, 0, 0]"
  />

  <!-- CONTROLE PARA GIRAR -->
  <OrbitControls />

  <!-- LUZES -->
  <TresAmbientLight :intensity="0.6" />
  <TresDirectionalLight :position="[10, 20, 10]" :intensity="1.2" cast-shadow />

  <!-- SOLO (rotacionado para ficar “no chão”) -->
  <TresMesh receive-shadow :rotation="[-Math.PI / 2, 0, 0]">
    <TresBoxGeometry :args="[40, 40]" />
    <TresMeshStandardMaterial color="#79d8c5" />
  </TresMesh>

  <!-- PRÉDIO 1 -->
  <TresMesh :position="[-10, 3, -10]" cast-shadow>
    <TresBoxGeometry :args="[6, 6, 6]" />
    <TresMeshStandardMaterial color="#4c566a" />
  </TresMesh>

  <!-- PRÉDIO 2 -->
  <TresMesh :position="[10, 5, -10]" cast-shadow>
    <TresBoxGeometry :args="[8, 10, 8]" />
    <TresMeshStandardMaterial color="#5e81ac" />
  </TresMesh>

  <!-- PRÉDIO 3 -->
  <TresMesh :position="[-5, 4, 10]" cast-shadow>
    <TresBoxGeometry :args="[5, 8, 5]" />
    <TresMeshStandardMaterial color="#6d747e" />
  </TresMesh>

  <!-- PRÉDIO 4 -->
  <TresMesh :position="[12, 2, 10]" cast-shadow>
    <TresBoxGeometry :args="[4, 4, 4]" />
    <TresMeshStandardMaterial color="#9aa1aa" />
  </TresMesh>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { OrbitControls } from '@tresjs/cientos';

export default defineComponent({
  name: 'first-view',
  components: {
    OrbitControls,
  },
  setup() {
    const cameraPosition = ref<[number, number, number]>([25, 30, 50]);

    return {
      cameraPosition,
    };
  },
});
</script>
