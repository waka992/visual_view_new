<template>
  <div class="index-indextrade">
    <content-box :name="name">
      <template>
        <div class="top">
          <span class="top-center-title">平台月度交易数据</span>
        </div>
        <div class="chart">
          <div id="index-trade-chart" style="width: 100%;height:299px;"></div>
        </div>
      </template>
    </content-box>
  </div>
</template>

<script>
import echarts from "echarts";
import ContentBox from "@/components/ContentBox";

export default {
  name: "IndexTrade",
  components: {
    ContentBox
  },
  data() {
    return {
      name: {
        cnName: "交易数据",
        enName: "Transaction Data"
      }
    };
  },

  mounted() {
    this.getData();
  },

  methods: {
    getData() {
      this.initChart();
    },
    initChart() {
      let option = {
        legend: {
          data: ["Email", "Union Ads", "Video Ads", "Direct", "Search Engine"]
        },
        grid: {
          left: "6%",
          right: "6%",
          bottom: "3%",
          top: "25%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            axisLabel: { color: "#81899D", margin: 22 },
            data: ["20/12", "21/01", "21/02", "21/03", "21/04", "21/05", "21/06"],
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: { color: "#81899D" }
          }
        ],
        series: [
          {
            name: "Email",
            type: "line",
            stack: "Total",
            lineStyle: {
              color: "#708696"
            },
            symbol: 'circle',
            symbolSize: 6,
            areaStyle: {
              opacity: 0.2,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#708696"
                },
                {
                  offset: 1,
                  color: "rgba(0, 0, 0, 0)"
                }
              ])
            },
            itemStyle: {
                color:'#5490CE',
                borderColor: '#C7E8FE',
            },
            data: [120, 132, 101, 134, 90, 230, 210]
          }
        ]
      };

      // option通用配置(免得写满上面配置项，不方便cv)
      option.xAxis[0].axisLine = {};
      option.xAxis[0].splitLine = {};
      option.xAxis[0].axisTick = {};
      option.yAxis[0].axisLine = {};
      option.yAxis[0].splitLine = {};
      option.yAxis[0].axisTick = {};
      option.xAxis[0].splitLine.show = option.xAxis[0].axisTick.show = false;
      option.yAxis[0].axisLine.show = option.yAxis[0].splitLine.show = option.yAxis[0].axisTick.show = false;
      option.xAxis[0].axisLine.show = true;
      option.legend.show = false;

      let chart = echarts.init(document.getElementById("index-trade-chart"));
      chart.setOption(option);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.index-indextrade {
  width: 100%;
  height: 100%;
}
.top {
  position: relative;

  .top-center-title {
    position: absolute;
    top: 22px;
    left: 50%;
    transform: translateX(-50%);
    font-weight: bold;
    font-size: 20px;
    color: #e6e6e6;
  }
}
.chart {
  position: absolute;
  top: 0;
  width: 100%;
}
</style>
