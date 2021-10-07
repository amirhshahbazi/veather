<template>
  <vs-col class="next-day__container" vs-type="flex" vs-justify="center" vs-align="center" w="3" sm="12">
    <vs-row class="next-days__item" justify="space-between" align="center">
      <div class="next-day__dates">
        <div class="next-day__day">
          {{ weatherInfo.dt | formatDay }}
        </div>
        <div class="next-day__date">
          {{ weatherInfo.dt | formatMonthDay }}
        </div>
      </div>
      <div class="next-day__temp">
        {{ weatherInfo.temp.day.toFixed(0) }}
      </div>
      <div class="next-day__icon">
        <i :class="icon"></i>
      </div>
    </vs-row>
  </vs-col>
</template>

<script>
import moment from "moment";

export default {
  name: "Day",
  props: ['weatherInfo'],
  filters: {
    formatDay(timestamp) {
      return moment.unix(timestamp).format("dddd")
    },
    formatMonthDay(timestamp) {
      return moment.unix(timestamp).format("DD MMM")
    }
  },
  computed: {
    icon() {
      return {
        'bx bx-sun': this.weatherInfo.weather[0].description.includes('clear'),
        'bx bx-cloud': this.weatherInfo.weather[0].description.includes('clouds'),
        'bx bx-cloud-drizzle': this.weatherInfo.weather[0].description.includes('rain'),
        'bx bx-cloud-lightning': this.weatherInfo.weather[0].description.includes('thunderstorm'),
        'bx bx-cloud-snow': this.weatherInfo.weather[0].description.includes('snow'),
        'bx bx-wind': this.weatherInfo.weather[0].description.includes('mist'),
      }
    }
  }
}
</script>

<style scoped lang="scss">

.next-day__container {
  margin: 10px;
}

.next-days__item {
  background: rgba(42, 33, 87, 0.65);
  padding: 5px 20px;
  border-radius: 20px;

  .next-day__dates {
    padding: 5px;
    width: 85px;
    .next-day__day {}
    .next-day__date {
      opacity: 0.7;
      font-size: 14px;
    }
  }
  .next-day__temp {
    font-size: 26px;
    font-weight: bold;
  }

  .next-day__icon {
    font-size: 30px;
  }
}
</style>
