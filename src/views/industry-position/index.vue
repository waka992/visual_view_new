<template>
    <div>
        <BackGround />
        <Header title="行业定位"/>
        <div class="body">
            <div class="grid">
                <div class="cover icon1"></div>
                <div class="content">
                    <div class="title">过往的行业问题</div>
                    <div class="desc">
                        <p>1.交易主体组织化程度偏弱</p>
                        <p>2.交易方式现代化程度有待提高</p>
                        <p>3.物流服务专业化水平较低</p>
                        <p>4.交易活跃，但税收贡献度较低</p>
                    </div>
                </div>
            </div>
            <div class="grid">
                <div class="cover icon2"></div>
                <div class="content">
                    <div class="title">政府的引导和扶持</div>
                    <div class="desc desc1">
                        <p>
                            为推动有色金属交易平台在南海区发展壮大，充分发挥平台的集聚效应和骨干企业的龙头带动效应，促进金属加工批发行业健康发展，南海区、大沥镇两级政府通过政策扶持、鼓励创新、强化标准等，引导产业转型升级。
                        </p>
                    </div>
                </div>
            </div>
            <div class="grid">
                <div class="cover icon3"></div>
                <div class="content">
                    <div class="title">平台的价值和效益</div>
                    <div class="desc desc2">
                        <p>1.提升行业竞争力</p>
                        <p>2.掌握区域定价权</p>
                        <p>3.提高税收贡献度</p>
                        <p>4.拉动产业链发展</p>
                    </div>
                </div>
            </div>
            <div class="grid">
                <div class="cover icon4"></div>
                <div class="content">
                    <div class="title">平台愿景</div>
                    <ul class="desc desc4">
                        <li><p>推动华南有色金属向平台化、数字化、技术化发展。</p>
                        <li><p>推动有色金属行业供应链金融的发展。</p></li>
                        <li><p>利用南海有色金属加工产业的雄厚基石，把现有的产业链打造成新的价值链。</p></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="footer"></div>
    </div>
</template>

<script>
    import Header from '@/components/Header'
    import BackGround from '@/components/BackGround2'

    export default {
        name: 'industryposition',
        components: {
            Header, 
            BackGround,
        },

        data() {
            return {};
        },
    };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .body {
        height: 65vh;
        padding: 5vh 4vw;
        display: flex;
        flex-direction: row;
        .grid {
            margin-left: 4vw;
            height: 55vh;
            width: 20vw;
    
            background-image: url("~@/assets/images/industryposition/content.png");
            background-size: 100% 90%;
            background-repeat:no-repeat;
            background-position: top 5vh center;

            .cover {
                height: 22vh;
                width: 10vw;
                margin: auto;
                background-size: contain;
                background-repeat:no-repeat;
                background-position:center;
            }
            .icon1 {
                background-image: url("~@/assets/images/industryposition/lishiwenti.png");
            }
            .icon2 {
                background-image: url("~@/assets/images/industryposition/zhengcefuchi.png");
            }
            .icon3 {
                background-image: url("~@/assets/images/industryposition/shehuixiaoying.png");
            }
            .icon4 {
                background-image: url("~@/assets/images/industryposition/gongtongyuanjing.png");
            }

            .content .title{
                text-align: center;
                font-size: 28px;
                color: #fff;
            }

            .content .desc{
                // line-height: 40px;
                font-size: 22px;
                color: #9ABCFF;
                margin: 0 25px;
            }

            .desc1{
                line-height: 1.5
            }

            .desc2{
                text-align: center;
            }

            .desc4{
                line-height: 1.4
            }
        }

        .grid:first-child { 
            margin-left: 0;
        }
    }
    .footer {
        height: 25vh;
        background-image: url("~@/assets/images/industryposition/footer.png");
        background-size: 100%;
        background-repeat:no-repeat;
    }
</style>