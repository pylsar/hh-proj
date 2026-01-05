<script setup lang="ts">
    import {ref, computed} from 'vue'
    import type {ComputedRef} from 'vue'
    import {useUserStore} from '../stores/user';

    const userStore = useUserStore();

    interface IMenuItem {
        label: string,
        icon: string,
        path: string,
        show: ComputedRef<boolean>
    }

    const items = ref<IMenuItem[]>([
        {
            label: 'Авторизация',
            icon: 'pi pi-user',
            path: '/auth',
            show: computed(():boolean => !userStore.userId)
        },
        {
            label: 'Добавить',
            icon: 'pi pi-plus',
            path: '/',
            show: computed(():boolean => !!userStore.userId)
        },
        {
            label: 'Список',
            icon: 'pi pi-list',
            path: '/list',
            show: computed(():boolean => !!userStore.userId)
        },
        {
            label: 'Статистика',
            icon: 'pi pi-chart-pie',
            path: '/statistic',
            show: computed(():boolean => !!userStore.userId)
        },
    ])
</script>

<template>
    {{ userStore }}
    <app-menubar :model="items" class="menu">
        <template #item="{item, props}">
            <template v-if="item.show">
                <router-link :to="item.path" class="menu-item" v-bind="props.action">
                    <span :class="item.icon"/>
                    <span>{{ item.label }}</span>
                </router-link>
            </template>
        </template>
        <template #end>
            <span v-if="userStore.userId" @click="userStore.userId=''">
                <span class="pi pi-sign-out"></span>
                <span>Выход</span>
            </span>
        </template>
    </app-menubar>

</template>