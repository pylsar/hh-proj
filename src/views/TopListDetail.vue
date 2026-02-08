

<template>
     <div class="detail__box" v-if="book">
        {{ book }}
    <app-button @click="goBack" label="← Назад" severity="success" />
    
    </div>
</template>

<script setup lang="ts">

import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import bbcData from '@/assets/db/bbcTop.json'
import newYorkTimesData from '@/assets/db/newYorkTimes.json'
import type {BookBbc} from '@/interfaces'

// Получаем текущий маршрут
const route = useRoute()
const router = useRouter()
const book = ref<BookBbc | null>(null)

// Объединяем все книги из обоих источников
const allBooks: BookBbc[] = [
  ...bbcData.bbcTop,
  ...newYorkTimesData.NewYorkTimes
]

onMounted(() => {
  // Получаем id из параметров маршрута
  const bookId = route.params.id as string
  // Ищем книгу - сравниваем ID как строки
  const foundBook = allBooks.find(item => String(item.id) === String(bookId))
  if (foundBook) {
    book.value = foundBook
  } else {
    // Если книга не найдена, редирект на список
    router.push('/toplist')
  }
})

const goBack = (): void => {
  router.push('/toplist')
}
</script>