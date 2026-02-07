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
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import bbcData from '../assets/db/bbcTop.json'
import type {BookBbc} from '@/interfaces'

const router = useRouter()


const books =  ref<BookBbc[] | null>(bbcData.bbcTop)

// Навигация к детальной странице

const goToDetail = (id: number): void => {
  router.push(`/toplist/${id}`)

}
</script>
