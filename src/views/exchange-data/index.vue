<template>
    <div>
        <BackGround />
        <Header title="交易数据"/>

        <div class="body">
            <div class="aside left">
                <div>
                    <div class="aside-title">
                        <div class="text">平台月度交易数据</div>
                    </div>
                    <div class="desc" style="height: 23.5vh">
                        <AreaBasic :year="tradeYear"/>
                    </div>
                </div>
                <div>
                    <div class="aside-title" style="margin-top: 20px;">
                        <div class="text">平台历年交易数据</div>
                    </div>
                    <div class="desc" style="height: 23.5vh">
                        <BarTick />
                    </div>
                </div>
                <div>
                    <div class="aside-title" style="margin-top: 20px;">
                        <div class="text">平台客户量</div>
                    </div>
                    <div class="desc" style="height: 23.5vh">
                        <BarTick2 />
                    </div>
                </div>
            </div>

            <div class="main">
                <div class="main-title">
                    累计交易金额<span>&nbsp;{{ currentTradeTotal }}&nbsp;</span>亿元
                </div>
                <div class="main-content"></div>
                <ChinaMap :year="tradeYear" :height="'75vh'"/>
            </div>

            <div class="aside right">
                <div>
                    <div class="aside-title">
                        <div class="text">品种交易量占比</div>
                    </div>
                    <div class="desc" style="height: 28vh">
                        <DonutChart :year="tradeYear"/>
                    </div>
                </div>
                <div>
                    <div class="aside-title" style="margin-top: 20px;">
                        <div class="text">主要交易品种</div>
                    </div>
                    <div class="desc" style="height: 16vh">
                        <div class="aside-right-content">
                            <div><img class="icon" src="~@/assets/images/exchangedata/tong-icon.png"/><span class="text">铜</span></div>
                            <div><img class="icon" src="~@/assets/images/exchangedata/qian.png"/><span class="text">铅</span></div>
                            <div><img class="icon" src="~@/assets/images/exchangedata/tonggan-icon.png"/><span class="text">铜杆</span></div>
                        </div>
                        <div class="aside-right-content">
                            <div><img class="icon" src="~@/assets/images/exchangedata/lv.png"/><span class="text">铝</span></div>
                            <div><img class="icon" src="~@/assets/images/exchangedata/xin-icon.png"/><span class="text">锌</span></div>
                            <div><img class="icon" src="~@/assets/images/exchangedata/lvding-icon.png"/><span class="text">铝锭</span></div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="aside-title" style="margin-top: 20px;">
                        <div class="text">价格影响力</div>
                    </div>
                    <div class="desc" style="height: 26.5vh; padding: 0;">
                        <el-row >
                            <el-col :span="12">
                                <Pie :year="tradeYear" :type="'platform'" :height="'23vh'"/>
                                <div style="text-align:center;margin-top:0vh;">平台占国内交易量比重</div>
                            </el-col>
                            <el-col :span="12">
                                <Pie :year="tradeYear" :type="'country'" :height="'23vh'"/>
                                <div style="text-align:center;margin-top:0vh;">中国占世界消费量比重</div>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from '@/components/Header'
    import BackGround from '@/components/BackGround2'
    import ChinaMap from "./components/ChinaMap.vue";
    import Pie from "./components/DatasPie.vue";
    import AreaBasic from "./components/AreaBasic.vue";
    import BarTick from "./components/BarTick.vue";
    import BarTick2 from "./components/BarTick2.vue";
    import DonutChart from "./components/DonutChart.vue";
    import ReserveMap from "@/views/industry-chain/components/ReserveMap.vue";
    import ProductionBar from "@/views/industry-chain/components/ProductionBar.vue";

    import { currentVolume } from "@/api/transaction";

    export default {
        name: 'ExchangeData',
        components: {
            Header, 
            BackGround,
            ChinaMap,
            Pie,
            AreaBasic,
            BarTick,
            BarTick2,
            DonutChart,
            ReserveMap,
            ProductionBar
        },

        created() {
            this.tradeYear = new Date().getFullYear();
            this.getCurrentVolume();
        },

        data() {
            return {
                tradeYear: String,
                currentTradeTotal: 0,
            };
        },

        methods: {
            getCurrentVolume() {
                currentVolume()
                .then(res => {
                    if (res.code === 1000) { 
                        this.currentTradeTotal = res.data.total_amount;
                    }
                })
            }
        }
    };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    $white: #fff;
    $blue: #00294d;

    * { padding: 0; margin: 0;}

    .body {
        padding: 20px;
        display: flex;
        flex-direction: row;
        color: $white;

        .main {
            height: 85vh;
            width: 44vw;
            margin: 0 20px;
            position: relative;
        }

        .main-title {
            background-image: url("~@/assets/images/exchangedata/jiaoyishujukuang.png");
            background-size: 100% 100%;
            width: 100%;
            height: 10vh;
            display: flex;
            justify-content: center;
            align-items: center;

            font-size: 34px;
            color: #FFFFFF;
            font-weight: bold;

            span {
                vertical-align: bottom;
                font-size: 67px;
                color:  #FEC979;
            }
        } 

        .main-content {
            z-index: -1;
            background-image: url("~@/assets/images/exchangedata/earth.png");
            background-position: center;
            background-size: contain;
            background-repeat: no-repeat;
            opacity: 0.4;

            position: absolute;
            top: 15%;
            left: 10%;
            height: 80%;
            width: 80%;
        }

        .aside-title {
            background: $blue;
            .text {
                background-image: url("~@/assets/images/exchangedata/faguang-zhuangshi.png");
                background-size: 100% 100%;
                background-position: center;
                background-repeat: no-repeat;
                box-sizing: border-box;
                text-align: center;
                height: 36px;
                line-height: 34px;
                font-size: 24px;
            }
        }

        .aside {
            width: 28vw;
            .desc {
                background: $blue;  
                padding: 15px;
                background-image: url("~@/assets/images/exchangedata/faguangzhuangshijiao.png");
                background-size: 100%;
                background-repeat:no-repeat;
                background-position:left bottom;            
            }
        }

        .aside-right-content {
            padding: 10px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            .icon{
                display:inline-block;
                vertical-align: middle;
                height: 40px;
                width: 40px;
            }
            .text {
                margin-left: 8px;
                font-size: 18px;
            }
        } 
    }
</style>