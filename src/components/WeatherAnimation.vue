<template>
  <component v-if="selectedAnimation" :is="selectedAnimation" />
</template>

<script>
import Clear from "../components/animations/Clear";
import Clouds from "./animations/Clouds";
import Rain from "../components/animations/Rain";
import Snow from "../components/animations/Snow";
import Mist from "../components/animations/Mist";
import Thunderstorm from "../components/animations/Thunderstorm";
import Day from "./Day";

export default {
  name: "WeatherAnimation",
  components: {
    Day,
    Clear, Clouds, Rain, Snow, Mist, Thunderstorm
  },
  props: {
    condition: {
      required: true,
      type: String,
    }
  },
  data() {
    return {
      selectedAnimation: null,
      animations: [Clear, Clouds, Rain, Snow, Mist, Thunderstorm]
    }
  },
  async mounted() {
    await this.selectAnimation()
  },
  methods: {
    async selectAnimation() {
      let condition = this.condition
      this.selectedAnimation = this.animations.find(a => condition.includes(a.name.toLowerCase()))
    }
  }
}
</script>

<style scoped lang="scss">

</style>
