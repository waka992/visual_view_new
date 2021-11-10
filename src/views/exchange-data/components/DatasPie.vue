<template>
    <div class="pie" :style="{height:height,width:width}" />
</template>

<script>
    import echarts from 'echarts'
    require('echarts/theme/macarons') // echarts theme
    require('echarts/theme/shine') // echarts theme
    import { tradeVolumeByPlatform, consumptionByCountry } from "@/api/transaction";

    export default {
        props: {
            width: {
                type: String,
                default: '100%'
            },
            height: {
                type: String,
                default: '100%'
            },
            year: {
                type: Number,
            },
            type: {
                type: String,
            },
        },

        data() {
            return {
                chartData: [],
                chartData: [],
            }
        },

        mounted() {
            this.getData();
        },

        methods: {
            getData() {
                switch (this.type) {
                    case 'platform':
                        tradeVolumeByPlatform(this.year)
                        .then(res => {
                            if (res.code === 1000) { 
                                let loopData = res.data.results;
                                for (let i = 0; i < loopData.length; i++) {
                                    this.chartData[i] = {
                                        name  :  loopData[i].name,
                                        value :  loopData[i].amount,
                                    }
                                    this.chartColor = ['#fec979','#b6a3dc']
                                }
                                this.initChart();
                            }
                        }) 
                    break;

                    case 'country':
                        consumptionByCountry(this.year)
                        .then(res => {
                            if (res.code === 1000) { 
                                let loopData = res.data.results;
                                for (let i = 0; i < loopData.length; i++) {
                                    this.chartData[i] = {
                                        name  :  loopData[i].name,
                                        value :  loopData[i].amount,
                                    }
                                    this.chartColor = ['#fe832c','#9bd1fc']
                                }
                                this.initChart();
                            }
                        })
                        
                    break;
                } 
            },

            // 初始化echarts
            initChart() {
                let option = {
                    color: this.chartColor,
                    title: {
                        show: false,
                        text: '占比重',
                        x: 'center',
                        y: 'bottom',
                        bottom: '0%',
                        padding: 0,
                        textStyle: {
                            fontSize: 16,
                            color: '#fff',
                        },
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{b} : {c} ({d}%)'
                    },

                    legend: {
                        top: '1%',
                        // left: '18%',
                        // itemGap: 30,　　
                        orient: 'horizontal',
                        icon: "circle",
                        textStyle: {
                            fontSize: 14,
                            color: '#fff'
                        },
                        data: this.chartData,
                    },

                    series: [
                        {
                            name: '比重',
                            type: 'pie',
                            radius: '80%',
                            center: ['50%', '55%'],
                            data: this.chartData,
                            emphasis: {
                                itemStyle: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            },
                            label: {
                                show: true,
                                position: 'inside',
                                formatter: function(data){ return data.percent.toFixed(0)+"%";}
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                        }
                    ]
                };
                var chart = echarts.init(this.$el);
                chart.setOption(option);
            },
        }
    }
</script>

<style scoped>
    .pie{
        padding-top: 1vh;
        /* background: red; */
    }
</style>