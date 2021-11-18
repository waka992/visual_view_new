<template>
    <div class="index-topbar">
        <div class="left">
            <span class="text">指数</span>
            <span class="line"></span>
            <span class="text">交易数据</span>
            <span class="line"></span>
            <span class="text">产业链</span>
            <span class="line"></span>
            <span class="text">平台介绍</span>
            <img class="desc-img img-left" src="~@/assets/images/new/index/index-topbar-left.png" alt="">
        </div>
        <div class="center">
            <img class="title-img" src="~@/assets/images/new/index/index-title.png" alt="">
        </div>
        <div class="right">
            <img class="desc-img img-right" src="~@/assets/images/new/index/index-topbar-right.png" alt="">
            <span class="text">{{year}}</span>
            <span class="line"></span>
            <span class="text">{{weekList[week]}}</span>
            <span class="line"></span>
            <span class="text">{{time}}</span>
        </div>
    </div>
</template>

<script>
    import moment from "moment";

    export default {
        name: 'IndexTopBar',
        components: {
        },
        data() {
            return {
                week: '',
                time: '',
                year: '',
                timer: null,
                weekList: [
                    'Mon.',
                    'Tue.',
                    'Wed.',
                    'Thur.',
                    'Fri.',
                    'Sat.',
                    'Sun.',
                ]
            }
        },
        mounted() {
            this.getTime()
        },
        destroyed() {
            clearInterval(this.timer)
        },
        methods: {
            getTime() {
                this.year = moment().format('YYYY/MM/DD')
                this.week = moment().day()
                this.time = moment().format('HH:mm:ss')
                this.timer = setInterval(() => {
                    this.time = moment().format('HH:mm:ss')
                    console.log('time')
                }, 1000)
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>    
    .index-topbar {
        position: relative;
        width: 100%;
        height: 115px;
    }
    .right,.center,.left {
        display: inline-block;
    }
    .desc-img {
        display: inline-block;
        width: 352px;
        height: 16px;
    }
    .title-img {
        position: absolute;
        top: 27px;
        left: 50%;
        transform: translateX(-50%);
        display: inline-block;
        width: 488px;
        height: 82px;
    }
    .right,.left {
        position: absolute;
        top: 45px;

        .text,.line {
            vertical-align: middle;
            display: inline-block;
        }
        .text {
            font-size: 15px;
        }
        .line {
            height: 15px;
            width: 1px;
            border-left: 2px solid #E6E6E6;
        }
    }
    .right {
        .text,.line {
            padding-right: 26px;
        }
    }
    .left {
        .text,.line {
            padding-right: 14px;
        }
    }
    .right {
        right: 0;
        margin-right: 36px;
    }
    .left {
        margin-left: 36px;
        left: 0;
    }
 
</style>