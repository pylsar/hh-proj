

<template>
     <div class="detail__box" v-if="book">
        {{ book }}
    <button @click="goBack" class="back-btn">← Назад</button>
    </div>
</template>

<script setup lang="ts">

import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import booksData from '../assets/db/bbcTop.json'

// Получаем текущий маршрут
const route = useRoute()
const router = useRouter()
const book = ref(null)

// Получаем id из параметров маршрута
const bookId = parseInt(route.params.id)

onMounted(() => {
  // Ищем книгу в данных по id
  const foundBook = booksData.bbcTop.find(item => item.id === bookId)
  if (foundBook) {
    book.value = foundBook
  } else {
    // Если книга не найдена, редирект на список
    router.push('/toplist')
  }
})

const goBack = () => {
  router.push('/toplist')
}
</script>