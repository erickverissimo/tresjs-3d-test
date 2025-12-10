<template>
  <v-row justify="center">
    <v-dialog
      v-model="showDeleteModal"
      max-width="480"
      persistent
      @update:model-value="closeModal"
    >
      <v-card class="rounded-xl elevation-6">
        <v-card-title
          class="d-flex align-center justify-space-between px-4 py-2"
        >
          <span class="text-h6 font-medium"> Deletar {{ targetDelete }} </span>
          <v-btn icon variant="text" @click="closeModal">
            <v-icon icon="mdi-close" size="24" class="text-gray-500" />
          </v-btn>
        </v-card-title>

        <v-divider class="grey-darken-3 p-2" />

        <v-card-text class="text-center px-6 pt-5 pb-5">
          <p class="text-center text-grey-darken-2 mb-0">
            Todas as informações associadas a
            <b>{{ targetDelete }}</b> serão permanentemente apagadas. Essa ação
            não poderá ser desfeita.
          </p>
        </v-card-text>

        <v-card-actions class="px-6 pb-6">
          <v-btn
            color="error"
            variant="tonal"
            block
            size="large"
            @click="callDelete(id)"
          >
            Remover
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'delete-modal',
  emits: ['closeModal'],
  props: {
    id: {
      type: String,
      required: true,
    },
    showDeleteModal: {
      type: Boolean,
      required: true,
    },
    targetDelete: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    const closeModal = () => emit('closeModal');
    const callDelete = (id: string) => emit('closeModal', id);

    return { closeModal, callDelete };
  },
});
</script>
