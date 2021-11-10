<template>
  <div :style="{ height: height, width: width }" />
</template>

<script>
let dd = console.log;

import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme

let option = {
  // grid: {
  //   right: 140,
  // },
  legend: {
    right:"10%",
    data: ["消费量", "生产量"],
    textStyle: {
      color: "#2a71b5",
    },
  },
  xAxis: {
    type: "category",
    data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    axisLine: {
      lineStyle: {
        width: 2,
        color: "#E6D90C",
      },
    },
    nameLocation: "middle",
  },
  yAxis: {
    type: "value",
    axisLine: { show: false },
    axisTick: { show: false },
    // minorTick: { show: false },
    axisLabel: {
      show: true,
      color: "#E6D90C",
    },
    splitLine: { show: false },
    // minorSplitLine: { show: false },
    // splitArea: { show: false },
  },
  // tooltip: {
  //   trigger: "axis",
  // },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260, 100, 100, 100, 100, 100],
      type: "line",
      itemStyle: {
        color: "#E20A3C",
      },
      name: "消费量",
      showSymbol: false,
    },
    {
      data: [100, 100, 100, 100, 100, 150, 230, 224, 218, 135, 147, 260],
      type: "line",
      itemStyle: {
        color: "#E1B738",
      },
      name: "生产量",
      showSymbol: false,
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
