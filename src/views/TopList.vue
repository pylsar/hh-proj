<template>
  <div class="toplist__box">
    <h1>Топы</h1>
    <div class="toplist__items">
      <div 
        v-for="item in items" 
        :key="item.id"
        class="toplist__item"
        @click="goToDetail(item.id)"
      >
        <div class="toplist__item-content">
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const items = ref([
  { id: 1, rank: 1, title: 'Элемент 1', description: 'Описание 1' },
  { id: 2, rank: 2, title: 'Элемент 2', description: 'Описание 2' },
  { id: 3, rank: 3, title: 'Элемент 3', description: 'Описание 3' },
])


// Навигация к детальной странице
const goToDetail = (id) => {
  router.push(`/toplist/${id}`)

}
</script>
