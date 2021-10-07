<template>
  <div class="favorite-button" @click="markFavorite">
    <i class="bx" :class="icon"></i>
  </div>
</template>

<script>
import {storageUtility} from "../util/storageUtility"

export default {
  name: "FavoriteButton",
  props: {
    city: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      isFavorite: false,
    }
  },
  computed: {
    icon() {
      return {
        'bx-heart': !this.isFavorite,
        'bxs-heart': this.isFavorite,
      }
    }
  },
  mounted() {
    storageUtility.isFavorite(this.city)
    .then(v => this.isFavorite = v)
  },
  methods: {
    markFavorite() {
      if (this.isFavorite) {
        storageUtility.clearFavoriteCity()
        this.isFavorite = false
      }
      else {
        storageUtility.setFavoriteCity(this.city)
        this.isFavorite = true
      }
      this.$vs.notification({
        progress: 'auto',
        color: '#7d33ff',
        position: 'top-right',
        title: 'favorite city changed',
        text: `${this.city.name} is now ${this.isFavorite ? 'marked' : 'unmarked'} as favorite city.`
      })
    }
  }
}
</script>

<style scoped>

</style>
