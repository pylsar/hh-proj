<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import AppHeader from './components/AppHeader.vue';
</script>

<template>
  <div>
    <app-header />
    <RouterView />
  </div>

</template>

