<template>
    <div class="example-3d">
        <swiper class="swiper" :options="swiperOption">
            <swiper-slide>
                <img src="~@/assets/images/index/sl.png" alt="沙龙" @click="jump('trainsalon')"/>
            </swiper-slide>
            <swiper-slide>
                <img src="~@/assets/images/index/hdjy.png" alt="互动交易" @click="jump('interactive')"/>
            </swiper-slide>
            <swiper-slide>
                <img src="~@/assets/images/index/ryhds.png" alt="荣誉和大事记" @click="jump('memorabilia')"/>
            </swiper-slide>
            <swiper-slide>
                <img src="~@/assets/images/index/zs.png" alt="指数" @click="jump('platformindex')"/>
            </swiper-slide>
            <swiper-slide>
                <img src="~@/assets/images/index/jysj.png" alt="交易数据" @click="jump('exchangedata')"/>
            </swiper-slide>
            <swiper-slide>
                <img src="~@/assets/images/index/cyl.png" alt="产业链" @click="jump('industrychain')"/>
            </swiper-slide>
            <swiper-slide>
                <img src="~@/assets/images/index/qyfc.png" alt="企业风采" @click="jump('corporatestyle')"/>
            </swiper-slide>
            <swiper-slide>
                <img src="~@/assets/images/index/hydw.png" alt="行业定位" @click="jump('industryposition')"/>
            </swiper-slide>
            <swiper-slide>
                <img src="~@/assets/images/index/hzhb.png" alt="合作伙伴" @click="jump('friend')"/>
            </swiper-slide>
            <swiper-slide>
                <img src="~@/assets/images/index/rlhy.png" alt="热烈欢迎" @click="jump('welcome')"/>
            </swiper-slide>
        </swiper>
        <div class="swiper-decoration"></div>
    </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";

export default {
    name: "Carousel",
    title: "3D Coverflow effect",
    components: {
        Swiper,
        SwiperSlide,
    },

    data() {
        return {
            swiperOption: {
                loop: true,
                grabCursor: true,
                effect: "coverflow",
                grabCursor: true,
                centeredSlides: true,
                slidesPerView: "auto",
                coverflowEffect: {
                    rotate: 70, 
                    stretch: 10, 
                    depth: 380, 
                    modifier: 0.3, 
                    slideShadows: true,
                },
                pagination: {
                    el: ".swiper-pagination",
                },
                initialSlide: 4,
                speed: 200,
                touchRatio: 4,
                // followFinger: false,
            },
        };
    },

    methods: {
        jump(pathData){
            this.$router.push({path: pathData})
        }
    }
};
</script>

<style lang="scss" scoped>
    .example-3d {
        width: 100%;
        height: 50vh;
        padding-top: 5vh;
        padding-bottom: 5vh;
        position: relative;

        .swiper-decoration{
            position: absolute;
            top: 8vh;
            left: 15vw;
            height: 50vh;
            width: 70vw;
            background-image: url("~@/assets/images/index/bg2.png");
            background-size: 100% 100%;
            background-position: center;
            background-repeat: no-repeat;
        }
    }
    .swiper {
        height: 100%;
        width:  95vw;
        .swiper-slide {
            touch-action: none;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            width:  15vw;
            height: 37vh;
        }
        .swiper-slide img {
            width:  85%;
            height: 85%;
        }
    }
</style>