<template>
  <div class="bar-tick" :style="{ height: height, width: width }" />
</template>

<script>
let dd = console.log;

import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme

let option = {
  tooltip: {
    trigger: "axis",
    axisPointer: {
      // 坐标轴指示器，坐标轴触发有效
      type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
    },
  },
  textStyle: {
    fontStyle: {
      color: "#fcc26f",
    },
  },
  xAxis: {
    type: "category",
    axisTick: {
      inside: true,
      length: 0,
      alignWithLabel: true,
    },
    axisLine: {
      lineStyle: {
        width: 2,
        color: "#65B1EA",
      },
    },
    data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  },
  yAxis: {
    show: true,
    nameLocation: "end",
    nameTextStyle: {
      // 坐标轴名称样式
      color: "#65B1EA",
      padding: [5, 0, 0, 5], // 坐标轴名称相对位置
    },
    nameGap: 10, // 坐标轴名称与轴线之间的距离
    axisTick: {
      inside: true,
      length: 0,
    },
    axisLine: {
      lineStyle: {
        width: 2,
        color: "#65B1EA",
      },
    },
    splitLine: {
      show: false,
      lineStyle: {
        type: "dashed",
        color: "#1e95f0",
      },
    },
    type: "value",
  },
  grid: {
    left: 50,
    right: 10,
    top: 20,
    bottom: 20,
    show: false,
    borderColor: "transparent",
    backgroundColor: "rgba(63,28,85,0.2)",
  },
  series: [
    {
      type: "bar",
      barWidth: "20%",
      data: [
        1000,
        5200,
        2000,
        3340,
        3900,
        3300,
        2200,
        2200,
        2200,
        2200,
        2200,
        2200,
      ],
      itemStyle: {
        normal: { color: "#65B1EA" },
      },
    },
  ],
};

export default {
  props: {
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "100%",
    },
  },
  data() {
    return {
      chart: null,
    };
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el);
      this.updateChart(option);
    },
    updateChart(opt) {
      this.chart.setOption(opt);
    },
  },
};
</script>
