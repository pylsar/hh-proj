<script setup lang="ts">
    import {ref} from 'vue'

    const items = ([
        {
            label: 'Авторизация',
            icon: 'pi pi-user',
            path: '/auth'
        },
        {
            label: 'Добавить',
            icon: 'pi pi-plus',
            path: '/'
        },
        {
            label: 'Список',
            icon: 'pi pi-list',
            path: '/list'
        },
        {
            label: 'Статистика',
            icon: 'pi pi-chart-pie',
            path: '/statistic'
        },
    ])
</script>

<template>
    <app-menubar :model="items" class="menu">
        <template #item="{item, props}">
            <router-link :to="item.path" class="menu-item" v-bind="props.action">
                <span :class="item.icon"></span>
                <span>{{ item.label }}</span>
            </router-link>
        </template>
    </app-menubar>
</template>