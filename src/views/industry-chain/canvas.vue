<template>
    <div>
        <BackGround />
        <Header title="贸易关系" />
        <div class="body">
            <img class="bg" src="~@/assets/images/trade/bg-ball.png" />
            <img class="bg bg2" src="~@/assets/images/trade/bg.png"/>
            <div class="h">
                <div class="h1">生产型企业</div>
                <div class="h1" @click="handle()">交易型企业</div>
                <div class="h1">消费型企业</div>
            </div>
            <div class="wordCloud">
                <WordCloudLeft :height="425" :width="425"/>
                <WordCloudMain :height="580" :width="580" :canvasWidth="canvasWidth" :canvasHeight="canvasHeight"/>
                <WordCloudRight :height="425" :width="425"/>

                <canvas id="wordCloudCanvas" ref="wordCloudCanvas" :width="canvasWidth" :height="canvasHeight"></canvas>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from "@/components/Header";
    import BackGround from "@/components/BackGround2";
    import WordCloudLeft from "./components/WordCloudLeft";
    import WordCloudMain from "./components/WordCloudMain";
    import WordCloudRight from "./components/WordCloudRight";

    export default {
        name: "Resource",
        components: {
            Header,
            BackGround,
            WordCloudLeft,
            WordCloudMain,
            WordCloudRight
        },

        data() {
            return {
                canvasHeight: 0,
                canvasWidth: 0,
            }
        },

        created() {},

        mounted() {
            var dom = document.getElementsByClassName('wordCloud');
            this.canvasHeight = dom[0].offsetHeight;
            this.canvasWidth = dom[0].offsetWidth;
        },

        methods: {}
    }
</script>

<style lang="scss" scoped>
    .body {
        // box-sizing: border-box;
        padding-top: 20px;
        display: flex;
        flex-direction: column;
        height: 90vh;
        position: relative;
    }
    .h {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        height: 11vh;
        width: 100%;
    }
    .h1 {
        height: 5vh;
        width: 25vw;
        margin: 3vh 13vw;
        line-height: 5vh;
        text-align: center;

        font-size: 2vh;
        color: #9ABCFF;
        cursor: pointer;

        background: url("~@/assets/images/trade/title.png") center/100% 100% no-repeat;       
    }
    .bg {
        width: 30vw;
        height: 30vw;
        position: absolute;
        top: 20vh;
        left: 35vw;
    }
    .bg2 {
        width: 100%;
        left: 0;
    }

    .wordCloud {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;

        position: relative;

        height: 30vw;
        margin: 7vh 110px;

        // background: red;
        // opacity: 0.1;
    }

    #wordCloudCanvas {
        position: absolute;

        height: 580px;
        width: 100%;
        left: 0px;
        top: 0px;

        z-index: -1;

        // background: black;
    }
</style>
