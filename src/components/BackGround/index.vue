<template>
    <div class="index">
        <vue-particles
        class="vue-particles"
        color="#dedede"
        :particleOpacity="0.7"
        :particlesNumber="50"
        shapeType="circle"
        :particleSize="4"
        linesColor="#dedede"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="200"
        :moveSpeed="1"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
        :style="{'backgroundImage': `url(${bgImage})`}"
        >
        </vue-particles>
        <!-- <div class="vue-particles" :style="{'backgroundImage': `url(${bgImage})`}"></div> -->
    </div>
</template>

<script>
export default {
    name: "BackGround",

    props: {
        bgImage: {
            type: String,
            default: '/static/images/background.png'
        },
    },

    data() {
        return {};
    },
    
    methods: {}
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .vue-particles {
        z-index: -1;
        position: absolute;
        width: 100%;
        min-height: 100vh;
        background: #02071d;
        // background-image: url("/static/images/background.png");
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        box-sizing: border-box;
    }
</style>
