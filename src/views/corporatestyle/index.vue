<template>
    <div>
        <BackGround />
        <Header title="企业风采"/>
        <div class="content">
            <video-player class="vjs-custom-skin" ref="videoPlayer"
            controls :options="playerOptions" @ready="playerReadied" @play="onPlayerPlay($event)"  @ended="onPlayerEnded($event)" ></video-player>
        </div>
    </div>
</template>

<script>
import BackGround from "@/components/BackGround2";
import Header from "@/components/Header";
import { videoPlayer } from 'vue-video-player'
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css';

export default {
    name: "CorporateStyle",
    components: {
        Header,
        BackGround,
        videoPlayer
    },
    

    data() {
        return {
            playerOptions: {
                fluid: true,
                sources: [
                    {
                        src: 'https://lhbibucket.oss-cn-shenzhen.aliyuncs.com/video/%E5%85%B4%E6%B5%B7%E9%9B%86%E5%9B%A2%E5%AE%A3%E4%BC%A0%E7%89%872.mp4',
                        type: 'video/mp4'
                    }
                ],
                controlBar: {
                    timeDivider: true,
                    durationDisplay: true,
                    remainingTimeDisplay: false,
                    fullscreenToggle: true  //全屏按钮
                }
            },
            myPlayer: ''
        };
    },

    methods: {
        // 视频加载完成回调
        playerReadied(e) {
            this.myPlayer = e;
            this.myPlayer.requestFullscreen();
        },

        onPlayerPlay(e) {
            if(!this.myPlayer.isFullscreen()){
                this.myPlayer.isFullscreen(true)
            }
        },
 
        // 结束回调
        onPlayerEnded (e) {
            this.myPlayer.requestFullscreen();
            this.myPlayer.exitFullscreen();
        },
    }
};
</script>

<style scoped>
    .content {
        height: 60vh;
        width: 60vw;

        margin: 10vh 20vw;
    }
</style>
