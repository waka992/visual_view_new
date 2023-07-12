<template>
  <div class="index-index">
    <content-box :name="name">
      <template>
        <div class="content">
          <div class="top">
            <div class="top-left">
              <span>最低</span>
              <span>12314</span>
            </div>

            <div class="top-center">
              <span class="top-center-title">华南铝价</span>
              <div class="price-area">
                <span class="price">14880</span>
                <span class="wave up">16 ↑</span>
              </div>
            </div>

            <div class="top-right">
              <span>最高</span>
              <span>12904</span>
            </div>
          </div>
          <div class="chart">
            <div id="index-index-chart" style="width: 100%;height:205px;"></div>
          </div>
        </div>
      </template>
    </content-box>
  </div>
</template>

<script>
import ContentBox from "@/components/ContentBox";
import echarts from "echarts";

export default {
  name: "IndexIndex",
  components: {
    ContentBox
  },
  data() {
    return {
      name: {
        enName: "Index",
        cnName: "指数"
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
        color: ["#80FFA5", "#00DDFF", "#37A2FF", "#FF0087", "#FFBF00"],
        title: {
          show: false
        },
        legend: {
          show: false,
          data: ["Line 1"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          top: "10%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["11/01", "11/02", "11/03", "11/04", "11/05", "11/06"],
            splitNumber: 5,
            axisLabel: { color: "#81899D" }
          }
        ],
        yAxis: [
          {
            type: "value",
            splitNumber: 5,
            scale: true,
            axisLabel: { color: "#81899D" }
          }
        ],
        series: [
          {
            name: "Line 1",
            type: "line",
            stack: "Total",
            smooth: true,
            lineStyle: {
              width: 0
            },
            showSymbol: false,
            lineStyle: {
              color: "#B93538"
            },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "rgba(255, 255, 255)"
                  },
                  {
                    offset: 1,
                    color: "rgba(0, 0, 0, 0)"

                  }
                ])
            },
            emphasis: {
              focus: "series"
            },
            data: [140, 232, 101, 264, 90, 340, 250]
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
      option.xAxis[0].axisLine.show = option.xAxis[0].splitLine.show = option.xAxis[0].axisTick.show = false;
      option.yAxis[0].axisLine.show = option.yAxis[0].splitLine.show = option.yAxis[0].axisTick.show = false;
      option.xAxis[0].axisLine.show = true;

      option.legend.show = false;

      let chart = echarts.init(document.getElementById("index-index-chart"));
      chart.setOption(option);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.index-index {
  width: 100%;
  height: 100%;
}
.info {
  width: 100%;
  height: 100%;
}
.top {
  position: relative;

  .top-left,
  .top-right,
  .top-center {
    position: absolute;
    font-size: 18px;
    color: #797c81;
  }
  .top-left {
    left: 23px;
    top: 24px;
  }
  .top-right {
    right: 23px;
    top: 24px;
  }
  .top-center {
    top: 24px;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    font-size: 20px;
    color: #e6e6e6;

    .top-center-title {
      font-size: 20px;
    }

    .price-area {
      font-size: 40px;
      margin-top: 21px;

      .price {
        color: #d3863e;
        font-size: 40px;
      }
      .wave {
        font-size: 20px;

        &.up {
          color: #b93538;
        }
      }
    }
  }
}

.chart {
  position: absolute;
  top: 90px;
  width: 100%;
}
</style>
