<template>
  <div
    v-if="image"
    class="position-relative d-inline-block"
    @mouseenter="hover = true"
    @mouseleave="hover = false"
  >
    <v-img
      class="pa-2 border rounded-lg"
      :src="image"
      width="200"
      height="150"
      contain
    />

    <div
      v-if="hover"
      class="absolute inset-0 d-flex align-center justify-center bg-black rounded-lg cursor-pointer transition"
      @click="openImage"
    >
      <v-icon
        style="opacity: 1 !important"
        color="white"
        size="40"
        icon="mdi-eye"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useUploadStore } from '@/stores';

export default defineComponent({
  name: 'image-view',
  props: {
    file: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const hover = ref(false);
    const uploadStore = useUploadStore();
    const image = ref<string | null>(null);

    const getDocument = async () => {
      if (props.file) {
        try {
          await uploadStore.downloadFile(props.file);

          const file = uploadStore.downloadedFile;
          if (file instanceof Blob) {
            image.value = URL.createObjectURL(file);
          } else {
            console.error('O arquivo baixado não é válido:', file);
          }
        } catch (error) {
          console.error('Erro ao baixar o documento:', error);
        }
      }
    };

    const openImage = () => {
      if (image.value) {
        window.open(image.value, '_blank');
      }
    };

    onMounted(() => {
      getDocument();
    });

    return {
      openImage,
      hover,
      image,
    };
  },
});
</script>

<style scoped>
.absolute {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.6;
}
.transition {
  transition: background-color 0.2s ease-in-out;
}
</style>
