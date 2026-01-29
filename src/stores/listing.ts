import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface Section {
  name: string
  code: string
}

export interface Priority {
  name: string
  code: string
}

export const useListingStore = defineStore('listing', () => {

  const sections = ref<Section[]>([
    { name: 'Фильмы', code: 'movies' },
    { name: 'Сериалы', code: 'smovies' },
    { name: 'Книги', code: 'books' },
    { name: 'Игры', code: 'games' },
    { name: 'Спорт', code: 'sports' },
    { name: 'АйТи', code: 'it' },
    { name: 'Разное', code: 'dif' }
  ])

  const priorities = ref<Priority[]>([
    { name: 'Низкий', code: 'low' },
    { name: 'Средний', code: 'middle' },
    { name: 'Высокий', code: 'high' }
  ])




  return {
    sections,
    priorities,
  }
})