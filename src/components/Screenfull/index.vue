<template>
  <div>
    <svg
      t="1508738709248"
      class="screenfull-svg"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="2069"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      width="32"
      height="32"
      @click="click" v-if="isFullscreen === false">
      <path
        d="M333.493443 428.647617 428.322206 333.832158 262.572184 168.045297 366.707916 64.444754 64.09683 64.444754 63.853283 366.570793 167.283957 262.460644Z"
        p-id="2070"/>
      <path
        d="M854.845439 760.133334 688.61037 593.95864 593.805144 688.764889 759.554142 854.56096 655.44604 958.161503 958.055079 958.161503 958.274066 656.035464Z"
        p-id="2071"/>
      <path
        d="M688.535669 428.550403 854.31025 262.801405 957.935352 366.921787 957.935352 64.34754 655.809313 64.081481 759.919463 167.535691 593.70793 333.731874Z"
        p-id="2072"/>
      <path
        d="M333.590658 594.033341 167.8171 759.804852 64.218604 655.67219 64.218604 958.270996 366.342596 958.502263 262.234493 855.071589 428.421466 688.86108Z"
        p-id="2073"/>
    </svg>
    <svg
      t="1508738709248"
      class="screenfull-svg"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="2070"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      width="32"
      height="32"
      @click="click" v-if="isFullscreen === true">
        <path d="M320 640H64a64 64 0 0 0 0 128h192v192a64 64 0 0 0 128 0v-256a64 64 0 0 0-64-64zM960 640h-256a64 64 0 0 0-64 64v256a64 64 0 0 0 128 0v-192h192a64 64 0 0 0 0-128zM704 384h256a64 64 0 0 0 0-128h-192V64a64 64 0 0 0-128 0v256a64 64 0 0 0 64 64zM320 0a64 64 0 0 0-64 64v192H64a64 64 0 0 0 0 128h256a64 64 0 0 0 64-64V64a64 64 0 0 0-64-64z" p-id="10569"></path>
    </svg>
  </div>
</template>

<script>
import screenfull from 'screenfull'

export default {
  name: 'Screenfull',
  props: {
    width: {
      type: Number,
      default: 22
    },
    height: {
      type: Number,
      default: 22
    },
    fill: {
      type: String,
      default: '#48576a'
    }
  },
  data() {
    return {
      isFullscreen: false
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    click() {
      if (!screenfull.enabled) {
        this.$message({
          message: 'you browser can not work',
          type: 'warning'
        })
        return false
      }
      screenfull.toggle()
    },
    init() {
      if (screenfull.enabled) {
        screenfull.on('change', () => {
          this.isFullscreen = screenfull.isFullscreen
        })
      }
    }
  }
}
</script>

<style scoped>
    .screenfull-svg {
        display: inline-block;
        cursor: pointer;
        fill: #5a5e66;;
        width: 20px;
        height: 20px;
        vertical-align: 10px;
        cursor: pointer;
        font-size: 18px;
        vertical-align: middle;
    }
</style>
