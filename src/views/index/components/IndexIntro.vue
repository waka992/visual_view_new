<template>
  <div class="index-indexintro">
    <content-box :name="name">
      <template>
        <div class="intro-info">
          <img
            class="intro-border"
            src="~@/assets/images/new/index/index-intro-border.png"
            alt=""
          />
          <img class="intro-pic" src="~@/assets/images/new/index/index-intro-pic.png"/>
        </div>
      </template>
    </content-box>
  </div>
</template>

<script>
import ContentBox from "@/components/ContentBox";

export default {
  name: "IndexIntro",
  components: {
    ContentBox
  },
  data() {
    return {
      name: {
        cnName: "平台介绍",
        enName: "Platform Introduction"
      }
    };
  },
  mounted() {},

  methods: {}
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.index-indexintro {
  position: relative;
  width: 100%;
  height: 100%;
}

.intro-info {
  position: absolute;
  top: 17px;
  left: 33px;
  width: 424px;
  height: 163px;

  .intro-border {
    position: absolute;
    top: 0;
    left: 0;
    display: inline-block;
    width: 424px;
    height: 163px;
  }

  .intro-pic {
    width: 424px;
    height: 163px;
    display: inline-block;
    object-fit: cover;
  }
}
</style>
