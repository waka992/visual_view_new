<template>
    <div class="bar-tick" :style="{height:height,width:width}" />
</template>

<script>
    import echarts from 'echarts'
    require('echarts/theme/macarons') // echarts theme
    import { tradeVolumeYear } from "@/api/transaction";
    
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
            years: {
                type: Number,
                default: 7
            },
        },

        data() {
            return {
                xData: [],
                yData: [],
            }
        },

        mounted() {
            this.getTradevolume({
                query_years : this.years
            });
        },

        methods: {
            getTradevolume(query) {
                tradeVolumeYear(query)
                .then(res => {
                    if (res.code === 1000) { 
                        let loopData = res.data;
                        for (let i = 0; i < loopData.length; i++) {
                            this.xData[i] = loopData[i].year
                            this.yData[i] = loopData[i].amount
                        }
                        this.initChart();
                    }
                })
            },

            // 初始化echarts
            initChart() {
                let option = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    textStyle: {
                        fontStyle: {
                            color: '#fcc26f'
                        }
                    },
                    xAxis: {
                        type: 'category',
                        axisTick: {
                            inside: true,
                            length: 0,
                            alignWithLabel: true
                        },
                        axisLine: {
                            lineStyle: {
                                width: 2,
                                color: '#1e95f0'
                            },
                        },
                        data: this.xData,
                    },
                    yAxis: {
                        show: true,
                        name: '亿（元）',
                        nameLocation: 'end',
                        nameTextStyle: {    // 坐标轴名称样式
                            color: '#fff',
                            padding: [5, 0, 0, 5]  // 坐标轴名称相对位置
                        }, 
                        nameGap: 10, // 坐标轴名称与轴线之间的距离
                        axisTick: {
                            inside: true,
                            length: 0
                        },
                        axisTick: {
                            inside: true,
                            length: 0
                        },
                        axisLine: {
                            lineStyle: {
                                width: 2,
                                color: '#1e95f0'
                            },
                        },
                        splitLine: {
                            show: true,
                            lineStyle:{
                                type:'dashed',
                                color: '#1e95f0'
                            }
                        },
                        type: 'value'
                    },
                    grid: {
                        left: 40,
                        right: 10,
                        top: 20,
                        bottom: 20,
                    },
                    series: [{
                        name: '交易量',
                        type: 'bar',
                        barWidth: '20%',
                        data: this.yData,
                        itemStyle: {
                            normal: { borderColor: "#fff", color: '#fc9d45', barBorderRadius: [10, 10, 10, 10]}
                        },
                    }]
                };

                var chart = echarts.init(this.$el, 'macarons');
                chart.setOption(option);
            },
        }
    }
</script>