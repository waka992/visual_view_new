<template>
    <div>
        <BackGround />
        <Header title="荣誉和大事记"/>
        <div class="body">
            <div id="dashboard">
                <div class="content-title">
                    <div></div> 
                    <img src="~@/assets/images/memorabilia/qyfzlc.png" alt="企业发展历程"/>
                </div>
                <div class="content-img">
                    <div v-for="(item,index) in selectedData.atlas.items" :key="index">
                        <img :src="item.pic" :alt="selectedData.atlas.title"/>
                    </div>
                </div>
                <div class="content-schedule">
                    <span class="content-schedule-text">
                        <count-to :start-val="lastProgress" :end-val="selectedProgress" :duration="3000" class="card-panel-num" suffix="%"/>
                    </span>
                </div>
            </div>
            <div id="timeline">
                <div class="axis"></div>
                <swiper class="swiper" :options="swiperOptions"  @transitionEnd="dragEnd()" ref="axisSwiper">
                    <swiper-slide v-for="(v, k) in listData" :key="k">
                        <div :class="v.class" @click="selectedEnd(k)"></div>
                        <div class="content-subject">
                            {{ v.date | parseTime('{y}-{m}-{d}') }}
                        </div>
                    </swiper-slide>
                </swiper>
                <div class="content-text">
                    <p>{{ selectedData.content }}</p>
                </div>
            </div>
        </div>
        <div id="footer"></div>
    </div>
</template>

<script>
    import Header from '@/components/Header'
    import BackGround from '@/components/BackGround2'
    import DashBoard from "./components/DashBoard";
    import { Swiper, SwiperSlide } from "vue-awesome-swiper";
    import "swiper/dist/css/swiper.css";
    import { history } from "@/api/memorabilia";
    import { parseTime } from "@/utils";
    import CountTo from 'vue-count-to'

    export default {
        name: 'Memorabilia',
        components: {
            Header, 
            BackGround,
            DashBoard,
            Swiper,
            SwiperSlide,
            CountTo
        },

        filters: {
            parseTime,
        },

        created() {
            this.getHistory();
        },

        data() {
            return {
                swiperOptions: {
                    effect: "coverflow",
                    grabCursor: true,
                    centeredSlides: true,
                    slidesPerView: "auto",
                    coverflowEffect: {
                        rotate: 0,
                        stretch: -10,
                        depth: 0,
                        modifier: 1,
                        slideShadows: false,
                    },
                    initialSlide: 0,
                    speed: 100,
                    touchRatio: 3,
                },
        
                selectedKey: 0,
                selectedData: {},
                lastProgress: 0,
                selectedProgress: 0,
                listData: [],
            };
        },

        methods: {
            getHistory() {
                history()
                .then(res => {
                    if (res.code === 1000) { 
                        this.listData = res.data.results;
                        this.listData.map( a => a.class = 'slave' )
                        this.listData[this.selectedKey].class = 'master'
                        this.selectedData = this.listData[this.selectedKey];
                        this.getProgress();
                    }
                })
            },

            dragEnd() {
                let swiper = this.$refs.axisSwiper.$swiper;
                this.listData[this.selectedKey].class = 'slave';
                this.selectedKey = swiper.activeIndex;
                this.listData[this.selectedKey].class = 'master';
                this.selectedData = this.listData[this.selectedKey];
                this.getProgress();
            },

            selectedEnd(index) {
                let swiper = this.$refs.axisSwiper.$swiper;
                swiper.slideTo(index, 300, false);
                this.getProgress();
            },

            getProgress(){
                this.lastProgress = this.selectedProgress;
                this.selectedProgress = parseInt( ( (this.selectedKey + 1) / this.listData.length) * 100 );
            }
        }
    };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    #dashboard {
        width: 100vw;
        height: 45vh;
        display: flex;
        flex-direction: row;

        .content-title{
            width: 25vw;
            // height: 35vh;
            margin-top: 5vh;
            position: relative;

            background-image: url("~@/assets/images/memorabilia/gdzb.png");
            background-size: contain;
            background-repeat: no-repeat;
            background-position: 30px;

            div {
                position: absolute;
                width: 100%;
                height: 100%;
                z-index: 1;
                background-image: url("~@/assets/images/memorabilia/wzwzfg.png");
                background-size: 40% 40%;
                background-repeat: no-repeat;
                background-position: 65% 43%;
            }

            img {
                position: absolute;
                top: 13vh;
                left: 6vw;
                z-index: 0;
                width: 45%;
                height: 25%;
            }
        }

        .content-img {
            width: 50vw;
            height: 35vh;
            margin: 5vh 0;

            display: flex;
            justify-content: center;
            flex-wrap: nowrap;

            div {
                width: 33%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                margin: 0 1%;
            }

            img {
                max-width: 100%;
                max-height: 100%;
                // object-fit: contain;
                border: 3px solid #40A2F9; 
            }
        }

        .content-schedule {
            width: 25vw;
            // height: 40vh;
            margin-top: 5vh;

            background-image: url("~@/assets/images/memorabilia/zd.png");
            background-size: contain;
            background-repeat: no-repeat;
            background-position: 30px;

            line-height: 36vh;
            text-align: center;

            .content-schedule-text {             
                font-size: 4vh;
                // font-weight: bold;
                color: #FFF;
            }
        }
    }

    #timeline {
        padding: 0 7.5vw;
        width: 85vw;
        height: 45vh;
        position: relative;

        .axis {
            position: absolute;
            top: 0vh;
            height: 5vh;
            width: 100%;
            background-image: url("~@/assets/images/memorabilia/sjz.png");
            background-size: 100% 100%;
            background-repeat: no-repeat;
            background-position: left bottom; 
        }

        .swiper {
            position: absolute;
            top: 0vh;
            // height: 20vh;
            width: 70vw;
            margin: 0 7.5vw;

            .swiper-slide {
                touch-action: none;
                width: 15vw;
                height: 20vh;
            }

            .master {
                width: 6vh;
                height: 6vh;
                text-align: center;
                margin: 1vh auto; 

                background-image: url("~@/assets/images/memorabilia/master.png");
                background-size: 100% 100%;
                background-repeat: no-repeat;
                background-position:left bottom; 
            }

            .slave {
                width: 4vh;
                height: 4vh;
                text-align: center;
                margin: 2vh auto; 

                background-image: url("~@/assets/images/memorabilia/slave.png");
                background-size: 100% 100%;
                background-repeat: no-repeat;
                background-position:left bottom; 
            }

            .content-subject {
                width: 8vw;
                margin: 1vh 3.5vw;
                text-align: center;
                font-size: 1.5vw;
                color: #9ABCFF; 
            }
        }

        .content-text {
            position: absolute;
            top: 15vh;
            width: 60vw;
            font-size: 3vh;
            color: #9ABCFF;
            margin: 0 12.5vw;
            text-align: center;
            line-height: 1.5;
        }

        .content-text p {
            display: inline-block;
            text-align: justify;
        }
    }

    #footer {
        z-index: -1;
        position: fixed;
        bottom: 0vh;
        
        height: 90vh;
        width: 100%;
        background-image: url("~@/assets/images/memorabilia/footer.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
    }   
</style>