<template>
    <div class="index">
        <BackGround />
        <div class="header">
            <div class="title-decoration"></div>
        </div>
        <Carousel />
    </div>
</template>

<script>
    import Carousel from './components/Carousel'
    import BackGround from '@/components/BackGround'
    
    export default {
        name: 'index',
        components: {
            Carousel,
            BackGround
        },
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>    
    .header {
        // display: inline-block;
        height: 30vh;
        width: 100vw;
        position: relative;
    
        background: url("~@/assets/images/index/title.png") center 5vh no-repeat;
        background-size: 90vw 25vh; 

        .title-decoration{
            position: absolute;
            top: 8vh;
            left: 25vw;
            height: 25vh;
            width: 50vw;
            background-image: url("~@/assets/images/index/bg1.png");
            background-size: 100% 100%;
            background-position: center;
            background-repeat: no-repeat;
        }
    }
</style>