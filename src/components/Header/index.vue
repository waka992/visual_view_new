<template>
    <div class="header">
        <div class="title">
            <div class="left">广东有色金属交易平台</div>
            <div class="middle">{{ title }}</div>
            <div class="right">{{ nowDate | parseTime('{y} 年 {m}月 {d}日 {h}:{i}') }}</div>
        </div>
    </div>
</template>

<script>
    import { parseTime } from "@/utils";

    export default {
        name: 'Header',
        components: {},

        props: {
            title: {
                type: String,
                default: '标题'
            },
        },

        filters: {
            parseTime,
        },

        data() {
            return {
                nowDate: new Date(), //实时时间
            };
        },

        mounted() {
            let _this = this;
            this.now = setInterval(()=> {
                _this.nowDate = new Date();
            }, 1000);
        },

        beforeDestroy: function() {
            if (this.now) {
                clearInterval(this.now);
            }
        }
    };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    $white: #fff;
    $blue: #00294d;

    .header {
        box-sizing: border-box;
        // height: 10vh;
        // width: 100vw;
        padding-top: 10px;

        .title {
            height: 9vh;
            background: url("~@/assets/images/exchangedata/xiankuang-dingbu.png");
            background-size: 100% 100%;

            color: $white;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            font-size: 28px;
            font-weight: bold;
            .left {
                width: 34.1vw;
                padding-left: 4vw;
            }
            .middle {
                width: 30vw;
                // padding: 10vw;
                margin-bottom: 1.5vh;
                font-size: 35px;
                text-align:center;
            }
            .right {
                width: 35.9vw;
                padding-left: 14vw;
            }
        }
    }
</style>