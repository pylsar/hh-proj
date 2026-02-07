<template>
  <div class="toplist__box">
    <h1>Топы</h1>
    <div class="toplist__items">
      <div 
        v-for="book in books" 
        :key="book.id"
        class="toplist__item"
        @click="goToDetail(book.id)"
      >
        <div class="toplist__item-content">
            <h3>{{ book.name }}</h3>
            <p>{{ book.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import bbcData from '../assets/db/bbcTop.json'

const router = useRouter()


const books = ref(bbcData.bbcTop)


// Навигация к детальной странице
const goToDetail = (id) => {
  router.push(`/toplist/${id}`)

}
</script>
