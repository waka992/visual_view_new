<template>
    <div class="index">
        <div class="vue-particles" :style="{'backgroundImage': `url(${bgImage})`}"
        >
        </div>
    </div>
</template>

<script>
export default {
    name: "BackGround2",

    props: {
        bgImage: {
            type: String,
            default: '/static/images/background.png'
        },
    },

    data() {
        return {
            pressTimer: null,
            startX: '',
            startY: '',
            startTime: ''
        };
    },

    mounted(){
        if(this.$route.path !== '/'){;
            window.addEventListener("touchstart", (event) => { this.start(event) }, true);
            window.addEventListener("touchend", (event) => { this.cancel(event) }, true);
            window.addEventListener("touchcancel", (event) => { this.cancel(event) }, true);

            window.addEventListener("dblclick", (event) => {
                this.$contextmenu({
                    items: [
                        { label: "", onClick:() => {this.$router.go(-1)} }, // 返回
                        { label: "", onClick: () => {this.$router.push({ path:"/" })} }, // 首页
                        { label: "", onClick: () => {this.$router.go(0)} }, // 刷新
                        { label: "", onClick: () => {this.$contextmenu.destroy()} }, // 取消
                    ],
                    event,
                    zIndex: 99,
                });
                return false;
            }, true);
        }

        document.oncontextmenu = function () {
            return false;
        };
    },

    methods: {
        start(e){
            if (e.type === 'click' && e.button !== 0) {
                return;
            }
            e.preventDefault();
            // 记录下触发的坐标和时间
            this.startTime = (new Date()).getTime();
            this.startX = e.targetTouches[0].clientX;
            this.startY = e.targetTouches[0].clientY;
            /**
            *  注意：此处处理长按震动效果，经测试IOS目前不支持震动
            **/
            if (this.pressTimer === null) {
                // 首页不显示
                if( this.$route.path != '/' ){
                    this.pressTimer = setTimeout(() => {
                        navigator.vibrate = navigator.vibrate
                            || navigator.webkitVibrate
                            || navigator.mozVibrate
                            || navigator.msVibrate;

                        if (navigator.vibrate) {
                            // 支持
                            navigator.vibrate(200);
                        }
                        // 执行函数
                        this.$contextmenu({
                            items: [
                                { label: "", onClick:() => {this.$router.go(-1)}},
                                { label: "", onClick: () => {this.$router.push({ path:"/" })}},
                                { label: "", onClick: () => {this.$router.go(0)}},
                                { label: "", onClick: () => {this.$contextmenu.destroy()}},
                            ],
                            x: this.startX,
                            y: this.startY,
                            zIndex: 99,
                            minWidth: 230
                        })
                    }, 1000);
                }
            }
        },

        cancel(e){
            /**
             *  注意：此处处理与click事件的冲突（小于300ms可以识别为点击事件的范围 然后判断触摸点的移动距离）
             **/
            e.preventDefault();
            var now = (new Date()).getTime();
            if (now - this.startTime < 300) {
                var x = (Math.abs(this.startX - e.changedTouches[0].clientX) < 30);
                var y = (Math.abs(this.startY - e.changedTouches[0].clientY) < 30);
                if (x && y) {
                    e.changedTouches[0].target.click();
                }
            }
            // 检查计时器是否有值
            if (this.pressTimer !== null) {
                clearTimeout(this.pressTimer);
                this.pressTimer = null;
            }
        }
    }
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
