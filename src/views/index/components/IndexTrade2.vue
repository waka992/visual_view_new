<template>
  <div class="index-trade2">
    <content-box :name="name">
      <template>
        <div class="top">
          <span class="top-center-title">品种交易量占比</span>
        </div>
        <div class="chart">
          <div id="index-trade-chart2" style="width: 100%;height:205px;"></div>
        </div>
        <div class="legend">
          <span class="types" v-for="(type, i) in typeList" :key="i">
            <span
              class="types-color"
              :style="'backgroundColor:' + type.color"
            ></span>
            <span class="types-name">{{ type.name }}</span>
            <span class="types-num">{{ type.num }}%</span>
            <img
              class="types-desc"
              src="~@/assets/images/new/index/index-desc1.png"
              alt=""
            />
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
  name: "IndexTrade2",
  components: {
    ContentBox
  },
  data() {
    return {
      name: {
        cnName: "交易数据",
        enName: "Transaction Data"
      },
      typeList: [
        {
          name: "铜",
          color: "#5490CE",
          num: 73
        },
        {
          name: "铝",
          color: "#D3863E",
          num: 21
        },
        {
          name: "锌",
          color: "#B93538",
          num: 5
        },
        {
          name: "铅",
          color: "#81899D",
          num: 1
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
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: ["40%", "70%"],
            center: [380, 114],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#111522",
              borderWidth: 2
            },
            label: {
              show: false,
              position: "center"
            },

            labelLine: {
              show: false
            },
            data: [
              { value: 2048, name: "Search Engine" },
              { value: 735, name: "Direct" },
              { value: 580, name: "Email" },
              { value: 484, name: "Union Ads" }
            ],
            color: ["#5490CE", "#D3863E", "#B93538", "#81899D"]
          }
        ]
      };

      let chart = echarts.init(document.getElementById("index-trade-chart2"));
      chart.setOption(option);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.index-trade2 {
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
  left: 30px;
  top: 77px;
  width: 268px;
  z-index: 999;

  .types,
  .types-name,
  .types-color,
  .types-num {
    display: inline-block;
  }

  .types {
    position: relative;
    width: 134px;
    padding-bottom: 5px;
    margin-bottom: 27px;

    .types-name {
      height: 23px;
      font-size: 17px;
      font-weight: bold;
      color: #797c81;
      vertical-align: middle;
    }

    .types-color {
      width: 7px;
      height: 7px;
      vertical-align: middle;
      margin-left: 30px;
    }

    .types-num {
      font-weight: bold;
      font-size: 17px;
      margin-left: 10px;
      vertical-align: middle;
      color: #d3863e;
    }

    .types-desc {
      position: absolute;
      left: 0;
      bottom: 0;
      height: 8px;
      width: 106px;
    }
  }
}
</style>
