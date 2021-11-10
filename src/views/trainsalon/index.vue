<template>
  <div>
    <BackGround :bgImage="'/static/images/background2.jpg'"/>
    <Header title="沙龙" />
    <div class="body">
      <div
        v-for="(v, k) in pos"
        :key="k"
        :style="{
          backgroundImage: v.bg,
          width: v.width,
          heigth: v.heigth,
          left: v.x,
          top: v.y,
        }"
        :class="v.classes"
        class="item"
      >
        <div v-if="v.text">{{ v.text }}</div>
        <img
          :style="{
            width: v.img_w,
            heigth: v.img_h,
          }"
          class="img"
          v-if="v.img && !v.text"
          :src="v.img"
          alt=""
          srcset=""
        />
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import BackGround from "@/components/BackGround2";

export default {
  name: "Name",
  components: {
    Header,
    BackGround,
  },

  data() {
    return {
      pos: [
        {
          img: "",
          bg: "",
          x: "18vw",
          y: "30vh",
          width: "12vw",
          hegith: "",
          text: "华南铝现货价格采标单位授牌仪式",
          classes: "item-text",
        },
        {
          img: "",
          bg: "",
          x: "55vw",
          y: "15vh",
          width: "",
          hegith: "",
          text: "首届广东佛山有色金属（铝）产业创新发展论坛暨华南铝价发布会",
          classes: "item-text",
        },
        {
          img: "/static/images/trainsalon-1.png",
          bg: "",
          x: "20vw",
          y: "3vh",
          img_w: "7.5vw",
          img_h: "5vw",
          width: "",
          hegith: "",
          text: "",
          classes: "item-img",
        },
        {
          img: "/static/images/trainsalon-2.png",
          bg: "",
          x: "35vw",
          y: "10vh",
          img_w: "15vw",
          img_h: "10vw",
          width: "",
          hegith: "",
          text: "",
          classes: "item-img",
        },
        {
          img: "/static/images/trainsalon-3.png",
          bg: "url('/static/images/trainsalon-bg2.png')",
          x: "80vw",
          y: "8vh",
          img_w: "7.5vw",
          img_h: "5vw",
          width: "",
          hegith: "",
          text: "",
          classes: "item-img",
        },
        {
          img: "/static/images/trainsalon-4.png",
          bg: "url('/static/images/trainsalon-bg2.png')",
          x: "68vw",
          y: "28vh",
          img_w: "15vw",
          img_h: "10vw",
          width: "",
          hegith: "",
          text: "",
          classes: "item-img",
        },
        {
          img: "/static/images/trainsalon-5.png",
          bg: "url('/static/images/trainsalon-bg2.png')",
          x: "55vw",
          y: "38vh",
          img_w: "7.5vw",
          img_h: "5vw",
          width: "",
          hegith: "",
          text: "",
          classes: "item-img",
        },
        {
          img: "/static/images/trainsalon-6.png",
          bg: "",
          x: "7vw",
          y: "48vh",
          img_w: "15vw",
          img_h: "10vw",
          width: "",
          hegith: "",
          text: "",
          classes: "item-img",
        },
        {
          img: "/static/images/trainsalon-7.png",
          bg: "",
          x: "30vw",
          y: "58vh",
          img_w: "15vw",
          img_h: "10vw",
          width: "",
          hegith: "",
          text: "",
          classes: "item-img",
        },
        {
          img: "/static/images/trainsalon-8.png",
          bg: "url('/static/images/trainsalon-bg2.png')",
          x: "75vw",
          y: "58vh",
          img_w: "15vw",
          img_h: "10vw",
          width: "",
          hegith: "",
          text: "",
          classes: "item-img",
        },
      ],
    };
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.body {
  padding: 20px;
  display: flex;
  flex-direction: row;
  position: relative;
  .item {
    position: absolute;
    top: 0;
    left: 0;
    text-align: center;
    border-radius: 10px;
  }
  .item-text {
    background-color: #fff;
    padding: 20px 10px;
    width: 20vw;
    color: #002e57;
    font-weight: bold;
    font-size: 16px;
    word-break: break-all;
  }
  .item-img {
    background-image: url("/static/images/trainsalon-bg1.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    padding: 5px 10px;
  }
}
</style>