<template>
    <div>
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" :height="height" :width="width">
            <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%"   style="stop-color:#65b1ea;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#addcfe;stop-opacity:1" />
                </linearGradient>
            </defs>
            <path id="path" fill-opacity="0" stroke="#14b1ff" stroke-width="5px" :d="line_path" :style="{
                '--time': time,
                '--line_length' : line_length 
            }"/>
        </svg>
        <div id="arrow" :style="{
            '--time': time,
            '--path': arrow_path, 
        }"></div>
    </div>
</template>

<script>
    export default {
        name: 'ConnectLine',

        props: {
            width: {
                type: String,
                default: '50vw'
            },
            height: {
                type: String,
                default: '50vh'
            },
            line_path: {
                type: String,
                default: "M10,20 L500,20 L500,250"
            },
            arrow_path: {
                type: String,
                default: '"M12,19 L499,19 L499,251"'
            },
            time: {
                type: String,
                default: '2s'
            },
        },

        data() {
            return {
                time: '',
                line_path: "",
                line_length: 0,
                line_color: '#65b1ea',

                arrow_path: ""
            };
        },

        mounted() {
            this.line_length = this.getLineLength();
        },

        methods: {
            getLineLength(){
                return document.getElementById('path').getTotalLength();
            }
        }
    };
</script>

<style scoped>
    svg {
        z-index: -1;
        /* background: red; */
    }

    #path {
        stroke-dasharray: var(--line_length);
        stroke-dashoffset: 0;
        animation: var(--time) linear forwards line-move;
    }
    
    @keyframes line-move {
        from {
            stroke-dashoffset: var(--line_length);
        }
        to {
            stroke-dashoffset: 0;
        }
    }

    #arrow {
        position: absolute;
        top: 1px;
        left: 1px;
        width: 25px;
        height: 25px;

        background: url("~@/assets/images/interactive/guide.png") center/100% 100%;
        /* background: red; */

        offset-path: path(var(--path));
        offset-distance: 0%;

        animation: var(--time) linear alternate forwards arrow-move;
    }

    @keyframes arrow-move {
        from {
            offset-distance: 0%;
        }
        to {
            offset-distance: 100%;
        }
    }
</style>