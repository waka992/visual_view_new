<template>
    <div class="content-box" :style="`width:${width};`">
        <div class="title" :style="`width:${width};`">
            <span class="main-title">
                {{name.cnName}}
            </span>  
            <span class="sub-title">
                {{name.enName}}
            </span>
        </div>
  
        <div class="content" :style="`width:${width};`">
            <div class="content-bg">
                <img src="~@/assets/images/new/index/index-content-border.png" alt="">
            </div>
            <slot></slot>
        </div>
    </div>
</template>

<script>

    export default {
        props: {
            name: Object,
            width: String,
        },
        name: 'ContentBox',
        components: {
        },
        data() {
            return {
             
            }
        },
        mounted() {
        },
        
        methods: {
            
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>    
    .content-box {
        position: relative;
        width: 485px;
        height: 100%;
    }

    .title {
        display: inline-block;
        width: 485px;
        height: 52px;
        line-height: 52px;
        background: url("~@/assets/images/new/index/index-title-bg.png") left/cover no-repeat;
        padding-left: 30px;
        font-family: Source Han Sans CN;
        color: #E6E6E6 ;

        .main-title {
            font-size: 19px;
        }
        .sub-title {
            font-size: 15px;
            padding-left: 16px;
        }
    }

    .content {
        position: relative;
        display: inline-block;
        // background: url("~@/assets/images/new/index/index-content-border.png")  no-repeat;
        width: 485px;
        height: calc(100% - 52px);
        margin-top: 10px;

        .content-bg {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;

            img {
                display: inline-block;
                width: 100%;
                height: 100%;
            }

        }
    }
</style>