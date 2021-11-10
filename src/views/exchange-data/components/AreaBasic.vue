<template>
    <div class="area-basic" :style="{height:height,width:width}" />
</template>

<script>
    import echarts from 'echarts'
    require('echarts/theme/macarons') // echarts theme
    import { tradevolume } from "@/api/transaction";

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
        },

        data() {
            return {
                xData: [],
                yData: [],
            }
        },

        mounted() {
            this.getTradevolume({
                year : this.year
            });
        },

        methods: {
            getTradevolume(query) {
                tradevolume(query)
                .then(res => {
                    if (res.code === 1000) { 
                        let loopData = res.data.results.reverse();
                        for (let i = 0; i < loopData.length; i++) {
                            this.xData[i] = loopData[i].statis_date.slice(2,-2)+'-'+loopData[i].statis_date.slice(-2)
                            this.yData[i] = loopData[i].amount
                        }
                        this.initChart();
                    }
                })
            },

            // 初始化echarts
            initChart() {
                let option = {
                    textStyle: {
                        fontStyle: {
                            color: '#fcc26f'
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
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
                        axisLabel: {
                            show:true,
                            interval:0, // 使x轴横坐标全部显示
                        },
                        // nameTextStyle: {
                        //     fontSize: 36,
                        //     color: '#1e95f0',
                        // },
                        data: this.xData
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
                        left: 30,
                        right: 15,
                        top: 20,
                        bottom: 20,
                    },
                    series: [{
                        type: 'line',
                        data: this.yData,
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: '#fcc26f'
                                }, {
                                    offset: 1,
                                    color: '#00294b'
                                }]),
                            }
                        },
                        symbol: 'circle',
                        symbolSize: 8,
                        itemStyle: {
                            normal: { borderColor: "#fff", color: '#1e95f0', lineStyle: { color: "#fcc26f", width: 1.5} }
                        },
                    }]
                };

                var chart = echarts.init(this.$el, 'macarons');
                chart.setOption(option);
            },
        }
    }
</script>