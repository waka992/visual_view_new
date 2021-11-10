<template>
    <div class="line-stack" :style="{height:height,width:width}" />
</template>

<script>
    import echarts from 'echarts'
    require('echarts/theme/macarons') // echarts theme
    import { spotIndex } from '@/api/platformindex'

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
        },

        data() {
            return {
                xData: [],
                yPrice: {
                    name: '价格指数',
                    type: 'line',
                    // stack: '价格指数',
                    yAxisIndex: 0,
                    data: []
                },
                yAmplitude: {
                    name: '涨跌',
                    type: 'line',
                    // stack: '涨跌',
                    yAxisIndex: 1,
                    data: []
                },
            }
        },

        mounted() {
            this.getOption();
        },

        methods: {
            getOption(){
                spotIndex()
                .then(res => {
                    if (res.code === 1000) { 
                        let loopData = res.data.results.reverse();
                        for (let i = 0; i < loopData.length; i++) {
                            this.xData[i] = loopData[i].statis_date.slice(-5)
                            this.yPrice.data[i] = loopData[i].index
                            this.yAmplitude.data[i] = loopData[i].change
                        }
                        this.initChart();
                    }
                }) 
            },

            // 初始化echarts
            initChart() {
                let option = {
                    backgroundColor: '',
                    title: {
                        // text: '折线图堆叠'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    color:['#ECBE37','#F90639'],
                    legend: {
                        data: ['价格指数', '涨跌'],
                        textStyle: {
                            color: '#FFF'
                        },
                        icon: "circle",
                        itemGap: 50, // 间距
                        textStyle: {
                            fontSize: 16,
                            color: '#fff'
                        },
                    },
                    grid: {
                        left: '2%',
                        right: '2%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: true,
                        data: this.xData,
                        itemStyle: {
                            normal: { borderColor: "#fff", color: '#315e86', lineStyle: { color: "#fcc26f" } }
                        },
                        axisLabel: {        
                            show: true,
                            textStyle: {
                                color: '#FEC979',
                                fontSize: '16'
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                width: 1,
                                // color: '#1e95f0'
                            },
                            onZero: false
                        },  
                        axisTick:{
                            show: false  //去掉刻度
                        },
                        
                    },
                    yAxis: [
                        {
                            type: 'value',
                            name : '',
                            position: 'left',
                            scale: true, // y轴自适应 
                            axisLine: {
                                lineStyle: {
                                    width: 1, 
                                    // color: '#77C8FF'
                                },
                            },
                            axisLabel: {        
                                show: true,
                                textStyle: {
                                    color: '#ECBE37',
                                    fontSize: '16'
                                }
                            },
                            axisTick:{
                                show: false  //去掉刻度
                            },
                            splitLine: {
                                show: true,
                                lineStyle:{
                                    // type:'dashed',
                                    color: "#1e95f0",
                                    opacity: 0.2
                                },
                            },
                            splitArea: {
                                show: false
                            },
                        },
                        {
                            type : 'value',
                            name : '',
                            show: true,
                            position: 'right',
                            scale: true, // y轴自适应
                            axisLine: {
                                lineStyle: {
                                    width: 1, 
                                    // color: '#1e95f0'
                                },
                            },
                            axisLabel: {        
                                show: true,
                                textStyle: {
                                    color: '#F90639',
                                    fontSize: '16'
                                }
                            },
                            axisTick:{
                                show: false  //去掉刻度
                            }, 

                            splitLine: {
                                show: true,
                                lineStyle:{
                                    // type:'dashed',
                                    color: "rgba(0,0,0,0)",
                                    opacity: 0.2
                                }
                            },

                            splitArea: {
                                show: false
                            },
                        }
                    ],
                    series: [this.yPrice, this.yAmplitude]
                };

                var chart = echarts.init(this.$el, 'macarons');
                chart.setOption(option);
            },
        }
    }
</script>