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
      <locate-button @locationFound="locationFound"></locate-button>
    </div>
    <div class="home__cities">
      <transition-group name="slide" appear>
        <div v-for="(city, index) in cities" :key="index" class="home__city"
             @click="openCity(city.lat, city.lon, city.display_place)">
          {{ city.display_place }}
        </div>
      </transition-group>
    </div>
    <favorite-city
        v-if="favoriteCity"
        :city="favoriteCity"
        @click.native="openCity(favoriteCity.lat, favoriteCity.lng, favoriteCity.name)" />
  </div>
</template>

<script>
import '@/services/geolocationService.js'
import geolocationService from "../services/geolocationService"
import _ from 'lodash'
import LocateButton from "../components/LocateButton"
import FavoriteCity from "../components/FavoriteCity"
import {storageUtility} from "../util/storageUtility"

export default {
  name: 'Home',
  components: {FavoriteCity, LocateButton},
  data() {
    return {
      query: '',
      value: '',
      cities: [],
      searchLoading: false,
      favoriteCity: null,
    }
  },
  mounted() {
    this.favoriteCity = storageUtility.getFavoriteCity()
  },
  methods: {
    async fetchCitiesList(query) {
      this.searchLoading = true
      await geolocationService.autoComplete(query)
          .then((res) => this.cities = res.data)
      this.searchLoading = false
    },
    async fetchCityByCoordinates(lat, lng) {
      geolocationService.reverse(lat, lng)
          .then((res) => this.openCity(lat, lng, res.data.address.neighbourhood))
    },
    debounceInput: _.debounce(function (e) {
      if (e) this.fetchCitiesList(e)
      else this.cities = []
    }, 500),
    async locationFound(coordinates) {
      await this.fetchCityByCoordinates(coordinates.lat, coordinates.lng)
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
      width: 420px;
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
    .vs-input-content {
      border-radius: 50px;
    }
    @media screen and (max-width: 500px) {
      width: 85%;
    }
  }
}
</style>
