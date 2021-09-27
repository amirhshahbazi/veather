<template>
  <div class="city">
    <div class="city__today">
      <div class="city__title"><i class='bx bxs-map'></i>Tehran</div>
      <div class="city__animation">
        <lottie :options="defaultOptions" :width="165" :height="165" @animCreated="handleAnimation"/>
      </div>
      <div class="city__temperature">
        27
      </div>
      <div class="city__condition">Sunny</div>
      <div class="city__date">Thursday, 17 May</div>
      <div class="city_divider"></div>
      <div class="city_info">
        <div class="info__wind">
          <i class="bx bx-wind"></i>
          <span>13 km/h</span>
          <span>Wind</span>
        </div>
        <div class="info__rain">
          <i class="bx bx-cloud-rain"></i>
          <span>67%</span>
          <span>Chance of rain</span>
        </div>
        <div class="info__humidity">
          <i class="bx bx-droplet"></i>
          <span>30%</span>
          <span>Humidity</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Lottie from 'vue-lottie/src/lottie.vue'
export default {
  name: "City",
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
      animation: window.animations.thunder,
      animationSpeed: 1
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
    }
  },
  mounted() {
    setTimeout(() => {
      this.animation = window.animations.sunny
    }, 1500)
  }
}
</script>

<style scoped lang="scss">
.city {
  display: inherit;
  justify-content: center;
  .city__today {
    width: 100%;
    background: #13AFFE;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    color: white;
    border-radius: 0px 0px 50px 50px;
    padding: 20px 0px;

    .city__title {
      font-weight: bold;
      font-size: 20px;
      margin-top: 10px;
      display: flex;
      flex-flow: row;
      justify-content: center;
      align-items: center;
    }

    .city__animation {
      margin-top: 15px;
    }

    .city__temperature {
      font-size: 64px;
      font-weight: bold;
    }

    .city__condition {
      font-weight: bold;
    }

    .city__date {
      color: rgba(255, 255, 255, 0.8);
      margin-top: 5px;
    }
    .city_divider {
      width: 70%;
      height: 1px;
      background: white;
      opacity: 0.2;
      margin: 30px 0px;
    }

    .city_info {
      display: flex;
      flex-flow: row;
      justify-content: space-evenly;
      align-items: center;
      width: 100%;

      .bx {
        font-size: 20px;
        margin-bottom: 10px;
      }

      div {
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;

        span {
          &:last-child {
            opacity: 0.5;
            margin-top: 5px;
          }
        }
      }
    }
  }
}
</style>
