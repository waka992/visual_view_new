<template>
  <div>
    <BackGround />
    <TopBar :mod="'index'" />

    <div class="body">
      <div class="left">
    <content-box :name="{cnName: '首发价', enName: 'Starting Price'}" :width="'540px'" :titleimg="''">
    </content-box>
        <div class="aside-title">
          <div>现货首发价</div>
        </div>
        <div class="content">
          <div
            v-for="(v, k) in startPrice"
            :key="k"
            :class="'content-main ' + cssFilter(k)"
          >
            <div class="subject">
              {{ v.commodity_title }}
            </div>
            <div class="desc">
              <div>
                最高 <span>{{ v.high_price }}</span>
              </div>
              <div>
                最低 <span>{{ v.low_price }}</span>
              </div>
            </div>
            <div class="desc">
              <div>
                平均 <span>{{ v.avg_price }}</span>
              </div>
              <div>
                升贴水 <span>{{ v.bwd }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="main">
        <div class="title">
          <div class="subject">华南铝价</div>
          <div class="desc">
            <!-- {{ aluminumPrice.price }} -->
            <count-to
              :start-val="0"
              :end-val="aluminumPrice.price"
              :duration="2000"
              class="card-panel-num"
              separator=""
            />
            <div v-if="Math.sign(aluminumPrice.change) === 1" class="desc-up">
              {{ this.aluminumPrice.change }}&uarr;
            </div>
            <div v-else class="desc-down">
              {{ this.aluminumPrice.change.toString().slice(1) }}&darr;
            </div>
          </div>
        </div>
        <div class="title-decoration"></div>
        <div class="desc">
          <div class="subject">
            最低 {{ aluminumPrice.low_price }} — 最高
            {{ aluminumPrice.high_price }}
          </div>
          <div class="time">
            <img src="~@/assets/images/platformindex/title-time.png" />
            {{ aluminumPrice.statis_date | parseTime("{y}.{m}.{d}") }}
          </div>
        </div>
      </div>
      <div class="right">
        <div class="aside-title">
          <div>今日现货指数</div>
        </div>
        <div class="content">
          <div
            v-for="(item, index) in latestSpotIndex"
            :key="index"
            :class="'content-main ' + cssFilter(index)"
          >
            <div class="desc">
              <div>指数</div>
              <div>{{ item.index }}</div>
            </div>
            <div class="desc">
              <div>涨跌</div>
              <div
                :style="
                  'color: ' + (Math.sign(item.chg) === 1 ? 'red' : 'green')
                "
              >
                {{ item.change }}
              </div>
            </div>
            <div class="subject">
              <img
                :src="
                  require(Math.sign(item.chg) === 1
                    ? '@/assets/images/platformindex/index-up.png'
                    : '@/assets/images/platformindex/index-down.png')
                "
              />
              {{ item.commodity_title }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="statistics">
      <div class="title">
        <div class="text">上海有色综合指数</div>
      </div>
      <div class="desc">
        <LineStack />
      </div>
    </div>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar";
import ContentBox from "@/components/ContentBox";
import Header from "@/components/Header";
import BackGround from "@/components/BackGround2";
import LineStack from "./components/LineStack";
import CountTo from "vue-count-to";

import { parseTime } from "@/utils";
import {
  aluminumPrice,
  startPrice,
  latestSpotIndex,
  spotIndex
} from "@/api/platformindex";

export default {
  name: "PlatformIndex",
  components: {
    TopBar,
    ContentBox,
    Header,
    BackGround,
    LineStack,
    CountTo,
  },

  filters: {
    parseTime
  },

  mounted() {
    this.getAluminumPrice();
    this.getStartPrice();
    this.getLatestSpotIndex();
  },

  data() {
    return {
      aluminumPrice: {},
      startPrice: [],
      latestSpotIndex: []
    };
  },

  methods: {
    getAluminumPrice() {
      aluminumPrice().then(res => {
        if (res.code === 1000) {
          this.aluminumPrice = res.data.results[0];
        }
      });
    },

    getStartPrice() {
      startPrice().then(res => {
        if (res.code === 1000) {
          this.startPrice = res.data;
        }
      });
    },

    getLatestSpotIndex() {
      latestSpotIndex().then(res => {
        if (res.code === 1000) {
          this.latestSpotIndex = res.data;
        }
      });
    },

    cssFilter(index) {
      const statusMap = ["left-up", "right-up", "left-down", "right-down"];
      return statusMap[index];
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
$blue: #00294d;
$white: #ffffff;

.body {
  height: 40vh;
  width: 97vw;
  margin: 3vh 1.5vw;
  // background: blue;
  display: flex;
  flex-direction: row;
}

.aside-title {
  width: 26vw;
  background: $blue;
  div {
    background-image: url("~@/assets/images/platformindex/faguangzhuangshi.png");
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
    box-sizing: border-box;
    text-align: center;
    height: 4vh;
    line-height: 3.5vh;
    font-size: 3vh;
    font-weight: bold;
    color: $white;
  }
}

.left {
  .content {
    height: calc(100% - 36px);
    width: 26vw;
    margin-top: 2vh;

    .content-main {
      width: 12.5vw;
      height: 16vh;
      background: #002e57;
      background-image: url("~@/assets/images/platformindex/faguangjiao.png");
      background-size: 100%;
      background-repeat: no-repeat;
      background-position: left bottom;

      // padding-left: 5px;
      // padding-bottom: 0px;

      .subject {
        height: 5vh;
        line-height: 5vh;
        text-align: center;
        width: 100%;
        font-size: 3vh;
        font-weight: bold;
        color: $white;
      }

      .desc {
        height: 5vh;
        line-height: 5vh;
        width: 100%;
        font-size: 1.7vh;
        color: #addcfe;
        margin-bottom: 1vh;

        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }

      .desc div {
        // text-align: center;
        width: 46%;
      }

      .desc div:nth-child(2n-1) {
        text-align: right;
      }

      .desc div:nth-child(2n) {
        text-align: left;
      }

      .desc div span {
        color: #fec979;
      }
    }

    .left-up {
      float: left;
      margin-right: 0.5vw;
      margin-bottom: 1vh;
    }
    .right-up {
      float: right;
      margin-left: 0.5vw;
      margin-bottom: 1vh;
    }
    .left-down {
      float: left;
      clear: left;
      margin-right: 0.5vw;
      margin-top: 1vh;
    }
    .right-down {
      float: right;
      margin-left: 0.5vw;
      margin-top: 1vh;
    }
  }
}

.main {
  width: 42vw;
  margin: 0 1.5vw;
  background-image: url("~@/assets/images/platformindex/zhongjianbiankuang.png");
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;

  .title {
    background-image: url("~@/assets/images/platformindex/title-bg.png");
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
    margin: 3vh 2vw 0 2vw;
    height: 15vh;

    .subject {
      height: 6vh;
      text-align: center;
      font-size: 5vh;
      font-weight: bold;
      color: $white;
    }

    .desc {
      height: 9vh;
      line-height: 9vh;
      text-align: center;
      font-size: 9vh;
      color: #fbc779;

      position: relative;
    }

    .desc-up {
      display: inline-block;
      position: absolute;
      margin-left: 1vw;
      height: 3vh;
      font-size: 3vh;
      color: red;
    }

    .desc-down {
      display: inline-block;
      position: absolute;
      margin-left: 1vw;
      height: 3vh;
      font-size: 3vh;
      color: green;
    }
  }

  .title-decoration {
    height: 5vh;
    background-image: url("~@/assets/images/platformindex/title-decoration.png");
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
  }

  .desc {
    font-weight: bold;
    color: #addcfe;
    .subject {
      display: table-cell;
      text-align: center;
      vertical-align: middle;
      height: 12vh;
      width: 42vw;
      font-size: 2.5vh;
    }

    .time {
      text-align: center;
      font-size: 2vh;
    }

    img {
      width: 1.5vh;
      height: 1.6vh;
      margin-right: 0.5vw;
    }
  }
}

.right {
  .content {
    height: calc(100% - 36px);
    width: 26vw;
    margin-top: 2vh;

    .content-main {
      width: 12.75vw;
      height: 16.5vh;
      background: url("~@/assets/images/platformindex/jingshubiankuang.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }

    .desc {
      font-weight: bold;
      height: 4vh;
      line-height: 3vh;
      font-size: 2vh;
      color: $white;
      padding-top: 1.5vh;
      // text-align: center;

      display: flex;
      flex-direction: row;
      justify-content: space-between;

      div {
        // text-align: center;
        width: 50%;
      }

      div:first-child {
        text-align: center;
      }
    }

    .subject {
      height: 8vh;
      font-size: 4vh;
      font-weight: bold;
      color: #9abcff;
      text-align: center;
      padding-top: 2vh;

      img {
        height: 2vh;
        width: 2vh;
      }
    }

    .left-up {
      float: left;
      margin-right: 0.25vw;
      margin-bottom: 0.5vh;
    }
    .right-up {
      float: right;
      margin-left: 0.25vw;
      margin-bottom: 0.5vh;
    }
    .left-down {
      float: left;
      clear: left;
      margin-right: 0.25vw;
      margin-top: 0.5vh;
    }
    .right-down {
      float: right;
      margin-left: 0.25vw;
      margin-top: 0.5vh;
    }
  }
}

.statistics {
  margin: 0 1.5vw;
  height: 42vh;
  width: 97vw;

  .title {
    background: $blue;
    .text {
      background-image: url("~@/assets/images/platformindex/zhishu.png");
      background-size: 100% 100%;
      background-position: center;
      background-repeat: no-repeat;
      box-sizing: border-box;
      text-align: center;
      height: 4vh;
      line-height: 3.5vh;
      font-size: 3vh;
      font-weight: bold;
      color: $white;
    }
  }

  .desc {
    height: 38vh;
    background: #021c3a;
    padding: 15px;
    background-image: url("~@/assets/images/platformindex/zhishu-zhuangshijiao.png");
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: left bottom;
  }
}
</style>
