<template>
  <div class="index-industry2">
    <content-box :name="name">
      <template>
        <div class="top">
          <span class="top-center-title">我国铜铝产业在全球地位</span>
        </div>
        <div class="chart">
          <div
            id="index-industry-chart2"
            style="width: 100%;height:205px;"
          ></div>
        </div>
        <div class="legend">
          <span class="types" v-for="(type, i) in typeList" :key="i">
            <span class="types-color" :style="'backgroundColor:' + type.color"></span>
            <span class="types-name">{{ type.name }}</span>
          </span>
        </div>
      </template>
    </content-box>
  </div>
</template>

<script>
import ContentBox from "./ContentBox";
import echarts from "echarts";

export default {
  name: "IndexIndustry2",
  components: {
    ContentBox
  },
  data() {
    return {
      name: {
        cnName: "产业链",
        enName: "Industry Chain"
      },
      typeList: [
        {
          name: "铜",
          color: "#D3863E"
        },
        {
          name: "铝",
          color: "#56CBFF"
        }
      ]
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
        xAxis: {
          type: "category",
          data: ["矿储量", "矿产量", "电解铜/铝产量", "电解铜/铝消费"],
          axisLabel: { color: "#797C81", interval: 0, fontWeight: "bold" },
          axisTick: { show: false },
          axisLine: { lineStyle: { color: "#797C81" } }
        },
        grid: {
          left: "0%",
          right: "10%",
          bottom: "10%",
          top: "30%",
          containLabel: true
        },
        yAxis: {
          type: "value",
          show: false
        },
        series: []
      };

      for (let i = 0; i < 2; i++) {
        option.series[i] = {
          type: "pictorialBar",
          symbol: "rect",
          itemStyle: {
            normal: {
              color: i == 0 ? "#D3863E" : "#56CBFF"
            }
          },
          barWidth: 10,
          symbolRepeat: true,
          symbolSize: [10, 4],
          symbolMargin: 2,
          barGap: "80%"
        };
        option.series[i].data = [100, 200, 300, 200];
      }

      let chart = echarts.init(
        document.getElementById("index-industry-chart2")
      );
      chart.setOption(option);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.index-industry2 {
  width: 100%;
  height: 100%;
}

.top {
  position: relative;

  .top-center-title {
    position: absolute;
    top: 22px;
    left: 31px;
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

.legend {
  position: absolute;
  right: 30px;
  top: 20px;
  width: 32px;
  z-index: 999;
  .types,
  .types-name,
  .types-color {
    display: inline-block;
  }

  .types {
    width: 32px;
    line-height: 18px;
    margin-bottom: 10px;

    .types-name {
      height: 18px;
      font-size: 17px;
      font-weight: bold;
      color: #797C81;
      vertical-align: middle;
    }

    .types-color {
        width: 10px;
        height: 4px;
        vertical-align: middle;
    }
  }
}
</style>
