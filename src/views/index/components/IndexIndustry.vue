<template>
  <div class="index-industry">
    <content-box :name="name">
      <template>
        <div class="top">
          <span class="top-center-title">铜矿产量</span>
        </div>
        <div class="chart">
          <div
            id="index-industry-chart"
            style="width: 100%;height:205px;"
          ></div>
        </div>
      </template>
    </content-box>
  </div>
</template>

<script>
import ContentBox from "./ContentBox";
import echarts from "echarts";

export default {
  name: "IndexIndustry",
  components: {
    ContentBox
  },
  data() {
    return {
      name: {
        cnName: "产业链",
        enName: "Industry Chain"
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
        title: {
          show: false
        },

        legend: {
          left: "center",
          top: "bottom",
          data: ["rose1", "rose2", "rose3", "rose6", "rose8"]
        },
        toolbox: {
          show: false
        },
        series: [
          {
            name: "Area Mode",
            type: "pie",
            radius: [15, 70],
            startAngle: 270,
            roseType: "radius",
            center: ["57%", "50%"],
            itemStyle: {
              borderRadius: 5
            },
            label: {
              formatter: e => {
                let data = e.data;
                console.log(data)
                return `{a|${data.name}}   {b|${data.value}%}`
              },
              rich: {
                a: {
                  fontSize: 18,
                  color: "#797C81",
                  fontWeight: "bold",
                },
                b: {
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "#D3863E",
                }
              }
            },
            labelLine: {
                lineStyle: {
                    color: "#81899D",
                }
            },
            data: [
              { value: 60, name: "智利" },
              { value: 30, name: "美国" },
              { value: 28, name: "秘鲁" },
              { value: 26, name: "中国" },
              { value: 12, name: "澳大利亚" },
            ]
          }
        ]
      };

      // option通用配置(免得写满上面配置项，不方便cv)
      option.legend.show = false;

      let chart = echarts.init(document.getElementById("index-industry-chart"));
      chart.setOption(option);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.index-industry {
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
</style>
