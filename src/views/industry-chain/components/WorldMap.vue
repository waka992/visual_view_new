<template>
  <div :style="{ height: height, width: width }"></div>
</template>

<script>
let dd = console.log;

import echarts from "echarts";
import "echarts/lib/chart/map";
import "echarts/map/js/world";

let option = {
  // backgroundColor: '#fff',
  title: {
    show: false,
    text: "世界地图显示",
    subtext: "数据中心统计",
    left: "center",
    textStyle: {
      color: "red",
      fontSize: "16",
    },
    subtextStyle: {
      color: "smokewhite",
      fontSize: "13",
    },
  },
  tooltip: {
    trigger: "item",
  },

  //绘制基本的地图
  geo: {
    zoom: 1,
    map: "world",
    roam: false, //是否可手势或者鼠标滚轮放大缩小
    left: 10, //如果为0可最大化的在画布上显示地图，但也可能边缘处有的被隐藏，所以留一定的距离
    right: 10,
    label: {
      show: false,
    },
    itemStyle: {
      areaColor: "#002E57",
      borderColor: "#A3D2F3",
      borderWidth: 1,
    },
    emphasis: {
      label: {
        show: false,
      },
      itemStyle: {
        areaColor: "#D9EEFF",
      },
    },
    regions: [
      //这里可自定义每一个国家的颜色
      { name: "China", itemStyle: { areaColor: "green" } },
    ],
  },
  series: [
    {
      type: "effectScatter",
      coordinateSystem: "geo",
      symbol: "circle",
      symbolSize: 10, //这里也是可以用一个函数的，根据数据来决定标记的大小
      label: {
        show: false,
      },
      tooltip: {
        show: false,
      },
      itemStyle: {
        color: "#FDFE2A",
        shadowBlur: 10,
      },
      data: [
        //在地图按照坐标找出点
        {
          name: "新疆",
          capital: "库尔勒",
          value: [86.06, 41.68],
          man: "帆帆挖金",
        },
        {
          name: "甘肃",
          capital: "兰州",
          value: [103.73, 36.03, 9],
          man: "未来建筑师",
        },
      ],
      zlevel: 2,
    },
    {
      type: "lines",
      zlevel: 3,
      effect: {
        show: true,
        period: 4, //箭头指向速度，值越小速度越快
        trailLength: 0, //特效尾迹长度[0,1]值越大，尾迹越长重
        symbol: "arrow", //箭头图标
        symbolSize: 5, //图标大小
        color: "#E78A37",
      },
      lineStyle: {
        color: "#FDFE2A",
        width: 1, //线条宽度
        // opacity: 0.1, //尾迹线条透明度
        curveness: 0.3, //尾迹线条曲直度
      },
      data: [
        {
          coords: [
            [86.06, 41.68],
            [103.73, 36.03, 9],
          ],
        },
      ],
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

  mounted() {
    this.initChart();
  },

  data() {
    return {
      chart: null,
    };
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