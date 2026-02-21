<template>
  <div class="charts-box">
    <Pie v-if="hasChartData" :data="chartDataNonNull" :options="chartOptions" />
    <p v-else>Загрузка данных...</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { Pie } from 'vue-chartjs';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import type { ChartData, ChartOptions } from 'chart.js';
import type { BookBbc } from '@/interfaces';

import bbcData from '@/assets/db/bbcTop.json';

// Регистрируем необходимые компоненты Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, Title);

// Реактивные переменные для данных и опций диаграммы

type PieChartData = ChartData<'pie', number[], string | string[]>;
const chartData = ref<PieChartData | null>(null);
const chartOptions = ref<ChartOptions<'pie'>>({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'BBC Топ 200',
    },
    tooltip: {
      callbacks: {
        // Кастомный текст для всплывающей подсказки с процентами
        label: (context) => {
          const label = context.label || '';
          const value = Number(context.raw) || 0;
          const total = context.dataset.data.reduce((a, b) => a + b, 0);
          const percentage = ((value / total) * 100).toFixed(1);
          return `${label}: ${value} (${percentage}%)`;
        },
      },
    },
  },
});

const hasChartData = computed(() => {
  return (
    chartData.value !== null &&
    chartData.value.labels !== undefined &&
    chartData.value.labels.length > 0
  );
});

const chartDataNonNull = computed<PieChartData>(() => {
  // Если данных нет, возвращаем пустую структуру
  return (
    chartData.value || {
      labels: [],
      datasets: [
        {
          data: [],
          backgroundColor: [],
          borderWidth: 1,
        },
      ],
    }
  );
});

const getData = (): void => {
  // Получаем массив книг из поля bbcTop
  const books: BookBbc[] = bbcData.bbcTop;

  // Подсчитываем количество прочитанных и непрочитанных книг
  const readCount: number = books.filter(
    (book) => book.is_read === true
  ).length;
  const unreadCount: number = books.filter(
    (book) => book.is_read === false
  ).length;

  // Формируем данные для диаграммы
  chartData.value = {
    labels: ['Прочитано', 'Не прочитано'],
    datasets: [
      {
        backgroundColor: ['#006400', '#8B0000'], // Зеленый и красный
        data: [readCount, unreadCount],
        borderWidth: 1,
      },
    ],
  };
};

onMounted((): void => {
  getData();
});
</script>

<style lang="scss">
.charts-box {
  width: 40vw;
  height: 40vh;
  max-height: 400px;
  max-width: 600px;
  margin: 0 auto;
}
</style>
