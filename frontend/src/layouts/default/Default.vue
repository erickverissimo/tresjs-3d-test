<template>
  <v-layout v-if="currentUser?.user !== undefined && isNotEmpty">
    <v-navigation-drawer
      class="border-r"
      v-model="sidebarVisible"
      :mini-variant.sync="sidebarVisible"
    >
      <div class="d-flex justify-center pa-2 py-5 border-b">
        <v-img src="../../assets/brand/bionic.svg" height="24" width="50" />
      </div>

      <v-app-bar-nav-icon
        v-if="!$isMobile()"
        class="position-fixed"
        variant="flat"
        color="primary"
        size="25"
        :icon="sidebarVisible ? 'mdi-chevron-left' : 'mdi-chevron-right'"
        @click.stop="changeSidebarView"
        :style="{
          top: '50px',
          left: sidebarVisible ? '240px' : '255px',
          zIndex: 2000,
        }"
      />

      <default-sidebar-layout />

      <template v-slot:append>
        <div class="d-lg-block d-none">
          <avatar-sidebar-layout />
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar
      v-if="$isMobile()"
      color="bg-white"
      height="55"
      flat
      class="border-b"
    >
      <v-app-bar-nav-icon variant="text" @click.stop="changeSidebarView" />
      <template v-slot:prepend>
        <v-img
          src="../../assets/brand/bionic.svg"
          class="d-sm-none d-block ml-2"
          height="25"
          width="50"
        />
      </template>
      <template v-slot:append>
        <div class="d-lg-none d-block">
          <avatar-navbar-layout />
        </div>
      </template>
    </v-app-bar>

    <v-main style="height: 100vh">
      <router-view />
    </v-main>
  </v-layout>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import { useAuthStore } from '@/stores';
import { isMobile } from '@/plugins/utils-plugins';

import DefaultSidebarLayout from '@/components/layout/default-layout-components/DefaultSidebarLayout.vue';
import AvatarNavbarLayout from '@/components/layout/avatar/AvatarNavbarLayout.vue';
import AvatarSidebarLayout from '@/components/layout/avatar/AvatarSidebarLayout.vue';

export default defineComponent({
  name: 'default-layout',
  components: {
    AvatarSidebarLayout,
    AvatarNavbarLayout,
    DefaultSidebarLayout,
  },
  setup() {
    const authStore = useAuthStore();

    const sidebarVisible = ref(false);
    const drawer = ref(false);

    const currentUser = computed(() => authStore.currentUser);

    const changeSidebarView = () => {
      sidebarVisible.value = !sidebarVisible.value;
    };

    const isNotEmpty = computed(() => {
      return (
        currentUser.value?.user &&
        Object.keys(currentUser.value.user).length > 0
      );
    });

    onMounted(() => {
      sidebarVisible.value = false;
    });

    return {
      sidebarVisible,
      drawer,
      currentUser,
      changeSidebarView,
      isNotEmpty,
    };
  },
});
</script>
<style>
.v-container {
  padding: 0 !important;
  box-sizing: border-box;
}

.v-toolbar__prepend {
  margin-inline: 0px !important;
}
</style>
