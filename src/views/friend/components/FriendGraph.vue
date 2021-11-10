<template>
  <div :style="{ height: height, width: width }" />
</template>

<script>
let dd = console.log;

import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme

//生成从minNum到maxNum的随机数
function randomNum(minNum, maxNum) {
  switch (arguments.length) {
    case 1:
      return parseInt(Math.random() * minNum + 1, 10);
      break;
    case 2:
      return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
      break;
    default:
      return 0;
      break;
  }
}

let nodeDataList = [
  {
    name: "佛山市南海区铝型材行业协会",
    symbol: "image:///static/images/friend-1.png",
    symbolSize: 200,
    value: [1200, 500],
  },
  {
    name: "广东炬申物流股份有限公司",
    symbol: "image:///static/images/friend-2.png",
    symbolSize: 150,
    value: [1100, 300],
  },
  {
    name: "国储供应链",
    symbol: "image:///static/images/friend-3.png",
    symbolSize: 150,
    value: [150, 200],
  },
  {
    name: "兴奇集团",
    symbol: "image:///static/images/friend-4.png",
    symbolSize: 200,
    value: [500, 200],
  },
  {
    name: "广发期货",
    symbol: "image:///static/images/friend-5.png",
    symbolSize: 150,
    value: [300, 300],
  },
  {
    name: "广州金控",
    symbol: "image:///static/images/friend-6.png",
    symbolSize: 150,
    value: [450, 800],
  },
  {
    name: "粤储集团",
    symbol: "image:///static/images/friend-7.png",
    symbolSize: 150,
    value: [800, 500],
  },
  {
    name: "江西铜业集团有限公司",
    symbol: "image:///static/images/friend-8.png",
    symbolSize: 200,
    value: [0, 500],
  },
  {
    name: "南储仓储管理集团有限公司",
    symbol: "image:///static/images/friend-9.png",
    symbolSize: 150,
    value: [200, 700],
  },
  {
    name: "南方报业传媒集团",
    symbol: "image:///static/images/friend-10.png",
    symbolSize: 200,
    value: [450, 600],
  },
  {
    name: "平安银行",
    symbol: "image:///static/images/friend-11.png",
    symbolSize: 200,
    value: [1000, 700],
  },
  {
    name: "新华社",
    symbol: "image:///static/images/friend-12.png",
    symbolSize: 200,
    value: [200, 450],
  },
  {
    name: "兴海集团",
    symbol: "image:///static/images/friend-13.png",
    symbolSize: 200,
    value: [600, 500],
  },
  {
    name: "兴美集团",
    symbol: "image:///static/images/friend-14.png",
    symbolSize: 200,
    value: [900, 300],
  },
  {
    name: "宇成金属",
    symbol: "image:///static/images/friend-15.png",
    symbolSize: 200,
    value: [700, 700],
  },
  {
    name: "中铝国际贸易集团有限公司",
    symbol: "image:///static/images/friend-16.png",
    symbolSize: 150,
    value: [700, 200],
  },
];

let line = {
  type: "lines",
  coordinateSystem: "cartesian2d",
  z: 1,
  effect: {
    show: false,
    smooth: true,
    trailLength: 0,
    symbol: "circle",
    color: "#ECEDF0",
    symbolSize: 3 * 3,
    period: 3,
    delay: 1000 + 500 * 0,
    loop: true,
  },
  lineStyle: {
    normal: {
      curveness: 0,
      color: "#2F86E2",
      width: 1,
    },
  },
  data: [],
};

let lines = [];

let line_coords = [
  {
    coords: [
      [0, 500],
      [200, 700],
    ],
  },
  {
    coords: [
      [0, 500],
      [150, 200],
    ],
  },
  {
    coords: [
      [0, 500],
      [200, 450],
    ],
  },
  {
    coords: [
      [200, 700],
      [450, 600],
    ],
  },
  {
    coords: [
      [200, 700],
      [450, 800],
    ],
  },
  {
    coords: [
      [450, 800],
      [450, 600],
    ],
  },
  {
    coords: [
      [450, 800],
      [200, 450],
    ],
  },
  {
    coords: [
      [450, 800],
      [300, 300],
    ],
  },
  {
    coords: [
      [450, 800],
      [700, 700],
    ],
  },
  {
    coords: [
      [700, 700],
      [450, 600],
    ],
  },
  {
    coords: [
      [700, 700],
      [600, 500],
    ],
  },
  {
    coords: [
      [700, 700],
      [1100, 300],
    ],
  },
  {
    coords: [
      [700, 700],
      [1000, 700],
    ],
  },
  {
    coords: [
      [1000, 700],
      [800, 500],
    ],
  },
  {
    coords: [
      [1000, 700],
      [700, 200],
    ],
  },
  {
    coords: [
      [1000, 700],
      [900, 300],
    ],
  },
  {
    coords: [
      [1000, 700],
      [1200, 500],
    ],
  },
  {
    coords: [
      [1200, 500],
      [900, 300],
    ],
  },
  {
    coords: [
      [1200, 500],
      [1100, 300],
    ],
  },
  {
    coords: [
      [1100, 300],
      [900, 300],
    ],
  },
  {
    coords: [
      [900, 300],
      [800, 500],
    ],
  },
  {
    coords: [
      [900, 300],
      [600, 500],
    ],
  },
  {
    coords: [
      [800, 500],
      [600, 500],
    ],
  },
  {
    coords: [
      [600, 500],
      [450, 600],
    ],
  },
  {
    coords: [
      [600, 500],
      [300, 300],
    ],
  },
  {
    coords: [
      [600, 500],
      [500, 200],
    ],
  },
  {
    coords: [
      [600, 500],
      [700, 200],
    ],
  },
  {
    coords: [
      [700, 200],
      [500, 200],
    ],
  },
  {
    coords: [
      [500, 200],
      [450, 600],
    ],
  },
  {
    coords: [
      [500, 200],
      [300, 300],
    ],
  },
  {
    coords: [
      [500, 200],
      [150, 200],
    ],
  },
  {
    coords: [
      [150, 200],
      [200, 450],
    ],
  },
  {
    coords: [
      [200, 450],
      [300, 300],
    ],
  },
  {
    coords: [
      [300, 300],
      [150, 200],
    ],
  },
];
let num_low = parseInt((line_coords.length * 10) / 100) + 0; //10%概率显示
let num = parseInt((line_coords.length * 50) / 100) + 0; //50%概率显示
let line_show = [];
for (let i = 0; i < randomNum(num_low, num); i++) {
  line_show.push(randomNum(0, line_coords.length));
}

line_coords.map((v, k) => {
  let temp = JSON.stringify(line);
  temp = JSON.parse(temp);
  temp.data.push(v);
  for (let i = 0; i < 3; i++) {
    let temp1 = JSON.stringify(temp);
    temp1 = JSON.parse(temp1);

    temp1.effect.delay = 1000 + 300 * (i + 1);
    temp1.effect.show = false;

    if (line_show.includes(k)) {
      temp1.effect.show = true;
    }
    lines.push(temp1);
  }
});

let series = [
  {
    type: "graph",
    coordinateSystem: "cartesian2d",
    roam: false,
    zoom: 1,
    label: {
      show: false,
    },
    emphasis: {
      label: {
        show: false,
      },
    },
    data: nodeDataList,
  },
  ...lines,
];

let option = {
  title: {
    show: false,
  },
  grid: {
    top: "20%",
  },
  xAxis: {
    show: false,
    type: "value",
  },
  yAxis: {
    show: false,
    type: "value",
  },
  animationEasingUpdate: "bounceInOut",
  // animationDurationUpdate: (idx) => {
  //   // 越往后的数据延迟越大
  //   return idx * 100;
  // },
  // animationDelay: (idx) => {
  //   // 越往后的数据延迟越大
  //   return idx * 100;
  // },
  series,
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
    setInterval(() => {
      this.ranOpt();
    }, 1000 * 10);
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el);
      this.updateChart(option);
    },
    updateChart(opt) {
      this.chart.setOption(opt);
    },
    ranOpt() {
      let line = {
        type: "lines",
        coordinateSystem: "cartesian2d",
        z: 1,
        effect: {
          show: false,
          smooth: true,
          trailLength: 0,
          symbol: "circle",
          color: "#ECEDF0",
          symbolSize: 3 * 3,
          period: 3,
          delay: 1000 + 500 * 0,
          loop: true,
        },
        lineStyle: {
          normal: {
            curveness: 0,
            color: "#2F86E2",
            width: 1,
          },
        },
        data: [],
      };

      let lines = [];

      let num_low = parseInt((line_coords.length * 10) / 100) + 0; //10%概率显示
      let num = parseInt((line_coords.length * 50) / 100) + 0; //50%概率显示
      let line_show = [];
      for (let i = 0; i < randomNum(num_low, num); i++) {
        line_show.push(randomNum(0, line_coords.length));
      }

      line_coords.map((v, k) => {
        let temp = JSON.stringify(line);
        temp = JSON.parse(temp);
        temp.data.push(v);
        for (let i = 0; i < 3; i++) {
          let temp1 = JSON.stringify(temp);
          temp1 = JSON.parse(temp1);

          temp1.effect.delay = 1000 + 300 * (i + 1);
          temp1.effect.show = false;

          if (line_show.includes(k)) {
            temp1.effect.show = true;
          }
          lines.push(temp1);
        }
      });

      let series = [
        {
          type: "graph",
          coordinateSystem: "cartesian2d",
          roam: false,
          zoom: 1,
          label: {
            show: false,
          },
          emphasis: {
            label: {
              show: false,
            },
          },
          data: nodeDataList,
        },
        ...lines,
      ];

      option = {
        title: {
          show: false,
        },
        grid: {
          top: "20%",
        },
        xAxis: {
          show: false,
          type: "value",
        },
        yAxis: {
          show: false,
          type: "value",
        },
        animation: false,
        series,
      };

      this.updateChart(option);
    },
  },
};
</script>
