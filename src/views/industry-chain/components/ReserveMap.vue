<template>
  <div :style="{ height: height, width: width }" />
</template>

<script>
let dd = console.log;

import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme

let option = {
  title: {
    show: false,
  },
  tooltip: {
    trigger: "item",
  },
  grid: {
    left: "0%",
    // right: "4%",
    top: "75%",
    bottom: "0%",
    containLabel: true,
  },
  xAxis: {
    type: "value",
    show: false,
    boundaryGap: [0, 0.01],
  },
  yAxis: {
    type: "category",
    data: ["四 美国", "三 德国", "二 韩国", "一 中国"],
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    axisLabel: {
      color: "#fff",
    },
  },
  series: [
    {
      type: "bar",
      barWidth: "30%",
      data: [
        {
          value: 100,
          name: "美国",
          itemStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "#FF002C", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#FF3881", // 100% 处的颜色
                },
              ],
            },
          },
        },
        {
          value: 130,
          name: "德国",
          itemStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "#EB9594", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#FE8CA7", // 100% 处的颜色
                },
              ],
            },
          },
        },
        {
          value: 200,
          name: "韩国",
          itemStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "#FFC86B", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#FEAA53", // 100% 处的颜色
                },
              ],
            },
          },
        },
        {
          value: 400,
          name: "中国",
          itemStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "#46BFEC", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#35B1DE", // 100% 处的颜色
                },
              ],
            },
          },
        },
      ],
    },
    {
      type: "pie",
      radius: [0, "60%"],
      center: ["50%", "35%"],
      data: [
        {
          value: 100,
          name: "美国",
          itemStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "#FF002C", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#FF3881", // 100% 处的颜色
                },
              ],
            },
          },
        },
        {
          value: 130,
          name: "德国",
          itemStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "#EB9594", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#FE8CA7", // 100% 处的颜色
                },
              ],
            },
          },
        },
        {
          value: 200,
          name: "韩国",
          itemStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "#FFC86B", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#FEAA53", // 100% 处的颜色
                },
              ],
            },
          },
        },
        {
          value: 400,
          name: "中国",
          itemStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "#46BFEC", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#35B1DE", // 100% 处的颜色
                },
              ],
            },
          },
        },
      ].sort(function (a, b) {
        return a.value - b.value;
      }),
      roseType: "radius",
      animationType: "scale",
      animationEasing: "elasticOut",
      animationDelay: function (idx) {
        return Math.random() * 200;
      },
      label: {
        color: "#6EBAEE",
      },
      labelLine: {
        lineStyle: {
          color: "#6EBAEE",
          type: "dashed",
        },
      },
      emphasis: {
        labelLine: {
          lineStyle: {
            color: "#6EBAEE",
            type: "dashed",
          },
        },
      },
      markPoint: {
        show: false,
      },
      markLine: {
        show: false,
      },
      markArea: {
        show: false,
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
