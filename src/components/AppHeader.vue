<script setup lang="ts">
import { ref, computed } from 'vue';
import type { ComputedRef } from 'vue';
import { useUserStore } from '../stores/user';
import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();

// interface IMenuItem {
//     label: string,
//     icon: string,
//     path: string,
//     show: ComputedRef<boolean>
// }

const items = computed(() => {
  if (userStore.userId) {
    return [
      {
        label: 'Добавить',
        icon: 'pi pi-plus',
        path: '/',
        show: true,
      },
      {
        label: 'Список',
        icon: 'pi pi-list',
        path: '/list',
        show: true,
      },
      {
        label: 'Статистика',
        icon: 'pi pi-chart-pie',
        path: '/statistic',
        show: true,
      },
      {
        label: 'Топы',
        icon: 'pi pi-list',
        path: '/toplist',
        show: true,
      },
    ];
  } else {
    return [
      {
        label: 'Авторизация',
        icon: 'pi pi-user',
        path: '/auth',
        show: true,
      },
    ];
  }
});
const signOutFunc = async (): Promise<void> => {
  await signOut(getAuth());
  router.push('/auth');
};
</script>

<template>
  <app-menubar :model="items" class="menu">
    <template #item="{ item, props }">
      <router-link
        v-if="item.show"
        :to="item.path"
        class="menu-item"
        v-bind="props.action"
      >
        <span :class="item.icon" />
        <span>{{ item.label }}</span>
      </router-link>
    </template>
    <template #end>
      <span v-if="userStore.userId" @click="signOutFunc" class="sign-out">
        <span class="pi pi-sign-out"></span>
        <span>Выход</span>
      </span>
    </template>
  </app-menubar>
</template>

<style lang="scss">
.menu {
  margin-bottom: 20px;
  .sign-out {
    display: flex;
    align-items: center;
    gap: 6px;
  }
}
</style>
