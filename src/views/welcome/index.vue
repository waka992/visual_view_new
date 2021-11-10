<template>
    <div>
        <BackGround :bgImage="'https://lhbibucket.oss-cn-shenzhen.aliyuncs.com/common/pic/welcome.jpg'"/>
    </div>
</template>

<script>
    import BackGround from '@/components/BackGround2'

    export default {
        name: 'Welcome',
        components: {
            BackGround,
        },

        data() {
            return {};
        },
    };
</script>