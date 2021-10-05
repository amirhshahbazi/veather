<template>
  <div class="home">
    <div class="home__top">
      <div class="home__title">Pick a City</div>
      <div class="home__description">Search for and select the city you want its weather info</div>
    </div>
    <div class="home__search">
      <vs-input
          @input="debounceInput"
          v-model="query"
          block
          class="home__search-input"
          :loading="searchLoading"
      />
      <vs-button
          icon
          color="rgb(100,51,153)"
          gradient
          @click="findLocation"
      >
        <i class='bx bx-current-location'></i>
      </vs-button>
    </div>
    <div class="home__cities">
      <transition-group name="slide" appear>
        <div v-for="(city, index) in cities" :key="index" class="home__city"
             @click="openCity(city.lat, city.lon, city.display_place)">
          {{ city.display_place }}
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
import '@/services/geolocationService.js'
import geolocationService from "../services/geolocationService";
import _ from 'lodash'

export default {
  name: 'Home',
  data() {
    return {
      query: '',
      value: '',
      cities: [],
      searchLoading: false,
    }
  },
  methods: {
    async fetchCitiesList(query) {
      this.searchLoading = true
      await geolocationService.autoComplete(query)
          .then((res) => this.cities = res.data)
      this.searchLoading = false
    },
    async fetchCityByCoordinates(lat, lon) {
      geolocationService.reverse(lat, lon)
          .then((res) => this.openCity(lat, lon, res.data.address.neighbourhood))
    },
    debounceInput: _.debounce(function (e) {
      if (e) this.fetchCitiesList(e)
      else this.cities = []
    }, 500),
    findLocation() {
      this.$getLocation({
        enableHighAccuracy: false,
        timeout: Infinity,
        maximumAge: 0
      }).then(async coordinates =>
          await this.fetchCityByCoordinates(coordinates.lat, coordinates.lng))
          .catch((e) => {
            let text = this.composeErrorMessage(e), title = e.toString()
            this.$vs.notification({
              progress: 'auto',
              color: '#7d33ff',
              position: 'top-right',
              title,
              text
            })
          })
    },
    composeErrorMessage(e) {
      let text
      switch (e) {
        case 'no position access':
          text = 'In order to find your location and show its weather, you have to grant the location permission.'
          break
        default:
          text = 'An unknown error has happened.'
          break
      }
      return text
    },
    openCity(lat, lon, city) {
      this.$router.push({
        name: 'City',
        query: {
          lat,
          lon,
          city,
        }
      });
    }
  }
}
</script>

<style scoped lang="scss">
.home {
  display: flex;
  flex-flow: column;
  justify-content: start;
  width: 100%;
  height: 100vh;

  .home__top {
    font-size: 18px;
    color: white;
    text-align: center;
    padding-top: 50px;

    div {
      &:first-child {
        font-size: 28px;
        font-weight: bold;
      }

      &:last-child {
        opacity: 0.7;
        margin-top: 10px;
      }
    }
  }

  .home__search {
    margin-top: 20px;
    display: flex;
    flex-flow: row;
    justify-content: center;
    align-items: center;
  }

  .home__cities {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    margin-top: 20px;

    .home__city {
      background: rgba(42, 33, 87, 0.65);
      padding: 12px 10px;
      color: white;
      border-radius: 15px;
      width: 380px;
      margin-bottom: 10px;
      @media screen and (max-width: 500px) {
        width: 75vw;
      }

      &:hover {
        background: rgba(42, 33, 87, 1);
        cursor: pointer;
      }
    }
  }

  .home__search-input {
    width: 400px;
    @media screen and (max-width: 500px) {
      width: 85%;
    }
  }
}
</style>
