<template>
  <vs-button
      icon
      color="rgb(100,51,153)"
      gradient
      @click="findLocation"
      style="border-radius: 50%"
  >
    <i class='bx bx-current-location'></i>
  </vs-button>
</template>

<script>
export default {
  name: "LocateButton",
  methods: {
    findLocation() {
      this.$getLocation({
        enableHighAccuracy: false,
        timeout: 1,
        maximumAge: 0
      }).then(coordinates =>
          this.locationFound(coordinates.lat, coordinates.lng))
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
    locationFound(lat, lng) {
      this.$emit('locationFound', {
        lat,
        lng,
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
  }
}
</script>

<style scoped lang="scss">

</style>
