<template>
    <div>
        <BackGround />
        <Header title="互动交易"/>
        <div class="body">
            <div class="decoration1"></div>
            <div id="main">
                <div class="subject">
                    <img src="~@/assets/images/interactive/title.png" alt="title">
                    <!-- <div>广东有色金属</div>
                    <div>交易中心</div> -->
                </div>
            </div>
            <div id="side"></div>
            <div class="decoration2"></div>

            <!-- 卖方 -->
            <div id="one" @click.once="handleOne()">
                <div class="one-sub-left" v-show="oneSubLeftStatus">
                    <div class="transition-box rollerRight"></div>
                    <div class="transition-box rollerRight"></div>
                </div>
                <div class="one-sub zoomer" v-if="oneSubStatus" @click.stop="handleOneSub()"></div>
                <div class="one-info" v-if="oneInfoStatus">
                    <div class="one-info-logo"></div>
                    <table class="one-info-text">
                        <tr><td>编号</td><td>gd10000001</td></tr>
                        <tr><td>交易商</td><td>广州聚丰金属有限公司</td></tr>
                        <tr><td>等级</td><td>二级</td></tr>
                    </table>
                </div>
                <div class="one-info2" v-show="oneInfo2Status">
                    <p>{{ oneInfoText }}</p>
                </div>
            </div>  
            <div class="one-go-line" v-if="one_go.lineStatus">
                <ConnectLine :line_path="one_go.line" :arrow_path="one_go.arrow"/>
            </div>
            <div class="one-go-line" v-if="one_back.lineStatus">
                <ConnectLine :line_path="one_back.line" :arrow_path="one_back.arrow"/>
            </div>
            
            <!-- 卖方 -->

            <!-- 大场库 -->
            <div id="two">
                <transition name="el-zoom-in-center">
                    <div class="two-info" v-show="twoInfoStatus">
                        <div class="transition-box"></div>
                        <div class="transition-box"></div>
                        <div class="transition-box"></div>
                    </div>
                </transition>
            </div>
            <div class="one-go-line" v-if="two_go.lineStatus">
                <ConnectLine2 :line_path="two_go.line" :arrow_path="two_go.arrow"/>
            </div>
            <div v-show="twoSubStatus" class="two-sub">
                <span>{{ twoSubText }}</span>
            </div>
            <div class="one-go-line" v-if="two_back.lineStatus">
                <ConnectLine2 :line_path="two_back.line" :arrow_path="two_back.arrow"/>
            </div>
            <!-- 大场库 -->

            <!-- 融资 -->
            <!-- <div id="three"></div> -->
            <!-- 融资 -->

            <!-- 买方 -->
            <div id="four" class="fadeIn" v-show="fourStatus" @click.stop="handleFour()">
                <div class="four-sub" v-show="fourSubStatus">
                    <div class="transition-box rollerRight"></div>
                    <div class="transition-box rollerRight"></div>
                    <div class="transition-box rollerRight"></div>
                </div>
                <div class="four-sub-left bounceIn" v-show="fourSubStatus" @click.stop="handleFourSub()"></div>
                <div class="four-sub-right bounceIn" v-show="fourSubStatus"></div>
            </div>
            <!-- 买方 -->

            <!-- 供应链金融 -->
            <!-- <div id="five"></div> -->
            <!-- 供应链金融 -->

            <!-- 银行 -->
            <div id="six" v-show="sixStatus" class="slideUp">
                <div class="six-sub" v-show="sixStatus">
                    <div class="transition-box icon1 rollerRight"></div>
                    <div class="transition-box icon2 rollerRight"></div>
                    <div class="transition-box icon3 rollerRight"></div>
                    <div class="transition-box icon4 rollerRight"></div>
                </div>
            </div>
            <!-- 银行 -->
        </div>
    </div>
</template>

<script>
    import Header from '@/components/Header'
    import BackGround from '@/components/BackGround2'
    import ConnectLine from './line'
    import ConnectLine2 from './line2'
    import "@/assets/style/wickedcss.min.css";

    export default {
        name: 'InterActive',
        components: {
            Header, 
            BackGround,
            ConnectLine,
            ConnectLine2,
        },

        data() {
            return {
                // 左侧
                one_go: {
                    lineStatus: false,
                    line: 'M10,20 L475,20 L475,105',
                    arrow: '"M12,19 L474,19 L474,106"',
                },
                one_back: {
                    lineStatus: false,
                    line: 'M475,106 L477,20 L24,20',
                    arrow: '"M475,106 L474,20 L21,20"',
                },
                oneSubLeftStatus: false,
                oneInfoStatus: false,
                oneSubStatus: false,
                oneSubShow: true,

                oneInfo2Status: false,
                oneInfoText: '文字',

                two_go: {
                    lineStatus: false,
                    line: 'M10,20 L150,20 L150,180',
                    arrow: '"M12,19 L149,19 L149,181"',
                },
                two_back: {
                    lineStatus: false,
                    line: 'M150,196 L150,20 L0,20',
                    arrow: '"M150,196 L150,20 L23,20"',
                },
                twoInfoStatus: false,
                twoSubStatus: false,
                twoSubText: '文字',

                // 右侧
                fourStatus: false,
                fourSubStatus: false,

                sixStatus: false,
            };
        },

        methods: {
            handleOne(){
                // 动画3秒跑完，2秒后返回
                this.one_go.lineStatus = true;

                setTimeout(()=> {
                    this.oneSubLeftStatus = true;
                    this.oneInfo2Status = true;
                    this.oneInfoText = '申请认证';
                }, 1500);

                setTimeout(()=> {
                    this.one_go.lineStatus = false;
                    this.one_back.lineStatus = true;
                    this.oneInfo2Status = false;
                }, 5000);

                setTimeout(()=> {
                    this.oneInfoText = '认证成功\n二级交易商'
                    this.oneInfo2Status = true;
                }, 6500);

                setTimeout(()=> {
                    this.oneInfoStatus = true;
                }, 7000);
            
                setTimeout(()=> {
                    // this.one_back.lineStatus = false;
                    this.oneSubStatus = true;
                }, 8000);
            },

            handleOneSub(){
                // 动画2秒跑完，2秒后返回
                if( this.oneSubShow ){
                    this.oneSubShow = false;
                    this.two_go.lineStatus = true;
                    this.one_back.lineStatus = false;
                    this.oneInfoStatus = false;
                    this.oneInfo2Status = false;
                    
                    setTimeout(()=> {
                        this.twoSubStatus = true;
                        this.twoSubText = '注册仓单';
                        this.twoInfoStatus = true;
                    }, 1500);
                    setTimeout(()=> {
                        this.two_go.lineStatus = false;
                        this.two_back.lineStatus = true;
                        this.twoSubStatus = false;
                    }, 4000);
                    setTimeout(()=> {
                        this.twoSubStatus = true;
                        this.twoSubText = '仓单凭证';
                    }, 5000);
                    setTimeout(()=> {
                        this.twoSubStatus = false;
                        this.two_back.lineStatus = false;
                        this.one_go.lineStatus = true;
                    }, 9000);
                    setTimeout(()=> {
                        this.oneInfo2Status = true;
                        this.oneInfoText = '挂单';
                    }, 10000);
                    setTimeout(()=> {
                        this.one_go.lineStatus = false;
                        this.oneInfo2Status = false;
                        this.fourStatus = true;
                    }, 13000);
                } else {
                    return;
                }
            },

            handleFour(){
                this.fourSubStatus = true
            },

            handleFourSub(){
                this.sixStatus = true
            }
        }
    };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .decoration1 {
        height: 45vh;
        width: 25vw;
        position: absolute;
        bottom: -5vh;
        left: -10vw;
        background: url("~@/assets/images/interactive/lower-left.png") center/100% 100%; 
        z-index: -1;
        opacity: 0.5;
    }

    .decoration2 {
        height: 50vh;
        width: 25vw;
        position: absolute;
        top: -15vh;
        right: -10vw;
        background: url("~@/assets/images/interactive/upper-right.png") center/100% 100%; 
        z-index: -1;
        opacity: 0.4;
    }

    .body {
        height: 80vh;
        width: 80vw;
        margin: 5vh 10vw;
        // background: red;

        position: relative;
    }

    #one {
        height: 9vw;
        width: 9vw;
        position: absolute;
        top: 20vh;
    
        background: url("~@/assets/images/interactive/maifang.png") center/100% 100% no-repeat;
        cursor: pointer;

        .one-sub-left {
            height: 8vw;
            width: 8vw;
            position: absolute;
            top: 0;
            right: 9vw;

            display: flex;
            flex-direction: row;
            z-index: 1;

            .transition-box {
                margin-left: 1vw;
                height: 3vw;
                width: 3vw;
                background: url("~@/assets/images/interactive/maifang0.png") center/100% 100% no-repeat;
            }
        }

        .one-sub {
            height: 3vw;
            width: 3vw;
            position: absolute;
            top: 6vw;
            left: 8.5vw;
            background: url("~@/assets/images/interactive/xingyongpingjia.png") center/100% 100% no-repeat;
            cursor: pointer;
            z-index: 1;
        }

        .one-info {
            width: 12vw;
            height: 6vh;
            font-size: 1vh;
            position: absolute;
            bottom: 5vw;
            left: calc(9vw + 9vw);

            border-radius: 4px;
            overflow: auto;

            display: flex;
            flex-direction: row;

            .one-info-logo {
                height: 100%;
                width: 3.3vw;
                // margin: 0 2px;
                background: url("~@/assets/images/interactive/logo-mini.png") center/cover no-repeat;
            }

            .one-info-text {
                // border-left: 1px solid gray;
                height: 100%;
                padding: 0;
                text-align: center;

                background-color: #FFF;
                opacity: 0.9;
            }
        }

        .one-info2 {
            width: 5vw;
            color: #fff;
            font-size: 1.5vh;
            position: absolute;
            bottom: 4vw;
            left: calc(9vw + 3vw);

            text-align: center;
            white-space: pre-line;
            line-height: 1.2
        }
    }

    .one-go-line {
        height: 9.5vw;
        width: 9.5vw;
        position: absolute;
        top: calc(20vh + 4vw);
        left: calc(9vw - 0.7vw);

        // background: red;
    }

    #two {
        height: 11.5vw;
        width: 11.5vw;
        position: absolute;
        top: 45vh;
        left: 10vw;

        background: url("~@/assets/images/interactive/dachangku.png") center/100% 100% no-repeat;
        
        .two-info {
            height: 3vw;
            width: 12vw;
            position: absolute;
            top: 8.5vw;
            left: -12vw;
            
            display: flex;
            flex-direction: row;
            z-index: 1;

            .transition-box {
                margin-left: 1vw;
                height: 3vw;
                width: 3vw;
                background: url("~@/assets/images/interactive/cangku.png") center/100% 100% no-repeat;
            }
        }
    }

    .two-sub {
        height: 11.5vw;
        width: 11.5vw;
        font-size: 1.5vh;
        position: absolute;
        top: calc(20vh + 8vw);
        left: calc(10vw + 7vw);
        color: #fff;
    }

    #three {
        height: 11.5vw;
        width: 11.5vw;
        position: absolute;
        top: 2vh;
        left: 15vw;

        background: url("~@/assets/images/interactive/rongzi.png") center/100% 100% no-repeat; 
    }

    #main {
        height: 30vw;
        width: 30vw;
        position: absolute;
        top: 11vh;
        left: 25vw;

        // background: red;

        background: url("~@/assets/images/interactive/main-bg.png") center/100% 100% no-repeat; 
        display: table;

        .subject {
            display: table-cell;
            vertical-align: middle;
            text-align: center;

            img {
                max-height: 38%;
                max-width: 38%;
            }
            
            // font-size: 4vh;
            // font-weight: bold;
            // color: #9ABCFF;
            
            // div:first-child{
            //     padding-bottom: 2vh;
            // }
        }
    }

    #side {
        z-index: -1;
        height: 90vh;
        width: 55vw;
        position: absolute;
        top: -10vh;
        left: 15vw;
        
        background: url("~@/assets/images/interactive/main-side.png") center/90% 90% no-repeat; 
    }

    #four {
        height: 11vw;
        width: 11vw;
        position: absolute;
        bottom: 5vh;
        left: 65vw;
        cursor: pointer;

        background: url("~@/assets/images/interactive/maifang1.png") center/100% 100% no-repeat; 

        .four-sub {
            height: 3vw;
            width: 12vw;
            position: absolute;
            bottom: 0vh;
            left: 10vw;
            
            display: flex;
            flex-direction: row;
            z-index: 1;

            .transition-box {
                margin-left: 1vw;
                height: 3vw;
                width: 3vw;
                background: url("~@/assets/images/interactive/maifang2.png") center/100% 100% no-repeat;
            }
        }

        .four-sub-left {
            height: 8vw;
            width: 8vw;
            position: absolute;
            top: -5vw;
            right: 10vw;
            cursor: pointer;

            background: url("~@/assets/images/interactive/gongyinglianjinrong.png") center/100% 100% no-repeat; 
        }

        .four-sub-right {
            height: 8vw;
            width: 8vw;
            position: absolute;
            top: -5vw;
            left: 10vw;

            background: url("~@/assets/images/interactive/quanezhifu.png") center/100% 100% no-repeat; 
        }
    }

    #five {
        height: 10vw;
        width: 10vw;
        position: absolute;
        top: 2vh;
        left: 64vw;

        background: url("~@/assets/images/interactive/gongyinglian.png") center/100% 100% no-repeat;
    }

    #six {
        height: 10vw;
        width: 10vw;
        position: absolute;
        top: 10vh;
        left: 62vw;

        background: url("~@/assets/images/interactive/yinghang.png") center/100% 100% no-repeat; 

        .six-sub {
            height: 3vw;
            width: 16vw;
            position: absolute;
            top: 0vh;
            left: 10vw;
            
            display: flex;
            flex-direction: row;
            z-index: 1;

            .transition-box {
                margin-right: 1vw;
                height: 3vw;
                width: 3vw; 
            }

            .icon1 {
                background: url("~@/assets/images/interactive/pingan.png") center/100% 100% no-repeat;
            }
            .icon2 {
                background: url("~@/assets/images/interactive/gonghang.png") center/100% 100% no-repeat;
            }
            .icon3 {
                background: url("~@/assets/images/interactive/nonghang.png") center/100% 100% no-repeat;
            }
            .icon4 {
                background: url("~@/assets/images/interactive/gongyinglian.png") center/100% 100% no-repeat;
            }
        }
    }
</style>