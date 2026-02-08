<template>
  <div class="toplist__box">
    <h1>Топы</h1>
    
    <app-tabs :value="activeTab">
      <app-tabList>
        <app-tab 
          v-for="tab in tabs" 
          :key="tab.title" 
          :value="tab.value"
          @click="activeTab = tab.value"
        >
          {{ tab.title }}
        </app-tab>
      </app-tabList>
      <app-tabPanels>
        <app-tabPanel 
          v-for="tab in tabs" 
          :key="tab.value" 
          :value="tab.value"
        >
          <div v-if="activeTab === tab.value" class="toplist__items">
            <div 
              v-for="item in tab.data" 
              :key="item.id"
              class="toplist__item"
              @click="goToDetail(item.id)"
            >
              <ul class="toplist__item-content">
                <li>
                  <span>{{ item.id }}</span>
                  <span>
                    <i 
                      :class="{
                        'pi pi-check': item.is_read,
                        'pi pi-times': !item.is_read 
                      }" 
                      :style="{
                        color: item.is_read ? 'green' : 'red',
                      }"
                    ></i>
                  </span>
                  <span>{{ item.name }}</span>
                </li>
              </ul>
            </div>
          </div>
        </app-tabPanel>
      </app-tabPanels>
    </app-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import bbcData from '../assets/db/bbcTop.json'
import newYorkTimesData from '../assets/db/newYorkTimes.json'
import type {BookBbc} from '@/interfaces'

const router = useRouter()
const activeTab = ref<string>('0')

const tabs = ref([
    { 
      title: 'BBC 200', 
      value: '0',
      data: bbcData.bbcTop
    },
    { 
      title: 'New York Times 100', 
      value: '1',
      data: newYorkTimesData.NewYorkTimes
    },
])

const goToDetail = (id: number | string): void => {
  router.push(`/toplist/${id}`)
}
</script>

<style scoped>
  .toplist__item-content{
    list-style-type: none;
  }

  .toplist__item-content li{
    display: flex;
    gap: 8px;
  }
  .toplist__item-content li span{
    min-width: 20px;
  }
</style>
