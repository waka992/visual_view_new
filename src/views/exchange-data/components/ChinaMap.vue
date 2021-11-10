<template>
    <div id="chinaMapChart" :style="{height:height,width:width}"></div>
</template>

<script>
    import echarts from "echarts";
    import "echarts/map/js/china";
    import { tradeVolumeMap } from "@/api/transaction";

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

        mounted() {
            this.getData({
                year : this.year
            });
        },

        data() {
            return {
                url: "https://www.fastmock.site/mock/4ba3a9039359d330685fab2541f6165a/api/industry/material_production&type=2",
                mapData: [],
            };
        },
        

        methods: {
            getData(query) {
                tradeVolumeMap(query)
                .then(res => {
                    if (res.code === 1000) { 
                        let loopData = res.data.results;
                        for (let i = 0; i < loopData.length; i++) {
                            this.mapData[i] = {
                                name: loopData[i].echarts_key,
                                value: loopData[i].amount
                            }
                        }
                        this.initChart();
                    }
                })
            },

            // 初始化echarts
            initChart() {
                let option = {
                    // backgroundColor: '#fff',
                    //标题
                    title: {
                        show: false,
                        text: "中国地图显示",
                        x: "center",
                        y: "10%",
                        textStyle: {
                            color: "red"
                        }
                    },
                    //工具栏
                    toolbox: {},
                    //提示信息
                    // tooltip: {
                    //     trigger: "item", //类型
                    //     formatter: "省份：{b}<br/>分布：{c}"
                    // },

                    geo: { //绘制基本的地图
                        map: 'china',
                        // zoom: 1.2,
                        roam: false, //是否可手势或者鼠标滚轮放大缩小
                        left: 10, //如果为0可最大化的在画布上显示地图，但也可能边缘处有的被隐藏，所以留一定的距离
                        right: 10,
                        top: '10%',
                        emphasis: {
                            itemStyle: {
                                areaColor: '#ccc'
                            }
                        },
                        itemStyle: {
                            backgroundColor: "#fff",
                            borderColor: "#2467e7",
                            borderWidth: 1,
                            borderType: "solid",
                            areaColor: "#00294d"
                        },
                        // regions: this.mapData,
                    },

                    series: [
                        {
                            name: '信息量',
                            type: 'map',
                            geoIndex: 0,
                            data: this.mapData
                        },
                        { 
                            //位置标记
                            name: '标点',
                            type: 'effectScatter',
                            coordinateSystem: 'geo',
                            symbol: 'circle',
                            symbolSize: 15, //这里也是可以用一个函数的，根据数据来决定标记的大小
                            // rippleEffect: {
                            //     brushType: 'stroke',
                            //     color: '#fe8f31'
                            // },
                            label: {
                                show: true,
                                position: 'bottom',
                                formatter: function(params) {
                                    let data = params.data;
                                    return params.name + (data.capital ? '-' + data.capital : '');
                                },
                                fontSize: 12,
                                color: 'white',
                                backgroundColor: '#fe8f31',
                                borderRadius: 4,
                                padding: [2, 3, 2, 3]
                            },
                            tooltip: {
                                show: false,
                            },
                            itemStyle: {
                                normal: {
                                    color: "#fe8f31",
                                    shadowColor: '#fff',
                                    shadowBlur: 25,
                                }
                            },
                            data: [ //在地图按照坐标找出点
                                {name: '广东', capital: '佛山', value: [113.12,23.02], visualMap:false},
                                {name: '上海', capital: '', value: [121.47,31.23], visualMap:false}
                            ],
                            zlevel: 3
                        }
                    ],

                    //视觉映射组件
                    visualMap: {
                        min: 0,
                        max: 1000,
                        align: "left", 
                        left: "5%",
                        bottom: "5%", 
                        text: ['高','低'],
                        textStyle : {
                            color: "#40A2F9",
                        },
                        inRange: {
                            color: ['#b4dcfe', '#2778ff']
                        },
                        show:true
                    }
                };

                var chart = echarts.init(document.getElementById("chinaMapChart"));
                chart.setOption(option);
            },
        }
    };
</script>
