<template>
  <div class="index">
    <TopBar />
    <div class="world">
      <img
        class="outside"
        src="~@/assets/images/new/index/index-round.png"
        alt=""
      />
      <img
        class="inside"
        src="~@/assets/images/new/index/index-world.png"
        alt=""
      />
    </div>
    <div class="left">
      <div class="left-1" @click="jump('platformindex')">
        <IndexIndex />
      </div>
      <div class="left-2">
        <IndexIndustry />
      </div>
      <div class="left-3">
        <IndexIndustry2 />
      </div>
    </div>
    <div class="right">
      <div class="right-1">
        <IndexTrade />
      </div>
      <div class="right-2">
        <IndexTrade2 />
      </div>
      <div class="right-3">
        <IndexIntro />
      </div>
    </div>
    <!-- <BackGround /> -->

    <!-- <Carousel /> -->
  </div>
</template>

<script>
import TopBar from "./components/TopBar";
import IndexIndex from "./components/IndexIndex";
import IndexIndustry from "./components/IndexIndustry";
import IndexIndustry2 from "./components/IndexIndustry2";
import IndexTrade from "./components/IndexTrade";
import IndexTrade2 from "./components/IndexTrade2";
import IndexIntro from "./components/IndexIntro";
// import BackGround from '@/components/BackGround'

export default {
  name: "index",
  components: {
    TopBar,
    IndexIndex,
    IndexIndustry,
    IndexIndustry2,
    IndexTrade,
    IndexTrade2,
    IndexIntro
    // BackGround
  },
  methods: {
    jump(pathData) {
      this.$router.push({ path: pathData });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.index {
  position: relative;
  background: url("~@/assets/images/new/index/index-bg.png") center/cover
    no-repeat;
  width: 100%;
  height: 100%;
  color: #fff;
  font-size: 12px;
  font-family: SourceHanSansSC-Bold;
}

// 中心地球
.world {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;

  .outside,
  .inside {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    height: 350px;
  }

  .outside {
    width: 350px;
    animation: rotating 60s infinite linear;
  }

  .inside {
    top: 46%;
    left: 51%;
    width: 450px;
  }
}
// 左右两边布局
.left {
  left: 38px;
}
.right {
  right: 38px;
}
.right-1,
.right-2,
.right-3,
.left-1,
.left-2,
.left-3 {
  position: absolute;
}
.right-1,
.right-2,
.right-3 {
  right: 0;
}
.right-1,
.left-1 {
  width: 485px;
  top: 0;
  height: 360px;
}
.right-2,
.left-2 {
  width: 485px;
  top: 390px;
  height: 257px;
}
.right-3,
.left-3 {
  width: 485px;
  top: 678px;
  height: 256px;
}
.left,
.right {
  position: absolute;
  top: 114px;
}
@keyframes rotating {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(359deg);
  }
}
</style>
