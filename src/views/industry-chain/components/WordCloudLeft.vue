<template>
    <div class="wordCloud__tagBall__left" :style="{width:`${this.width}px`,height:`${this.height}px`}">
        <span
            class="wordCloud__tag"
            v-for="(item, index) of data"
            :key="index"
            :style="contentEle[index] ? {...contentEle[index].style} : ''"
        >
            {{ requestStatus ? item.title : (item + index) }}
        </span>
    </div>
</template>

<script>
import { company } from "@/api/trade";
import { mapGetters } from 'vuex';

export default {
    name: 'WordCloudLeft',

    props: {
        width: {
            type: Number,
            default: 100
        },
        height: {
            type: Number,
            default: 100
        },
        type: {
            type: String,
            default: '1'
        },
    },

    computed: {
        ...mapGetters([
            'company',
            'company_relation',
            'company_status',
            'company_canvas',
        ])
    },

    data() {
        return {
            data: [],
            contentEle: [],
            direction: '-4',
            speed: 800,

            requestStatus: false,
        }
    },

    created() {
        this.getTagData({
            fields: "id,title,type",
            type: this.type,
        });
        
        if( !this.requestStatus ){
            this.data = 'test,'.repeat(30).slice(0, -1).split(',');
        }
    },

    mounted() {
        setTimeout(()=>{
            this.contentEle = this.data.map(() => ({
                x: 0,
                y: 0,
                z: 0,
                style: {}
            }));
            this.innit();
        }, 500)  
    },

    methods: {
        async getTagData(query) {
            await company(query)
            .then(res => {
                if (res.code === 1000) { 
                    this.data = res.data.results
                    this.requestStatus = true; 
                }
            })
        },

        innit() {
            const RADIUSX = (this.width - 50) / 2;
            const RADIUSY = (this.height - 50) / 2;
            this.contentEle = [];
            for (let i = 0; i < this.data.length; i += 1) {
                const k = -1 + (2 * (i + 1) - 1) / this.data.length;
                const a = Math.acos(k);
                const b = a * Math.sqrt(this.data.length * Math.PI);
                const x = RADIUSX * Math.sin(a) * Math.cos(b);
                const y = RADIUSY * Math.sin(a) * Math.sin(b);
                const z = RADIUSX * Math.cos(a);
                const singleEle = {
                    x,
                    y,
                    z,
                    style: {}
                };
                this.contentEle.push(singleEle);
            }
        
            this.animate();
        },

        animate() {
            this.rotateX();
            this.rotateY();
            this.move();

            window.requestAnimationFrame(this.animate);
        },

        rotateX() {
            const angleX = ['-1', '1'].includes(this.direction)
                ? Math.PI / Infinity
                : Math.PI / ((Number(this.direction) / 2) * Number(this.speed));
            const cos = Math.cos(angleX);
            const sin = Math.sin(angleX);
            this.contentEle = this.contentEle.map((t) => {
                const y1 = t.y * cos - t.z * sin;
                const z1 = t.z * cos + t.y * sin;
                return {
                    ...t,
                    y: y1,
                    z: z1
                };
            });
        },

        rotateY() {
            const angleY = ['-2', '2'].includes(this.direction)
                ? Math.PI / Infinity
                : Math.PI / (Number(this.direction) * Number(this.speed));
            const cos = Math.cos(angleY);
            const sin = Math.sin(angleY);
            this.contentEle = this.contentEle.map((t) => {
                const x1 = t.x * cos - t.z * sin;
                const z1 = t.z * cos + t.x * sin;
                return {
                    ...t,
                    x: x1,
                    z: z1
                };
            });
        },

        move() {
            const CX = this.width / 2;
            const CY = this.height / 2;
            this.contentEle = this.contentEle.map((singleEle, i) => {
                const { x, y, z } = singleEle;
                const fallLength = 500;
                const RADIUS = (this.width - 50) / 2;
                const scale = fallLength / (fallLength - z);
                const alpha = (z + RADIUS) / (2 * RADIUS);
                const left = `${x + CX - 15}px`;
                const top = `${y + CY - 15}px`;
                const transform = `translate(${left}, ${top})`;

                // 连线数据
                var visibilityStatus = 'visible';
                if(this.company_status){
                    var index = this.data[i].id;
                    if( this.company_relation.includes(index) ){
                        this.company_canvas[index] = {
                            left: x + CX - 15,
                            top: y + CY - 15,
                            type: this.type,
                        }
                    } else {
                        visibilityStatus = 'hidden';
                    }
                }

                const style = {
                    ...singleEle.style,
                    opacity: alpha + 0.5,
                    zIndex: parseInt(scale * 100, 10),
                    transform,
                    visibility: visibilityStatus
                };
                
                return {
                    x,
                    y,
                    z,
                    style
                };
            });
        },
    }
};
</script>

<style lang="scss" scoped>
    .wordCloud__tagBall__left {
        position: relative;
        margin-top: 50px;
        margin-right: 120px;

        .wordCloud__tag {
            display: block;
            position: absolute;
            left: 0px;
            top: 0px;

            color: #9ABCFF;
            text-decoration: none;
            font-size: 16px;
            font-weight: bold;

            padding-left: 15px;
            background: url('~@/assets/images/trade/icon1.png') no-repeat left center/ 16px 16px;
            
            // background: red;            
        }
    }
</style>