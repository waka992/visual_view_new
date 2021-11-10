<template>
  <div class="">
    <BackGround />
    <Header title="产业链" />

    <div class="body">
      <div class="one">
        <WorldMap ref="abc2" :height="'80vh'" />
      </div>
      <div class="one2">
        <div class="pos">
          <div
            @click="mode_sel(v, k)"
            v-for="(v, k) in mode.list"
            :key="k"
            class="btn"
            :class="[k == mode.index ? 'active' : '']"
          >
            {{ v.text }}
          </div>
        </div>
        <div>
          <div class="title">
            <div class="text">进口来源国家排名</div>
          </div>
          <div class="desc">
            <ReserveMap ref="abc" :height="'43vh'" />
          </div>
        </div>
        <div class="btns">
          <div @click="$router.push({ path: '/supply', name: 'supply', params:{type: mode.index}})" class="btn btn1">
            <img src="/static/images/industrychain-1.png" alt="" srcset="" />
            <div>供需关系</div>
          </div>
          <div @click="$router.push({ path: '/industrychain/trade' })" class="btn">
            <img src="/static/images/supply-img10.png" alt="" srcset="" />
            <div>贸易关系</div>
          </div>
        </div>
        <div>
          <div class="title">
            <div class="text">进口量趋势图</div>
          </div>
          <div class="desc">
            <ProductionBar ref="abc1" :height="'20vh'" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let dd = console.log;

import * as industrychain from "@/api/industrychain";

import Header from "@/components/Header";
import BackGround from "@/components/BackGround2";
import WorldMap from "./components/WorldMap";

import ReserveMap from "./components/ReserveMap";
import ProductionBar from "./components/ProductionBar";

export default {
  name: "Resource",
  components: {
    Header,
    BackGround,
    WorldMap,
    ReserveMap,
    ProductionBar,
  },

  data() {
    return {
      mode: {
        index: 0,
        list: [
          //商品类型，1铜 2铝 3铅 4锌
          {
            text: "铜",
            val: 1,
          },
          {
            text: "铝",
            val: 2,
          },
          //   {
          //     text: "铅",
          //     val: 3,
          //   },
          //   {
          //     text: "锌",
          //     val: 4,
          //   },
        ],
      },
    };
  },
  mounted() {
    this.get_fly(1);
    this.mode_sel(this.mode.list[0], 0);
  },
  methods: {
    mode_sel(v, k) {
      this.mode.index = k;
      this.get_sort(v.val);
      this.get_trend(v.val);
      this.get_fly(v.val);
    },
    // 获取排名
    get_sort(mode = 1) {
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
          data: ["中国"],
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
              // {
              //   value: 100,
              //   name: "美国",
              //   itemStyle: {
              //     color: {
              //       type: "linear",
              //       x: 0,
              //       y: 0,
              //       x2: 0,
              //       y2: 1,
              //       colorStops: [
              //         {
              //           offset: 0,
              //           color: "#FF002C", // 0% 处的颜色
              //         },
              //         {
              //           offset: 1,
              //           color: "#FF3881", // 100% 处的颜色
              //         },
              //       ],
              //     },
              //   },
              // },
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

      industrychain
        .materialimportsource({
          ordering: "-amount",
          fields: "id,amount,country",
          commodity: mode,
          expand: "country",
          year: "2021",
        })
        .then((e) => {
          if (e.code != 1000) {
            return;
          }
          let data = e.data.results;

          option.yAxis.data = [];
          option.series[0].data = [];
          option.series[1].data = [];

          function random_color() {
            let r = Math.floor(Math.random() * 255);
            let g = Math.floor(Math.random() * 255);
            let b = Math.floor(Math.random() * 255);
            let color = "rgba(" + r + "," + g + "," + b + ",1)";

            return color;
          }

          data.map((v, k) => {
            let name = v.country.title;
            let name1 = `${k + 1} ${name}`;
            let value = v.amount;

            let color = random_color();

            option.yAxis.data.unshift(name1);
            option.series[0].data.unshift({
              value,
              name,
              itemStyle: {
                color,
              },
            });
            option.series[1].data.unshift({
              value,
              name,
              itemStyle: {
                color,
              },
            });
          });
          this.$refs.abc.updateChart(option);
        });
    },
    // 获取趋势
    get_trend(mode = 1) {
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
              color: "#E6D90C",
            },
          },
          data: ["2月", "3月", "4月", "5月", "6月", "7月", "8月"],
        },
        yAxis: {
          show: true,
          name: "万吨",
          nameLocation: "end",
          nameTextStyle: {
            // 坐标轴名称样式
            color: "#E6D90C",
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
              color: "#E6D90C",
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
          show: true,
          borderColor: "transparent",
          backgroundColor: "rgba(63,28,85,0.2)",
        },
        series: [
          {
            name: "铜",
            type: "bar",
            barWidth: "20%",
            data: [1000, 5200, 2000, 3340, 3900, 3300, 2200],
            itemStyle: {
              normal: { color: "#E6D90C" },
            },
          },
        ],
      };

      industrychain
        .materialimporttotal({
          ordering: "-statis_date",
          fields: "id,statis_date,amount",
          commodity: mode,
          query_years: 6,
        })
        .then((e) => {
          if (e.code != 1000) {
            return;
          }
          let data = e.data.results;
          option.xAxis.data = [];
          option.series[0].data = [];

          data.map((v, k) => {
            let name = v.statis_date;
            let value = v.amount;

            option.xAxis.data.unshift(name);
            option.series[0].data.unshift(value);
          });

          this.$refs.abc1.updateChart(option);
        });
    },
    // 获取飞线
    get_fly(mode = 1) {
      let option = {
        title: {
          show: false,
        },
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
            // { name: "China", itemStyle: { areaColor: "green" } },
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
              {
                value: [121.450802, 31.201617], //[经度,维度]
              },
              {
                value: [30.28, 116.0],
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
                  [-77.02, 38.54],
                  [116.46, 39.92],
                ],
              },
            ],
          },
        ],
      };

      industrychain
        .flyline({
          mode: mode, // 0 铜 1 铝
          fields:
            "id,longitude_start,latitude_start,longitude_end,latitude_end",
        })
        .then((e) => {
          if (e.code != 1000) {
            return;
          }
          // 铝
          let data = []
          if (mode === 2) {
            data = [{"id":6,"longitude_start":19.015908,"latitude_start":52.800932,"longitude_end":115.27226,"latitude_end":38.635842},{"id":7,"longitude_start":-10.051821,"latitude_start":10.442355,"longitude_end":115.27226,"latitude_end":38.635842},{"id":8,"longitude_start":117.165486,"latitude_start":0.138001,"longitude_end":115.27226,"latitude_end":38.635842}]
          }
          else {
            // data = e.data.results;
            data = [{"id":2,"longitude_start":139.630281,"latitude_start":36.661181,"longitude_end":115.27226,"latitude_end":38.635842},{"id":3,"longitude_start":68.248769,"latitude_start":47.97209,"longitude_end":115.27226,"latitude_end":38.635842},{"id":4,"longitude_start":134.846984,"latitude_start":-25.431389,"longitude_end":115.27226,"latitude_end":38.635842},{"id":5,"longitude_start":-75.619787,"latitude_start":-9.422664,"longitude_end":115.27226,"latitude_end":38.635842}]
          }
          option.series[0].data = [];
          option.series[1].data = [];

          data.map((v, k) => {
            // let temp = ''
            let start_x = v.longitude_start;
            let start_y = v.latitude_start;

            // temp =  start_x
            // start_x =  start_y
            // start_y =  temp

            let end_x = v.longitude_end;
            let end_y = v.latitude_end;

            // temp =  end_x
            // end_x =  end_y
            // end_y =  temp

            option.series[0].data.push({
              value: [start_x, start_y],
            });
            option.series[0].data.push({
              value: [end_x, end_y],
            });
            option.series[1].data.push({
              coords: [
                [start_x, start_y],
                [end_x, end_y],
              ],
            });
          });

          this.$refs.abc2.updateChart(option);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
$red: #f50638;
$white: #fff;
$bg: #02071d;
$blue: #012d57dc;
$blue1: #a9d7f9;
$blue2: #2a71b5;
$yellow: #fec979;

.body {
  // box-sizing: border-box;
  padding: 0 20px;
  padding-top: 20px;

  display: flex;
  flex-direction: row;
  color: $white;

  .title {
    // border-left: 5px solid $yellow;
    background: $blue;
    .text {
      background-image: url("/static/images/bg-title1.png");
      background-size: 100% 100%;
      background-position: center;
      background-repeat: no-repeat;
      box-sizing: border-box;
      text-align: center;
      height: 40px;
      line-height: 40px;
      font-size: 24px;
    }
  }

  .one {
    width: 70vw;
    margin-right: 20px;
  }
  .one2 {
    position: relative;
    width: 30vw;
    .desc {
      background: $blue;
      padding: 20px;
    }

    .btns {
      margin: 10px 0;
      display: flex;
      flex-direction: row;
      align-items: center;
      .btn {
        flex: 1;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        font-weight: bold;
        background: $blue;

        padding: 10px;
        img {
          width: 20px;
          height: 20px;
          margin-right: 10px;
        }
      }
      .btn1 {
        margin-right: 10px;
      }
    }

    .pos {
      top: 20vh;
      left: -3vw;
      position: absolute;
      display: flex;
      flex-direction: column;
      .btn {
        width: 2vw;
        height: 2vw;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        font-weight: bold;
        background: $blue;
        padding: 10px;
        margin-bottom: 10px;
        border-radius: 10px;
      }
      .btn.active {
        color: $yellow;
        border: 2px solid $yellow;
      }
    }
  }
}
</style>
