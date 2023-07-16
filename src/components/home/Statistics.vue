<template>
  <div>
    <div id="main" class="w-full h-24"></div>
  </div>
</template>

<script setup>
import * as echarts from "echarts";
import time from "../../utils/timeHandler";
import { useAccountStore } from "../../store/accountStore";
import { onMounted } from "vue";

const accountStore = useAccountStore();

// 获取最近7天的数据
const getRecentWeekData = computed(() => {
  return time.getRecentWeekDate().map((item) => {
    return accountStore.weeklyExpenditureTotal[item] || 0;
  });
});

const option = {
  grid: {
    // 让图表占满容器
    top: "20px",
    left: "0px",
    right: "0px",
    bottom: "20px",
  },
  // x轴
  xAxis: {
    type: "category",
    // 轴线样式
    axisLine: {
      show: false,
    },
    // 刻度
    axisTick: {
      show: false,
    },
    // 刻度标签
    axisLabel: {},
    data: time.getRecentWeekMonthDate().reverse(),
  },
  // y轴
  yAxis: {
    type: "value",
    splitLine: {
      show: false,
    },
    // 轴线样式
    axisLine: {
      show: false,
    },
    // 刻度
    axisTick: {
      show: false,
    },
  },
  series: [
    {
      data: getRecentWeekData.value,
      type: "line",
      // 数据线样式
      lineStyle: {
        color: "#fa8191",
      },
      // 数据线平滑
      smooth: true,
      // 面积样式
      areaStyle: {
        color: {
          type: "linear",
          x: 0,
          y: 1,
          x2: 0,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: "white", // 0% 处的颜色
            },
            {
              offset: 1,
              color: "#ffccd1", // 100% 处的颜色
            },
          ],
          global: false, // 缺省为 false
        },
      },
      // 数据点样式
      itemStyle: {
        color: "#fa8191",
        opacity: 0.5,
      },
      label: {
        show: true,
        formatter: (params) => {
          return params.value * -1;
        },
      },
    },
  ],
};

onMounted(() => {
  var chartDom = document.getElementById("main");
  var myChart = echarts.init(chartDom);
  option && myChart.setOption(option);
});
</script>
