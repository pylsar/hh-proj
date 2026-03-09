<template>
  <div class="charts-box">
    <Bar v-if="hasChartData" :data="chartDataNonNull" :options="chartOptions" />
    <p v-else>Загрузка данных...</p>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  type ChartData,
  type ChartOptions,
} from 'chart.js';

import type { BookBbc } from '@/interfaces';
import imdbData from '../assets/db/imbdTop.json';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

// interface ChartDataset {
//   backgroundColor: string[];
//   data: number[];
//   borderWidth: number;
// }

// interface ChartData {
//   labels: string[];
//   datasets: ChartDataset[];
// }

const chartData = ref<ChartData<'bar'> | null>(null);

const hasChartData = computed(() => {
  return (
    chartData.value !== null &&
    chartData.value.labels !== undefined &&
    chartData.value.labels.length > 0
  );
});

const chartDataNonNull = computed<ChartData<'bar'>>(() => {
  // Если данных нет, возвращаем пустую структуру
  if (!chartData.value) {
    return {
      labels: [],
      datasets: [],
    };
  }
  return chartData.value;
});

const chartOptions = ref<ChartOptions<'bar'>>({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Статус просмотра фильмов из топа IMDB',
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 1,
      },
    },
  },
});

const getData = (): void => {
  if (!imdbData?.imdbTop) {
    console.error('Данные не загружены');
    return;
  }
  // Получаем массив фильмов из поля imdbTop
  const movies: BookBbc[] = imdbData.imdbTop;

  // Подсчитываем количество просмотренных и не просмотреных книг
  const watchCount: number = movies.filter(
    (movie) => movie.is_done === true
  ).length;
  const unwatchCount: number = movies.filter(
    (movie) => movie.is_done === false
  ).length;

  // Формируем данные для диаграммы
  chartData.value = {
    labels: ['Просмотрено', 'Не просмотрено'],
    datasets: [
      {
        label: 'Количество фильмов',
        backgroundColor: ['#006400', '#8B0000'], // Зеленый и красный
        data: [watchCount, unwatchCount],
        borderWidth: 1,
      },
    ],
  };
};

onMounted((): void => {
  getData();
});
</script>
