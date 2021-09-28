<template>
  <div class="city">
    <div class="city__today">
      <div class="city__title"><i class='bx bxs-map'></i>{{ weatherInfo.city }}</div>
      <div class="city__animation">
        <lottie :options="defaultOptions" :width="165" :height="165" @animCreated="handleAnimation"/>
      </div>
      <div class="city__temperature">
        {{ parseFloat(weatherInfo.temperature).toFixed(0) }}
      </div>
      <div class="city__condition">{{ weatherInfo.condition }}</div>
      <div class="city__date">Thursday, 17 May</div>
      <div class="city_divider"></div>
      <div class="city_info">
        <div class="info__wind">
          <i class="bx bx-wind"></i>
          <span>{{ weatherInfo.wind }} km/h</span>
          <span>Wind</span>
        </div>
        <div class="info__rain">
          <i class="bx bx-cloud-rain"></i>
          <span>{{weatherInfo.rain}}%</span>
          <span>Chance of rain</span>
        </div>
        <div class="info__humidity">
          <i class="bx bx-droplet"></i>
          <span>{{ weatherInfo.humidity }}%</span>
          <span>Humidity</span>
        </div>
      </div>
    </div>
    <div class="city__loading">
      <div ref="target" id="target" class="center">
        <div :style="`background: ${color};`" class="con-input">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Lottie from 'vue-lottie/src/lottie.vue'
import weatherService from "../services/weatherService"
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
      animationSpeed: 1,
      weatherInfo: {
        temperature: 0,
        condition: '',
        city: '',
        rain: '',
        humidity: '',
        wind: '',
      },
      color: '#262626',
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
    async getWeatherInfo(lat, lon, city) {
      await weatherService.getCity(lat, lon)
          .then((res) => {
            this.weatherInfo.city = city
            this.weatherInfo.temperature = res.data.current.temp
            this.weatherInfo.condition = res.data.current.weather[0].main
            this.weatherInfo.rain = res.data.hourly[0]['pop']
            this.weatherInfo.wind = res.data.current.wind_speed
            this.weatherInfo.humidity = res.data.current.humidity
          })
    },
    openLoading() {
      const loading = this.$vs.loading({
        background: this.color,
        color: '#fff'
      })
      setTimeout(() => {
        loading.close()
      }, 1000)
    }
  },
  async created() {
    this.openLoading()
    const {lat, lon, city} = this.$route.params
    await this.getWeatherInfo(lat, lon, city)
  },
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
