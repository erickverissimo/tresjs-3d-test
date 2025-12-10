<template>
  <div class="d-flex align-center ga-4">
    <v-menu transition="scale-transition">
      <template v-slot:activator="{ props }">
        <div class="w-100" v-bind="props">
          <v-avatar color="primary">
            <span class="text-subtitle-1">{{ userInitials() }}</span>
          </v-avatar>
          <v-btn
            class="d-sm-inline-flex d-none"
            variant="text"
            flat
            style="text-decoration: none; text-transform: initial"
            append-icon="mdi-chevron-down"
          >
            {{ currentUser?.user.name }}
          </v-btn>
        </div>
      </template>

      <v-list>
        <v-list-subheader class="d-sm-none d-inline-flex">
          {{ currentUser?.user.name }}
        </v-list-subheader>
        <v-list-item
          value="logout"
          @click="logout"
          base-color="danger"
          prepend-icon="mdi-location-exit"
        >
          <v-list-item-title>Sair</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useAuthStore } from '@/stores';

export default defineComponent({
  name: 'avatar-navbar-layout',
  setup() {
    const authStore = useAuthStore();
    const currentUser = computed(() => authStore.currentUser);

    const logout = async () => {
      await authStore.logout();
    };

    const userInitials = (): string => {
      if (currentUser && currentUser.value?.user) {
        const nameParts = currentUser.value.user.name.split(' ');
        if (nameParts.length > 1) {
          return nameParts[0][0] + nameParts[1][0];
        } else {
          return nameParts[0].substring(0, 2);
        }
      }
      return '';
    };

    return {
      currentUser,
      logout,
      userInitials,
    };
  },
});
</script>

<style lang="scss" scoped>
.v-slide-group-item--active {
  color: #1e88e5;
}
a {
  font-size: 13px !important;
}
</style>
