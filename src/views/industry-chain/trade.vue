<template>
  <div class="">
    <BackGround />
    <Header title="贸易关系" />
    <div class="body">
      <img class="bg" src="/static/images/trade-bg.png" alt="" srcset="" />
      <img class="bg bg2" src="/static/images/trade-bg1.png" alt="" srcset="" />
      <div class="h">
        <div class="h1">生产型企业</div>
        <div class="h1">交易型企业</div>
        <div class="h1">消费型企业</div>
      </div>
      <div class="diagramContainer">
        <div id="item_left" class="item"></div>
        <div id="item_right" class="item"></div>
      </div>
    </div>
  </div>
</template>

<script>
let dd = console.log;

import * as trade from "@/api/trade";

import Header from "@/components/Header";
import BackGround from "@/components/BackGround2";
import Ball2 from "./components/Ball2";

import anime from "animejs";

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

export default {
  name: "Resource",
  components: {
    Ball2,
    Header,
    BackGround,
  },

  data() {
    return {
      is_ball: true,
    };
  },
  mounted() {
    // this.get_company();
    jsPlumb.ready(function () {
      jsPlumb.connect({
        source: "item_left",
        target: "item_right",
        paintStyle: { stroke: "lightgray", strokeWidth: 3 },
        endpointStyle: {
          fill: "red",
          outlineStroke: "darkgray",
          outlineWidth: 2,
        },
        connector: ["Straight"],
        anchor: ["AutoDefault", "AutoDefault"],
      });

      jsPlumb.draggable("item_left");
      jsPlumb.draggable("item_right");

      anime({
        targets: "#item_left",
        translateX: [0, 250], // from 100 to 250
        delay: 500,
        direction: "alternate",
        loop: true,
      });
    });
  },
  methods: {
    to_ball_line(e) {
      this.is_ball = false;
      this.get_company_related(e.data.id);
    },
    to_ball(e) {
      this.is_ball = true;
      this.get_company();
    },
    // 获取公司关系
    get_company_related(id) {
      trade
        .related_company(
          {
            fields: "id,title,type,partners",
            expand: "partners",
          },
          id
        )
        .then((e) => {
          if (e.code != 1000) {
            return;
          }
          let item = e.data;
          let data = item.partners;

          data.map((v) => {
            if (v.type == 1) {
              this.company.t1.push(v);
            }
            if (v.type == 2) {
              this.company.t2.push(v);
            }
            if (v.type == 3) {
              this.company.t3.push(v);
            }
          });
        });
    },
    // 获取公司列表
    get_company() {
      trade
        .company({
          fields: "id,title,type",
          // type: 1,
        })
        .then((e) => {
          if (e.code != 1000) {
            return;
          }
          let data = e.data.results;

          data.map((v) => {
            if (v.type == 1) {
              v.top = randomNum(-200, 200) + "px";
              v.left = randomNum(-300, 0) + "px";
              this.company.t1.push(v);
            }
            if (v.type == 2) {
              v.top = randomNum(-200, 200) + "px";
              v.left = randomNum(-100, 100) + "px";
              this.company.t2.push(v);
            }
            if (v.type == 3) {
              v.top = randomNum(-200, 200) + "px";
              v.left = randomNum(0, 300) + "px";
              this.company.t3.push(v);
            }
          });
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
  flex-direction: column;
  color: $white;

  height: 90vh;

  position: relative;
}
.h {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;

  width: 100%;
}
.h1 {
  text-align: center;
  height: 60px;
  line-height: 60px;
  background-image: url("/static/images/trade-h1.png");
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;
  padding: 10px;
  box-sizing: content-box;
  font-size: 24px;
}
.t {
  margin-top: 40vh;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;

  width: 100%;
}
.t1 {
  pointer-events: none;
  position: relative;
  // width: 30px;
  // height: 30px;
}
.t1 .icon {
  position: absolute;
  pointer-events: auto;
  width: 30px;
  height: 30px;
  background-image: url("/static/images/trade-1.png");
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;
}
.t1 .icon2 {
  border-radius: 100px;
  background-color: blue;
  background-image: unset;
}
.t1 .icon3 {
  background-image: url("/static/images/trade-2.png");
}
.t1 .p .title {
  width: 100px;
  position: absolute;
  text-align: left;
  height: 30px;
  line-height: 30px;
  right: -100px;
  top: 0px;
}
.bg {
  width: 31vw;
  height: 30vw;
  position: absolute;
  top: 20vh;
  left: 35vw;
}
.bg2 {
  width: 100%;
  left: 0;
}

.diagramContainer {
  position: relative;
  width: 100%;
  height: 50vh;
  background-color: #fff;
}
.diagramContainer .item {
  position: absolute;
  width: 100px;
  height: 100px;
  border: 1px solid $blue2;
}
</style>
