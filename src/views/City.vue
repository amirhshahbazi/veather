<template>
  <div class="city">
    <div class="city__loading">
      <div ref="target" id="target" class="center">
        <div :style="`background: ${loading.color};`" class="con-input">
        </div>
      </div>
    </div>
    <div class="city__navigation">
      <back-button />
      <favorite-button v-if="city" :city="city" />
    </div>
    <div class="city__today">
      <div class="city__title"><i class='bx bxs-map'></i>{{ weatherInfo.city }}</div>
      <div class="city__date">{{ weatherInfo.date }}</div>
      <div class="city__animation">
        <weather-animation v-if="weatherInfo.condition" :condition="weatherInfo.condition" />
      </div>
      <div class="city__temperature">
        {{ parseFloat(weatherInfo.temperature).toFixed(0) }}
      </div>
      <div class="city__condition">{{ weatherInfo.condition }}</div>
      <div class="city_divider"></div>
      <div class="city_info">
        <div class="info__wind">
          <i class="bx bx-wind"></i>
          <span>{{ weatherInfo.wind }} km/h</span>
          <span>Wind</span>
        </div>
        <div class="info__rain">
          <i class="bx bx-cloud-rain"></i>
          <span>{{ weatherInfo.rain }}%</span>
          <span>Chance of rain</span>
        </div>
        <div class="info__humidity">
          <i class="bx bx-droplet"></i>
          <span>{{ weatherInfo.humidity }}%</span>
          <span>Humidity</span>
        </div>
      </div>
    </div>
    <div class="next-days center grid">
      <vs-row justify="center">
        <day v-for="day of weatherInfo.nextDays" :key="day.dt" :weather-info="day"/>
      </vs-row>
    </div>
  </div>
</template>

<script>
import weatherService from "../services/weatherService"
import moment from 'moment'
import Day from "../components/Day";
import WeatherAnimation from "../components/WeatherAnimation";
import BackButton from "../components/BackButton";
import FavoriteButton from "../components/FavoriteButton";

export default {
  name: "City",
  components: {
    FavoriteButton,
    BackButton,
    WeatherAnimation,
    Day,
  },
  filters: {
    formatDay(timestamp) {
      return moment.unix(timestamp).format("dddd")
    },
    formatMonthDay(timestamp) {
      return moment.unix(timestamp).format("DD MMM")
    }
  },
  data() {
    return {
      weatherInfo: {
        temperature: 0,
        condition: '',
        city: '',
        rain: '',
        humidity: '',
        wind: '',
        date: '',
        nextDays: [],
      },
      loading: {
        state: null,
        color: '#17113d',
      },
      city: null,
    }
  },
  methods: {
    async getWeatherInfo(lat, lon, city) {
      this.openLoading()
      await weatherService.getCity(lat, lon)
          .then(async (res) => {
            await this.setWeatherInfo(res.data, city)
            this.closeLoading()
          })
    },
    async setWeatherInfo(info, city) {
      this.weatherInfo.city = city
      this.weatherInfo.temperature = info.current.temp
      this.weatherInfo.condition = info.current.weather[0].description
      this.weatherInfo.rain = info.hourly[0]['pop']
      this.weatherInfo.wind = info.current.wind_speed
      this.weatherInfo.humidity = info.current.humidity
      this.weatherInfo.date = moment.unix(info.current.dt).format("dddd, DD MMM")
      this.weatherInfo.nextDays = info.daily.slice(1, 4)
      this.setCityObject(city, info.lat, info.lon)
    },
    setCityObject(name, lat, lng) {
      this.city = {
        name, lat, lng
      }
    },
    openLoading() {
      this.loading.state = this.$vs.loading({
        background: this.loading.color,
        color: '#fff',
        opacity: 1,
      })
    },
    closeLoading() {
      this.loading.state.close()
    },
    getAnimation() {
      if (this.weatherInfo.condition.includes('clear')) return this.animationComponent.clear
      if (this.weatherInfo.condition.includes('clouds')) return this.animationComponent.fewClouds
      if (this.weatherInfo.condition.includes('rain')) return this.animationComponent.rain
      if (this.weatherInfo.condition.includes('shower')) return this.animationComponent.shower
      if (this.weatherInfo.condition.includes('thunderstorm')) return this.animationComponent.thunderstorm
      if (this.weatherInfo.condition.includes('snow')) return this.animationComponent.snow
      if (this.weatherInfo.condition.includes('mist')) return this.animationComponent.mist
      else return this.animationComponent.cloudy
    }
  },
  async beforeRouteEnter(to, from, next) {
    const {lat, lon, city} = to.query
    await next(async vm => {
      await vm.getWeatherInfo(lat, lon, city)
    })
  },
  async beforeRouteUpdate(to, from, next) {
    const {lat, lon, city} = from.query
    await next(async vm => {
      await vm.getWeatherInfo(lat, lon, city)
    })
  },
}
</script>

<style scoped lang="scss">
.city {
  display: inherit;
  justify-content: center;
  height: 100%;

  .city__navigation {
    position: absolute;
    color: white;
    width: 100%;
    display: flex;
    justify-content: space-between;

    .back-button, .favorite-button {
      padding: 20px;
      font-size: 20px;

      &:hover {
        cursor: pointer;
      }
    }
  }

  .city__today {
    width: 100%;
    background: #4e54c8; /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #8f94fb, #4e54c8); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #8f94fb, #4e54c8); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

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

  .next-days {
    color: white;
    padding: 20px;
  }
}
</style>
