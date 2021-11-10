<template>
    <div class="dashboard" :style="{height:height,width:width}" />
</template>

<script>
    import echarts from 'echarts'
    require('echarts/theme/macarons') // echarts theme

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
                chart: '',
                chartOption: {},

                schedule: 50,
                timer: '',
                nowDate: new Date(), //实时时间
            }
        },

        mounted() {
            this.getOption();
            this.chart = echarts.init(this.$el);
            this.initChart()
            // setInterval(()=> {
            //     this.initChart()
            // }, 1000);
        },

        beforeDestroy() {
            clearInterval(this.timer);
        },

        methods: {
            
            getOption(){
                this.chartOption = {
                    // backgroundColor: '#142468',
                    title:{
                        //text: '实时旋转饼图'  
                    },
                    series: [
                        // 环1
                        {
                            type: 'pie',
                            zlevel: 1,
                            silent: true,
                            radius: ['100%', '97%'],
                            label: {
                                normal: {
                                    show: false
                                },
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            startAngle: 130,
                            data: this.pie1()
                        },
                        // 环2
                        {
                            type: 'pie',
                            zlevel: 2,
                            silent: true,
                            radius: ['92%', '89%'],
                            startAngle: 45,
                            hoverAnimation: false,
                            label: {
                                normal: {
                                    show: false
                                },
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data:[ 
                                {value:1, name:'AA', itemStyle: {color: '#40A2F9'}},
                                {value:3, name:'BB', itemStyle: {color: 'rgba(0,0,0,0)'}},
                                {value:2, name:'CC', itemStyle: {color: '#40A2F9'}},
                                {value:2, name:'DD', itemStyle: {color: 'rgba(0,0,0,0)'}},
                            ],
                        },
                        // 环3
                        {
                            type: 'pie',
                            zlevel: 3,
                            silent: true,
                            radius: ['88%', '81%'],
                            startAngle: 130,
                            label: {
                                normal: {
                                    show: false
                                },
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data:[ 
                                {value:4, name:'AA', itemStyle: {color: '#40A2F9'}},
                                {value:18, name:'BB', itemStyle: {color: 'rgba(0,0,0,0)'}},
                                {value:21, name:'CC', itemStyle: {color: '#40A2F9'}},
                                {value:17, name:'DD', itemStyle: {color: 'rgba(0,0,0,0)'}},
                            ],
                        },
                        // 环4
                        {
                            type: 'pie',
                            zlevel: 4,
                            silent: true,
                            radius: ['70%', '62%'],
                            startAngle: 10,
                            label: {
                                normal: {
                                    show: false
                                },
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data: this.pie4(this.schedule)
                        }, 
                        // 环5
                        {
                            name: "",
                            type: 'gauge',
                            splitNumber: 30, //刻度数量
                            min: 0,
                            max: 100,
                            radius: '70%', //图表尺寸
                            center: ['50%', '50%'],
                            startAngle: 90,
                            endAngle: -269.9999,
                            axisLine: {
                                show: false,
                                lineStyle: {
                                    width: 0,
                                    shadowBlur: 0,
                                    color: [
                                        [1, '#0dc2fe']
                                    ]
                                }
                            },
                            axisTick: {
                                show: false,
                                lineStyle: {
                                    color: 'auto',
                                    width: 2
                                },
                                length: 20,
                                splitNumber: 5
                            },
                            splitLine: {
                                show: true,
                                length: 28,  //长度
                                lineStyle: {
                                    color: 'auto',
                                }
                            },
                            axisLabel: {
                                show: false
                            },
                            pointer: { //仪表盘指针
                                show: 0,
                            },
                            detail: {
                                show: 0,
                            },
                        },
                        {
                            name: '统计',
                            type: 'gauge',
                            // splitNumber: 30, //刻度数量
                            // min: 0,
                            // max: 100,
                            // radius: '70%', //图表尺寸
                            center: ['50%', '50%'],
                            startAngle: 90,
                            endAngle: -269.9999,
                            axisLine: {
                                show: true,
                                lineStyle: {
                                    width: 0,
                                    shadowBlur: 0,
                                    color: [
                                        [0, '#40A2F9'],
                                        [1, '#40A2F9']
                                    ]
                                }
                            },
                            axisTick: {
                                show: true,
                                lineStyle: {
                                    color: '#40A2F9',
                                    width: 2
                                },
                                length: 30,
                                splitNumber: 5
                            },
                            splitLine: {
                                show: true,
                                length: 30,
                                lineStyle: {
                                    color: '#40A2F9',
                                }
                            },
                            axisLabel: {
                                show: false
                            },
                            pointer: { //仪表盘指针
                                show: 0,
                            },
                            detail: {
                                borderColor: '#fff',
                                shadowColor: '#fff', //默认透明
                                shadowBlur: 2,
                                offsetCenter: [0, '0%'], // x, y，单位px
                                textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                    color: '#fff',
                                    fontSize: 60,
                                },
                                formatter: '{value}%'
                            },
                            data: [{
                                name: "",
                                value: this.schedule
                            }]
                        },
                        {
                            type: 'pie',
                            zlevel: 7,
                            silent: true,
                            radius: ['50%', '48.5%'],
                            hoverAnimation: false,
                            data: this.pie7(),
                            label: {
                                normal: {
                                    show: false
                                },
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            }
                        },
                        {
                            type: 'pie',
                            zlevel: 8,
                            silent: true,
                            radius: ['47%', '46%'],
                            hoverAnimation: false,
                            data: this.pie8(),
                            label: {
                                normal: {
                                    show: false
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            }
                        },
                    ]
                };
            },

            // 初始化echarts
            initChart() {
                this.chartOption.series[3].startAngle = this.chartOption.series[3].startAngle - 10;
                // this.chartOption.series[5].data[0].value = this.chartOption.series[5].data[0].value + 1;

                this.chart.setOption(this.chartOption);
            },

            pie1() {
                let dataArr = [];
                for (var i = 0; i < 50; i++) {
                    if (i<10) {
                        dataArr.push({
                            name: (i + 0.9).toString(),
                            value: 20,
                            itemStyle: {
                                normal: {
                                    color: "#40A2F9",
                                    borderWidth: 0,
                                    borderColor: "rgba(0,0,0,0)"
                                }
                            }
                        },{
                            name: (i + 0.1).toString(),
                            value: 5,
                            itemStyle: {
                                normal: {
                                    color: "rgba(0,0,0,0)",
                                    borderWidth: 0,
                                    borderColor: "rgba(0,0,0,0)"
                                }
                            }
                        })
                    } else {
                        dataArr.push({
                            name: (i + 1).toString(),
                            value: 20,
                            itemStyle: {
                                normal: {
                                    color: "rgba(0,0,0,0)",
                                    borderWidth: 0,
                                    borderColor: "rgba(0,0,0,0)"
                                }
                            }
                        })
                    }

                }
                return dataArr
            },

            pie4(number) {
                let dataArr = [];
                let scale = number / 2;
                for (var i = 0; i < 50; i++) {
                    if (i < scale) {
                        dataArr.push({
                            name: (i + 1).toString(),
                            value: 20,
                            itemStyle: {
                                normal: {
                                    color: "#40A2F9",
                                    borderWidth: 0,
                                    borderColor: "rgba(0,0,0,0)"
                                }
                            }
                        },{
                            name: (i + 0.1).toString(),
                            value: 5,
                            itemStyle: {
                                normal: {
                                    color: "rgba(0,0,0,0)",
                                    borderWidth: 0,
                                    borderColor: "rgba(0,0,0,0)"
                                }
                            }
                        })
                    } else {
                        dataArr.push({
                            name: (i + 1).toString(),
                            value: 20,
                            itemStyle: {
                                normal: {
                                    color: "rgba(0,0,0,0)",
                                    borderWidth: 0,
                                    borderColor: "rgba(0,0,0,0)"
                                }
                            }
                        })
                    }

                }
                return dataArr

            },

            pie7() {
                let dataArr = [];
                for (var i = 0; i < 50; i++) {
                    dataArr.push({
                        name: (i + 1).toString(),
                        value: 8,
                        itemStyle: {
                            normal: {
                                color: "#40A2F9",
                                borderWidth: 1,
                                borderColor: "rgba(0,0,0,0)"
                            }
                        }
                    },{
                        name: (i + 100).toString(),
                        value: 2,
                        itemStyle: {
                            normal: {
                                color: "rgba(0,0,0,0)",
                                borderWidth: 1,
                                borderColor: "rgba(0,0,0,0)"
                            }
                        }
                    })
                }
                return dataArr
            },

            pie8() {
                let dataArr = [];
                for (var i = 0; i < 100; i++) {
                    dataArr.push({
                        name: (i + 100).toString(),
                        value: 2,
                        itemStyle: {
                            normal: {
                                color: "rgba(0,0,0,0)",
                                borderWidth: 1,
                                borderColor: "rgba(0,0,0,0)"
                            }
                        }
                    },{
                        name: (i + 1).toString(),
                        value: 8,
                        itemStyle: {
                            normal: {
                                color: "#40A2F9",
                                borderWidth: 1,
                                borderColor: "rgba(0,0,0,0)"
                            }
                        }
                    })
                }
                return dataArr
            },
        }
    }
</script>