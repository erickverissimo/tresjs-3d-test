<template>
  <div class="border-t pa-2 w-full">
    <div class="d-flex align-center justify-space-between">
      <div>
        <div class="text-subtitle-2">
          {{ currentUser?.user.name }}
        </div>
        <div class="text-subtitle-2" style="color: gray">
          {{
            currentUser?.user.roles[0]
              .replaceAll('_', ' ')
              .toLowerCase()
              .replace(/\b\w/g, (char: string) => char.toUpperCase())
          }}
        </div>
      </div>

      <v-btn
        append-icon="mdi-location-exit"
        variant="text"
        color="danger"
        style="text-transform: initial"
        @click="logout"
      >
        Sair
      </v-btn>
    </div>
    <div class="text-caption text-center mt-2" style="color: gray">
      Desenvolvido por: Oxy | Bionic
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useAuthStore } from '@/stores';

export default defineComponent({
  name: 'avatar-sidebar-layout',
  setup() {
    const authStore = useAuthStore();
    const currentUser = computed(() => authStore.currentUser);

    const logout = async () => {
      await authStore.logout();
    };

    return {
      currentUser,
      logout,
    };
  },
});
</script>
