<template>
  <div>
    <div class="w-100 d-flex flex-column pa-0 ma-0">
      <div
        class="text-caption pl-4 pa-2 text-uppercase"
        style="font-weight: bold; color: gray"
      >
        Navegação
      </div>
      <v-list
        v-if="items && items.length"
        nav
        density="compact"
        class="content-scrollable"
      >
        <div v-for="(item, index) in items" :key="index">
          <v-list-group
            :value="item.name"
            v-if="item.children && item.children.length"
          >
            <template v-slot:activator="{ props }">
              <v-list-item
                v-bind="props"
                :prepend-icon="item.icon"
                :title="item.name"
                :subtitle="item.subtitle"
              ></v-list-item>
            </template>

            <v-list-item
              v-for="(child, indexChild) in item.children"
              :key="indexChild"
              :title="child.name"
              :value="child.to"
              :href="child.to"
              :active="currentTab === child.to"
            ></v-list-item>
          </v-list-group>
          <v-list-item
            v-else
            color="primary"
            :prepend-icon="item.icon"
            :value="item.to"
            :title="item.name"
            :subtitle="item.subtitle"
            :href="item.to"
            :active="currentTab === item.to"
          />
        </div>
      </v-list>
    </div>
  </div>
</template>

<script lang="ts">
import { useRoute } from 'vue-router';
import { defineComponent, ref } from 'vue';
import { hasPermission } from '@/plugins/permissions';
import { useAuthStore } from '@/stores';
import { ISidebarItemsTypes } from '@/types';

import { sidebarItems } from '@/navItems/adminNavbar';

export default defineComponent({
  name: 'default-sidebar-layout',
  setup() {
    const authStore = useAuthStore();
    const route = useRoute();
    const items = ref<ISidebarItemsTypes[]>();
    const currentTab = ref(route.path);

    const logout = async () => {
      await authStore.logout();
    };

    const createNavItems = () => {
      return sidebarItems();
    };

    items.value = createNavItems()
      .filter((item) => {
        if (hasPermission(item.action, item.resource)) {
          return item;
        }
      })
      .map((item) => item);

    return {
      items,
      currentTab,
      logout,
    };
  },
});
</script>

<style lang="scss" scoped>
.content-scrollable {
  overflow-y: hidden;
}

@media screen and (max-height: 750px) {
  .content-scrollable {
    max-height: 510px;
    overflow-y: scroll !important;
    scroll-behavior: smooth;
  }
  .content-scrollable::-webkit-scrollbar {
    display: none;
  }
}
.v-slide-group-item--active {
  color: #1e88e5;
}
a {
  font-size: 13px !important;
}

:deep(.v-list-group__items .v-list-item) {
  padding-inline-start: 48px !important;
}
:deep(.v-list-group) {
  font-size: 13px !important;
}
</style>
