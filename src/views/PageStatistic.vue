<template>
  <div style="height: 400px; width: 600px; margin: 0 auto">
    <Pie
      v-if="chartData && chartData.labels.length"
      :data="chartData"
      :options="chartOptions"
    />
    <p v-else>Загрузка данных...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Pie } from 'vue-chartjs';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';

import bbcData from '@/assets/db/bbcTop.json';

// Регистрируем необходимые компоненты Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, Title);

// Реактивные переменные для данных и опций диаграммы
const chartData = ref(null);
const chartOptions = ref({
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
          const value = context.raw || 0;
          const total = context.dataset.data.reduce((a, b) => a + b, 0);
          const percentage = ((value / total) * 100).toFixed(1);
          return `${label}: ${value} (${percentage}%)`;
        },
      },
    },
  },
});

const getData = () => {
  // Получаем массив книг из поля bbcTop
  const books = bbcData.bbcTop;
  console.log('books', books);

  // Подсчитываем количество прочитанных и непрочитанных книг
  const readCount = books.filter((book) => book.is_read === true).length;
  const unreadCount = books.filter((book) => book.is_read === false).length;

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

onMounted(() => {
  getData();
});
</script>
