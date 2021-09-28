<template>
  <lottie :options="defaultOptions" :width="165" :height="165" @animCreated="handleAnimation"/>
</template>

<script>
import Lottie from 'vue-lottie/src/lottie.vue'
import * as sunny from "../../assets/animations/snow.json"
export default {
  name: "Snow",
  components: {
    Lottie,
  },
  computed: {
    defaultOptions() {
      return {animationData: this.animation}
    }
  },
  data() {
    return {
      animation: sunny.default,
      animationSpeed: 1,
    }
  },
  methods: {
    handleAnimation: function (anim) {
      this.anim = anim
    },

    stop: function () {
      this.anim.stop()
    },

    play: function () {
      this.anim.play()
    },

    pause: function () {
      this.anim.pause()
    },

    onSpeedChange: function () {
      this.anim.setSpeed(this.animationSpeed)
    },
  }
}
</script>

<style scoped>

</style>
