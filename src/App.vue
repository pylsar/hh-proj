<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import {onMounted, ref} from 'vue'
import {useUserStore} from './stores/user';

import AppHeader from '@/components/AppHeader.vue';


const userStore = useUserStore();

const isLoading =ref<boolean>(true)

onMounted( () => {
  onAuthStateChanged(getAuth(), (user) => {
    if(user){
      console.log('user', user)
      userStore.userId = user.uid
    }else{
      userStore.userId = ''
    }
    isLoading.value = false

  })
})

</script>

<template>
  <div v-if="isLoading" class="spiner-box">
   <app-progressspiner />
  </div>
  <div v-else class="container">
    <app-header />
    <div>
      <RouterView /> 
    </div>
  </div>

</template>

<style>
  .spiner-box{
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    
  }
</style>