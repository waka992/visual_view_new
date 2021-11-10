<template>
  <div class="">
    <BackGround :bgImage="'/static/images/background1.png'"/>
    <Header title="合作伙伴" />

    <div class="body">
      <FriendGraph class="friends" height="80vh" />
    </div>
  </div>
</template>

<script>
let dd = console.log;

import BackGround from "@/components/BackGround2";
import Header from "@/components/Header";
import FriendGraph from "./components/FriendGraph";

export default {
  name: "index",
  components: {
    FriendGraph,
    Header,
    BackGround,
  },
  data() {
    return {
      friend: {
        list: [
          {
            title: "电力投资",
            desc:
              "2020年年初，国家电网提出的计划投资额是4080亿元，比2019年同比下降8.8%，但是在疫情爆发后，电网追加计划投资额至4500亿元，向下游线缆厂派发了大量订单。",
            img: "/static/images/supply-img1.png",
          },
        ],
      },
    };
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
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: $white;
  .friends{
  }
}
</style>