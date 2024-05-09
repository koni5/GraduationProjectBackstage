<script setup lang="ts">
import {ECharts, EChartsOption, init} from 'echarts';
import {ref, watch, onMounted, onBeforeUnmount} from 'vue';

const props = defineProps(['option'])

const myChartsRef = ref<HTMLDivElement>();
let myChart: ECharts;
let timer
// 初始化echarts
const initChart = (): void => {
  if (myChart !== undefined) {
    myChart.dispose();
  }
  myChart = init(myChartsRef.value as HTMLDivElement);
  // 拿到option配置项，渲染echarts
  myChart?.setOption(props.option, true);
};

// 重新渲染echarts
const resizeChart = (): void => {
  timer = setTimeout(() => {
    if (myChart) {
      myChart.resize();
    }
  }, 500);
};

onMounted(() => {
  initChart();
  window.addEventListener('resize', resizeChart);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeChart);
  clearTimeout(timer);
  timer = 0;
});

watch(
    props.option,
    () => {
      initChart();
    },
    {
      deep: true
    }
);
</script>

<template>
  <div ref="myChartsRef" :style="{ height: height, width: width }" :option="option"/>
</template>
