<template>
    <div class="donut-chart" :style="{height:height,width:width}" />
</template>

<script>
    import echarts from 'echarts'
    require('echarts/theme/macarons') // echarts theme
    import { tradeVolumeKind } from "@/api/transaction";

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
                chartData: [],
                total: 0,
                legendData1: [],
                legendData2: [],
            }
        },

        mounted() {
            this.getData({
                expand  :  'commodity',
                year    :  this.year
            });
        },

        methods: {
            getData(query) {
                tradeVolumeKind(query)
                .then(res => {
                    if (res.code === 1000) { 
                        let loopData = res.data.results;
                        
                        for (let i = 0; i < loopData.length; i++) {
                            this.chartData[i] = {
                               name  :  loopData[i].commodity.title,
                               value :  loopData[i].percentage,
                            }
                            if(i%2 == 0){
                                this.legendData1[i] = this.chartData[i]
                            } else {
                                this.legendData2[i] = this.chartData[i]
                            }
                        }
                        this.initChart();
                    }
                })
            },

            // 初始化echarts
            initChart() {
                const target = new Map();
                let total = 0            
                this.chartData.forEach((item) => {
                    // 计算value的和，用来算百分比
                    total += item.value
                    // 组成 map {A:1212} ,用来下面获取 value
                    target.set(item.name, item.value)
                })

                let option = {
                    background:'red',
                    tooltip: {
                        trigger: 'item',
                        formatter:'{c}%'　
                    },
                    color: ['#f54d74', '#ad98d9', '#4fa8ed', '#ffb075'],
                    legend: [
                        {
                            top: '1%',
                            left: '5%',
                            itemGap: 30,　　
                            orient: 'vertical',
                            icon: "circle",
                            textStyle: {
                                fontSize: 14,
                                color: '#fff'
                            },
                            data: this.legendData1,
                            // 计算百分比
                            formatter: function(name) {
                                let lists = [];
                                let inum = target.get(name) / total * 100;
                                //保留inum小数点后２位
                                let vnum = parseFloat(inum).toFixed(0);
                                lists.push(name + '  ' + vnum + '%');
                                return lists;
                            }
                        },
                        {
                            top: '1%',
                            right: '5%',
                            itemGap: 30,　　
                            orient: 'vertical',
                            icon: "circle",
                            textStyle: {
                                fontSize: 14,
                                color: '#fff'
                            },
                            data: this.legendData2,
                            // 计算百分比
                            formatter: function(name) {
                                let lists = [];
                                let inum = target.get(name) / total * 100;
                                //保留inum小数点后２位
                                let vnum = parseFloat(inum).toFixed(0);
                                lists.push(name + '  ' + vnum + '%');
                                return lists;
                            }
                        }
                    ],
                    grid: {
                        top: '0%',
                        bottom: '70%',
                        left: "40%",
                        containLabel: false
                    },
                    series: [
                        {
                            name: '',
                            type: 'pie',
                            radius: ['40%', '80%'],
                            center: ['50%', '60%'],
                            avoidLabelOverlap: false,
                            hoverAnimation: false,　
                            label: {
                                show: true,
                                position: 'inside',
                                formatter: '{c}%'
                            },
                            emphasis: {
                                label: {
                                    show: false,
                                    fontSize: '40',
                                    fontWeight: 'bold'
                                }
                            },
                            labelLine: {
                                show: false
                            },
                            data: this.chartData
                        }
                    ]
                };

                var chart = echarts.init(this.$el, 'macarons');
                chart.setOption(option);
            },

            // 初始化echarts
            // initChart() {
            //     let color = ['#FF8700', '#ffc300', '#00e473', '#009DFF'];
            //     let chartData = this.chartData;
            //     let arrName = [];
            //     let arrValue = [];
            //     let sum = 0;
            //     let pieSeries = [],
            //         lineYAxis = [];

            //     // 数据处理
            //     chartData.forEach((v, i) => {
            //         arrName.push(v.name);
            //         arrValue.push(v.value);
            //         sum = sum + v.value;
            //     })

            //     // 图表option整理
            //     chartData.forEach((v, i) => {
            //         pieSeries.push({
            //             name: '学历',
            //             type: 'pie',
            //             clockWise: false,
            //             hoverAnimation: false,
            //             radius: [95 - i * 15 + '%', 90 - i * 15 + '%'],
            //             center: ["40%", "50%"],
            //             minAngle: 15,//最小角度
            //             // startAngle:-270, //起始角度
            //             label: {
            //                 show: false
            //             },
            //             data: [{
            //                 value: v.value,
            //                 name: v.name
            //             }, {
            //                 value: sum - v.value,
            //                 name: '',
            //                 itemStyle: {
            //                     color: "rgba(0,0,0,0)"
            //                 }
            //             }]
            //         });
            //         pieSeries.push({
            //             name: '',
            //             type: 'pie',
            //             silent: true,
            //             z: 1,
            //             clockWise: false, //顺时加载
            //             hoverAnimation: false, //鼠标移入变大
            //             radius: [95 - i * 15 + '%', 90 - i * 15 + '%'],
            //             center: ["40%", "50%"],
            //             // minAngle: 15,//最小角度
            //             // startAngle:-270, //起始角度
            //             label: {
            //                 show: false
            //             },
            //             data: [{
            //                 value: 7.5,
            //                 itemStyle: {
            //                     color: "#426280"
            //                 }
            //             }, {
            //                 value: 2.5,
            //                 name: '',
            //                 itemStyle: {
            //                     color: "rgba(0,0,0,0)"
            //                 }
            //             }]
            //         });
            //         v.percent = (v.value / sum * 100).toFixed(1) + "%";
            //         lineYAxis.push({
            //             value: i,
            //             textStyle: {
            //                 rich: {
            //                     circle: {
            //                         color: color[i],
            //                         padding: [0, 5]
            //                     }
            //                 }
            //             }
            //         });
            //     })

            //     let option = {
            //         color: color,
            //         grid: {
            //             top: '0%',
            //             bottom: '70%',
            //             left: "40%",
            //             containLabel: false
            //         },

            //         legend: {
            //             orient: 'horizontal',
            //             left: '80%',
            //             textStyle: {
            //                 color: '#fff'
            //             }
            //         },
                    
            //         yAxis: [{
            //             type: 'category',
            //             inverse: true,
            //             axisLine: {
            //                 show: false
            //             },
            //             axisTick: {
            //                 show: false
            //             },
            //             axisLabel: {
            //                 formatter: function(params) {
            //                     let item = chartData[params];
            //                     console.log(item)
            //                     // return '{line|}{circle|●}{name|'+ item.name +'}{bd||}{percent|'+item.percent+'}{value|'+ item.value+'}{unit|元}',
            //                     return '{percent|'+item.percent+'}'
            //                 },
            //                 interval: 0,
            //                 inside: true,
            //                 textStyle: {
            //                     color: "#333",
            //                     fontSize: 14,
            //                     rich: {
            //                         line: {
            //                             width: 170,
            //                             height: 10,
            //                             // backgroundColor: {image: dashedPic}
            //                         },
            //                         name: {
            //                             color: '#666',
            //                             fontSize: 14,
            //                         },
            //                         bd: {
            //                             color: '#ccc',
            //                             padding: [0, 5],
            //                             fontSize: 14,
            //                         },
            //                         percent:{
            //                             color: '#fff',
            //                             fontSize: 14,
            //                         },
            //                         value: {
            //                             color: '#333',
            //                             fontSize: 16,
            //                             fontWeight: 500,
            //                             padding: [0, 0, 0, 20]
            //                         },
            //                         unit: {
            //                             fontSize: 14
            //                         }
            //                     }
            //                 },
            //                 show: true
            //             },
            //             data: lineYAxis
            //         }],
            //         xAxis: [{
            //             show: false
            //         }],
            //         series: pieSeries 
            //     };

            //     var chart = echarts.init(this.$el, 'macarons');
            //     chart.setOption(option);
            // },
        }
    }
</script>

<style scoped>
    /* .donut-chart {
        -moz-transform:scaleX(-1);
        -webkit-transform:scaleX(-1);
        -o-transform:scaleX(-1);
        transform:scaleX(-1);
        filter:FlipH;
    } */
</style>