<template>
  <div class="">
    <BackGround />
    <Header title="供需关系" />

    <div class="body">
      <div class="one">
        <div class="title">
          <div class="text">下游行业</div>
        </div>
        <div class="desc">
          <div v-for="(v, k) in industry.list" :key="k" class="item">
            <div class="t1">
              <img :src="v.img" alt="" srcset="" />
              <div class="t2">{{ v.title }}</div>
            </div>
            <div class="d1">
              {{ v.desc }}
            </div>
          </div>
        </div>
      </div>
      <div class="one1">
        <div>
          <div class="title">
            <div class="text">供需关系</div>
          </div>
          <div>
            <div class="chart-wrapper">
              <SupplyLine ref="abc" :height="'35vh'" />
            </div>
          </div>
        </div>
        <div class="mt1">
          <div class="title">
            <div class="text">库存</div>
          </div>
          <div>
            <div class="chart-wrapper">
              <ProductionBar ref="abc1" :height="'35vh'" />
            </div>
          </div>
        </div>
      </div>
      <div class="one2">
        <div>
          <div class="title">
            <div class="text">加工企业</div>
          </div>
          <div class="desc">
            <div v-for="(v, k) in enterprise.list" :key="k" class="item">
              <div class="t1">
                <img :src="v.img" alt="" srcset="" />
                <div class="t2">{{ v.title }}</div>
                <div class="num">{{ v.num }}</div>
              </div>
              <div class="d1">
                {{ v.desc }}
              </div>
            </div>
          </div>
        </div>
        <div class="btns">
          <div
            @click="$router.push({ path: '/industrychain' })"
            class="btn btn1"
          >
            <img src="/static/images/supply-img9.png" alt="" srcset="" />
            <div>产业链</div>
          </div>
          <div @click="$router.push({ path: '/industrychain/trade' })" class="btn">
            <img src="/static/images/supply-img10.png" alt="" srcset="" />
            <div>贸易关系</div>
          </div>
        </div>
        <div>
          <div class="desc">
            <div v-for="(v, k) in enterprise1.list" :key="k" class="item">
              <div class="t1">
                <img :src="v.img" alt="" srcset="" />
                <div class="t2">{{ v.title }}</div>
                <div class="num">{{ v.num }}</div>
              </div>
              <div class="d1">
                {{ v.desc }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let dd = console.log;

import * as supply from "@/api/supply";

import BackGround from "@/components/BackGround2";
import Header from "@/components/Header";

import ProductionBar from "./components/ProductionBar";
import SupplyLine from "./components/SupplyLine";

export default {
  name: "index",
  components: {
    SupplyLine,
    Header,
    ProductionBar,
    BackGround,
  },
  data() {
    return {
      type_val: 0,
      industry: {
        list: [
          {
            title: "电力投资",
            desc:
              "2020年年初，国家电网提出的计划投资额是4080亿元，比2019年同比下降8.8%，但是在疫情爆发后，电网追加计划投资额至4500亿元，向下游线缆厂派发了大量订单。",
            img: "/static/images/supply-img1.png",
          },
          {
            title: "房地产",
            desc:
              "基建板块及房地产板块二季度快速下浮，截止10月已基本收复全部跌幅。明年房地产市场料维持韧性，增速回落但仍为正增长。",
            img: "/static/images/supply-img2.png",
          },
          {
            title: "家用电器",
            desc:
              "家电行业占中国铜消费的15%左右。由于疫情因素，居家时间明显增长，彩电、冰箱、吸尘器等家用电器迎来销售热潮，如2020年10月，电冰箱累计产量为7,381.70万台，累计同比4.00%。",
            img: "/static/images/supply-img3.png",
          },
          {
            title: "汽车制造",
            desc:
              "2019年汽车产销同比下滑8%左右，延续近两年的疲软态势。今年初，中国汽车工业协会预计汽车行业将结束2019年度的深度调整，并将在今后几年呈现逐步恢复态势。",
            img: "/static/images/supply-img4.png",
          },
        ],
      },
      enterprise: {
        list: [
          {
            title: "江西铜业",
            num: "产量: 2,753,500.00吨",
            desc:
              "江西铜业股份有限公司的主要业务涵盖了铜的采选、冶炼和加工，贵金属和稀散金属的提取与加工，硫化工，以及金融、贸易等领域。",
            img: "/static/images/supply-img5.png",
          },
          {
            title: "云南铜业",
            num: "产量: 1,115,133.00吨",
            desc:
              "云南铜业股份有限公司的主要业务涵盖了铜的采选、冶炼，贵金属和稀散金属的提取与加工，硫化工以及贸易等领域。",
            img: "/static/images/supply-img6.png",
          },
        ],
      },
      enterprise1: {
        list: [
          {
            title: "铜陵有色",
            num: "产量: 1,400,634吨",
            desc:
              "铜陵有色金属集团股份有限公司是一家集采选、冶炼、加工、贸易为一体的综合性铜生产企业。",
            img: "/static/images/supply-img7.png",
          },
          {
            title: "紫金矿业",
            num: "产量: 277，324吨",
            desc:
              "紫金矿业集团股份有限公司主要从事矿产资源勘查,金铜矿选、冶;矿产品。",
            img: "/static/images/supply-img8.png",
          },
        ],
      },
    };
  },
  mounted() {
    this.type_val = Number(this.$route.params.type) + 1 // 1铜，2铝
    this.get_downstreamindustry(this.type_val);
    this.get_manufacturingenterprise(this.type_val);
    this.get_supply(this.type_val);
    this.get_stoage(this.type_val);
  },
  methods: {
    // 获取下游企业
    get_downstreamindustry(mode = 1) {
      supply
        .downstreamindustry({
          fields: "id,title,description",
          commodity: 1,
        })
        .then((e) => {
          if (e.code != 1000) {
            return;
          }
          let data = []
          if (mode === 2) {
            this.industry.list = [
                {
                  title: "建筑业",
                  desc:
                    "建筑业是我国铝材最大的下游应用领域，占比达到33%。建筑安装业作为建筑物内各种设备的安装活动以及施工中的线路敷设和管道安装活动，建筑业的发展必然也带来了建筑安装的相关需求。",
                  img: "/static/images/supply-img2.png",
                },
                {
                  title: "运输业",
                  desc:
                    "铝型材在交通运输业的应用极为广泛，汽车制造是工业铝型材的主要应用领域之一，而铝的应用在轨道交通发展上也发挥了重要角色。铝合金材料则是汽车轻量化目标的主要应用材料。2020年，汽车产销2522.5万辆和2531.1万辆，同比下降2.0%和1.9%，与上年相比，分别收窄5.5个百分点和6.3个百分点。",
                  img: "/static/images/supply-img4.png",
                },
                {
                  title: "包装行业",
                  desc:
                    "铝箔是铝加工材产业中附加值较高的细分产品，行业发展迅速，市场规模与产销量连年保持高速增长，由于其在导热、循环利用领域优异的应用性能，使得铝箔在家电、包装等方面的应用得到极大拓展。",
                  img: "/static/images/supply-img11.png",
                },
            ]
          }
          else {
            data = e.data.results;
            data.map((v, k) => {
              this.industry.list[k].title = v.title;
              this.industry.list[k].desc = v.description;
            });
          }
        });
    },
    // 获取加工企业
    get_manufacturingenterprise(mode = 1) {
      supply
        .manufacturingenterprise({
          fields: "id,title,annual_production,icon,description",
          ordering: "-annual_production",
          commodity: 1,
        })
        .then((e) => {
          if (e.code != 1000) {
            return;
          }
          let data = []
          if (mode === 2) {
              this.enterprise = {
                list: [
                  {
                    title: "山东魏桥",
                    num: "产量: 646万吨",
                    desc:
                      "山东魏桥铝电有限公司是一家集热电铝业联产的民营企业。成立于2002年，是集热电、氧化铝、电解铝、铝深加工于一体的特大型综合企业。",
                    img: "/static/images/supply-img14.png",
                  },
                  {
                    title: "中国铝业",
                    num: "产量: 369万吨",
                    desc:
                      "中国铝业股份有限公司是中央管理的国有重要骨干企业，从事矿产资源开发、有色金属冶炼加工、相关贸易及工程技术服务等，是全球第二大氧化铝供应商、第三大电解铝供应商和第五大铝加工材供应商，同业综合实力位居全国第一。",
                    img: "/static/images/supply-img13.png",
                  },
               
                ],
              }
            this.enterprise1 = {
              list: [
                {
                  title: "信发铝电",
                  num: "产量: 218万吨",
                  desc:
                    "山东信发铝电集团有限公司是集发电、供热、电解铝、氧化铝、中高密度板、铝深加工等产业链条于一体的现代化大型企业集团",
                  img: "/static/images/supply-img15.png",
                },
                {
                  title: "东方希望",
                  num: "产量: 190万吨",
                  desc:
                    "新疆东方希望有色金属有限公司经营范围包括原铝、铝锭、铝板、铝棒、铝合金、铝母线及其加工产品的生产与销售等。",
                  img: "/static/images/supply-img12.png",
                },
              ],
            }
          }
          else {
            data = e.data.results;
            this.enterprise.list.map((v, k) => {
              this.enterprise.list[k].title = data[k].title;
              this.enterprise.list[k].img = data[k].icon;
              this.enterprise.list[k].desc = data[k].description;
              this.enterprise.list[
                k
              ].num = `产量: ${data[k].annual_production}吨`;
            });
  
            this.enterprise1.list.map((v, k) => {
              let index = k + 2;
              this.enterprise1.list[k].title = data[index].title;
              this.enterprise1.list[k].img = data[index].icon;
              this.enterprise1.list[k].desc = data[index].description;
              this.enterprise1.list[
                k
              ].num = `产量: ${data[index].annual_production}吨`;
            });
          }
        });
    },
    // 获取供需关系
    get_supply(mode = 1) {
      let option = {
        // grid: {
        //   right: 140,
        // },
        legend: {
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

      supply
        .consumption({
          fields: "id,statis_date,amount",
          ordering: "-statis_date",
          commodity: 1,
          limit: 10,
        })
        .then((e) => {
          if (e.code != 1000) {
            return;
          }
          let data = {}
          if (mode === 2) {
            data = [{"id":3,"statis_date":"202109","amount":346.1},{"id":4,"statis_date":"202108","amount":351.8},{"id":5,"statis_date":"202107","amount":359.2},{"id":6,"statis_date":"202106","amount":339.6},{"id":7,"statis_date":"202105","amount":321},{"id":8,"statis_date":"202104","amount":308.5},{"id":9,"statis_date":"202103","amount":293.1},{"id":10,"statis_date":"202102","amount":285.1},{"id":11,"statis_date":"202101","amount":296.5}]
          }
          else {
            data = e.data.results
          }
            data = data.reverse();
            option.xAxis.data = [];
            option.series[0].data = [];
  
            data.map((v, k) => {
              let name = v.statis_date;
              let value = v.amount;
  
              option.xAxis.data.push(name);
              option.series[0].data.push(value);
            });

          this.$refs.abc.updateChart(option);
        });

      supply
        .production({
          fields: "id,statis_date,amount",
          ordering: "-statis_date",
          commodity: 1,
          limit: 10,
        })
        .then((e) => {
          if (e.code != 1000) {
            return;
          }
          let data = []
          if (mode === 2) {
            data = [{"id":2,"statis_date":"202109","amount":307.5},{"id":7,"statis_date":"202108","amount":315.5},{"id":6,"statis_date":"202107","amount":326},{"id":5,"statis_date":"202106","amount":329},{"id":4,"statis_date":"202105","amount":331.7},{"id":8,"statis_date":"202104","amount":334.6},{"id":3,"statis_date":"202103","amount":327.6},{"id":9,"statis_date":"202102","amount":310.5},{"id":10,"statis_date":"202101","amount":315.1}]
          }
          else {
            data = e.data.results
          }
          data = data.reverse();
          // option.xAxis.data = [];
          option.series[1].data = [];

          data.map((v, k) => {
            let name = v.statis_date;
            let value = v.amount;

            // option.xAxis.data.unshift(name);
            option.series[1].data.push(value);
          });

          this.$refs.abc.updateChart(option);
        });
    },
    // 获取库存
    get_stoage(mode = 1) {
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
              color: "#65B1EA",
            },
          },
          data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        },
        yAxis: {
          show: true,
          nameLocation: "end",
          nameTextStyle: {
            // 坐标轴名称样式
            color: "#65B1EA",
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
              color: "#65B1EA",
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
          show: false,
          borderColor: "transparent",
          backgroundColor: "rgba(63,28,85,0.2)",
        },
        series: [
          {
            type: "bar",
            barWidth: "20%",
            data: [
              1000,
              5200,
              2000,
              3340,
              3900,
              3300,
              2200,
              2200,
              2200,
              2200,
              2200,
              2200,
            ],
            itemStyle: {
              normal: { color: "#65B1EA" },
            },
          },
        ],
      };

      supply
        .storage({
          fields: "id,statis_date,amount",
          ordering: "-statis_date",
          commodity: 1,
          limit: 10,
        })
        .then((e) => {
          if (e.code != 1000) {
            return;
          }
          let data = []
          if (mode === 2) {
            data = [{"id":1,"statis_date":"202109","amount":233806},{"id":1,"statis_date":"202108","amount":248926},{"id":2,"statis_date":"202107","amount":256214},{"id":3,"statis_date":"202106","amount":288741},{"id":4,"statis_date":"202105","amount":329572},{"id":5,"statis_date":"202104","amount":356609},{"id":6,"statis_date":"202103","amount":378792},{"id":7,"statis_date":"202102","amount":334440},{"id":8,"statis_date":"202101","amount":239504},{"id":9,"statis_date":"202012","amount":224235},{"id":10,"statis_date":"202011","amount":220373}].reverse()
            
          }
          else {
            data = e.data.results.reverse();
          }
          option.xAxis.data = [];
          option.series[0].data = [];

          data.map((v, k) => {
            let name = v.statis_date;
            let value = v.amount;

            option.xAxis.data.push(name);
            option.series[0].data.push(value);
          });

          this.$refs.abc1.updateChart(option);
        });
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
$red: #f50638;
$white: #fff;
$bg: #02071d;
$blue: #012d57dc;
$blue1: #a9d7f9;
$blue2: #2a71b5;
$yellow: #fec979;

.body {
  padding: 0 20px;

  display: flex;
  flex-direction: row;
  margin-top: 20px;
  color: $white;
  font-size: 20px;

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
    flex: 1;
    .desc {
      background: $blue;
      padding: 20px 30px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      height: 76vh;
      .item {
        flex: 1;
        .t1 {
          display: flex;
          flex-direction: row;
          align-items: center;
          color: $yellow;
          font-size: 22px;
          font-weight: bold;
          margin-bottom: 10px;

          img {
            width: 30px;
            height: 30px;
            margin-right: 10px;
          }
        }

        .d1 {
          color: $blue1;
          font-weight: bold;
        }
      }
    }
  }
  .one1 {
    flex: 2;
    margin: 0 20px;
    height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .chart-wrapper {
      background: $blue;
    }
    .mt1 {
    }
  }
  .one2 {
    flex: 1;
    height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

    .desc {
      height: 36vh;
      background: $blue;
      padding: 20px 10px;
      .item {
        position: relative;
        margin-bottom: 20px;
        .t1 {
          display: flex;
          flex-direction: column;
          color: $yellow;
          font-size: 22px;
          font-weight: bold;
          margin-bottom: 10px;

          img {
            position: absolute;
            width: 50px;
            height: 50px;
            right: 0;
            top: 0;
          }
          .num {
            margin-top: 10px;
            width: fit-content;
            border: 2px dashed $blue2;
            color: $red;
            padding: 5px 10px;
            border-radius: 3px;
          }
        }

        .d1 {
          color: $blue1;
          font-weight: bold;
        }
      }
    }

    .desc1 {
      height: 33vh;
      background: $blue;
      padding: 20px 10px;
      .item {
        position: relative;
        margin-bottom: 20px;
        .t1 {
          display: flex;
          flex-direction: row;
          align-items: center;
          color: $yellow;
          font-size: 22px;
          font-weight: bold;
          margin-bottom: 10px;

          img {
            position: absolute;
            width: 50px;
            height: 50px;
            right: 0;
            top: 0;
          }
          .num {
            margin-top: 10px;
            margin-left: 10px;
            width: fit-content;
            border: 2px dashed $blue2;
            color: $red;
            padding: 5px 10px;
            border-radius: 3px;
          }
        }

        .d1 {
          color: $blue1;
          font-weight: bold;
        }
      }
    }

    .btns {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin: 10px 0;
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
  }
}
</style>
