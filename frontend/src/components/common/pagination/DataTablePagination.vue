<template>
  <div class="d-flex justify-end align-center ga-6 border-t footer">
    <span style="color: gray"
      >Itens por página:
      <span style="color: black">{{ data.itensPerPage }}</span>
    </span>
    <div>
      <span> {{ startItem }} - {{ endItem }} de {{ data.totalItems }} </span>
    </div>
    <div class="d-flex justify-center">
      <vue-awesome-paginate
        :total-items="data.totalItems"
        :items-per-page="data.itensPerPage"
        v-model="data.currentPage"
        @click="onPageChange"
      >
        <template #prev-button>
          <v-icon icon="mdi-chevron-left" />
        </template>

        <template #next-button>
          <v-icon icon="mdi-chevron-right" />
        </template>
      </vue-awesome-paginate>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue';
import { IPaginateResponse } from '../../../types';
export default defineComponent({
  name: 'data-table-pagination',
  emits: ['onPageChange'],
  props: {
    data: {
      type: Object as PropType<IPaginateResponse<any>>,
      required: true,
    },
  },

  setup(props, { emit }) {
    const startItem = computed(() => {
      if (!props.data) return 0;
      return (props.data.currentPage - 1) * props.data.itensPerPage + 1;
    });

    const endItem = computed(() => {
      if (!props.data) return 0;
      const end = props.data.currentPage * props.data.itensPerPage;
      return end > props.data.totalItems ? props.data.totalItems : end;
    });

    const onPageChange = (value: number) => {
      emit('onPageChange', value);
    };

    return {
      onPageChange,
      startItem,
      endItem,
    };
  },
});
</script>

<style scoped>
.footer {
  height: 44px;
  background-color: #f8f8f8;
}

:deep(#componentContainer li:not(:first-child):not(:last-child)) {
  display: none;
}
</style>
